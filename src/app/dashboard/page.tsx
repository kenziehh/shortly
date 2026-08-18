'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
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
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State with 300ms Debounce
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Modal Control States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<any | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<any | null>(null);
  const [togglingUrl, setTogglingUrl] = useState<any | null>(null);

  // QR & Copy State
  const [selectedQrUrl, setSelectedQrUrl] = useState<{ url: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Debounce search effect (300ms delay) reset to page 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        window.location.href = '/login';
      }
    } catch {
      window.location.href = '/login';
    }
  };

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/urls?search=${encodeURIComponent(debouncedSearch)}&status=${statusFilter}&page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.urls) {
        setUrls(data.urls);
        if (data.pagination) {
          setPaginationMeta(data.pagination);
        }
      }
    } catch (err) {
      console.error('Fetch urls error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) fetchUrls();
  }, [user, debouncedSearch, statusFilter, page, limit]);

  const copyLink = (code: string, id: string) => {
    const full = `${window.location.protocol}//${window.location.host}/${code}`;
    navigator.clipboard.writeText(full);
    setCopiedId(id);
    toast.success('Short link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics Calculation
  const totalClicks = urls.reduce((acc, u) => acc + (u.clickCount || 0), 0);
  const activeCount = urls.filter((u) => u.isActive && (!u.expiresAt || new Date(u.expiresAt) > new Date())).length;
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

        {/* Search & Filter Toolbar with 300ms Debounce */}
        <DashboardToolbar
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
          onRefresh={fetchUrls}
        />

        {/* Expanded Multi-Column Table Layout with Shadcn UI Pagination */}
        <DashboardTable
          urls={urls}
          loading={loading}
          search={search}
          copiedId={copiedId}
          pagination={paginationMeta}
          onPageChange={(newPage) => setPage(newPage)}
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
        onSuccess={fetchUrls}
      />

      {/* Edit Link Modal */}
      <EditUrlModal
        isOpen={!!editingUrl}
        urlItem={editingUrl}
        onClose={() => setEditingUrl(null)}
        onSuccess={fetchUrls}
      />

      {/* Delete Link Modal */}
      <DeleteUrlModal
        urlItem={deletingUrl}
        onClose={() => setDeletingUrl(null)}
        onSuccess={fetchUrls}
      />

      {/* Toggle Status Confirmation Modal */}
      <ToggleStatusModal
        urlItem={togglingUrl}
        onClose={() => setTogglingUrl(null)}
        onSuccess={fetchUrls}
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
