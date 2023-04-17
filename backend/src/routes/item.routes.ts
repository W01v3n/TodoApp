import { Router } from "express";
import {
  createTodoItem,
  getTodoItems,
  removeItem,
  updateItem,
} from "../controllers/item.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/lists/:listId/items", authMiddleware, createTodoItem);
router.get("/lists/:listId/items", authMiddleware, getTodoItems);
router.put("/lists/:listId/items/:itemId", authMiddleware, updateItem);
router.delete("/lists/:listId/items/:itemId", authMiddleware, removeItem);

export default router;
