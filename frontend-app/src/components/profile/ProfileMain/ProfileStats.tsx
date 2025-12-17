import React from 'react';
import './ProfileMain.scss';

interface Props {
	completed: number;
	active: number;
	since: string;
	rating: number;
}

export const ProfileStats: React.FC<Props> = ({
	completed,
	active,
	since,
	rating,
}) => (
	<div className="profile-card">
		<div className="profile-card__question">
			<div className='profile-card__icon--stats' />
			<h3 className="action-card__title">Статистика</h3>
		</div>

		<ul className="profile-card__list">
			<li>Выполнено заказов: <b>{completed}</b></li>
			<li>Активных заказов: <b>{active}</b></li>
			<li>На сервисе с: <b>{since}</b></li>
			<li>Рейтинг: <b>{rating} / 5</b></li>
		</ul>

	</div>
);
