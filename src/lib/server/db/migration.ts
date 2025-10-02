import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function runMigrations() {
	console.log('Running migrations...');

	const databaseUrl = process.env.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error('DATABASE_URL is not set');
	}

	// Connection untuk migrations
	const migrationClient = postgres(databaseUrl, { max: 1 });
	const db = drizzle(migrationClient);

	try {
		await migrate(db, { migrationsFolder: './drizzle' });
		console.log('✅ Migrations completed successfully');
	} catch (error) {
		console.error('❌ Migration failed:', error);
		throw error;
	} finally {
		await migrationClient.end();
	}
}

runMigrations()
	.then(() => {
		console.log('Migration process finished');
		process.exit(0);
	})
	.catch((err) => {
		console.error('Migration process failed:', err);
		process.exit(1);
	});
