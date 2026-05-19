import express, { type Request, type Response} from 'express';
import dotenv from 'dotenv';
import { Livro } from './modelo/livro';
import { Avaliacao } from './modelo/avaliacao';
import { sql } from './util/conexao';
import { LivroControle } from './controller/livro.controle';
import { AvaliacaoControle } from './controller/avaliacao.controle';
import { AuthController } from './controller/authController.controle';
import 'reflect-metadata';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/livros', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.criarLivro(req, res);
});

app.get('/livros/:id', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarLivroPorId(req, res);
});

app.get('/livros', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.listarTodosLivros(req, res);
});

app.get('/livros/:id/avaliacoes', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarAvaliacoesPorLivroId(req, res);
});

app.get('/livros/autor/:autor', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarLivrosporAutor(req, res);
});

app.put('/livros/:id', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.atualizarLivro(req, res);
});

app.delete('/livros/:id', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.excluirLivro(req, res);
});


//avaliacoes crud


app.post('/avaliacoes', async (req, res) => {
    const avaliacaoControle = new AvaliacaoControle();
    await avaliacaoControle.criarAvaliacao(req, res);
});

app.put('/avaliacoes/:id', async (req, res) => {
    const avaliacaoControle = new AvaliacaoControle();
    await avaliacaoControle.atualizarAvaliacao(req, res);
});

app.delete('/avaliacoes/:id', async (req, res) => {
    const avaliacaoControle = new AvaliacaoControle();
    await avaliacaoControle.deletarAvaliacao(req, res);
});

app.post('/login', async (req, res) => {
    const authController = new AuthController();
    await authController.login(req, res);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
