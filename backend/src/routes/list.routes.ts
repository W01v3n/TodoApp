import { Router } from "express";
import { createTodoList, getTodoLists } from "../controllers/list.controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/lists", authMiddleware, createTodoList);
router.get("/lists", authMiddleware, getTodoLists);

export default router;
