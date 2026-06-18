import { plainToInstance } from "class-transformer";
import type { Request, Response, NextFunction } from "express";
import { usuarioCreateDTO } from "../dto/usuario.dto.js";
import { validate } from "class-validator";
import { usuarioService } from "../service/usuario.service.js";

export class UsuarioControle {
    private usuarioService: usuarioService;

    public constructor(usuarioService: usuarioService) {
        this.usuarioService = usuarioService;
    }

    public async criarUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarioDto = plainToInstance(usuarioCreateDTO, req.body);

            const errors = await validate(usuarioDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }

            await this.usuarioService.criarUsuario(usuarioDto);
            res.status(201).json({ message: 'Usuário criado com sucesso', usuarioDto });
        } catch (erro) {
            next(erro);
        }
    }

    public async atualizarUsuario(req: Request, res: Response, next: NextFunction) {
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
            await this.usuarioService.atualizarUsuario(id.toString(), usuarioDto);
            res.json({ message: 'Usuário atualizado com sucesso', usuarioDto });
        } catch (erro) {
            next(erro);
        }
    }

    public async buscarUsuarioPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            const usuario = await this.usuarioService.buscarUsuarioPorId(id.toString());
            res.json(usuario);
        } catch (erro) {
            next(erro);
        }
    }

    public async listarTodosUsuarios(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await this.usuarioService.listarTodosUsuarios();
            res.json(usuarios);
        } catch (erro) {
            next(erro);
        }
    }

    public async deletarUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório' });
            }
            await this.usuarioService.deletarUsuario(id.toString());
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (erro) {
            next(erro);
        }
    }
}