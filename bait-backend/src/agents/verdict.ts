import { llm, safeParseJSON } from "../utils/llm";
import { CredibilityResult } from "./credibility";
import { ClaimResult } from "./claimExtractor";
import { BiasResult } from "./biasDetector";

export interface VerdictResult {
  verdict: "BAIT" | "SUSPICIOUS" | "LEGIT";
  baitScore: number;
  summary: string;
  topReasons: string[];
  whatToDo: string;
  scores: {
    credibility: number;
    claimAccuracy: number;
    bias: number;
    transparency: number;
  };
}

const FALLBACK: VerdictResult = {
  verdict: "SUSPICIOUS",
  baitScore: 50,
  summary: "Unable to fully analyze this content. Proceed with caution.",
  topReasons: ["Analysis incomplete"],
  whatToDo: "Verify the information independently before acting on it.",
  scores: {
    credibility: 50,
    claimAccuracy: 50,
    bias: 50,
    transparency: 50,
  },
};

export async function synthesizeVerdict(
  credibility: CredibilityResult,
  claims: ClaimResult,
  bias: BiasResult
): Promise<VerdictResult> {
  const messages = [
    {
      role: "system" as const,
      content: `You are a verdict synthesizer for a financial content analysis app targeting young Italians aged 18-30. Synthesize the outputs of three analysis agents into a final verdict.

Rules:
- baitScore > 65 → verdict "BAIT"
- baitScore 35-65 → verdict "SUSPICIOUS"
- baitScore < 35 → verdict "LEGIT"
- The "summary" must be 1-2 sentences in a direct, slightly sardonic tone suitable for voice readout.
- Target audience: young Italians aged 18-30.

Return ONLY JSON with this exact shape:
{
  "verdict": "<BAIT | SUSPICIOUS | LEGIT>",
  "baitScore": <number 0-100>,
  "summary": "<1-2 sentences, voice-ready, slightly sardonic>",
  "topReasons": [<max 3 strings>],
  "whatToDo": "<one actionable sentence>",
  "scores": {
    "credibility": <number 0-100>,
    "claimAccuracy": <number 0-100>,
    "bias": <number 0-100>,
    "transparency": <number 0-100>
  }
}`,
    },
    {
      role: "user" as const,
      content: `Synthesize these agent results into a final verdict:

CREDIBILITY ANALYSIS:
${JSON.stringify(credibility)}

CLAIM EXTRACTION:
${JSON.stringify(claims)}

BIAS DETECTION:
${JSON.stringify(bias)}`,
    },
  ];

  try {
    const raw = await llm(messages, 3, true);
    return safeParseJSON<VerdictResult>(raw, FALLBACK);
  } catch (error) {
    console.error("Verdict agent error:", error);
    return FALLBACK;
  }
}
