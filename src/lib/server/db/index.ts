import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

let databaseUrl = 'postgresql://root:mypassword@127.0.0.1:5432/personal_web';
if (env.NODE_ENV === 'production') {
	databaseUrl = env.DATABASE_URL;
}

const client = postgres(databaseUrl, {
	max: 10, // Max connections
	idle_timeout: 20, // Close idle connections after 20s
	connect_timeout: 10, // Timeout connecting after 10s
	max_lifetime: 60 * 30, // Close connections after 30 min
	onnotice: () => {} // Suppress notices
});

export const db = drizzle(client, { schema });
