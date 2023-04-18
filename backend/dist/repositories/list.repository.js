"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findListsByUserId = exports.createList = void 0;
const connectionPool_1 = __importDefault(require("../database/connectionPool"));
const helpers_1 = require("../utils/helpers");
async function createList(list, userId) {
    // Create a todo list in the database, and in the field user_id, insert the id of the user who created the list.
    // Return the created list.
    // If the list was not created, return null.
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = "INSERT INTO todo_lists (name, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)";
    const queryParams = [list.name, userId, createdAt, updatedAt];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if ((0, helpers_1.isOkPacket)(result)) {
            const createdList = {
                id: result.insertId,
                name: list.name,
                userId: userId,
                createdAt: createdAt,
                updatedAt: updatedAt,
            };
            return createdList;
        }
        return null;
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        return null;
    }
}
exports.createList = createList;
// Function to find all todo lists with the same user id
async function findListsByUserId(userId) {
    // Return all todo lists with the same user id
    // If no lists are found, return null
    const query = "SELECT * FROM todo_lists WHERE user_id = ?";
    const queryParams = [userId];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if (result.length) {
            const lists = result.map((list) => {
                return {
                    id: list.id,
                    name: list.name,
                    userId: list.user_id,
                    createdAt: list.created_at,
                    updatedAt: list.updated_at,
                };
            });
            return lists;
        }
        return null;
    }
    catch (error) {
        console.error("Error finding todo lists:", error);
        return null;
    }
}
exports.findListsByUserId = findListsByUserId;
