'use client';

import { useState, useEffect, use } from 'react';
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

const COLORS = ['#0038b1', '#5e1400', '#ba1a1a', '#5b5e68', '#444654'];

export default function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/urls/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Analytics data not found or unauthorized');
        return res.json();
      })
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="relative overflow-x-hidden min-h-screen flex items-center justify-center">
        <div className="hero-bg"></div>
        <div className="text-center font-mono text-xs text-[#5b5e68] relative z-10">
          Loading analytics telemetry data...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative overflow-x-hidden min-h-screen flex flex-col items-center justify-center p-6">
        <div className="hero-bg"></div>
        <div className="glass-panel rounded-3xl p-8 max-w-md text-center space-y-4 relative z-10 border border-[#c4c5d6]/50 bg-white/80">
          <div className="p-3.5 bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs font-mono rounded-xl">
            {error || 'Analytics item not found.'}
          </div>
          <Link href="/dashboard">
            <Button className="rounded-xl bg-[#0038b1] text-white hover:bg-[#00257e] text-xs">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { url, analytics } = data;
  const shortUrl = `${typeof window !== 'undefined' ? window.location.protocol + '//' + window.location.host : ''}/${url.shortCode}`;

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Tonal Background Gradient */}
      <div className="hero-bg"></div>

      <main className="pt-[140px] pb-20 px-6 lg:px-8 max-w-[1400px] mx-auto w-full space-y-10 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#c4c5d6]/40">
          <div className="space-y-1">
            <Link href="/dashboard" className="text-xs text-[#0038b1] font-mono hover:underline flex items-center gap-1 font-semibold mb-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38] tracking-tight">
              Analytics: {url.title || url.shortCode}
            </h1>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5b5e68] truncate max-w-2xl">
              <span>Destination:</span>
              <a href={url.originalUrl} target="_blank" rel="noreferrer" className="text-[#0038b1] hover:underline truncate">
                {url.originalUrl}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={copyShortUrl}
              className="h-[48px] px-5 rounded-xl border border-[#c4c5d6]/40 bg-white hover:bg-[#e8edff] text-[#091b38] text-xs font-semibold gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy URL'}
            </Button>
            <Button
              onClick={() => setQrOpen(true)}
              className="h-[48px] px-5 rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white text-xs font-semibold gap-2"
            >
              <QrCode className="w-4 h-4" /> QR Code
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#5b5e68] text-xs font-mono uppercase tracking-wider">
              <span>Total Clicks</span>
              <Eye className="w-4 h-4 text-[#0038b1]" />
            </div>
            <div className="font-heading text-4xl font-extrabold text-[#091b38]">
              {analytics.totalClicks.toLocaleString()}
            </div>
            <div className="text-xs text-[#5b5e68] font-mono">Total visits recorded</div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#5b5e68] text-xs font-mono uppercase tracking-wider">
              <span>Short Code</span>
              <Layers className="w-4 h-4 text-[#0038b1]" />
            </div>
            <div className="font-heading text-xl font-bold text-[#0038b1] font-mono truncate">
              /{url.shortCode}
            </div>
            <div className="text-xs text-[#5b5e68] font-mono">
              {url.customAlias ? 'Custom Alias' : 'Auto Generated'}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#5b5e68] text-xs font-mono uppercase tracking-wider">
              <span>Created At</span>
              <Calendar className="w-4 h-4 text-[#0038b1]" />
            </div>
            <div className="font-heading text-lg font-bold text-[#091b38] font-mono">
              {new Date(url.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-[#5b5e68] font-mono">
              {new Date(url.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#5b5e68] text-xs font-mono uppercase tracking-wider">
              <span>Security & Limits</span>
              <Lock className="w-4 h-4 text-[#0038b1]" />
            </div>
            <div className="text-xs font-mono space-y-1 text-[#091b38]">
              <div>Password: <span className="font-bold">{url.password ? 'Protected' : 'None'}</span></div>
              <div>Max Clicks: <span className="font-bold">{url.maxClicks || 'Unlimited'}</span></div>
            </div>
          </div>
        </div>

        {/* Main Timeline Chart */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#c4c5d6]/40 shadow-[0_16px_64px_rgba(9,27,56,0.06)] bg-white/75 space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#091b38]">
            Traffic Trends over Time (Daily Clicks)
          </h2>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyClicks}>
                <defs>
                  <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0038b1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0038b1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#5b5e68" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#5b5e68" fontSize={11} fontFamily="monospace" allowDecimals={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#c4c5d6', fontSize: '12px', fontFamily: 'monospace', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0038b1" strokeWidth={2} fillOpacity={1} fill="url(#clickGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Charts: Devices & Browsers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#091b38] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#0038b1]" /> Device Breakdown
            </h3>
            {analytics.devices.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#5b5e68]">No device data logged yet.</div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analytics.devices} dataKey="count" nameKey="device" cx="50%" cy="50%" outerRadius={80} label>
                      {analytics.devices.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#c4c5d6', fontSize: '12px', fontFamily: 'monospace', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Browsers */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#091b38] flex items-center gap-2">
              <Laptop className="w-5 h-5 text-[#0038b1]" /> Top Browsers
            </h3>
            {analytics.browsers.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#5b5e68]">No browser data logged yet.</div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.browsers}>
                    <XAxis dataKey="browser" stroke="#5b5e68" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#5b5e68" fontSize={11} fontFamily="monospace" allowDecimals={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#c4c5d6', fontSize: '12px', fontFamily: 'monospace', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" fill="#0038b1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Referrers List */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#c4c5d6]/40 shadow-[0_16px_64px_rgba(9,27,56,0.06)] bg-white/75 space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#091b38] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#0038b1]" /> Top Referrers
          </h3>
          {analytics.referrers.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#5b5e68]">No referrer sources recorded yet.</div>
          ) : (
            <div className="divide-y divide-[#c4c5d6]/30 font-mono text-xs">
              {analytics.referrers.map((r: any, i: number) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <span className="text-[#091b38] font-medium">{r.referrer || 'Direct / Bookmark / None'}</span>
                  <span className="font-bold text-[#0038b1]">{r.count} visits</span>
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
          title={url.title || url.shortCode}
        />
      )}

      {/* Decorative Blobs */}
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#d7e2ff] rounded-full blur-[90px] opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#dce1ff] rounded-full blur-[100px] opacity-40 z-0 pointer-events-none"></div>
    </div>
  );
}
