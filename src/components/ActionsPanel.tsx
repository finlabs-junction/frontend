import React, { useState } from "react";
import { Home, Wallet, Coffee, ShoppingBag, Building2 } from "lucide-react";
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
import { AIHelper } from "./AIHelper";

interface ActionsPanelProps {
  onChangeAccommodation: (type: string) => void;
  onChangeBudget: (category: string, amount: number) => void;
}

export function ActionsPanel({ onChangeAccommodation }: ActionsPanelProps) {
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
      title: "Adjust Budget",
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
      id: "food",
      title: "Food Preferences",
      icon: ShoppingBag,
      description: "Adjust your food budget and choices",
      color: "bg-orange-50 text-orange-600",
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
                  <ActionForm
                    actionId={action.id}
                    onChangeAccommodation={onChangeAccommodation}
                  />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ActionForm({
  actionId,
  onChangeAccommodation,
}: {
  actionId: string;
  onChangeAccommodation: (type: string) => void;
}) {
  const [accommodation, setAccommodation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actionId === "accommodation" && accommodation) {
      onChangeAccommodation(accommodation);
    }
  };

  if (actionId === "accommodation") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Select Accommodation Type</Label>
          <Select value={accommodation} onValueChange={setAccommodation}>
            <SelectTrigger>
              <SelectValue placeholder="Choose accommodation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio Apartment ($800/mo)</SelectItem>
              <SelectItem value="1bed">1 Bedroom ($1200/mo)</SelectItem>
              <SelectItem value="2bed">2 Bedroom ($1800/mo)</SelectItem>
              <SelectItem value="house">House ($2500/mo)</SelectItem>
              <SelectItem value="shared">Shared Room ($400/mo)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Apply Change
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
