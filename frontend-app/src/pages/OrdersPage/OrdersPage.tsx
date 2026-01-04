import React, { useEffect, useMemo, useState } from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { Orders } from '../../components/home/Orders/Orders';
import { useAuth } from '../../shared/hooks/useAuth';
import { helpRequestApi } from '../../api/helpRequest.service';
import { STATUS_CONFIG } from '../../shared/constants/StatusConfig';
import { getTitleByType } from '../../shared/utils/getTitleByType';
import type { OrderProps, OrderAction } from '../../shared/types/ordersTypes';
import type { HelpRequest } from '../../shared/types/helpRequest';
import { useOrderActions } from '../../shared/hooks/useOrderActions';
import { OrderDetailsModal } from '../../components/modal/OrderDetailsModal';
import './OrdersPage.scss';

export const OrdersPage: React.FC = () => {
   const { role, userId } = useAuth();
   const [orders, setOrders] = useState<OrderProps[]>([]);
   const [modalOrder, setModalOrder] = useState<HelpRequest | null>(null);

   const { handleOrderAction: baseHandleOrderAction } = useOrderActions({
      onShowDetails: setModalOrder,
   });

   const updateOrderStatusLocally = (
      orderId: number,
      newStatus: HelpRequest['status']
   ) => {
      setOrders(prev =>
         prev.map(o => {
            if (o.id !== orderId) return o;

            const config = STATUS_CONFIG[newStatus];

            return {
               ...o,
               status: newStatus,
               statusLabel: config.statusLabel,
               actions:
                  role === 'RECIPIENT'
                     ? o.recipientId === userId
                        ? config.actions.RECIPIENT
                        : []
                     : config.actions[role as 'VOLUNTEER' | 'RECIPIENT'],
            };
         })
      );
   };

   const handleOrderAction = async (
      action: OrderAction,
      orderId: number
   ) => {
      await baseHandleOrderAction(action, orderId);

      if (action.type === 'COMPLETE') {
         updateOrderStatusLocally(orderId, 'COMPLETED');
      }

      if (action.type === 'CANCEL') {
         updateOrderStatusLocally(orderId, 'CANCELLED');
      }
   };

   useEffect(() => {
      if (!userId || !role) return;

      const fetchOrders = async () => {
         try {
            const response = await helpRequestApi.getByUser(userId);

            const mappedOrders: OrderProps[] = response.data.map(
               (order: HelpRequest) => {
                  const config = STATUS_CONFIG[order.status];
                  const isOwner =
                     role === 'RECIPIENT' && order.recipientId === userId;

                  return {
                     id: order.id,
                     title: getTitleByType(order.type),
                     address: order.address,
                     date: new Date(order.requestDate).toLocaleDateString(),
                     time: new Date(order.requestDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                     }),
                     status: order.status,
                     statusLabel: config.statusLabel,
                     actions:
                        role === 'RECIPIENT'
                           ? isOwner
                              ? config.actions.RECIPIENT
                              : []
                           : config.actions[role],
                     type: order.type,
                     recipientId: order.recipientId,
                     volunteerId: order.volunteerId,
                  };
               }
            );

            setOrders(mappedOrders);
         } catch (e) {
            console.error('Ошибка загрузки заявок пользователя', e);
         }
      };

      fetchOrders();
   }, [userId, role]);

   const activeOrders = useMemo(() => {
      if (role === 'RECIPIENT') {
         return orders.filter(
            o => o.status === 'CREATED' || o.status === 'IN_PROGRESS'
         );
      }

      if (role === 'VOLUNTEER') {
         return orders.filter(o => o.status === 'IN_PROGRESS');
      }

      return [];
   }, [orders, role]);

   const completedOrders = useMemo(() => {
      return orders.filter(
         o =>
            o.status === 'COMPLETED' ||
            o.status === 'CANCELLED' ||
            o.status === 'EXPIRED'
      );
   }, [orders]);

   return (
      <div className="orders-page">
         {role === 'RECIPIENT' && (
            <ActionCard
               icon="list"
               title="Мои заказы"
               description="Здесь вы можете управлять своими заявками на помощь: 
          отслеживать активные и просматривать завершённые."
               buttonText="Создать новый заказ"
               variant="green"
            />
         )}

         <Orders
            name="active"
            orders={activeOrders}
            onActionClick={handleOrderAction}
         />

         <Orders
            name="completed"
            orders={completedOrders}
            onActionClick={handleOrderAction}
         />

         {modalOrder && (
            <OrderDetailsModal
               order={modalOrder}
               onClose={() => setModalOrder(null)}
            />
         )}
      </div>
   );
};
