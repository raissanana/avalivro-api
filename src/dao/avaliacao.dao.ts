import { Avaliacao } from '../modelo/avaliacao';
import { sql } from '../util/conexao';

export class AvaliacaoDAO {
    public async criarAvaliacao(avaliacao: Avaliacao): Promise<void> {
        try {
            const usuarioId = process.env.DEFAULT_DB_USER_ID;
            await sql(
                'INSERT INTO avaliacao (id, livro_id, nota, comentario, usuario_id) VALUES (?, ?, ?, ?, ?)',
                [avaliacao.id, avaliacao.livroId, avaliacao.avaliacao, avaliacao.comentario, usuarioId]
            );
        } catch (error) {
            console.error('Erro ao criar avaliação:', error);
            throw new Error('Erro ao criar avaliação');
        }
    }

    public async buscarAvaliacoesPorLivroId(livroId: string): Promise<Avaliacao[]> {
        try {
            const rows: any = await sql('SELECT * FROM avaliacao WHERE livro_id = ?', [livroId]);
            if (rows.length === 0) {
                return [];
            }
            const avaliacao = Avaliacao.reconstruir(rows[0]);
            return avaliacao ? [avaliacao] : [];
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            throw new Error('Erro ao buscar avaliações');
        }
    }

    public async atualizarAvaliacao(avaliacao: Avaliacao): Promise<void> {
        try {
            const result: any = await sql(
                'UPDATE avaliacao SET nota = ?, comentario = ? WHERE id = ? RETURNING *',
                [avaliacao.avaliacao, avaliacao.comentario, avaliacao.id]
            );
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada');
            }
        } catch (error) {
            console.error('Erro ao atualizar avaliação:', error);
            throw new Error('Erro ao atualizar avaliação');
        }
    }

    public async deletarAvaliacao(id: string): Promise<void> {
        try {
            const result: any = await sql('DELETE FROM avaliacao WHERE id = ? RETURNING *', [id]);
            if (result.length === 0) {
                throw new Error('Avaliação não encontrada');
            }
        } catch (error) {
            console.error('Erro ao deletar avaliação:', error);
            throw new Error('Erro ao deletar avaliação');
        }
    }

    public async calcularMediaPorTitulo(titulo: string): Promise<number | null> {
        try {
            const rows: any = await sql(`SELECT AVG(a.nota) AS media FROM avaliacao a JOIN livro l ON l.id = a.livro_id WHERE l.titulo = ?`, [titulo]);
            if (!rows[0]?.media) {
                return null;
            }

            return Number(rows[0].media);

        } catch (error) {
            console.error('Erro ao calcular média:', error);
            throw new Error('Erro ao calcular média');
        }
    }
}