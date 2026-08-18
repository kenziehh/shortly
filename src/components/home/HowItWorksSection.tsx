export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="space-y-10 py-6 my-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8edff] text-xs font-sans font-bold text-[#0038b1]">
          Simple 3-Step Process
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          How Shortly Works
        </h2>
        <p className="text-[#5b5e68] text-base md:text-lg leading-relaxed">
          From long messy URLs to powerful branded short links in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden">
          <div className="font-sans text-4xl font-black text-[#0038b1]/20">01</div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Paste & Customize</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Paste your long destination URL, define a custom branded slug (e.g. <span className="font-mono text-[#0038b1] font-bold">/summer-sale</span>), set passcodes, or expiry rules.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden">
          <div className="font-sans text-4xl font-black text-[#0038b1]/20">02</div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Share & Embed</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Copy your short URL or download vector QR code assets directly for email campaigns, social media posts, or print media.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-[#c4c5d6]/40 p-8 rounded-3xl space-y-3.5 shadow-sm relative overflow-hidden">
          <div className="font-sans text-4xl font-black text-[#0038b1]/20">03</div>
          <h3 className="font-heading text-2xl font-bold text-[#091b38]">Analyze Telemetry</h3>
          <p className="text-[#5b5e68] text-base leading-relaxed">
            Monitor real-time click counts, device breakdowns, referrers, and audience geographic locations from your console dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
