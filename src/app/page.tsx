'use client';

import Link from 'next/link';
import { useProfile } from '@/components/ProfileProvider';
import { completedCount, estimatedWeeksRemaining, progressPercent, streak, todaysPlan } from '@/lib/pacing';
import { totalLessonCount } from '@/data/curriculum';
import { todayISO } from '@/lib/storage';

export default function TodayPage() {
  const { ready, profile } = useProfile();

  if (!ready) return null;
  if (!profile) {
    return (
      <p className="text-ink-soft">
        Setting things up… if nothing happens, <Link className="underline" href="/onboarding">create a learner profile</Link>.
      </p>
    );
  }

  const plan = todaysPlan(profile);
  const done = completedCount(profile);
  const pct = progressPercent(profile);
  const days = streak(profile);
  const journaledToday = Boolean(profile.journal[todayISO()]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-4xl font-bold text-marian">
          {greeting()}, {profile.name}.
        </h1>
        <p className="mt-2 text-ink-soft">
          {done === 0
            ? 'Today is a wonderful day to begin.'
            : `You have completed ${done} of ${totalLessonCount} lessons — about ${estimatedWeeksRemaining(profile)} week${estimatedWeeksRemaining(profile) === 1 ? '' : 's'} to go at your pace.`}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold-soft px-4 py-1.5 text-sm font-semibold">
            🔥 {days} day{days === 1 ? '' : 's'} in a row
          </span>
          <div className="flex-1 min-w-40 h-3 rounded-full bg-white border border-gold-soft overflow-hidden">
            <div className="h-full bg-marian transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm text-ink-soft">{pct}%</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gold-soft bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold">Today&apos;s lesson{plan.length > 1 ? 's' : ''}</h2>
          {plan.length === 0 ? (
            <p className="mt-3 text-ink-soft">
              {done === totalLessonCount
                ? 'You have walked the whole Catechism — Deo gratias! Revisit any lesson, or keep praying with the daily Gospel.'
                : 'A rest day at your gentle pace. The daily Gospel below still awaits you.'}
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {plan.map((ref) => (
                <li key={ref.lesson.id}>
                  <Link
                    href={`/lesson/${ref.lesson.id}`}
                    className="block rounded-xl border border-gold-soft p-4 hover:border-marian transition-colors"
                  >
                    <div className="text-xs uppercase tracking-wide text-ink-soft">
                      Pillar {ref.pillar.number} · {ref.unit.title}
                    </div>
                    <div className="mt-1 font-semibold text-lg">{ref.lesson.title}</div>
                    <div className="mt-1 text-sm text-ink-soft">
                      CCC {ref.lesson.ccc} · {ref.lesson.scripture}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-gold-soft bg-white p-6 shadow-sm flex flex-col">
          <h2 className="font-display text-xl font-bold">Daily Gospel</h2>
          <p className="mt-3 text-ink-soft flex-1">
            {journaledToday
              ? 'You have already reflected on today’s Gospel — well done. You can revisit or add to your reflection.'
              : 'Read today’s Gospel, sit with it for a moment, and write a short reflection.'}
          </p>
          <Link
            href="/gospel"
            className="mt-4 inline-block rounded-xl bg-marian px-5 py-3 text-center font-semibold text-white hover:brightness-110 transition"
          >
            {journaledToday ? 'Return to today’s Gospel' : 'Open today’s Gospel'}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-gold-soft bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold">Have a question about the faith?</h2>
        <p className="mt-2 text-ink-soft">
          Ask anything — from &quot;why do we pray to saints?&quot; to &quot;what happens at Mass?&quot; —
          and get an answer grounded in Church documents, with citations, powered by Magisterium AI.
        </p>
        <Link
          href="/ask"
          className="mt-4 inline-block rounded-xl border border-marian px-5 py-3 font-semibold text-marian hover:bg-marian hover:text-white transition"
        >
          Ask Magisterium AI
        </Link>
      </section>
    </div>
  );
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
