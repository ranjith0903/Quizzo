import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: any; // ✅ Ensures TypeScript recognizes `userId`
  }
}


