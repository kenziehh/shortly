'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Lock, ArrowRight, KeyRound } from 'lucide-react';
import { useVerifyPassword } from '@/hooks/usePasscode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PasswordPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = use(params);
  const [password, setPassword] = useState('');
  const verifyMutation = useVerifyPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    verifyMutation.mutate(
      { shortCode, password },
      {
        onSuccess: (data) => {
          toast.success('Password verified! Redirecting...');
          window.location.href = data.originalUrl;
        },
        onError: (err: any) => {
          toast.error(err.message || 'Incorrect password.');
        },
      }
    );
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 bg-[#f8fafc]">
      <div className="w-full max-w-md relative z-10">
        {/* Auth Panel */}
        <div className="rounded-3xl p-8 md:p-10 border border-[#e2e8f0] shadow-xl bg-white space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/shortly-nav.png"
                alt="Shortly Logo"
                width={280}
                height={80}
                priority
                className="h-14 md:h-16 w-auto mx-auto object-contain"
              />
            </Link>

            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-heading text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Protected Short Link
            </h1>
            <p className="text-xs font-mono text-primary font-bold">
              shortly.to/{shortCode}
            </p>
            <p className="text-xs text-[#64748b] font-sans">
              This link is password protected. Enter the correct password to proceed.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-semibold uppercase text-[#0f172a] tracking-wider">
                ENTER PASSWORD
              </label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-[#64748b] absolute left-4 z-10 pointer-events-none" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-[52px] pl-[44px] pr-4 rounded-xl text-sm font-mono text-[#0f172a] border-[#e2e8f0]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={verifyMutation.isPending}
              className="w-full h-[52px] rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {verifyMutation.isPending ? 'Verifying...' : 'Unlock & Access Link'}
              {!verifyMutation.isPending && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#e2e8f0] text-center text-xs text-[#64748b] font-sans">
            Need help?{' '}
            <Link href="/" className="text-primary font-bold hover:underline ml-1">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
