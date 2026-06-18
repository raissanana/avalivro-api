import { AppError } from "./AppError";

export class EmailAlreadyExistsError extends AppError {
    constructor(detail: string = "O e-mail informado já está cadastrado em nosso sistema.") {
        super(409, "Email já cadastrado", detail);
    }
}
