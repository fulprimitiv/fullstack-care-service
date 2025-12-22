import api from './axios';
import type { User } from '../shared/types/user';

export const userApi = {
   getById: (id: number) => api.get<User>(`/user/${id}`).then((res) => res.data),
};
