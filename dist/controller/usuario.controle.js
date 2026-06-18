"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioControle = void 0;
const class_transformer_1 = require("class-transformer");
const usuario_dto_js_1 = require("../dto/usuario.dto.js");
const class_validator_1 = require("class-validator");
class UsuarioControle {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async criarUsuario(req, res, next) {
        try {
            const usuarioDto = (0, class_transformer_1.plainToInstance)(usuario_dto_js_1.usuarioCreateDTO, req.body);
            const errors = await (0, class_validator_1.validate)(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            await this.usuarioService.criarUsuario(usuarioDto);
            res.status(201).json({ message: 'Usuário criado com sucesso', usuarioDto });
        }
        catch (erro) {
            next(erro);
        }
    }
    async atualizarUsuario(req, res, next) {
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
            await this.usuarioService.atualizarUsuario(id.toString(), usuarioDto);
            res.json({ message: 'Usuário atualizado com sucesso', usuarioDto });
        }
        catch (erro) {
            next(erro);
        }
    }
    async buscarUsuarioPorId(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const usuario = await this.usuarioService.buscarUsuarioPorId(id.toString());
            res.json(usuario);
        }
        catch (erro) {
            next(erro);
        }
    }
    async listarTodosUsuarios(req, res, next) {
        try {
            const usuarios = await this.usuarioService.listarTodosUsuarios();
            res.json(usuarios);
        }
        catch (erro) {
            next(erro);
        }
    }
    async deletarUsuario(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            await this.usuarioService.deletarUsuario(id.toString());
            res.json({ message: 'Usuário deletado com sucesso' });
        }
        catch (erro) {
            next(erro);
        }
    }
}
exports.UsuarioControle = UsuarioControle;
