import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import QuizForm from "./pages/QuizForm";
import RegisterPage from "./pages/Register";
import EditForm from "./pages/EditForm";
import NavBar from "./components/ui/Navbar";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("authenticated", String(authenticated));
  }, [authenticated]);

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
        <Route
          path="/quiz/edit/:id"
          element={authenticated ? <EditForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/quiz/create"
          element={authenticated ? <QuizForm /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

export default App;
