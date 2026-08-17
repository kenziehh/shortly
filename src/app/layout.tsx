import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import Navbar from '@/components/Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
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
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-['Inter']">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          
          {/* Rich Enterprise SaaS Footer */}
          <footer className="border-t border-[#e2e8f0] bg-white pt-12 pb-8 mt-16">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Info */}
                <div className="space-y-3">
                  <Link href="/" className="inline-block">
                    <span className="font-heading text-2xl font-extrabold tracking-tight text-[#0038b1]">
                      Shortly<span className="text-[#091b38]">.</span>
                    </span>
                  </Link>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    The premium link management platform with precision analytics telemetry, custom aliases, and enterprise security.
                  </p>
                </div>

                {/* Product Links */}
                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold text-[#0f172a] uppercase tracking-wider">Product</div>
                  <ul className="space-y-1.5 text-xs text-[#64748b]">
                    <li><Link href="/#how-it-works" className="hover:text-[#0038b1]">How It Works</Link></li>
                    <li><Link href="/#features" className="hover:text-[#0038b1]">Features & Security</Link></li>
                    <li><Link href="/#pricing" className="hover:text-[#0038b1]">Pricing Plans</Link></li>
                    <li><Link href="/dashboard" className="hover:text-[#0038b1]">Dashboard Console</Link></li>
                  </ul>
                </div>

                {/* Resources Links */}
                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold text-[#0f172a] uppercase tracking-wider">Resources</div>
                  <ul className="space-y-1.5 text-xs text-[#64748b]">
                    <li><Link href="/#faq" className="hover:text-[#0038b1]">FAQs</Link></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">API Documentation</span></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">Edge Status SLA</span></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">Developer Portal</span></li>
                  </ul>
                </div>

                {/* Legal & Compliance */}
                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold text-[#0f172a] uppercase tracking-wider">Legal</div>
                  <ul className="space-y-1.5 text-xs text-[#64748b]">
                    <li><span className="hover:text-[#0038b1] cursor-pointer">Privacy Policy</span></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">Terms of Service</span></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">Security & Encryption</span></li>
                    <li><span className="hover:text-[#0038b1] cursor-pointer">GDPR Compliance</span></li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#e2e8f0] text-center text-xs text-[#64748b] font-mono">
                &copy; 2026 Shortly Inc. All rights reserved. High-Performance Precision Link Platform.
              </div>
            </div>
          </footer>

          <Toaster richColors position="top-right" closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
