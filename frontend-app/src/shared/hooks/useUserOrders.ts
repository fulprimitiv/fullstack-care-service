import { useEffect, useState } from 'react';
import type { HelpRequest } from '../types/helpRequest';
import type { HelpRequestStatus } from '../types/enums';
import { helpRequestApi } from '../../api/helpRequest.service';

interface Options {
   userId?: number;
   status?: HelpRequestStatus;
}

export const useUserOrders = ({ userId, status }: Options) => {
   const [orders, setOrders] = useState<HelpRequest[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      const request = status
         ? helpRequestApi.getByUserAndStatus(userId, status)
         : helpRequestApi.getByUser(userId);

      request
         .then((res) => setOrders(res.data))
         .catch(() => setError('Не удалось загрузить заявки'))
         .finally(() => setLoading(false));
   }, [userId, status]);

   return {
      orders,
      loading,
      error,
   };
};
