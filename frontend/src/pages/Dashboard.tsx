import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface Quiz {
  id: string;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([] as Quiz[]);

  useEffect(() => {
    axios
      .get<Quiz[]>("/quizzes")
      .then(response => response.data)
      .then(quizzes => setQuizzes(quizzes ?? []))
      .catch(() => toast.error("Failed to load quizzes"));
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`/quizzes/${id}`)
      .then(() => {
        setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
        toast.success("Quiz deleted successfully");
      })
      .catch(() => toast.error("Failed to delete quiz"));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/quiz/create">
          <Button>Add Quiz</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes?.map(quiz => (
          <Card key={quiz.id} className="p-4">
            <h2 className="text-lg font-medium">{quiz.title}</h2>
            <p className="text-sm text-gray-600">{quiz.description}</p>
            <div className="mt-4 flex justify-between">
              <Link to={`/quiz/edit/${quiz.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(quiz.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

