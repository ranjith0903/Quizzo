import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface LoginPageProps {
  setAuthenticated: (auth: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuthenticated(true);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Quizzo - Login
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4 mt-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Not registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
