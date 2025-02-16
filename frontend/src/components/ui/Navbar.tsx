import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ui/ModeToggle";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export default function NavBar() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check authentication status from the backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/auth/profile", { withCredentials: true });

        setAuthenticated(response.data?.user ? true : false);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setAuthenticated(false);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
      {/* Left Section: Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        Quizzo
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links (Desktop & Mobile) */}
      <div
        className={`lg:flex flex-col lg:flex-row lg:items-center lg:space-x-4 absolute lg:relative top-16 lg:top-auto left-0 w-full lg:w-auto bg-gray-100 dark:bg-gray-900 lg:bg-transparent dark:lg:bg-transparent transition-all duration-300 ${
          menuOpen ? "flex p-4 shadow-md" : "hidden"
        }`}
      >
        {authenticated && (
          <Link to="/dashboard" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-primary">
            Dashboard
          </Link>
        )}
      </div>

      {/* Right Section: Buttons */}
      <div className="hidden lg:flex items-center space-x-3">
        <ModeToggle /> {/* Dark Mode Toggle */}
        {authenticated ? (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}

