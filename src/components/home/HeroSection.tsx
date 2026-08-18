'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Lock,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/useAuth';
import { useCreateUrl } from '@/hooks/useUrls';
import QRCodeModal from '@/components/QRCodeModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HeroSection() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const createMutation = useCreateUrl();

  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const [createdUrl, setCreatedUrl] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [domainHost, setDomainHost] = useState('shortly.to');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainHost(window.location.host);
    }
  }, []);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedUrl(null);

    if (!user) {
      toast.info('Please sign in first to shorten long URLs.');
      router.push('/login?redirect=/');
      return;
    }

    createMutation.mutate(
      {
        originalUrl,
        customAlias: customAlias || undefined,
        password: password || undefined,
        expiresAt: expiresAt || undefined,
      },
      {
        onSuccess: (data) => {
          setCreatedUrl(data.url);
          setOriginalUrl('');
          setCustomAlias('');
          setPassword('');
          setExpiresAt('');
        },
      }
    );
  };

  const displaySlug = createdUrl ? (createdUrl.customAlias || createdUrl.shortCode) : '';
  const createdShortLink = `${domainHost}/${displaySlug}`;

  const copyCreatedLink = () => {
    if (!createdShortLink) return;
    navigator.clipboard.writeText(`https://${createdShortLink}`);
    setCopied(true);
    toast.success('Short URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-32 pb-20 px-6 lg:px-8 max-w-[1400px] mx-auto w-full text-center relative overflow-hidden">
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Enterprise Security Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/60 text-primary text-sm font-semibold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>High-Performance Precision Link Management</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Shorten links with <span className="gradient-text">extreme precision</span>
        </h1>

        {/* Hero Description */}
        <p className="text-xl sm:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
          Create custom short links, set password protection, track real-time telemetry analytics, and manage edge redirects effortlessly.
        </p>

        {/* Shortener Form Card */}
        <div className="bg-white border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 text-left max-w-2xl mx-auto mt-10">
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" /> Destination URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="url"
                  required
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/your-very-long-destination-link"
                  className="w-full h-14 pl-4 pr-4 bg-muted/50 border-border/60 rounded-xl text-base font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Optional Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Custom Slug</label>
                <Input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value.replace(/\//g, ''))}
                  placeholder="promo-2026"
                  className="w-full h-10 px-3 bg-muted/40 border-border/60 rounded-xl text-sm font-mono text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block flex items-center gap-1">
                  <Lock className="w-3 h-3 text-primary" /> Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 bg-muted/40 border-border/60 rounded-xl text-sm font-mono text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" /> Expiration
                </label>
                <Input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full h-10 px-3 bg-muted/40 border-border/60 rounded-xl text-xs font-mono text-foreground outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {createMutation.isPending ? 'Generating Short Link...' : 'Shorten Link Now'}
              {!createMutation.isPending && <Sparkles className="w-5 h-5" />}
            </Button>
          </form>

          {/* Success Short Link Display */}
          {createdUrl && (
            <div className="p-4 bg-secondary/80 border border-primary/20 rounded-2xl space-y-3 pt-4">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                Link Created Successfully!
              </div>

              <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-border/40">
                <div className="font-mono text-base font-bold text-primary truncate">
                  https://{createdShortLink}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={copyCreatedLink}
                    className="h-9 px-3 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setQrOpen(true)}
                    className="h-9 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    QR
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {createdUrl && (
        <QRCodeModal
          isOpen={qrOpen}
          onClose={() => setQrOpen(false)}
          shortUrl={`https://${createdShortLink}`}
          title={createdUrl.title || displaySlug}
        />
      )}
    </section>
  );
}
