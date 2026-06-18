"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avaliacao = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Avaliacao {
    constructor(props) {
        this.props = props;
    }
    static construir(livroId, avaliacao, comentario) {
        if (!livroId || !avaliacao) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof avaliacao !== 'number' || avaliacao < 0 || avaliacao > 5) {
            throw new Error('Avaliação deve ser um número entre 0 e 5');
        }
        const id = crypto_1.default.randomUUID().toString();
        const props = {
            id,
            livroId,
            avaliacao,
            comentario: comentario ?? null
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
