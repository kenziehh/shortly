import { useMutation } from '@tanstack/react-query';
import { verifyPasswordApi } from '@/lib/api/passcode';

export function useVerifyPassword() {
  return useMutation({
    mutationFn: verifyPasswordApi,
  });
}
