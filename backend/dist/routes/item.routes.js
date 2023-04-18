"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/lists/:listId/items", auth_middleware_1.default, item_controller_1.createTodoItem);
router.get("/lists/:listId/items", auth_middleware_1.default, item_controller_1.getTodoItems);
router.put("/lists/:listId/items/:itemId", auth_middleware_1.default, item_controller_1.updateItem);
router.delete("/lists/:listId/items/:itemId", auth_middleware_1.default, item_controller_1.removeItem);
exports.default = router;
