import { Router } from "express";
import { createTodoList } from "../controllers/list.controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/lists", authMiddleware, createTodoList);

export default router;
