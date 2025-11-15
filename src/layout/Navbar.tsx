import { useState } from "react";
import { UserPen, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const userName = getCookie("username");

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-md border-b border-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => navigate("/")}
        >
          Junction 2025
        </h1>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center space-x-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <UserPen className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium">Hello, {userName}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-700 border-t border-slate-600 flex flex-col space-y-4 py-4 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <UserPen className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium">Hello, {userName}</p>
          </div>

          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
