import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-super-secret-key-shortly-2026'
);

const TOKEN_NAME = 'auth_token';

export interface UserPayload {
  userId: string;
  email: string;
}

/**
 * Sign JWT Token for User Session
 */
export async function createAuthToken(payload: UserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verify JWT Token
 */
export async function verifyAuthToken(token: string): Promise<UserPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as UserPayload;
  } catch {
    return null;
  }
}

/**
 * Extract & Verify Session User from Next.js Server Cookies
 */
export async function getSessionUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

/**
 * Set Session Cookie on Response
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear Session Cookie on Logout
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
}

/**
 * Hash Password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify Password against Hash
 */
export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}
