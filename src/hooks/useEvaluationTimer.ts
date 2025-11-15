import { useEffect, useRef } from "react";

interface UseEvaluationTimerOptions {
  intervalMinutes?: number;
  enabled?: boolean;
  onEvaluation?: () => void;
}

export function useEvaluationTimer({
  intervalMinutes = 1,
  enabled = true,
  onEvaluation,
}: UseEvaluationTimerOptions = {}) {
  const onEvaluationRef = useRef(onEvaluation);

  // Keep ref updated
  useEffect(() => {
    onEvaluationRef.current = onEvaluation;
  }, [onEvaluation]);

  useEffect(() => {
    if (!enabled || !onEvaluationRef.current) {
      return;
    }

    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;

    // Set up interval to trigger evaluation callback
    const timer = setInterval(() => {
      onEvaluationRef.current?.();
    }, intervalMs);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [intervalMinutes, enabled]);
}
