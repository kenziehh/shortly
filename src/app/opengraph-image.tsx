import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shortly - Technical URL Shortener & Analytics Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundImage: 'linear-gradient(to bottom right, #091b38, #0038b1, #1e1b4b)',
          padding: '60px 80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '28px',
              color: '#091b38',
            }}
          >
            S
          </div>
          <span style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            Shortly
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#38bdf8',
            }}
          >
            Enterprise Link Infrastructure
          </div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: '900px',
              color: '#ffffff',
            }}
          >
            Precision URL Shortener & Telemetry Analytics
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              maxWidth: '850px',
              marginTop: '8px',
            }}
          >
            Custom branded domains, password protection, expiry control, and real-time geographic telemetry.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '20px', color: '#cbd5e1' }}>shortly.app</span>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: '18px',
              color: '#38bdf8',
              fontWeight: 600,
            }}
          >
            <span>Custom Aliases</span>
            <span>•</span>
            <span>Analytics</span>
            <span>•</span>
            <span>QR Generator</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
