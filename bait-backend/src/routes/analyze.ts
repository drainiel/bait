import { Router, Request, Response } from "express";
import { scrapeURL, detectInputType } from "../utils/scraper";
import { analyzeCredibility } from "../agents/credibility";
import { extractClaims } from "../agents/claimExtractor";
import { detectBias } from "../agents/biasDetector";
import { synthesizeVerdict } from "../agents/verdict";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      res.status(400).json({ error: "Input is required" });
      return;
    }

    const inputType = detectInputType(input.trim());
    let content = input.trim();
    let sourceUrl: string | undefined;

    if (inputType === "url") {
      sourceUrl = input.trim();
      content = await scrapeURL(sourceUrl);
      if (!content) {
        res.status(422).json({ error: "Could not extract content from URL" });
        return;
      }
    }

    // Run agents sequentially to respect Groq rate limits
    const credibility = await analyzeCredibility(content, sourceUrl);
    const claims = await extractClaims(content);

    // Run bias sequentially after
    const bias = await detectBias(content);

    // Run verdict with all results
    const verdict = await synthesizeVerdict(credibility, claims, bias);

    res.json({
      inputType,
      sourceUrl,
      credibility,
      claims,
      bias,
      verdict,
    });
  } catch (error) {
    console.error("Analyze route error:", error);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
});

export default router;
