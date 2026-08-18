export interface FetchUrlsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface UrlsApiResponse {
  urls: any[];
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Fetch URLs with search, filter, and pagination
 */
export async function fetchUrlsApi({
  search = '',
  status = 'all',
  page = 1,
  limit = 10,
}: FetchUrlsParams): Promise<UrlsApiResponse> {
  const params = new URLSearchParams({
    search,
    status,
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`/api/urls?${params.toString()}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch URLs');
  }

  return data;
}

/**
 * Create a new short URL
 */
export async function createUrlApi(payload: any) {
  const res = await fetch('/api/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create short link.');
  }

  return data;
}

/**
 * Update an existing short URL
 */
export async function updateUrlApi({ id, payload }: { id: string; payload: any }) {
  const res = await fetch(`/api/urls/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    let msg = data.error || 'Failed to update short link.';
    if (Array.isArray(data.details)) {
      msg = data.details[0]?.message || msg;
    }
    throw new Error(msg);
  }

  return data;
}

/**
 * Delete a short URL
 */
export async function deleteUrlApi(id: string) {
  const res = await fetch(`/api/urls/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete short link.');
  }

  return data;
}

/**
 * Toggle short URL active status
 */
export async function toggleUrlStatusApi({ id, isActive }: { id: string; isActive: boolean }) {
  const res = await fetch(`/api/urls/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update link status.');
  }

  return data;
}
