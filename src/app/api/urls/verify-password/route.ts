import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { shortCode, password } = await req.json();

    if (!shortCode || !password) {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    const code = shortCode.trim().toLowerCase();
    const urlItem = await prisma.url.findFirst({
      where: {
        OR: [{ shortCode: code }, { customAlias: code }],
      },
    });

    if (!urlItem || !urlItem.password) {
      return NextResponse.json(
        { error: 'Invalid short link.' },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, urlItem.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Log Click
    const reqHeaders = await headers();
    const userAgent = reqHeaders.get('user-agent') || 'Unknown';
    const referrer = reqHeaders.get('referer') || 'Direct';
    const ip = reqHeaders.get('x-forwarded-for') || '127.0.0.1';

    let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'Mobile';
    if (/tablet|ipad/i.test(userAgent)) deviceType = 'Tablet';

    let browser = 'Chrome/Safari';
    if (/firefox/i.test(userAgent)) browser = 'Firefox';
    if (/edg/i.test(userAgent)) browser = 'Edge';

    await Promise.all([
      prisma.url.update({
        where: { id: urlItem.id },
        data: { clickCount: { increment: 1 } },
      }),
      prisma.click.create({
        data: {
          urlId: urlItem.id,
          ipAddress: ip,
          userAgent,
          deviceType,
          browser,
          referrer,
        },
      }),
    ]);

    return NextResponse.json({
      originalUrl: urlItem.originalUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to verify password.' },
      { status: 500 }
    );
  }
}
