import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { globalErrorHandler } from './middleware/globalErrorHandler';

dotenv.config();

const app = express();

app.use(express.json());

// Mantém a arquitetura centralizada das rotas
app.use(routes);

// Middleware global de tratamento de erros
app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
