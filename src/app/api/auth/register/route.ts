import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered. Please log in.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        passwordHash,
        maxUrlLimit: 50,
      },
    });

    const token = await createToken({ userId: user.id, email: user.email });

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          maxUrlLimit: user.maxUrlLimit,
        },
      },
      { status: 201 }
    );

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to register account.' },
      { status: 500 }
    );
  }
}
