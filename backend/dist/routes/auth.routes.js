"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/users/register", auth_controller_1.registerUser);
router.post("/users/login", auth_controller_1.userLogin);
router.post("/auth/refresh-token", auth_controller_1.refreshAccessToken);
exports.default = router;
