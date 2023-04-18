"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
const connectionPool_1 = __importDefault(require("../database/connectionPool"));
async function createUser(user) {
    await connectionPool_1.default.query("INSERT INTO users SET ?", [user]);
    return user;
}
exports.createUser = createUser;
async function getUserByEmail(email) {
    const [rows] = await connectionPool_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
    const row = rows[0];
    if (!row)
        return null;
    return {
        id: row.id,
        username: row.username,
        email: row.email,
        password_hash: row.password_hash,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}
exports.getUserByEmail = getUserByEmail;
