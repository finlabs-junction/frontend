/* eslint-disable react-hooks/set-state-in-effect */
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-slate-600 relative flex items-center justify-center">
        <div className="w-5 h-5" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer relative w-14 h-7 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 dark:from-indigo-600 dark:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-purple-500"
      aria-label="Toggle theme"
    >
      {/* Track glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 dark:opacity-20 blur-sm transition-opacity duration-300" />

      {/* Slider */}
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {/* Icons */}
        <Sun
          className={`absolute w-4 h-4 text-yellow-500 transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute w-4 h-4 text-indigo-600 transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 text-yellow-300 transition-all duration-300 ${
            isDark ? "opacity-30" : "opacity-70"
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 text-purple-300 transition-all duration-300 ${
            isDark ? "opacity-70" : "opacity-30"
          }`}
        />
      </div>
    </button>
  );
}
