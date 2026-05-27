"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoControle = void 0;
const avaliacao_dao_1 = require("../dao/avaliacao.dao");
const avaliacao_1 = require("../modelo/avaliacao");
class AvaliacaoControle {
    constructor() {
        this.avaliacaoDAO = new avaliacao_dao_1.AvaliacaoDAO();
    }
    async criarAvaliacao(req, res) {
        try {
            const { livroId, avaliacao: nota, comentario } = req.body;
            const avaliacao = avaliacao_1.Avaliacao.construir(livroId, nota, comentario);
            await this.avaliacaoDAO.criarAvaliacao(avaliacao);
            res.status(201).json({ message: 'Avaliação criada com sucesso', avaliacao });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao criar avaliação' });
        }
    }
    async buscarAvaliacoesPorLivroId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do livro é obrigatório' });
            }
            const avaliacoes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }
    async atualizarAvaliacao(req, res) {
        try {
            const { id } = req.params;
            const { avaliacao: nota, comentario } = req.body;
            const avaliacao = avaliacao_1.Avaliacao.reconstruir({ id: id.toString(), livroId: '', avaliacao: nota, comentario });
            await this.avaliacaoDAO.atualizarAvaliacao(avaliacao);
            res.json({ message: 'Avaliação atualizada com sucesso', avaliacao });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar avaliação' });
        }
    }
    async deletarAvaliacao(req, res) {
        try {
            const { id } = req.params;
            await this.avaliacaoDAO.deletarAvaliacao(id.toString());
            res.json({ message: 'Avaliação deletada com sucesso' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaliação' });
        }
    }
}
exports.AvaliacaoControle = AvaliacaoControle;
