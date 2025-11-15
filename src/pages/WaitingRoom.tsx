/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetGameStateMutation,
  useStartGameMutation,
} from "../redux/api/gameApi";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { motion } from "motion/react";
import {
  Users,
  Play,
  Copy,
  Check,
  Loader2,
  Crown,
  UserCircle,
  LogOut,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useAuth } from "../hooks/useAuth";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [getGameState] = useGetGameStateMutation();
  const [startGame, { isLoading: isStartingGame }] = useStartGameMutation();

  const [players, setPlayers] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Poll game state every second
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await getGameState();
      if (result && result.data) {
        setPlayers(result.data.players.map((player) => player.username) || []);
        setSessionId(result.data.sessionId || "");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getGameState]);

  const handleCopySessionId = () => {
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    toast.success("Session ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = async () => {
    try {
      await startGame(false);
      localStorage.setItem("isHost", "true");
      toast.success("Game started!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to start game");
    }
  };

  const handleEndGame = async () => {
    try {
      localStorage.removeItem("isHost");
      await signOut();
      toast.success("Game ended!");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to end game");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <Toaster position="top-right" richColors />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-2 border-gray-200">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Waiting Room</CardTitle>
            <CardDescription className="text-base">
              Share the session ID with your participants and start the game
              when everyone has joined
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Session ID Section */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Session ID
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopySessionId}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-3xl font-bold text-center tracking-wider text-blue-600 bg-white rounded-lg p-4 shadow-sm">
                  {sessionId || "Loading..."}
                </div>
              </div>
            </div>

            {/* Players Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">
                  Participants ({players.length})
                </h3>
              </div>

              {players.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-gray-500"
                >
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Waiting for participants to join...</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-pink-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {players.map((player, index) => (
                    <motion.div
                      key={player}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{player}</p>
                        <p className="text-xs text-gray-500">Participant</p>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Start Game Button */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleStartGame}
                disabled={players.length === 0 || isStartingGame}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStartingGame ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Starting Game...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
                  </>
                )}
              </Button>
              {players.length === 0 && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  You need at least one participant to start the game
                </p>
              )}

              {/* End Game Button */}
              <Button
                onClick={handleEndGame}
                variant="outline"
                className="w-full h-12 text-base border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                End Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 blur-2xl hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-2xl hidden lg:block"
      />
    </div>
  );
}
