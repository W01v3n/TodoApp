import jwt, { Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import AuthRequest from "../interfaces/authRequest.type";
import DecodedToken from "../interfaces/decodedToken.interface";
import * as dotenv from "dotenv";
import { parse } from "cookie";
dotenv.config();

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.split(" ")[1];

  // Extract the token from the Cookie header
  const cookieHeader = req.headers.cookie;
  const cookies = parse(cookieHeader || "");
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
    const jwtSecret = process.env.JWT_SECRET as Secret | undefined;
    const decoded = jwt.verify(
      token,
      jwtSecret ?? ""
    ) as unknown as DecodedToken;

    if (typeof decoded !== "string" && decoded !== null) {
      console.log("Verified token:", token);
      console.log("Verified token expiration:", decoded.exp);
    }
    if (decoded.userId) {
      req.userId = Number(decoded.userId);
      console.log("Token verified! User ID:", req.userId);
    } else {
      console.log("Couldn't fetch user ID from token.");
      console.log(decoded);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authentication failed: invalid token." });
  }
}
