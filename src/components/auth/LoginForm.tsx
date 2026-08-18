'use client';

import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail, KeyRound } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { useLogin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

function LoginFormContent() {
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
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
                  <Mail className="w-5 h-5 text-[#747685] absolute left-4 z-10 pointer-events-none" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-foreground border-[#e2e8f0] bg-[#f8fafc] focus:bg-white transition-all"
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
                  <KeyRound className="w-5 h-5 text-[#747685] absolute left-4 z-10 pointer-events-none" />
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-foreground border-[#e2e8f0] bg-[#f8fafc] focus:bg-white transition-all"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full h-[56px] rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign In to Dashboard'}
          {!loginMutation.isPending && <ArrowRight className="w-5 h-5" />}
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
