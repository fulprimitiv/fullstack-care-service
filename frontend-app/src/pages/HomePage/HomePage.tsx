import React from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { QuickActions } from '../../components/home/QuickActions/QuickActions';
import { Orders } from '../../components/home/Orders/Orders';
import { useAuth } from '../../shared/hooks/useAuth';
import './HomePage.scss';

export const HomePage: React.FC = () => {
   const { isAuth, role } = useAuth();
   return (
      <div className="home-page">
         {(!isAuth || role === 'RECIPIENT') && (
            <ActionCard
               icon="question"
               title="Нужна помощь?"
               description="Опишите, какая помощь вам требуется, и волонтеры откликнутся. 
				Мы поможем с покупками, уборкой, походом в аптеку и другими бытовыми вопросами."
               buttonText="Создать заявку на помощь"
               variant="green"
            />
         )}

         {(!isAuth || role === 'VOLUNTEER') && (
            <ActionCard
               icon="care"
               title="Хочу помочь"
               description="Станьте волонтером и помогайте пожилым людям в вашем районе. 
				Даже небольшая помощь может значительно улучшить чью-то жизнь."
               buttonText="Найти заявку"
               variant={isAuth ? 'green' : 'orange'}
            />
         )}

         <QuickActions
            actions={[
               { icon: 'shop', label: 'Покупки' },
               { icon: 'cleaning', label: 'Уборка' },
               { icon: 'pharmacy', label: 'Аптека' },
               { icon: 'repair', label: 'Ремонт' },
               { icon: 'walk', label: 'Прогулка' },
            ]}
         />

         <Orders
            name="all"
            orders={[
               {
                  id: 1,
                  title: 'Помощь с покупками',
                  address: 'ул. Ленина, 15',
                  date: 'Сегодня',
                  time: '14:00',
                  status: 'searching',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  status: 'searching',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  status: 'searching',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  status: 'searching',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  status: 'searching',
               },
               {
                  id: 2,
                  title: 'Вынести мусор',
                  address: 'ул. Мира, 28',
                  date: 'Завтра',
                  time: '10:00',
                  status: 'searching',
               },
            ]}
         />
      </div>
   );
};
