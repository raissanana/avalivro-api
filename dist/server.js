"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const livro_controle_1 = require("./controller/livro.controle");
const avaliacao_controle_1 = require("./controller/avaliacao.controle");
const authController_controle_1 = require("./controller/authController.controle");
const usuario_controle_1 = require("./controller/usuario.controle");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/livros', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.criarLivro(req, res);
});
app.get('/livros/:id', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.buscarLivroPorId(req, res);
});
app.get('/livros', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.listarTodosLivros(req, res);
});
app.get('/livros/:id/avaliacoes', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.buscarAvaliacoesPorLivroId(req, res);
});
app.get('/livros/autor/:autor', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.buscarLivrosporAutor(req, res);
});
app.put('/livros/:id', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.atualizarLivro(req, res);
});
app.delete('/livros/:id', async (req, res) => {
    const livroControle = new livro_controle_1.LivroControle();
    await livroControle.excluirLivro(req, res);
});
//avaliacoes crud
app.post('/avaliacoes', async (req, res) => {
    const avaliacaoControle = new avaliacao_controle_1.AvaliacaoControle();
    await avaliacaoControle.criarAvaliacao(req, res);
});
app.put('/avaliacoes/:id', async (req, res) => {
    const avaliacaoControle = new avaliacao_controle_1.AvaliacaoControle();
    await avaliacaoControle.atualizarAvaliacao(req, res);
});
app.delete('/avaliacoes/:id', async (req, res) => {
    const avaliacaoControle = new avaliacao_controle_1.AvaliacaoControle();
    await avaliacaoControle.deletarAvaliacao(req, res);
});
app.post('/login', async (req, res) => {
    const authController = new authController_controle_1.AuthController();
    await authController.login(req, res);
});
app.post('/usuarios', async (req, res) => {
    const usuarioControle = new usuario_controle_1.UsuarioControle();
    await usuarioControle.criarUsuario(req, res);
});
app.put('/usuarios/:id', async (req, res) => {
    const usuarioControle = new usuario_controle_1.UsuarioControle();
    await usuarioControle.atualizarUsuario(req, res);
});
app.get('/usuarios/:id', async (req, res) => {
    const usuarioControle = new usuario_controle_1.UsuarioControle();
    await usuarioControle.buscarUsuarioPorId(req, res);
});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
