"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroControle = void 0;
const class_transformer_1 = require("class-transformer");
const livro_dto_js_1 = require("../dto/livro.dto.js");
const class_validator_1 = require("class-validator");
class LivroControle {
    constructor(livroService) {
        this.livroService = livroService;
    }
    async criarLivro(req, res) {
        try {
            const livroDto = (0, class_transformer_1.plainToInstance)(livro_dto_js_1.LivroCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const livro = await this.livroService.criarLivro(livroDto, req.usuarioId);
            console.log('id livro:' + livro.id);
            res.status(201).json({
                message: 'Livro criado com sucesso',
                livro: {
                    id: livro.id,
                    titulo: livro.titulo,
                    autor: livro.autor,
                    ano: livro.ano
                }
            });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao criar livro' });
        }
    }
    async buscarLivroPorId(req, res) {
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
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar livro' });
        }
    }
    async buscarLivrosporAutor(req, res) {
        try {
            const { autor } = req.params;
            if (!autor) {
                return res.status(400).json({ error: 'Autor é obrigatório' });
            }
            const livros = await this.livroService.buscarLivrosporAutor(autor.toString());
            res.json(livros);
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar livros por autor' });
        }
    }
    async listarTodosLivros(req, res) {
        try {
            const livros = await this.livroService.listarTodosLivros(req.usuarioId);
            res.json(livros);
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao listar livros' });
        }
    }
    async buscarAvaliacoesPorLivroId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const avaliacoes = await this.livroService.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }
    async atualizarLivro(req, res) {
        try {
            const { id } = req.params;
            const livroDto = (0, class_transformer_1.plainToInstance)(livro_dto_js_1.LivroCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const livro = await this.livroService.atualizarLivro(id.toString(), livroDto, req.usuarioId);
            if (!livro) {
                return res.status(403).json({ error: 'Livro não encontrado ou você não tem permissão para editá-lo' });
            }
            res.json({ message: 'Livro atualizado com sucesso', livro: livroDto });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao atualizar livro' });
        }
    }
    async excluirLivro(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const sucesso = await this.livroService.excluirLivro(id.toString(), req.usuarioId);
            if (!sucesso) {
                return res.status(403).json({ error: 'Livro não encontrado ou você não tem permissão para excluí-lo' });
            }
            res.json({ message: 'Livro excluído com sucesso' });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao excluir livro' });
        }
    }
}
exports.LivroControle = LivroControle;
