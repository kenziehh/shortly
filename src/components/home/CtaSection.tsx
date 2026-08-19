'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  const { data: user } = useCurrentUser();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="my-16"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-border/70 shadow-2xl">
        {/* Animated Background Mesh Glow */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#38bdf8]/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center space-y-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-xs font-mono font-bold text-primary border border-primary/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" /> READY TO ELEVATE YOUR LINKS?
          </motion.div>

          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Turn every link into a powerful insight.
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Join thousands of modern teams optimizing their brand links with precision analytics and enterprise security.
          </p>

          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link href={user ? '/dashboard' : '/register'}>
                <Button
                  size="lg"
                  className="h-[56px] px-10 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-base shadow-xl shadow-primary/30 transition-all cursor-pointer gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {user ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.7 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
