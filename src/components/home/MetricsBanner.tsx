export default function MetricsBanner() {
  return (
    <section className="border-y border-[#c4c5d6]/40 py-10 my-10 bg-white/40 backdrop-blur-md rounded-3xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="font-heading text-3xl md:text-4xl font-extrabold text-[#0038b1]">500K+</div>
          <div className="text-xs font-mono text-[#5b5e68] uppercase tracking-wider">Short Links Shortened</div>
        </div>
        <div className="space-y-1">
          <div className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">99.99%</div>
          <div className="text-xs font-mono text-[#5b5e68] uppercase tracking-wider">Edge Routing Uptime</div>
        </div>
        <div className="space-y-1">
          <div className="font-heading text-3xl md:text-4xl font-extrabold text-[#0038b1]">150+</div>
          <div className="text-xs font-mono text-[#5b5e68] uppercase tracking-wider">Countries Tracked</div>
        </div>
        <div className="space-y-1">
          <div className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">&lt; 10ms</div>
          <div className="text-xs font-mono text-[#5b5e68] uppercase tracking-wider">Average Latency</div>
        </div>
      </div>
    </section>
  );
}
