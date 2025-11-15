import { useState } from "react";
import { Sparkles, GraduationCap, Lightbulb, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

export function AIFeaturesInfo() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-blue-800 p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-base mb-2 text-gray-900 dark:text-white">
                🎓 AI-Powered Learning Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 dark:text-blue-400">Contextual Helper:</span>{" "}
                      Select any text to get instant AI explanations and
                      experiment suggestions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400">AI Coach:</span> Your
                      personal tutor watches your decisions and provides
                      micro-lessons and practice tasks
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                These AI features help you understand financial concepts as you
                experiment with the simulation
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
