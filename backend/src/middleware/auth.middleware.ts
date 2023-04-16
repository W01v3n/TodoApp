import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AuthRequest from "../interfaces/authRequest.type";
import DecodedToken from "../interfaces/decodedToken.interface";
import * as dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.split(" ")[1] || req.body.token || req.headers["token"];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed: no token provided." });
  }

  try {
    // Verify the token and extract the user ID
    const jwtSecret = process.env.JWT_SECRET as Secret | undefined;
    const decoded = jwt.verify(token, jwtSecret ?? "") as DecodedToken;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authentication failed: invalid token." });
  }
}
