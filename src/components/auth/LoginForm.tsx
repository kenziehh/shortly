'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowRight, Mail, KeyRound } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      toast.success('Signed in successfully! Welcome back.');
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-sans font-semibold uppercase text-foreground tracking-wider">
                EMAIL ADDRESS
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 text-[#747685] absolute left-4" />
                  <input
                    {...field}
                    type="email"
                    placeholder="alex@company.com"
                    className="input-glass w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-foreground outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-sans font-semibold uppercase text-foreground tracking-wider">
                PASSWORD
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <KeyRound className="w-5 h-5 text-[#747685] absolute left-4" />
                  <input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="input-glass w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-foreground outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-[56px] rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </Button>
      </form>
    </Form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="py-6 text-center text-sm font-sans text-muted-foreground">Loading form...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
