import { llm, safeParseJSON } from "../utils/llm";

export interface Claim {
  text: string;
  type: "return_promise" | "risk_warning" | "factual" | "opinion" | "cta";
  isSuspicious: boolean;
}

export interface ClaimResult {
  claims: Claim[];
  totalClaims: number;
  suspiciousCount: number;
}

const FALLBACK: ClaimResult = {
  claims: [],
  totalClaims: 0,
  suspiciousCount: 0,
};

export async function extractClaims(content: string): Promise<ClaimResult> {
  const messages = [
    {
      role: "system" as const,
      content: `You are a financial claim extraction agent. Extract up to 6 financial claims from the content. Mark each as suspicious if it promises returns, uses urgency, or lacks evidence.
Return ONLY JSON with this exact shape:
{
  "claims": [
    {
      "text": "<the claim text>",
      "type": "<return_promise | risk_warning | factual | opinion | cta>",
      "isSuspicious": <boolean>
    }
  ],
  "totalClaims": <number>,
  "suspiciousCount": <number>
}`,
    },
    {
      role: "user" as const,
      content: `Extract financial claims from this content:

${content.slice(0, 4000)}`,
    },
  ];

  try {
    const raw = await llm(messages, 1, true);
    return safeParseJSON<ClaimResult>(raw, FALLBACK);
  } catch (error) {
    console.error("Claim extractor agent error:", error);
    return FALLBACK;
  }
}
