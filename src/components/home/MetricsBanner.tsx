'use client';

import { motion, Variants } from 'framer-motion';

export default function MetricsBanner() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="border-y border-[#c4c5d6]/40 py-12 my-12 bg-white/50 backdrop-blur-xl rounded-3xl shadow-xs relative overflow-hidden"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        <motion.div variants={itemVariants} className="space-y-1.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-[#0038b1] transition-transform"
          >
            500+
          </motion.div>
          <div className="text-sm font-sans font-semibold text-[#64748b] uppercase tracking-wider">
            Short Links Shortened
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-[#091b38] transition-transform flex items-center justify-center gap-1"
          >
            99.99%
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          </motion.div>
          <div className="text-sm font-sans font-semibold text-[#64748b] uppercase tracking-wider">
            Edge Routing Uptime
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-[#0038b1] transition-transform"
          >
            150+
          </motion.div>
          <div className="text-sm font-sans font-semibold text-[#64748b] uppercase tracking-wider">
            Countries Tracked
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-[#091b38] transition-transform"
          >
            &lt; 10ms
          </motion.div>
          <div className="text-sm font-sans font-semibold text-[#64748b] uppercase tracking-wider">
            Average Latency
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
