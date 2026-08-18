import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchCurrentUserApi, loginApi, registerApi, logoutApi } from '@/lib/api/auth';

export const AUTH_USER_QUERY_KEY = ['auth', 'me'];

/**
 * Hook to get current logged in user session
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: fetchCurrentUserApi,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: false,
  });
}

/**
 * Hook for User Login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, user);
      toast.success(`Welcome back, ${user.name || user.email}!`);
      window.location.href = '/dashboard';
    },
    onError: (err: any) => {
      toast.error(err.message || 'Invalid credentials.');
    },
  });
}

/**
 * Hook for User Registration
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, user);
      toast.success('Account created successfully!');
      window.location.href = '/dashboard';
    },
    onError: (err: any) => {
      toast.error(err.message || 'Registration failed.');
    },
  });
}

/**
 * Hook for User Logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, null);
      queryClient.clear();
      toast.success('Logged out successfully.');
      window.location.href = '/login';
    },
    onError: (err: any) => {
      toast.error(err.message || 'Logout failed.');
    },
  });
}
