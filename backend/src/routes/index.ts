import { Router } from "express";
import authRoutes from "./auth.routes";

// Initialize central route
const router: Router = Router();
// Add auth routes to the central router
router.use(authRoutes);

export default router;
