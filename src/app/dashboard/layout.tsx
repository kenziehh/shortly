import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Console',
  description: 'Manage your short URLs, view analytics telemetry, and configure link settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
