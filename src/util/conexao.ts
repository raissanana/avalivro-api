import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não definida');
}

const pool = mysql.createPool(process.env.DATABASE_URL);

export async function sql(query: string, params: any[] = []) {
    const [rows] = await pool.execute(query, params);
    return rows;
}