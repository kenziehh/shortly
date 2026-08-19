'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TrendingUp, Globe, Activity, Eye } from 'lucide-react';

export default function DashboardPreviewSection() {
  const [copiedDemo, setCopiedDemo] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth 3D tilt spring interpolation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyDemoLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDemo(id);
    toast.success('Demo link copied!');
    setTimeout(() => setCopiedDemo(null), 2000);
  };

  const chartHeights = ['40%', '65%', '35%', '85%', '55%', '95%', '75%'];

  return (
    <section id="preview" className="relative w-full my-16 scroll-mt-28 perspective-1000">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass-panel rounded-3xl overflow-hidden border border-[#c4c5d6]/50 relative z-10 shadow-[0_24px_80px_rgba(9,27,56,0.12)] bg-white/80 transition-shadow duration-300 hover:shadow-[0_32px_100px_rgba(0,56,177,0.18)]"
      >
        {/* Floating Live Telemetry Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-14 right-8 z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0038b1] text-white text-xs font-mono font-bold shadow-lg shadow-[#0038b1]/30"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> Live Telemetry
        </motion.div>

        {/* Mac Window Header */}
        <div className="bg-white/70 h-11 border-b border-[#c4c5d6]/40 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="flex-1 text-center font-mono text-xs text-[#5b5e68] font-semibold mr-12">
            Shortly Pro Telemetry Dashboard Console
          </div>
        </div>

        {/* Mock Dashboard Content */}
        <div className="p-6 md:p-8 bg-[#f9f9ff]/60 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between bg-white/70 border border-[#c4c5d6]/30 shadow-xs"
          >
            <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider font-semibold">Total Clicks</span>
            <div className="font-heading text-4xl font-extrabold text-[#091b38] my-2">124,592</div>
            <div className="flex items-center gap-1 text-[#27c93f] font-mono text-xs font-semibold">
              <TrendingUp className="w-4 h-4" />
              +14.2% this week
            </div>
          </motion.div>

          {/* Animated Interactive Chart Area */}
          <div className="glass-card rounded-2xl p-6 md:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[160px] bg-white/70 border border-[#c4c5d6]/30 shadow-xs">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider font-semibold">Traffic Telemetry Flow</span>
              <span className="text-xs font-mono text-[#0038b1] font-bold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> 4,120 active/min
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-28 flex items-end justify-between px-6 pb-4 gap-3">
              {chartHeights.map((h, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: '0%' }}
                  whileInView={{ height: h }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={{ scaleY: 1.08 }}
                  className="w-full bg-[#0038b1]/30 hover:bg-[#0038b1] rounded-t-lg transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Link List Mock */}
          <div className="glass-card rounded-2xl p-6 md:col-span-3 flex flex-col gap-4 bg-white/70 border border-[#c4c5d6]/30 shadow-xs">
            <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider font-semibold">Recent Active Links</span>
            <div className="flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                className="flex items-center justify-between p-3.5 bg-white/60 rounded-xl transition-colors border border-[#c4c5d6]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8edff] flex items-center justify-center text-[#0038b1] font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-[#091b38] text-sm">Campaign Alpha Promo</div>
                    <div className="font-mono text-xs text-[#0038b1] flex items-center gap-2 mt-0.5">
                      shortly.to/alpha
                      <button
                        onClick={() => copyDemoLink('https://shortly.to/alpha', 'alpha')}
                        className="bg-[#e8edff] hover:bg-[#0038b1] hover:text-white text-[#0038b1] px-2 py-0.5 rounded-full text-[10px] font-sans font-bold transition cursor-pointer"
                      >
                        {copiedDemo === 'alpha' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-[#091b38]">45,290 clicks</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
