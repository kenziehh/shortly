import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import Navbar from '@/components/Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/QueryProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shortly.app';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Shortly - Technical URL Shortener & Precision Analytics Platform',
    template: '%s | Shortly',
  },
  description:
    'Modern link management platform with precision analytics, custom aliases, password protection, expiration dates, and custom QR codes.',
  keywords: [
    'url shortener',
    'link shortener',
    'custom url alias',
    'link analytics',
    'link tracking',
    'qr code generator',
    'password protected links',
    'link expiration',
    'enterprise shortener',
    'shortly',
  ],
  authors: [{ name: 'Shortly Team', url: appUrl }],
  creator: 'Shortly Inc.',
  publisher: 'Shortly Inc.',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/shortly.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Shortly - Technical URL Shortener & Precision Analytics Platform',
    description:
      'Modern link management platform with precision analytics, custom aliases, password protection, expiration dates, and custom QR codes.',
    url: appUrl,
    siteName: 'Shortly',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${appUrl}/og.png`,
        secureUrl: `${appUrl}/og.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Shortly - Technical URL Shortener & Analytics Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shortly - Technical URL Shortener & Precision Analytics Platform',
    description:
      'Modern link management platform with precision analytics, custom aliases, password protection, and expiration dates.',
    creator: '@shortly',
    images: [`${appUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdWebApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Shortly',
  url: appUrl,
  description:
    'Modern link management platform with precision analytics, custom aliases, password protection, and expiration dates.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shortly Inc.',
  url: appUrl,
  logo: `${appUrl}/shortly-nav.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-['Inter']">
        <QueryProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            
            {/* Large Enterprise SaaS Footer */}
            <footer className="border-t border-[#e2e8f0] bg-white pt-16 pb-12 mt-20">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  {/* Brand Info */}
                  <div className="space-y-4">
                    <Link href="/" className="inline-block">
                      <Image
                        src="/shortly-nav.png"
                        alt="Shortly Logo"
                        width={280}
                        height={80}
                        className="h-14 w-auto object-contain"
                      />
                    </Link>
                    <p className="text-base text-[#64748b] leading-relaxed">
                      The premium link management platform with precision analytics telemetry, custom aliases, and enterprise security.
                    </p>
                  </div>

                  {/* Product Links */}
                  <div className="space-y-3">
                    <div className="font-sans text-sm font-bold text-[#0f172a] uppercase tracking-wider">Product</div>
                    <ul className="space-y-2 text-base text-[#64748b]">
                      <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                      <li><Link href="/#features" className="hover:text-primary transition-colors">Features & Security</Link></li>
                      <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
                      <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard Console</Link></li>
                    </ul>
                  </div>

                  {/* Resources Links */}
                  <div className="space-y-3">
                    <div className="font-sans text-sm font-bold text-[#0f172a] uppercase tracking-wider">Resources</div>
                    <ul className="space-y-2 text-base text-[#64748b]">
                      <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">API Documentation</span></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">Edge Status SLA</span></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">Developer Portal</span></li>
                    </ul>
                  </div>

                  {/* Legal & Compliance */}
                  <div className="space-y-3">
                    <div className="font-sans text-sm font-bold text-[#0f172a] uppercase tracking-wider">Legal</div>
                    <ul className="space-y-2 text-base text-[#64748b]">
                      <li><span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">Security & Encryption</span></li>
                      <li><span className="hover:text-primary cursor-pointer transition-colors">GDPR Compliance</span></li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#e2e8f0] text-center text-base text-[#64748b] font-sans">
                  &copy; 2026 Shortly Inc. All rights reserved. High-Performance Precision Link Platform.
                </div>
              </div>
            </footer>

            <Toaster richColors position="top-right" closeButton />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
