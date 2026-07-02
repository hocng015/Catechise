'use client';

import Link from 'next/link';
import { pillars } from '@/data/curriculum';
import { useProfile } from '@/components/ProfileProvider';

const ACCENT_BG: Record<string, string> = {
  sky: 'bg-sky-700',
  rose: 'bg-rose-700',
  emerald: 'bg-emerald-700',
  amber: 'bg-amber-600',
};

export default function CurriculumPage() {
  const { profile } = useProfile();
  const completed = profile?.completed ?? {};

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-bold text-marian">The Whole Faith, in Four Pillars</h1>
        <p className="mt-2 max-w-3xl text-ink-soft leading-relaxed">
          The Catechism of the Catholic Church teaches the faith in four parts: what we
          believe, how we worship, how we live, and how we pray. Every lesson below is keyed
          to the Catechism&apos;s own paragraphs, so by the end you will have walked through all
          of it — paragraphs 1 to 2865.
        </p>
      </div>

      {pillars.map((pillar) => {
        const lessons = pillar.units.flatMap((u) => u.lessons);
        const done = lessons.filter((l) => completed[l.id]).length;
        return (
          <section key={pillar.id}>
            <div className="flex flex-wrap items-baseline gap-3">
              <span
                className={`${ACCENT_BG[pillar.accent]} rounded-full px-3 py-1 text-sm font-bold text-white`}
              >
                Pillar {pillar.number}
              </span>
              <h2 className="font-display text-2xl font-bold">{pillar.title}</h2>
              <span className="text-sm text-ink-soft">
                CCC {pillar.ccc} · {done}/{lessons.length} lessons
              </span>
            </div>
            <p className="mt-1 text-ink-soft">{pillar.subtitle}</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {pillar.units.map((unit) => {
                const unitDone = unit.lessons.filter((l) => completed[l.id]).length;
                return (
                  <div key={unit.id} className="rounded-2xl border border-gold-soft bg-white p-5 shadow-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-lg">{unit.title}</h3>
                      <span className="shrink-0 text-xs text-ink-soft">CCC {unit.ccc}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">{unit.summary}</p>
                    <ol className="mt-3 space-y-1.5">
                      {unit.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <Link
                            href={`/lesson/${lesson.id}`}
                            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gold-soft/40 transition-colors"
                          >
                            <span aria-hidden className={completed[lesson.id] ? '' : 'opacity-30'}>
                              {completed[lesson.id] ? '✅' : '⭕'}
                            </span>
                            <span className="group-hover:text-marian">{lesson.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-3 h-1.5 rounded-full bg-parchment overflow-hidden">
                      <div
                        className={`h-full ${ACCENT_BG[pillar.accent]}`}
                        style={{ width: `${(unitDone / unit.lessons.length) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
