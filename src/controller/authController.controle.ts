import type { Request, Response } from "express";
import { usuarioDAO } from "../dao/usuario.dao";
import { LoginDTO } from "../dto/login.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export class AuthController {
    private usuarioDAO: usuarioDAO;
    constructor() {
        this.usuarioDAO = new usuarioDAO();
    }

    public async login(req: Request, res: Response) {
        try {
            const loginDto = plainToInstance(LoginDTO, req.body);
            const errors = await validate(loginDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            const usuario = await this.usuarioDAO.buscarPorLogin(loginDto.email, loginDto.senha);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            res.json({ message: 'Login bem-sucedido', usuario });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}
