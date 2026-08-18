import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export class AnalyticsService {
  /**
   * Record Click Event and Increment Telemetry Counter
   */
  static async recordClick(urlId: string, requestHeaders?: Headers) {
    let reqHeaders: Headers;
    if (requestHeaders) {
      reqHeaders = requestHeaders;
    } else {
      reqHeaders = await headers();
    }

    const userAgent = reqHeaders.get('user-agent') || 'Unknown';
    const referrer = reqHeaders.get('referer') || 'Direct';
    const ip = reqHeaders.get('x-forwarded-for') || '127.0.0.1';

    // Parse Device & Browser Simple Telemetry
    let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'Mobile';
    if (/ipad|tablet/i.test(userAgent)) deviceType = 'Tablet';

    let browser = 'Other';
    if (/chrome/i.test(userAgent)) browser = 'Chrome';
    else if (/safari/i.test(userAgent)) browser = 'Safari';
    else if (/firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/edge/i.test(userAgent)) browser = 'Edge';

    // Increment Total Click Counter & Log Event Transactionally
    await prisma.$transaction([
      prisma.url.update({
        where: { id: urlId },
        data: { clickCount: { increment: 1 } },
      }),
      prisma.click.create({
        data: {
          urlId,
          ipAddress: ip.split(',')[0].trim(),
          userAgent,
          referrer,
          deviceType,
          browser,
        },
      }),
    ]);
  }

  /**
   * Get Detailed Analytics Telemetry for Dashboard Analytics Page
   */
  static async getUrlAnalytics(urlId: string, userId: string) {
    const urlItem = await prisma.url.findFirst({
      where: { id: urlId, userId },
      include: {
        clicks: {
          orderBy: { timestamp: 'desc' },
          take: 100,
        },
      },
    });

    if (!urlItem) {
      throw new Error('Short link not found or access denied.');
    }

    // Process Devices, Browsers & Referrers Breakdown
    const devicesMap: Record<string, number> = {};
    const browsersMap: Record<string, number> = {};
    const referrersMap: Record<string, number> = {};

    urlItem.clicks.forEach((c: any) => {
      const d = c.deviceType || 'Desktop';
      const b = c.browser || 'Other';
      const r = c.referrer || 'Direct';

      devicesMap[d] = (devicesMap[d] || 0) + 1;
      browsersMap[b] = (browsersMap[b] || 0) + 1;
      referrersMap[r] = (referrersMap[r] || 0) + 1;
    });

    // Process Daily Clicks Trend (Past 7 Days)
    const dailyMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      dailyMap[dateStr] = 0;
    }

    urlItem.clicks.forEach((c: any) => {
      const dateStr = new Date(c.timestamp).toISOString().slice(0, 10);
      if (dailyMap[dateStr] !== undefined) {
        dailyMap[dateStr] += 1;
      }
    });

    const dailyClicks = Object.entries(dailyMap).map(([date, count]) => ({
      date,
      count,
    }));

    const telemetryData = {
      totalClicks: urlItem.clickCount,
      dailyClicks,
      devices: Object.entries(devicesMap).map(([name, count]) => ({ name, count, device: name })),
      browsers: Object.entries(browsersMap).map(([name, count]) => ({ name, count, browser: name })),
      referrers: Object.entries(referrersMap).map(([name, count]) => ({ name, count, referrer: name })),
      recentClicks: urlItem.clicks.slice(0, 20),
    };

    return {
      url: {
        id: urlItem.id,
        shortCode: urlItem.shortCode,
        customAlias: urlItem.customAlias,
        originalUrl: urlItem.originalUrl,
        title: urlItem.title,
        password: urlItem.password,
        clickCount: urlItem.clickCount,
        maxClicks: urlItem.maxClicks,
        expiresAt: urlItem.expiresAt,
        isActive: urlItem.isActive,
        createdAt: urlItem.createdAt,
      },
      analytics: telemetryData,
      telemetry: telemetryData,
    };
  }
}
