import { Zap, BarChart2, Shield, Lock } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="space-y-10 my-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          Built for speed, scale, and intelligence
        </h2>
        <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed">
          Everything you need to manage links, track engagements, and protect target destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Large Feature Card */}
        <div className="md:col-span-2 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
              <Zap className="w-6.5 h-6.5" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#091b38]">Shorten instantly</h3>
            <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed max-w-xl">
              Create clean, memorable short URLs in milliseconds with optional custom alias slugs and instant QR code asset generation.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-[1.5px] border-[#c4c5d6]/40 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border-[1.5px] border-[#c4c5d6]/20 group-hover:scale-105 transition-transform duration-500 ease-out"></div>
        </div>

        {/* Feature 2 */}
        <div className="glass-card p-8 rounded-3xl flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
              <BarChart2 className="w-6.5 h-6.5" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38]">Understand every click</h3>
            <p className="text-[#5b5e68] text-base leading-relaxed">
              Track global clicks, top geographic countries, user devices, and referral channels in real-time telemetry.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="glass-card p-8 rounded-3xl flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
              <Shield className="w-6.5 h-6.5" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#091b38]">Custom aliases & links</h3>
            <p className="text-[#5b5e68] text-base leading-relaxed">
              Branded short links increase click-through rates by up to 39% compared to generic unbranded links.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="md:col-span-2 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
              <Lock className="w-6.5 h-6.5" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#091b38]">Enterprise security & Limits</h3>
            <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed max-w-xl">
              Protect links with custom passwords, set automatic expiration dates, or enforce maximum total click thresholds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
