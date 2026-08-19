'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="pricing" className="my-20 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8edff] text-xs font-sans font-bold text-primary">
          TRANSPARENT PRICING
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          Flexible Plans for Teams of All Sizes
        </h2>
        <p className="text-[#5b5e68] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Start free with no credit card required. Upgrade as your campaign scales.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Free Tier */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(9, 27, 56, 0.08)' }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 flex flex-col justify-between space-y-6 bg-white/80"
        >
          <div className="space-y-4">
            <div className="font-sans text-xs font-bold text-[#64748b] uppercase tracking-wider">Starter Free</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">
              $0 <span className="text-base font-sans text-[#64748b] font-medium">/ month forever</span>
            </div>
            <p className="text-base text-[#64748b] leading-relaxed">Perfect for personal projects and quick link shortening.</p>
            
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-base text-[#091b38] font-medium">
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> 50 Short Links limit</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Custom Aliases / Slugs</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Password Link Security</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Basic Analytics Telemetry</div>
            </div>
          </div>
          <Link href="/register">
            <Button variant="outline" className="w-full h-12 rounded-xl border-[#c4c5d6] text-base font-bold text-[#091b38] hover:bg-[#e8edff] cursor-pointer">
              Get Started Free
            </Button>
          </Link>
        </motion.div>

        {/* Pro Tier (Popular Highlighted) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.02, boxShadow: '0 28px 70px rgba(0, 56, 177, 0.22)' }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-3xl p-8 border-2 border-primary flex flex-col justify-between space-y-6 relative bg-white shadow-xl"
        >
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-sans font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" /> Most Popular
          </div>
          <div className="space-y-4 pt-2">
            <div className="font-sans text-xs font-bold text-primary uppercase tracking-wider">Pro Growth</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">
              $19 <span className="text-base font-sans text-[#64748b] font-medium">/ month</span>
            </div>
            <p className="text-base text-[#64748b] leading-relaxed">For professional marketers, creators, and growing businesses.</p>
            
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-base text-[#091b38] font-semibold">
              <div className="flex items-center gap-3 font-bold"><Check className="w-5 h-5 text-primary shrink-0" /> Unlimited Short Links</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> High-Res PNG QR Assets</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Real-Time Telemetry & Referrers</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Custom Expiry & Click Limits</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Priority Email Support</div>
            </div>
          </div>
          <Link href="/register">
            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-md shadow-primary/25 cursor-pointer">
              Upgrade to Pro
            </Button>
          </Link>
        </motion.div>

        {/* Enterprise Tier */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(9, 27, 56, 0.08)' }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 flex flex-col justify-between space-y-6 bg-white/80"
        >
          <div className="space-y-4">
            <div className="font-sans text-xs font-bold text-[#64748b] uppercase tracking-wider">Enterprise</div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">
              $99 <span className="text-base font-sans text-[#64748b] font-medium">/ month</span>
            </div>
            <p className="text-base text-[#64748b] leading-relaxed">Dedicated infrastructure and custom SLA for large organizations.</p>
            
            <div className="pt-4 border-t border-[#c4c5d6]/30 space-y-2.5 text-base text-[#091b38] font-medium">
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Everything in Pro</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> Custom Domain CNAME Routing</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> REST API Developer Keys</div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> 99.99% Guaranteed SLA</div>
            </div>
          </div>
          <Link href="/register">
            <Button variant="outline" className="w-full h-12 rounded-xl border-[#c4c5d6] text-base font-bold text-[#091b38] hover:bg-[#e8edff] cursor-pointer">
              Contact Enterprise
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
