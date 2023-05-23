import { Router } from "express";
import {
  registerUser,
  userLogin,
  refreshAccessToken,
  getAuthenticatedUser,
  userLogout,
} from "../controllers/auth.controller";

import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", userLogin);
router.post("/users/logout", userLogout);
router.post("/auth/refresh-token", refreshAccessToken);
router.get("/auth/re", authMiddleware, getAuthenticatedUser);

export default router;
