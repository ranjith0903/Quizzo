import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { username, password });
      toast.success("Registration successful! Please log in.");
      setIsRegistered(true);
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isRegistered ? "Login" : "Register"} to Quizzo
        </h2>
        {!isRegistered && (
          <form onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-3"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        )}
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;

