import React from 'react';
import { ActionCard } from '../../components/home/ActionCard/ActionCard';
import { QuickActions } from '../../components/home/QuickActions/QuickActions';
import './HomePage.scss';

export const HomePage: React.FC = () => {

	return (
		<div className="home-page">
			<ActionCard
				icon="question"
				title="Нужна помощь?"
				description="Опишите, какая помощь вам требуется, и волонтеры откликнутся. 
				Мы поможем с покупками, уборкой, походом в аптеку и другими бытовыми вопросами."
				buttonText="Создать заявку на помощь"
				variant="green"
			/>

			<ActionCard
				icon="care"
				title="Хочу помочь"
				description="Станьте волонтером и помогайте пожилым людям в вашем районе. 
				Даже небольшая помощь может значительно улучшить чью-то жизнь."
				buttonText="Стать волонтёром"
				variant="orange"
			/>

			<QuickActions
				actions={[
					{ icon: 'shop', label: 'Покупки' },
					{ icon: 'cleaning', label: 'Уборка' },
					{ icon: 'pharmacy', label: 'Аптека' },
					{ icon: 'repair', label: 'Ремонт' },
					{ icon: 'walk', label: 'Прогулка' },
				]}
			/>
		</div>
	);
};
