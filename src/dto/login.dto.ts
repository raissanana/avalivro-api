import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString({ message: 'Email deve ser uma string' })
    email: string;

    @IsNotEmpty({ message: 'Senha é obrigatória' })
    senha: string;
}