import { Router } from 'express';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { AvaliacaoService } from '../service/avaliacao.service';
import { AvaliacaoControle } from '../controller/avaliacao.controle';
import { autenticar } from '../middleware/auth.middleware';

const avaliacaoRoutes = Router();

const avaliacaoControle = new AvaliacaoControle(
  new AvaliacaoService(new AvaliacaoDAO())
);

avaliacaoRoutes
  .route('/')
  .post(autenticar, async (req, res) => avaliacaoControle.criarAvaliacao(req, res));

avaliacaoRoutes
  .route('/livro/:id')
  .get(async (req, res) => avaliacaoControle.buscarAvaliacoesPorLivroId(req, res));

avaliacaoRoutes
  .route('/:id')
  .put(autenticar, async (req, res) => avaliacaoControle.atualizarAvaliacao(req, res))
  .delete(autenticar, async (req, res) => avaliacaoControle.deletarAvaliacao(req, res));

export default avaliacaoRoutes;
