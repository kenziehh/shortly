import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
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

export const metadata: Metadata = {
  title: 'Shortly - Technical URL Shortener & Analytics Platform',
  description:
    'Modern link management platform with precision analytics, custom aliases, password protection, and expiration dates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${poppins.variable}`}>
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
                      <span className="font-heading text-3xl font-extrabold tracking-tight text-primary">
                        Shortly<span className="text-foreground">.</span>
                      </span>
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
