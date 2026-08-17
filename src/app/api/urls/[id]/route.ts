import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const urlItem = await prisma.url.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        clicks: {
          orderBy: { timestamp: 'desc' },
          take: 100,
        },
      },
    });

    if (!urlItem) {
      return NextResponse.json(
        { error: 'Short link not found.' },
        { status: 404 }
      );
    }

    // Analytics Aggregation
    const clicks = urlItem.clicks;
    
    // 1. Device breakdown
    const devicesMap: Record<string, number> = {};
    // 2. Browser breakdown
    const browsersMap: Record<string, number> = {};
    // 3. Referrer breakdown
    const referrersMap: Record<string, number> = {};
    // 4. Timeline by Date
    const timelineMap: Record<string, number> = {};

    clicks.forEach((c) => {
      const dev = c.deviceType || 'Desktop';
      devicesMap[dev] = (devicesMap[dev] || 0) + 1;

      const br = c.browser || 'Unknown';
      browsersMap[br] = (browsersMap[br] || 0) + 1;

      const ref = c.referrer || 'Direct / None';
      referrersMap[ref] = (referrersMap[ref] || 0) + 1;

      const dateStr = new Date(c.timestamp).toISOString().split('T')[0];
      timelineMap[dateStr] = (timelineMap[dateStr] || 0) + 1;
    });

    const devices = Object.entries(devicesMap).map(([device, count]) => ({ device, count }));
    const browsers = Object.entries(browsersMap).map(([browser, count]) => ({ browser, count }));
    const referrers = Object.entries(referrersMap).map(([referrer, count]) => ({ referrer, count }));
    const dailyClicks = Object.entries(timelineMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      url: {
        ...urlItem,
        password: undefined,
        hasPassword: !!urlItem.password,
      },
      analytics: {
        totalClicks: urlItem.clickCount,
        devices,
        browsers,
        referrers,
        dailyClicks,
        recentClicks: clicks.slice(0, 20),
      },
    });
  } catch (error: any) {
    console.error('Fetch URL detail error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch link details.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, originalUrl, customAlias, password, removePassword, expiresAt, maxClicks, isActive } = body;

    const existing = await prisma.url.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Short link not found.' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    if (originalUrl !== undefined && originalUrl.trim()) {
      let validUrl = originalUrl.trim();
      if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl;
      }
      try {
        new URL(validUrl);
        updateData.originalUrl = validUrl;
      } catch {
        return NextResponse.json(
          { error: 'Invalid destination URL format.' },
          { status: 400 }
        );
      }
    }

    if (customAlias !== undefined && customAlias.trim()) {
      const rawAlias = customAlias.trim();
      if (rawAlias.includes('/')) {
        return NextResponse.json(
          { error: 'Custom alias cannot contain slashes (/).' },
          { status: 400 }
        );
      }

      const aliasClean = rawAlias.toLowerCase().replace(/[^a-z0-9_-]/g, '');
      if (aliasClean !== rawAlias.toLowerCase()) {
        return NextResponse.json(
          { error: 'Custom alias contains invalid characters. Only letters, numbers, -, _ are allowed.' },
          { status: 400 }
        );
      }

      if (aliasClean.length < 3) {
        return NextResponse.json(
          { error: 'Custom alias must be at least 3 characters long.' },
          { status: 400 }
        );
      }

      // Check if another link uses this alias
      if (aliasClean !== existing.shortCode && aliasClean !== existing.customAlias) {
        const taken = await prisma.url.findFirst({
          where: {
            id: { not: id },
            OR: [{ shortCode: aliasClean }, { customAlias: aliasClean }],
          },
        });
        if (taken) {
          return NextResponse.json(
            { error: `Alias "${aliasClean}" is already taken by another link.` },
            { status: 400 }
          );
        }
      }

      updateData.shortCode = aliasClean;
      updateData.customAlias = aliasClean;
    }

    if (removePassword) {
      updateData.password = null;
    } else if (password !== undefined && password.trim()) {
      updateData.password = await bcrypt.hash(password.trim(), 10);
    }

    if (expiresAt !== undefined) {
      if (expiresAt) {
        const date = new Date(expiresAt);
        updateData.expiresAt = !isNaN(date.getTime()) ? date : null;
      } else {
        updateData.expiresAt = null;
      }
    }

    if (maxClicks !== undefined) {
      if (maxClicks && !isNaN(parseInt(maxClicks))) {
        updateData.maxClicks = Math.max(1, parseInt(maxClicks));
      } else {
        updateData.maxClicks = null;
      }
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    const updated = await prisma.url.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: 'Short link updated successfully!',
      url: {
        ...updated,
        hasPassword: !!updated.password,
        password: undefined,
      },
    });
  } catch (error: any) {
    console.error('Update URL error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update short link.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.url.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Short link not found.' },
        { status: 404 }
      );
    }

    await prisma.url.delete({ where: { id } });

    return NextResponse.json({ message: 'Short link deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete short link.' },
      { status: 500 }
    );
  }
}
