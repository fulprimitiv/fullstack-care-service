import React, { useState, useMemo, useEffect } from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { QuickActions } from '../../components/home/QuickActions/QuickActions';
import { Orders } from '../../components/home/Orders/Orders';
import { useAuth } from '../../shared/hooks/useAuth';
import type { HelpRequestType } from '../../shared/types/enums';
import type { OrderProps } from '../../shared/types/ordersTypes';
import { helpRequestApi } from '../../api/helpRequest.service';
import { getTitleByType } from '../../shared/utils/getTitleByType'
import { STATUS_CONFIG } from '../../shared/constants/StatusConfig'
import './HomePage.scss';

export const HomePage: React.FC = () => {
   const { isAuth, role } = useAuth();
   const [orders, setOrders] = useState<OrderProps[]>([]);
   const [selectedType, setSelectedType] = useState<HelpRequestType | null>(null);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await helpRequestApi.getAll();

            const mappedOrders: OrderProps[] = response.data.map(order => {
               const config = STATUS_CONFIG[order.status];

               return {
                  id: order.id,
                  title: getTitleByType(order.type),
                  address: order.address,
                  date: new Date(order.requestDate).toLocaleDateString(),
                  time: new Date(order.requestDate).toLocaleTimeString([], {
                     hour: '2-digit',
                     minute: '2-digit',
                  }),
                  status: config.status,
                  statusLabel: config.statusLabel,
                  actions: config.actions[role as keyof typeof config.actions],
                  type: order.type,
               };
            });

            setOrders(mappedOrders);
         } catch (e) {
            console.error('Ошибка загрузки заявок', e);
         }
      };

      fetchOrders();
   }, [role]);


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
