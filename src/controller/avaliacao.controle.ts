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
            const { livroId, avaliacao: nota, comentario } = req.body;
            const avaliacao =  Avaliacao.construir(livroId, nota, comentario);
            await this.avaliacaoDAO.criarAvaliacao(avaliacao);
            res.status(201).json({ message: 'Avaliação criada com sucesso', avaliacao});
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar avaliação' });
        }
    }
    public async buscarAvaliacoesPorLivroId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do livro é obrigatório' });
            }
            const avaliacoes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { avaliacao: nota, comentario } = req.body;
            const avaliacao = Avaliacao.reconstruir({ id: id.toString(), livroId: '', avaliacao: nota, comentario });
            await this.avaliacaoDAO.atualizarAvaliacao(avaliacao);
            res.json({ message: 'Avaliação atualizada com sucesso', avaliacao });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar avaliação' });
        }
    }

    public async deletarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.avaliacaoDAO.deletarAvaliacao(id.toString());
            res.json({ message: 'Avaliação deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaliação' });
        }
    }
}