import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definida');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente do pool do banco:', err);
});


function convertPlaceholders(query: string) {
  let index = 0;

  return query.replace(/\?/g, () => {
    index += 1;
    return `$${index}`;
  });
}

export async function sql(query: string, params: any[] = []) {
  const client = await pool.connect();

  try {
    const defaultUserId = process.env.DEFAULT_DB_USER_ID;
    if (defaultUserId) {
      await client.query(`SELECT set_config('app.current_user', $1, false)`, [defaultUserId]);
    } else {
      console.warn('Aviso: DEFAULT_DB_USER_ID não foi configurada. Triggers de banco podem falhar.');
    }

    const formattedQuery = convertPlaceholders(query);

    const result = await client.query(formattedQuery, params);

    return result.rows;
  } finally {
    client.release();
  }
}