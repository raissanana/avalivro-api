"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const usuario_dao_1 = require("../dao/usuario.dao");
const login_dto_1 = require("../dto/login.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AuthController {
    constructor() {
        this.usuarioDAO = new usuario_dao_1.usuarioDAO();
    }
    async login(req, res) {
        try {
            const loginDto = (0, class_transformer_1.plainToInstance)(login_dto_1.LoginDTO, req.body);
            const errors = await (0, class_validator_1.validate)(loginDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = await this.usuarioDAO.buscarPorLogin(loginDto.email, loginDto.senha);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            res.json({ message: 'Login bem-sucedido', usuario });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}
exports.AuthController = AuthController;
