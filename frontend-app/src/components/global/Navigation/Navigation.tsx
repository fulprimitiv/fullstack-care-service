import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

export const Navigation: React.FC = () => {
	const { pathname } = useLocation();

	return (
		<nav className="navigation">
			<Link to="/list" className={`navigation__link ${pathname === '/list' ? 'navigation__link--active' : ''}`}>
				Главная
			</Link>

			<Link to="/my-orders" className={`navigation__link ${pathname === '/my-orders' ? 'navigation__link--active' : ''}`}>
				Мои заказы
			</Link>

			<Link to="/profile" className={`navigation__link ${pathname === '/profile' ? 'navigation__link--active' : ''}`}>
				Личный кабинет
			</Link>
		</nav>
	);
};
