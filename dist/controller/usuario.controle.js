"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioControle = void 0;
const class_transformer_1 = require("class-transformer");
const usuario_dao_js_1 = require("../dao/usuario.dao.js");
const usuario_js_1 = require("../modelo/usuario.js");
const usuario_dto_js_1 = require("../dto/usuario.dto.js");
const class_validator_1 = require("class-validator");
class UsuarioControle {
    constructor() {
        this.usuarioDAO = new usuario_dao_js_1.usuarioDAO();
    }
    async criarUsuario(req, res) {
        try {
            const usuarioDto = (0, class_transformer_1.plainToInstance)(usuario_dto_js_1.usuarioCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = usuario_js_1.Usuario.construir(usuarioDto.email, usuarioDto.senha);
            await this.usuarioDAO.criarUsuario(usuario);
            res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
    async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const usuarioDto = (0, class_transformer_1.plainToInstance)(usuario_dto_js_1.usuarioCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = usuario_js_1.Usuario.construir(usuarioDto.email, usuarioDto.senha);
            await this.usuarioDAO.atualizarUsuario(id.toString(), usuario);
            res.json({ message: 'Usuário atualizado com sucesso', usuario });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }
    async buscarUsuarioPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const usuario = await this.usuarioDAO.buscarUsuarioPorId(id.toString());
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json(usuario);
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }
    async listarTodosUsuarios(req, res) {
        try {
            const usuarios = await this.usuarioDAO.listarTodosUsuarios();
            res.json(usuarios);
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }
    async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            await this.usuarioDAO.deletarUsuario(id.toString());
            res.json({ message: 'Usuário deletado com sucesso' });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
}
exports.UsuarioControle = UsuarioControle;
