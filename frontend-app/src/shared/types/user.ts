import type { UserRole } from './enums';

export interface User {
	id: number;
	name: string;
	phone: string;
	birthday: string;
	address: string;
	email: string;
	role: UserRole;
	registeredAt: string;
}
