"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizById = exports.getAllQuizzes = exports.createQuiz = void 0;
const db_1 = require("../lib/db");
// ✅ Create a Quiz (Only for Logged-in Teacher)
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const teacherId = req.session.userId; // Get logged-in teacher ID
    if (!teacherId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    try {
        yield db_1.pool.query("INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)", [title, description, teacherId]);
        res.status(201).json({ message: "Quiz created successfully" });
    }
    catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createQuiz = createQuiz;
// ✅ Get All Quizzes for Logged-in Teacher
const getAllQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = req.session.userId; // Get logged-in teacher ID
    if (!teacherId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    try {
        const [quizzes] = yield db_1.pool.query("SELECT id, title, description, created_at FROM quizzes WHERE teacher_id = ?", [teacherId]);
        if (quizzes.length === 0) {
            return res.status(404).json({ message: "No quizzes found" });
        }
        res.json(quizzes);
    }
    catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllQuizzes = getAllQuizzes;
// ✅ Get a Specific Quiz by ID (Only If Owned by the Teacher)
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    const teacherId = req.session.userId;
    if (!teacherId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    try {
        const [quiz] = yield db_1.pool.query("SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", [quizId, teacherId]);
        if (quiz.length === 0) {
            return res.status(404).json({ message: "Quiz not found or access denied" });
        }
        res.json(quiz[0]);
    }
    catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getQuizById = getQuizById;
// ✅ Update a Quiz (Only If Owned by the Teacher)
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    const { title, description } = req.body;
    const teacherId = req.session.userId;
    if (!teacherId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    try {
        // Check if quiz exists and belongs to the logged-in teacher
        const [quiz] = yield db_1.pool.query("SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", [quizId, teacherId]);
        if (quiz.length === 0) {
            return res.status(404).json({ message: "Quiz not found or access denied" });
        }
        // Update the quiz
        yield db_1.pool.query("UPDATE quizzes SET title = ?, description = ? WHERE id = ?", [title, description, quizId]);
        res.json({ message: "Quiz updated successfully" });
    }
    catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateQuiz = updateQuiz;
// ✅ Delete a Quiz (Only If Owned by the Teacher)
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    const teacherId = req.session.userId;
    if (!teacherId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    try {
        // Check if the quiz exists and belongs to the logged-in teacher
        const [quiz] = yield db_1.pool.query("SELECT * FROM quizzes WHERE id = ? AND teacher_id = ?", [quizId, teacherId]);
        if (quiz.length === 0) {
            return res.status(404).json({ message: "Quiz not found or access denied" });
        }
        // Delete the quiz
        yield db_1.pool.query("DELETE FROM quizzes WHERE id = ?", [quizId]);
        res.json({ message: "Quiz deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteQuiz = deleteQuiz;
