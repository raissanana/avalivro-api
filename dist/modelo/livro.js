"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Livro {
    constructor(props) {
        this.props = props;
    }
    static construir(titulo, autor, ano) {
        if (!titulo || !autor || !ano) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof ano !== 'number' || ano <= 0) {
            throw new Error('Ano deve ser um número positivo');
        }
        const id = crypto_1.default.randomUUID().toString();
        const props = {
            id,
            titulo,
            autor,
            ano
        };
        return new Livro(props);
    }
    static reconstruir(props) {
        return new Livro(props);
    }
    definirAvaliacaoMedia(avaliacaoMedia) {
        if (typeof avaliacaoMedia !== 'number' || avaliacaoMedia < 0 || avaliacaoMedia > 5) {
            throw new Error('Avaliação média deve ser um número entre 0 e 5');
        }
        this.props.avaliacaoMedia = avaliacaoMedia;
    }
    get id() {
        return this.props.id;
    }
    get titulo() {
        return this.props.titulo;
    }
    get autor() {
        return this.props.autor;
    }
    get ano() {
        return this.props.ano;
    }
    get avaliacaoMedia() {
        return this.props.avaliacaoMedia;
    }
}
exports.Livro = Livro;
