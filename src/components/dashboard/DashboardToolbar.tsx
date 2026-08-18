'use client';

import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  onRefresh: () => void;
}

export default function DashboardToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
}: DashboardToolbarProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
      <div className="relative flex-1 w-full flex items-center">
        <Search className="w-5 h-5 absolute left-4 text-[#94a3b8]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search links by title, target URL, or custom slug..."
          className="w-full h-12 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-base font-sans text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-primary focus:bg-white transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 text-sm font-sans text-[#94a3b8] hover:text-[#0f172a]"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 text-base font-sans text-[#64748b] px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
          <Filter className="w-4.5 h-4.5 text-[#64748b]" />
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="bg-transparent font-sans text-base font-semibold text-[#0f172a] outline-none cursor-pointer"
          >
            <option value="all">All Links</option>
            <option value="active">Active Only</option>
            <option value="expired">Expired Only</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="h-12 px-4 rounded-xl border-[#e2e8f0] text-base font-sans text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
          title="Refresh List"
        >
          <RefreshCw className="w-4.5 h-4.5" />
        </Button>
      </div>
    </div>
  );
}
