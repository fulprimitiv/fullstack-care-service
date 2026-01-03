import type { HelpRequestType, HelpRequestStatus } from './enums'

export type OrderActionType =
   | 'RESPOND'
   | 'CANCEL'
   | 'EDIT'
   | 'CONTACT'
   | 'REPEAT'
   | 'RATE'
   | 'DETAILS';

export interface OrderAction {
   label: string;
   type: OrderActionType;
   primary?: boolean;
}

export interface OrderProps {
   id: number;
   title: string;
   address: string;
   date: string;
   time: string;
   recipientId?: number;
   status: HelpRequestStatus;
   statusLabel: string;
   actions: readonly OrderAction[];
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