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
exports.getAuthenticatedUser = exports.refreshAccessToken = exports.userLogin = exports.registerUser = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const user_repository_1 = require("../repositories/user.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function registerUser(req, res, next) {
    // TODOS
    // save in consts user email and password from the request body
    const hashedPassword = await (0, auth_utils_1.hashPassword)(req.body.password);
    if (hashedPassword === null) {
        throw new Error("Error hashing password.");
    }
    const user = {
        username: req.body.username,
        email: req.body.email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
    };
    try {
        // Create that user in the database
        const newUser = await (0, user_repository_1.createUser)(user); // uncomment when the user repository is defined.
        // Return successful response if the user has been registered successfully
        res.status(201).json(newUser);
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.registerUser = registerUser;
async function userLogin(req, res, next) {
    // Authenticate a user upon login
    const { email, password } = req.body;
    try {
        // Get the user's data from the database, create a function in the repository called getUserByEmail.
        const user = await (0, user_repository_1.getUserByEmail)(email);
        // Check to see that the data was received (true/false) and that the password is correct.
        if (user && (await (0, auth_utils_1.verifyPassword)(password, user.password_hash))) {
            // If everything checks out (logged in successfully), create a token.
            console.log(`USER ID: ${user.id}`);
            const tokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // Expires in 1 hour
            const refreshTokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // Refresh token expires in 7 days
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: tokenExpirationTime,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpirationTime });
            console.log(token);
            console.log(refreshToken);
            // Put the token in a cookie and send over to the user as the response. res.cookie, and for now also send it as text.
            res.cookie("isAuthenticated", true);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict", // Set the sameSite attribute to prevent CSRF attacks,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 * 1000,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res
                .status(200)
                .json({ message: "Logged in successfully.", token: token });
            console.log({ message: "Logged in successfully.", token: token });
        }
        else {
            res.status(401).json({ error: "Invalid email or password." });
            console.log({ error: "Invalid email or password." });
        }
    }
    catch (error) {
        next(error);
    }
}
exports.userLogin = userLogin;
async function refreshAccessToken(req, res, next) {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            console.log("Refresh token not found.");
        }
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        if (typeof decodedToken !== "string") {
            // Now it's safe to access decodedToken.userId
            const userId = decodedToken.userId;
            const user = await (0, user_repository_1.getUserById)(userId);
            if (!user) {
                console.log("User not found");
                res.status(401).json({ message: "User not found." });
            }
            const newToken = jsonwebtoken_1.default.sign({ userId: user?.id }, process.env.JWT_SECRET, {
                expiresIn: Math.floor(Date.now() / 1000) + 60 * 60, // Access token expires in 1 hour
            });
            res.cookie("token", newToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.status(200).json({ newRefreshToken: newToken });
        }
        else {
            // Handle the case where the token is invalid
            console.log(decodedToken); // Will probably be an error in that case.
        }
    }
    catch (error) {
        next(error);
    }
}
exports.refreshAccessToken = refreshAccessToken;
async function getAuthenticatedUser(req, res, next) {
    console.log("Got request!");
    try {
        const { token, isAuthenticated } = req.cookies;
        if (!isAuthenticated) {
            res.status(401).json({ isAuthenticated: false });
        }
        if (!token) {
            res.status(401).json({ message: "No token was provided!" });
            console.log("Did not get a token!");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decodedToken !== "string") {
            const userId = decodedToken.userId;
            const user = await (0, user_repository_1.getUserById)(userId);
            if (!user) {
                res.status(401).json({ message: "User not found." });
                console.log("Could not find user.");
            }
            // Return the user's data, but remove the password field for security
            if (user) {
                const { password_hash, ...rest } = user;
                res.status(200).json({ rest, isAuthenticated: true });
                console.log("Authenticated!");
            }
        }
        else {
            // Handle the case where the token is invalid
            res.status(401).json({ message: "Invalid token" });
            console.log("Invalid token");
        }
    }
    catch (error) {
        next(error);
    }
}
exports.getAuthenticatedUser = getAuthenticatedUser;
