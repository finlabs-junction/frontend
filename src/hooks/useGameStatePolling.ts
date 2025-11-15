import { useEffect } from "react";
import { useGetGameStateMutation } from "../redux/api/gameApi";
import { toast } from "sonner";
import { type NewsArticle } from "../types";

interface UseGameStatePollingProps {
  isPlayer: boolean;
  onDateUpdate: (date: Date) => void;
  onPlayingUpdate: (isPlaying: boolean) => void;
  onNewsUpdate: (articles: NewsArticle[]) => void;
  onGameEnd: () => void;
}

export const useGameStatePolling = ({
  isPlayer,
  onDateUpdate,
  onPlayingUpdate,
  onNewsUpdate,
  onGameEnd,
}: UseGameStatePollingProps) => {
  const [getGameState] = useGetGameStateMutation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await getGameState();
      if (result && result.data && result.data.time) {
        onDateUpdate(new Date(result.data.time));

        if (isPlayer) {
          if (result.data.sessionStatus === "ended") {
            toast.error("Game has ended. Redirecting to waiting room.");
            onGameEnd();
            return;
          }
        }

        onPlayingUpdate(result.data.sessionStatus === "running");

        const news = result.data.events || [];
        onNewsUpdate(news);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getGameState, isPlayer, onDateUpdate, onPlayingUpdate, onNewsUpdate, onGameEnd]);
};
