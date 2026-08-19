import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The short link or page you are looking for does not exist or may have expired.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center pt-[140px] pb-20 px-6">
      {/* Radial Tonal Background Gradient */}
      <div className="hero-bg"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphic 404 Panel */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border border-[#c4c5d6]/50 shadow-[0_16px_64px_rgba(9,27,56,0.08)] bg-white/80 text-center space-y-6">
          <Link href="/" className="inline-block mb-2">
            <span className="font-heading text-3xl font-extrabold tracking-tight text-[#0038b1]">
              Shortly<span className="text-[#091b38]">.</span>
            </span>
          </Link>

          <div className="w-16 h-16 rounded-3xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mx-auto mb-2">
            <Search className="w-8 h-8" />
          </div>

          <div>
            <span className="font-heading text-6xl font-extrabold text-[#0038b1] block">404</span>
            <h1 className="font-heading text-2xl font-bold text-[#091b38] mt-1">
              Page or Link Not Found
            </h1>
            <p className="text-xs text-[#5b5e68] mt-2 leading-relaxed">
              The short link or page you are looking for doesn't exist, has been deleted, or may have expired.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/">
              <Button className="w-full h-[52px] rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white font-semibold text-base shadow-lg shadow-[#0038b1]/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#d7e2ff] rounded-full blur-[90px] opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#dce1ff] rounded-full blur-[100px] opacity-40 z-0 pointer-events-none"></div>
    </div>
  );
}
