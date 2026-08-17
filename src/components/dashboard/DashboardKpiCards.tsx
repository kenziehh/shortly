import { Layers, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface DashboardKpiCardsProps {
  user: any;
  urls: any[];
  totalClicks: number;
  activeCount: number;
  expiredCount: number;
}

export default function DashboardKpiCards({
  user,
  urls,
  totalClicks,
  activeCount,
  expiredCount,
}: DashboardKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Links */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[#64748b] font-mono text-xs uppercase tracking-wider font-semibold">
          <span>Total Links</span>
          <div className="p-2 bg-[#f1f5f9] rounded-md text-[#0038b1]">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-3xl font-bold text-[#0f172a]">
          {user?.urlCount || urls.length}
        </div>
        <div className="text-xs font-mono text-[#64748b]">
          Limit: <span className="font-semibold text-[#0f172a]">{user?.maxUrlLimit || 50} total</span>
        </div>
      </div>

      {/* Card 2: Total Engagements */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[#64748b] font-mono text-xs uppercase tracking-wider font-semibold">
          <span>Total Engagements</span>
          <div className="p-2 bg-[#f1f5f9] rounded-md text-[#0038b1]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-3xl font-bold text-[#0f172a]">
          {totalClicks.toLocaleString()}
        </div>
        <div className="text-xs font-mono text-[#64748b]">Total click events</div>
      </div>

      {/* Card 3: Active Routing */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[#64748b] font-mono text-xs uppercase tracking-wider font-semibold">
          <span>Active Routing</span>
          <div className="p-2 bg-emerald-50 rounded-md text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-3xl font-bold text-emerald-600">
          {activeCount}
        </div>
        <div className="text-xs font-mono text-[#64748b]">Live redirect rules</div>
      </div>

      {/* Card 4: Expired / Inactive */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[#64748b] font-mono text-xs uppercase tracking-wider font-semibold">
          <span>Expired / Inactive</span>
          <div className="p-2 bg-rose-50 rounded-md text-rose-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-3xl font-bold text-rose-600">
          {expiredCount}
        </div>
        <div className="text-xs font-mono text-[#64748b]">Deactivated or expired</div>
      </div>
    </div>
  );
}
