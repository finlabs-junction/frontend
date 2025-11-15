/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Home, Wallet, Coffee, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { AIHelper } from "./AIHelper";
import { useAppSelector } from "../redux/store";
import {
  useGetAllAccomodationsQuery,
  useMoveAccommodationMutation,
  useSetLeisureExpenseMutation,
  useSetMonthlyGroceryExpenseMutation,
} from "../redux/api/gameApi";
import { toast } from "sonner";

export function ActionsPanel() {
  const actions = [
    {
      id: "accommodation",
      title: "Change Accommodation",
      icon: Home,
      description: "Upgrade or downgrade your living situation",
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "budget",
      title: "Adjust Grocery Budget",
      icon: Wallet,
      description: "Modify your spending allocations",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "leisure",
      title: "Leisure Activities",
      icon: Coffee,
      description: "Change your entertainment spending",
      color: "bg-green-50 text-green-600",
    },
    {
      id: "loan",
      title: "Loan Management",
      icon: Building2,
      description: "Apply for or pay back loans",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Available Actions</CardTitle>
          <AIHelper
            context="actions-overview"
            tooltipText="Learn about financial actions"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Dialog key={action.id}>
                <DialogTrigger asChild>
                  <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{action.title}</p>
                        <p className="text-xs text-gray-500">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{action.title}</DialogTitle>
                  </DialogHeader>
                  <ActionForm actionId={action.id} />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ActionForm({ actionId }: { actionId: string }) {
  const getAccommodations = useGetAllAccomodationsQuery();

  const accomodations = useAppSelector((state) => state.game.accomodations);
  const accomodationId = useAppSelector(
    (state) => state.game.currentAccommodationId
  );

  const [accommodation, setAccommodation] = useState(accomodationId || "");
  const [groceryBudget, setGroceryBudget] = useState("");
  const [leisureBudget, setLeisureBudget] = useState("");

  const [setGroceryExpense, { isLoading: isLoadingGrocery }] =
    useSetMonthlyGroceryExpenseMutation();
  const [setLeisureExpense, { isLoading: isLoadingLeisure }] =
    useSetLeisureExpenseMutation();
  const [moveAccommodation, { isLoading: isLoadingAccommodation }] =
    useMoveAccommodationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (actionId === "accommodation" && accommodation) {
        await moveAccommodation(accommodation).unwrap();
        toast.success("Accommodation changed successfully!");
        await getAccommodations.refetch();
      } else if (actionId === "budget" && groceryBudget) {
        const amount = parseFloat(groceryBudget);
        if (isNaN(amount) || amount < 0) {
          toast.error("Please enter a valid amount");
          return;
        }
        await setGroceryExpense(amount).unwrap();
        toast.success("Grocery budget updated successfully!");
        setGroceryBudget("");
      } else if (actionId === "leisure" && leisureBudget) {
        const amount = parseFloat(leisureBudget);
        if (isNaN(amount) || amount < 0) {
          toast.error("Please enter a valid amount");
          return;
        }
        await setLeisureExpense(amount).unwrap();
        toast.success("Leisure budget updated successfully!");
        setLeisureBudget("");
      }
    } catch (error) {
      if (actionId === "accommodation") {
        toast.error("Failed to move accommodation. Please try again.");
      } else {
        toast.error("Failed to update budget. Please try again.");
      }
    }
  };

  if (actionId === "accommodation") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-3">Select Accommodation Type</Label>
          <Select value={accommodation} onValueChange={setAccommodation}>
            <SelectTrigger>
              <SelectValue placeholder="Choose accommodation" />
            </SelectTrigger>
            <SelectContent>
              {accomodations &&
                accomodations.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} (${acc.monthlyRent}/mo)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoadingAccommodation || !accommodation}
        >
          {isLoadingAccommodation ? "Moving..." : "Apply Change"}
        </Button>
      </form>
    );
  }

  if (actionId === "budget") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="grocery-budget">Monthly Grocery Budget ($)</Label>
          <Input
            id="grocery-budget"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter amount (e.g., 500)"
            value={groceryBudget}
            onChange={(e) => setGroceryBudget(e.target.value)}
            required
            className="mt-4"
          />
          <p className="text-xs text-gray-500 mt-1">
            Set your monthly grocery spending limit
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoadingGrocery}>
          {isLoadingGrocery ? "Saving..." : "Save Grocery Budget"}
        </Button>
      </form>
    );
  }

  if (actionId === "leisure") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="leisure-budget">Monthly Leisure Budget ($)</Label>
          <Input
            id="leisure-budget"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter amount (e.g., 300)"
            value={leisureBudget}
            onChange={(e) => setLeisureBudget(e.target.value)}
            required
            className="mt-4"
          />
          <p className="text-xs text-gray-500 mt-1">
            Set your monthly entertainment and leisure spending limit
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoadingLeisure}>
          {isLoadingLeisure ? "Saving..." : "Save Leisure Budget"}
        </Button>
      </form>
    );
  }

  return (
    <div className="text-sm text-gray-600">
      This action will be available in the full simulation. Configure your{" "}
      {actionId} settings here.
    </div>
  );
}
