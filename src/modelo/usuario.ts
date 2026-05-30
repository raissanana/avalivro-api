import crypto from 'crypto';

export type propsUsuario = {
    id: string,
    email: string,
    senha: string
}


export class Usuario {
    private constructor(
        private props: propsUsuario
    ) {
    }

    public static construir(
        email: string,
        senha: string
    ) {
        if (!email || !senha) {
            throw new Error('Todos os campos são obrigatórios');
        }
        const id = crypto.randomUUID().toString();

        const props: propsUsuario = {
            id,
            email,
            senha
        }

        return new Usuario(props);
    }
    public static reconstruir(
        props: propsUsuario
    ) {
        return new Usuario(props);
    }
    public get id() {
        return this.props.id;
    }
    public get email() {
        return this.props.email;
    }
    public get senha() {
        return this.props.senha;
    }
}