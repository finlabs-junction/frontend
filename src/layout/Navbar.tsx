import { useState } from "react";
import { UserPen, Menu, X, CrownIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { useAppSelector } from "../redux/store";
import { ThemeToggle } from "../components/ThemeToggle";
import LoadingPage from "../components/LoadingScreen";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentGameState = useAppSelector((state) => state.game.state);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    window.location.reload();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const userName = getCookie("username");

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white shadow-md border-b border-slate-600 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 dark:hover:text-purple-400 transition-colors"
          onClick={() => navigate("/")}
        >
          FinLabs
        </h1>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-purple-600 flex items-center justify-center shadow-lg">
              <UserPen className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">Hello, {userName}</p>
              {currentGameState && currentGameState.isLeader ? (
                <CrownIcon className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
              ) : null}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer px-4 py-2 bg-blue-600 dark:bg-purple-600 text-white rounded-md font-medium hover:bg-blue-700 dark:hover:bg-purple-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-700 dark:bg-slate-800 border-t border-slate-600 dark:border-slate-700 flex flex-col space-y-4 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-purple-600 flex items-center justify-center shadow-lg">
                <UserPen className="w-5 h-5 text-white" />
              </div>
              <p className="font-medium">Hello, {userName}</p>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="w-full mt-2 px-4 py-2 bg-blue-600 dark:bg-purple-600 text-white rounded-md font-medium hover:bg-blue-700 dark:hover:bg-purple-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
