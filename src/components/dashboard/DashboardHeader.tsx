'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: any;
  urlsCount: number;
  onCreateClick: () => void;
}

export default function DashboardHeader({ user, urlsCount, onCreateClick }: DashboardHeaderProps) {
  const currentCount = user?.urlCount || urlsCount;
  const maxLimit = user?.maxUrlLimit || 50;
  const quotaPercent = Math.min(100, Math.round((currentCount / maxLimit) * 100));

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm md:text-base font-sans text-[#64748b]">
          <span className="font-semibold text-primary">Workspace</span>
          <span>/</span>
          <span>Overview</span>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Link Management Console
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Quota Indicator */}
        <div className="hidden sm:flex flex-col items-end gap-1.5 px-4 py-2 bg-white border border-[#e2e8f0] rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-sm font-sans text-[#64748b]">
            <span>Quota:</span>
            <span className="font-semibold text-foreground">{currentCount} / {maxLimit} Links</span>
            <span className="text-xs font-bold text-primary">({quotaPercent}%)</span>
          </div>
          <div className="w-40 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${quotaPercent}%` }}
            ></div>
          </div>
        </div>

        <Button
          onClick={onCreateClick}
          className="h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-xs gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" /> Create Link
        </Button>
      </div>
    </div>
  );
}
