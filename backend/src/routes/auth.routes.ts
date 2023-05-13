import { Router } from "express";
import {
  registerUser,
  userLogin,
  refreshAccessToken,
} from "../controllers/auth.controller";

const router: Router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", userLogin);
router.post("/auth/refresh-token", refreshAccessToken);

export default router;
