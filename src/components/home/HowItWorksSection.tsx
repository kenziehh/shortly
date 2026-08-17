import { Layers, Zap, QrCode, BarChart3 } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="my-20 scroll-mt-28">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8edff] text-xs font-mono font-bold text-[#0038b1]">
          <Layers className="w-3.5 h-3.5" /> SIMPLE WORKFLOW
        </div>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#091b38]">
          How Shortly Works in 3 Steps
        </h2>
        <p className="text-[#5b5e68] text-base max-w-xl mx-auto">
          From pasting long URLs to tracking deep visitor telemetry in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 space-y-4 relative overflow-hidden">
          <div className="font-mono text-4xl font-black text-[#0038b1]/20">01</div>
          <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#091b38]">Paste & Customize</h3>
          <p className="text-xs text-[#5b5e68] leading-relaxed">
            Paste your long destination URL, define a custom branded slug (e.g. <span className="font-mono text-[#0038b1]">/summer-sale</span>), set passcodes, or expiry rules.
          </p>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 space-y-4 relative overflow-hidden">
          <div className="font-mono text-4xl font-black text-[#0038b1]/20">02</div>
          <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#091b38]">Share & QR Code Asset</h3>
          <p className="text-xs text-[#5b5e68] leading-relaxed">
            Share your short link anywhere or download vector-grade QR code images for print and digital marketing campaigns.
          </p>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-3xl p-8 border border-[#c4c5d6]/40 space-y-4 relative overflow-hidden">
          <div className="font-mono text-4xl font-black text-[#0038b1]/20">03</div>
          <div className="w-12 h-12 rounded-2xl bg-[#e8edff] flex items-center justify-center text-[#0038b1]">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#091b38]">Track Real-Time Telemetry</h3>
          <p className="text-xs text-[#5b5e68] leading-relaxed">
            Watch click events, device breakdowns (Mobile vs Desktop), browser analytics, and daily timeline trends in your Dashboard console.
          </p>
        </div>
      </div>
    </section>
  );
}
