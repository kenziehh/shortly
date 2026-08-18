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
            .logo-img { height: 56px; width: auto; max-width: 280px; margin: 0 auto 16px; display: block; object-fit: contain; }
            h1 { font-family: 'Plus Jakarta Sans', sans-serif; color: #0038b1; font-size: 54px; margin: 0; font-weight: 800; line-height: 1; }
            h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; margin: 12px 0 8px; color: #0f172a; font-weight: 700; }
            p { color: #64748b; font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 32px; border-radius: 14px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
            a:hover { background: #00257e; transform: scale(0.98); }
          </style>
        </head>
        <body>
          <div class="box">
            <img src="/shortly-nav.png" alt="Shortly Logo" class="logo-img" />
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
    const isExpiredDate = urlItem.expiresAt && new Date(urlItem.expiresAt) <= now;
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
            .logo-img { height: 56px; width: auto; max-width: 280px; margin: 0 auto 16px; display: block; object-fit: contain; }
            h1 { font-family: 'Plus Jakarta Sans', sans-serif; color: #dc2626; font-size: 32px; margin: 0 0 12px; font-weight: 800; }
            p { color: #64748b; font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 32px; border-radius: 14px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
            a:hover { background: #00257e; transform: scale(0.98); }
          </style>
        </head>
        <body>
          <div class="box">
            <img src="/shortly-nav.png" alt="Shortly Logo" class="logo-img" />
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

    // Render Premium Circular SVG Progress Bar Interstitial Redirect Page with Enriched Brand Logo
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Redirecting... | Shortly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; box-sizing: border-box; }
          .card { border: 1px solid #e2e8f0; padding: 48px 40px; background: #ffffff; max-width: 480px; width: 100%; border-radius: 28px; text-align: center; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08); }
          .brand-logo { height: 64px; width: auto; max-width: 280px; margin: 0 auto 20px; display: block; object-fit: contain; }
          .subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 24px; }
          
          /* Circular Progress Ring */
          .circle-wrapper { position: relative; width: 120px; height: 120px; margin: 0 auto 24px; }
          .circle-svg { transform: rotate(-90deg); width: 120px; height: 120px; }
          .circle-bg { fill: none !important; stroke: #f1f5f9; stroke-width: 8; }
          .circle-progress { fill: none !important; stroke: #0038b1; stroke-width: 8; stroke-linecap: round; stroke-dasharray: 283; stroke-dashoffset: 0; transition: stroke-dashoffset 0.05s linear; }
          .number-inside { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; font-weight: 800; color: #0038b1; }

          .dest { font-family: 'Poppins', sans-serif; font-size: 14px; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 18px; border-radius: 14px; font-weight: 600; word-break: break-all; margin-bottom: 24px; display: inline-block; max-width: 100%; box-sizing: border-box; }
          .btn { display: inline-flex; align-items: center; justify-content: center; background: #0038b1; color: white; text-decoration: none; padding: 14px 32px; border-radius: 14px; font-weight: 600; font-size: 15px; transition: all 0.2s; cursor: pointer; border: none; width: 100%; box-sizing: border-box; }
          .btn:hover { background: #00257e; transform: scale(0.99); }
          .timer-text { font-size: 14px; color: #64748b; margin-top: 14px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="card">
          <img src="/shortly-nav.png" alt="Shortly Logo" class="brand-logo" />
          <div class="subtitle">Redirecting to destination</div>
          
          <div class="circle-wrapper">
            <svg class="circle-svg" viewBox="0 0 100 100">
              <circle class="circle-bg" cx="50" cy="50" r="45" fill="none"></circle>
              <circle id="progressCircle" class="circle-progress" cx="50" cy="50" r="45" fill="none"></circle>
            </svg>
            <div id="countdownNum" class="number-inside">3</div>
          </div>

          <div class="dest">${urlItem.originalUrl}</div>

          <a href="${urlItem.originalUrl}" id="redirectBtn" class="btn">Go to destination now &rarr;</a>
          <div class="timer-text">Taking too long? Click above to skip.</div>
        </div>

        <script>
          var targetUrl = ${JSON.stringify(urlItem.originalUrl)};
          var duration = 3000;
          var circumference = 283;
          var startTime = Date.now();

          var circleElem = document.getElementById('progressCircle');
          var numElem = document.getElementById('countdownNum');

          var interval = setInterval(function() {
            var elapsed = Date.now() - startTime;
            var pct = Math.min(1, elapsed / duration);
            
            var offset = circumference * (1 - pct);
            if (circleElem) circleElem.style.strokeDashoffset = offset;
            
            var remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
            if (numElem) numElem.textContent = remaining;

            if (elapsed >= duration) {
              clearInterval(interval);
              window.location.href = targetUrl;
            }
          }, 50);
        </script>
      </body>
      </html>`,
      { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 200 }
    );
  } catch (err) {
    console.error('Redirect error:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
