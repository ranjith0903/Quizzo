import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`/quizzes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(() => {
        toast.error("Failed to fetch quiz information");
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`/quizzes/${id}`, { title, description })
      .then(() => {
        toast.success("Quiz updated successfully");
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to update quiz");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Update Quiz
          </Button>
        </form>
      </Card>
    </div>
  );
}
