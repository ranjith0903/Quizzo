import express, { Request, Response, RequestHandler } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { 
  getAllQuizzes, 
  getQuizById, 
  createQuiz, 
  updateQuiz, 
  deleteQuiz 
} from "../controllers/quizes.controller";

const router = express.Router();

// Get all quizes
router.get("/", authMiddleware as RequestHandler, (req: Request, res: Response) => getAllQuizzes(req, res));

// Get quiz by ID
router.get("/:id", authMiddleware as RequestHandler, (req: Request, res: Response) => getQuizById(req, res));

// Create quiz
router.post("/", authMiddleware as RequestHandler, (req: Request, res: Response) => createQuiz(req, res));

// Update quiz
router.put("/:id", authMiddleware as RequestHandler, (req: Request, res: Response) => updateQuiz(req, res));

// Delete quiz
router.delete("/:id", authMiddleware as RequestHandler, (req: Request, res: Response) => deleteQuiz(req, res));

export default router;

