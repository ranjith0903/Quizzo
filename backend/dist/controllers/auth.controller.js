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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../lib/db"));
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const [rows] = yield db_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length > 0)
            return res.status(400).json({ message: "User already exists" });
        // Hash password and store in DB
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [insertResult] = yield db_1.default.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        // Get newly created user
        const [userRows] = yield db_1.default.query("SELECT * FROM users WHERE id = ?", [insertResult.insertId]);
        const user = userRows[0];
        // Store user ID in session
        req.session.userId = user.id;
        res.json({ message: "User registered and logged in", user: { id: user.id, username: user.username } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.register = register;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0)
            return res.status(401).json({ message: "Invalid username or password" });
        const user = rows[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid username or password" });
        // Store session
        req.session.userId = user.id;
        res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
// Logout user
const logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
};
exports.logout = logout;
