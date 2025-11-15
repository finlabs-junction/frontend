import { Play, Pause, FastForward } from "lucide-react";
import { Button } from "./ui/button";

interface TimeControlsProps {
  currentDate: Date;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  isPlayer: boolean;
}

export function TimeControls({
  currentDate,
  isPlaying,
  speed,
  onPlayPause,
  onSpeedChange,
  isPlayer,
}: TimeControlsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const speedLabels = ["1x", "4x", "12x", "24x"];
  const speedValues = [1, 4, 12, 24];

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div
        className={`flex flex-col md:flex-row gap-5 md:gap-0 items-center ${isPlayer ? "justify-end" : "justify-between"} max-w-7xl mx-auto`}
      >
        {!isPlayer && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={onPlayPause}
                variant={isPlaying ? "default" : "outline"}
                size="sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <FastForward className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <div className="flex gap-2">
                {speedLabels.map((label, index) => (
                  <button
                    key={label}
                    onClick={() => onSpeedChange(speedValues[index])}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      speed === speedValues[index]
                        ? "bg-blue-600 dark:bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Current Date & Time</div>
          <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
            <div>{formatDate(currentDate)}</div>
            <div className="text-gray-400 dark:text-gray-500">|</div>
            <div className="text-gray-700 dark:text-gray-300">
              {currentDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
