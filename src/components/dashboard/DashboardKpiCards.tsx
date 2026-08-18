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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Total Links */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[#475569] font-sans text-lg font-semibold">
          <span>Total links</span>
          <div className="p-3 bg-[#f1f5f9] rounded-xl text-primary">
            <Layers className="w-6 h-6" />
          </div>
        </div>
        <div className="font-heading text-5xl font-extrabold text-foreground tracking-tight">
          {user?.urlCount || urls.length}
        </div>
        <div className="text-base font-sans text-[#64748b]">
          Limit: <span className="font-bold text-foreground">{user?.maxUrlLimit || 50} total</span>
        </div>
      </div>

      {/* Card 2: Total Engagements */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[#475569] font-sans text-lg font-semibold">
          <span>Total engagements</span>
          <div className="p-3 bg-[#f1f5f9] rounded-xl text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
        <div className="font-heading text-5xl font-extrabold text-foreground tracking-tight">
          {totalClicks.toLocaleString()}
        </div>
        <div className="text-base font-sans text-[#64748b]">Total click events</div>
      </div>

      {/* Card 3: Active Routing */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[#475569] font-sans text-lg font-semibold">
          <span>Active routing</span>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
        <div className="font-heading text-5xl font-extrabold text-emerald-600 tracking-tight">
          {activeCount}
        </div>
        <div className="text-base font-sans text-[#64748b]">Live redirect rules</div>
      </div>

      {/* Card 4: Expired / Inactive */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[#475569] font-sans text-lg font-semibold">
          <span>Expired / Inactive</span>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="font-heading text-5xl font-extrabold text-rose-600 tracking-tight">
          {expiredCount}
        </div>
        <div className="text-base font-sans text-[#64748b]">Deactivated or expired</div>
      </div>
    </div>
  );
}
