import { Zap, BarChart3, Link2, Lock } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="my-20 scroll-mt-28">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#091b38] mb-3">
          Everything you need. Nothing you don't.
        </h2>
        <p className="text-[#5b5e68] text-base">
          A streamlined feature set focused on performance, security, and analytical clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big Feature 1 */}
        <div className="glass-card rounded-2xl p-8 md:col-span-2 flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
          <div className="relative z-10 max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38] mb-2">Shorten instantly</h3>
            <p className="text-[#5b5e68] text-sm leading-relaxed">
              Our global edge routing ensures your links redirect in milliseconds, providing a seamless experience for visitors anywhere.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-[1.5px] border-[#c4c5d6]/40 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border-[1.5px] border-[#c4c5d6]/20 group-hover:scale-105 transition-transform duration-500 ease-out"></div>
        </div>

        {/* Small Feature 1 */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#091b38] mb-2">Understand every click</h3>
            <p className="text-[#5b5e68] text-xs leading-relaxed">
              Deep geographic analytics, browser breakdowns, and real-time device tracking.
            </p>
          </div>
        </div>

        {/* Small Feature 2 */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mb-6">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#091b38] mb-2">Custom aliases & links</h3>
            <p className="text-[#5b5e68] text-xs leading-relaxed">
              Use custom branded slugs to build visitor trust and increase click-through rates.
            </p>
          </div>
        </div>

        {/* Big Feature 2 */}
        <div className="glass-card rounded-2xl p-8 md:col-span-2 flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
          <div className="relative z-10 max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1] mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38] mb-2">Enterprise security & Limits</h3>
            <p className="text-[#5b5e68] text-sm leading-relaxed">
              Password protected links, expiration dates, and maximum click count limits to keep your organization's links secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
