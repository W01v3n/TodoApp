import { Router } from "express";
import { registerUser, userLogin } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", userLogin);

export default router;
