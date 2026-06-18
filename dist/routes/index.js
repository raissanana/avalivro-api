"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livro_routes_1 = __importDefault(require("./livro.routes"));
const avaliacao_routes_1 = __importDefault(require("./avaliacao.routes"));
const usuario_routes_1 = __importDefault(require("./usuario.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = (0, express_1.Router)();
routes.use('/livros', livro_routes_1.default);
routes.use('/avaliacoes', avaliacao_routes_1.default);
routes.use('/usuarios', usuario_routes_1.default);
routes.use(auth_routes_1.default);
exports.default = routes;
