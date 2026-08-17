import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Please log in first to access the dashboard.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all'; // all, active, expired

    const now = new Date();

    const urls = await prisma.url.findMany({
      where: {
        userId: user.id,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { originalUrl: { contains: search, mode: 'insensitive' } },
                  { shortCode: { contains: search, mode: 'insensitive' } },
                  { customAlias: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          status === 'active'
            ? {
                isActive: true,
                OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
              }
            : status === 'expired'
            ? {
                OR: [
                  { isActive: false },
                  { expiresAt: { lte: now } },
                ],
              }
            : {},
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { clicks: true },
        },
      },
    });

    return NextResponse.json({ urls });
  } catch (error: any) {
    console.error('Fetch URLs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch URLs data.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Please log in to shorten URLs.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { originalUrl, customAlias, title, password, expiresAt, maxClicks } = body;

    if (!originalUrl) {
      return NextResponse.json(
        { error: 'Destination (Original URL) is required.' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl = originalUrl.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    try {
      new URL(validUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please enter a complete web URL.' },
        { status: 400 }
      );
    }

    // Check URL limit quota for user
    const currentUrlCount = await prisma.url.count({
      where: { userId: user.id },
    });

    if (currentUrlCount >= user.maxUrlLimit) {
      return NextResponse.json(
        {
          error: `Maximum URL limit (${user.maxUrlLimit} links) reached. Delete older links or contact support to upgrade quota.`,
        },
        { status: 403 }
      );
    }

    // Handle shortCode / customAlias
    let shortCode = nanoid(7);
    if (customAlias && customAlias.trim()) {
      const rawAlias = customAlias.trim();

      if (rawAlias.includes('/')) {
        return NextResponse.json(
          { error: 'Custom alias cannot contain slashes (/). Enter only the path slug.' },
          { status: 400 }
        );
      }

      const aliasClean = rawAlias.toLowerCase().replace(/[^a-z0-9_-]/g, '');

      if (aliasClean !== rawAlias.toLowerCase()) {
        return NextResponse.json(
          { error: 'Custom alias contains invalid characters. Only letters, numbers, hyphens (-), and underscores (_) are allowed.' },
          { status: 400 }
        );
      }

      if (aliasClean.length < 3) {
        return NextResponse.json(
          { error: 'Custom alias must be at least 3 characters long.' },
          { status: 400 }
        );
      }

      // Check if alias is reserved or existing
      const existingAlias = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode: aliasClean }, { customAlias: aliasClean }],
        },
      });

      if (existingAlias) {
        return NextResponse.json(
          { error: `Alias "${aliasClean}" is already taken. Please choose another.` },
          { status: 400 }
        );
      }

      shortCode = aliasClean;
    }

    // Password hashing if password set
    let hashedPassword: string | null = null;
    if (password && password.trim()) {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
    }

    // Parsed expiration date
    let expirationDate: Date | null = null;
    if (expiresAt) {
      const date = new Date(expiresAt);
      if (!isNaN(date.getTime())) {
        expirationDate = date;
      }
    }

    // Parsed max clicks
    let maxClickLimit: number | null = null;
    if (maxClicks && !isNaN(parseInt(maxClicks))) {
      maxClickLimit = Math.max(1, parseInt(maxClicks));
    }

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: validUrl,
        shortCode,
        customAlias: customAlias ? shortCode : null,
        title: title?.trim() || new URL(validUrl).hostname,
        password: hashedPassword,
        expiresAt: expirationDate,
        maxClicks: maxClickLimit,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Short URL successfully created!',
        url: {
          ...newUrl,
          hasPassword: !!newUrl.password,
          password: undefined, // Hide hashed password
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create URL error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create short URL.' },
      { status: 500 }
    );
  }
}
