"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avaliacao_dao_1 = require("../dao/avaliacao.dao");
const avaliacao_service_1 = require("../service/avaliacao.service");
const avaliacao_controle_1 = require("../controller/avaliacao.controle");
const auth_middleware_1 = require("../middleware/auth.middleware");
const avaliacaoRoutes = (0, express_1.Router)();
const avaliacaoControle = new avaliacao_controle_1.AvaliacaoControle(new avaliacao_service_1.AvaliacaoService(new avaliacao_dao_1.AvaliacaoDAO()));
avaliacaoRoutes
    .route('/')
    .post(auth_middleware_1.autenticar, async (req, res) => avaliacaoControle.criarAvaliacao(req, res));
avaliacaoRoutes
    .route('/livro/:id')
    .get(async (req, res) => avaliacaoControle.buscarAvaliacoesPorLivroId(req, res));
avaliacaoRoutes
    .route('/:id')
    .put(auth_middleware_1.autenticar, async (req, res) => avaliacaoControle.atualizarAvaliacao(req, res))
    .delete(auth_middleware_1.autenticar, async (req, res) => avaliacaoControle.deletarAvaliacao(req, res));
exports.default = avaliacaoRoutes;
