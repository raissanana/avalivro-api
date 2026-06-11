import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());

// Usar o roteador central
app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
