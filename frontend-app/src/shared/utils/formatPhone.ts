export const formatPhone = (value: string): string => {
   const digits = value.replace(/\D/g, '');

   const normalized = digits.startsWith('7')
      ? digits.slice(1)
      : digits.startsWith('8')
        ? digits.slice(1)
        : digits;

   let result = '+7';

   if (normalized.length > 0) {
      result += ' (' + normalized.slice(0, 3);
   }
   if (normalized.length >= 4) {
      result += ') ' + normalized.slice(3, 6);
   }
   if (normalized.length >= 7) {
      result += '-' + normalized.slice(6, 8);
   }
   if (normalized.length >= 9) {
      result += '-' + normalized.slice(8, 10);
   }

   return result;
};
