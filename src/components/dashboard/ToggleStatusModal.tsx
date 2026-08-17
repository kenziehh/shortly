'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ToggleStatusModalProps {
  urlItem: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ToggleStatusModal({ urlItem, onClose, onSuccess }: ToggleStatusModalProps) {
  const [loading, setLoading] = useState(false);

  if (!urlItem) return null;

  const isCurrentlyActive = urlItem.isActive;

  const confirmToggleStatus = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/urls/${urlItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isCurrentlyActive }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update link status.');
      }

      toast.success(isCurrentlyActive ? 'Link deactivated.' : 'Link activated.');
      onClose();
      onSuccess();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!urlItem} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[520px] p-8 rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl space-y-6">
        <div className="space-y-3 text-left">
          <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">
            {isCurrentlyActive ? 'Deactivate short link?' : 'Activate short link?'}
          </h2>
          <p className="text-base text-[#64748b] leading-relaxed">
            {isCurrentlyActive ? (
              <>
                Deactivate <code className="text-[#0f172a] bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-1 rounded-lg font-mono text-sm font-bold">/{urlItem?.shortCode}</code>? Visitors will receive an expired page until reactivated.
              </>
            ) : (
              <>
                Reactivate <code className="text-[#0f172a] bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-1 rounded-lg font-mono text-sm font-bold">/{urlItem?.shortCode}</code>? Visitors will immediately be redirected.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 px-6 rounded-xl border-[#e2e8f0] text-sm font-semibold text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={confirmToggleStatus}
            className={`h-11 px-6 rounded-xl text-white text-sm font-semibold cursor-pointer shadow-sm ${
              isCurrentlyActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#0038b1] hover:bg-[#00257e]'
            }`}
          >
            {loading ? 'Updating...' : isCurrentlyActive ? 'Deactivate Link' : 'Activate Link'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
