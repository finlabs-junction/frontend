import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetGameStateMutation } from "../redux/api/gameApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { motion } from "motion/react";
import { Users, Loader2, UserCircle, Clock, Sparkles } from "lucide-react";
import { Toaster } from "sonner";

export default function WaitingRoomUser() {
  const navigate = useNavigate();
  const [getGameState] = useGetGameStateMutation();

  const [players, setPlayers] = useState<string[]>([]);

  // Poll game state every second
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await getGameState();
      if (result && result.data) {
        setPlayers(result.data.players.map((player) => player.username) || []);

        // Redirect to home when game starts
        if (result.data.sessionStatus === "running") {
          localStorage.setItem("isHost", "false");
          navigate("/");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getGameState, navigate]);

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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Clock className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <CardTitle className="text-3xl">
              Waiting for Game to Start
            </CardTitle>
            <CardDescription className="text-base">
              The host will start the game once all participants have joined
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Status Section */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <p className="text-lg font-medium text-gray-700">
                  Waiting for host to start the game...
                </p>
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
                  className="text-center py-8 text-gray-500"
                >
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Loading participants...</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {players.map((player, index) => (
                    <motion.div
                      key={player}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{player}</p>
                        <p className="text-xs text-gray-500">Ready</p>
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

            {/* Tips Section */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    While you wait...
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • Get ready to experience historical financial events
                      starting from 2008
                    </li>
                    <li>
                      • You'll manage your budget, track expenses, and make
                      investment decisions
                    </li>
                    <li>
                      • AI-powered coaching will help guide you through
                      challenging situations
                    </li>
                    <li>
                      • Learn practical financial skills in a risk-free
                      environment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Animated waiting indicator */}
            <div className="flex justify-center gap-2 py-4">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="w-3 h-3 bg-purple-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                className="w-3 h-3 bg-pink-500 rounded-full"
              />
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
