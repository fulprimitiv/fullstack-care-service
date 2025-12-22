import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.service';
import { formatPhone } from '../../shared/utils/formatPhone';
import './AuthPage.scss';

export const RegistrationPage: React.FC = () => {
   const navigate = useNavigate();

   const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      birthDate: '',
      address: '',
      role: 'RECIPIENT' as 'RECIPIENT' | 'VOLUNTEER',
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, phone: formatPhone(e.target.value) });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
         await authApi.signUp({
            ...form,
            birthDate: new Date(form.birthDate).toISOString(),
         });

         navigate('/auth/login');
      } catch (err) {
         setError('Ошибка регистрации. Проверьте данные.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="auth-page">
         <form className="auth-page__form" onSubmit={handleSubmit}>
            <h1 className="auth-page__title">Регистрация</h1>

            {error && <div className="auth-page__error">{error}</div>}

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
               Имя *
               <input name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label className="auth-page__field">
               Email *
               <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
               />
            </label>

            <label className="auth-page__field">
               Пароль *
               <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
               />
            </label>

            <label className="auth-page__field">
               Телефон *
               <input
                  type="tel"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
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
               <input name="address" value={form.address} onChange={handleChange} required />
            </label>

            <button type="submit" className="auth-page__btn" disabled={loading}>
               {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
         </form>
      </div>
   );
};
