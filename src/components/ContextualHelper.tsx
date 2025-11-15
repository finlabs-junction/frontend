/* eslint-disable react-hooks/rules-of-hooks */
import { Sparkles, Loader2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useExplainEventMutation } from "../redux/api/gameApi";
import { useEffect } from "react";

interface ContextualHelperProps {
  onClose: () => void;
  selectedText: string;
  context: string;
  position: { x: number; y: number };
  newsId: string | null;
  articleText: string | null;
}

export function ContextualHelper({
  onClose,
  selectedText,
  context,
  position,
  newsId,
  articleText,
}: ContextualHelperProps) {
  const [explainEvent, { data, isLoading, isError }] =
    useExplainEventMutation();

  // Only work for news context
  if (context !== "news" || !newsId || !articleText) {
    return null;
  }

  // Call API when component mounts or when selectedText/articleText changes
  useEffect(() => {
    if (articleText && selectedText) {
      explainEvent({
        context: articleText,
        text: selectedText,
      });
    }
  }, [articleText, selectedText, explainEvent]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50"
        style={{
          left: Math.min(position.x, window.innerWidth - 350),
          top: Math.min(position.y + 20, window.innerHeight - 400),
          maxWidth: "320px",
        }}
      >
        <Card className="p-4 shadow-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm text-gray-900 dark:text-white">News Explanation</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Explanation</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-xs text-gray-700 dark:text-gray-300 italic">"{selectedText}"</p>
            </div>

            {isLoading && (
              <p className="text-xs text-gray-600 dark:text-gray-400">Loading explanation...</p>
            )}

            {isError && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Failed to load explanation. Please try again.
              </p>
            )}

            {data && !isLoading && (
              <p className="text-xs text-gray-600 dark:text-gray-300">{data.explanation}</p>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
