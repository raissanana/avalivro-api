import { Router } from 'express';
import { LivroDAO } from '../dao/livro.dao';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { LivroService } from '../service/livro.service';
import { LivroControle } from '../controller/livro.controle';
import { autenticar } from '../middleware/auth.middleware';

const livroRoutes = Router();

const livroControle = new LivroControle(
  new LivroService(new LivroDAO(), new AvaliacaoDAO())
);

livroRoutes
  .route('/')
  .get(autenticar, async (req, res) => livroControle.listarTodosLivros(req, res))
  .post(autenticar, async (req, res) => livroControle.criarLivro(req, res));

livroRoutes.get('/autor/:autor', async (req, res) => {
  await livroControle.buscarLivrosporAutor(req, res);
});

livroRoutes.get('/:id/avaliacoes', async (req, res) => {
  await livroControle.buscarAvaliacoesPorLivroId(req, res);
});

livroRoutes
  .route('/:id')
  .get(async (req, res) => livroControle.buscarLivroPorId(req, res))
  .put(autenticar, async (req, res) => livroControle.atualizarLivro(req, res))
  .delete(autenticar, async (req, res) => livroControle.excluirLivro(req, res));

export default livroRoutes;
