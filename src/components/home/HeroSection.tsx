'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ArrowRight,
  Copy,
  Check,
  QrCode,
  Sliders,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import QRCodeModal from '@/components/QRCodeModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HeroSection() {
  const router = useRouter();

  // Form State
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [domainHost, setDomainHost] = useState('shortly.to');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainHost(window.location.host);
    }
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedUrl(null);

    if (!user) {
      toast.info('Please sign in first to shorten long URLs.');
      router.push('/login?redirect=/');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl,
          customAlias: customAlias || undefined,
          password: password || undefined,
          expiresAt: expiresAt || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to shorten URL.');
      }

      setCreatedUrl(data.url);
      toast.success('Short link created successfully!');
      setOriginalUrl('');
      setCustomAlias('');
      setPassword('');
      setExpiresAt('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFullShortUrl = (code: string) => {
    if (typeof window === 'undefined') return `https://${domainHost}/${code}`;
    return `${window.location.protocol}//${window.location.host}/${code}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="text-center mt-6 md:mt-12 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8edff] border border-[#c4c5d6]/50 text-xs font-mono font-bold text-[#0038b1] mb-6">
        <Sparkles className="w-3.5 h-3.5" /> High-Performance Precision Link Management
      </div>

      <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#091b38] tracking-tight leading-[1.1] mb-6 max-w-4xl">
        Short links. <br className="hidden md:inline" />
        <span className="text-[#0038b1]">Clear insights.</span>
      </h1>

      <p className="text-lg md:text-xl text-[#444654] max-w-2xl leading-relaxed mb-10">
        The premium link management platform for modern teams. Transform long URLs into trackable, branded assets in seconds.
      </p>

      {/* URL Shortener Glass Interaction Component */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 w-full max-w-4xl mx-auto flex flex-col gap-4 relative z-10">
        {createdUrl ? (
          <div className="bg-[#e8edff] border border-[#c4c5d6]/50 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-700 font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> SHORTENED URL CREATED
              </span>
              <span>/{createdUrl.shortCode}</span>
            </div>

            <div className="p-3 bg-white border border-[#c4c5d6]/40 font-mono text-sm text-[#0038b1] font-bold truncate rounded-lg">
              {getFullShortUrl(createdUrl.shortCode)}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard(getFullShortUrl(createdUrl.shortCode))}
                size="sm"
                className="flex-1 bg-[#0038b1] hover:bg-[#00257e] text-white gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>

              <Button
                onClick={() => setQrOpen(true)}
                size="sm"
                variant="outline"
                className="bg-white border-[#c4c5d6]/40 text-[#091b38] gap-2"
              >
                <QrCode className="w-4 h-4 text-[#0038b1]" /> QR Code
              </Button>

              <Button
                onClick={() => setCreatedUrl(null)}
                size="sm"
                variant="ghost"
                className="text-xs font-mono text-[#5b5e68]"
              >
                + Shorten Another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="Paste your long destination URL (e.g. https://mybrand.com/campaign)..."
                  required
                  className="h-[56px] pl-4 pr-4 input-glass rounded-xl font-mono text-sm border-[#c4c5d6]/40 text-[#091b38] outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-[56px] px-8 rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white font-semibold text-base w-full md:w-auto flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#0038b1]/20 transition-all hover:scale-[0.98] cursor-pointer"
              >
                {loading ? 'Processing...' : user ? 'Shorten Link' : 'Login to Shorten'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex justify-between items-center px-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-mono text-[#0038b1] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showAdvanced ? 'Hide Advanced Options' : '+ Custom Alias, Password, Expiration Date'}
              </button>

              <p className="text-xs text-[#5b5e68]">
                Press <kbd className="bg-[#e8edff] px-2 py-0.5 rounded font-mono text-[11px] text-[#0038b1]">Enter</kbd> to shorten.
              </p>
            </div>

            {showAdvanced && (
              <div className="p-4 bg-white/80 border border-[#c4c5d6]/40 rounded-xl space-y-3 text-left">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#091b38] mb-1">
                    CUSTOM ALIAS / SLUG (OPTIONAL)
                  </label>
                  <div className="flex items-center input-glass rounded-xl overflow-hidden focus-within:border-[#0038b1] border border-[#c4c5d6]/40 bg-[#f1f3ff]">
                    <span className="px-3.5 py-2.5 bg-white/80 border-r border-[#c4c5d6]/40 text-xs font-mono text-[#0038b1] shrink-0 font-bold select-none">
                      {domainHost}/
                    </span>
                    <input
                      type="text"
                      value={customAlias}
                      onChange={(e) => {
                        const cleanVal = e.target.value.replace(/\//g, '').replace(/[^a-zA-Z0-9_-]/g, '');
                        setCustomAlias(cleanVal);
                      }}
                      placeholder="custom-path"
                      className="w-full h-[44px] px-3 bg-transparent font-mono text-xs text-[#091b38] outline-none border-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase text-[#091b38] mb-1">
                      PASSWORD (OPTIONAL)
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="font-mono text-xs border-[#c4c5d6]/40 bg-[#f1f3ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase text-[#091b38] mb-1">
                      EXPIRATION DATE (OPTIONAL)
                    </label>
                    <Input
                      type="datetime-local"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="font-mono text-xs border-[#c4c5d6]/40 bg-[#f1f3ff]"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {createdUrl && (
        <QRCodeModal
          isOpen={qrOpen}
          onClose={() => setQrOpen(false)}
          shortUrl={getFullShortUrl(createdUrl.shortCode)}
          title={createdUrl.title || createdUrl.shortCode}
        />
      )}
    </section>
  );
}
