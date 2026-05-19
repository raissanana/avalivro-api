import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AvaliacaoCreateDTO {
    @IsNotEmpty({ message: 'ID do livro é obrigatório' })
    @IsString({ message: 'ID do livro deve ser uma string' })
    livroId: string;

    @IsNotEmpty({ message: 'Avaliação é obrigatória' })
    @IsNumber({}, { message: 'Avaliação deve ser um número' })
    avaliacao: number;

    comentario?: string;
}

export class AvaliacaoListDTO {
    @IsNotEmpty({ message: 'ID é obrigatório' })
    @IsString({ message: 'ID deve ser uma string' })
    id: string;

    @IsNotEmpty({ message: 'ID do livro é obrigatório' })
    @IsString({ message: 'ID do livro deve ser uma string' })
    livroId: string;
    
    @IsNotEmpty({ message: 'Avaliação é obrigatória' })
    @IsNumber({}, { message: 'Avaliação deve ser um número' })
    avaliacao: number;

    comentario?: string;
}