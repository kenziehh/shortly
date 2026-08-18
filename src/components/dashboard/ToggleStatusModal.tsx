'use client';

import { useToggleUrlStatus } from '@/hooks/useUrls';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ToggleStatusModalProps {
  urlItem: any | null;
  onClose: () => void;
}

export default function ToggleStatusModal({ urlItem, onClose }: ToggleStatusModalProps) {
  const toggleMutation = useToggleUrlStatus();

  if (!urlItem) return null;

  const isCurrentlyActive = urlItem.isActive;

  const confirmToggleStatus = () => {
    toggleMutation.mutate(
      { id: urlItem.id, isActive: !isCurrentlyActive },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={!!urlItem} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-5">
        <div className="space-y-2 text-left">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl mb-2 ${
            isCurrentlyActive ? 'bg-amber-50 border border-amber-100 text-amber-600' : 'bg-emerald-50 border border-emerald-100 text-emerald-600'
          }`}>
            {isCurrentlyActive ? '⏸' : '▶'}
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0f172a]">
            {isCurrentlyActive ? 'Deactivate short link?' : 'Reactivate short link?'}
          </h3>
          <p className="text-sm text-[#64748b] font-sans leading-relaxed">
            {isCurrentlyActive ? (
              <>
                Deactivating <strong className="text-[#0f172a]">/{urlItem.customAlias || urlItem.shortCode}</strong> will cause visitors to see an expired page instead of redirecting.
              </>
            ) : (
              <>
                Reactivating <strong className="text-[#0f172a]">/{urlItem.customAlias || urlItem.shortCode}</strong> will restore instant redirects for all visitors.
              </>
            )}
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
            onClick={confirmToggleStatus}
            disabled={toggleMutation.isPending}
            className={`h-10 px-5 rounded-xl text-white text-sm font-semibold cursor-pointer shadow-xs ${
              isCurrentlyActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {toggleMutation.isPending
              ? isCurrentlyActive ? 'Deactivating...' : 'Reactivating...'
              : isCurrentlyActive ? 'Confirm Deactivate' : 'Confirm Reactivate'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
