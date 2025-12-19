import { useCallback } from 'react';
import { authApi } from '../../api/auth.service';
import type { SignInRequest, CreateUserCommand } from '../types/auth';
import { decodeToken } from '../utils/token';

export const useAuth = () => {
	const payload = decodeToken();

	const login = async (data: SignInRequest) => {
		const res = await authApi.signIn(data);
		localStorage.setItem('token', res.token);
		window.location.href = '/list';
	};

	const register = async (data: CreateUserCommand) => {
		const res = await authApi.signUp(data);
		localStorage.setItem('token', res.token);
		window.location.reload();
	};

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		window.location.href = '/list';
	}, []);

	return {
		isAuth: Boolean(payload),
		userId: payload?.id,
		role: payload?.role,
		email: payload?.sub,
		login,
		register,
		logout,
	};
};
