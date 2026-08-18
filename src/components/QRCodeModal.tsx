'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortUrl: string;
  title?: string;
}

export default function QRCodeModal({ isOpen, onClose, shortUrl, title }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (isOpen && shortUrl) {
      setRenderError(false);
      setQrDataUrl('');

      QRCode.toDataURL(
        shortUrl,
        {
          width: 320,
          margin: 2,
          color: {
            dark: '#0038b1',
            light: '#ffffff',
          },
        },
        (error, url) => {
          if (error) {
            console.error('QR code generation error:', error);
            setRenderError(true);
          } else {
            setQrDataUrl(url);
          }
        }
      );
    }
  }, [isOpen, shortUrl]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${title || 'shortly'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('QR Code image downloaded!');
  };

  const copyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      toast.success('QR Code image copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Direct image copy not supported by browser. Downloading PNG instead.');
      downloadQR();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-4 text-center">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="font-heading text-xl font-bold text-[#0f172a]">
            {title || 'Short Link QR Code'}
          </DialogTitle>
          <DialogDescription className="text-sm font-mono text-primary truncate font-semibold">
            {shortUrl}
          </DialogDescription>
        </DialogHeader>

        {/* QR Display Frame */}
        <div className="flex justify-center my-2">
          <div className="p-4 bg-white border-2 border-primary/20 rounded-2xl shadow-sm inline-block">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Short URL QR Code"
                className="w-60 h-60 block rounded-xl"
              />
            ) : renderError ? (
              <div className="w-60 h-60 flex items-center justify-center text-sm font-sans text-rose-600">
                Failed to render QR Code
              </div>
            ) : (
              <div className="w-60 h-60 flex flex-col items-center justify-center text-xs font-sans text-[#64748b] gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div>Generating QR Code...</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={copyImage}
            disabled={!qrDataUrl}
            variant="outline"
            className="flex-1 h-11 rounded-xl border-[#e2e8f0] text-sm font-semibold text-[#0f172a] hover:bg-[#f8fafc] gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
            {copied ? 'Copied' : 'Copy Image'}
          </Button>

          <Button
            onClick={downloadQR}
            disabled={!qrDataUrl}
            className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4.5 h-4.5" />
            Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
