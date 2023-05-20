import { Router } from "express";
import {
  createTodoList,
  getTodoLists,
  deleteTodoList,
} from "../controllers/list.controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/lists", authMiddleware, createTodoList);
router.get("/lists", authMiddleware, getTodoLists);
router.delete("/lists/:listId", authMiddleware, deleteTodoList);

export default router;
