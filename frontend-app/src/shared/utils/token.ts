import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
   id: number;
   role: 'VOLUNTEER' | 'RECIPIENT';
   sub: string;
   exp: number;
}

export const getToken = () => localStorage.getItem('token');

export const decodeToken = (): JwtPayload | null => {
   const token = getToken();
   if (!token) return null;

   try {
      return jwtDecode<JwtPayload>(token);
   } catch {
      return null;
   }
};
