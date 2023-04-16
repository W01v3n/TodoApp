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
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authentication failed: invalid token." });
  }
}
