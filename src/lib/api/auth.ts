export async function fetchCurrentUserApi() {
  const res = await fetch('/api/auth/me');
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Unauthorized');
  }
  return data.user;
}

export async function loginApi(payload: any) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Invalid credentials.');
  }
  return data.user;
}

export async function registerApi(payload: any) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Registration failed.');
  }
  return data.user;
}

export async function logoutApi() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Logout failed.');
  }
  return data;
}
