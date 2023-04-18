"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../controllers/list.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/lists", auth_middleware_1.default, list_controller_1.createTodoList);
router.get("/lists", auth_middleware_1.default, list_controller_1.getTodoLists);
exports.default = router;
