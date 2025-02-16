"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_controller_2 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// User login
router.post("/login", auth_controller_1.login);
// Register user 
router.post("/register", auth_controller_2.register);
exports.default = router;
