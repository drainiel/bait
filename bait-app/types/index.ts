// Agent outputs
export interface CredibilityResult {
  score: number;
  hasAuthor: boolean;
  hasCitations: boolean;
  domainReputation: "unknown" | "low" | "medium" | "high";
  flags: string[];
}

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

// Full response from POST /api/analyze
export interface AnalysisResponse {
  inputType: "url" | "text";
  sourceUrl?: string;
  credibility: CredibilityResult;
  claims: ClaimResult;
  bias: BiasResult;
  verdict: VerdictResult;
}

// Portfolio
export interface PortfolioInput {
  age: number;
  monthlyIncome: "under1k" | "1k-2k" | "2k-4k" | "over4k";
  goal: "emergency_fund" | "house" | "retirement" | "wealth" | "travel";
  riskTolerance: "low" | "medium" | "high";
  timeHorizonYears: number;
  currentSavings: "none" | "under5k" | "5k-20k" | "over20k";
}

export interface AllocationItem {
  asset: string;
  percentage: number;
  rationale: string;
  examples: string[];
}

export interface AllocationResult {
  allocations: AllocationItem[];
  summary: string;
  monthlyContribution: string;
  keyRisks: string[];
  btmTip: string;
}

// Voice advisor
export interface TranscriptEntry {
  role: "user" | "agent";
  text: string;
  timestamp: number;
}

// Agent swarm progress tracking
export type AgentPhase = "idle" | "running" | "done" | "error";

export interface AgentStatus {
  credibility: AgentPhase;
  claims: AgentPhase;
  bias: AgentPhase;
  verdict: AgentPhase;
}
