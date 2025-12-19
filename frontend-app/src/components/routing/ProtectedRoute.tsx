import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

interface Props {
	children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to="/404" replace />;
	}

	return <>{children}</>;
};
