/* eslint-disable react-hooks/purity */
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
import { useNavigate } from "react-router";
import { useAppSelector } from "../redux/store";
import {
  useGetGameStateMutation,
  useSetTimeMultiplierMutation,
  useStartGameMutation,
  useStopGameMutation,
} from "../redux/api/gameApi";
import LoadingPage from "../components/LoadingScreen";
import { type NewsArticle } from "../types";

export default function App() {
  const navigate = useNavigate();

  const currentGameState = useAppSelector((state) => state.game.state);

  const [startGame, { isLoading: isLoadingStartGame }] = useStartGameMutation();
  const [getGameState] = useGetGameStateMutation();
  const [timeMultiplierMutation, { isLoading: isLoadingMultiplier }] =
    useSetTimeMultiplierMutation();
  const [stopGame, { isLoading: isLoadingStopGame }] = useStopGameMutation();

  // Time simulation state
  const [currentDate, setCurrentDate] = useState(new Date(2008, 0, 1));

  // Start at 2008 for financial crisis simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(
    currentGameState?.timeProgressionMultiplier ?? 1
  ); // Days per second

  // Financial state
  const [balance, setBalance] = useState(currentGameState?.balance ?? 15000);

  // AI Coach state
  /*const [showCoach, setShowCoach] = useState(true);
  const [coachMinimized, setCoachMinimized] = useState(false);
  const [userBehavior, setUserBehavior] = useState({
    stockTrades: 0,
    expenseChanges: 0,
    daysInDebt: 0,
    daysPlayed: 0,
    averageBalance: 15000,
    lifestyleAverages: {} as Record<string, number>,
  });*/

  // Contextual helper state
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [selectionContext, setSelectionContext] = useState("");

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);

  // Expenses data
  const [expenses, setExpenses] = useState([
    {
      id: "rent",
      category: "Rent",
      amount: currentGameState?.monthlyRentExpense ?? 1200,
      icon: Home,
      description: "Monthly apartment rent",
    },
    {
      id: "utilities",
      category: "Utilities",
      amount: currentGameState?.monthlyUtilitiesExpense ?? 150,
      icon: Zap,
      description: "Electricity, water, internet",
    },
    {
      id: "food",
      category: "Groceries",
      amount: currentGameState?.monthlyGroceryExpense ?? 400,
      icon: ShoppingCart,
      description: "Food and household items",
    },
    {
      id: "transport",
      category: "Transportation",
      amount: currentGameState?.monthlyTransportationExpense ?? 200,
      icon: Plane,
      description: "Car, gas, public transit",
    },
    {
      id: "leisure",
      category: "Leisure",
      amount: currentGameState?.monthlyLeisureExpense ?? 300,
      icon: Coffee,
      description: "Entertainment and dining out",
    },
    {
      id: "loan",
      category: "Loan Payment",
      amount: currentGameState?.monthlyLoanExpense ?? 250,
      icon: CreditCard,
      description: "Student loan payment",
    },
    {
      id: "taxes",
      category: "Taxes",
      amount: currentGameState?.monthlyTaxExpense ?? 500,
      icon: Receipt,
      description: "Monthly tax withholding",
    },
  ]);

  const [startedOnce, setStartedOnce] = useState(false);

  // Income data
  const [incomes, setIncomes] = useState([
    {
      id: "salary",
      source: "Salary",
      amount: 3500,
      icon: Briefcase,
      type: "recurring" as const,
      description: currentGameState?.occupation ?? "Software Developer",
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
    return [
      {
        id: "health",
        name: "Health",
        value: currentGameState?.healthLevel ?? 75,
        icon: Heart,
        color: "text-red-600",
        description: "Physical wellbeing",
      },
      {
        id: "happiness",
        name: "Happiness",
        value: currentGameState?.happinessLevel ?? 80,
        icon: Smile,
        color: "text-yellow-600",
        description: "Overall satisfaction",
      },
      {
        id: "energy",
        name: "Energy",
        value: currentGameState?.energyLevel ?? 70,
        icon: Battery,
        color: "text-green-600",
        description: "Mental & physical energy",
      },
      {
        id: "social",
        name: "Social Life",
        value: currentGameState?.socialLifeLevel ?? 60,
        icon: Users,
        color: "text-blue-600",
        description: "Relationships & connections",
      },
      {
        id: "stress",
        name: "Stress Level",
        value: currentGameState?.stressLevel ?? 50,
        icon: Zap,
        color: "text-purple-600",
        description: "Mental stress (higher is better)",
      },
      {
        id: "comfort",
        name: "Living Comfort",
        value: currentGameState?.livingComfortLevel ?? 70,
        icon: Home,
        color: "text-orange-600",
        description: "Quality of living space",
      },
      {
        id: "career",
        name: "Career Progress",
        value: currentGameState?.careerProgressLevel ?? 50,
        icon: Briefcase,
        color: "text-indigo-600",
        description: "Professional development",
      },
      {
        id: "skills",
        name: "Skills & Education",
        value: currentGameState?.skillsEducationLevel ?? 65,
        icon: Brain,
        color: "text-pink-600",
        description: "Knowledge & abilities",
      },
    ];
  };

  const lifestyleIndicators = calculateLifestyleIndicators();

  useEffect(() => {
    navigate("/");
  }, []);

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
      /*setUserBehavior((prev) => ({
        ...prev,
        daysPlayed: prev.daysPlayed + 30,
        daysInDebt: balance < 0 ? prev.daysInDebt + 1 : prev.daysInDebt,
        averageBalance: (prev.averageBalance + balance) / 2,
      }));*/
    }
  }, [currentDate]);

  // Track lifestyle indicators for AI coach
  useEffect(() => {
    const indicators = calculateLifestyleIndicators();
    const averages: Record<string, number> = {};
    indicators.forEach((ind) => {
      averages[ind.id] = ind.value;
    });
    /* setUserBehavior((prev) => ({
      ...prev,
      lifestyleAverages: averages,
    }));*/
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
      /* setUserBehavior((prev) => ({
        ...prev,
        stockTrades: prev.stockTrades + 1,
      }));*/

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
    /* setUserBehavior((prev) => ({
      ...prev,
      stockTrades: prev.stockTrades + 1,
    }));*/

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
    /* setUserBehavior((prev) => ({
      ...prev,
      expenseChanges: prev.expenseChanges + 1,
    }));*/

    if (newRent > oldRent) {
      toast.info(`Upgraded accommodation. Rent increased to $${newRent}/month`);
    } else {
      toast.info(`Changed accommodation. Rent reduced to $${newRent}/month`);
    }
  };

  // Poll game state every 1 second
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await getGameState();
      if (result && result.data && result.data.time) {
        setCurrentDate(new Date(result.data.time));

        const news = result.data.events || [];

        setNewsArticles((prev) => {
          const existingIds = new Set(prev.map((article) => article.id));
          const newArticles = news.filter(
            (article: NewsArticle) => !existingIds.has(article.id)
          );
          return [...prev, ...newArticles];
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getGameState]);

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

  if (isLoadingStartGame || isLoadingMultiplier || isLoadingStopGame) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-context="general">
      <Toaster position="top-right" richColors />

      <TimeControls
        currentDate={currentDate}
        isPlaying={isPlaying}
        speed={speed}
        onPlayPause={async () => {
          if (!isPlaying) {
            await startGame(startedOnce);
            setStartedOnce(true);
          } else {
            await stopGame();
          }
          setIsPlaying(!isPlaying);
        }}
        onSpeedChange={async (speedValue) => {
          await timeMultiplierMutation(speedValue);
          setSpeed(speedValue);
        }}
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
          balance={currentGameState?.balance ?? 0}
          monthlyIncome={currentGameState?.monthlyIncome ?? 0}
          monthlyExpenses={currentGameState?.monthlyExpenses ?? 0}
          monthlyNetIncome={currentGameState?.monthlyNetIncome ?? 0}
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
                  onChangeMonthlyGroceryExpense={() => {}}
                  onChangeMonthlyLeisureExpense={() => {}}
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
      {/*showCoach && (
        <AICoach
          behavior={userBehavior}
          currentBalance={balance}
          onDismiss={() => setShowCoach(false)}
          isMinimized={coachMinimized}
          onToggleMinimize={() => setCoachMinimized(!coachMinimized)}
        />
      )*/}
    </div>
  );
}
