"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(props) {
        this.props = props;
    }
    static construir(email, senha) {
        if (!email || !senha) {
            throw new Error('Todos os campos são obrigatórios');
        }
        const id = crypto.randomUUID().toString();
        const props = {
            id,
            email,
            senha
        };
        return new Usuario(props);
    }
    static reconstruir(props) {
        return new Usuario(props);
    }
    get id() {
        return this.props.id;
    }
    get email() {
        return this.props.email;
    }
    get senha() {
        return this.props.senha;
    }
}
exports.Usuario = Usuario;
