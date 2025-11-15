/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { AIHelper } from "./AIHelper";

interface Expense {
  id: string;
  category: string;
  amount: number;
  icon: any;
  description: string;
}

interface ExpenseManagerProps {
  expenses: Expense[];
  budget: number;
  onAdjustExpense: (id: string, amount: number) => void;
}

export function ExpenseManager({ expenses, budget }: ExpenseManagerProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetUsage = (totalExpenses / budget) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card data-context="expenses">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Monthly Expenses</CardTitle>
          <AIHelper
            context="expense-overview"
            tooltipText="Learn about managing expenses"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Budget Usage</span>
            <span
              className={budgetUsage > 100 ? "text-red-600" : "text-gray-900"}
            >
              {formatCurrency(totalExpenses)} / {formatCurrency(budget)}
            </span>
          </div>
          <Progress
            value={Math.min(budgetUsage, 100)}
            className={`h-2 ${budgetUsage > 100 ? "[&>div]:bg-red-600" : ""}`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => {
            const Icon = expense.icon;
            const percentage = (expense.amount / totalExpenses) * 100;

            return (
              <div key={expense.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{expense.category}</p>
                    <AIHelper
                      context={`expense-${expense.id}`}
                      tooltipText={`Learn about ${expense.category.toLowerCase()}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{expense.description}</p>
                  <Progress value={percentage} className="h-1 mt-1" />
                </div>
                <div className="text-right">
                  <p className="text-sm">{formatCurrency(expense.amount)}</p>
                  <p className="text-xs text-gray-500">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
