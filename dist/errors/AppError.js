"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, title, detail) {
        super(detail);
        this.statusCode = statusCode;
        this.title = title;
        this.detail = detail;
        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
