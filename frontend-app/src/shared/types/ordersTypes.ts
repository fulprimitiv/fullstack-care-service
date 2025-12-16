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
