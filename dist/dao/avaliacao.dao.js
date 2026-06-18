"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoDAO = void 0;
const avaliacao_1 = require("../modelo/avaliacao");
const conexao_1 = require("../util/conexao");
class AvaliacaoDAO {
    async criarAvaliacao(avaliacao, usuarioId) {
        try {
            // Verifica se o livro pertence a este usuário
            const livroCheck = await (0, conexao_1.sql)('SELECT id FROM livro WHERE id = ? AND created_by = ?', [avaliacao.livroId, usuarioId]);
            if (livroCheck.length === 0) {
                throw new Error('Você só pode avaliar livros criados por você');
            }
            await (0, conexao_1.sql)('INSERT INTO avaliacao (id, livro_id, nota, comentario, usuario_id) VALUES (?, ?, ?, ?, ?)', [avaliacao.id, avaliacao.livroId, avaliacao.avaliacao, avaliacao.comentario, usuarioId]);
        }
        catch (error) {
            console.error('Erro ao criar avaliação:', error);
            throw new Error('Erro ao criar avaliação');
        }
    }
    async buscarAvaliacoesPorLivroId(livroId) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM avaliacao WHERE livro_id = ?', [livroId]);
            if (rows.length === 0) {
                return [];
            }
            const avaliacao = avaliacao_1.Avaliacao.reconstruir(rows[0]);
            return avaliacao ? [avaliacao] : [];
        }
        catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            throw new Error('Erro ao buscar avaliações');
        }
    }
    async atualizarAvaliacao(avaliacao, usuarioId) {
        try {
            const result = await (0, conexao_1.sql)('UPDATE avaliacao SET nota = ?, comentario = ? WHERE id = ? AND usuario_id = ? RETURNING *', [avaliacao.avaliacao, avaliacao.comentario, avaliacao.id, usuarioId]);
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada ou você não tem permissão');
            }
        }
        catch (error) {
            console.error('Erro ao atualizar avaliação:', error);
            throw new Error('Erro ao atualizar avaliação');
        }
    }
    async deletarAvaliacao(id, usuarioId) {
        try {
            const result = await (0, conexao_1.sql)('DELETE FROM avaliacao WHERE id = ? AND usuario_id = ? RETURNING *', [id, usuarioId]);
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada ou você não tem permissão');
            }
        }
        catch (error) {
            console.error('Erro ao deletar avaliação:', error);
            throw new Error('Erro ao deletar avaliação');
        }
    }
    async calcularMediaPorTitulo(titulo) {
        try {
            const rows = await (0, conexao_1.sql)(`SELECT AVG(a.nota) AS media FROM avaliacao a JOIN livro l ON l.id = a.livro_id WHERE l.titulo = ?`, [titulo]);
            if (!rows[0]?.media) {
                return null;
            }
            return Number(rows[0].media);
        }
        catch (error) {
            console.error('Erro ao calcular média:', error);
            throw new Error('Erro ao calcular média');
        }
    }
}
exports.AvaliacaoDAO = AvaliacaoDAO;
