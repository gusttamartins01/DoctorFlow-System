import { connectDatabase } from '../database/connection.ts';
import type { User } from '../types.ts';

export async function findUsers(): Promise<User[]> {
	const db = await connectDatabase();

	const users = await db.all('SELECT * FROM user');

	return users as User[];
}
