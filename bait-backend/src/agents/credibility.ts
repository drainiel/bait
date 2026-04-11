import { llm, safeParseJSON } from "../utils/llm";
import { searchWeb } from "../utils/scraper";

export interface CredibilityResult {
  score: number;
  hasAuthor: boolean;
  hasCitations: boolean;
  domainReputation: "unknown" | "low" | "medium" | "high";
  flags: string[];
  backgroundCheck?: string;
}

const FALLBACK: CredibilityResult = {
  score: 50,
  hasAuthor: false,
  hasCitations: false,
  domainReputation: "unknown",
  flags: ["Unable to assess credibility"],
};

interface EntityExtractionResult {
  entities: string[];
}

/**
 * Stage 1: Extract notable people/brands from the content using a fast, cheap model.
 */
async function extractEntities(content: string): Promise<string[]> {
  const messages = [
    {
      role: "system" as const,
      content: `You are an entity extraction agent. From the content, extract the names of any notable people, financial influencers, YouTubers, brands, or organizations making financial claims.
Return ONLY JSON with this exact shape:
{
  "entities": ["<name1>", "<name2>"]
}
If no notable entities can be identified, return { "entities": [] }.`,
    },
    {
      role: "user" as const,
      content: `Extract notable entities from this content:\n\n${content.slice(0, 2000)}`,
    },
  ];

  try {
    const raw = await llm(messages, 1, true);
    const result = safeParseJSON<EntityExtractionResult>(raw, { entities: [] });
    return result.entities.slice(0, 2); // Only check up to 2 entities to save time
  } catch {
    return [];
  }
}

/**
 * Stage 2: Full credibility analysis, optionally enriched with background check data.
 */
export async function analyzeCredibility(
  content: string,
  sourceUrl?: string
): Promise<CredibilityResult> {
  // Stage 1: find who is making the claims
  const entities = await extractEntities(content);

  // Stage 2: background check each entity via DuckDuckGo
  let backgroundCheckText = "";
  if (entities.length > 0) {
    const checks = await Promise.all(
      entities.map(async (name) => {
        // Run two searches: one for positive reputation, one for negative signals
        const [positive, negative] = await Promise.all([
          searchWeb(`"${name}" financial expert reputation credible Italy`),
          searchWeb(`"${name}" scam fraud allegations unreliable`),
        ]);
        return `POSITIVE: ${positive}\nNEGATIVE SIGNALS: ${negative}`;
      })
    );
    backgroundCheckText = entities
      .map((name, i) => `${name}:\n${checks[i]}`)
      .join("\n\n");
    console.log(
      `[Credibility] Background check for [${entities.join(", ")}] complete.`
    );
  }

  const messages = [
    {
      role: "system" as const,
      content: `You are a credibility analysis agent. Analyze the provided content and assess its credibility.
${
  backgroundCheckText
    ? `You have been given REAL-TIME background check results from the web. These MUST heavily influence the credibility score using these rules:

- If the POSITIVE results confirm the person is a widely respected educator, financial expert, or professor with strong community trust → set score to AT LEAST 78, use domainReputation "high".
- If POSITIVE results are strong AND NEGATIVE results show NO fraud/scam allegations → set score to at least 82.
- If the NEGATIVE results show clear scam reports, fraud allegations, or multiple victim reports → lower score drastically to below 35 and set domainReputation to "low".
- If results are mixed or inconclusive → score between 50 and 65.

Do NOT penalize an educator just because their content is promotional. Focus on real-world reputation signals.`
    : ""
}
Return ONLY JSON with this exact shape:
{
  "score": <number 0-100, 100 = very credible>,
  "hasAuthor": <boolean>,
  "hasCitations": <boolean>,
  "domainReputation": <"unknown" | "low" | "medium" | "high">,
  "flags": [<max 3 short strings describing credibility issues>]
}`,
    },
    {
      role: "user" as const,
      content: `Analyze this content for credibility.${sourceUrl ? ` Source URL: ${sourceUrl}` : ""}
${backgroundCheckText ? `\nBACKGROUND CHECK RESULTS:\n${backgroundCheckText}\n` : ""}
Content:
${content.slice(0, 4000)}`,
    },
  ];

  try {
    const raw = await llm(messages, 1, true);
    const result = safeParseJSON<CredibilityResult>(raw, FALLBACK);
    // Attach background check summary to the result for transparency
    if (backgroundCheckText) {
      result.backgroundCheck = `Checked: ${entities.join(", ")}`;
    }
    return result;
  } catch (error) {
    console.error("Credibility agent error:", error);
    return FALLBACK;
  }
}
