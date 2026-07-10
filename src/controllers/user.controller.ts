import type { Request, Response } from 'express';
import * as UserService from '../services/user.service.ts';
import type { CreateUser, UpdateUser } from '../types.ts';

export async function getAllUser(_request: Request, response: Response) {
	const users = await UserService.findUsers();

	response.status(200).json(users);
}

export async function getUserById(request: Request, response: Response) {
	const id = Number(request.params.id);

	const user = await UserService.findUserById(id);

	response.status(200).json(user);
}

export async function createUser(request: Request, response: Response) {
	const { name, cpf, email, phone } = request.body as CreateUser;

	const user = await UserService.insertUser({
		name,
		cpf,
		email,
		phone,
	});

	response.status(201).json(user);
}

export async function updateUser(request: Request, response: Response) {
	const id = Number(request.params.id);
	const { name, cpf, email, phone } = request.body as UpdateUser;

	const user = await UserService.modifyUser({
		id,
		name,
		cpf,
		email,
		phone,
	});

	response.status(200).json(user);
}
