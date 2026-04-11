import Groq from "groq-sdk";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let groq: Groq | null = null;
let openai: OpenAI | null = null;

function getGroq(): Groq {
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
  return groq;
}

function getOpenAI(): OpenAI {
  if (!openai) openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  return openai;
}

type Tier = 1 | 2 | 3;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const TIER_CONFIG: Record<Tier, { provider: "groq" | "openai"; model: string }> = {
  1: { provider: "groq", model: "llama-3.1-8b-instant" },
  2: { provider: "groq", model: "llama-3.3-70b-versatile" },
  3: { provider: "groq", model: "llama-3.3-70b-versatile" },
};

export async function llm(
  messages: ChatMessage[],
  tier: Tier,
  jsonMode: boolean = false
): Promise<string> {
  const config = TIER_CONFIG[tier];
  const responseFormat = jsonMode
    ? { type: "json_object" as const }
    : undefined;

  if (config.provider === "groq") {
    const response = await getGroq().chat.completions.create({
      model: config.model,
      messages,
      temperature: 0.2,
      response_format: responseFormat,
    });
    return response.choices[0]?.message?.content || "";
  }

  const response = await getOpenAI().chat.completions.create({
    model: config.model,
    messages,
    temperature: 0.2,
    response_format: responseFormat,
  });
  return response.choices[0]?.message?.content || "";
}

export function safeParseJSON<T>(raw: string, fallback: T): T {
  try {
    // Strip markdown code fences if present
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}
