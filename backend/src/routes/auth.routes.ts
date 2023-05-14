import { Router } from "express";
import {
  registerUser,
  userLogin,
  refreshAccessToken,
  getAuthenticatedUser,
} from "../controllers/auth.controller";

const router: Router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", userLogin);
router.post("/auth/refresh-token", refreshAccessToken);
router.get("/auth/re", getAuthenticatedUser);

export default router;
