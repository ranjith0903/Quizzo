import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.session as any).userId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" }); 
        // 
    }
    next(); 
};

