"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }
    async login(loginDto) {
        const usuario = await this.usuarioDAO.buscarPorLogin(loginDto.email, loginDto.senha);
        return usuario;
    }
}
exports.AuthService = AuthService;
