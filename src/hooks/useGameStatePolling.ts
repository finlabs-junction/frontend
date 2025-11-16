import { useEffect, useRef } from "react";
import {
  useGetGameStateMutation,
  useGetStockPricesMutation,
} from "../redux/api/gameApi";
import { toast } from "sonner";
import { type NewsArticle } from "../types";
import { useAuth } from "./useAuth";

interface UseGameStatePollingProps {
  isPlayer: boolean;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setNewsArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  setFinancialHistory: React.Dispatch<
    React.SetStateAction<
      {
        date: string;
        balance: number;
        income: number;
        expenses: number;
      }[]
    >
  >;
}

export const useGameStatePolling = ({
  isPlayer,
  setCurrentDate,
  setIsPlaying,
  setNewsArticles,
  setFinancialHistory,
}: UseGameStatePollingProps) => {
  const { signOut } = useAuth();
  const [getGameState] = useGetGameStateMutation();
  const [getStockPrices] = useGetStockPricesMutation();

  // Use refs to store the latest callback functions without causing re-renders
  const setCurrentDateRef = useRef(setCurrentDate);
  const setIsPlayingRef = useRef(setIsPlaying);
  const setNewsArticlesRef = useRef(setNewsArticles);
  const setFinancialHistoryRef = useRef(setFinancialHistory);
  const isPlayerRef = useRef(isPlayer);
  const signOutRef = useRef(signOut);

  // Update refs when props change
  useEffect(() => {
    setCurrentDateRef.current = setCurrentDate;
    setIsPlayingRef.current = setIsPlaying;
    setNewsArticlesRef.current = setNewsArticles;
    setFinancialHistoryRef.current = setFinancialHistory;
    isPlayerRef.current = isPlayer;
    signOutRef.current = signOut;
  }, [setCurrentDate, setIsPlaying, setNewsArticles, setFinancialHistory, isPlayer, signOut]);

  useEffect(() => {
    const fetchStockPrices = async () => {
      await getStockPrices();
    };

    const interval = setInterval(async () => {
      const result = await getGameState();
      if (result && result.data && result.data.time) {
        setCurrentDateRef.current(new Date(result.data.time));

        if (isPlayerRef.current) {
          if (result.data.sessionStatus === "ended") {
            toast.error("Game has ended. Redirecting to waiting room.");
            await signOutRef.current();
            window.location.reload();
            return;
          }
        }

        setIsPlayingRef.current(
          result.data.sessionStatus === "running" &&
            result.data.timeProgressionMultiplier > 0
        );

        const news = result.data.events || [];
        setNewsArticlesRef.current((prev) => {
          const existingIds = new Set(prev.map((article) => article.id));
          const newArticles = news.filter(
            (article: NewsArticle) => !existingIds.has(article.id)
          );
          return [...prev, ...newArticles];
        });

        // Update financial history with new data point
        const date = new Date(result.data.time);
        const dateString = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        setFinancialHistoryRef.current((prev) => {
          // Check if we already have data for this date
          const lastEntry = prev[prev.length - 1];
          if (lastEntry && lastEntry.date === dateString) {
            // Update the last entry with new values
            return [
              ...prev.slice(0, -1),
              {
                date: dateString,
                balance: result.data.balance ?? lastEntry.balance,
                income: result.data.monthlyIncome ?? lastEntry.income,
                expenses: result.data.monthlyExpenses ?? lastEntry.expenses,
              },
            ];
          }

          // Add new entry and keep last 30 data points for clean visualization
          const newHistory = [
            ...prev,
            {
              date: dateString,
              balance: result.data.balance ?? 0,
              income: result.data.monthlyIncome ?? 0,
              expenses: result.data.monthlyExpenses ?? 0,
            },
          ];

          // Keep only the last 30 data points
          return newHistory.length > 30
            ? newHistory.slice(newHistory.length - 30)
            : newHistory;
        });
      }
    }, 1000);

    fetchStockPrices(); // Initial fetch

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - refs are used to access latest values without re-creating interval
};
