'use client';

import { useRef, useEffect, useState } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (isOpen && shortUrl && canvasRef.current) {
      setRenderError(false);
      QRCode.toCanvas(
        canvasRef.current,
        shortUrl,
        {
          width: 260,
          margin: 2,
          color: {
            dark: '#0038b1',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) {
            console.error('QR code generation error:', error);
            setRenderError(true);
          }
        }
      );
    }
  }, [isOpen, shortUrl]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${title || 'shortly'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('QR Code image downloaded!');
  };

  const copyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        toast.success('QR Code copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      toast.error('Clipboard copy not supported on this browser.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-4 text-center">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="font-heading text-xl font-bold text-[#0f172a]">
            {title || 'Short Link QR Code'}
          </DialogTitle>
          <DialogDescription className="text-sm font-mono text-[#64748b] truncate">
            {shortUrl}
          </DialogDescription>
        </DialogHeader>

        {/* QR Display Frame */}
        <div className="flex justify-center my-4">
          <div className="p-4 bg-white border-2 border-[#0038b1]/20 rounded-2xl shadow-md inline-block">
            <canvas ref={canvasRef} className="block rounded-lg max-w-full" />
            {renderError && (
              <div className="w-56 h-56 flex items-center justify-center text-sm font-mono text-[#64748b]">
                Failed to render QR
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={copyImage}
            variant="outline"
            className="flex-1 h-11 rounded-xl border-[#e2e8f0] text-sm font-semibold text-[#0f172a] hover:bg-[#f8fafc] gap-2"
          >
            {copied ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
            {copied ? 'Copied' : 'Copy Image'}
          </Button>

          <Button
            onClick={downloadQR}
            className="flex-1 h-11 rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white text-sm font-semibold gap-2 shadow-md shadow-[#0038b1]/20"
          >
            <Download className="w-4.5 h-4.5" />
            Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
