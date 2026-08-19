import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Verification',
  description: 'Enter passcode to unlock this protected short link.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
