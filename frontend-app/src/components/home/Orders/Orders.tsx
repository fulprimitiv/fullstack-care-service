import React from 'react';
import { OrderCard } from './OrderCard';
import type { OrderProps, OrderName } from '../../../shared/types/ordersTypes';
import './Orders.scss';

interface Props {
   name: OrderName;
   orders: OrderProps[];
}

const CARD_STATUS_LABEL: Record<OrderName, string> = {
   all: 'Список всех заявок',
   active: 'Активные заказы',
   completed: 'Завершенные заказы',
};

export const Orders: React.FC<Props> = ({ name, orders }) => {
   return (
      <section className="orders" id="order-list">
         <div className="orders__question">
            <div className={`orders__icon orders__icon--${name}`} />
            <h3 className="orders__title">{CARD_STATUS_LABEL[name]}</h3>
         </div>

         <div className="orders__list">
            {orders.map((order) => (
               <OrderCard key={order.id} order={order} />
            ))}
         </div>
      </section>
   );
};
