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
  .get((req, res, next) => usuarioControle.listarTodosUsuarios(req, res, next))
  .post((req, res, next) => usuarioControle.criarUsuario(req, res, next));

usuarioRoutes
  .route('/:id')
  .get((req, res, next) => usuarioControle.buscarUsuarioPorId(req, res, next))
  .put((req, res, next) => usuarioControle.atualizarUsuario(req, res, next))
  .delete((req, res, next) => usuarioControle.deletarUsuario(req, res, next));

export default usuarioRoutes;
