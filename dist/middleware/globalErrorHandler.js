"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const AppError_1 = require("../errors/AppError");
function globalErrorHandler(err, req, res, next) {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            title: err.title,
            status: err.statusCode,
            detail: err.detail
        });
    }
    console.error("Erro não tratado detectado:", err);
    return res.status(500).json({
        title: "Erro interno",
        status: 500,
        detail: "Ocorreu um erro interno inesperado no servidor."
    });
}
