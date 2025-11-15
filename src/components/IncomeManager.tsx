/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AIHelper } from "./AIHelper";

interface Income {
  id: string;
  source: string;
  amount: number;
  icon: any;
  type: "recurring" | "one-time";
  description: string;
}

interface IncomeManagerProps {
  incomes: Income[];
}

export function IncomeManager({ incomes }: IncomeManagerProps) {
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card data-context="income">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Income Sources</CardTitle>
          <AIHelper
            context="income-overview"
            tooltipText="Learn about income sources"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Total: {formatCurrency(totalIncome)}/month
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incomes.map((income) => {
            const Icon = income.icon;
            const percentage = (income.amount / totalIncome) * 100;

            return (
              <div key={income.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{income.source}</p>
                    <Badge
                      variant={
                        income.type === "recurring" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {income.type}
                    </Badge>
                    <AIHelper
                      context={`income-${income.id}`}
                      tooltipText={`Learn about ${income.source.toLowerCase()}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{income.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">
                    {formatCurrency(income.amount)}
                  </p>
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
