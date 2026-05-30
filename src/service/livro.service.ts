import { LivroDAO } from '../dao/livro.dao';
import { LivroCreateDTO, LivroListDTO } from '../dto/livro.dto';
import { Livro } from '../modelo/livro';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';


export class LivroService {

    public constructor(private readonly livroDAO: LivroDAO, private readonly avaliacaoDAO: AvaliacaoDAO) {
    }

    public async criarLivro(livroDto: LivroCreateDTO): Promise<Livro> {
        const livro = Livro.construir(livroDto.titulo, livroDto.autor, livroDto.ano);
        await this.livroDAO.criarLivro(livro);
        return livro;
    }

    public async buscarLivroPorId(id: string): Promise<Livro | null> {
        const livro = await this.livroDAO.buscarLivroPorId(id);
        return livro;
    }

    public async buscarLivrosporAutor(autor: string): Promise<Livro[]> {
        const livros = await this.livroDAO.buscarLivrosporAutor(autor);
        return livros;
    }

    public async buscarAvaliacoesPorLivroId(livroId: string): Promise<any[]> {
        const avaliacoes = await this.livroDAO.buscarAvaliacoesPorLivroId(livroId);
        return avaliacoes;
    }

    public async listarTodosLivros(): Promise<LivroListDTO[]> {
        const livros = await this.livroDAO.listarTodosLivros();
        return livros;
    }

    public async atualizarLivro(id: string, livroDto: LivroCreateDTO): Promise<Livro | null> {
        const livroExistente = await this.livroDAO.buscarLivroPorId(id);
        if (!livroExistente) {
            return null;
        }
        const livroAtualizado = Livro.reconstruir({ id, titulo: livroDto.titulo, autor: livroDto.autor, ano: livroDto.ano })
        await this.livroDAO.atualizarLivro(livroAtualizado);
        return livroAtualizado;
    }

    public async excluirLivro(id: string): Promise<boolean> {
        const sucesso = await this.livroDAO.excluirLivro(id);
        return sucesso;
    }

    public async calcularMediaPorTitulo(titulo: string): Promise<number | null> {
        const media = await this.avaliacaoDAO.calcularMediaPorTitulo(titulo);
        return media ?? null;
    }
}