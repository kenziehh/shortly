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
  const [urls, setUrls] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<any | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<any | null>(null);
  const [togglingUrl, setTogglingUrl] = useState<any | null>(null);

  // QR & Copy State
  const [selectedQrUrl, setSelectedQrUrl] = useState<{ url: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      const res = await fetch(`/api/urls?search=${encodeURIComponent(search)}&status=${statusFilter}`);
      const data = await res.json();
      if (data.urls) {
        setUrls(data.urls);
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
  }, [user, search, statusFilter]);

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
          urlsCount={urls.length}
          onCreateClick={() => setIsCreateOpen(true)}
        />

        {/* Modular Technical KPI Cards */}
        <DashboardKpiCards
          user={user}
          urls={urls}
          totalClicks={totalClicks}
          activeCount={activeCount}
          expiredCount={expiredCount}
        />

        {/* Modular Search & Filter Toolbar */}
        <DashboardToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onRefresh={fetchUrls}
        />

        {/* Modular Data Table */}
        <DashboardTable
          urls={urls}
          loading={loading}
          search={search}
          copiedId={copiedId}
          onCopy={copyLink}
          onEdit={setEditingUrl}
          onDelete={setDeletingUrl}
          onToggleStatus={setTogglingUrl}
          onSelectQr={setSelectedQrUrl}
          onCreateClick={() => setIsCreateOpen(true)}
        />
      </div>

      {/* Modular Modals */}
      <CreateUrlModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          fetchUrls();
          fetchUserData();
        }}
      />

      <EditUrlModal
        isOpen={!!editingUrl}
        urlItem={editingUrl}
        onClose={() => setEditingUrl(null)}
        onSuccess={fetchUrls}
      />

      <ToggleStatusModal
        urlItem={togglingUrl}
        onClose={() => setTogglingUrl(null)}
        onSuccess={fetchUrls}
      />

      <DeleteUrlModal
        urlItem={deletingUrl}
        onClose={() => setDeletingUrl(null)}
        onSuccess={() => {
          fetchUrls();
          fetchUserData();
        }}
      />

      {selectedQrUrl && (
        <QRCodeModal
          isOpen={!!selectedQrUrl}
          onClose={() => setSelectedQrUrl(null)}
          shortUrl={selectedQrUrl.url}
          title={selectedQrUrl.title}
        />
      )}
    </div>
  );
}
