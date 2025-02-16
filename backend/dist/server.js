"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const quizes_routes_1 = __importDefault(require("./routes/quizes.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS setup (allow frontend to send cookies)
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
app.use(express_1.default.json());
// Express session setup
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET, // Change to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/quizzes", quizes_routes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
