"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({ message: error.message });
};
exports.errorHandler = errorHandler;
