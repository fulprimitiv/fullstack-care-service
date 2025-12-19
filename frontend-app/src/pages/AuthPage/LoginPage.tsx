import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.service';
import './AuthPage.scss';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const { token } = await authApi.signIn({ email, password });
			localStorage.setItem('token', token);
			navigate('/list');
		} catch (err) {
			setError('Неверный email или пароль');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-page__form" onSubmit={handleSubmit}>
				<h1 className="auth-page__title">Вход в аккаунт</h1>

				{error && <div className="auth-page__error">{error}</div>}

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

				<button type="submit" className="auth-page__btn" disabled={loading}>
					{loading ? 'Вход...' : 'Войти'}
				</button>
			</form>
		</div>
	);
};
