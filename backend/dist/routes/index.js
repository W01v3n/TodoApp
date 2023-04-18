"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const list_routes_1 = __importDefault(require("./list.routes"));
const item_routes_1 = __importDefault(require("./item.routes"));
// Initialize central route
const router = (0, express_1.Router)();
// Add auth routes to the central router
router.use(auth_routes_1.default, list_routes_1.default, item_routes_1.default);
exports.default = router;
