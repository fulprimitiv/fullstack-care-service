import React from 'react';
import './ProfileButtons.scss';

export const ProfileButtons: React.FC = () => {
	return (
		<div className="buttons">
			<button className={`buttons__btn buttons__btn--edit`}>
				Редактировать данные
			</button>

			<button className={`buttons__btn buttons__btn--out`}>
				Выйти из аккаунта
			</button>
		</div>
	);
};
