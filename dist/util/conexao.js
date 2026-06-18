"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = sql;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não definida');
}
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});
pool.on('error', (err) => {
    console.error('Erro inesperado no cliente do pool do banco:', err);
});
function convertPlaceholders(query) {
    let index = 0;
    return query.replace(/\?/g, () => {
        index += 1;
        return `$${index}`;
    });
}
async function sql(query, params = []) {
    const client = await pool.connect();
    try {
        const defaultUserId = process.env.DEFAULT_DB_USER_ID;
        if (defaultUserId) {
            await client.query(`SELECT set_config('app.current_user', $1, false)`, [defaultUserId]);
        }
        else {
            console.warn('Aviso: DEFAULT_DB_USER_ID não foi configurada. Triggers de banco podem falhar.');
        }
        const formattedQuery = convertPlaceholders(query);
        const result = await client.query(formattedQuery, params);
        return result.rows;
    }
    finally {
        client.release();
    }
}
