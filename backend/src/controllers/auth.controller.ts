import { Request, Response, NextFunction } from "express";
import IUser from "../interfaces/iuser.interface";
import { hashPassword, verifyPassword } from "../utils/auth.utils";
import { createUser, getUserByEmail } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

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

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      console.log(token);

      // Put the token in a cookie and send over to the user as the response. res.cookie, and for now also send it as text.
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // Set the cookie expiration to match the JWT expiration (1 hour)
        secure: process.env.NODE_ENV === "production", // Set the secure flag in production environment
        sameSite: "strict", // Set the sameSite attribute to prevent CSRF attacks,
      });

      res
        .status(200)
        .json({ message: "Logged in successfully.", token: token });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    next(error);
  }
}
