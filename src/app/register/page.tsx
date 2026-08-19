import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free Shortly account to manage custom short links, set password protection, and view telemetry analytics.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterPage() {
  return (
    <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center py-12 px-6">
      {/* Tonal Background Gradient */}
      <div className="hero-bg"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphic Auth Panel */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border border-[#c4c5d6]/50 shadow-[0_16px_64px_rgba(9,27,56,0.08)] bg-white/80 space-y-6">
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

            <h1 className="font-heading text-2xl font-extrabold text-[#091b38] tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-[#5b5e68]">
              Join Shortly to create branded links and access deep telemetry.
            </p>
          </div>

          {/* Modular Form with Zod & React Hook Form */}
          <RegisterForm />

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#c4c5d6]/30 text-center text-xs text-[#5b5e68]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0038b1] font-bold hover:underline ml-1">
              Sign In
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
