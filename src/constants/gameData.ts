/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Home,
  Zap,
  ShoppingCart,
  Plane,
  Coffee,
  CreditCard,
  Receipt,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export const getInitialExpenses = (gameState?: any) => [
  {
    id: "rent",
    category: "Rent",
    amount: gameState?.monthlyRentExpense ?? 1200,
    icon: Home,
    description: "Monthly apartment rent",
  },
  {
    id: "utilities",
    category: "Utilities",
    amount: gameState?.monthlyUtilitiesExpense ?? 150,
    icon: Zap,
    description: "Electricity, water, internet",
  },
  {
    id: "food",
    category: "Groceries",
    amount: gameState?.monthlyGroceryExpense ?? 400,
    icon: ShoppingCart,
    description: "Food and household items",
  },
  {
    id: "transport",
    category: "Transportation",
    amount: gameState?.monthlyTransportationExpense ?? 200,
    icon: Plane,
    description: "Car, gas, public transit",
  },
  {
    id: "leisure",
    category: "Leisure",
    amount: gameState?.monthlyLeisureExpense ?? 300,
    icon: Coffee,
    description: "Entertainment and dining out",
  },
  {
    id: "loan",
    category: "Loan Payment",
    amount: gameState?.monthlyLoanExpense ?? 250,
    icon: CreditCard,
    description: "Student loan payment",
  },
  {
    id: "taxes",
    category: "Taxes",
    amount: gameState?.monthlyTaxExpense ?? 500,
    icon: Receipt,
    description: "Monthly tax withholding",
  },
];

export const getInitialIncomes = (gameState?: any) => [
  {
    id: "salary",
    source: "Salary",
    amount: 3500,
    icon: Briefcase,
    type: "recurring" as const,
    description: gameState?.occupation ?? "Software Developer",
  },
  {
    id: "stocks",
    source: "Stock Dividends",
    amount: 50,
    icon: TrendingUp,
    type: "recurring" as const,
    description: "Portfolio dividends",
  },
];

export const getInitialFinancialHistory = () => [
  { date: "Dec 1", balance: 14500, income: 3550, expenses: 3000 },
  { date: "Dec 8", balance: 14750, income: 3550, expenses: 3000 },
  { date: "Dec 15", balance: 15000, income: 3550, expenses: 3000 },
  { date: "Dec 22", balance: 15250, income: 3550, expenses: 3000 },
  { date: "Dec 29", balance: 15500, income: 3550, expenses: 3000 },
  { date: "Jan 1", balance: 15000, income: 3550, expenses: 3000 },
];

export const ACCOMMODATION_COSTS: Record<string, number> = {
  studio: 800,
  "1bed": 1200,
  "2bed": 1800,
  house: 2500,
  shared: 400,
};
