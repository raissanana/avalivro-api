"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avaliacao = void 0;
class Avaliacao {
    constructor(props) {
        this.props = props;
    }
    static construir(livroId, avaliacao, comentario) {
        if (!livroId || !avaliacao || !comentario) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof avaliacao !== 'number' || avaliacao < 0 || avaliacao > 5) {
            throw new Error('Avaliação deve ser um número entre 0 e 5');
        }
        const id = crypto.randomUUID().toString();
        const props = {
            id,
            livroId,
            avaliacao,
            comentario
        };
        return new Avaliacao(props);
    }
    static reconstruir(props) {
        return new Avaliacao(props);
    }
    get id() {
        return this.props.id;
    }
    get livroId() {
        return this.props.livroId;
    }
    get avaliacao() {
        return this.props.avaliacao;
    }
    get comentario() {
        return this.props.comentario;
    }
}
exports.Avaliacao = Avaliacao;
