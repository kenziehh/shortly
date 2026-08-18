'use client';

import { useDeleteUrl } from '@/hooks/useUrls';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface DeleteUrlModalProps {
  urlItem: any | null;
  onClose: () => void;
}

export default function DeleteUrlModal({ urlItem, onClose }: DeleteUrlModalProps) {
  const deleteMutation = useDeleteUrl();

  if (!urlItem) return null;

  const confirmDeleteUrl = () => {
    deleteMutation.mutate(urlItem.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={!!urlItem} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-5">
        <div className="space-y-2 text-left">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold text-xl mb-2">
            !
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0f172a]">
            Delete short link permanently?
          </h3>
          <p className="text-sm text-[#64748b] font-sans leading-relaxed">
            Are you sure you want to delete <strong className="text-[#0f172a]">/{urlItem.customAlias || urlItem.shortCode}</strong>? This action cannot be undone and all analytics history will be erased.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 px-5 rounded-xl border-[#e2e8f0] text-sm font-semibold text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={confirmDeleteUrl}
            disabled={deleteMutation.isPending}
            className="h-10 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold cursor-pointer shadow-xs"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
