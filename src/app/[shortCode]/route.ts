import { NextResponse } from 'next/server';
import { UrlService } from '@/services/urlService';
import { AnalyticsService } from '@/services/analyticsService';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const rawCode = shortCode.trim();

    // Find URL by Code or Alias via UrlService
    const urlItem = await UrlService.findByCodeOrAlias(rawCode);

    if (!urlItem) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>404 - Link Not Found | Shortly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .box { border: 1px solid #e2e8f0; padding: 48px 40px; background: #ffffff; max-width: 480px; width: 100%; border-radius: 24px; text-align: center; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06); }
            h1 { font-family: 'Plus Jakarta Sans', sans-serif; color: #0038b1; font-size: 54px; margin: 0; font-weight: 800; line-height: 1; }
            h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; margin: 12px 0 8px; color: #0f172a; font-weight: 700; }
            p { color: #64748b; font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 32px; border-radius: 14px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
            a:hover { background: #00257e; transform: scale(0.98); }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>404</h1>
            <h2>Link Not Found</h2>
            <p>The short link <strong>${rawCode}</strong> is not registered in our system.</p>
            <a href="/">Back to Home</a>
          </div>
        </body>
        </html>`,
        { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 404 }
      );
    }

    const now = new Date();
    const isExpiredDate = urlItem.expiresAt && urlItem.expiresAt <= now;
    const isMaxClicksReached = urlItem.maxClicks && urlItem.clickCount >= urlItem.maxClicks;

    if (!urlItem.isActive || isExpiredDate || isMaxClicksReached) {
      if (urlItem.isActive && (isExpiredDate || isMaxClicksReached)) {
        await prisma.url.update({
          where: { id: urlItem.id },
          data: { isActive: false },
        });
      }

      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Link Expired | Shortly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .box { border: 1px solid #e2e8f0; padding: 48px 40px; background: #ffffff; max-width: 480px; width: 100%; border-radius: 24px; text-align: center; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06); }
            h1 { font-family: 'Plus Jakarta Sans', sans-serif; color: #dc2626; font-size: 32px; margin: 0 0 12px; font-weight: 800; }
            p { color: #64748b; font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 32px; border-radius: 14px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
            a:hover { background: #00257e; transform: scale(0.98); }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>Link Expired</h1>
            <p>This short link is inactive, has reached its maximum click limit, or has passed its expiration date.</p>
            <a href="/">Back to Home</a>
          </div>
        </body>
        </html>`,
        { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 410 }
      );
    }

    // Password Protected Check
    if (urlItem.password) {
      return NextResponse.redirect(new URL(`/pass/${rawCode}`, req.url));
    }

    // Record Click Analytics Telemetry in Background Service
    await AnalyticsService.recordClick(urlItem.id);

    // Redirect to Original Target URL
    return NextResponse.redirect(urlItem.originalUrl, { status: 307 });
  } catch (err) {
    console.error('Redirect error:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
