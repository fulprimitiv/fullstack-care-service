import React from 'react';
import './ProfileButtons.scss';
import { useAuth } from '../../../shared/hooks/useAuth';


export const ProfileButtons: React.FC = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="buttons">
			{/* <button className={`buttons__btn buttons__btn--edit`}>
				Редактировать данные
			</button> */}

			<button
				className={`buttons__btn buttons__btn--out`}
				onClick={handleLogout}
			>
				Выйти из аккаунта
			</button>
		</div>
	);
};
