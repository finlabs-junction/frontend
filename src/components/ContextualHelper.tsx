import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface ContextualHelperProps {
  onClose: () => void;
  selectedText: string;
  context: string;
  position: { x: number; y: number };
}

export function ContextualHelper({
  onClose,
  selectedText,
  position,
}: ContextualHelperProps) {
  const getContextualContent = (text: string) => {
    const lowerText = text.toLowerCase();

    // Financial terms explanations
    if (lowerText.includes("dividend") || lowerText.includes("stock")) {
      return {
        type: "explanation",
        title: "Stock Market Concept",
        explanation:
          "Dividends are regular payments companies make to shareholders from their profits. They provide passive income from stock ownership.",
        experiments: [
          "Try buying stocks with high dividend yields",
          "Compare dividend income vs. price appreciation",
          "Observe how dividends change during economic downturns",
        ],
      };
    }

    if (
      lowerText.includes("interest rate") ||
      lowerText.includes("federal reserve")
    ) {
      return {
        type: "explanation",
        title: "Interest Rates Impact",
        explanation:
          "Interest rates set by the Federal Reserve affect borrowing costs, savings returns, and overall economic activity. Higher rates make loans expensive but increase savings yields.",
        experiments: [
          "Notice how your loan payments would change with rate increases",
          "Track how stock prices react to rate announcements",
          "Compare high-yield savings returns at different rates",
        ],
      };
    }

    if (lowerText.includes("expense") || lowerText.includes("budget")) {
      return {
        type: "explanation",
        title: "Budget Management",
        explanation:
          "Your expenses directly impact your financial health and lifestyle indicators. Balancing essential and discretionary spending is key to financial stability.",
        experiments: [
          "Try reducing one expense category by 20% and observe lifestyle effects",
          "Experiment with the 50/30/20 budget rule",
          "See what happens if you eliminate all leisure spending",
        ],
      };
    }

    if (lowerText.includes("rent") || lowerText.includes("accommodation")) {
      return {
        type: "explanation",
        title: "Housing Decisions",
        explanation:
          "Housing is typically your largest expense. The rent-to-income ratio should ideally be below 30%. Higher rent may provide better comfort but reduces savings capacity.",
        experiments: [
          "Downgrade to cheaper housing and invest the difference",
          "Compare how different rent levels affect your lifestyle indicators",
          "Calculate break-even point for buying vs. renting",
        ],
      };
    }

    if (lowerText.includes("loan") || lowerText.includes("debt")) {
      return {
        type: "explanation",
        title: "Debt Management",
        explanation:
          "Loans provide immediate capital but create long-term obligations. High debt increases stress and reduces financial flexibility. Interest compounds over time.",
        experiments: [
          "Try paying extra toward loan principal and track interest savings",
          "Compare taking a loan vs. saving for a purchase",
          "See how debt affects your ability to handle emergencies",
        ],
      };
    }

    if (
      lowerText.includes("health") ||
      lowerText.includes("happiness") ||
      lowerText.includes("stress")
    ) {
      return {
        type: "explanation",
        title: "Lifestyle Indicators",
        explanation:
          "Your financial choices directly impact quality of life. These indicators help you see the non-monetary effects of your decisions, similar to life simulation games.",
        experiments: [
          "Maximize one indicator and observe trade-offs with others",
          "Try balancing all indicators above 60%",
          "See what happens when stress drops too low",
        ],
      };
    }

    // Default contextual help
    return {
      type: "tip",
      title: "Financial Tip",
      explanation:
        "Every financial decision has both immediate and long-term consequences. Consider how your choices affect your balance, lifestyle, and future opportunities.",
      experiments: [
        "Track this metric over multiple months",
        "Compare your decision to alternatives",
        "Consider the opportunity cost",
      ],
    };
  };

  const content = getContextualContent(selectedText);

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
        <Card className="p-4 shadow-lg border-2 border-blue-200 bg-white">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm">{content.title}</h4>
                  <p className="text-xs text-gray-500">AI Explanation</p>
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

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-700 italic">"{selectedText}"</p>
            </div>

            <p className="text-xs text-gray-600">{content.explanation}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Lightbulb className="w-3 h-3 text-yellow-600" />
                <span>Experiment Suggestions:</span>
              </div>
              <ul className="space-y-1">
                {content.experiments.map((exp, index) => (
                  <li
                    key={index}
                    className="text-xs text-gray-600 flex gap-2 items-start"
                  >
                    <TrendingUp className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
