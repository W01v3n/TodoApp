import { Request, Response, NextFunction } from "express";
import ITodoList from "../interfaces/itodoList.interface";
import { createList } from "../repositories/list.repository";
import authMiddleware from "../middleware/auth.middleware";
import AuthRequest from "../interfaces/authRequest.type";

export async function createTodoList(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODOS
  // save in consts list name from the request body
  if (!req.userId) {
    res.status(401).json({ error: "User ID is missing." });
  }
  const userId = Number(req.userId);

  const list: ITodoList = {
    name: req.body.name,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    // Create that list in the database
    const newList = await createList(list, userId); // uncomment when the list repository is defined.
    // Return successful response if the list has been created successfully
    res.status(201).json(newList);
    // Report error to error handling middleware
  } catch (error) {
    next(error);
  }
}
