import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { AvaliacaoCreateDTO, AvaliacaoListDTO } from '../dto/avaliacao.dto';
import { Avaliacao } from '../modelo/avaliacao';

export class AvaliacaoService {

    public constructor(private readonly avaliacaoDAO: AvaliacaoDAO) {
    }

    public async criarAvaliacao(avaliacaoDto: AvaliacaoCreateDTO, usuarioId: string): Promise<Avaliacao> {
        const avaliacao = Avaliacao.construir(avaliacaoDto.livroId, avaliacaoDto.avaliacao, avaliacaoDto.comentario);
        await this.avaliacaoDAO.criarAvaliacao(avaliacao, usuarioId);
        return avaliacao;
    }

    public async buscarAvaliacoesPorLivroId(livroId: string): Promise<AvaliacaoListDTO[]> {
        const avaliacoes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(livroId);
        return avaliacoes;
    }

    public async atualizarAvaliacao(id: string, avaliacaoDto: AvaliacaoCreateDTO, usuarioId: string): Promise<Avaliacao | null> {
        const existentes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(avaliacaoDto.livroId);
        if (existentes.length === 0) {
            return null;
        }
        const avaliacao = Avaliacao.reconstruir({ id, livroId: avaliacaoDto.livroId, avaliacao: avaliacaoDto.avaliacao, comentario: avaliacaoDto.comentario ?? undefined });
        await this.avaliacaoDAO.atualizarAvaliacao(avaliacao, usuarioId);
        return avaliacao;
    }

    public async deletarAvaliacao(id: string, usuarioId: string): Promise<boolean> {
        const existentes = await this.avaliacaoDAO.buscarAvaliacoesPorLivroId(id);
        if (existentes.length === 0) {
            return false;
        }
        await this.avaliacaoDAO.deletarAvaliacao(id, usuarioId);
        return true;
    }

    public async calcularMediaPorTitulo(titulo: string): Promise<number | null> {
        const media = await this.avaliacaoDAO.calcularMediaPorTitulo(titulo);
        return media ?? null;
    }
}