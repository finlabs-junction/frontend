/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { TrendingUp, Sparkles, Target, X, CheckCircle2 } from "lucide-react";
import { useGetEvaluationMutation } from "../redux/api/gameApi";

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvaluationModal({ isOpen, onClose }: EvaluationModalProps) {
  const [getEvaluation, { isLoading }] = useGetEvaluationMutation();
  const [evaluation, setEvaluation] = useState<{
    content: string;
  } | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [hasStartedFetch, setHasStartedFetch] = useState(false);

  const fetchEvaluation = async () => {
    if (hasStartedFetch) return; // Prevent duplicate fetches

    setHasStartedFetch(true);
    try {
      const result = await getEvaluation().unwrap();
      setEvaluation(result);

      // Delay showing content for a nice transition
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    } catch (error) {
      console.error("Error fetching evaluation:", error);
      // On error, close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  useEffect(() => {
    if (isOpen && !hasStartedFetch) {
      fetchEvaluation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // fetchEvaluation uses hasStartedFetch guard to prevent infinite loops

  const handleClose = () => {
    setEvaluation(null);
    setShowContent(false);
    setHasStartedFetch(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000" />
          </div>

          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Performance Evaluation
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {isLoading || !showContent ? (
            // Loading State
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                {/* Spinning circle animation */}
                <div className="w-24 h-24 border-8 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-indigo-600 animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Analyzing Your Performance
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Our AI is reviewing your financial decisions, portfolio
                  performance, and lifestyle choices to provide personalized
                  insights...
                </p>
              </div>

              {/* Animated dots */}
              <div className="flex gap-2">
                <div
                  className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-3 h-3 bg-pink-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          ) : evaluation ? (
            // Evaluation Content
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
              </div>

              {/* Evaluation Explanation */}
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-indigo-900 mb-2">
                      Your Performance Analysis
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {evaluation.content}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Action Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2 text-lg"
                >
                  Got it, thanks!
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
