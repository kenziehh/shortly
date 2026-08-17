import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const urlCount = await prisma.url.count({
      where: { userId: user.id },
    });

    return NextResponse.json({
      user: {
        ...user,
        urlCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
