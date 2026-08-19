'use client';

import { motion, Variants } from 'framer-motion';

export default function HowItWorksSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
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
    <section id="how-it-works" className="space-y-10 py-6 my-12 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8edff] text-xs font-sans font-bold text-[#0038b1]">
          Simple 3-Step Process
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          How Shortly Works
        </h2>
        <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed">
          From long messy URLs to powerful branded short links in seconds.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Step 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 56, 177, 0.12)' }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#e8edff]/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            className="font-sans text-5xl font-black text-[#0038b1] opacity-30 group-hover:opacity-100 transition-opacity"
          >
            01
          </motion.div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Paste & Customize</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Paste your long destination URL, define a custom branded slug (e.g. <span className="font-mono text-[#0038b1] font-bold">/summer-sale</span>), set passcodes, or expiry rules.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 56, 177, 0.12)' }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#e8edff]/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            className="font-sans text-5xl font-black text-[#0038b1] opacity-30 group-hover:opacity-100 transition-opacity"
          >
            02
          </motion.div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Share & Embed</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Copy your short URL or download vector QR code assets directly for email campaigns, social media posts, or print media.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 56, 177, 0.12)' }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#e8edff]/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            className="font-sans text-5xl font-black text-[#0038b1] opacity-30 group-hover:opacity-100 transition-opacity"
          >
            03
          </motion.div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Analyze Telemetry</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Monitor real-time click counts, device breakdowns, referrers, and audience geographic locations from your console dashboard.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
