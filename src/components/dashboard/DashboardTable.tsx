'use client';

import Link from 'next/link';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  BarChart2,
  Trash2,
  Lock,
  Pencil,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface DashboardTableProps {
  urls: any[];
  loading: boolean;
  search: string;
  copiedId: string | null;
  onCopy: (code: string, id: string) => void;
  onEdit: (url: any) => void;
  onDelete: (url: any) => void;
  onToggleStatus: (url: any) => void;
  onSelectQr: (qr: { url: string; title: string }) => void;
  onCreateClick: () => void;
}

export default function DashboardTable({
  urls,
  loading,
  search,
  copiedId,
  onCopy,
  onEdit,
  onDelete,
  onToggleStatus,
  onSelectQr,
  onCreateClick,
}: DashboardTableProps) {
  if (loading) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-16 text-center text-sm font-mono text-[#64748b] space-y-2 shadow-xs">
        <div className="w-6 h-6 border-2 border-[#0038b1] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div>Fetching link records...</div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-16 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center mx-auto text-[#0038b1]">
          <Link2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-[#0f172a] text-lg">No Matching Links Found</h3>
          <p className="text-sm text-[#64748b] max-w-sm mx-auto mt-1 font-sans">
            {search ? 'Try clearing your search term or changing status filters.' : 'Get started by creating your first shortened URL link.'}
          </p>
        </div>
        {!search && (
          <Button
            onClick={onCreateClick}
            className="h-10 px-5 rounded-lg bg-[#0038b1] text-white text-sm font-medium"
          >
            Create First Link
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] font-mono text-xs uppercase text-[#64748b]">
              <th className="py-4 px-6 font-semibold">Short Link & Title</th>
              <th className="py-4 px-6 font-semibold">Destination URL</th>
              <th className="py-4 px-6 font-semibold text-center">Clicks</th>
              <th className="py-4 px-6 font-semibold text-center">Status</th>
              <th className="py-4 px-6 font-semibold text-center">Active Switch</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {urls.map((u) => {
              const isExpired = u.expiresAt && new Date(u.expiresAt) <= new Date();
              const isMaxReached = u.maxClicks && u.clickCount >= u.maxClicks;
              const isLinkActive = u.isActive && !isExpired && !isMaxReached;
              const shortUrl = `${window.location.protocol}//${window.location.host}/${u.shortCode}`;

              return (
                <tr key={u.id} className="hover:bg-[#f8fafc]/80 transition-colors group">
                  {/* Title & Short Code */}
                  <td className="py-4 px-6 space-y-1">
                    <div className="font-heading font-semibold text-[#0f172a] text-base flex items-center gap-2">
                      <span>{u.title || u.shortCode}</span>
                      {u.password && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-xs font-mono font-bold" title="Password Protected">
                          <Lock className="w-3.5 h-3.5" /> Pass
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-sm text-[#0038b1]">
                      <span className="font-bold">/{u.shortCode}</span>
                      <a
                        href={`/${u.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#94a3b8] hover:text-[#0038b1] transition-colors"
                        title="Test Redirect"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </td>

                  {/* Destination URL */}
                  <td className="py-4 px-6 max-w-xs truncate font-mono text-sm text-[#64748b]" title={u.originalUrl}>
                    <a href={u.originalUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-[#0f172a] flex items-center gap-1.5">
                      <span className="truncate">{u.originalUrl}</span>
                    </a>
                  </td>

                  {/* Click Telemetry */}
                  <td className="py-4 px-6 text-center font-mono font-bold text-[#0f172a] text-base">
                    {u.clickCount.toLocaleString()}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center space-y-1">
                    {isLinkActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span> Expired
                      </span>
                    )}
                    {(u.expiresAt || u.maxClicks) && (
                      <div className="text-xs font-mono text-[#94a3b8]">
                        {u.expiresAt && `Exp: ${new Date(u.expiresAt).toLocaleDateString()}`}
                        {u.maxClicks && ` | Limit: ${u.maxClicks}`}
                      </div>
                    )}
                  </td>

                  {/* Dedicated Switch Column with Confirmation Modal Interceptor */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={u.isActive}
                        onCheckedChange={() => onToggleStatus(u)}
                        title={u.isActive ? "Deactivate Link" : "Activate Link"}
                      />
                      <span className={`text-[10px] font-mono font-bold tracking-tight ${u.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {u.isActive ? 'ACTIVE' : 'OFF'}
                      </span>
                    </div>
                  </td>

                  {/* High-Contrast Icon-Only Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Copy Short URL */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => onCopy(u.shortCode, u.id)}
                            className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition-all cursor-pointer"
                          >
                            {copiedId === u.id ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs font-sans">Copy Short Link</TooltipContent>
                      </Tooltip>

                      {/* Edit Link */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => onEdit(u)}
                            className="h-9 w-9 rounded-lg bg-[#0038b1] hover:bg-[#00257e] text-white shadow-xs transition-all cursor-pointer"
                          >
                            <Pencil className="w-4.5 h-4.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs font-sans">Edit Short Link</TooltipContent>
                      </Tooltip>

                      {/* QR Code */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => onSelectQr({ url: shortUrl, title: u.title || u.shortCode })}
                            className="h-9 w-9 rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all cursor-pointer"
                          >
                            <QrCode className="w-4.5 h-4.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs font-sans">QR Code Asset</TooltipContent>
                      </Tooltip>

                      {/* Analytics */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/dashboard/analytics/${u.id}`}>
                            <Button
                              size="icon"
                              className="h-9 w-9 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
                            >
                              <BarChart2 className="w-4.5 h-4.5" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs font-sans">Analytics Telemetry</TooltipContent>
                      </Tooltip>

                      {/* Delete Link */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => onDelete(u)}
                            className="h-9 w-9 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs font-sans">Delete Link</TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
