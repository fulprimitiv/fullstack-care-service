import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
   const name = 'Иван Иванов';
   const role = 'Получатель помощи';
   return (
      <header className="app-header">
         <Link to="/list" className="app-header__brand">
            <img
               src={new URL('../../../../public/images/favicon.svg', import.meta.url).href}
               alt="Логотип"
               draggable={false}
               className="app-header__brand-logo"
            />
            <span className="app-header__brand-title">Помощь рядом</span>
         </Link>

         <Link to="/profile" className="app-header__user">
            <div className="app-header__avatar">ИИ</div>

            <div className="app-header__info">
               <span>{name}</span>
               <span>{role}</span>
            </div>
         </Link>
      </header>
   );
};
