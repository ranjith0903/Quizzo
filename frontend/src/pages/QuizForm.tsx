import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/quizzes", { title, description });
      toast.success("Quiz created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="p-6 w-full max-w-md shadow-lg bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Create Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Create Quiz"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default QuizForm;

