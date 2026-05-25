import { LivroListDTO } from '../dto/livro.dto.js';
import { Livro } from '../modelo/livro';
import { sql } from '../util/conexao';

export class LivroDAO {
    public async criarLivro(livro: Livro): Promise<void> {
        try {
            const result: any = await sql(
                'INSERT INTO livro (id, titulo, autor, ano, avaliacao_media) VALUES (?, ?, ?, ?, ?) RETURNING *',
                [livro.id, livro.titulo, livro.autor, livro.ano, livro.avaliacaoMedia]
            );
        } catch (error) {
            console.error('Erro ao criar livro:', error);
            throw new Error('Erro ao criar livro');
        }
    }

    public async buscarLivroPorId(id: string): Promise<Livro | null> {
        try {
            const rows: any = await sql('SELECT * FROM livro WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const livro = Livro.reconstruir({ id: rows[0].id, titulo: rows[0].titulo, autor: rows[0].autor, ano: rows[0].ano, avaliacaoMedia: rows[0].avaliacao_media });
            return livro;
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
            throw new Error('Erro ao buscar livro');
        }
    }

    public async listarTodosLivros(): Promise<LivroListDTO[]> {
        try {
            const rows: any = await sql('SELECT * FROM livro');
            return rows.map((row: any) => ({ id: row.id, titulo: row.titulo, autor: row.autor }));
        } catch (error) {
            console.error('Erro ao listar livros:', error);
            throw new Error('Erro ao listar livros');
        }
    }

    public async buscarLivrosporAutor(autor: string): Promise<Livro[]> {
        try {
            const rows: any = await sql('SELECT * FROM livro WHERE autor = ?', [autor]);
            return rows.map((row: any) => Livro.reconstruir({ id: row.id, titulo: row.titulo, autor: row.autor, ano: row.ano, avaliacaoMedia: row.avaliacao_media }));
        } catch (error) {
            console.error('Erro ao buscar livros por autor:', error);
            throw new Error('Erro ao buscar livros por autor');
        }
    }

    public async buscarAvaliacoesPorLivroId(livroId: string): Promise<any[]> {
        try {
            const rows: any = await sql('SELECT * FROM avaliacao WHERE livro_id = ?', [livroId]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            throw new Error('Erro ao buscar avaliações');
        }
    }
    public async atualizarLivro(livro: Livro): Promise<Livro | null> {
        try {
            const result: any = await sql(
                'UPDATE livro SET titulo = ?, autor = ?, ano = ?, avaliacao_media = ? WHERE id = ? RETURNING *',
                [livro.titulo, livro.autor, livro.ano, livro.avaliacaoMedia, livro.id]
            );
            if (result.length === 0) {
                return null;
            }
            return Livro.reconstruir({ id: result[0].id, titulo: result[0].titulo, autor: result[0].autor, ano: result[0].ano, avaliacaoMedia: result[0].avaliacao_media });
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw new Error('Erro ao atualizar livro');
        }
    }

    public async excluirLivro(id: string): Promise<boolean> {
        try {
            const result: any = await sql('DELETE FROM livro WHERE id = ? RETURNING id', [id]);
            return result.length > 0;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            throw new Error('Erro ao excluir livro');
        }
    }
}
