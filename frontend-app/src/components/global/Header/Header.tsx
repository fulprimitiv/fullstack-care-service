import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useUser } from '../../../shared/hooks/useUser';
import { USER_ROLE } from '../../../shared/constants/UserRole'
import { formatInitials } from '../../../shared/utils/formatInitials';

import './Header.scss';

export const Header: React.FC = () => {
   const { isAuth, role, userId } = useAuth();
   const { user } = useUser(userId);

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

         {isAuth ? (
            <Link to="/profile" className="app-header__user">
               <div className="app-header__avatar">{formatInitials(user)}</div>

               <div className="app-header__info">
                  <span>{user?.name}</span>
                  <span>{USER_ROLE[role || 'VOLUNTEER']}</span>
               </div>
            </Link>
         ) : (
            <div className="app-header__auth">
               <Link to="/auth/login" className="app-header__btn app-header__btn--primary">
                  Вход
               </Link>
               <Link to="/auth/registration" className="app-header__btn app-header__btn--primary">
                  Регистрация
               </Link>
            </div>
         )}
      </header>
   );
};
