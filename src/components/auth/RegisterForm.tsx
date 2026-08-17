'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowRight, User, Mail, KeyRound } from 'lucide-react';
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account.');
      }

      toast.success('Account created successfully! Welcome to Shortly.');
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-mono font-semibold uppercase text-[#091b38] tracking-wider">
                FULL NAME
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <User className="w-5 h-5 text-[#747685] absolute left-4" />
                  <input
                    {...field}
                    type="text"
                    placeholder="Alex Morgan"
                    className="input-glass w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-[#091b38] outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-mono font-semibold uppercase text-[#091b38] tracking-wider">
                EMAIL ADDRESS
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 text-[#747685] absolute left-4" />
                  <input
                    {...field}
                    type="email"
                    placeholder="alex@company.com"
                    className="input-glass w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-[#091b38] outline-none"
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
              <FormLabel className="text-sm font-mono font-semibold uppercase text-[#091b38] tracking-wider">
                PASSWORD
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <KeyRound className="w-5 h-5 text-[#747685] absolute left-4" />
                  <input
                    {...field}
                    type="password"
                    placeholder="At least 6 characters"
                    className="input-glass w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-[#091b38] outline-none"
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
          className="w-full h-[56px] rounded-xl bg-[#0038b1] hover:bg-[#00257e] text-white font-semibold text-lg shadow-lg shadow-[#0038b1]/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {loading ? 'Creating account...' : 'Create Free Account'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </Button>
      </form>
    </Form>
  );
}
