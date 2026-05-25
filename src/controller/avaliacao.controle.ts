import { AvaliacaoDAO } from "../dao/avaliacao.dao";
import { Avaliacao } from "../modelo/avaliacao";
import type { Request, Response } from 'express';

export class AvaliacaoControle {
    private avaliacaoDAO: AvaliacaoDAO;

    constructor() {
        this.avaliacaoDAO = new AvaliacaoDAO();
    }

    public async criarAvaliacao(req: Request, res: Response) {
        try {
            const { livroId, avaliacao, comentario } = req.body;

            if (!livroId || avaliacao === undefined) {
                return res.status(400).json({
                    error: 'livroId e avaliacao são obrigatórios'
                });
            }

            const novaAvaliacao = Avaliacao.construir(
                livroId,
                avaliacao,
                comentario
            );

            await this.avaliacaoDAO.criarAvaliacao(novaAvaliacao);

            return res.status(201).json({
                message: 'Avaliação criada com sucesso',
                avaliacao: novaAvaliacao
            });

        } catch (error) {
            console.error('Erro no controller criarAvaliacao:', error);

            return res.status(500).json({
                error: 'Erro ao criar avaliação',
                details: error
            });
        }
    }

    public async buscarAvaliacoesPorLivroId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    error: 'ID do livro é obrigatório'
                });
            }

            const avaliacoes =
                await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(id);

            return res.status(200).json(avaliacoes);

        } catch (error) {
            console.error('Erro no controller buscarAvaliacoes:', error);

            return res.status(500).json({
                error: 'Erro ao buscar avaliações',
                details: error
            });
        }
    }

    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { livroId, avaliacao, comentario } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: 'ID da avaliação é obrigatório'
                });
            }

            const avaliacaoAtualizada = Avaliacao.reconstruir({
                id,
                livroId,
                avaliacao,
                comentario
            });

            await this.avaliacaoDAO.atualizarAvaliacao(avaliacaoAtualizada);

            return res.status(200).json({
                message: 'Avaliação atualizada com sucesso',
                avaliacao: avaliacaoAtualizada
            });

        } catch (error) {
            console.error('Erro no controller atualizarAvaliacao:', error);

            return res.status(500).json({
                error: 'Erro ao atualizar avaliação',
                details: error
            });
        }
    }

    public async deletarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    error: 'ID é obrigatório'
                });
            }

            await this.avaliacaoDAO.deletarAvaliacao(id);

            return res.status(200).json({
                message: 'Avaliação deletada com sucesso'
            });

        } catch (error) {
            console.error('Erro no controller deletarAvaliacao:', error);

            return res.status(500).json({
                error: 'Erro ao deletar avaliação',
                details: error
            });
        }
    }
}