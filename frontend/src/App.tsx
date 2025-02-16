import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import QuizForm from "./pages/QuizForm";
import RegisterPage from "./pages/Register";
import EditForm from "./pages/EditForm";
import NavBar from "./components/ui/Navbar";
import axios from "./lib/axios";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setAuthenticated(response.data);
      } catch (error) {
        setAuthenticated(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage setAuthenticated={setAuthenticated} />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/edit/:id" element={<EditForm />} />
        <Route path="/quiz/create" element={<QuizForm />} />
      </Routes>
    </>
  );
};

export default App;

