"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioDAO = void 0;
const usuario_1 = require("../modelo/usuario");
const conexao_1 = require("../util/conexao");
class usuarioDAO {
    async criarUsuario(usuario) {
        try {
            const result = await (0, conexao_1.sql)('INSERT INTO usuario (id, email, senha) VALUES ($1, $2, $3) RETURNING *', [usuario.id, usuario.email, usuario.senha]);
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário');
        }
    }
    async buscarUsuarioPorId(id) {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM usuario WHERE id = $1', [id]);
            if (rows.length === 0) {
                return null;
            }
            const usuario = usuario_1.Usuario.reconstruir(rows[0]);
            return usuario;
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new Error('Erro ao buscar usuário');
        }
    }
    async atualizarUsuario(id, usuario) {
        try {
            await (0, conexao_1.sql)('UPDATE usuario SET email = $1, senha = $2 WHERE id = $3', [usuario.email, usuario.senha, id]);
        }
        catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw new Error('Erro ao atualizar usuário');
        }
    }
    async listarTodosUsuarios() {
        try {
            const rows = await (0, conexao_1.sql)('SELECT * FROM usuario');
            return rows.map((row) => ({ id: row.id, email: row.email }));
        }
        catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw new Error('Erro ao listar usuários');
        }
    }
    async deletarUsuario(id) {
        try {
            await (0, conexao_1.sql)('DELETE FROM usuario WHERE id = $1', [id]);
        }
        catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw new Error('Erro ao deletar usuário');
        }
    }
    async buscarPorLogin(email, senha) {
        try {
            const usuario = await (0, conexao_1.sql)('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [email, senha]);
            if (usuario.length === 0) {
                return null;
            }
            return usuario_1.Usuario.reconstruir(usuario[0]);
        }
        catch (error) {
            console.error('Erro ao buscar usuário por login:', error);
            throw new Error('Erro ao buscar usuário por login');
        }
    }
}
exports.usuarioDAO = usuarioDAO;
