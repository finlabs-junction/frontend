/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { ACCOMMODATION_COSTS } from "../constants/gameData";
import {
  useBuyStocksMutation,
  useSellStocksMutation,
} from "../redux/api/gameApi";

interface Expense {
  id: string;
  category: string;
  amount: number;
  icon: any;
  description: string;
}

export const useFinancialHandlers = (
  expenses: Expense[],
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const [buyStocks] = useBuyStocksMutation();
  const [sellStocks] = useSellStocksMutation();

  const handleBuyStock = async (symbol: string, shares: number) => {
    try {
      await buyStocks({ symbol, quantity: shares }).unwrap();
      toast.success(`Bought ${shares} shares of ${symbol}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to buy stocks");
    }
  };

  const handleSellStock = async (symbol: string, shares: number) => {
    try {
      await sellStocks({ symbol, quantity: shares }).unwrap();
      toast.success(`Sold ${shares} shares of ${symbol}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to sell stocks");
    }
  };

  const handleChangeAccommodation = (type: string) => {
    const newRent = ACCOMMODATION_COSTS[type] || 1200;
    const oldRent = expenses.find((e) => e.id === "rent")?.amount || 1200;

    setExpenses((prev) =>
      prev.map((exp) => (exp.id === "rent" ? { ...exp, amount: newRent } : exp))
    );

    if (newRent > oldRent) {
      toast.info(`Upgraded accommodation. Rent increased to $${newRent}/month`);
    } else {
      toast.info(`Changed accommodation. Rent reduced to $${newRent}/month`);
    }
  };

  return {
    handleBuyStock,
    handleSellStock,
    handleChangeAccommodation,
  };
};
