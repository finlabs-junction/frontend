import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface BudgetDashboardProps {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyNetIncome: number;
}

export function BudgetDashboard({
  balance,
  monthlyIncome,
  monthlyExpenses,
  monthlyNetIncome,
}: BudgetDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-gray-600">
            Current Balance
          </CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {balance >= 0 ? "Positive balance" : "Negative balance"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-gray-600">
            Monthly Income
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-green-600">
            {formatCurrency(monthlyIncome)}
          </div>
          <p className="text-xs text-gray-500 mt-1">All income sources</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-gray-600">
            Monthly Expenses
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-red-600">
            {formatCurrency(monthlyExpenses)}
          </div>
          <p className="text-xs text-gray-500 mt-1">All expenses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-gray-600">Net Income</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl ${monthlyNetIncome >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {formatCurrency(monthlyNetIncome)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Monthly net income</p>
        </CardContent>
      </Card>
    </div>
  );
}
