import type { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AvaliacaoCreateDTO } from '../dto/avaliacao.dto';
import { AvaliacaoService } from "../service/avaliacao.service";

export class AvaliacaoControle {
    private avaliacaoService: AvaliacaoService;

    public constructor(avaliacaoService: AvaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    public async criarAvaliacao(req: Request, res: Response) {
        try {
            const avaliacaoDto = plainToInstance(AvaliacaoCreateDTO, req.body);
            const errors = await validate(avaliacaoDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            const avaliacao = await this.avaliacaoService.criarAvaliacao(avaliacaoDto);
            res.status(201).json({ message: 'Avaliação criada com sucesso', avaliacao });
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
            const avaliacoes = await this.avaliacaoService.buscarAvaliacoesPorLivroId(id.toString());
            res.json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livroDto = plainToInstance(AvaliacaoCreateDTO, req.body);
            const errors = await validate(livroDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            const avaliacao = await this.avaliacaoService.atualizarAvaliacao(id.toString(), livroDto);
            res.json({ message: 'Avaliação atualizada com sucesso', avaliacao });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar avaliação' });
        }
    }

    public async deletarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.avaliacaoService.deletarAvaliacao(id.toString());
            res.json({ message: 'Avaliação deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaliação' });
        }
    }
}