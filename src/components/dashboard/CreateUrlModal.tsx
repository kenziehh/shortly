'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createUrlSchema, type CreateUrlFormValues } from '@/lib/validations/url';
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

interface CreateUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUrlModal({ isOpen, onClose, onSuccess }: CreateUrlModalProps) {
  const [loading, setLoading] = useState(false);
  const [domainHost, setDomainHost] = useState('shortly.to');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainHost(window.location.host);
    }
  }, []);

  const form = useForm<CreateUrlFormValues>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      title: '',
      originalUrl: '',
      customAlias: '',
      password: '',
      maxClicks: '',
      expiresAt: '',
    },
  });

  const onSubmit = async (values: CreateUrlFormValues) => {
    setLoading(true);

    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title || undefined,
          originalUrl: values.originalUrl,
          customAlias: values.customAlias || undefined,
          password: values.password || undefined,
          maxClicks: values.maxClicks ? parseInt(values.maxClicks, 10) : undefined,
          expiresAt: values.expiresAt || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create short link.');
      }

      toast.success('Short link created successfully!');
      form.reset();
      onClose();
      onSuccess();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] p-6 rounded-2xl border border-[#e2e8f0] bg-white shadow-xl space-y-5">
        <DialogHeader className="pb-3 border-b border-[#f1f5f9] text-left">
          <DialogTitle className="text-lg font-bold text-[#0f172a]">
            Create a new short link
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
                    Destination URL <span className="text-rose-500">*</span>
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
                      Password Protection (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-10 rounded-xl text-sm font-mono border-[#e2e8f0]"
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                disabled={loading}
                className="h-10 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold cursor-pointer"
              >
                {loading ? 'Creating...' : 'Create Link'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
