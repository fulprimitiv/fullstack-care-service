export const formatDate = (dateStr: string) => {
   const date = new Date(dateStr);
   return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
   });
};
