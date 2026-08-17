'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Lock, ArrowRight, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PasswordPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = use(params);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/urls/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortCode, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Incorrect password.');
      }

      toast.success('Password verified! Redirecting...');
      window.location.href = data.originalUrl;
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center pt-[140px] pb-20 px-6">
      {/* Radial Tonal Background Gradient */}
      <div className="hero-bg"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphic Auth Panel */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border border-[#c4c5d6]/50 shadow-[0_16px_64px_rgba(9,27,56,0.08)] bg-white/80 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block mb-2">
              <span className="font-heading text-3xl font-extrabold tracking-tight text-[#0038b1]">
                Shortly<span className="text-[#091b38]">.</span>
              </span>
            </Link>

            <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-heading text-2xl font-extrabold text-[#091b38] tracking-tight">
              Protected Short Link
            </h1>
            <p className="text-xs font-mono text-[#0038b1] font-bold">
              shortly.to/{shortCode}
            </p>
            <p className="text-xs text-[#5b5e68]">
              This link is password protected. Enter the correct password to proceed.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-semibold uppercase text-[#091b38] tracking-wider">
                ENTER PASSWORD
              </label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-[#747685] absolute left-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-glass w-full h-[52px] pl-[44px] pr-4 rounded-xl text-sm text-[#091b38]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white font-semibold text-base shadow-lg shadow-[#0038b1]/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Verifying...' : 'Unlock & Access Link'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#c4c5d6]/30 text-center text-xs text-[#5b5e68]">
            Need help?{' '}
            <Link href="/" className="text-[#0038b1] font-bold hover:underline ml-1">
              Return to Home
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
