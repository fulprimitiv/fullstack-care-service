import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpRequestApi } from '../../api/helpRequest.service';
import type { HelpRequestType } from '../../shared/types/enums';
import { useAuth } from '../../shared/hooks/useAuth';
import './CreateOrderPage.scss';

export const CreateOrderPage: React.FC = () => {
   const navigate = useNavigate();
   const { userId } = useAuth();

   const [form, setForm] = useState({
      type: 'SHOPPING' as HelpRequestType,
      description: '',
      address: '',
      date: '',
      time: '',
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
   ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
         const requestDate = new Date(`${form.date}T${form.time}`).toISOString();

         await helpRequestApi.create({
            type: form.type,
            description: form.description,
            address: form.address,
            requestDate,
            recipientId: userId,
         });

         navigate('/my-orders');
      } catch (err) {
         setError('Ошибка создания заказа. Проверьте данные.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="order-container">
         <form className="order-container__form" onSubmit={handleSubmit}>
            <h1 className="order-container__title">Создать заказ</h1>

            {error && <div className="order-container__error">{error}</div>}

            <label className="order-container__field">
               Категория помощи *
               <div className="radio-list">
                  {[
                     { value: 'SHOPPING', label: 'Покупки' },
                     { value: 'CLEANING', label: 'Уборка' },
                     { value: 'PHARMACY', label: 'Аптека' },
                     { value: 'COMMUNICATION', label: 'Общение' },
                     { value: 'REPAIR', label: 'Ремонт' },
                  ].map((item) => (
                     <label key={item.value} className="radio-card">
                        <input
                           type="radio"
                           name="type"
                           value={item.value}
                           checked={form.type === item.value}
                           onChange={handleChange}
                        />
                        <span className="radio-card__circle" />
                        <span className="radio-card__label">{item.label}</span>
                     </label>
                  ))}
               </div>
            </label>

            <label className="order-container__field">
               Адрес *
               <input name="address" value={form.address} onChange={handleChange} required />
            </label>

            <label className="order-container__field">
               Дата *
               <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </label>

            <label className="order-container__field">
               Время *
               <input type="time" name="time" value={form.time} onChange={handleChange} required />
            </label>

            <label className="order-container__field">
               Описание заказа *
               <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
               />
            </label>

            <button type="submit" className="order-container__btn" disabled={loading}>
               {loading ? 'Создание...' : 'Создать заявку'}
            </button>
         </form>
      </div>
   );
};
