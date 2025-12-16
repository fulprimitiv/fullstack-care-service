import React from 'react';
import type { OrderProps, OrderStatus } from '../../../shared/types/ordersTypes';
import './OrderCard.scss';

interface Props {
   order: OrderProps;
}

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
   active: 'В процессе',
   searching: 'Поиск волонтёра',
   completed: 'Выполнено',
};

const ORDER_ACTIONS: Record<OrderStatus, { label: string; primary?: boolean }[]> = {
   active: [{ label: 'Связаться', primary: true }],
   searching: [{ label: 'Отменить' }, { label: 'Редактировать' }],
   completed: [{ label: 'Повторить заказ', primary: true }, { label: 'Оставить отзыв' }],
};

export const OrderCard: React.FC<Props> = ({ order }) => {
   return (
      <div className="order-card">
         <div className="order-card__content">
            <h3 className="order-card__title">{order.title}</h3>

            <ul className="order-card__meta">
               <li className="order-card__meta-item">
                  <span className="order-card__icon order-card__icon--address" />
                  {order.address}
               </li>

               <li className="order-card__meta-item">
                  <span className="order-card__icon order-card__icon--time" />
                  {order.date}, {order.time}
               </li>

               {order.volunteer && (
                  <li className="order-card__meta-item">
                     <span className="order-card__icon order-card__icon--volunteer" />
                     Волонтёр: {order.volunteer}
                  </li>
               )}
            </ul>

            <span className={`order-card__status order-card__status--${order.status}`}>
               {ORDER_STATUS_LABEL[order.status]}
            </span>
         </div>

         <div className="order-card__actions">
            {ORDER_ACTIONS[order.status].map(({ label, primary }) => (
               <button
                  key={label}
                  className={`order-card__btn ${primary ? 'order-card__btn--primary' : ''}`}
               >
                  {label}
               </button>
            ))}
         </div>
      </div>
   );
};
