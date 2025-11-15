import { useState, useCallback } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AIHelper } from "./AIHelper";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  owned: number;
  history: { date: string; price: number }[];
}

interface StockMarketProps {
  stocks: Stock[];
  balance: number;
  onBuyStock: (symbol: string, shares: number) => void;
  onSellStock: (symbol: string, shares: number) => void;
}

export function StockMarket({
  stocks,
  balance,
  onBuyStock,
  onSellStock,
}: StockMarketProps) {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [shares, setShares] = useState<number>(1);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  return (
    <Card data-context="stock-market">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stock Market</CardTitle>
          <AIHelper
            context="stock-market"
            tooltipText="Learn about stock market investing"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Available Balance: {formatCurrency(balance)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedStock === stock.symbol
                  ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50"
              }`}
              onClick={() => setSelectedStock(stock.symbol)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900 dark:text-white">{stock.symbol}</p>
                    <Badge variant="outline" className="text-xs">
                      {stock.owned} shares
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 dark:text-white">{formatCurrency(stock.price)}</p>
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      stock.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {selectedStock === stock.symbol && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stock.history}>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          domain={["auto", "auto"]}
                        />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={stock.change >= 0 ? "#16a34a" : "#dc2626"}
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={shares}
                      onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">shares</span>
                    <Button
                      size="sm"
                      className="ml-auto"
                      onClick={() => onBuyStock(stock.symbol, shares)}
                      disabled={balance < stock.price * shares}
                    >
                      Buy ({formatCurrency(stock.price * shares)})
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSellStock(stock.symbol, shares)}
                      disabled={stock.owned < shares}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
