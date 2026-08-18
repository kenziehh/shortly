export async function fetchUrlAnalyticsApi(id: string) {
  const res = await fetch(`/api/urls/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Analytics data not found or unauthorized');
  }
  return data;
}
