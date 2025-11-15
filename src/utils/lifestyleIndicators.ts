import {
  Heart,
  Smile,
  Battery,
  Users,
  Zap,
  Home,
  Briefcase,
  Brain,
} from "lucide-react";

interface GameState {
  healthLevel?: number;
  happinessLevel?: number;
  energyLevel?: number;
  socialLifeLevel?: number;
  stressLevel?: number;
  livingComfortLevel?: number;
  careerProgressLevel?: number;
  skillsEducationLevel?: number;
}

export const calculateLifestyleIndicators = (gameState: GameState | null) => {
  return [
    {
      id: "health",
      name: "Health",
      value: gameState?.healthLevel ?? 75,
      icon: Heart,
      color: "text-red-600",
      description: "Physical wellbeing",
    },
    {
      id: "happiness",
      name: "Happiness",
      value: gameState?.happinessLevel ?? 80,
      icon: Smile,
      color: "text-yellow-600",
      description: "Overall satisfaction",
    },
    {
      id: "energy",
      name: "Energy",
      value: gameState?.energyLevel ?? 70,
      icon: Battery,
      color: "text-green-600",
      description: "Mental & physical energy",
    },
    {
      id: "social",
      name: "Social Life",
      value: gameState?.socialLifeLevel ?? 60,
      icon: Users,
      color: "text-blue-600",
      description: "Relationships & connections",
    },
    {
      id: "stress",
      name: "Stress Level",
      value: gameState?.stressLevel ?? 50,
      icon: Zap,
      color: "text-purple-600",
      description: "Mental stress (higher is better)",
    },
    {
      id: "comfort",
      name: "Living Comfort",
      value: gameState?.livingComfortLevel ?? 70,
      icon: Home,
      color: "text-orange-600",
      description: "Quality of living space",
    },
    {
      id: "career",
      name: "Career Progress",
      value: gameState?.careerProgressLevel ?? 50,
      icon: Briefcase,
      color: "text-indigo-600",
      description: "Professional development",
    },
    {
      id: "skills",
      name: "Skills & Education",
      value: gameState?.skillsEducationLevel ?? 65,
      icon: Brain,
      color: "text-pink-600",
      description: "Knowledge & abilities",
    },
  ];
};
