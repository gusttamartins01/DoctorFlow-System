import { connectDatabase } from '../database/connection.ts';
import type { CreateUser, UpdateUser, User } from '../types.ts';

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

export async function insertUser({
	name,
	cpf,
	email,
	phone,
}: CreateUser): Promise<User> {
	if (!name || !cpf || !email || !phone)
		throw new Error('Todos os campos precisam ser preenchidos.');

	const db = await connectDatabase();

	const result = await db.run(
		`
        INSERT INTO user (name, cpf, email, phone)
        VALUES (?, ?, ?, ?)
        `,
		[name, cpf, email, phone],
	);

	if (!result || result.lastID === undefined) {
		throw new Error('Falha ao criar usuário.');
	}

	return {
		id: result.lastID,
		name,
		cpf,
		email,
		phone,
	} as User;
}

export async function modifyUser({
	id,
	name,
	cpf,
	email,
	phone,
}: UpdateUser): Promise<User | null> {
	if (!id || !name || !cpf || !email || !phone) {
		throw new Error('Todos os campos são obrigatórios para a atualização.');
	}

	const db = await connectDatabase();

	const result = await db.run(
		`
		UPDATE user
		SET name = ?, cpf = ?, email = ?, phone = ?
		WHERE id = ?
		`,
		[name, cpf, email, phone, id],
	);

	if (result.changes === 0) {
		return null;
	}

	return {
		id,
		name,
		cpf,
		email,
		phone,
	} as User;
}
