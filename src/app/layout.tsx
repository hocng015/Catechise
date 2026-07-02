import type { Metadata } from 'next';
import './globals.css';
import { ProfileProvider } from '@/components/ProfileProvider';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Catechise — Learn the Catholic Faith, One Day at a Time',
  description:
    'A daily catechesis companion for children and adults, covering the whole Catechism of the Catholic Church with daily Gospel reflections and Magisterium AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ProfileProvider>
          <AppShell>{children}</AppShell>
        </ProfileProvider>
      </body>
    </html>
  );
}
