import { connectDatabase } from '../database/connection.ts';
import type { User } from '../types.ts';

export async function findUsers(): Promise<User[]> {
	const db = await connectDatabase();

	const users = await db.all('SELECT * FROM user');

	return users as User[];
}

export async function findUserById(id: number): Promise<User | undefined> {
	const db = await connectDatabase();

	const smt = await db.prepare(
		`
        SELECT * FROM user WHERE id = ?
        `,
	);

	const user = await smt.get(id);

	await smt.finalize();

	return user as User | undefined;
}
