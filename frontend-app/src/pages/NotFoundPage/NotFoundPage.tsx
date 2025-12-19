import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
	return (
		<div className="not-found">
			<div className="not-found__content">
				<div className="not-found__code">404</div>
				<h1 className="not-found__title">Страница не найдена</h1>
				<p className="not-found__text">
					Возможно, страница была удалена или вы не зарегистрировались на платформе.
				</p>

				<Link to="/list" className="not-found__btn">
					Вернуться на главную
				</Link>
			</div>
		</div>
	);
};
