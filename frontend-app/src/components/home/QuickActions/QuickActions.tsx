import React from 'react';
import './QuickActions.scss';
import type { QuickActionsProps } from '../../../shared/types/ordersTypes';

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
   return (
      <section className="quick-actions">
         <h2 className="quick-actions__title">Быстрые действия</h2>

         <div className="quick-actions__list">
            {actions.map(({ icon, label }) => (
               <button key={label} className="quick-actions__item">
                  <div className={`quick-actions__icon quick-actions__icon--${icon}`} />
                  <span className="quick-actions__label">{label}</span>
               </button>
            ))}
         </div>
      </section>
   );
};
