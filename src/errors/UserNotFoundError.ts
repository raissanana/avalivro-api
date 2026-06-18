import { AppError } from "./AppError";

export class UserNotFoundError extends AppError {
    constructor(detail: string = "O usuário solicitado não foi encontrado.") {
        super(404, "Usuário não encontrado", detail);
    }
}
