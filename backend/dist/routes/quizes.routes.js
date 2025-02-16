"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const quizes_controller_1 = require("../controllers/quizes.controller");
const router = express_1.default.Router();
// Get all quizes
router.get("/", auth_middleware_1.authMiddleware, quizes_controller_1.getAllQuizzes);
// Get quiz by ID
router.get("/:id", auth_middleware_1.authMiddleware, quizes_controller_1.getQuizById);
// Create quiz
router.post("/", auth_middleware_1.authMiddleware, quizes_controller_1.createQuiz);
// Update quiz
router.put("/:id", auth_middleware_1.authMiddleware, quizes_controller_1.updateQuiz);
// Delete quiz
router.delete("/:id", auth_middleware_1.authMiddleware, quizes_controller_1.deleteQuiz);
exports.default = router;
