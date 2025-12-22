import React, { useState, useMemo } from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { QuickActions } from '../../components/home/QuickActions/QuickActions';
import { Orders } from '../../components/home/Orders/Orders';
import { useAuth } from '../../shared/hooks/useAuth';
import type { HelpRequestType } from '../../shared/types/enums';
import type { OrderStatus } from '../../shared/types/ordersTypes';
import './HomePage.scss';

export const HomePage: React.FC = () => {
   const orders = [
      {
         id: 1,
         title: 'Помощь с покупками',
         address: 'ул. Ленина, 15',
         date: 'Сегодня',
         time: '10:00',
         status: 'searching' as OrderStatus,
         type: 'WALK' as HelpRequestType,
      },
      {
         id: 2,
         title: 'Вынести мусор',
         address: 'ул. Мира, 28',
         date: 'Завтра',
         time: '00:00',
         status: 'searching' as OrderStatus,
         type: 'SHOPPING' as HelpRequestType,
      },
   ];

   const { isAuth, role } = useAuth();
   const [selectedType, setSelectedType] = useState<HelpRequestType | null>(null);

   const handleSelectType = (type: HelpRequestType) => {
      setSelectedType(prev => (prev === type ? null : type));
   };

   const filteredOrders = useMemo(() => {
      if (!selectedType) return orders;
      return orders.filter(order => order.type === selectedType);
   }, [orders, selectedType]);

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
               { icon: 'SHOPPING', label: 'Покупки' },
               { icon: 'CLEANING', label: 'Уборка' },
               { icon: 'PHARMACY', label: 'Аптека' },
               { icon: 'REPAIR', label: 'Ремонт' },
               { icon: 'WALK', label: 'Прогулка' },
            ]}
            onSelectType={handleSelectType}
            selectedType={selectedType}
         />

         <Orders name="all" orders={filteredOrders} />
      </div>
   );
};
