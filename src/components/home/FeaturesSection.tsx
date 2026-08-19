'use client';

import { motion, Variants } from 'framer-motion';
import { Zap, BarChart2, Shield, Lock } from 'lucide-react';

export default function FeaturesSection() {
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
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="space-y-10 my-16 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8edff] text-xs font-sans font-bold text-[#0038b1]">
          ENGINEERED FOR EXCELLENCE
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          Built for Speed, Scale, and Intelligence
        </h2>
        <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed">
          Everything you need to manage links, track engagements, and protect target destinations.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Large Bento Feature Card 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0, 56, 177, 0.14)' }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group cursor-pointer border border-[#c4c5d6]/40 bg-white/80"
        >
          <div className="relative z-10 space-y-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] shadow-xs"
            >
              <Zap className="w-7 h-7" />
            </motion.div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#091b38]">Shorten Instantly</h3>
            <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed max-w-xl">
              Create clean, memorable short URLs in milliseconds with optional custom alias slugs and instant vector QR code asset generation.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-[1.5px] border-[#0038b1]/20 group-hover:scale-125 transition-transform duration-700 ease-out pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border-[1.5px] border-[#0038b1]/15 group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none" />
        </motion.div>

        {/* Feature Card 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0, 56, 177, 0.14)' }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col justify-between group cursor-pointer border border-[#c4c5d6]/40 bg-white/80"
        >
          <div className="space-y-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] shadow-xs"
            >
              <BarChart2 className="w-7 h-7" />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38]">Understand Every Click</h3>
            <p className="text-[#5b5e68] text-base leading-relaxed">
              Track global clicks, top geographic countries, user devices, and referral channels in real-time telemetry analytics.
            </p>
          </div>
        </motion.div>

        {/* Feature Card 3 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0, 56, 177, 0.14)' }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col justify-between group cursor-pointer border border-[#c4c5d6]/40 bg-white/80"
        >
          <div className="space-y-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] shadow-xs"
            >
              <Shield className="w-7 h-7" />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38]">Custom Branded Aliases</h3>
            <p className="text-[#5b5e68] text-base leading-relaxed">
              Branded short links increase click-through rates by up to 39% compared to generic unbranded URL shorteners.
            </p>
          </div>
        </motion.div>

        {/* Large Bento Feature Card 4 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0, 56, 177, 0.14)' }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group cursor-pointer border border-[#c4c5d6]/40 bg-white/80"
        >
          <div className="relative z-10 space-y-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] shadow-xs"
            >
              <Lock className="w-7 h-7" />
            </motion.div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#091b38]">Enterprise Security & Limits</h3>
            <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed max-w-xl">
              Protect links with custom passcodes, set automatic expiration dates, or enforce maximum total click threshold limits.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-[1.5px] border-[#0038b1]/20 group-hover:scale-125 transition-transform duration-700 ease-out pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
