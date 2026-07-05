import { type Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function connectDatabase(): Promise<Database> {
	const databasePath = './user.db';

	const db = await open({
		filename: databasePath,
		driver: sqlite3.Database,
	});

	return db;
}
