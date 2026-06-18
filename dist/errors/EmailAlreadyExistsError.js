"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = void 0;
const AppError_1 = require("./AppError");
class EmailAlreadyExistsError extends AppError_1.AppError {
    constructor(detail = "O e-mail informado já está cadastrado em nosso sistema.") {
        super(409, "Email já cadastrado", detail);
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
