import { useState, useCallback } from "react";
import { API_BASE } from "../constants/api";
import { AnalysisResponse, AgentStatus, AgentPhase } from "../types";

const INITIAL_STATUS: AgentStatus = {
  credibility: "idle",
  claims: "idle",
  bias: "idle",
  verdict: "idle",
};

export function useAnalyze() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>(INITIAL_STATUS);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");

  const updateAgent = (agent: keyof AgentStatus, phase: AgentPhase) => {
    setAgentStatus((prev) => ({ ...prev, [agent]: phase }));
  };

  const analyze = useCallback(async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setAgentStatus(INITIAL_STATUS);

    // Simulate agent progress with timeouts reflecting backend orchestration
    updateAgent("credibility", "running");
    updateAgent("claims", "running");

    const biasTimer = setTimeout(() => {
      updateAgent("credibility", "done");
      updateAgent("claims", "done");
      updateAgent("bias", "running");
    }, 2000);

    const verdictTimer = setTimeout(() => {
      updateAgent("bias", "done");
      updateAgent("verdict", "running");
    }, 3500);

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() }),
      });

      clearTimeout(biasTimer);
      clearTimeout(verdictTimer);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data: AnalysisResponse = await res.json();
      setResult(data);
      setAgentStatus({
        credibility: "done",
        claims: "done",
        bias: "done",
        verdict: "done",
      });
    } catch (err) {
      clearTimeout(biasTimer);
      clearTimeout(verdictTimer);
      setError(err instanceof Error ? err.message : "Analysis failed");
      setAgentStatus((prev) => ({ ...prev, verdict: "error" }));
    } finally {
      setLoading(false);
    }
  }, [input]);

  const reset = useCallback(() => {
    setInput("");
    setLoading(false);
    setAgentStatus(INITIAL_STATUS);
    setResult(null);
    setError("");
  }, []);

  return {
    input,
    setInput,
    loading,
    agentStatus,
    result,
    error,
    analyze,
    reset,
  };
}
