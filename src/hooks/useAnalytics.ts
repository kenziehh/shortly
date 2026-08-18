import { useQuery } from '@tanstack/react-query';
import { fetchUrlAnalyticsApi } from '@/lib/api/analytics';

export function useGetUrlAnalytics(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['analytics', id],
    queryFn: () => fetchUrlAnalyticsApi(id),
    enabled: enabled && !!id,
  });
}
