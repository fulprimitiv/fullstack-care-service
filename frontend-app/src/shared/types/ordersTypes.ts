export type OrderStatus = 'active' | 'searching' | 'completed';
export type OrderName = 'all' | 'active' | 'completed';

export interface OrderProps {
   id: number;
   title: string;
   address: string;
   date: string;
   time: string;
   volunteer?: string;
   status: OrderStatus;
}

export interface ActionCardProps {
   icon: 'question' | 'care' | 'list';
   title: string;
   description: string;
   buttonText: string;
   variant: 'green' | 'orange';
}

export interface QuickAction {
   icon: string;
   label: string;
}

export interface QuickActionsProps {
   actions: QuickAction[];
}