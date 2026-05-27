"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoDAO = void 0;
const avaliacao_1 = require("../modelo/avaliacao");
const conexao_1 = require("../util/conexao");
class AvaliacaoDAO {
    async criarAvaliacao(avaliacao) {
        try {
            const result = await (0, conexao_1.sql)('INSERT INTO avaliacao (id, livro_id, nota, comentario) VALUES (?, ?, ?, ?) RETURNING *', [avaliacao.id, avaliacao.livroId, avaliacao.avaliacao, avaliacao.comentario]);
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
    async atualizarAvaliacao(avaliacao) {
        try {
            const result = await (0, conexao_1.sql)('UPDATE avaliacao SET nota = ?, comentario = ? WHERE id = ? RETURNING *', [avaliacao.avaliacao, avaliacao.comentario, avaliacao.id]);
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada');
            }
        }
        catch (error) {
            console.error('Erro ao atualizar avaliação:', error);
            throw new Error('Erro ao atualizar avaliação');
        }
    }
    async deletarAvaliacao(id) {
        try {
            const result = await (0, conexao_1.sql)('DELETE FROM avaliacao WHERE id = ? RETURNING *', [id]);
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada');
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
