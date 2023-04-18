"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const database_1 = __importDefault(require("../config/database"));
const pool = promise_1.default.createPool({
    ...database_1.default,
    waitForConnections: true,
    multipleStatements: true,
});
// Aquire connection from the pool and check if database is connected
pool
    .getConnection()
    .then((connection) => {
    console.log("Connected to database.");
    // Release the connection back to the pool
    connection.release();
})
    .catch((error) => {
    console.log("Error connecting to database", error);
});
exports.default = pool;
