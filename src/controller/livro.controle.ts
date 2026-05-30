import { plainToInstance } from "class-transformer";
import type { Request, Response } from "express";
import { LivroCreateDTO } from "../dto/livro.dto.js";
import { validate } from "class-validator";
import { LivroService } from "../service/livro.service.js";

export class LivroControle {
    private livroService: LivroService;

    public constructor(livroService: LivroService) {
        this.livroService = livroService;
    }

    public async criarLivro(req: Request, res: Response) {
        try {
            const livroDto = plainToInstance(LivroCreateDTO, req.body);

            const errors = await validate(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            await this.livroService.criarLivro(livroDto);

            res.status(201).json({ message: 'Livro criado com sucesso', livro: livroDto });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao criar livro' });
        }
    }

    public async buscarLivroPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const livro = await this.livroService.buscarLivroPorId(id.toString());
            if (!livro) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }
            res.json(livro);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar livro' });
        }
    }

    public async buscarLivrosporAutor(req: Request, res: Response) {
        try {
            const { autor } = req.params;
            if (!autor) {
                return res.status(400).json({ error: 'Autor é obrigatório' });
            }
            const livros = await this.livroService.buscarLivrosporAutor(autor.toString());
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar livros por autor' });
        }
    }

    public async listarTodosLivros(req: Request, res: Response) {
        try {
            const livros = await this.livroService.listarTodosLivros();
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao listar livros' });
        }
    }

    public async buscarAvaliacoesPorLivroId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const avaliacoes = await this.livroService.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

    public async atualizarLivro(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livroDto = plainToInstance(LivroCreateDTO, req.body);

            const errors = await validate(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            await this.livroService.atualizarLivro(id.toString(), livroDto);
            res.json({ message: 'Livro atualizado com sucesso', livro: livroDto });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao atualizar livro' });
        }
    }

    public async excluirLivro(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            await this.livroService.excluirLivro(id.toString());
            res.json({ message: 'Livro excluído com sucesso' });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao excluir livro' });
        }
    }
}
