import 'reflect-metadata';
import express, { type Request, type Response, Router} from 'express';
import dotenv from 'dotenv';
import { Livro } from './modelo/livro';
import { Avaliacao } from './modelo/avaliacao';
import { sql } from './util/conexao';
import { LivroControle } from './controller/livro.controle';
import { AvaliacaoControle } from './controller/avaliacao.controle';
import { AuthController } from './controller/authController.controle';
import { UsuarioControle } from './controller/usuario.controle';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/livros', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.criarLivro(req, res);
});

// Rotas estáticas ANTES das rotas com parâmetros dinâmicos (:id)
app.get('/livros', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.listarTodosLivros(req, res);
});

app.get('/livros/autor/:autor', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarLivrosporAutor(req, res);
});

app.get('/livros/:id', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarLivroPorId(req, res);
});

app.get('/livros/:id/avaliacoes', async (req, res) => {
    const livroControle = new LivroControle();
    await livroControle.buscarAvaliacoesPorLivroId(req, res);
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

app.post ('/usuarios', async (req, res) => {
    const usuarioControle = new UsuarioControle();
    await usuarioControle.criarUsuario(req, res);
});

app.put('/usuarios/:id', async (req, res) => {
    const usuarioControle = new UsuarioControle();
    await usuarioControle.atualizarUsuario(req, res);
});

app.get('/usuarios/:id', async (req, res) => {
    const usuarioControle = new UsuarioControle();
    await usuarioControle.buscarUsuarioPorId(req, res);
});

app.get('/usuarios', async (req, res) => {
    const usuarioControle = new UsuarioControle();
    await usuarioControle.listarTodosUsuarios(req, res);
});

app.delete('/usuarios/:id', async (req, res) => {
    const usuarioControle = new UsuarioControle();
    await usuarioControle.deletarUsuario(req, res);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
