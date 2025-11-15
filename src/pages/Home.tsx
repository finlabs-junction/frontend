/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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
import { Button } from "../components/ui/button";
import { StopCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useAppSelector } from "../redux/store";
import {
  useSetTimeMultiplierMutation,
  useStartGameMutation,
  usePauseGameMutation,
  useStopGameMutation,
  useGetAllAccomodationsQuery,
  useGetEvaluationMutation,
} from "../redux/api/gameApi";
import LoadingPage from "../components/LoadingScreen";
import { type NewsArticle } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useGameStatePolling } from "../hooks/useGameStatePolling";
import { useTextSelection } from "../hooks/useTextSelection";
import { useFinancialHandlers } from "../hooks/useFinancialHandlers";
import { calculateLifestyleIndicators } from "../utils/lifestyleIndicators";
import { getInitialExpenses, getInitialIncomes } from "../constants/gameData";
import { getCookie } from "../utils/cookies";
import { Leaderboard } from "../components/Leaderboard";
import { FinancialChatbot, type FinancialChatbotRef } from "../components/FinancialChatbot";
import { useEvaluationTimer } from "../hooks/useEvaluationTimer";

export default function Home() {
  const { signOut } = useAuth();
  const currentGameState = useAppSelector((state) => state.game.state);
  const stockPrices = useAppSelector((state) => state.game.stockPrices);
  const chatbotRef = React.useRef<FinancialChatbotRef>(null);

  const [startGame, { isLoading: isLoadingStartGame }] = useStartGameMutation();
  const [timeMultiplierMutation, { isLoading: isLoadingMultiplier }] =
    useSetTimeMultiplierMutation();
  const [pauseGame, { isLoading: isLoadingPauseGame }] = usePauseGameMutation();
  const [stopGame, { isLoading: isLoadingStopGame }] = useStopGameMutation();
  const [getEvaluation] = useGetEvaluationMutation();
  const all_accommodations = useGetAllAccomodationsQuery();

  const isPlayer = localStorage.getItem("isHost") === "false";
  const isMultiplayer = localStorage.getItem("isHost") !== null;
  const username = getCookie("username");

  // State
  const [currentDate, setCurrentDate] = useState(new Date(2008, 0, 1));
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(
    currentGameState?.timeProgressionMultiplier ?? 1
  );
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [expenses, setExpenses] = useState(
    getInitialExpenses(currentGameState)
  );
  const [startedOnce, setStartedOnce] = useState(false);
  const [financialHistory, setFinancialHistory] = useState<
    Array<{ date: string; balance: number; income: number; expenses: number }>
  >([
    {
      date: new Date(2008, 0, 1).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      balance: currentGameState?.balance ?? 15000,
      income: currentGameState?.monthlyIncome ?? 3550,
      expenses: currentGameState?.monthlyExpenses ?? 3000,
    },
  ]);
  const incomes = getInitialIncomes(currentGameState);

  const monthlyIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const budget = monthlyIncome * 1.5;

  // Custom hooks
  const {
    selectedText,
    selectionPosition,
    selectionContext,
    newsId,
    articleText,
    clearSelection,
  } = useTextSelection();

  const { handleBuyStock, handleSellStock } = useFinancialHandlers(
    expenses,
    setExpenses
  );

  // Evaluation timer - triggers chatbot evaluation every 1 minute for logged-in users
  useEvaluationTimer({
    intervalMinutes: 1,
    enabled: !!username, // Only enable if user is logged in
    onEvaluation: async () => {
      try {
        const response = await getEvaluation().unwrap();
        chatbotRef.current?.addEvaluationMessage(response.content);
      } catch (error) {
        console.error('Failed to fetch evaluation:', error);
        chatbotRef.current?.addEvaluationMessage(
          "I tried to evaluate your financial progress, but encountered an error. Feel free to ask me directly about your finances!"
        );
      }
    },
  });

  useGameStatePolling({
    isPlayer,
    setCurrentDate,
    setIsPlaying,
    setNewsArticles,
    setFinancialHistory,
  });

  // Calculate lifestyle indicators
  const lifestyleIndicators = calculateLifestyleIndicators(currentGameState!);

  // Transform stock data for StockMarket component
  const transformedStocks = (currentDate: Date) => {
    if (!stockPrices || !currentGameState?.stocks) return [];

    const symbols = Object.keys(stockPrices);
    return symbols.map((symbol) => {
      const priceHistory = stockPrices[symbol];
      const dates = Object.keys(priceHistory).sort();

      // Format current date to match the key format in priceHistory
      const currentDateKey = currentDate.toISOString().split("T")[0];

      // Calculate yesterday's date
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split("T")[0];

      // Get prices for current date and yesterday
      const currentPrice =
        priceHistory[currentDateKey] ||
        priceHistory[dates[dates.length - 1]] ||
        0;
      const previousPrice = priceHistory[yesterdayKey] || currentPrice;

      const change = currentPrice - previousPrice;
      const changePercent =
        previousPrice !== 0 ? (change / previousPrice) * 100 : 0;

      const ownedStock = currentGameState.stocks.find(
        (s) => s.symbol === symbol
      );
      const owned = ownedStock?.size || 0;

      // Create history for chart
      const history = dates.map((date) => ({
        date,
        price: priceHistory[date],
      }));

      return {
        symbol,
        name: symbol, // You might want to add a mapping for full names
        price: currentPrice,
        change,
        changePercent,
        owned,
        history,
      };
    });
  };

  const stocks = transformedStocks(currentDate);

  // Handler for stopping multiplayer game
  const handleStopGame = async () => {
    try {
      await stopGame();
      localStorage.removeItem("isHost");
      localStorage.removeItem("sessionToken");
      await signOut();
      toast.success("Game stopped successfully!");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to stop game");
    }
  };

  if (
    isLoadingStartGame ||
    isLoadingMultiplier ||
    isLoadingPauseGame ||
    isLoadingStopGame ||
    all_accommodations.isLoading
  ) {
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
            await timeMultiplierMutation(speed);
            await startGame(startedOnce);
            setStartedOnce(true);
          } else {
            await pauseGame();
          }
          setIsPlaying(!isPlaying);
        }}
        onSpeedChange={async (speedValue) => {
          await timeMultiplierMutation(speedValue);
          setSpeed(speedValue);
        }}
        isPlayer={isPlayer}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl mb-2">
              Financial Simulation Learning Tool
            </h1>
            <p className="text-gray-600">
              Experience real-world financial events and learn to manage your
              finances through interactive simulation
            </p>
          </div>
          {isMultiplayer && !isPlayer && (
            <Button
              onClick={handleStopGame}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <StopCircle className="w-4 h-4" />
              Stop Game
            </Button>
          )}
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
                  balance={currentGameState?.balance ?? 0}
                  onBuyStock={handleBuyStock}
                  onSellStock={handleSellStock}
                />
              </TabsContent>
              <TabsContent value="actions" className="mt-6">
                <ActionsPanel />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {currentGameState && isMultiplayer && username && (
              <Leaderboard
                players={currentGameState.players}
                currentPlayerName={username}
              />
            )}
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
          newsId={newsId}
          articleText={articleText}
          onClose={clearSelection}
        />
      )}

      {/* Financial AI Chatbot - receives evaluation messages every 1 minute */}
      <FinancialChatbot ref={chatbotRef} />
    </div>
  );
}
