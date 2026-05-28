export type propsAvaliacao = {
    id: string,
    livroId: string,
    avaliacao: number,
    comentario?: string | null
}

export class Avaliacao {
    private constructor(
        private props: propsAvaliacao
    ){     
    }

    public static construir(
        livroId: string,
        avaliacao: number,
        comentario?: string
    ) {
        if (!livroId || !avaliacao) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof avaliacao !== 'number' || avaliacao < 0 || avaliacao > 5) {
            throw new Error('Avaliação deve ser um número entre 0 e 5');
        }
        const id = crypto.randomUUID().toString();

        const props: propsAvaliacao = {
            id,
            livroId,
            avaliacao,
            comentario: comentario ?? null
        }
        return new Avaliacao(props);
    }

    public static reconstruir(
        props: propsAvaliacao
    ) {
        return new Avaliacao(props);
    }

    public get id() {
        return this.props.id;
    }
    public get livroId() {
        return this.props.livroId;
    }
    public get avaliacao() {
        return this.props.avaliacao;
    }
    public get comentario() {
        return this.props.comentario;
    }
}
