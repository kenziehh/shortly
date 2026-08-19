import type { Metadata } from 'next';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shortly.app';

export const metadata: Metadata = {
  title: 'Password Verification',
  description: 'Enter passcode to unlock this protected short link.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Protected Short Link | Shortly',
    description: 'Enter passcode to unlock this protected short link.',
    siteName: 'Shortly',
    images: [
      {
        url: `${appUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Shortly - Technical URL Shortener',
      },
    ],
  },
};

export default function PassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
