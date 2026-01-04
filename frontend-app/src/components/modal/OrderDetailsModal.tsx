import React, { useEffect, useState } from 'react';
import type { HelpRequest } from '../../shared/types/helpRequest';
import type { User } from '../../shared/types/user';
import { getTitleByType } from '../../shared/utils/getTitleByType';
import { userApi } from '../../api/user.service';
import './OrderDetailsModal.scss';

interface Props {
	order: HelpRequest;
	onClose: () => void;
}

export const OrderDetailsModal: React.FC<Props> = ({ order, onClose }) => {
	const [recipient, setRecipient] = useState<User | null>(null);
	const [volunteer, setVolunteer] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const recipientPromise = userApi.getById(order.recipientId);

				const volunteerPromise = order.volunteerId
					? userApi.getById(order.volunteerId)
					: Promise.resolve(null);

				const [recipientData, volunteerData] = await Promise.all([
					recipientPromise,
					volunteerPromise,
				]);

				setRecipient(recipientData);
				setVolunteer(volunteerData);
			} catch (e) {
				console.error('Ошибка загрузки пользователей заявки', e);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [order.recipientId, order.volunteerId]);

	const showVolunteer =
		order.status === 'IN_PROGRESS' || order.status === 'COMPLETED';

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={e => e.stopPropagation()}>
				<button className="modal__close" onClick={onClose}>
					×
				</button>

				<h1 className='title'>{getTitleByType(order.type)}</h1>

				{showVolunteer && (
					<div className="modal__content modal__content--volunteer">
						<p>
							<strong>Волонтёр:</strong>{' '}
							{loading
								? '...'
								: volunteer
									? `${volunteer.name}, ${volunteer.phone}`
									: 'Не назначен'}
						</p>
					</div>
				)}

				<div className="modal__content modal__content--recipient">
					<p>
						<strong>Заказчик:</strong>{' '}
						{loading
							? '...'
							: recipient
								? `${recipient.name}, ${recipient.phone}`
								: 'Неизвестно'}
					</p>
					<p>
						<strong>Адрес:</strong> {order.address}
					</p>
					<p>
						<strong>Дата:</strong>{' '}
						{new Date(order.requestDate).toLocaleString()}
					</p>
				</div>

				<div className="modal__content modal__content--recipient">
					<p>
						<strong>Описание заявки:</strong> {order.description || 'Нет описания'}
					</p>
				</div>
			</div>
		</div >
	);
};
