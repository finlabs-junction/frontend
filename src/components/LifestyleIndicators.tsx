/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { AIHelper } from "./AIHelper";

interface LifestyleIndicator {
  id: string;
  name: string;
  value: number; // 0-100
  icon: any;
  color: string;
  description: string;
}

interface LifestyleIndicatorsProps {
  indicators: LifestyleIndicator[];
}

export function LifestyleIndicators({ indicators }: LifestyleIndicatorsProps) {
  const getStatusColor = (value: number) => {
    if (value >= 70) return "text-green-600";
    if (value >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (value: number) => {
    if (value >= 70) return "[&>div]:bg-green-600";
    if (value >= 40) return "[&>div]:bg-yellow-600";
    return "[&>div]:bg-red-600";
  };

  const getStatusText = (value: number) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Fair";
    if (value >= 20) return "Poor";
    return "Critical";
  };

  return (
    <Card data-context="lifestyle">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lifestyle Indicators</CardTitle>
          <AIHelper
            context="lifestyle-indicators"
            tooltipText="Learn how finances affect your lifestyle"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your financial decisions impact your quality of life
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${indicator.color} bg-opacity-10 flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${indicator.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm">{indicator.name}</p>
                        <AIHelper
                          context={`lifestyle-${indicator.id}`}
                          tooltipText={`Learn about ${indicator.name.toLowerCase()}`}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {indicator.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${getStatusColor(indicator.value)}`}>
                      {indicator.value}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {getStatusText(indicator.value)}
                    </p>
                  </div>
                </div>
                <Progress
                  value={indicator.value}
                  className={`h-2 ${getProgressColor(indicator.value)}`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
