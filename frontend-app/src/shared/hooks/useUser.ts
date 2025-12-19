import { useEffect, useState } from 'react';
import type { User } from '../types/user';
import { userApi } from '../../api/user.service';

export const useUser = (userId?: number) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!userId) return;

		setLoading(true);
		setError(null);

		userApi
			.getById(userId)
			.then(setUser)
			.catch(() => setError('Не удалось загрузить профиль'))
			.finally(() => setLoading(false));
	}, [userId]);

	return {
		user,
		loading,
		error,
	};
};
