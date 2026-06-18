"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDAO = void 0;
const livro_1 = require("../modelo/livro");
const conexao_1 = require("../util/conexao");
class LivroDAO {
    async criarLivro(livro, usuarioId) {
        try {
            const result = await (0, conexao_1.sql)('INSERT INTO livro (id, titulo, autor, ano, avaliacao_media, created_by) VALUES (?, ?, ?, ?, ?, ?) RETURNING *', [livro.id, livro.titulo, livro.autor, livro.ano, livro.avaliacaoMedia, usuarioId]);
        }
        catch (error) {
            console.error('Erro ao criar livro:', error);
            throw new Error('Erro ao criar livro');
        }
    }
    async buscarLivroPorId(id) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM livro WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const livro = livro_1.Livro.reconstruir({ id: rows[0].id, titulo: rows[0].titulo, autor: rows[0].autor, ano: rows[0].ano, avaliacaoMedia: rows[0].avaliacao_media });
            return livro;
        }
        catch (error) {
            console.error('Erro ao buscar livro:', error);
            throw new Error('Erro ao buscar livro');
        }
    }
    async listarTodosLivros(usuarioId) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM livro WHERE created_by = ?', [usuarioId]);
            return rows.map((row) => ({ id: row.id, titulo: row.titulo, autor: row.autor }));
        }
        catch (error) {
            console.error('Erro ao listar livros:', error);
            throw new Error('Erro ao listar livros');
        }
    }
    async buscarLivrosporAutor(autor) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM livro WHERE autor = ?', [autor]);
            return rows.map((row) => livro_1.Livro.reconstruir({ id: row.id, titulo: row.titulo, autor: row.autor, ano: row.ano, avaliacaoMedia: row.avaliacao_media }));
        }
        catch (error) {
            console.error('Erro ao buscar livros por autor:', error);
            throw new Error('Erro ao buscar livros por autor');
        }
    }
    async buscarAvaliacoesPorLivroId(livroId) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM avaliacao WHERE livro_id = ?', [livroId]);
            return rows;
        }
        catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            throw new Error('Erro ao buscar avaliações');
        }
    }
    async atualizarLivro(livro, usuarioId) {
        try {
            const result = await (0, conexao_1.sql)('UPDATE livro SET titulo = ?, autor = ?, ano = ?, avaliacao_media = ? WHERE id = ? AND created_by = ? RETURNING *', [livro.titulo, livro.autor, livro.ano, livro.avaliacaoMedia, livro.id, usuarioId]);
            if (result.length === 0) {
                return null;
            }
            return livro_1.Livro.reconstruir({ id: result[0].id, titulo: result[0].titulo, autor: result[0].autor, ano: result[0].ano, avaliacaoMedia: result[0].avaliacao_media });
        }
        catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw new Error('Erro ao atualizar livro');
        }
    }
    async excluirLivro(id, usuarioId) {
        try {
            const result = await (0, conexao_1.sql)('DELETE FROM livro WHERE id = ? AND created_by = ? RETURNING id', [id, usuarioId]);
            return result.length > 0;
        }
        catch (error) {
            console.error('Erro ao excluir livro:', error);
            throw new Error('Erro ao excluir livro');
        }
    }
}
exports.LivroDAO = LivroDAO;
