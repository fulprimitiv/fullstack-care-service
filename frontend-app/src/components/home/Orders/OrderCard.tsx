import React from 'react';
import type { OrderProps } from '../../../shared/types/ordersTypes';
import { useAuth } from '../../../shared/hooks/useAuth';
import './OrderCard.scss';

interface Props {
   order: OrderProps;
}

export const OrderCard: React.FC<Props> = ({ order }) => {
   const { role } = useAuth();
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
            </ul>

            <span className={`order-card__status order-card__status--${order.status}`}>
               {order.statusLabel}
            </span>
         </div>

         {role === 'VOLUNTEER' && order.actions.length > 0 && (
            <div className="order-card__actions">
               {order.actions.map(({ label, primary }) => (
                  <button
                     key={label}
                     className={`order-card__btn ${primary ? 'order-card__btn--primary' : ''}`}
                  >
                     {label}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};
