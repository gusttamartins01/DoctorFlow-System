export type User = {
	id: number;
	name: string;
	cpf: string;
	email: string;
	phone: string;
	is_active: boolean;
	created_at: string;
	update_at: string;
};

export type CreateUser = Omit<
	User,
	'id' | 'is_active' | 'created_at' | 'update_at'
>;

export type UpdateUser = Partial<Omit<User, 'id'>>;
