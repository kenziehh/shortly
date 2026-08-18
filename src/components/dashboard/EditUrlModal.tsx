'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUrlSchema, type EditUrlFormValues } from '@/lib/validations/url';
import { useUpdateUrl } from '@/hooks/useUrls';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface EditUrlModalProps {
  isOpen: boolean;
  urlItem: any | null;
  onClose: () => void;
}

const formatLocalDatetime = (dateInput: Date | string) => {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function EditUrlModal({ isOpen, urlItem, onClose }: EditUrlModalProps) {
  const updateMutation = useUpdateUrl();

  // Removal Checkboxes State
  const [removePassword, setRemovePassword] = useState(false);
  const [removeMaxClicks, setRemoveMaxClicks] = useState(false);
  const [removeExpiresAt, setRemoveExpiresAt] = useState(false);

  const [domainHost, setDomainHost] = useState('shortly.to');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainHost(window.location.host);
    }
  }, []);

  const form = useForm<EditUrlFormValues>({
    resolver: zodResolver(editUrlSchema),
    defaultValues: {
      title: '',
      originalUrl: '',
      customAlias: '',
      password: '',
      maxClicks: '',
      expiresAt: '',
    },
  });

  useEffect(() => {
    if (urlItem) {
      setRemovePassword(false);
      setRemoveMaxClicks(false);
      setRemoveExpiresAt(false);

      form.reset({
        title: urlItem.title || '',
        originalUrl: urlItem.originalUrl || '',
        customAlias: urlItem.customAlias || '',
        password: '',
        maxClicks: urlItem.maxClicks ? String(urlItem.maxClicks) : '',
        expiresAt: urlItem.expiresAt ? formatLocalDatetime(urlItem.expiresAt) : '',
      });
    }
  }, [urlItem, form]);

  const onSubmit = (values: EditUrlFormValues) => {
    if (!urlItem) return;

    updateMutation.mutate(
      {
        id: urlItem.id,
        payload: {
          title: values.title || '',
          originalUrl: values.originalUrl,
          customAlias: values.customAlias || '',
          password: values.password || '',
          removePassword: removePassword,
          maxClicks: removeMaxClicks ? '' : values.maxClicks || '',
          removeMaxClicks: removeMaxClicks,
          expiresAt: removeExpiresAt ? '' : values.expiresAt || '',
          removeExpiresAt: removeExpiresAt,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const hasAnyActiveRules = urlItem?.password || urlItem?.maxClicks || urlItem?.expiresAt;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-5">
        <DialogHeader className="pb-3 border-b border-[#f1f5f9] text-left">
          <DialogTitle className="text-lg font-bold text-[#0f172a]">
            Edit link settings
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-1">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#0f172a]">
                    Title (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. Summer Campaign 2026"
                      className="h-10 rounded-xl text-sm font-sans border-[#e2e8f0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destination URL Field */}
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#0f172a]">
                    Destination URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://example.com/very-long-url"
                      className="h-10 rounded-xl text-sm font-mono border-[#e2e8f0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Alias Field */}
            <FormField
              control={form.control}
              name="customAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#0f172a]">
                    Custom Slug (optional)
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center rounded-xl border border-[#e2e8f0] overflow-hidden focus-within:border-primary">
                      <span className="px-3.5 py-2.5 bg-[#f8fafc] border-r border-[#e2e8f0] text-sm font-mono text-[#64748b] shrink-0 font-semibold select-none">
                        {domainHost}/
                      </span>
                      <Input
                        {...field}
                        type="text"
                        onChange={(e) => {
                          const clean = e.target.value.replace(/\//g, '').replace(/[^a-zA-Z0-9_-]/g, '');
                          field.onChange(clean);
                        }}
                        placeholder="promo-2026"
                        className="w-full h-10 px-3 bg-transparent font-mono text-sm text-[#0f172a] border-none shadow-none focus-visible:ring-0 outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Advanced Grid */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-[#64748b]">
                      New Password (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder={urlItem?.password ? "•••••••• (Encrypted)" : "••••••••"}
                        className="h-10 rounded-xl text-sm font-mono border-[#e2e8f0]"
                        disabled={removePassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxClicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-[#64748b]">
                      Click Limit (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="e.g. 1000"
                        className="h-10 rounded-xl text-sm font-mono border-[#e2e8f0]"
                        disabled={removeMaxClicks}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Expiration Date Field */}
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-[#64748b]">
                    Expiration Date (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      className="h-10 rounded-xl text-sm font-mono border-[#e2e8f0]"
                      disabled={removeExpiresAt}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Removal Checkboxes Grid */}
            {hasAnyActiveRules && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase text-[#64748b] tracking-wider">
                  Active Restrictions & Removal
                </div>

                {/* Remove Password Checkbox */}
                {urlItem?.password && (
                  <div className="flex items-center gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      id="removePassCheck"
                      checked={removePassword}
                      onChange={(e) => setRemovePassword(e.target.checked)}
                      className="w-4 h-4 rounded border-amber-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <label htmlFor="removePassCheck" className="text-xs font-semibold text-rose-700 cursor-pointer select-none">
                      Remove existing password protection
                    </label>
                  </div>
                )}

                {/* Remove Click Limit Checkbox */}
                {urlItem?.maxClicks && (
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      id="removeClicksCheck"
                      checked={removeMaxClicks}
                      onChange={(e) => setRemoveMaxClicks(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="removeClicksCheck" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                      Remove click limit (set to Unlimited)
                    </label>
                  </div>
                )}

                {/* Remove Expiration Date Checkbox */}
                {urlItem?.expiresAt && (
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      id="removeExpiresCheck"
                      checked={removeExpiresAt}
                      onChange={(e) => setRemoveExpiresAt(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="removeExpiresCheck" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                      Remove expiration date (set to No Expiration)
                    </label>
                  </div>
                )}
              </div>
            )}

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
                type="submit"
                disabled={updateMutation.isPending}
                className="h-10 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold cursor-pointer"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
