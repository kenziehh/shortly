'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  const { data: user } = useCurrentUser();

  return (
    <section className="my-16">
      <div className="bg-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-border/60 shadow-xl">
        <div className="relative z-10 flex flex-col items-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground">
            Turn every link into an insight.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Join thousands of modern teams optimizing their brand links with precision analytics and enterprise security.
          </p>
          <div className="pt-2">
            <Link href={user ? '/dashboard' : '/register'}>
              <Button size="lg" className="h-[56px] px-10 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-base shadow-xl shadow-primary/25 transition-all hover:scale-[0.98] cursor-pointer gap-2">
                {user ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
