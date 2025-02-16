"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    next();
};
exports.authMiddleware = authMiddleware;
