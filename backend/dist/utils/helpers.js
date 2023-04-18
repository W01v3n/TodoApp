"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOkPacket = void 0;
function isOkPacket(data) {
    return "affectedRows" in data;
}
exports.isOkPacket = isOkPacket;
