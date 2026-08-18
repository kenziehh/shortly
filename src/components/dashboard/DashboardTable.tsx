'use client';

import React from 'react';
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface DashboardTableProps {
  urls: any[];
  loading: boolean;
  search: string;
  copiedId: string | null;
  pagination?: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
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
  pagination,
  onPageChange,
  onLimitChange,
  onCopy,
  onEdit,
  onDelete,
  onToggleStatus,
  onSelectQr,
  onCreateClick,
}: DashboardTableProps) {
  if (loading) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-16 text-center text-base font-sans text-[#64748b] space-y-2 shadow-xs">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div>Fetching link records...</div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-16 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center mx-auto text-primary">
          <Link2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground text-xl">No Matching Links Found</h3>
          <p className="text-base text-[#64748b] max-w-md mx-auto mt-1 font-sans">
            {search ? 'Try clearing your search term or changing status filters.' : 'Get started by creating your first shortened URL link.'}
          </p>
        </div>
        {!search && (
          <Button
            onClick={onCreateClick}
            className="h-11 px-6 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary-hover"
          >
            Create First Link
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base border-collapse">
          <thead>
            <tr className="bg-primary text-white font-sans text-sm uppercase font-semibold border-b border-primary/20">
              <th className="py-4 px-6 font-bold tracking-wider whitespace-nowrap">Short Link & Title</th>
              <th className="py-4 px-6 font-bold tracking-wider whitespace-nowrap">Destination URL</th>
              <th className="py-4 px-6 font-bold tracking-wider whitespace-nowrap">Expires At</th>
              <th className="py-4 px-6 font-bold tracking-wider text-center whitespace-nowrap">Click Limit</th>
              <th className="py-4 px-6 font-bold tracking-wider text-center whitespace-nowrap">Total Clicks</th>
              <th className="py-4 px-6 font-bold tracking-wider text-center whitespace-nowrap">Active</th>
              <th className="py-4 px-6 font-bold tracking-wider text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {urls.map((u) => {
              const isExpired = u.expiresAt && new Date(u.expiresAt) <= new Date();
              const isMaxReached = u.maxClicks && u.clickCount >= u.maxClicks;

              // Always prefer customAlias over random shortCode if customAlias exists!
              const displaySlug = u.customAlias || u.shortCode;
              const shortUrl = `${window.location.protocol}//${window.location.host}/${displaySlug}`;

              return (
                <tr key={u.id} className="hover:bg-[#f8fafc]/80 transition-colors group">
                  {/* Title & Custom Slug */}
                  <td className="py-4 px-6 space-y-1">
                    <div className="font-heading font-semibold text-foreground text-base flex items-center gap-2">
                      <span>{u.title || displaySlug}</span>
                      {u.password && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-sans font-semibold" title="Password Protected">
                          <Lock className="w-3.5 h-3.5" /> Pass
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-base text-primary">
                      <span className="font-bold">/{displaySlug}</span>
                      <a
                        href={`/${displaySlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#94a3b8] hover:text-primary transition-colors"
                        title="Test Redirect"
                      >
                        <ArrowUpRight className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  </td>

                  {/* Destination URL */}
                  <td className="py-4 px-6 max-w-[280px] truncate font-mono text-sm text-[#64748b]" title={u.originalUrl}>
                    <a href={u.originalUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-foreground flex items-center gap-1.5">
                      <span className="truncate">{u.originalUrl}</span>
                    </a>
                  </td>

                  {/* Expires At Column (Plain Text) */}
                  <td className="py-4 px-6 whitespace-nowrap font-sans text-sm text-[#64748b]">
                    {u.expiresAt ? (
                      <span className={isExpired ? 'text-rose-600 font-semibold' : 'text-[#0f172a] font-medium'}>
                        {new Date(u.expiresAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">No Expiration</span>
                    )}
                  </td>

                  {/* Click Limit Column (Plain Text) */}
                  <td className="py-4 px-6 text-center whitespace-nowrap font-sans text-sm font-medium text-[#0f172a]">
                    {u.maxClicks ? (
                      <span className={isMaxReached ? 'text-amber-700 font-bold' : 'text-[#0f172a]'}>
                        {u.maxClicks.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">Unlimited</span>
                    )}
                  </td>

                  {/* Total Clicks Telemetry */}
                  <td className="py-4 px-6 text-center font-heading font-bold text-foreground text-lg whitespace-nowrap">
                    {u.clickCount.toLocaleString()}
                  </td>

                  {/* Pure Active Switch Column */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={u.isActive}
                        onCheckedChange={() => onToggleStatus(u)}
                        title={u.isActive ? "Deactivate Link" : "Activate Link"}
                      />
                    </div>
                  </td>

                  {/* High-Contrast Icon-Only Action Buttons */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {/* Copy Short URL */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => onCopy(displaySlug, u.id)}
                            className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition-all cursor-pointer"
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
                            className="h-9 w-9 rounded-xl bg-primary hover:bg-primary-hover text-white shadow-xs transition-all cursor-pointer"
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
                            onClick={() => onSelectQr({ url: shortUrl, title: u.title || displaySlug })}
                            className="h-9 w-9 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all cursor-pointer"
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

      {/* Shadcn UI Pagination Bar */}
      {pagination && pagination.totalCount > 0 && (
        <div className="border-t border-[#e2e8f0] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3 text-sm font-sans text-[#64748b]">
            <span>
              Showing <strong className="text-[#0f172a]">{urls.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}</strong> to <strong className="text-[#0f172a]">{Math.min(pagination.page * pagination.limit, pagination.totalCount)}</strong> of <strong className="text-[#0f172a]">{pagination.totalCount}</strong> links
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-xs text-[#94a3b8]">Per page:</span>
              <select
                value={pagination.limit}
                onChange={(e) => onLimitChange?.(Number(e.target.value))}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs font-bold text-[#0f172a] px-2 py-1 outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => pagination.page > 1 && onPageChange?.(pagination.page - 1)}
                  className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.page) <= 1)
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && p - arr[idx - 1] > 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        isActive={p === pagination.page}
                        onClick={() => onPageChange?.(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => pagination.page < pagination.totalPages && onPageChange?.(pagination.page + 1)}
                  className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
