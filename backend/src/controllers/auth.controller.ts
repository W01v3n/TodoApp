import { Request, Response, NextFunction } from "express";
import IUser from "../interfaces/iuser.interface";
import { hashPassword, verifyPassword } from "../utils/auth.utils";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../repositories/user.repository";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { strict } from "assert";
dotenv.config();

interface MyJwtPayload extends JwtPayload {
  userId: string | number;
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODOS
  // save in consts user email and password from the request body

  const hashedPassword = await hashPassword(req.body.password);
  if (hashedPassword === null) {
    throw new Error("Error hashing password.");
  }

  const user: IUser = {
    username: req.body.username,
    email: req.body.email,
    password_hash: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    // Create that user in the database
    const newUser = await createUser(user); // uncomment when the user repository is defined.
    // Return successful response if the user has been registered successfully
    res.status(201).json(newUser);
    // Report error to error handling middleware
  } catch (error) {
    next(error);
  }
}

export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Authenticate a user upon login
  const { email, password } = req.body;

  try {
    // Get the user's data from the database, create a function in the repository called getUserByEmail.
    const user = await getUserByEmail(email);
    // Check to see that the data was received (true/false) and that the password is correct.
    if (user && (await verifyPassword(password, user.password_hash))) {
      // If everything checks out (logged in successfully), create a token.
      console.log(`USER ID: ${user.id}`);

      const tokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // Expires in 1 hour
      const refreshTokenExpirationTime =
        Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // Refresh token expires in 7 days

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: tokenExpirationTime,
        }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        { expiresIn: refreshTokenExpirationTime }
      );

      console.log(token);
      console.log(refreshToken);

      // Put the token in a cookie and send over to the user as the response. res.cookie, and for now also send it as text.
      res.cookie("isAuthenticated", true, {
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // Set the cookie expiration to match the JWT expiration (1 hour)
        secure: process.env.NODE_ENV === "production", // Set the secure flag in production environment
        sameSite: "strict", // Set the sameSite attribute to prevent CSRF attacks,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      const { password_hash, ...rest } = user;

      res
        .status(200)
        .json({ message: "Logged in successfully.", token: token, user: rest });
      console.log({ message: "Logged in successfully.", token: token });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
      console.log({ error: "Invalid email or password." });
    }
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      console.log("Refresh token not found.");
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    ) as MyJwtPayload;

    if (typeof decodedToken !== "string") {
      // Now it's safe to access decodedToken.userId
      const userId = decodedToken.userId;
      const user = await getUserById(userId);

      if (!user) {
        console.log("User not found");
        res.status(401).json({ message: "User not found." });
      }

      const newToken = jwt.sign(
        { userId: user?.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60, // Access token expires in 1 hour
        }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ newRefreshToken: newToken });
    } else {
      // Handle the case where the token is invalid
      console.log(decodedToken); // Will probably be an error in that case.
    }
  } catch (error) {
    next(error);
  }
}

export async function getAuthenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as MyJwtPayload;

    if (typeof decodedToken !== "string") {
      const userId = decodedToken.userId;
      const user = await getUserById(userId);

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
    } else {
      // Handle the case where the token is invalid
      res.status(401).json({ message: "Invalid token" });
      console.log("Invalid token");
    }
  } catch (error) {
    next(error);
  }
}
