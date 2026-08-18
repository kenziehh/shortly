import { prisma } from '@/lib/prisma';
import { hashPassword, comparePassword, createAuthToken, setAuthCookie, clearAuthCookie } from '@/lib/auth';
import type { LoginFormValues, RegisterFormValues } from '@/lib/validations/auth';

export class AuthService {
  /**
   * Register a new User account
   */
  static async register(input: RegisterFormValues) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existing) {
      throw new Error('Email address is already registered.');
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        maxUrlLimit: true,
      },
    });

    const token = await createAuthToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return user;
  }

  /**
   * Login User and set Auth Cookie
   */
  static async login(input: LoginFormValues) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = await comparePassword(input.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    const token = await createAuthToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      maxUrlLimit: user.maxUrlLimit,
    };
  }

  /**
   * Logout User by clearing Cookie
   */
  static async logout() {
    await clearAuthCookie();
  }

  /**
   * Get Current Authenticated User Details with URL Count
   */
  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        maxUrlLimit: true,
        _count: {
          select: { urls: true },
        },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      maxUrlLimit: user.maxUrlLimit,
      urlCount: user._count.urls,
    };
  }
}
