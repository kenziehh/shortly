import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchUrlsApi,
  createUrlApi,
  updateUrlApi,
  deleteUrlApi,
  toggleUrlStatusApi,
  type FetchUrlsParams,
} from '@/lib/api/urls';

export const URLS_QUERY_KEY = 'urls';

/**
 * Custom Hook for Fetching URLs with React Query
 */
export function useGetUrls(params: FetchUrlsParams, enabled: boolean = true) {
  return useQuery({
    queryKey: [URLS_QUERY_KEY, params.search, params.status, params.page, params.limit],
    queryFn: () => fetchUrlsApi(params),
    enabled,
  });
}

/**
 * Custom Hook for Creating a Short URL
 */
export function useCreateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUrlApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URLS_QUERY_KEY] });
      toast.success('Short link created successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create short link.');
    },
  });
}

/**
 * Custom Hook for Updating a Short URL
 */
export function useUpdateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUrlApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URLS_QUERY_KEY] });
      toast.success('Short link settings updated successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update short link.');
    },
  });
}

/**
 * Custom Hook for Deleting a Short URL
 */
export function useDeleteUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUrlApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URLS_QUERY_KEY] });
      toast.success('Short link deleted permanently.');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete short link.');
    },
  });
}

/**
 * Custom Hook for Toggling URL Active Status
 */
export function useToggleUrlStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUrlStatusApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [URLS_QUERY_KEY] });
      toast.success(`Link ${variables.isActive ? 'activated' : 'deactivated'} successfully.`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to change link status.');
    },
  });
}
