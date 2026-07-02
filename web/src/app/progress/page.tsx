'use client';

import Link from 'next/link';
import { pillars, totalLessonCount } from '@catechise/shared';
import { useProfile } from '@/components/ProfileProvider';
import { completedCount, estimatedWeeksRemaining, progressPercent, streak } from '@catechise/shared';
import { GOAL_LABELS, PACE_LABELS, TIER_LABELS, type Pace } from '@/lib/storage';
import type { AgeTier } from '@catechise/shared';

const ACCENT_BG: Record<string, string> = {
  sky: 'bg-sky-700',
  rose: 'bg-rose-700',
  emerald: 'bg-emerald-700',
  amber: 'bg-amber-600',
};

const PACE_ORDER: Pace[] = ['gentle', 'steady', 'eager'];
const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];

interface Badge {
  emoji: string;
  label: string;
  earned: boolean;
}

export default function ProgressPage() {
  const { ready, profile, updateProfile, removeProfile } = useProfile();
  if (!ready || !profile) return null;

  const done = completedCount(profile);
  const days = streak(profile);
  const journalCount = Object.keys(profile.journal).length;

  const badges: Badge[] = [
    { emoji: '🌱', label: 'First lesson', earned: done >= 1 },
    { emoji: '🕯️', label: 'Ten lessons', earned: done >= 10 },
    { emoji: '🔥', label: '7-day streak', earned: days >= 7 },
    { emoji: '📖', label: 'First Gospel reflection', earned: journalCount >= 1 },
    { emoji: '✍️', label: 'Ten reflections', earned: journalCount >= 10 },
    {
      emoji: '⛪',
      label: 'Finished Pillar 1',
      earned: pillars[0].units.flatMap((u) => u.lessons).every((l) => profile.completed[l.id]),
    },
    {
      emoji: '🍞',
      label: 'Finished Pillar 2',
      earned: pillars[1].units.flatMap((u) => u.lessons).every((l) => profile.completed[l.id]),
    },
    {
      emoji: '💛',
      label: 'Finished Pillar 3',
      earned: pillars[2].units.flatMap((u) => u.lessons).every((l) => profile.completed[l.id]),
    },
    {
      emoji: '🙏',
      label: 'Finished Pillar 4',
      earned: pillars[3].units.flatMap((u) => u.lessons).every((l) => profile.completed[l.id]),
    },
    { emoji: '👑', label: 'Whole Catechism!', earned: done === totalLessonCount },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-4xl font-bold text-marian">{profile.name}&apos;s journey</h1>
        <p className="mt-2 text-ink-soft">
          {done} of {totalLessonCount} lessons · {progressPercent(profile)}% ·
          {done < totalLessonCount
            ? ` about ${estimatedWeeksRemaining(profile)} weeks to go at this pace`
            : ' complete!'}
        </p>
      </header>

      <section>
        <h2 className="font-display text-2xl font-bold">Badges</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`rounded-2xl border px-4 py-3 text-center ${
                b.earned ? 'border-gold bg-gold-soft/60' : 'border-gold-soft bg-white opacity-40'
              }`}
              title={b.earned ? 'Earned!' : 'Not yet earned'}
            >
              <div className="text-3xl">{b.emoji}</div>
              <div className="mt-1 text-xs font-semibold">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">By pillar</h2>
        <div className="mt-4 space-y-4">
          {pillars.map((p) => {
            const lessons = p.units.flatMap((u) => u.lessons);
            const pillarDone = lessons.filter((l) => profile.completed[l.id]).length;
            const pct = Math.round((pillarDone / lessons.length) * 100);
            return (
              <div key={p.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">
                    Pillar {p.number}: {p.title}
                  </span>
                  <span className="text-ink-soft">
                    {pillarDone}/{lessons.length}
                  </span>
                </div>
                <div className="mt-1 h-3 rounded-full bg-white border border-gold-soft overflow-hidden">
                  <div className={`h-full ${ACCENT_BG[p.accent]} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/curriculum" className="mt-3 inline-block text-sm text-marian underline">
          Browse all lessons →
        </Link>
      </section>

      <section className="rounded-2xl border border-gold-soft bg-white p-6">
        <h2 className="font-display text-2xl font-bold">Settings for {profile.name}</h2>

        <div className="mt-4">
          <p className="font-semibold">Lessons are written for</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TIER_ORDER.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateProfile(profile.id, { tier: t })}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  profile.tier === t
                    ? 'border-marian bg-marian text-white'
                    : 'border-gold-soft bg-white hover:border-marian'
                }`}
              >
                {TIER_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="font-semibold">Daily pace</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PACE_ORDER.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => updateProfile(profile.id, { pace: p })}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  profile.pace === p
                    ? 'border-marian bg-marian text-white'
                    : 'border-gold-soft bg-white hover:border-marian'
                }`}
              >
                {PACE_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {profile.goals.length > 0 && (
          <p className="mt-5 text-sm text-ink-soft">
            Working toward: {profile.goals.map((g) => GOAL_LABELS[g]).join(' · ')}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Remove ${profile.name}'s profile and all progress? This cannot be undone.`)) {
              removeProfile(profile.id);
            }
          }}
          className="mt-6 text-sm text-rose-700 underline"
        >
          Remove this learner
        </button>
      </section>
    </div>
  );
}
