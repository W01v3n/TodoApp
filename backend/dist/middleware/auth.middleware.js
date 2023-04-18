"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const cookie_1 = require("cookie");
dotenv.config();
function authMiddleware(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.split(" ")[1];
    // Extract the token from the Cookie header
    const cookieHeader = req.headers.cookie;
    const cookies = (0, cookie_1.parse)(cookieHeader || "");
    const cookieToken = cookies.token;
    // Extract the token from req.headers["token"]
    const headerToken = Array.isArray(req.headers["token"])
        ? req.headers["token"][0]
        : req.headers["token"];
    // Use the first available token
    const token = bearerToken || cookieToken || headerToken;
    if (!token) {
        return res
            .status(401)
            .json({ error: "Authentication failed: no token provided." });
    }
    try {
        // Verify the token and extract the user ID
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret ?? "");
        if (typeof decoded !== "string" && decoded !== null) {
            console.log("Verified token:", token);
            console.log("Verified token expiration:", decoded.exp);
        }
        if (decoded.userId) {
            req.userId = Number(decoded.userId);
            console.log("Token verified! User ID:", req.userId);
        }
        else {
            console.log("Couldn't fetch user ID from token.");
            console.log(decoded);
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Authentication failed: invalid token." });
    }
}
exports.default = authMiddleware;
