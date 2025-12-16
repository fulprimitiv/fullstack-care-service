import React from 'react';
import './ActionCard.scss';
import type { ActionCardProps } from '../../../shared/types/ordersTypes';

export const ActionCard: React.FC<ActionCardProps> = ({
   icon,
   title,
   description,
   buttonText,
   variant,
}) => {
   return (
      <div className="action-card">
         <div className="action-card__content">
            <div className="action-card__question">
               <div className={`action-card__icon action-card__icon--${icon}`} />
               <h3 className="action-card__title">{title}</h3>
            </div>
            <p className="action-card__description">{description}</p>
         </div>
         {/* РОУТИНГ СДЕЛАТЬ НА СОЗДАНИЕ ЗАЯВКИ */}
         <button className={`action-card__button action-card__button--${variant}`}>
            {buttonText}
         </button>
      </div>
   );
};
