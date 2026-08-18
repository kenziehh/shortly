'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useGetUrls } from '@/hooks/useUrls';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardKpiCards from '@/components/dashboard/DashboardKpiCards';
import DashboardToolbar from '@/components/dashboard/DashboardToolbar';
import DashboardTable from '@/components/dashboard/DashboardTable';
import CreateUrlModal from '@/components/dashboard/CreateUrlModal';
import EditUrlModal from '@/components/dashboard/EditUrlModal';
import DeleteUrlModal from '@/components/dashboard/DeleteUrlModal';
import ToggleStatusModal from '@/components/dashboard/ToggleStatusModal';
import QRCodeModal from '@/components/QRCodeModal';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  // Search & Filter State with 300ms Debounce
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Modal Control States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<any | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<any | null>(null);
  const [togglingUrl, setTogglingUrl] = useState<any | null>(null);

  // QR & Copy State
  const [selectedQrUrl, setSelectedQrUrl] = useState<{ url: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 300ms Search Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Current User Session
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          window.location.href = '/login';
        }
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);

  // TanStack React Query for URLs List
  const { data: urlsData, isLoading, refetch } = useGetUrls(
    { search: debouncedSearch, status: statusFilter, page, limit },
    !!user
  );

  const urls = urlsData?.urls || [];
  const paginationMeta = urlsData?.pagination || {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const copyLink = (code: string, id: string) => {
    const full = `${window.location.protocol}//${window.location.host}/${code}`;
    navigator.clipboard.writeText(full);
    setCopiedId(id);
    toast.success('Short link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics Calculation
  const totalClicks = urls.reduce((acc: number, u: any) => acc + (u.clickCount || 0), 0);
  const activeCount = urls.filter((u: any) => u.isActive && (!u.expiresAt || new Date(u.expiresAt) > new Date())).length;
  const expiredCount = urls.length - activeCount;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pt-28 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-8 w-full">
        {/* Modular Header & Quota Progress */}
        <DashboardHeader
          user={user}
          urlsCount={paginationMeta.totalCount || urls.length}
          onCreateClick={() => setIsCreateOpen(true)}
        />

        {/* Modular KPI Metrics Cards */}
        <DashboardKpiCards
          user={user}
          urls={urls}
          totalClicks={totalClicks}
          activeCount={activeCount}
          expiredCount={expiredCount}
        />

        {/* Search & Filter Toolbar */}
        <DashboardToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
          onRefresh={refetch}
        />

        {/* Expanded Multi-Column Table Layout */}
        <DashboardTable
          urls={urls}
          loading={isLoading}
          search={search}
          copiedId={copiedId}
          pagination={paginationMeta}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          onCopy={copyLink}
          onEdit={(u) => setEditingUrl(u)}
          onDelete={(u) => setDeletingUrl(u)}
          onToggleStatus={(u) => setTogglingUrl(u)}
          onSelectQr={(qr) => setSelectedQrUrl(qr)}
          onCreateClick={() => setIsCreateOpen(true)}
        />
      </div>

      {/* Create Link Modal */}
      <CreateUrlModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Edit Link Modal */}
      <EditUrlModal
        isOpen={!!editingUrl}
        urlItem={editingUrl}
        onClose={() => setEditingUrl(null)}
      />

      {/* Delete Link Modal */}
      <DeleteUrlModal
        urlItem={deletingUrl}
        onClose={() => setDeletingUrl(null)}
      />

      {/* Toggle Status Confirmation Modal */}
      <ToggleStatusModal
        urlItem={togglingUrl}
        onClose={() => setTogglingUrl(null)}
      />

      {/* QR Code Viewer Asset Modal */}
      <QRCodeModal
        isOpen={!!selectedQrUrl}
        shortUrl={selectedQrUrl?.url || ''}
        title={selectedQrUrl?.title || ''}
        onClose={() => setSelectedQrUrl(null)}
      />
    </div>
  );
}
