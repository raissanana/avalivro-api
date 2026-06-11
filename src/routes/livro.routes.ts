import { Router } from 'express';
import { LivroDAO } from '../dao/livro.dao';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { LivroService } from '../service/livro.service';
import { LivroControle } from '../controller/livro.controle';

const livroRoutes = Router();

const livroControle = new LivroControle(
  new LivroService(new LivroDAO(), new AvaliacaoDAO())
);

livroRoutes
  .route('/')
  .get(async (req, res) => livroControle.listarTodosLivros(req, res))
  .post(async (req, res) => livroControle.criarLivro(req, res));

livroRoutes.get('/autor/:autor', async (req, res) => {
  await livroControle.buscarLivrosporAutor(req, res);
});

livroRoutes.get('/:id/avaliacoes', async (req, res) => {
  await livroControle.buscarAvaliacoesPorLivroId(req, res);
});

livroRoutes
  .route('/:id')
  .get(async (req, res) => livroControle.buscarLivroPorId(req, res))
  .put(async (req, res) => livroControle.atualizarLivro(req, res))
  .delete(async (req, res) => livroControle.excluirLivro(req, res));

export default livroRoutes;
