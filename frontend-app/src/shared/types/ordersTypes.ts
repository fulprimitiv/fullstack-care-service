import type { HelpRequestType } from './enums'
export type OrderStatus = 'active' | 'searching' | 'completed';
export type OrderName = 'all' | 'active' | 'completed';

export interface OrderProps {
   id: number;
   title: string;
   address: string;
   date: string;
   time: string;
   status: OrderStatus;
   type: HelpRequestType;
}

export interface ActionCardProps {
   icon: 'question' | 'care' | 'list';
   title: string;
   description: string;
   buttonText: string;
   variant: 'green' | 'orange';
}

export interface QuickAction {
   icon: HelpRequestType;
   label: string;
}

export interface QuickActionsProps {
   actions: { icon: HelpRequestType; label: string }[];
   onSelectType: (type: HelpRequestType) => void;
   selectedType: HelpRequestType | null;
}