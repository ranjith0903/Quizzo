import { Request, Response } from "express";
import pool from "../lib/db";

// ✅ Create a Quiz (Only for Logged-in Teacher)
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const teacherId = (req.session as any).userId; // Get logged-in teacher ID

    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized - Please log in" });
        return;
    }

    if (!title || !description) {
        res.status(400).json({ message: "Title and description are required" });
        return;
    }

    try {
        await pool.query(
            "INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)", 
            [title, description, teacherId]
        );

        res.status(201).json({ message: "Quiz created successfully" });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get All Quizzes for Logged-in Teacher
export const getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
    const teacherId = (req.session as any).userId; // Get logged-in teacher ID

    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized - Please log in" });
        return;
    }

    try {
        const [quizzes]: any = await pool.query(
            "SELECT id, title, description FROM quizzes WHERE teacher_id = ?", 
            [teacherId]
        );

        if (quizzes.length === 0) {
            res.status(404).json({ message: "No quizzes found" });
            return;
        }

        res.json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get a Specific Quiz by ID (Only If Owned by the Teacher)
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id;
    const teacherId = (req.session as any).userId;

    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized - Please log in" });
        return;
    }

    try {
        const [quiz]: any = await pool.query(
            "SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", 
            [quizId, teacherId]
        );

        if (quiz.length === 0) {
            res.status(404).json({ message: "Quiz not found or access denied" });
            return;
        }

        res.json(quiz[0]);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update a Quiz (Only If Owned by the Teacher)
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id;
    const { title, description } = req.body;
    const teacherId = (req.session as any).userId;

    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized - Please log in" });
        return;
    }

    if (!title || !description) {
        res.status(400).json({ message: "Title and description are required" });
        return;
    }

    try {
        // Check if quiz exists and belongs to the logged-in teacher
        const [quiz]: any = await pool.query(
            "SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", 
            [quizId, teacherId]
        );

        if (quiz.length === 0) {
            res.status(404).json({ message: "Quiz not found or access denied" });
            return;
        }

        // Update the quiz
        await pool.query(
            "UPDATE quizzes SET title = ?, description = ? WHERE id = ?", 
            [title, description, quizId]
        );

        res.json({ message: "Quiz updated successfully" });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Delete a Quiz (Only If Owned by the Teacher)
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id;
    const teacherId = (req.session as any).userId;

    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized - Please log in" });
        return;
    }

    try {
        // Check if the quiz exists and belongs to the logged-in teacher
        const [quiz]: any = await pool.query(
            "SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", 
            [quizId, teacherId]
        );

        if (quiz.length === 0) {
            res.status(404).json({ message: "Quiz not found or access denied" });
            return;
        }

        // Delete the quiz
        await pool.query("DELETE FROM quizzes WHERE id = ?", [quizId]);

        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

