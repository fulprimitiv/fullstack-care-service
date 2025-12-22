import api from './axios';
import type {
   CreateUserCommand,
   SignInRequest,
   JwtAuthenticationResponse,
} from '../shared/types/auth';

export const authApi = {
   signUp: (data: CreateUserCommand) =>
      api.post<JwtAuthenticationResponse>('/auth/sign-up', data).then((res) => res.data),

   signIn: (data: SignInRequest) =>
      api.post<JwtAuthenticationResponse>('/auth/sign-in', data).then((res) => res.data),
};
