'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProfile } from './ProfileProvider';

const NAV = [
  { href: '/', label: 'Today', icon: '☀️' },
  { href: '/curriculum', label: 'Curriculum', icon: '📖' },
  { href: '/gospel', label: 'Gospel', icon: '✝️' },
  { href: '/ask', label: 'Ask', icon: '💬' },
  { href: '/progress', label: 'Progress', icon: '🌱' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, profile, profiles, setActiveProfile } = useProfile();

  // First visit: guide to onboarding.
  useEffect(() => {
    if (ready && profiles.length === 0 && pathname !== '/onboarding') {
      router.replace('/onboarding');
    }
  }, [ready, profiles.length, pathname, router]);

  const onboarding = pathname === '/onboarding';

  return (
    <div className={profile ? `tier-${profile.tier}` : ''}>
      <header className="border-b border-gold-soft bg-white/70 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4 flex-wrap">
          <Link href="/" className="font-display text-2xl font-bold text-marian tracking-tight">
            ✠ Catechise
          </Link>
          {!onboarding && (
            <>
              <nav className="flex gap-1 flex-wrap">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-marian text-white'
                        : 'text-ink-soft hover:bg-gold-soft/50'
                    }`}
                  >
                    <span className="mr-1" aria-hidden>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto flex items-center gap-2">
                {profiles.length > 0 && (
                  <select
                    aria-label="Switch learner"
                    className="rounded-full border border-gold-soft bg-white px-3 py-1.5 text-sm"
                    value={profile?.id ?? ''}
                    onChange={(e) => setActiveProfile(e.target.value)}
                  >
                    {profiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}
                <Link
                  href="/onboarding"
                  className="rounded-full border border-gold-soft bg-white px-3 py-1.5 text-sm text-ink-soft hover:bg-gold-soft/50"
                  title="Add a learner"
                >
                  + Learner
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-ink-soft">
        <p>
          Lesson references follow the <em>Catechism of the Catholic Church</em>, 2nd edition.
          This app is a study companion, not a substitute for parish catechesis or the sacraments.
        </p>
      </footer>
    </div>
  );
}
