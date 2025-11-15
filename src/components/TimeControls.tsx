import { Play, Pause, FastForward, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";

interface TimeControlsProps {
  currentDate: Date;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onDateChange: (date: Date) => void;
}

export function TimeControls({
  currentDate,
  isPlaying,
  speed,
  onPlayPause,
  onSpeedChange,
  onDateChange,
}: TimeControlsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const speedLabels = ["1x", "2x", "5x", "10x"];
  const speedValues = [1, 2, 5, 10];

  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
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

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && onDateChange(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-3">
            <FastForward className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2">
              {speedLabels.map((label, index) => (
                <button
                  key={label}
                  onClick={() => onSpeedChange(speedValues[index])}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    speed === speedValues[index]
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">Current Date</div>
          <div>{formatDate(currentDate)}</div>
        </div>
      </div>
    </div>
  );
}
