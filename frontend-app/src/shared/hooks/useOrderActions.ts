import { useNavigate } from 'react-router-dom';
import { helpRequestApi } from '../../api/helpRequest.service';
import { useAuth } from './useAuth';
import type { OrderAction } from '../types/ordersTypes';
import type { HelpRequest } from '../types/helpRequest';

interface Options {
	onShowDetails?: (order: HelpRequest) => void;
	onRespondStart?: (orderId: number) => void | Promise<void>;
	onRespondEnd?: () => void;
}

export const useOrderActions = (options?: Options) => {
	const navigate = useNavigate();
	const { userId } = useAuth();

	const handleOrderAction = async (
		action: OrderAction,
		orderId: number,
	) => {
		switch (action.type) {
			case 'DETAILS': {
				const res = await helpRequestApi.getById(orderId);
				options?.onShowDetails?.(res.data);
				return;
			}

			case 'RESPOND': {
				if (options?.onRespondStart) {
					await options.onRespondStart(orderId);
				}
				if (userId) {
					await helpRequestApi.takeByVolunteer(orderId, userId);
				} else {
					await helpRequestApi.takeByVolunteer(orderId, 0 as any);
				}
				await helpRequestApi.updateStatus(orderId, 'IN_PROGRESS');
				await new Promise<void>(resolve => setTimeout(() => resolve(), 700));
				options?.onRespondEnd?.();
				navigate('/my-orders');
				return;
			}

			case 'CANCEL': {
				await helpRequestApi.updateStatus(orderId, 'CANCELLED');
				return;
			}

			case 'CONTACT': {
				navigate(`/chat/${orderId}`);
				return;
			}

			case 'REPEAT': {
				navigate(`/create-order?repeat=${orderId}`);
				return;
			}

			case 'RATE': {
				// TODO: modal rating
				return;
			}
		}
	};

	return { handleOrderAction };
};
