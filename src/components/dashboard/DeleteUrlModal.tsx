'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface DeleteUrlModalProps {
  urlItem: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteUrlModal({ urlItem, onClose, onSuccess }: DeleteUrlModalProps) {
  const [loading, setLoading] = useState(false);

  const confirmDeleteUrl = async () => {
    if (!urlItem) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/urls/${urlItem.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete short link.');
      }
      toast.success('Short link deleted.');
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
          <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">Delete short link?</h2>
          <p className="text-base text-[#64748b] leading-relaxed">
            Are you sure you want to delete <code className="text-[#0f172a] bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-1 rounded-lg font-mono text-sm font-bold">/{urlItem?.shortCode}</code>? This action is permanent and all click analytics telemetry will be deleted.
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
            onClick={confirmDeleteUrl}
            className="h-11 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer shadow-sm"
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
