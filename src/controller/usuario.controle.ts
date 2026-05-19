import { plainToInstance } from "class-transformer";
import { usuarioDAO } from "../dao/usuario.dao.js";
import { Usuario } from "../modelo/usuario.js";
import type { Request, Response } from "express";
import { usuarioCreateDTO } from "../dto/usuario.dto.js";
import { validate } from "class-validator";

export class UsuarioControle {
    private usuarioDAO: usuarioDAO;

    constructor() {
        this.usuarioDAO = new usuarioDAO();
    }

    public async criarUsuario(req: Request, res: Response) {
        try {
            const usuarioDto = plainToInstance(usuarioCreateDTO, req.body);

            const errors = await validate(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            const usuario = Usuario.construir(usuarioDto.email, usuarioDto.senha);
            await this.usuarioDAO.criarUsuario(usuario);
            res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }

    public async atualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const usuarioDto = plainToInstance(usuarioCreateDTO, req.body);

            const errors = await validate(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = Usuario.construir(usuarioDto.email, usuarioDto.senha);
            await this.usuarioDAO.atualizarUsuario(id.toString(), usuario);
            res.json({ message: 'Usuário atualizado com sucesso', usuario });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    public async buscarUsuarioPorId(req: Request, res: Response) {
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
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    public async listarTodosUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.usuarioDAO.listarTodosUsuarios();
            res.json(usuarios);
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }
    
    public async deletarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            await this.usuarioDAO.deletarUsuario(id.toString());
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
}