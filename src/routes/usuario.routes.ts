import { Router } from 'express';
import { usuarioDAO } from '../dao/usuario.dao';
import { usuarioService } from '../service/usuario.service';
import { UsuarioControle } from '../controller/usuario.controle';

const usuarioRoutes = Router();

const usuarioControle = new UsuarioControle(
  new usuarioService(new usuarioDAO())
);

usuarioRoutes
  .route('/')
  .get(async (req, res) => usuarioControle.listarTodosUsuarios(req, res))
  .post(async (req, res) => usuarioControle.criarUsuario(req, res));

usuarioRoutes
  .route('/:id')
  .get(async (req, res) => usuarioControle.buscarUsuarioPorId(req, res))
  .put(async (req, res) => usuarioControle.atualizarUsuario(req, res))
  .delete(async (req, res) => usuarioControle.deletarUsuario(req, res));

export default usuarioRoutes;
