import { useState, useEffect } from "react";

interface UseEvaluationTimerOptions {
  intervalMinutes?: number;
  enabled?: boolean;
}

export function useEvaluationTimer({
  intervalMinutes = 1,
  enabled = true,
}: UseEvaluationTimerOptions = {}) {
  const [showEvaluation, setShowEvaluation] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;

    // Set up interval to show evaluation modal
    const timer = setInterval(() => {
      setShowEvaluation(true);
    }, intervalMs);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [intervalMinutes, enabled]);

  const closeEvaluation = () => {
    setShowEvaluation(false);
  };

  return {
    showEvaluation,
    closeEvaluation,
  };
}
