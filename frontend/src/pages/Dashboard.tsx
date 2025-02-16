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
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Quiz[]>("/quizzes")
      .then(response => response.data)
      .then(quizzes => {
        setQuizzes(quizzes ?? []);
        setLoading(false);
      })
      .catch(() => {
        console.log("no quizzes");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    setDeleting(id);
    axios
      .delete(`/quizzes/${id}`)
      .then(() => {
        setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
        setDeleting(null);
        toast.success("Quiz deleted successfully");
      })
      .catch(() => {
        setDeleting(null);
        toast.error("Failed to delete quiz");
      });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-3 md:mb-0">Dashboard</h1>
        <Link to="/quiz/create">
          <Button>Add Quiz</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map(quiz => (
            <Card key={quiz.id} className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-medium">{quiz.title}</h2>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <Link to={`/quiz/edit/${quiz.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(quiz.id)}
                  disabled={deleting === quiz.id}
                >
                  {deleting === quiz.id ? "Loading..." : "Delete"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

