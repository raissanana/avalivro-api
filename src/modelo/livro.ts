export type propsLivro ={
    id: string,
    titulo: string,
    autor: string,
    ano: number,
    avaliacaoMedia?: number
}

export class Livro {
    private constructor(
        private props: propsLivro
    ){
    }

    public static construir(
        titulo:string,
        autor:string,
        ano: number
    ) {
        if (!titulo || !autor || !ano) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof ano !== 'number' || ano <= 0) {
            throw new Error('Ano deve ser um número positivo');
        }

        const id = crypto.randomUUID().toString();

        const props: propsLivro = {
            id,
            titulo,
            autor,
            ano
        }

        return new Livro(props);

    }

    public static reconstruir(
        props: propsLivro
    ) {
        return new Livro(props);
    }

    public definirAvaliacaoMedia(avaliacaoMedia: number) {
        if (typeof avaliacaoMedia !== 'number' || avaliacaoMedia < 0 || avaliacaoMedia > 5) {
            throw new Error('Avaliação média deve ser um número entre 0 e 5');
        }
        this.props.avaliacaoMedia = avaliacaoMedia;
    }

    public get id() {
        return this.props.id;
    }
    public get titulo() {
        return this.props.titulo;
    }

    public get autor() {
        return this.props.autor;
    }

    public get ano() {
        return this.props.ano;
    }

    public get avaliacaoMedia() {
        return this.props.avaliacaoMedia;
    }
    
}

