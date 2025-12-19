import React, { useState } from 'react';
import './AuthPage.scss';

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const payload = {
			email,
			password,
		};

		console.log('LOGIN', payload);
		// axios /auth/sign-in
	};

	return (
		<div className="auth-page">
			<form className="auth-page__form" onSubmit={handleSubmit}>
				<h1 className="auth-page__title">Вход в аккаунт</h1>

				<label className="auth-page__field">
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label className="auth-page__field">
					Пароль
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<button type="submit" className="auth-page__btn">
					Войти
				</button>
			</form>
		</div>
	);
};
