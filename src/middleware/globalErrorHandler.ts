import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
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
