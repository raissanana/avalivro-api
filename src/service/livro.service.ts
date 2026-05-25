
const Media = await this.avaliacaoDAO.calcularMediaPorTitulo(livro.titulo);
        livro.definirAvaliacaoMedia(Media ?? 0);