import React from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { Orders } from '../../components/home/Orders/Orders';
import { useAuth } from '../../shared/hooks/useAuth';
import './OrdersPage.scss';

export const OrdersPage: React.FC = () => {
   const { role } = useAuth();
   return (
      <div className="orders-page">
         {role === 'RECIPIENT' && (
            <ActionCard
               icon="list"
               title="Мои заказы"
               description="Здесь вы можете управлять своими заявками на помощь: 
				создавать новые, отслеживать активные и просматривать завершенные."
               buttonText="Создать новый заказ"
               variant="green"
            />
         )}

         <Orders
            name="active"
            orders={[
               {
                  id: 1,
                  title: 'Помощь с покупками',
                  address: 'ул. Ленина, 15',
                  date: 'Сегодня',
                  time: '14:00',
                  volunteer: 'Мария',
                  status: 'active',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  volunteer: 'Дмитрий',
                  status: 'active',
               },
            ]}
         />

         <Orders
            name="completed"
            orders={[
               {
                  id: 1,
                  title: 'Помощь с покупками',
                  address: 'ул. Ленина, 15',
                  date: 'Сегодня',
                  time: '14:00',
                  volunteer: 'Мария',
                  status: 'completed',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  volunteer: 'Дмитрий',
                  status: 'completed',
               },
            ]}
         />
      </div>
   );
};
