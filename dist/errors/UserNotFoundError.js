"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const AppError_1 = require("./AppError");
class UserNotFoundError extends AppError_1.AppError {
    constructor(detail = "O usuário solicitado não foi encontrado.") {
        super(404, "Usuário não encontrado", detail);
    }
}
exports.UserNotFoundError = UserNotFoundError;
