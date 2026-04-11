import { Router, Request, Response } from "express";
import { llm, safeParseJSON } from "../utils/llm";

interface PortfolioInput {
  age: number;
  monthlyIncome: "under1k" | "1k-2k" | "2k-4k" | "over4k";
  goal: "emergency_fund" | "house" | "retirement" | "wealth" | "travel";
  riskTolerance: "low" | "medium" | "high";
  timeHorizonYears: number;
  currentSavings: "none" | "under5k" | "5k-20k" | "over20k";
}

interface AllocationResult {
  allocations: {
    asset: string;
    percentage: number;
    rationale: string;
    examples: string[];
  }[];
  summary: string;
  monthlyContribution: string;
  keyRisks: string[];
  btmTip: string;
}

const FALLBACK: AllocationResult = {
  allocations: [
    {
      asset: "Cash / Emergency Fund",
      percentage: 40,
      rationale: "Build a safety net before investing.",
      examples: ["Conto deposito BTM"],
    },
    {
      asset: "Bond ETF",
      percentage: 35,
      rationale: "Low-risk fixed income for stability.",
      examples: ["iShares Euro Government Bond", "Xtrackers II Eurozone Gov Bond"],
    },
    {
      asset: "Global Equity ETF",
      percentage: 25,
      rationale: "Long-term growth exposure.",
      examples: ["Vanguard FTSE All-World", "iShares MSCI World"],
    },
  ],
  summary: "A balanced starter portfolio focused on building an emergency fund while gaining market exposure.",
  monthlyContribution: "Start with what you can afford consistently, even €50/month.",
  keyRisks: ["Market volatility", "Inflation risk", "Currency risk"],
  btmTip: "Parla con un consulente BTM NEXT per personalizzare questo piano.",
};

const router = Router();

router.post("/generate", async (req: Request, res: Response) => {
  try {
    const input = req.body as PortfolioInput;

    if (!input.age || !input.monthlyIncome || !input.goal || !input.riskTolerance || !input.timeHorizonYears) {
      res.status(400).json({ error: "All portfolio fields are required" });
      return;
    }

    const messages = [
      {
        role: "system" as const,
        content: `You are a financial advisor for BTM NEXT, the youth community (18-30) of Banca Territori del Monviso, an Italian regional bank. Generate practical, concrete portfolio allocations suitable for Italian young investors. Reference ETFs available on Borsa Italiana where relevant. Allocations must sum to 100%.

Return ONLY JSON with this exact shape:
{
  "allocations": [
    {
      "asset": "<asset class name>",
      "percentage": <number>,
      "rationale": "<1 sentence>",
      "examples": ["<2-3 ETF or product names>"]
    }
  ],
  "summary": "<2-3 sentence strategy overview>",
  "monthlyContribution": "<suggested monthly amount as string>",
  "keyRisks": ["<max 3 risks>"],
  "btmTip": "<1 sentence referencing BTM NEXT services>"
}`,
      },
      {
        role: "user" as const,
        content: `Generate a portfolio allocation for this profile:
- Age: ${input.age}
- Monthly income: ${input.monthlyIncome}
- Primary goal: ${input.goal}
- Risk tolerance: ${input.riskTolerance}
- Time horizon: ${input.timeHorizonYears} years
- Current savings: ${input.currentSavings || "not specified"}`,
      },
    ];

    const raw = await llm(messages, 3, true);
    const result = safeParseJSON<AllocationResult>(raw, FALLBACK);

    res.json(result);
  } catch (error) {
    console.error("Portfolio route error:", error);
    res.status(500).json({ error: "Portfolio generation failed. Please try again." });
  }
});

export default router;
