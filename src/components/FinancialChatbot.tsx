import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useChatWithAIMutation } from "../redux/api/gameApi";
import { useAppSelector } from "../redux/store";
import type { GameState } from "../types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isEvaluation?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content:
    "Hey, I'm your financial advisor. I see all your financial data in the backend. How can I help you?",
  timestamp: new Date(),
};

export interface FinancialChatbotRef {
  addEvaluationMessage: (content: string) => void;
  openChat: () => void;
}

export const FinancialChatbot = forwardRef<FinancialChatbotRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentGameState = useAppSelector((state) => state.game.state);

  const [chatWithAI, { isLoading }] = useChatWithAIMutation();

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    addEvaluationMessage: (content: string) => {
      const evaluationMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content,
        timestamp: new Date(),
        isEvaluation: true,
      };
      setMessages((prev) => [...prev, evaluationMessage]);
      setIsOpen(true); // Auto-open chat
    },
    openChat: () => {
      setIsOpen(true);
    },
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFinancialContext = (gameState: GameState | null): string => {
    if (!gameState) return "";

    return `Current Financial Status:
- Balance: $${gameState.balance.toFixed(2)}
- Monthly Income: $${gameState.monthlyIncome.toFixed(2)}
- Monthly Expenses: $${gameState.monthlyExpenses.toFixed(2)}
- Monthly Net Income: $${gameState.monthlyNetIncome.toFixed(2)}
- Occupation: ${gameState.occupation}
- Monthly Salary: $${gameState.monthlySalary.toFixed(2)}
- Monthly Dividends: $${gameState.monthlyDividends.toFixed(2)}

Expenses Breakdown:
- Rent: $${gameState.monthlyRentExpense.toFixed(2)}
- Utilities: $${gameState.monthlyUtilitiesExpense.toFixed(2)}
- Groceries: $${gameState.monthlyGroceryExpense.toFixed(2)}
- Transportation: $${gameState.monthlyTransportationExpense.toFixed(2)}
- Leisure: $${gameState.monthlyLeisureExpense.toFixed(2)}
- Loan Payments: $${gameState.monthlyLoanExpense.toFixed(2)}
- Taxes: $${gameState.monthlyTaxExpense.toFixed(2)}

Lifestyle Indicators:
- Health: ${gameState.healthLevel}%
- Happiness: ${gameState.happinessLevel}%
- Energy: ${gameState.energyLevel}%
- Social Life: ${gameState.socialLifeLevel}%
- Stress: ${gameState.stressLevel}%
- Living Comfort: ${gameState.livingComfortLevel}%
- Career Progress: ${gameState.careerProgressLevel}%
- Skills/Education: ${gameState.skillsEducationLevel}%

Stocks Portfolio: ${gameState.stocks.length > 0 ? gameState.stocks.map((s) => `${s.symbol}: ${s.size} shares`).join(", ") : "No stocks owned"}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      // Build chat history with financial context prepended to the first user message
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add the new user message with financial context
      const contextualUserMessage = `${getFinancialContext(currentGameState!)}

${inputValue}`;

      chatHistory.push({
        role: "user" as const,
        content: contextualUserMessage,
      });

      const response = await chatWithAI({
        history: chatHistory,
      }).unwrap();

      // Use explanation as the main response, append hint if available
      const responseContent = response.content;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 border-4 border-white"
            aria-label="Open AI Financial Assistant"
          >
            <MessageCircle className="h-8 w-8 text-white" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </Button>
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl flex flex-col overflow-hidden border-2 border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Financial Assistant</h3>
                <p className="text-xs text-white/80">AI-powered advisor</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      : message.isEvaluation
                      ? "bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800 shadow-md border-2 border-amber-300"
                      : "bg-white text-gray-800 shadow-md border border-gray-200"
                  }`}
                >
                  {message.isEvaluation && (
                    <div className="text-xs font-semibold text-amber-600 mb-1">
                      📊 Financial Evaluation
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md border border-gray-200 rounded-2xl px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your finances..."
                disabled={isLoading}
                className="flex-1 border-gray-300 focus:border-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
});

FinancialChatbot.displayName = 'FinancialChatbot';
