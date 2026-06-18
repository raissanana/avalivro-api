"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livro_dao_1 = require("../dao/livro.dao");
const avaliacao_dao_1 = require("../dao/avaliacao.dao");
const livro_service_1 = require("../service/livro.service");
const livro_controle_1 = require("../controller/livro.controle");
const auth_middleware_1 = require("../middleware/auth.middleware");
const livroRoutes = (0, express_1.Router)();
const livroControle = new livro_controle_1.LivroControle(new livro_service_1.LivroService(new livro_dao_1.LivroDAO(), new avaliacao_dao_1.AvaliacaoDAO()));
livroRoutes
    .route('/')
    .get(auth_middleware_1.autenticar, async (req, res) => livroControle.listarTodosLivros(req, res))
    .post(auth_middleware_1.autenticar, async (req, res) => livroControle.criarLivro(req, res));
livroRoutes.get('/autor/:autor', async (req, res) => {
    await livroControle.buscarLivrosporAutor(req, res);
});
livroRoutes.get('/:id/avaliacoes', async (req, res) => {
    await livroControle.buscarAvaliacoesPorLivroId(req, res);
});
livroRoutes
    .route('/:id')
    .get(async (req, res) => livroControle.buscarLivroPorId(req, res))
    .put(auth_middleware_1.autenticar, async (req, res) => livroControle.atualizarLivro(req, res))
    .delete(auth_middleware_1.autenticar, async (req, res) => livroControle.excluirLivro(req, res));
exports.default = livroRoutes;
