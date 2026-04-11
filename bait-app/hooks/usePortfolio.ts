import { useState, useCallback } from "react";
import { API_BASE } from "../constants/api";
import { PortfolioInput, AllocationResult } from "../types";

const TOTAL_STEPS = 5;

export function usePortfolio() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<PortfolioInput>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AllocationResult | null>(null);
  const [error, setError] = useState("");

  const setAnswer = useCallback(
    (key: keyof PortfolioInput, value: any) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const next = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const back = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/portfolio/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Portfolio generation failed");
      }

      const data: AllocationResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Portfolio generation failed"
      );
    } finally {
      setLoading(false);
    }
  }, [answers]);

  const reset = useCallback(() => {
    setStep(0);
    setAnswers({});
    setLoading(false);
    setResult(null);
    setError("");
  }, []);

  return {
    step,
    answers,
    setAnswer,
    next,
    back,
    submit,
    loading,
    result,
    error,
    reset,
  };
}
