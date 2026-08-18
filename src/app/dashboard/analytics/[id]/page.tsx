'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Copy,
  Check,
  QrCode,
  Lock,
  Calendar,
  Globe2,
  Laptop,
  Smartphone,
  Eye,
  Layers,
} from 'lucide-react';
import { useGetUrlAnalytics } from '@/hooks/useAnalytics';
import QRCodeModal from '@/components/QRCodeModal';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

// Distinct, vibrant color palettes for each category
const DEVICE_COLORS: Record<string, string> = {
  Desktop: '#0038b1',  // Primary Blue
  Mobile: '#059669',   // Emerald Green
  Tablet: '#7c3aed',   // Violet Purple
  Other: '#d97706',    // Amber Orange
};

const BROWSER_COLORS: Record<string, string> = {
  Chrome: '#0284c7',   // Sky Blue
  Safari: '#4f46e5',   // Indigo
  Firefox: '#ea580c',  // Deep Orange
  Edge: '#0d9488',     // Teal
  Other: '#64748b',    // Slate
};

const COLOR_PALETTE = ['#0038b1', '#059669', '#7c3aed', '#ea580c', '#0284c7', '#0d9488', '#e11d48', '#d97706'];

export default function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  // TanStack React Query for Analytics Data
  const { data, isLoading, error } = useGetUrlAnalytics(id);

  if (isLoading) {
    return (
      <div className="relative overflow-x-hidden min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center font-sans text-sm text-[#5b5e68] space-y-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>Loading analytics telemetry data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc]">
        <div className="rounded-3xl p-8 max-w-md text-center space-y-4 border border-[#e2e8f0] bg-white shadow-xl">
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-sans rounded-xl font-medium">
            {(error as any)?.message || 'Analytics item not found.'}
          </div>
          <Link href="/dashboard">
            <Button className="rounded-xl bg-primary text-white hover:bg-primary-hover text-sm font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { url } = data;
  const analytics = data.analytics || data.telemetry || {};
  const displaySlug = url.customAlias || url.shortCode;
  const shortUrl = `${typeof window !== 'undefined' ? window.location.protocol + '//' + window.location.host : ''}/${displaySlug}`;

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#f8fafc]">
      <main className="pt-28 pb-20 px-6 lg:px-8 max-w-[1400px] mx-auto w-full space-y-10 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e2e8f0]">
          <div className="space-y-1">
            <Link href="/dashboard" className="text-sm text-primary font-sans hover:underline flex items-center gap-1 font-semibold mb-1">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Analytics: {url.title || displaySlug}
            </h1>
            <div className="flex items-center gap-2 text-sm font-mono text-[#64748b] truncate max-w-2xl">
              <span>Destination:</span>
              <a href={url.originalUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate font-medium">
                {url.originalUrl}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={copyShortUrl}
              className="h-11 px-5 rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-sm font-semibold gap-2 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
            <Button
              onClick={() => setQrOpen(true)}
              className="h-11 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold gap-2 shadow-xs cursor-pointer"
            >
              <QrCode className="w-4 h-4" /> QR Code
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748b] text-xs font-sans font-semibold uppercase tracking-wider">
              <span>Total Clicks</span>
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div className="font-heading text-4xl font-extrabold text-[#0f172a]">
              {(analytics.totalClicks ?? url.clickCount ?? 0).toLocaleString()}
            </div>
            <div className="text-xs text-[#64748b] font-sans">Total visits recorded</div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748b] text-xs font-sans font-semibold uppercase tracking-wider">
              <span>Short Code / Slug</span>
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div className="font-heading text-xl font-bold text-primary font-mono truncate">
              /{displaySlug}
            </div>
            <div className="text-xs text-[#64748b] font-sans">
              {url.customAlias ? 'Custom Alias Slug' : 'Auto Generated Code'}
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748b] text-xs font-sans font-semibold uppercase tracking-wider">
              <span>Created At</span>
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div className="font-heading text-lg font-bold text-[#0f172a] font-sans">
              {new Date(url.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-[#64748b] font-sans">
              {new Date(url.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748b] text-xs font-sans font-semibold uppercase tracking-wider">
              <span>Security & Limits</span>
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs font-sans space-y-1 text-[#0f172a]">
              <div>Password: <span className="font-bold">{url.password ? 'Protected' : 'None'}</span></div>
              <div>Max Clicks: <span className="font-bold">{url.maxClicks ? url.maxClicks.toLocaleString() : 'Unlimited'}</span></div>
            </div>
          </div>
        </div>

        {/* Main Timeline Chart */}
        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#0f172a]">
            Traffic Trends over Time (Daily Clicks)
          </h2>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyClicks || []}>
                <defs>
                  <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0038b1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0038b1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} fontFamily="sans-serif" />
                <YAxis stroke="#64748b" fontSize={12} fontFamily="sans-serif" allowDecimals={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', fontSize: '13px', fontFamily: 'sans-serif', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0038b1" strokeWidth={2.5} fillOpacity={1} fill="url(#clickGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Charts: Devices & Browsers with Multi-Color Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types Doughnut Chart */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-heading text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" /> Device Breakdown
            </h3>
            {(!analytics.devices || analytics.devices.length === 0) ? (
              <div className="p-8 text-center text-sm font-sans text-[#64748b]">No device data logged yet.</div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.devices}
                      dataKey="count"
                      nameKey="device"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={4}
                      label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {analytics.devices.map((entry: any, index: number) => {
                        const color = DEVICE_COLORS[entry.device] || COLOR_PALETTE[index % COLOR_PALETTE.length];
                        return <Cell key={`device-cell-${index}`} fill={color} stroke="#ffffff" strokeWidth={2} />;
                      })}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', fontSize: '13px', fontFamily: 'sans-serif', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Top Browsers Bar Chart with Distinct Colors */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-heading text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <Laptop className="w-5 h-5 text-primary" /> Top Browsers
            </h3>
            {(!analytics.browsers || analytics.browsers.length === 0) ? (
              <div className="p-8 text-center text-sm font-sans text-[#64748b]">No browser data logged yet.</div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.browsers}>
                    <XAxis dataKey="browser" stroke="#64748b" fontSize={12} fontFamily="sans-serif" />
                    <YAxis stroke="#64748b" fontSize={12} fontFamily="sans-serif" allowDecimals={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', fontSize: '13px', fontFamily: 'sans-serif', borderRadius: '12px' }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {analytics.browsers.map((entry: any, index: number) => {
                        const color = BROWSER_COLORS[entry.browser] || COLOR_PALETTE[index % COLOR_PALETTE.length];
                        return <Cell key={`browser-cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Referrers List */}
        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#0f172a] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-primary" /> Top Referrers
          </h3>
          {(!analytics.referrers || analytics.referrers.length === 0) ? (
            <div className="p-8 text-center text-sm font-sans text-[#64748b]">No referrer sources recorded yet.</div>
          ) : (
            <div className="divide-y divide-[#e2e8f0] font-sans text-sm">
              {analytics.referrers.map((r: any, i: number) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <span className="text-[#0f172a] font-medium">{r.referrer || 'Direct / Bookmark / None'}</span>
                  <span className="font-bold text-primary">{r.count} visits</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {url && (
        <QRCodeModal
          isOpen={qrOpen}
          onClose={() => setQrOpen(false)}
          shortUrl={shortUrl}
          title={url.title || displaySlug}
        />
      )}
    </div>
  );
}
