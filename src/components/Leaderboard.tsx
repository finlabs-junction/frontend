/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy, Medal, Crown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "./ui/badge";

interface Player {
  username: string;
  balance: number;
}

interface LeaderboardProps {
  players: Player[];
  currentPlayerName: string;
  className?: string;
}

export function Leaderboard({
  players,
  currentPlayerName,
  className = "",
}: LeaderboardProps) {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [highlightedName, setHighlightedName] = useState<string | null>(null);

  useEffect(() => {
    // Sort players by balance (descending)
    const sorted = [...players].sort((a, b) => b.balance - a.balance);
    setSortedPlayers(sorted);

    // Highlight current player briefly when data changes
    setHighlightedName(currentPlayerName);
    const timer = setTimeout(() => setHighlightedName(null), 2000);
    return () => clearTimeout(timer);
  }, [players, currentPlayerName]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-orange-500";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-blue-400 to-purple-500";
    }
  };

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) {
      return `$${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `$${(balance / 1000).toFixed(1)}K`;
    }
    return `$${balance.toFixed(0)}`;
  };

  return (
    <Card className={`${className} overflow-hidden`} data-context="leaderboard">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Leaderboard</CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {players.length} players competing
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {sortedPlayers.map((player, index) => {
              const rank = index + 1;
              const isCurrentPlayer = player.username === currentPlayerName;
              const isHighlighted = highlightedName === player.username;
              const isTopThree = rank <= 3;

              return (
                <motion.div
                  key={player.username}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    layout: { duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.2 },
                  }}
                  className={`
                    relative border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-all
                    ${isCurrentPlayer ? "bg-blue-50/50 dark:bg-blue-950/30" : "hover:bg-gray-50 dark:hover:bg-slate-800"}
                    ${isHighlighted ? "bg-blue-100/50 dark:bg-blue-900/50" : ""}
                  `}
                >
                  {/* Highlight glow for current player */}
                  {isCurrentPlayer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                    />
                  )}

                  <div className="relative flex items-center gap-3 p-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 flex items-center justify-center">
                      {isTopThree ? (
                        <motion.div
                          initial={{ scale: 0.8, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.05,
                          }}
                        >
                          {getRankIcon(rank)}
                        </motion.div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">#{rank}</span>
                      )}
                    </div>

                    {/* Avatar/Initial */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`
                          w-11 h-11 rounded-full flex items-center justify-center text-white
                          bg-gradient-to-br ${getRankColor(rank)} shadow-md
                        `}
                      >
                        <span className="text-sm">
                          {player.username.charAt(0).toUpperCase()}
                        </span>
                      </motion.div>
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`text-sm truncate ${isCurrentPlayer ? "font-semibold" : ""}`}
                        >
                          {player.username}
                          {isCurrentPlayer && (
                            <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                              (You)
                            </span>
                          )}
                        </h4>
                        {rank === 1 && (
                          <Badge
                            variant="secondary"
                            className="text-xs py-0 px-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
                          >
                            Leader
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {formatBalance(player.balance)}
                        </span>
                      </div>
                    </div>

                    {/* Balance - Large Display */}
                    <div className="flex-shrink-0 text-right">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={isHighlighted ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className={isTopThree ? "text-base" : "text-sm"}
                      >
                        {formatBalance(player.balance)}
                      </motion.div>
                    </div>
                  </div>

                  {/* Top 3 Gradient Border */}
                  {isTopThree && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getRankColor(rank)}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {sortedPlayers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No players yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Be the first to join!</p>
            </div>
          )}
        </div>

        {/* Current Player Quick Stats */}
        {sortedPlayers.length > 0 && (
          <div className="border-t bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Your Rank</span>
              <span className="font-semibold">
                #
                {sortedPlayers.findIndex(
                  (p) => p.username === currentPlayerName
                ) + 1}{" "}
                of {sortedPlayers.length}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
