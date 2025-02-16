import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

// User login
router.post("/login", login as express.RequestHandler);

// Register user 
router.post("/register", register as express.RequestHandler);

export default router;

