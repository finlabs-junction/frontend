import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";

export default function LoginPage() {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(userName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding & Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Financial Simulation</h1>
              <p className="text-gray-600">Learning Tool</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl">Master Your Financial Future</h2>
            <p className="text-gray-600 text-lg">
              Experience real-world financial events and learn to manage your
              finances through interactive simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm mb-1">Live Market Simulation</h3>
              <p className="text-xs text-gray-600">
                Experience historical financial events starting from 2008
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm mb-1">AI-Powered Learning</h3>
              <p className="text-xs text-gray-600">
                Get personalized coaching and contextual explanations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm mb-1">Budget Management</h3>
              <p className="text-xs text-gray-600">
                Track expenses, income, and lifestyle indicators
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-sm mb-1">Learn by Doing</h3>
              <p className="text-xs text-gray-600">
                Practice financial decisions in a risk-free environment
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-md shadow-2xl border-2 border-gray-200">
            <CardHeader className="space-y-3 pb-6">
              <CardTitle className="text-2xl text-center">Welcome!</CardTitle>
              <p className="text-sm text-gray-600 text-center">
                Enter your username to start your financial learning journey
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setError("");
                    }}
                    className={`h-12 text-base ${error ? "border-red-500" : ""}`}
                    autoFocus
                    autoComplete="username"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="cursor-pointer w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    This is an educational simulation. Your progress is saved
                    locally.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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
