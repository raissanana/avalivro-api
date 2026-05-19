import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class usuarioCreateDTO {
    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString({ message: 'Email deve ser uma string' })
    email: string;

    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @IsString({ message: 'Senha deve ser uma string' })
    senha: string;
}

export class usuarioListDTO {
    @IsNotEmpty({ message: 'ID é obrigatório' })
    @IsString({ message: 'ID deve ser uma string' })
    id: string;

    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString({ message: 'Email deve ser uma string' })
    email: string;
}