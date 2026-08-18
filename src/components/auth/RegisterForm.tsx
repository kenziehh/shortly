'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, User, Mail, KeyRound } from 'lucide-react';
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth';
import { useRegister } from '@/hooks/useAuth';
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

export default function RegisterForm() {
  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values);
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
              <FormLabel className="text-sm font-sans font-semibold uppercase text-foreground tracking-wider">
                FULL NAME
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <User className="w-5 h-5 text-[#747685] absolute left-4 z-10 pointer-events-none" />
                  <Input
                    {...field}
                    type="text"
                    placeholder="Alex Morgan"
                    className="w-full h-[56px] pl-[48px] pr-4 rounded-xl text-base text-foreground border-[#e2e8f0] bg-[#f8fafc] focus:bg-white transition-all"
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
              <FormLabel className="text-sm font-sans font-semibold uppercase text-[#091b38] tracking-wider">
                PASSWORD
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <KeyRound className="w-5 h-5 text-[#747685] absolute left-4 z-10 pointer-events-none" />
                  <Input
                    {...field}
                    type="password"
                    placeholder="At least 6 characters"
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
          disabled={registerMutation.isPending}
          className="w-full h-[56px] rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {registerMutation.isPending ? 'Creating account...' : 'Create Free Account'}
          {!registerMutation.isPending && <ArrowRight className="w-5 h-5" />}
        </Button>
      </form>
    </Form>
  );
}
