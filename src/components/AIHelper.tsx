import { useState } from "react";
import { HelpCircle, Lightbulb } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface AIHelperProps {
  context: string;
  tooltipText?: string;
}

export function AIHelper({ context, tooltipText = "Get help" }: AIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Simulated AI responses based on context
  const getHelpContent = (context: string) => {
    const helpContent: Record<
      string,
      { title: string; explanation: string; tips: string[] }
    > = {
      "expense-overview": {
        title: "Understanding Expenses",
        explanation:
          "Expenses are the costs you incur on a regular basis. Managing them effectively is crucial for financial stability.",
        tips: [
          "Track all your expenses to identify areas where you can save",
          "Prioritize essential expenses like rent and utilities",
          "Look for ways to reduce discretionary spending",
        ],
      },
      "income-overview": {
        title: "Income Sources",
        explanation:
          "Income is money you receive from various sources. Diversifying your income can provide financial security.",
        tips: [
          "Consider multiple income streams to reduce risk",
          "Invest in skills that can increase your earning potential",
          "Monitor your income growth over time",
        ],
      },
      "stock-market": {
        title: "Stock Market Basics",
        explanation:
          "The stock market allows you to buy ownership shares in companies. Stock prices fluctuate based on company performance and market conditions.",
        tips: [
          "Diversify your portfolio to reduce risk",
          "Research companies before investing",
          "Consider long-term investing over day trading",
          "Only invest money you can afford to lose",
        ],
      },
      "lifestyle-indicators": {
        title: "Lifestyle Indicators",
        explanation:
          "These indicators show how your financial decisions affect your quality of life. Like The Sims, they represent different aspects of wellbeing that respond to your choices.",
        tips: [
          "Balance spending across categories for overall wellbeing",
          "Low indicators can affect your decision-making ability",
          "Some indicators (like stress) are inverted - higher is better",
          "Monitor trends over time, not just current values",
        ],
      },
      "lifestyle-health": {
        title: "Health Indicator",
        explanation:
          "Your health is primarily influenced by your food budget. Adequate nutrition is essential for physical wellbeing.",
        tips: [
          "Spending too little on food can harm your health",
          "Quality food doesn't have to be the most expensive",
          "Poor health can lead to medical expenses",
        ],
      },
      "lifestyle-happiness": {
        title: "Happiness Indicator",
        explanation:
          "Happiness reflects your overall life satisfaction, influenced by leisure activities and financial security.",
        tips: [
          "Balance saving with enjoying life in the present",
          "Financial stress directly impacts happiness",
          "Small regular pleasures can be as valuable as big expenses",
        ],
      },
      "lifestyle-energy": {
        title: "Energy Indicator",
        explanation:
          "Energy represents your mental and physical capacity to work and engage with life. It's affected by work-life balance.",
        tips: [
          "Overworking (high expenses-to-income ratio) drains energy",
          "Adequate rest and downtime are essential",
          "Low energy can reduce productivity and decision quality",
        ],
      },
      "lifestyle-social": {
        title: "Social Life Indicator",
        explanation:
          "Your social connections depend on having time and resources for social activities and entertainment.",
        tips: [
          "Relationships require investment of time and money",
          "Social isolation can affect mental health",
          "Balance social spending with other priorities",
        ],
      },
      "lifestyle-stress": {
        title: "Stress Level Indicator",
        explanation:
          "Stress is shown inversely - higher numbers mean lower stress. Debt, deficits, and financial instability increase stress.",
        tips: [
          "High stress impairs decision-making",
          "Pay down debt to reduce stress",
          "Maintain an emergency fund for peace of mind",
        ],
      },
      "lifestyle-comfort": {
        title: "Living Comfort Indicator",
        explanation:
          "Your living situation quality affects daily comfort and wellbeing. Higher rent typically means better accommodation.",
        tips: [
          "Balance rent with other needs - expensive isn't always better",
          "Your home environment affects productivity and mood",
          "Consider location, space, and amenities in housing decisions",
        ],
      },
      "lifestyle-career": {
        title: "Career Progress Indicator",
        explanation:
          "Career progress reflects your professional development and earning potential.",
        tips: [
          "Income growth often comes from career advancement",
          "Invest in skills and education for long-term gains",
          "Job satisfaction matters beyond just salary",
        ],
      },
      "lifestyle-skills": {
        title: "Skills & Education Indicator",
        explanation:
          "Your knowledge and abilities grow through education and experience over time.",
        tips: [
          "Skills investment can increase future earning potential",
          "Continuous learning keeps you competitive",
          "Both formal education and self-study have value",
        ],
      },
      default: {
        title: "Financial Guidance",
        explanation:
          "This simulation helps you understand how financial decisions impact your overall financial health.",
        tips: [
          "Pay attention to the news feed for market trends",
          "Balance your budget to avoid debt",
          "Build an emergency fund for unexpected expenses",
        ],
      },
    };

    return helpContent[context] || helpContent.default;
  };

  const content = getHelpContent(context);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          aria-label={tooltipText}
        >
          <HelpCircle className="w-3 h-3 text-blue-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h4 className="text-sm">{content.title}</h4>
          </div>
          <p className="text-xs text-gray-600">{content.explanation}</p>
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Tips:</p>
            <ul className="space-y-1">
              {content.tips.map((tip, index) => (
                <li key={index} className="text-xs text-gray-600 flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
