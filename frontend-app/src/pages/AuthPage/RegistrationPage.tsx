import React, { useState } from 'react';
import { formatPhone } from '../../shared/utils/formatPhone';
import './AuthPage.scss';

export const RegistrationPage: React.FC = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		birthDate: '',
		address: '',
		role: 'RECIPIENT',
	});

	const [phone, setPhone] = useState('');

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(formatPhone(e.target.value));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const payload = {
			...form,
			birthDate: new Date(form.birthDate).toISOString(),
		};

		console.log('REGISTER', payload);
		// axios /auth/sign-up
	};

	return (
		<div className="auth-page">
			<form className="auth-page__form" onSubmit={handleSubmit}>
				<h1 className="auth-page__title">Регистрация</h1>

				<div className="auth-page__roles">
					<button
						type="button"
						className={`auth-page__role ${form.role === 'VOLUNTEER' ? 'auth-page__role--active' : ''}`}
						onClick={() => setForm({ ...form, role: 'VOLUNTEER' })}
					>
						<div className="auth-page__role-icon">🧑‍🤝‍🧑</div>
						<div className="auth-page__role-title">Волонтёр</div>
						<div className="auth-page__role-desc">Я помогаю другим</div>
					</button>

					<button
						type="button"
						className={`auth-page__role ${form.role === 'RECIPIENT' ? 'auth-page__role--active' : ''}`}
						onClick={() => setForm({ ...form, role: 'RECIPIENT' })}
					>
						<div className="auth-page__role-icon">👴</div>
						<div className="auth-page__role-title">Нуждаюсь в помощи</div>
						<div className="auth-page__role-desc">Мне нужна поддержка</div>
					</button>
				</div>

				<label className="auth-page__field">
					Как Вас зовут? *
					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Имя Фамилия"
						required
					/>
				</label>

				<label className="auth-page__field">
					Email *
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="example@mail.com"
						required
					/>
				</label>

				<label className="auth-page__field">
					Пароль *
					<input
						type="password"
						name="password"
						placeholder="•••••••"
						value={form.password}
						onChange={handleChange}
						required
					/>
				</label>

				<label className="auth-page__field">
					Телефон *
					<input
						type="tel"
						placeholder="+7 (___) ___-__-__"
						value={phone}
						onChange={handlePhoneChange}
						required
					/>
				</label>

				<label className="auth-page__field">
					Дата рождения *
					<input
						type="date"
						name="birthDate"
						value={form.birthDate}
						onChange={handleChange}
						required
					/>
				</label>

				<label className="auth-page__field">
					Адрес *
					<input
						name="address"
						value={form.address}
						onChange={handleChange}
						placeholder="ул. Мира, 28"
						required
					/>
				</label>

				<button type="submit" className="auth-page__btn">
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
