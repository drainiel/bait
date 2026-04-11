import { llm, safeParseJSON } from "../utils/llm";

export interface BiasResult {
  score: number;
  signals: {
    fomo: boolean;
    fearMongering: boolean;
    affiliateLinks: boolean;
    urgencyLanguage: boolean;
    socialProof: boolean;
  };
  flags: string[];
}

const FALLBACK: BiasResult = {
  score: 50,
  signals: {
    fomo: false,
    fearMongering: false,
    affiliateLinks: false,
    urgencyLanguage: false,
    socialProof: false,
  },
  flags: ["Unable to assess bias"],
};

export async function detectBias(content: string): Promise<BiasResult> {
  const messages = [
    {
      role: "system" as const,
      content: `You are a psychological manipulation detection agent. Detect manipulation signals in financial content: FOMO, fear mongering, affiliate language, urgency, false social proof.
Return ONLY JSON with this exact shape:
{
  "score": <number 0-100, 100 = heavily manipulative>,
  "signals": {
    "fomo": <boolean>,
    "fearMongering": <boolean>,
    "affiliateLinks": <boolean>,
    "urgencyLanguage": <boolean>,
    "socialProof": <boolean>
  },
  "flags": [<max 3 short strings describing manipulation tactics found>]
}`,
    },
    {
      role: "user" as const,
      content: `Detect psychological manipulation signals in this financial content:

${content.slice(0, 4000)}`,
    },
  ];

  try {
    const raw = await llm(messages, 2, true);
    return safeParseJSON<BiasResult>(raw, FALLBACK);
  } catch (error) {
    console.error("Bias detector agent error:", error);
    return FALLBACK;
  }
}
