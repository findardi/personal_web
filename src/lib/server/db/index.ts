import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL, {
	max: 10, // Max connections
	idle_timeout: 20, // Close idle connections after 20s
	connect_timeout: 10, // Timeout connecting after 10s
	max_lifetime: 60 * 30, // Close connections after 30 min
	onnotice: () => {} // Suppress notices
});

export const db = drizzle(client, { schema });
