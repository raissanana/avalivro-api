"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mantém a arquitetura centralizada das rotas
app.use(routes_1.default);
// Middleware global de tratamento de erros
app.use(globalErrorHandler_1.globalErrorHandler);
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
