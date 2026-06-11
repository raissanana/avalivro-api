import { Router } from 'express';
import { usuarioDAO } from '../dao/usuario.dao';
import { AuthService } from '../service/authController.service';
import { AuthController } from '../controller/authController.controle';

const authRoutes = Router();

const authController = new AuthController(
  new AuthService(new usuarioDAO())
);

authRoutes
  .route('/login')
  .post(async (req, res) => authController.login(req, res));

export default authRoutes;
