import React from 'react';
import './ProfileMain.scss';

interface Props {
   completed: number;
   active: number;
   since: string;
   // rating: number;
}

export const ProfileStats: React.FC<Props> = ({
   completed,
   active,
   since,
   // rating,
}) => (
   <div className="profile-card">
      <div className="profile-card__question">
         <div className="profile-card__icon--stats" />
         <h3 className="action-card__title">Статистика</h3>
      </div>

      <ul className="profile-card__list">
         <li>
            <span>Выполнено заказов: </span> {completed}
         </li>
         <li>
            <span>Активных заказов: </span> {active}
         </li>
         <li>
            <span>Дата создания аккаунта: </span> {since}
         </li>
         {/* <li><span>Рейтинг: </span> {rating}</li> */}
      </ul>
   </div>
);
