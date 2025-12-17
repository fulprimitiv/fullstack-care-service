import type { UserRole } from './enums';

export interface CreateUserCommand {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	phone: string;
	birthDate: string;
	address: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export interface JwtAuthenticationResponse {
	token: string;
}
