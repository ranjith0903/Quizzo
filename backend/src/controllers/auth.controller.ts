import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../lib/db";
import { ResultSetHeader } from "mysql2";
import { Session, SessionData } from "express-session";

// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const [existingUser]: any = await pool.query(
            "SELECT * FROM users WHERE username = ?", 
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user and correctly extract `insertId`
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (username, password) VALUES (?, ?)", 
            [username, hashedPassword]
        );

        const userId = result.insertId; 

        (req.session as any).userId = userId;// Store user in session
        res.json({ message: "User registered and logged in", user: { id: userId, username } });
    } catch (error) {
        console.error("Error registering user:", error);
        next(error);
    }
};


// Login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const [rows]: any = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) return res.status(401).json({ message: "Invalid username or password" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

        // Store session
        (req.session as any).userId = user.id;

        res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
        next(error);
    }
};

// Logout user
export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
};

