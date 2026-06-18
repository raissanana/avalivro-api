"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const livro_1 = require("../modelo/livro");
class LivroService {
    constructor(livroDAO, avaliacaoDAO) {
        this.livroDAO = livroDAO;
        this.avaliacaoDAO = avaliacaoDAO;
    }
    async criarLivro(livroDto, usuarioId) {
        const livro = livro_1.Livro.construir(livroDto.titulo, livroDto.autor, livroDto.ano);
        await this.livroDAO.criarLivro(livro, usuarioId);
        return livro;
    }
    async buscarLivroPorId(id) {
        const livro = await this.livroDAO.buscarLivroPorId(id);
        return livro;
    }
    async buscarLivrosporAutor(autor) {
        const livros = await this.livroDAO.buscarLivrosporAutor(autor);
        return livros;
    }
    async buscarAvaliacoesPorLivroId(livroId) {
        const avaliacoes = await this.livroDAO.buscarAvaliacoesPorLivroId(livroId);
        return avaliacoes;
    }
    async listarTodosLivros(usuarioId) {
        const livros = await this.livroDAO.listarTodosLivros(usuarioId);
        return livros;
    }
    async atualizarLivro(id, livroDto, usuarioId) {
        const livroExistente = await this.livroDAO.buscarLivroPorId(id);
        if (!livroExistente) {
            return null;
        }
        const livroAtualizado = livro_1.Livro.reconstruir({ id, titulo: livroDto.titulo, autor: livroDto.autor, ano: livroDto.ano });
        const atualizadoDB = await this.livroDAO.atualizarLivro(livroAtualizado, usuarioId);
        if (!atualizadoDB)
            return null; // se não atualizou (ex: livro não é do usuário)
        return livroAtualizado;
    }
    async excluirLivro(id, usuarioId) {
        const sucesso = await this.livroDAO.excluirLivro(id, usuarioId);
        return sucesso;
    }
    async calcularMediaPorTitulo(titulo) {
        const media = await this.avaliacaoDAO.calcularMediaPorTitulo(titulo);
        return media ?? null;
    }
}
exports.LivroService = LivroService;
