'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, []);

  return (
    <section className="my-16">
      <div className="glass-panel rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-[#b7c4ff]/50 bg-white/80">
        <div className="relative z-10 flex flex-col items-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#091b38]">
            Turn every link into an insight.
          </h2>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Join thousands of modern teams optimizing their brand links with precision analytics and enterprise security.
          </p>
          <div className="pt-2">
            <Link href={user ? '/dashboard' : '/register'}>
              <Button size="lg" className="h-[56px] px-10 rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white font-semibold text-base shadow-xl shadow-[#0038b1]/25 transition-all hover:scale-[0.98] cursor-pointer gap-2">
                {user ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
