import { Router } from 'express';
import livroRoutes from './livro.routes';
import avaliacaoRoutes from './avaliacao.routes';
import usuarioRoutes from './usuario.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/livros', livroRoutes);
routes.use('/avaliacoes', avaliacaoRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use(authRoutes);

export default routes;
