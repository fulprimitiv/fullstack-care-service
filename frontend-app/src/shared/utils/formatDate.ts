export const formatDate = (dateStr: string | undefined): string => {
   if (dateStr !== undefined) {
      return new Date(dateStr).toLocaleDateString('ru-RU', {
         day: '2-digit',
         month: 'long',
         year: 'numeric',
      });
   }
   return 'Дата не указана';
};
