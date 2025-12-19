import React from 'react';
import './ProfileMain.scss';

interface Props {
	phone: string | undefined;
	// address: string | undefined;
	birthDate: string;
	email: string | undefined;
}

export const ProfileInfo: React.FC<Props> = ({
	phone,
	// address,
	birthDate,
	email,
}) => (
	<div className="profile-card">
		<div className="profile-card__question">
			<div className='profile-card__icon--profile' />
			<h3 className="action-card__title">Мои данные</h3>
		</div>

		<ul className="profile-card__list">
			<li><span>Телефон:</span> {phone}</li>
			{/* <li><span>Адрес:</span> {address}</li> */}
			<li><span>Дата рождения:</span> {birthDate}</li>
			<li><span>Эл. почта:</span> {email}</li>
		</ul>
	</div>
);
