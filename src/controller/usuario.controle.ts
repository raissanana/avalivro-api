import { plainToInstance } from "class-transformer";
import type { Request, Response } from "express";
import { usuarioCreateDTO } from "../dto/usuario.dto.js";
import { validate } from "class-validator";
import { usuarioService } from "../service/usuario.service.js";

export class UsuarioControle {
    private usuarioService: usuarioService;

    public constructor(usuarioService: usuarioService) {
        this.usuarioService = usuarioService;
    }

    public async criarUsuario(req: Request, res: Response) {
        try {
            const usuarioDto = plainToInstance(usuarioCreateDTO, req.body);

            const errors = await validate(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            await this.usuarioService.criarUsuario(usuarioDto);
            res.status(201).json({ message: 'Usuário criado com sucesso', usuarioDto });
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
            const sucesso = await this.usuarioService.atualizarUsuario(id.toString(), usuarioDto);
            if (!sucesso) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json({ message: 'Usuário atualizado com sucesso', usuarioDto });
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
            const usuario = await this.usuarioService.buscarUsuarioPorId(id.toString());
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
            const usuarios = await this.usuarioService.listarTodosUsuarios();
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
            const sucesso = await this.usuarioService.deletarUsuario(id.toString());
            if (!sucesso) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
}