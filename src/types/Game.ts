import type { NewsArticle } from "./News";
import type { Stock } from "./Stock";

export interface GameState {
  sessionId: string;
  sessionStatus: string; // running or waiting or ended
  username: string;
  isLeader: boolean;
  time: string;
  timeProgressionMultiplier: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyNetIncome: number;
  occupation: string;
  monthlySalary: number;
  healthLevel: number;
  happinessLevel: number;
  energyLevel: number;
  socialLifeLevel: number;
  stressLevel: number;
  livingComfortLevel: number;
  monthlyRentExpense: number;
  monthlyUtilitiesExpense: number;
  monthlyGroceryExpense: number;
  monthlyTransportationExpense: number;
  monthlyLeisureExpense: number;
  monthlyLoanExpense: number;
  monthlyTaxExpense: number;
  careerProgressLevel: number;
  skillsEducationLevel: number;
  events: NewsArticle[];
  players: Array<{
    username: string;
    balance: number;
  }>;
  stocks: Stock[];
}
