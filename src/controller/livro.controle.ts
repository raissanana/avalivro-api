import { plainToInstance } from "class-transformer";
import { LivroDAO } from "../dao/livro.dao.js";
import { Livro } from "../modelo/livro.js";
import type { Request, Response } from "express";
import { LivroCreateDTO } from "../dto/livro.dto.js";
import { validate } from "class-validator";

export class LivroControle {
    private livroDAO: LivroDAO;

    constructor(){
        this.livroDAO = new LivroDAO(); 
    }

    public async criarLivro(req: Request, res: Response) {
        try {
            const livroDto = plainToInstance(LivroCreateDTO, req.body);

            const errors = await validate(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            const livro = Livro.construir(livroDto.titulo, livroDto.autor, livroDto.ano, livroDto.avaliacaoMedia);
            await this.livroDAO.criarLivro(livro);
            res.status(201).json({ message: 'Livro criado com sucesso', livro });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao criar livro'});
        }
    }

    public async buscarLivroPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const livro = await this.livroDAO.buscarLivroPorId(id.toString());
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
            const livros = await this.livroDAO.buscarLivrosporAutor(autor.toString());
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar livros por autor' });
        }
    }

    public async listarTodosLivros(req: Request, res: Response) {
        try {
            const livros = await this.livroDAO.listarTodosLivros();
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
            const avaliacoes = await this.livroDAO.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

    public async atualizarLivro(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livroDto = plainToInstance(LivroCreateDTO, req.body);

            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const livro = Livro.reconstruir({ id: id.toString(), titulo: livroDto.titulo, autor: livroDto.autor, ano: livroDto.ano });
            await this.livroDAO.atualizarLivro(livro);
            res.json({ message: 'Livro atualizado com sucesso', livro });
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
            await this.livroDAO.excluirLivro(id.toString());
            res.json({ message: 'Livro excluído com sucesso' });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao excluir livro' });
        }
    }
}
