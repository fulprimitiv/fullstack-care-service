import type { User } from '../types/user'

export const formatInitials = (user: User | null): string => {
	return (
		user?.name
			?.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((n) => n[0].toUpperCase())
			.join('') || ''
	);
};
