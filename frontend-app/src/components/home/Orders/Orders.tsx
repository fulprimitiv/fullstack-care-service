import React from 'react';
import { OrderCard } from './OrderCard';
import type { OrderProps, OrderAction } from '../../../shared/types/ordersTypes';
import './Orders.scss';

type OrderName = 'all' | 'active' | 'completed';

interface Props {
   name: OrderName;
   orders: OrderProps[];
   onActionClick: (action: OrderAction, orderId: number) => void;
   respondingId?: number | null;
}

const CARD_STATUS_LABEL: Record<OrderName, string> = {
   all: 'Заявки нуждающихся',
   active: 'Активные заказы',
   completed: 'Завершенные заказы',
};

export const Orders: React.FC<Props> = ({ name, orders, onActionClick, respondingId }) => {
   console.log()
   return (
      <section className="orders" id="order-list">
         <div className="orders__question">
            <div className={`orders__icon orders__icon--${name}`} />
            <h3 className="orders__title">{CARD_STATUS_LABEL[name]}</h3>
         </div>

         <div className="orders__list">
            {orders.map((order) => {
               console.log(order);
               return (
                  <OrderCard
                     key={order.id}
                     order={order}
                     onActionClick={onActionClick}
                     isResponding={respondingId === order.id}
                     recipientId={order.recipientId}
                  />
               )
            })}
         </div>
      </section>
   );
};
