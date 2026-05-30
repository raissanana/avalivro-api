import type { Request, Response } from "express";
import { LoginDTO } from "../dto/login.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AuthService } from "../service/authController.service";

export class AuthController {
    private authService: AuthService;
    
    public constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async login(req: Request, res: Response) {
        try {
            const loginDto = plainToInstance(LoginDTO, req.body);
            const errors = await validate(loginDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.toString()) });
            }
            
            const usuario = await this.authService.login(loginDto);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            res.json({ message: 'Login bem-sucedido', usuario });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}
