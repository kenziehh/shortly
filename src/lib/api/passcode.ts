export async function verifyPasswordApi({ shortCode, password }: { shortCode: string; password: string }) {
  const res = await fetch('/api/urls/verify-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shortCode, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Incorrect password. Please try again.');
  }

  return data;
}
