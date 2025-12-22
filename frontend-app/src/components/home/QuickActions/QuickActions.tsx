import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import type { QuickActionsProps } from '../../../shared/types/ordersTypes';
import type { HelpRequestType } from '../../../shared/types/enums';
import './QuickActions.scss';

export const QuickActions: React.FC<QuickActionsProps> = ({
   actions,
   onSelectType,
   selectedType,
}) => {
   const navigate = useNavigate();
   const { role } = useAuth();

   const handleRecipientClick = (type: HelpRequestType) => {
      navigate('/create-order', { state: { type } });
   };

   return (
      <section className="quick-actions">
         <h2 className="quick-actions__title">
            {role === 'RECIPIENT'
               ? 'Быстрые действия'
               : 'Сортировка заявок по типу'}
         </h2>

         <div className="quick-actions__list">
            {actions.map(({ icon, label }) => (
               <button
                  key={label}
                  className={`quick-actions__item ${selectedType === icon ? 'quick-actions__item--active' : ''
                     }`}
                  onClick={
                     role === 'RECIPIENT'
                        ? () => handleRecipientClick(icon)
                        : () => onSelectType(icon)
                  }
               >
                  <div className={`quick-actions__icon quick-actions__icon--${icon}`} />
                  <span className="quick-actions__label">{label}</span>
               </button>
            ))}
         </div>
      </section>
   );
};