import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LivroListDTO {
    @IsNotEmpty({ message: 'ID é obrigatório' })
    @IsString({ message: 'ID deve ser uma string' })
    id: string;

    @IsNotEmpty({ message: 'Título é obrigatório' })
    @IsString({ message: 'Título deve ser uma string' })
    titulo: string;

    @IsNotEmpty({ message: 'Autor é obrigatório' })
    @IsString({ message: 'Autor deve ser uma string' })
    autor: string;
}

export class LivroCreateDTO {
    @IsNotEmpty({ message: 'Título é obrigatório' })
    @IsString({ message: 'Título deve ser uma string' })
    titulo: string;

    @IsNotEmpty({ message: 'Autor é obrigatório' })
    @IsString({ message: 'Autor deve ser uma string' })
    autor: string;

    @IsNotEmpty({ message: 'Ano é obrigatório' })
    @IsNumber({}, { message: 'Ano deve ser um número' })
    ano: number;

    avaliacaoMedia?: number;
}