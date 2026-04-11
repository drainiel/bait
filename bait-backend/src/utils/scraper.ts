import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeURL(url: string): Promise<string> {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; BAIT-Bot/1.0; +https://bait.app)",
    },
    timeout: 10000,
  });

  const $ = cheerio.load(html);

  // Remove non-content elements
  $("nav, footer, script, style, noscript, iframe, svg, header").remove();

  const title = $("title").text().trim();
  const metaDescription = $("meta[name='description']").attr("content")?.trim() || "";

  let content = "";
  if ($("article").length) {
    content = $("article").text();
  } else if ($("main").length) {
    content = $("main").text();
  } else {
    content = $("body").text();
  }
  
  // Inject metadata for JS heavy sites like YouTube
  content = `${title ? `Title: ${title}\n` : ""}${metaDescription ? `Description: ${metaDescription}\n` : ""}${content}`;

  // Normalize whitespace and trim
  content = content.replace(/\s+/g, " ").trim();

  return content.slice(0, 6000);
}

export function detectInputType(input: string): "url" | "text" {
  try {
    new URL(input);
    return "url";
  } catch {
    return "text";
  }
}

export async function searchWeb(query: string): Promise<string> {
  try {
    const encoded = encodeURIComponent(query);
    const { data: html } = await axios.get(
      `https://html.duckduckgo.com/html/?q=${encoded}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; BAIT-Bot/1.0; +https://bait.app)",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 8000,
      }
    );

    const $ = cheerio.load(html);
    const snippets: string[] = [];

    $(".result__snippet").each((i, el) => {
      if (i < 4) {
        const text = $(el).text().trim();
        if (text) snippets.push(text);
      }
    });

    return snippets.length > 0
      ? snippets.join(" | ")
      : "No background information found.";
  } catch {
    return "Background check unavailable.";
  }
}
