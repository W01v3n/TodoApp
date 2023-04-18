"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemById = exports.updateItemById = exports.findItemsByListId = exports.createItem = void 0;
const connectionPool_1 = __importDefault(require("../database/connectionPool"));
const helpers_1 = require("../utils/helpers");
// Create a function that creates a todo item with relation to its list_id
async function createItem(item, listId) {
    // Create a todo item in the database, and in the field list_id, insert the id of the list to which the item belongs.
    // Return the created item.
    // If the item was not created, return null.
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = "INSERT INTO todo_items (title, content, completed, list_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
    const queryParams = [
        item.title,
        item.content,
        item.completed,
        listId,
        createdAt,
        updatedAt,
    ];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if ((0, helpers_1.isOkPacket)(result)) {
            const createdItem = {
                id: result.insertId,
                title: item.title,
                content: item.content,
                completed: item.completed,
                listId: listId,
                createdAt: createdAt,
                updatedAt: updatedAt,
            };
            return createdItem;
        }
        return null;
    }
    catch (error) {
        console.error("Error creating todo item:", error);
        return null;
    }
}
exports.createItem = createItem;
// Create a function that retrieves all todo items with the same list id
async function findItemsByListId(listId) {
    // Retrieve all todo items with the same list id
    // Return the retrieved items.
    // If the items were not retrieved, return null.
    const query = "SELECT * FROM todo_items WHERE list_id = ?";
    const queryParams = [listId];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if (result.length > 0) {
            const items = result.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    completed: item.completed,
                    listId: item.list_id,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at,
                };
            });
            return items;
        }
        return null;
    }
    catch (error) {
        console.error("Error retrieving todo items:", error);
        return null;
    }
}
exports.findItemsByListId = findItemsByListId;
// Create a function that updates a todo item by its id from the todo_items table, and return the updated object of the item
async function updateItemById(item, itemId) {
    const { title, content } = item;
    const query = "UPDATE todo_items SET title = ?, content = ? WHERE id = ?";
    const queryParams = [title, content, itemId];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if (result) {
            const selectQuery = "SELECT * FROM todo_items WHERE id = ?";
            const selectParams = [itemId];
            const [rows] = await connectionPool_1.default.query(selectQuery, selectParams);
            // Return the updated todo item object
            return rows[0];
        }
        return null;
    }
    catch (error) {
        console.log("Error updating item: ", error);
        return null;
    }
}
exports.updateItemById = updateItemById;
// Create a function that deletes a todo item by its id from the todo_items table, and return true if the item is found and deleted, otherwise return false
async function deleteItemById(itemId) {
    // Delete a todo item by its id from the todo_items table
    // Return true if the item is found and deleted, otherwise return false
    const query = "DELETE FROM todo_items WHERE id = ?";
    const queryParams = [itemId];
    try {
        const [result] = await connectionPool_1.default.query(query, queryParams);
        if ((0, helpers_1.isOkPacket)(result)) {
            return result.affectedRows > 0;
        }
        return false;
    }
    catch (error) {
        console.error("Error deleting todo item:", error);
        return false;
    }
}
exports.deleteItemById = deleteItemById;
