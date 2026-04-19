import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '@/lib/axios';
import type { ApiResponse, User } from '@/types/api';
import type { LoginFormData, RegisterFormData } from './schemas';

async function getCsrfCookie() {
  await axiosInstance.get('/sanctum/csrf-cookie');
}

export function useCurrentUser() {
  return useQuery<ApiResponse<User>>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<User>>('/user');
      return data;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      await getCsrfCookie();
      const { data } = await axiosInstance.post<ApiResponse<null>>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message || 'Logged in successfully');
      navigate('/');
    },
    onError: (error, _variables, _context) => {
      if (!axios.isAxiosError(error) || error.response?.status !== 422) {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterFormData) => {
      await getCsrfCookie();
      const { data } = await axiosInstance.post<ApiResponse<User>>('/auth/register', payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message || 'Account created successfully');
      navigate('/');
    },
    onError: (error) => {
      if (!axios.isAxiosError(error) || error.response?.status !== 422) {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post<ApiResponse<null>>('/auth/logout');
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message || 'Logged out successfully');
      navigate('/login');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });
}
