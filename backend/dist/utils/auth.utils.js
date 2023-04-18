"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const argon2 = __importStar(require("argon2"));
async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    }
    catch (error) {
        console.log(`Error hashing password, error was: ${error}`);
        return null;
    }
}
exports.hashPassword = hashPassword;
async function verifyPassword(password, passwordHash) {
    try {
        if (await argon2.verify(passwordHash, password)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(`Error verifying password, error was: ${error}`);
        return null;
    }
}
exports.verifyPassword = verifyPassword;
