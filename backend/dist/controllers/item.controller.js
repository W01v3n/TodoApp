"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItem = exports.updateItem = exports.getTodoItems = exports.createTodoItem = void 0;
const item_repository_1 = require("../repositories/item.repository");
async function createTodoItem(req, res, next) {
    // TODOS
    // save in consts list id from the request body
    const listId = Number(req.params.listId);
    const item = {
        title: req.body.title,
        content: req.body.content,
        completed: req.body.completed,
        listId: listId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    try {
        // Create that item in the database
        const newItem = await (0, item_repository_1.createItem)(item, listId);
        if (newItem) {
            // Return successful response if the item has been created successfully
            res.status(201).json(newItem);
        }
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.createTodoItem = createTodoItem;
// Create a function that will return all todo items with the same list id
async function getTodoItems(req, res, next) {
    // TODOS
    // save in const list id from the request parameters
    const listId = Number(req.params.listId);
    try {
        // Get all todo items with the same list id
        const items = await (0, item_repository_1.findItemsByListId)(listId);
        if (items) {
            // Return successful response if the items have been found successfully
            res.status(200).json(items);
        }
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.getTodoItems = getTodoItems;
// Create a function that will update a todo item on the todo_items table
async function updateItem(req, res, next) {
    const listId = Number(req.params.listId);
    const itemId = Number(req.params.itemId);
    const item = {
        id: itemId,
        title: req.body.title,
        content: req.body.content,
        listId: listId,
        updatedAt: new Date(),
    };
    try {
        const updatedItem = await (0, item_repository_1.updateItemById)(item, itemId);
        if (updatedItem) {
            res.status(200).json(item);
        }
        else {
            res.status(404).json({ error: "Could not find item." });
        }
    }
    catch (error) {
        next(error);
    }
}
exports.updateItem = updateItem;
// Create a function that will delete a todo item from the todo_items table
async function removeItem(req, res, next) {
    // TODOS
    // save in const item id from the request parameters
    const itemId = Number(req.params.itemId);
    try {
        const isDeleted = await (0, item_repository_1.deleteItemById)(itemId);
        if (isDeleted) {
            // Return a successful response if the todo item has been deleted successfully
            res.status(200).json({ deleted: isDeleted });
        }
        else {
            // Respond with a 404 status code if the todo item was not found
            res.status(404).json({ deleted: isDeleted });
        }
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.removeItem = removeItem;
