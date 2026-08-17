import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  return (
    <section id="pricing" className="my-24 scroll-mt-28">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8edff] text-xs font-mono font-bold text-[#0038b1]">
          TRANSPARENT PRICING
        </div>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#091b38]">
          Flexible Plans for Teams of All Sizes
        </h2>
        <p className="text-[#5b5e68] text-base max-w-xl mx-auto">
          Start free with no credit card required. Upgrade as your campaign scales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Tier */}
        <div className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="font-mono text-xs font-bold text-[#5b5e68] uppercase tracking-wider">Starter Free</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">$0 <span className="text-xs font-sans text-[#5b5e68] font-normal">/ month forever</span></div>
            <p className="text-xs text-[#5b5e68] leading-relaxed">Perfect for personal projects and quick link shortening.</p>
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-xs text-[#091b38]">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> 50 Short Links limit</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Custom Aliases / Slugs</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Password Link Security</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Basic Analytics Telemetry</div>
            </div>
          </div>
          <Link href="/register">
            <Button variant="outline" className="w-full h-11 rounded-xl border-[#c4c5d6] text-xs font-semibold text-[#091b38] hover:bg-[#e8edff] cursor-pointer">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Pro Tier (Popular) */}
        <div className="glass-card rounded-3xl p-8 border-2 border-[#0038b1] flex flex-col justify-between space-y-6 relative bg-white/90 shadow-xl">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0038b1] text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div className="space-y-4 pt-2">
            <div className="font-mono text-xs font-bold text-[#0038b1] uppercase tracking-wider">Pro Growth</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">$19 <span className="text-xs font-sans text-[#5b5e68] font-normal">/ month</span></div>
            <p className="text-xs text-[#5b5e68] leading-relaxed">For professional marketers, creators, and growing businesses.</p>
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-xs text-[#091b38]">
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-[#0038b1]" /> Unlimited Short Links</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> High-Res PNG QR Assets</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Real-Time Telemetry & Referrers</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Custom Expiry & Click Limits</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Priority Email Support</div>
            </div>
          </div>
          <Link href="/register">
            <Button className="w-full h-11 rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white text-xs font-semibold shadow-md shadow-[#0038b1]/20 cursor-pointer">
              Upgrade to Pro
            </Button>
          </Link>
        </div>

        {/* Enterprise Tier */}
        <div className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="font-mono text-xs font-bold text-[#5b5e68] uppercase tracking-wider">Enterprise</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">$99 <span className="text-xs font-sans text-[#5b5e68] font-normal">/ month</span></div>
            <p className="text-xs text-[#5b5e68] leading-relaxed">Dedicated infrastructure and custom SLA for large organizations.</p>
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-xs text-[#091b38]">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Everything in Pro</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> Custom Domain CNAME Routing</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> REST API Developer Keys</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0038b1]" /> 99.99% Guaranteed SLA</div>
            </div>
          </div>
          <Link href="/register">
            <Button variant="outline" className="w-full h-11 rounded-xl border-[#c4c5d6] text-xs font-semibold text-[#091b38] hover:bg-[#e8edff] cursor-pointer">
              Contact Enterprise
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
