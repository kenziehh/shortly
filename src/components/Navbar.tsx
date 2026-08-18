'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useCurrentUser, useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-6 py-3.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-border/40 shadow-xs max-w-[1400px] mx-auto w-[94%]">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <span className="font-heading text-2xl font-bold tracking-tight text-primary">
          Shortly<span className="text-foreground">.</span>
        </span>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden lg:flex items-center gap-8">
        <Link
          href="/"
          className={`font-medium text-base transition-colors ${
            pathname === '/' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          Home
        </Link>
        <Link
          href="/#how-it-works"
          className="font-medium text-base text-muted-foreground hover:text-primary transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="/#features"
          className="font-medium text-base text-muted-foreground hover:text-primary transition-colors"
        >
          Features
        </Link>
        <Link
          href="/#pricing"
          className="font-medium text-base text-muted-foreground hover:text-primary transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/#faq"
          className="font-medium text-base text-muted-foreground hover:text-primary transition-colors"
        >
          FAQ
        </Link>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-muted border border-border/40 text-sm font-mono rounded-xl">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground font-semibold max-w-[140px] truncate">{user.name || user.email}</span>
              {user.urlCount !== undefined && (
                <Badge variant="outline" className="font-mono text-xs bg-white text-primary border-border/40">
                  {user.urlCount}/{user.maxUrlLimit}
                </Badge>
              )}
            </div>

            {/* Prominent Primary Blue Dashboard Button */}
            <Link href="/dashboard">
              <Button
                size="sm"
                className="h-10 rounded-xl gap-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-primary-foreground px-5 shadow-md shadow-primary/20 cursor-pointer transition-all hover:scale-[0.98]"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>

            {/* Logout Action */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="rounded-xl text-sm text-destructive hover:bg-destructive/10 cursor-pointer h-10 w-10 p-0 flex items-center justify-center"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-10 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">
                <LogIn className="w-4 h-4 mr-1.5" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="h-10 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-hover text-primary-foreground px-5 shadow-md shadow-primary/20 cursor-pointer">
                <UserPlus className="w-4 h-4 mr-1.5" />
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
