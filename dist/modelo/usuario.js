"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Usuario {
    constructor(props) {
        this.props = props;
    }
    static construir(email, senha) {
        if (!email || !senha) {
            throw new Error('Todos os campos são obrigatórios');
        }
        const id = crypto_1.default.randomUUID().toString();
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
