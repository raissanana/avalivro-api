"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoService = void 0;
const avaliacao_1 = require("../modelo/avaliacao");
class AvaliacaoService {
    constructor(avaliacaoDAO) {
        this.avaliacaoDAO = avaliacaoDAO;
    }
    async criarAvaliacao(avaliacaoDto, usuarioId) {
        const avaliacao = avaliacao_1.Avaliacao.construir(avaliacaoDto.livroId, avaliacaoDto.avaliacao, avaliacaoDto.comentario);
        await this.avaliacaoDAO.criarAvaliacao(avaliacao, usuarioId);
        return avaliacao;
    }
    async buscarAvaliacoesPorLivroId(livroId) {
        const avaliacoes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(livroId);
        return avaliacoes;
    }
    async atualizarAvaliacao(id, avaliacaoDto, usuarioId) {
        const existentes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(avaliacaoDto.livroId);
        if (existentes.length === 0) {
            return null;
        }
        const avaliacao = avaliacao_1.Avaliacao.reconstruir({ id, livroId: avaliacaoDto.livroId, avaliacao: avaliacaoDto.avaliacao, comentario: avaliacaoDto.comentario ?? undefined });
        await this.avaliacaoDAO.atualizarAvaliacao(avaliacao, usuarioId);
        return avaliacao;
    }
    async deletarAvaliacao(id, usuarioId) {
        const existentes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(id);
        if (existentes.length === 0) {
            return false;
        }
        await this.avaliacaoDAO.deletarAvaliacao(id, usuarioId);
        return true;
    }
    async calcularMediaPorTitulo(titulo) {
        const media = await this.avaliacaoDAO.calcularMediaPorTitulo(titulo);
        return media ?? null;
    }
}
exports.AvaliacaoService = AvaliacaoService;
