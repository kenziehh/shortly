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

    // Process Devices Breakdown
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

    return {
      url: {
        id: urlItem.id,
        shortCode: urlItem.shortCode,
        customAlias: urlItem.customAlias,
        originalUrl: urlItem.originalUrl,
        title: urlItem.title,
        clickCount: urlItem.clickCount,
        maxClicks: urlItem.maxClicks,
        expiresAt: urlItem.expiresAt,
        isActive: urlItem.isActive,
        createdAt: urlItem.createdAt,
      },
      telemetry: {
        totalClicks: urlItem.clickCount,
        devices: Object.entries(devicesMap).map(([name, count]) => ({ name, count })),
        browsers: Object.entries(browsersMap).map(([name, count]) => ({ name, count })),
        referrers: Object.entries(referrersMap).map(([name, count]) => ({ name, count })),
        recentClicks: urlItem.clicks.slice(0, 20),
      },
    };
  }
}
