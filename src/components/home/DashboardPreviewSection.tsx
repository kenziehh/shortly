'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { TrendingUp, Globe } from 'lucide-react';

export default function DashboardPreviewSection() {
  const [copiedDemo, setCopiedDemo] = useState<string | null>(null);

  const copyDemoLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDemo(id);
    toast.success('Demo link copied!');
    setTimeout(() => setCopiedDemo(null), 2000);
  };

  return (
    <section id="preview" className="relative w-full my-16 scroll-mt-28">
      <div className="glass-panel rounded-2xl overflow-hidden border border-[#c4c5d6]/40 relative z-10 shadow-[0_16px_64px_rgba(9,27,56,0.08)]">
        {/* Mac Window Header */}
        <div className="bg-white/50 h-10 border-b border-[#c4c5d6]/40 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <div className="flex-1 text-center font-mono text-xs text-[#5b5e68] mr-12">
            Shortly Pro Dashboard Preview
          </div>
        </div>

        {/* Mock Dashboard Content */}
        <div className="p-6 md:p-8 bg-[#f9f9ff]/60 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider">Total Clicks</span>
            <div className="font-heading text-4xl font-extrabold text-[#091b38] my-2">124,592</div>
            <div className="flex items-center gap-1 text-[#27c93f] font-mono text-xs font-semibold">
              <TrendingUp className="w-4 h-4" />
              +14.2% this week
            </div>
          </div>

          {/* Mock Chart Area */}
          <div className="glass-card rounded-2xl p-6 md:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
            <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider">Traffic Overview</span>
            <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-between px-6 pb-4 gap-3 opacity-60">
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[40%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[60%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[30%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[80%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[50%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[90%] hover:bg-[#0038b1] transition-all"></div>
              <div className="w-full bg-[#0038b1]/30 rounded-t-sm h-[70%] hover:bg-[#0038b1] transition-all"></div>
            </div>
          </div>

          {/* Link List Mock */}
          <div className="glass-card rounded-2xl p-6 md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs text-[#5b5e68] uppercase tracking-wider">Recent Active Links</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 hover:bg-white/60 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-[#091b38] text-sm">Campaign Alpha</div>
                    <div className="font-mono text-xs text-[#0038b1] flex items-center gap-2">
                      shortly.to/alpha
                      <button
                        onClick={() => copyDemoLink('https://shortly.to/alpha', 'alpha')}
                        className="bg-[#e8edff] hover:bg-[#0038b1] hover:text-white text-[#0038b1] px-2 py-0.5 rounded-full text-[10px] transition cursor-pointer"
                      >
                        {copiedDemo === 'alpha' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#5b5e68]">45.2k clicks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
