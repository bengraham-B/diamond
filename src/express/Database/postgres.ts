import { Pool, PoolClient } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export async function verifyConnection(): Promise<void> {

	try {
			
		//X Attempt to acquire a client from the pool
		const client: PoolClient = await pool.connect();
		console.log('✅ Connected to PostgreSQL database');
		client.release(); // Release the client back to the pool
	} catch (error) {
		console.error('❌ Error connecting to the database:', error);
	}
  }
  
// Immediately verify connection upon module load.
verifyConnection();

export default pool;