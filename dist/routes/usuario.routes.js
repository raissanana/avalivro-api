"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_dao_1 = require("../dao/usuario.dao");
const usuario_service_1 = require("../service/usuario.service");
const usuario_controle_1 = require("../controller/usuario.controle");
const usuarioRoutes = (0, express_1.Router)();
const usuarioControle = new usuario_controle_1.UsuarioControle(new usuario_service_1.usuarioService(new usuario_dao_1.usuarioDAO()));
usuarioRoutes
    .route('/')
    .get((req, res, next) => usuarioControle.listarTodosUsuarios(req, res, next))
    .post((req, res, next) => usuarioControle.criarUsuario(req, res, next));
usuarioRoutes
    .route('/:id')
    .get((req, res, next) => usuarioControle.buscarUsuarioPorId(req, res, next))
    .put((req, res, next) => usuarioControle.atualizarUsuario(req, res, next))
    .delete((req, res, next) => usuarioControle.deletarUsuario(req, res, next));
exports.default = usuarioRoutes;
