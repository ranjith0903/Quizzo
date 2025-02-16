import express from "express";
import { getUser, login, logout, register } from "../controllers/auth.controller";

const router = express.Router();

// User login
router.post("/login", login as express.RequestHandler);

// Register user 
router.post("/register", register as express.RequestHandler);

router.post("/logout", logout as express.RequestHandler);
router.get("/profile",getUser as express.RequestHandler);

export default router;

