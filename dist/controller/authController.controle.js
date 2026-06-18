"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const login_dto_1 = require("../dto/login.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const loginDto = (0, class_transformer_1.plainToInstance)(login_dto_1.LoginDTO, req.body);
            const errors = await (0, class_validator_1.validate)(loginDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = await this.authService.login(loginDto);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET || 'secret_temporario_para_desenvolvimento', { expiresIn: '8h' });
            res.json({ message: 'Login bem-sucedido', token, usuario });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}
exports.AuthController = AuthController;
