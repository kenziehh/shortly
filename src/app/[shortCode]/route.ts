import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const rawCode = shortCode.trim();
    const lowerCode = rawCode.toLowerCase();

    // Find URL by shortCode or customAlias (exact & case-insensitive for nanoid uppercase/lowercase codes)
    const urlItem = await prisma.url.findFirst({
      where: {
        OR: [
          { shortCode: rawCode },
          { customAlias: rawCode },
          { shortCode: lowerCode },
          { customAlias: lowerCode },
          { shortCode: { equals: rawCode, mode: 'insensitive' } },
          { customAlias: { equals: rawCode, mode: 'insensitive' } },
        ],
      },
    });

    if (!urlItem) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>404 - Link Not Found | Shortly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; background: #f9f9ff; color: #091b38; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .box { border: 1px solid rgba(196, 197, 214, 0.5); padding: 40px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(32px); max-width: 480px; width: 100%; border-radius: 24px; text-align: center; box-shadow: 0 16px 64px rgba(9, 27, 56, 0.08); }
            h1 { font-family: 'Space Grotesk', sans-serif; color: #0038b1; font-size: 56px; margin: 0 0 10px; font-weight: 800; }
            h2 { font-family: 'Space Grotesk', sans-serif; color: #091b38; font-size: 24px; margin: 0 0 12px; }
            p { color: #5b5e68; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; transition: all 0.2s; }
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

    // Check expiration
    const isExpiredDate = urlItem.expiresAt && urlItem.expiresAt <= now;
    const isMaxClicksReached = urlItem.maxClicks && urlItem.clickCount >= urlItem.maxClicks;

    if (!urlItem.isActive || isExpiredDate || isMaxClicksReached) {
      // Deactivate if expired
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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; background: #f9f9ff; color: #091b38; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .box { border: 1px solid rgba(196, 197, 214, 0.5); padding: 40px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(32px); max-width: 480px; width: 100%; border-radius: 24px; text-align: center; box-shadow: 0 16px 64px rgba(9, 27, 56, 0.08); }
            h1 { font-family: 'Space Grotesk', sans-serif; color: #ba1a1a; font-size: 32px; margin: 0 0 12px; font-weight: 800; }
            p { color: #5b5e68; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
            a { display: inline-block; background: #0038b1; color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; transition: all 0.2s; }
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

    // Record Click Analytics
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
    if (/opera|opr/i.test(userAgent)) browser = 'Opera';

    // Update click count and record click
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
          referrer: referrer.includes(req.headers.get('host') || '') ? 'Internal' : referrer,
        },
      }),
    ]);

    // Escape special HTML chars for safe rendering
    const safeTitle = (urlItem.title || urlItem.shortCode).replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const safeUrl = urlItem.originalUrl.replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const safeCode = urlItem.shortCode;

    // Bitly-style Glassmorphism Interstitial Countdown Page (5 Seconds)
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Redirecting to ${safeTitle} | Shortly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: #f9f9ff;
            color: #091b38;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            position: relative;
            overflow-x: hidden;
          }

          .hero-bg {
            position: absolute;
            top: 0; left: 0; right: 0; height: 100%;
            background: radial-gradient(circle at 50% 0%, rgba(215, 226, 255, 0.6) 0%, rgba(249, 249, 255, 0) 70%);
            z-index: 0;
            pointer-events: none;
          }

          .blob1 {
            position: absolute; top: 15%; right: 10%; width: 280px; height: 280px;
            background: #d7e2ff; border-radius: 50%; filter: blur(90px); opacity: 0.6; pointer-events: none; z-index: 0;
          }
          .blob2 {
            position: absolute; bottom: 15%; left: 10%; width: 320px; height: 320px;
            background: #dce1ff; border-radius: 50%; filter: blur(100px); opacity: 0.4; pointer-events: none; z-index: 0;
          }

          .card {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(196, 197, 214, 0.5);
            box-shadow: 0 16px 64px rgba(9, 27, 56, 0.08);
            border-radius: 28px;
            padding: 40px 32px;
            max-width: 480px;
            width: 100%;
            text-align: center;
          }

          .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 28px;
            font-weight: 800;
            color: #0038b1;
            margin-bottom: 24px;
            display: inline-block;
            text-decoration: none;
          }
          .logo span { color: #091b38; }

          .timer-wrapper {
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .timer-svg {
            position: absolute;
            top: 0; left: 0;
            width: 100px; height: 100px;
            transform: rotate(-90deg);
          }

          .timer-bg {
            fill: none;
            stroke: #e8edff;
            stroke-width: 8;
          }

          .timer-circle {
            fill: none;
            stroke: #0038b1;
            stroke-width: 8;
            stroke-linecap: round;
            stroke-dasharray: 264;
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 1s linear;
          }

          .timer-number {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: #0038b1;
          }

          .status-label {
            font-size: 14px;
            color: #5b5e68;
            margin-bottom: 20px;
            font-weight: 500;
          }

          .link-box {
            background: #f1f3ff;
            border: 1px solid rgba(196, 197, 214, 0.4);
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 24px;
            text-align: left;
          }

          .link-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: #091b38;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .link-target {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 12px;
            color: #0038b1;
            word-break: break-all;
          }

          .btn-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .btn-primary {
            background-color: #0038b1;
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            padding: 14px;
            border-radius: 14px;
            border: none;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            box-shadow: 0 8px 24px rgba(0, 56, 177, 0.2);
            transition: all 0.2s ease;
          }

          .btn-primary:hover {
            background-color: #00257e;
            transform: scale(0.98);
          }

          .btn-secondary {
            background-color: #ffffff;
            color: #091b38;
            font-size: 13px;
            font-weight: 600;
            padding: 12px;
            border-radius: 14px;
            border: 1px solid rgba(196, 197, 214, 0.5);
            cursor: pointer;
            width: 100%;
            transition: all 0.2s ease;
          }

          .btn-secondary:hover {
            background-color: #e8edff;
          }
        </style>
      </head>
      <body>
        <div class="hero-bg"></div>
        <div class="blob1"></div>
        <div class="blob2"></div>

        <div class="card">
          <a href="/" class="logo">Shortly<span>.</span></a>

          <div class="timer-wrapper">
            <svg class="timer-svg" viewBox="0 0 100 100">
              <circle class="timer-bg" cx="50" cy="50" r="42"></circle>
              <circle id="timerCircle" class="timer-circle" cx="50" cy="50" r="42"></circle>
            </svg>
            <div id="countdown" class="timer-number">5</div>
          </div>

          <div className="status-label">
            Redirecting to destination in <strong id="secondsText" style="color: #0038b1;">5 seconds</strong>...
          </div>

          <div class="link-box">
            <div class="link-title">${safeTitle}</div>
            <div class="link-target">${safeUrl}</div>
          </div>

          <div class="btn-group">
            <button id="redirectBtn" class="btn-primary">
              Redirect Now &rarr;
            </button>
            <button id="copyBtn" class="btn-secondary">
              Copy Destination URL
            </button>
          </div>
        </div>

        <script>
          const targetUrl = "${safeUrl}";
          let seconds = 5;
          const totalSeconds = 5;
          const circumference = 264;

          const countdownEl = document.getElementById('countdown');
          const secondsTextEl = document.getElementById('secondsText');
          const circleEl = document.getElementById('timerCircle');
          const redirectBtn = document.getElementById('redirectBtn');
          const copyBtn = document.getElementById('copyBtn');

          function triggerRedirect() {
            window.location.href = targetUrl;
          }

          redirectBtn.addEventListener('click', triggerRedirect);

          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(targetUrl);
            copyBtn.innerText = 'Copied!';
            setTimeout(() => copyBtn.innerText = 'Copy Destination URL', 2000);
          });

          const timerInterval = setInterval(() => {
            seconds--;
            if (countdownEl) countdownEl.innerText = seconds;
            if (secondsTextEl) secondsTextEl.innerText = seconds + (seconds === 1 ? ' second' : ' seconds');

            // Update SVG circle stroke offset
            if (circleEl) {
              const offset = circumference - (seconds / totalSeconds) * circumference;
              circleEl.style.strokeDashoffset = offset;
            }

            if (seconds <= 0) {
              clearInterval(timerInterval);
              triggerRedirect();
            }
          }, 1000);
        </script>
      </body>
      </html>`,
      { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 200 }
    );
  } catch (error: any) {
    console.error('Redirect error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
