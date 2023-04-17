import { Router } from "express";
import authRoutes from "./auth.routes";
import listRoutes from "./list.routes";
import itemRoutes from "./item.routes";

// Initialize central route
const router: Router = Router();
// Add auth routes to the central router
router.use(authRoutes, listRoutes, itemRoutes);

export default router;
