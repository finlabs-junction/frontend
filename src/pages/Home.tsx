/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { TimeControls } from "../components/TimeControls";
import { BudgetDashboard } from "../components/BudgetDashboard";
import { ExpenseManager } from "../components/ExpenseManager";
import { IncomeManager } from "../components/IncomeManager";
import { StockMarket } from "../components/StockMarket";
import { NewsFeed } from "../components/NewsFeed";
import { ActionsPanel } from "../components/ActionsPanel";
import { FinancialChart } from "../components/FinancialChart";
import { LifestyleIndicators } from "../components/LifestyleIndicators";
import { ContextualHelper } from "../components/ContextualHelper";
import { AICoach } from "../components/AICoach";
import { AIFeaturesInfo } from "../components/AIFeaturesInfo";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Home,
  Zap,
  ShoppingCart,
  Plane,
  Coffee,
  CreditCard,
  Receipt,
  Briefcase,
  TrendingUp,
  Heart,
  Smile,
  Battery,
  Users,
  Brain,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export default function App() {
  // Time simulation state
  const [currentDate, setCurrentDate] = useState(new Date(2008, 0, 1)); // Start at 2008 for financial crisis simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Financial state
  const [balance, setBalance] = useState(15000);

  // AI Coach state
  const [showCoach, setShowCoach] = useState(true);
  const [coachMinimized, setCoachMinimized] = useState(false);
  const [userBehavior, setUserBehavior] = useState({
    stockTrades: 0,
    expenseChanges: 0,
    daysInDebt: 0,
    daysPlayed: 0,
    averageBalance: 15000,
    lifestyleAverages: {} as Record<string, number>,
  });

  // Contextual helper state
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [selectionContext, setSelectionContext] = useState("");

  // Expenses data
  const [expenses, setExpenses] = useState([
    {
      id: "rent",
      category: "Rent",
      amount: 1200,
      icon: Home,
      description: "Monthly apartment rent",
    },
    {
      id: "utilities",
      category: "Utilities",
      amount: 150,
      icon: Zap,
      description: "Electricity, water, internet",
    },
    {
      id: "food",
      category: "Groceries",
      amount: 400,
      icon: ShoppingCart,
      description: "Food and household items",
    },
    {
      id: "transport",
      category: "Transportation",
      amount: 200,
      icon: Plane,
      description: "Car, gas, public transit",
    },
    {
      id: "leisure",
      category: "Leisure",
      amount: 300,
      icon: Coffee,
      description: "Entertainment and dining out",
    },
    {
      id: "loan",
      category: "Loan Payment",
      amount: 250,
      icon: CreditCard,
      description: "Student loan payment",
    },
    {
      id: "taxes",
      category: "Taxes",
      amount: 500,
      icon: Receipt,
      description: "Monthly tax withholding",
    },
  ]);

  // Income data
  const [incomes, setIncomes] = useState([
    {
      id: "salary",
      source: "Salary",
      amount: 3500,
      icon: Briefcase,
      type: "recurring" as const,
      description: "Software Developer",
    },
    {
      id: "stocks",
      source: "Stock Dividends",
      amount: 50,
      icon: TrendingUp,
      type: "recurring" as const,
      description: "Portfolio dividends",
    },
  ]);

  // Stock market data
  const [stocks, setStocks] = useState([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 180.0,
      change: 2.5,
      changePercent: 1.41,
      owned: 5,
      history: [
        { date: "Jan 1", price: 175 },
        { date: "Jan 8", price: 177 },
        { date: "Jan 15", price: 180 },
      ],
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 220.0,
      change: -1.2,
      changePercent: -0.54,
      owned: 3,
      history: [
        { date: "Jan 1", price: 218 },
        { date: "Jan 8", price: 221 },
        { date: "Jan 15", price: 220 },
      ],
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 95.0,
      change: 0.8,
      changePercent: 0.85,
      owned: 0,
      history: [
        { date: "Jan 1", price: 93 },
        { date: "Jan 8", price: 94 },
        { date: "Jan 15", price: 95 },
      ],
    },
  ]);

  // News feed data
  const [newsArticles, setNewsArticles] = useState([
    {
      id: "1",
      title: "Federal Reserve Announces Interest Rate Decision",
      summary:
        "The Fed maintains current interest rates amid economic uncertainty, signaling caution for future monetary policy.",
      date: "Jan 1, 2008",
      category: "financial" as const,
      relevance: "high" as const,
      hint: "Interest rates affect loan costs and savings account returns. Monitor this for financial planning.",
    },
    {
      id: "2",
      title: "Housing Market Shows Signs of Weakness",
      summary:
        "Real estate analysts report declining home prices in major metropolitan areas, raising concerns about market stability.",
      date: "Jan 1, 2008",
      category: "alert" as const,
      relevance: "high" as const,
      hint: "A weakening housing market could signal broader economic challenges. Consider building emergency savings.",
    },
    {
      id: "3",
      title: "Tech Industry Hiring Remains Strong",
      summary:
        "Major technology companies continue aggressive hiring despite market volatility, offering competitive salaries.",
      date: "Jan 1, 2008",
      category: "financial" as const,
      relevance: "medium" as const,
    },
    {
      id: "4",
      title: "New Year Celebrations Draw Record Crowds",
      summary:
        "Cities across the nation report unprecedented attendance at New Year's Eve celebrations and events.",
      date: "Jan 1, 2008",
      category: "general" as const,
      relevance: "low" as const,
    },
  ]);

  // Financial history for chart
  const [financialHistory, setFinancialHistory] = useState([
    { date: "Dec 1", balance: 14500, income: 3550, expenses: 3000 },
    { date: "Dec 8", balance: 14750, income: 3550, expenses: 3000 },
    { date: "Dec 15", balance: 15000, income: 3550, expenses: 3000 },
    { date: "Dec 22", balance: 15250, income: 3550, expenses: 3000 },
    { date: "Dec 29", balance: 15500, income: 3550, expenses: 3000 },
    { date: "Jan 1", balance: 15000, income: 3550, expenses: 3000 },
  ]);

  const monthlyIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const monthlyExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budget = monthlyIncome * 1.5;

  // Calculate lifestyle indicators based on financial decisions
  const calculateLifestyleIndicators = () => {
    const foodExpense = expenses.find((e) => e.id === "food")?.amount || 0;
    const leisureExpense =
      expenses.find((e) => e.id === "leisure")?.amount || 0;
    const rentExpense = expenses.find((e) => e.id === "rent")?.amount || 0;
    const loanExpense = expenses.find((e) => e.id === "loan")?.amount || 0;

    const netIncome = monthlyIncome - monthlyExpenses;
    const stressFromDebt = Math.max(0, loanExpense / 10); // Loans increase stress
    const stressFromDeficit = balance < 0 ? 20 : 0;

    return [
      {
        id: "health",
        name: "Health",
        value: Math.min(100, Math.max(20, foodExpense / 8 + 50)), // Good food = better health
        icon: Heart,
        color: "text-red-600",
        description: "Physical wellbeing",
      },
      {
        id: "happiness",
        name: "Happiness",
        value: Math.min(
          100,
          Math.max(10, leisureExpense / 5 + (balance > 0 ? 30 : 0) + 20)
        ),
        icon: Smile,
        color: "text-yellow-600",
        description: "Overall satisfaction",
      },
      {
        id: "energy",
        name: "Energy",
        value: Math.min(
          100,
          Math.max(30, 70 - (monthlyExpenses / monthlyIncome) * 30)
        ),
        icon: Battery,
        color: "text-green-600",
        description: "Mental & physical energy",
      },
      {
        id: "social",
        name: "Social Life",
        value: Math.min(100, Math.max(20, leisureExpense / 3 + 30)),
        icon: Users,
        color: "text-blue-600",
        description: "Relationships & connections",
      },
      {
        id: "stress",
        name: "Stress Level",
        value: Math.min(
          100,
          Math.max(
            0,
            100 - stressFromDebt - stressFromDeficit - (netIncome < 0 ? 30 : 0)
          )
        ),
        icon: Zap,
        color: "text-purple-600",
        description: "Mental stress (higher is better)",
      },
      {
        id: "comfort",
        name: "Living Comfort",
        value: Math.min(100, Math.max(20, rentExpense / 25 + 20)),
        icon: Home,
        color: "text-orange-600",
        description: "Quality of living space",
      },
      {
        id: "career",
        name: "Career Progress",
        value: Math.min(100, Math.max(30, monthlyIncome / 50 + 10)),
        icon: Briefcase,
        color: "text-indigo-600",
        description: "Professional development",
      },
      {
        id: "skills",
        name: "Skills & Education",
        value: 65, // Could increase over time with education spending
        icon: Brain,
        color: "text-pink-600",
        description: "Knowledge & abilities",
      },
    ];
  };

  const lifestyleIndicators = calculateLifestyleIndicators();

  // Time simulation effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setDate(next.getDate() + 1);
        return next;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Update news and financials based on date
  useEffect(() => {
    // Simulate monthly income/expense updates
    const dayOfMonth = currentDate.getDate();
    if (dayOfMonth === 1) {
      // Monthly income
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBalance((prev) => prev + monthlyIncome);
    }
    if (dayOfMonth === 15) {
      // Mid-month expenses
      setBalance((prev) => prev - monthlyExpenses / 2);
    }
    if (dayOfMonth === 30) {
      // End-month expenses
      setBalance((prev) => prev - monthlyExpenses / 2);

      // Update financial history
      const monthName = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      setFinancialHistory((prev) => [
        ...prev.slice(-5),
        {
          date: monthName,
          balance,
          income: monthlyIncome,
          expenses: monthlyExpenses,
        },
      ]);

      // Update user behavior tracking
      setUserBehavior((prev) => ({
        ...prev,
        daysPlayed: prev.daysPlayed + 30,
        daysInDebt: balance < 0 ? prev.daysInDebt + 1 : prev.daysInDebt,
        averageBalance: (prev.averageBalance + balance) / 2,
      }));
    }

    // Generate news based on date (simplified)
    if (
      currentDate.getMonth() === 8 &&
      currentDate.getFullYear() === 2008 &&
      dayOfMonth === 15
    ) {
      setNewsArticles((prev) => [
        {
          id: "lehman",
          title: "BREAKING: Lehman Brothers Files for Bankruptcy",
          summary:
            "In the largest bankruptcy filing in U.S. history, Lehman Brothers collapses, sending shockwaves through global financial markets.",
          date: currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          category: "alert" as const,
          relevance: "high" as const,
          hint: "Major market crisis! Consider reducing stock exposure and increasing emergency savings immediately.",
        },
        ...prev,
      ]);

      // Show AI coach notification
      if (coachMinimized) {
        toast.warning(
          "Major financial event! Check your AI Coach for guidance.",
          {
            duration: 5000,
          }
        );
      }
    }
  }, [currentDate]);

  // Track lifestyle indicators for AI coach
  useEffect(() => {
    const indicators = calculateLifestyleIndicators();
    const averages: Record<string, number> = {};
    indicators.forEach((ind) => {
      averages[ind.id] = ind.value;
    });
    setUserBehavior((prev) => ({
      ...prev,
      lifestyleAverages: averages,
    }));
  }, [expenses, incomes, balance]);

  const handleBuyStock = (symbol: string, shares: number) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (!stock) return;

    const cost = stock.price * shares;
    if (balance >= cost) {
      setBalance((prev) => prev - cost);
      setStocks((prev) =>
        prev.map((s) =>
          s.symbol === symbol ? { ...s, owned: s.owned + shares } : s
        )
      );

      // Track behavior
      setUserBehavior((prev) => ({
        ...prev,
        stockTrades: prev.stockTrades + 1,
      }));

      toast.success(`Bought ${shares} shares of ${symbol}`);
    } else {
      toast.error("Insufficient funds for this purchase");
    }
  };

  const handleSellStock = (symbol: string, shares: number) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (!stock || stock.owned < shares) return;

    const proceeds = stock.price * shares;
    setBalance((prev) => prev + proceeds);
    setStocks((prev) =>
      prev.map((s) =>
        s.symbol === symbol ? { ...s, owned: s.owned - shares } : s
      )
    );

    // Track behavior
    setUserBehavior((prev) => ({
      ...prev,
      stockTrades: prev.stockTrades + 1,
    }));

    // Update stock dividends income
    const totalStockValue = stocks.reduce(
      (sum, s) => sum + s.price * s.owned,
      0
    );
    const monthlyDividend = totalStockValue * 0.0015; // 0.15% monthly dividend
    setIncomes((prev) =>
      prev.map((inc) =>
        inc.id === "stocks" ? { ...inc, amount: monthlyDividend } : inc
      )
    );

    toast.success(
      `Sold ${shares} shares of ${symbol} for $${proceeds.toFixed(2)}`
    );
  };

  const handleChangeAccommodation = (type: string) => {
    const accommodationCosts: Record<string, number> = {
      studio: 800,
      "1bed": 1200,
      "2bed": 1800,
      house: 2500,
      shared: 400,
    };

    const newRent = accommodationCosts[type] || 1200;
    const oldRent = expenses.find((e) => e.id === "rent")?.amount || 1200;

    setExpenses((prev) =>
      prev.map((exp) => (exp.id === "rent" ? { ...exp, amount: newRent } : exp))
    );

    // Track behavior
    setUserBehavior((prev) => ({
      ...prev,
      expenseChanges: prev.expenseChanges + 1,
    }));

    if (newRent > oldRent) {
      toast.info(`Upgraded accommodation. Rent increased to $${newRent}/month`);
    } else {
      toast.info(`Changed accommodation. Rent reduced to $${newRent}/month`);
    }
  };

  // Text selection handler for contextual helper
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 3 && text.length < 200) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setSelectionPosition({ x: rect.left, y: rect.bottom });

          // Determine context based on where selection was made
          const parentElement = range?.startContainer.parentElement;
          const context =
            parentElement
              ?.closest("[data-context]")
              ?.getAttribute("data-context") || "general";
          setSelectionContext(context);
        }
      } else {
        setSelectedText(null);
      }
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" data-context="general">
      <Toaster position="top-right" richColors />

      <TimeControls
        currentDate={currentDate}
        isPlaying={isPlaying}
        speed={speed}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
        onDateChange={setCurrentDate}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Financial Simulation Learning Tool</h1>
          <p className="text-gray-600">
            Experience real-world financial events and learn to manage your
            finances through interactive simulation
          </p>
        </div>

        <AIFeaturesInfo />

        <BudgetDashboard
          balance={balance}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
          savings={5000}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LifestyleIndicators indicators={lifestyleIndicators} />

            <FinancialChart data={financialHistory} />

            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="expenses" className="mt-6">
                <ExpenseManager
                  expenses={expenses}
                  budget={budget}
                  onAdjustExpense={(id, amount) => {
                    setExpenses((prev) =>
                      prev.map((exp) =>
                        exp.id === id ? { ...exp, amount } : exp
                      )
                    );
                  }}
                />
              </TabsContent>
              <TabsContent value="income" className="mt-6">
                <IncomeManager incomes={incomes} />
              </TabsContent>
              <TabsContent value="stocks" className="mt-6">
                <StockMarket
                  stocks={stocks}
                  balance={balance}
                  onBuyStock={handleBuyStock}
                  onSellStock={handleSellStock}
                />
              </TabsContent>
              <TabsContent value="actions" className="mt-6">
                <ActionsPanel
                  onChangeAccommodation={handleChangeAccommodation}
                  onChangeBudget={() => {}}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <NewsFeed articles={newsArticles} />
          </div>
        </div>
      </div>

      {/* Contextual Helper - appears on text selection */}
      {selectedText && (
        <ContextualHelper
          selectedText={selectedText}
          context={selectionContext}
          position={selectionPosition}
          onClose={() => setSelectedText(null)}
        />
      )}

      {/* AI Coach - personalized guidance */}
      {showCoach && (
        <AICoach
          behavior={userBehavior}
          currentBalance={balance}
          onDismiss={() => setShowCoach(false)}
          isMinimized={coachMinimized}
          onToggleMinimize={() => setCoachMinimized(!coachMinimized)}
        />
      )}
    </div>
  );
}
