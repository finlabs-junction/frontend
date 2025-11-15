export interface Stock {
  symbol: string;
  size: number;
  lastPrice: number;
  entryPrice: number;
  pnl: number;
}

export interface StockPrices {
  [symbol: string]: {
    [date: string]: number;
  };
}
