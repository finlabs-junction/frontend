import { useState, useEffect } from "react";
import {
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Target,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";

interface UserBehavior {
  stockTrades: number;
  expenseChanges: number;
  daysInDebt: number;
  daysPlayed: number;
  averageBalance: number;
  lifestyleAverages: Record<string, number>;
}

interface MicroLesson {
  id: string;
  title: string;
  category: "beginner" | "intermediate" | "advanced";
  content: string;
  reason: string;
  completed: boolean;
}

interface PracticeTask {
  id: string;
  title: string;
  description: string;
  goal: string;
  progress: number;
  completed: boolean;
}

interface AICoachProps {
  behavior: UserBehavior;
  currentBalance: number;
  onDismiss: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export function AICoach({
  behavior,
  currentBalance,
  onDismiss,
  isMinimized,
  onToggleMinimize,
}: AICoachProps) {
  const [lessons, setLessons] = useState<MicroLesson[]>([]);
  const [tasks, setTasks] = useState<PracticeTask[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  useEffect(() => {
    // Generate personalized lessons based on user behavior
    const generatedLessons: MicroLesson[] = [];

    // Check for negative balance patterns
    if (behavior.daysInDebt > 3) {
      generatedLessons.push({
        id: "debt-management",
        title: "Managing Negative Balance",
        category: "beginner",
        content:
          "I noticed you've been in debt for several days. Let's learn about emergency funds and expense prioritization. The 50/30/20 rule suggests: 50% needs, 30% wants, 20% savings. Start by identifying which expenses are truly essential.",
        reason: "Your account has been negative for multiple days",
        completed: false,
      });
    }

    // Check for stock trading behavior
    if (behavior.stockTrades > 5) {
      generatedLessons.push({
        id: "stock-strategy",
        title: "Long-term vs. Short-term Investing",
        category: "intermediate",
        content:
          "You're actively trading stocks! While this can be exciting, research shows that long-term holding often outperforms frequent trading. Consider: transaction costs, tax implications, and the power of compound growth over time.",
        reason: "You've made multiple stock trades",
        completed: false,
      });
    }

    // Check for lifestyle indicators
    const avgStress = behavior.lifestyleAverages["stress"] || 50;
    if (avgStress < 40) {
      generatedLessons.push({
        id: "stress-management",
        title: "Financial Stress and Decision Making",
        category: "beginner",
        content:
          "High financial stress can lead to poor decisions. Studies show stressed individuals are more likely to make impulsive choices. Try: building a small emergency fund (even $500 helps), automating savings, and reducing high-interest debt first.",
        reason: "Your stress levels have been concerning",
        completed: false,
      });
    }

    // Check for balanced spending
    if (behavior.expenseChanges < 2 && behavior.daysPlayed > 10) {
      generatedLessons.push({
        id: "budget-optimization",
        title: "Optimizing Your Budget",
        category: "intermediate",
        content:
          "I notice you haven't adjusted your expenses much. Dynamic budgeting means regularly reviewing and adjusting based on your goals. Try the envelope method: allocate specific amounts to categories and track how lifestyle indicators respond.",
        reason: "Limited budget adjustments detected",
        completed: false,
      });
    }

    // Always include some foundational lessons
    if (behavior.daysPlayed < 5) {
      generatedLessons.push({
        id: "cash-flow-basics",
        title: "Understanding Cash Flow",
        category: "beginner",
        content:
          "Cash flow is the movement of money in and out of your accounts. Positive cash flow (income > expenses) builds wealth over time. Track your monthly net income and aim for at least 10-20% positive cash flow for financial stability.",
        reason: "Essential foundation for new users",
        completed: false,
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLessons(generatedLessons.slice(0, 4)); // Limit to 4 lessons

    // Generate practice tasks
    const generatedTasks: PracticeTask[] = [
      {
        id: "emergency-fund",
        title: "Build an Emergency Fund",
        description: "Save enough to cover 1 month of expenses",
        goal: "Maintain $3,000 balance for 7 days",
        progress: Math.min(100, (currentBalance / 3000) * 100),
        completed: currentBalance >= 3000 && behavior.daysPlayed >= 7,
      },
      {
        id: "lifestyle-balance",
        title: "Balance All Lifestyle Indicators",
        description: "Keep all indicators above 50% for one week",
        goal: "Maintain balanced lifestyle",
        progress: 0, // Would need to calculate based on actual data
        completed: false,
      },
      {
        id: "investment-diversification",
        title: "Diversify Your Portfolio",
        description: "Own at least 3 different stocks",
        goal: "Hold shares in 3+ companies",
        progress: (behavior.stockTrades / 3) * 100,
        completed: false,
      },
    ];

    setTasks(generatedTasks);
  }, [behavior, currentBalance]);

  const completeLesson = (lessonId: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
    setSelectedLesson(null);
  };

  const completedLessonsCount = lessons.filter((l) => l.completed).length;
  const totalLessons = lessons.length;
  const overallProgress =
    totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={onToggleMinimize}
          className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <GraduationCap className="w-6 h-6" />
        </Button>
        {lessons.filter((l) => !l.completed).length > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-0">
            {lessons.filter((l) => !l.completed).length}
          </Badge>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-24 bottom-6 w-96 z-40"
    >
      <Card className="h-full flex flex-col shadow-xl border-2 border-purple-200">
        <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">AI Financial Coach</CardTitle>
                <p className="text-xs text-gray-500">Personalized guidance</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMinimize}
                className="h-8 w-8 p-0"
              >
                _
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span>Learning Progress</span>
              <span>
                {completedLessonsCount}/{totalLessons} lessons
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardHeader>

        <Tabs defaultValue="lessons" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-6 mt-4 grid w-auto grid-cols-2">
            <TabsTrigger value="lessons" className="text-xs">
              <BookOpen className="w-3 h-3 mr-1" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="flex-1 mt-4 min-h-0">
            <ScrollArea className="h-full px-6 pb-6">
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      lesson.completed
                        ? "bg-green-50 border-green-200"
                        : selectedLesson === lesson.id
                          ? "bg-purple-50 border-purple-300"
                          : "bg-white hover:bg-gray-50 border-gray-200 cursor-pointer"
                    }`}
                    onClick={() =>
                      !lesson.completed && setSelectedLesson(lesson.id)
                    }
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm">{lesson.title}</h4>
                          {lesson.completed && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {lesson.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-gray-600 mb-2">
                      <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{lesson.reason}</span>
                    </div>

                    {selectedLesson === lesson.id && !lesson.completed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t space-y-3"
                      >
                        <p className="text-xs text-gray-700">
                          {lesson.content}
                        </p>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            completeLesson(lesson.id);
                          }}
                          className="w-full"
                        >
                          Mark as Complete
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {lessons.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">
                      Keep playing to unlock personalized lessons!
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="tasks" className="flex-1 mt-4 min-h-0">
            <ScrollArea className="h-full px-6 pb-6">
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg ${
                      task.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm">{task.title}</h4>
                      {task.completed && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {task.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{Math.round(task.progress)}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">🎯 {task.goal}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}
