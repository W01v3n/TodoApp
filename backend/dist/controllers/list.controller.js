"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoList = exports.getTodoLists = exports.createTodoList = void 0;
const list_repository_1 = require("../repositories/list.repository");
async function createTodoList(req, res, next) {
    // TODOS
    // save in consts list name from the request body
    if (!req.userId) {
        res.status(401).json({ error: "User ID is missing." });
    }
    const userId = Number(req.userId);
    const list = {
        name: req.body.name,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    try {
        // Create that list in the database
        const newList = await (0, list_repository_1.createList)(list, userId); // uncomment when the list repository is defined.
        // Return successful response if the list has been created successfully
        res.status(201).json(newList);
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.createTodoList = createTodoList;
// Create a function that will return all todo lists with the same user id
async function getTodoLists(req, res, next) {
    // TODOS
    // save in consts user id from the request body
    if (!req.userId) {
        res.status(401).json({ error: "User ID is missing." });
    }
    const userId = Number(req.userId);
    try {
        // Get all todo lists with the same user id
        const lists = await (0, list_repository_1.findListsByUserId)(userId);
        // Return successful response if the lists have been found successfully
        res.status(200).json(lists);
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.getTodoLists = getTodoLists;
async function deleteTodoList(req, res, next) {
    // TODOS
    // save in consts list name from the request body
    if (!req.userId) {
        res.status(401).json({ error: "User ID is missing." });
    }
    const listId = Number(req.params.listId);
    try {
        // Delete the list from the database
        const deleted = await (0, list_repository_1.deleteListById)(listId);
        // Return successful response if the list has been deleted successfully
        if (deleted) {
            res.status(200).json({ message: "List deleted successfully." });
        }
        else {
            res.status(404).json({ message: "List not found." });
        }
        // Report error to error handling middleware
    }
    catch (error) {
        next(error);
    }
}
exports.deleteTodoList = deleteTodoList;
