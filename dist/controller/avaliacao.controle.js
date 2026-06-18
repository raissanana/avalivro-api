"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoControle = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const avaliacao_dto_1 = require("../dto/avaliacao.dto");
class AvaliacaoControle {
    constructor(avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }
    async criarAvaliacao(req, res) {
        try {
            const avaliacaoDto = (0, class_transformer_1.plainToInstance)(avaliacao_dto_1.AvaliacaoCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(avaliacaoDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const avaliacao = await this.avaliacaoService.criarAvaliacao(avaliacaoDto, req.usuarioId);
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
            const avaliacoes = await this.avaliacaoService.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }
    async atualizarAvaliacao(req, res) {
        try {
            const { id } = req.params;
            const livroDto = (0, class_transformer_1.plainToInstance)(avaliacao_dto_1.AvaliacaoCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const avaliacao = await this.avaliacaoService.atualizarAvaliacao(id.toString(), livroDto, req.usuarioId);
            res.json({ message: 'Avaliação atualizada com sucesso', avaliacao });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar avaliação' });
        }
    }
    async deletarAvaliacao(req, res) {
        try {
            const { id } = req.params;
            await this.avaliacaoService.deletarAvaliacao(id.toString(), req.usuarioId);
            res.json({ message: 'Avaliação deletada com sucesso' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaliação' });
        }
    }
}
exports.AvaliacaoControle = AvaliacaoControle;
