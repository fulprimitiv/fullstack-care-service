import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ActionCardProps } from '../../../shared/types/ordersTypes';
import { useAuth } from '../../../shared/hooks/useAuth';
import './ActionCard.scss';

export const ActionCard: React.FC<ActionCardProps> = ({
   icon,
   title,
   description,
   buttonText,
   variant,
}) => {
   const { role } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const handleClick = () => {
      if (role !== 'VOLUNTEER') {
         navigate('/create-order');
         return;
      }

      if (location.pathname === '/list') {
         const el = document.getElementById('order-list');
         el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
         navigate('/list#order-list');
      }
   };

   return (
      <div className="action-card">
         <div className="action-card__content">
            <div className="action-card__question">
               <div className={`action-card__icon action-card__icon--${icon}`} />
               <h3 className="action-card__title">{title}</h3>
            </div>
            <p className="action-card__description">{description}</p>
         </div>

         <button
            className={`action-card__button action-card__button--${variant}`}
            onClick={handleClick}
         >
            {buttonText}
         </button>
      </div>
   );
};
