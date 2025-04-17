import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import {
  AuthResponse,
  AuthBody,
  AuthSignUpBody,
  AuthSignUpResponse,
} from '@/types/auth/auth.types';

export function SignIn(
  options?: UseMutationOptions<AuthResponse, ApiError, AuthBody>
) {
  return useMutation<AuthResponse, ApiError, AuthBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'auth/signin',
        method: 'POST',
        body: {
          email: body.email,
          password: body.password,
        },
      });
    },
    ...options,
  });
}

export function SignUpUser(
  options?: UseMutationOptions<AuthSignUpResponse, ApiError, AuthSignUpBody>
) {
  return useMutation<AuthSignUpResponse, ApiError, AuthSignUpBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'auth/signup',
        method: 'POST',
        body: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
    },
    ...options,
  });
}
