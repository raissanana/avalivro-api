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
    const formattedQuery = convertPlaceholders(query);

    const result = await client.query(formattedQuery, params);

    return result.rows;
  } finally {
    client.release();
  }
}