"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_dao_1 = require("../dao/usuario.dao");
const authController_service_1 = require("../service/authController.service");
const authController_controle_1 = require("../controller/authController.controle");
const authRoutes = (0, express_1.Router)();
const authController = new authController_controle_1.AuthController(new authController_service_1.AuthService(new usuario_dao_1.usuarioDAO()));
authRoutes
    .route('/login')
    .post(async (req, res) => authController.login(req, res));
exports.default = authRoutes;
