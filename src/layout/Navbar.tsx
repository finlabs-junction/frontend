import { useState } from "react";
import { UserPen, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    signOut();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
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
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <UserPen className="h-6 w-6 text-white" />
              <p className="font-medium">Profile</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 flex flex-col space-y-4 py-4 px-6">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
          >
            <UserPen className="h-6 w-6 text-white" />
            <p className="font-medium">Profile</p>
          </div>

          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="w-full mt-2 px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
