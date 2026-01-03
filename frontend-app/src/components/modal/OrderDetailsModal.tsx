import React, { useState, useEffect } from 'react';
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecipient = async () => {
			try {
				const data = await userApi.getById(order.recipientId);
				setRecipient(data);
			} catch (error) {
				console.error('Ошибка при загрузке данных заказчика:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipient();
	}, [order.recipientId]);

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={e => e.stopPropagation()}>
				<button className="modal__close" onClick={onClose}>×</button>

				<h2>{getTitleByType(order.type)}</h2>

				<div className="modal__content">
					<p><strong>Заказчик:</strong> {loading ? '...' : recipient?.name || 'Не известно'}</p>
					<p><strong>Телефон заказчика:</strong> {loading ? '...' : recipient?.phone || 'Не указан'}</p>
				</div>

				<div className="modal__content">
					<p><strong>Адрес:</strong> {loading ? '...' : order.address || 'Не известен'}</p>
					<p><strong>Дата:</strong> {loading ? '...' : new Date(order.requestDate).toLocaleString() || 'Не указана'}</p>
				</div>

				<p><strong>Описание:</strong> {loading ? '...' : order.description || 'Нет описания'}</p>
			</div>
		</div>
	);
};
