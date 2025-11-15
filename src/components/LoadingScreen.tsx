import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  TrendingUp,
  DollarSign,
  Sparkles,
  BarChart3,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "./ui/progress";

interface LoadingPageProps {
  onComplete?: () => void;
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { text: "Initializing financial markets...", icon: TrendingUp },
    { text: "Loading historical data...", icon: BarChart3 },
    { text: "Preparing AI learning coach...", icon: GraduationCap },
    { text: "Setting up your portfolio...", icon: Wallet },
    { text: "Almost ready...", icon: Sparkles },
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Change loading step text
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-3xl"
      />

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600"
              />
            </motion.div>
            <div className="text-center">
              <h1 className="text-3xl mb-2">Financial Simulation</h1>
              <p className="text-gray-600">Learning Tool</p>
            </div>
          </div>
        </motion.div>

        {/* Floating financial icons animation */}
        <div className="relative w-full h-40 mb-8">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/4 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
          >
            <DollarSign className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-10 right-1/4 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -30, 10],
              x: [-15, 15, -15],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 left-1/3 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg"
          >
            <BarChart3 className="w-7 h-7 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [-15, 25, -15],
              x: [15, -15, 15],
              rotate: [4, -4, 4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-5 right-1/3 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg"
          >
            <PiggyBank className="w-7 h-7 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [25, -10, 25],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-5 right-1/2 translate-x-1/2 w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="relative">
              <Progress
                value={progress}
                className="h-3 bg-white/50 backdrop-blur-sm"
              />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  transform: `translateX(${progress - 100}%)`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {React.createElement(loadingSteps[loadingStep].icon, {
                    className: "w-4 h-4 text-purple-600",
                  })}
                  <span className="text-sm text-gray-600">
                    {loadingSteps[loadingStep].text}
                  </span>
                </motion.div>
              </AnimatePresence>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
          </motion.div>
        </div>

        {/* Animated chart line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 relative w-full max-w-md h-24"
        >
          <svg className="w-full h-full" viewBox="0 0 400 100">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 50 Q 50 20, 100 40 T 200 45 T 300 35 T 400 50"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
                opacity: { duration: 0.5 },
              }}
            />
            {/* Animated dots */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={i * 100}
                cy={50 + (i % 2 === 0 ? -10 : 10)}
                r="4"
                fill={
                  i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#EC4899"
                }
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.2 + 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Loading tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            💡 Did you know? You can select any text in the app for instant AI
            explanations
          </p>
        </motion.div>
      </div>
    </div>
  );
}
