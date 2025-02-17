import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quizes.routes";


dotenv.config();

const app = express();

// CORS setup (allow frontend to send cookies)
app.use(cors({ credentials: true, origin: "https://quizzo-72jz.vercel.app" }));
app.use(express.json());

// Express session setup
app.use(session({
  secret: process.env.SESSION_SECRET as string, // Change to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

