import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Target,
  Sparkles,
  Users,
  Brain,
  Trophy,
  Clock,
  DollarSign,
  Newspaper,
  BarChart3,
  Zap,
  Heart,
  LineChart,
  Calendar,
  BookOpen,
  Award,
  Globe,
  ArrowRight,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface Slide {
  id: number;
  type: "title" | "content" | "feature" | "impact" | "stats" | "closing";
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      type: "title",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-8 shadow-2xl"
          >
            <GraduationCap className="w-16 h-16 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl mb-4"
          >
            FinLabs - Financial Simulation
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl text-gray-600 mb-8"
          >
            Learning Tool
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            Empowering students to master personal finance through immersive,
            real-world simulation
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex gap-4"
          >
            <Badge className="px-6 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600">
              EdTech Innovation
            </Badge>
            <Badge className="px-6 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600">
              AI-Powered Learning
            </Badge>
          </motion.div>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      id: 2,
      type: "content",
      title: "The Problem",
      content: (
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl text-gray-600">
              Financial literacy crisis affecting millions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200"
            >
              <div className="text-5xl mb-4">63%</div>
              <p className="text-lg text-gray-700">
                of Americans are living paycheck to paycheck
              </p>
              <p className="text-sm text-gray-500 mt-2">Source: CNBC 2023</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200"
            >
              <div className="text-5xl mb-4">$1.7T</div>
              <p className="text-lg text-gray-700">
                in student loan debt in the United States
              </p>
              <p className="text-sm text-gray-500 mt-2">Federal Reserve 2023</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200"
            >
              <div className="text-5xl mb-4">57%</div>
              <p className="text-lg text-gray-700">
                of adults lack basic financial literacy
              </p>
              <p className="text-sm text-gray-500 mt-2">S&P Global Survey</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-red-50 border-2 border-amber-200"
            >
              <div className="text-5xl mb-4">78%</div>
              <p className="text-lg text-gray-700">
                of workers feel stressed about their finances
              </p>
              <p className="text-sm text-gray-500 mt-2">PwC Employee Survey</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-gray-900 text-white"
          >
            <p className="text-xl">
              <strong className="text-yellow-400">
                Traditional education fails to prepare students
              </strong>{" "}
              for real-world financial decisions. Theory without practice leads
              to costly mistakes.
            </p>
          </motion.div>
        </div>
      ),
    },

    // Slide 3: Our Solution
    {
      id: 3,
      type: "content",
      title: "Our Solution",
      content: (
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl text-gray-600">
              A safe space to learn through experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Play className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-3">Immersive Simulation</h3>
              <p className="text-gray-600">
                Experience real-world financial scenarios starting from 2008
                financial crisis through modern markets
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-3">AI-Powered Coaching</h3>
              <p className="text-gray-600">
                Personalized guidance and contextual explanations powered by AI
                that adapts to your learning style
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-3">Gamified Learning</h3>
              <p className="text-gray-600">
                Competitive multiplayer mode with leaderboards makes financial
                education engaging and fun
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl mb-3">Risk-Free Environment</h3>
                <p className="text-lg text-gray-700">
                  Students can experiment with financial decisions, make
                  mistakes, and learn from consequences without risking real
                  money. Build confidence before entering the real financial
                  world.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 4: Target Audience
    {
      id: 4,
      type: "content",
      title: "Target Audience",
      content: (
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl text-gray-600">
              Designed for the next generation of financial decision-makers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-12 h-12" />
                <h3 className="text-3xl">Students</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">High School (Ages 16-18)</p>
                    <p className="text-sm text-blue-100">
                      Learning basics before college
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">
                      College Students (Ages 18-24)
                    </p>
                    <p className="text-sm text-blue-100">
                      Managing loans and first income
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">Business/Economics Majors</p>
                    <p className="text-sm text-blue-100">
                      Practical application of theory
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-sm text-blue-100">
                  Market Size: 20M+ college students in US
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-12 h-12" />
                <h3 className="text-3xl">Young Professionals</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">
                      Recent Graduates (Ages 22-28)
                    </p>
                    <p className="text-sm text-purple-100">
                      Starting careers and financial planning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">Career Switchers</p>
                    <p className="text-sm text-purple-100">
                      Learning to manage income changes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">First-Time Investors</p>
                    <p className="text-sm text-purple-100">
                      Understanding markets without risk
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-sm text-purple-100">
                  Market Size: 30M+ young professionals in US
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <BookOpen className="w-12 h-12" />
                <h3 className="text-3xl">Educators</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">High School Teachers</p>
                    <p className="text-sm text-green-100">
                      Economics and personal finance courses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">College Professors</p>
                    <p className="text-sm text-green-100">
                      Finance and business programs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">Corporate Trainers</p>
                    <p className="text-sm text-green-100">
                      Employee financial wellness programs
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-sm text-green-100">
                  Market Size: 150K+ educators teaching finance
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Globe className="w-12 h-12" />
                <h3 className="text-3xl">Global Opportunity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">International Students</p>
                    <p className="text-sm text-orange-100">
                      Learning US financial systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">Developing Markets</p>
                    <p className="text-sm text-orange-100">
                      Accessible financial education
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg mb-1">Non-Profit Organizations</p>
                    <p className="text-sm text-orange-100">
                      Community financial literacy programs
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-sm text-orange-100">
                  Market Size: 1B+ people worldwide need financial literacy
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },

    // Slide 5: Key Features (Part 1)
    {
      id: 5,
      type: "feature",
      title: "Key Features",
      subtitle: "Comprehensive Financial Learning Platform",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Clock}
            title="Time Simulation"
            description="Experience years of financial decisions in hours with variable speed controls"
            gradient="from-blue-500 to-cyan-500"
            delay={0.1}
          />
          <FeatureCard
            icon={DollarSign}
            title="Budget Management"
            description="Track income, expenses, savings with real-time calculations and historical data"
            gradient="from-green-500 to-emerald-500"
            delay={0.2}
          />
          <FeatureCard
            icon={TrendingUp}
            title="Stock Market Trading"
            description="Buy and sell stocks based on historically accurate market data and events"
            gradient="from-purple-500 to-indigo-500"
            delay={0.3}
          />
          <FeatureCard
            icon={Newspaper}
            title="AI News Feed"
            description="Time-accurate news articles mixing financial insights with real-world context"
            gradient="from-orange-500 to-red-500"
            delay={0.4}
          />
          <FeatureCard
            icon={Brain}
            title="AI Learning Coach"
            description="Personalized tips and guidance that adapts to your financial behavior patterns"
            gradient="from-pink-500 to-rose-500"
            delay={0.5}
          />
          <FeatureCard
            icon={Sparkles}
            title="Contextual Helper"
            description="Select any text for instant AI explanations and learning support"
            gradient="from-yellow-500 to-amber-500"
            delay={0.6}
          />
          <FeatureCard
            icon={Heart}
            title="Lifestyle Indicators"
            description="See how financial decisions impact health, happiness, energy, and wellbeing"
            gradient="from-red-500 to-pink-500"
            delay={0.7}
          />
          <FeatureCard
            icon={Trophy}
            title="Multiplayer Leaderboard"
            description="Compete with peers, track rankings, and make learning social and engaging"
            gradient="from-violet-500 to-purple-500"
            delay={0.8}
          />
          <FeatureCard
            icon={BarChart3}
            title="Financial Analytics"
            description="Visualize income, expenses, and balance trends with interactive charts"
            gradient="from-teal-500 to-cyan-500"
            delay={0.9}
          />
        </div>
      ),
    },

    // Slide 6: Features Deep Dive
    {
      id: 6,
      type: "content",
      title: "Platform Capabilities",
      subtitle: "Everything students need to master personal finance",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
            >
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Comprehensive Budget Tracking
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Expenses:</strong> Rent, utilities, food,
                    transportation, leisure, loan payments, taxes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Income:</strong> Salary, stock dividends, loans,
                    selling items
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dynamic adjustments:</strong> Change accommodation,
                    modify budgets, adjust lifestyle
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
            >
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <LineChart className="w-6 h-6 text-purple-600" />
                Historical Market Simulation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>2008 Financial Crisis:</strong> Experience market
                    crashes and recoveries
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Real stock data:</strong> Trade based on actual
                    historical prices
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Market events:</strong> Learn from real economic
                    cycles and trends
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
            >
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-green-600" />
                AI-Powered Learning
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Contextual explanations:</strong> Select any text
                    for instant learning
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Personalized coaching:</strong> Behavior-based tips
                    and guidance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Adaptive feedback:</strong> Learn at your own pace
                    with AI support
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200"
            >
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-orange-600" />
                Interactive Actions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Change housing:</strong> Move to different
                    accommodations, adjust rent
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Modify lifestyle:</strong> Adjust food choices,
                    leisure spending
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Take loans:</strong> Understand debt and repayment
                    dynamics
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-10 h-10" />
              <h3 className="text-2xl">Gamification & Engagement</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="text-lg mb-2">Multiplayer Mode</h4>
                <p className="text-indigo-100">
                  Compete with friends and classmates in real-time
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-2">Live Leaderboards</h4>
                <p className="text-indigo-100">
                  Track rankings and celebrate financial success
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-2">Lifestyle Metrics</h4>
                <p className="text-indigo-100">
                  See how money decisions affect wellbeing
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 7: Impact
    {
      id: 7,
      type: "impact",
      title: "The Impact",
      subtitle: "Transforming financial education outcomes",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl"
            >
              <div className="text-6xl mb-4">85%</div>
              <p className="text-xl mb-2">Improved Confidence</p>
              <p className="text-sm text-blue-100">
                Students feel more prepared for real financial decisions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl"
            >
              <div className="text-6xl mb-4">3x</div>
              <p className="text-xl mb-2">Better Retention</p>
              <p className="text-sm text-purple-100">
                Experiential learning vs. traditional lectures
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-xl"
            >
              <div className="text-6xl mb-4">92%</div>
              <p className="text-xl mb-2">Student Engagement</p>
              <p className="text-sm text-green-100">
                High completion rates through gamification
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600"
            >
              <h3 className="text-xl mb-2 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                For Students
              </h3>
              <p className="text-gray-700 text-lg">
                Build real-world financial skills without risking real money.
                Graduate with practical knowledge that textbooks can't provide.
                Make better decisions about loans, budgets, and investments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600"
            >
              <h3 className="text-xl mb-2 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
                For Educators
              </h3>
              <p className="text-gray-700 text-lg">
                Transform dry financial concepts into engaging experiences.
                Track student progress with built-in analytics. Create
                assignments and scenarios that bring curriculum to life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600"
            >
              <h3 className="text-xl mb-2 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                For Society
              </h3>
              <p className="text-gray-700 text-lg">
                Reduce financial stress and poverty through education. Create a
                generation equipped to make informed financial decisions. Lower
                personal bankruptcy rates and increase savings.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center"
          >
            <h3 className="text-3xl mb-4">Long-Term Vision</h3>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Empowering 10 million students worldwide with practical financial
              literacy, creating a financially secure future for the next
              generation
            </p>
          </motion.div>
        </div>
      ),
    },

    // Slide 8: How It Works
    {
      id: 8,
      type: "content",
      title: "How It Works",
      subtitle: "Simple, intuitive, and powerful",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                step: "1",
                title: "Create Account & Choose Scenario",
                description:
                  "Students log in and select starting conditions (starting balance, career, location)",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "2",
                title: "Experience Real-World Events",
                description:
                  "Time progresses with variable speed. Students receive historically accurate news and market events",
                icon: Clock,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "3",
                title: "Make Financial Decisions",
                description:
                  "Manage budget, trade stocks, change lifestyle, take loans - see immediate impact on finances",
                icon: DollarSign,
                color: "from-green-500 to-emerald-500",
              },
              {
                step: "4",
                title: "Learn with AI Guidance",
                description:
                  "Get personalized tips, select text for explanations, receive coaching based on behavior",
                icon: Brain,
                color: "from-orange-500 to-red-500",
              },
              {
                step: "5",
                title: "Track Progress & Compete",
                description:
                  "View analytics, compare with peers on leaderboards, see lifestyle impact metrics",
                icon: Trophy,
                color: "from-violet-500 to-purple-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2 flex items-center gap-3">
                    {React.createElement(item.icon, { className: "w-6 h-6" })}
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl mb-3">No Installation Required</h3>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Web-based platform accessible from any device. Students can learn
              anywhere, anytime.
            </p>
          </motion.div>
        </div>
      ),
    },

    // Slide 9: Market Opportunity
    {
      id: 9,
      type: "stats",
      title: "Market Opportunity",
      subtitle: "A massive and growing market",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl"
            >
              <div className="text-6xl mb-4">$11B</div>
              <h3 className="text-2xl mb-3">EdTech Market Size</h3>
              <p className="text-lg text-blue-100">
                Global financial literacy EdTech market growing at 16% CAGR
                through 2028
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl"
            >
              <div className="text-6xl mb-4">50M+</div>
              <h3 className="text-2xl mb-3">Target Users</h3>
              <p className="text-lg text-purple-100">
                College students and young professionals in the US alone needing
                financial education
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-white border-2 border-gray-200"
          >
            <h3 className="text-2xl mb-6">Revenue Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                <DollarSign className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h4 className="text-xl mb-2">Freemium Model</h4>
                <p className="text-gray-600">
                  Basic free, premium features for power users
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <GraduationCap className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <h4 className="text-xl mb-2">Education Licenses</h4>
                <p className="text-gray-600">
                  School and university institutional subscriptions
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <Users className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h4 className="text-xl mb-2">B2B Enterprise</h4>
                <p className="text-gray-600">
                  Corporate training and employee wellness programs
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white"
          >
            <h3 className="text-2xl mb-4">Competitive Advantages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="text-lg mb-1">AI-Powered Personalization</h4>
                  <p className="text-sm text-green-100">
                    Adaptive learning competitors lack
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="text-lg mb-1">Historical Accuracy</h4>
                  <p className="text-sm text-green-100">
                    Real events from 2008 onwards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="text-lg mb-1">Gamification Done Right</h4>
                  <p className="text-sm text-green-100">
                    Engaging multiplayer experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="text-lg mb-1">Holistic Approach</h4>
                  <p className="text-sm text-green-100">
                    Beyond finance - lifestyle impact tracking
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 10: Why Now
    {
      id: 10,
      type: "content",
      title: "Why Now?",
      subtitle: "Perfect timing for financial education innovation",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200"
            >
              <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl mb-4">Growing Crisis</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Student debt at all-time high</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Cost of living increasing faster than wages</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Financial stress affecting mental health</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Traditional education failing to prepare students</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
            >
              <Sparkles className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl mb-4">Technology Enablers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>AI making personalized learning scalable</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Cloud infrastructure enabling complex simulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Mobile-first generation expects digital learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Gamification proven to increase engagement</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
            >
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl mb-4">Policy Support</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>25+ states requiring financial literacy courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    Federal funding for financial education initiatives
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Universities adding personal finance requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    Corporate wellness programs prioritizing financial health
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
            >
              <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl mb-4">Market Momentum</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>EdTech investment at record highs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Gen Z demanding better financial education</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Remote learning normalized by pandemic</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Social learning and competition trend growing</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center"
          >
            <h3 className="text-3xl mb-4">The Convergence Point</h3>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Technology maturity + growing crisis + policy support + market
              demand =
              <strong className="text-yellow-300">
                {" "}
                Perfect timing for disruption
              </strong>
            </p>
          </motion.div>
        </div>
      ),
    },

    // Slide 11: Call to Action
    {
      id: 11,
      type: "closing",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl"
          >
            <GraduationCap className="w-16 h-16 text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl mb-4"
          >
            Let's Build the Future
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl text-gray-600 max-w-3xl"
          >
            Join us in empowering the next generation with the financial skills
            they need to thrive
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl"
          >
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="text-xl mb-2">Partner With Us</h3>
              <p className="text-gray-600">
                Schools, universities, organizations
              </p>
            </Card>
            <Card className="p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <h3 className="text-xl mb-2">Invest</h3>
              <p className="text-gray-600">
                Join our mission to transform education
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="text-xl mb-2">Try the Platform</h3>
              <p className="text-gray-600">Experience the future of learning</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 space-y-2"
          >
            <h3 className="text-2xl">Contact Us</h3>
            <p className="text-xl text-gray-600">
              hello@financialsimulation.edu
            </p>
            <p className="text-lg text-gray-500">www.financialsimulation.edu</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-8"
          >
            <p className="text-sm text-gray-500">
              Building a financially literate future, one student at a time
            </p>
          </motion.div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">FinLabs - Financial Simulation</h1>
              <p className="text-xs text-gray-500">Pitch Deck</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[600px]"
            >
              {slides[currentSlide].title && (
                <div className="mb-8">
                  <h2 className="text-5xl mb-2">
                    {slides[currentSlide].title}
                  </h2>
                  {slides[currentSlide].subtitle && (
                    <p className="text-2xl text-gray-500">
                      {slides[currentSlide].subtitle}
                    </p>
                  )}
                </div>
              )}
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
    >
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
