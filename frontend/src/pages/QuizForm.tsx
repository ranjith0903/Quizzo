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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, description };
    
    axios.post("/quizzes", payload)
      .then(() => {
        toast.success("Quiz created successfully");
        navigate("/dashboard");
      })
      .catch(() => toast.error("Failed to create quiz"));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
            required
          />
          <Input
            type="text"
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
            required
          />
          <Button type="submit" className="w-full">Create Quiz</Button>
        </form>
      </Card>
    </div>
  );
};

export default QuizForm;

