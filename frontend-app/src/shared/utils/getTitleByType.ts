import type { HelpRequestType } from '../types/enums'

export const getTitleByType = (type: HelpRequestType): string => {
	switch (type) {
		case 'SHOPPING':
			return 'Помощь с покупками';
		case 'CLEANING':
			return 'Уборка';
		case 'PHARMACY':
			return 'Поход в аптеку';
		case 'REPAIR':
			return 'Ремонт';
		case 'WALK':
			return 'Прогулка';
		default:
			return 'Помощь';
	}
};