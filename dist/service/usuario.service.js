"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioService = void 0;
const usuario_1 = require("../modelo/usuario");
const EmailAlreadyExistsError_1 = require("../errors/EmailAlreadyExistsError");
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
class usuarioService {
    constructor(usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }
    async criarUsuario(usuarioDto) {
        const usuarioExistente = await this.usuarioDAO.buscarPorEmail(usuarioDto.email);
        if (usuarioExistente) {
            throw new EmailAlreadyExistsError_1.EmailAlreadyExistsError();
        }
        const usuario = usuario_1.Usuario.construir(usuarioDto.email, usuarioDto.senha);
        await this.usuarioDAO.criarUsuario(usuario);
        return usuario;
    }
    async atualizarUsuario(id, usuarioDto) {
        const usuarioExistente = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        const usuarioAtualizado = usuario_1.Usuario.reconstruir({ id, email: usuarioDto.email, senha: usuarioDto.senha });
        await this.usuarioDAO.atualizarUsuario(id, usuarioAtualizado);
        return usuarioAtualizado;
    }
    async buscarUsuarioPorId(id) {
        const usuario = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuario) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        return usuario;
    }
    async listarTodosUsuarios() {
        const usuarios = await this.usuarioDAO.listarTodosUsuarios();
        return usuarios;
    }
    async deletarUsuario(id) {
        const usuarioExistente = await this.usuarioDAO.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        await this.usuarioDAO.deletarUsuario(id);
    }
}
exports.usuarioService = usuarioService;
