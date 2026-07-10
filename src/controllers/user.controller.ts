import type { Request, Response } from 'express';
import * as UserService from '../services/user.service.ts';

export async function getAllUser(_request: Request, response: Response) {
	const users = await UserService.findUsers();

	response.status(200).json(users);
}
