'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getLessonRef, orderedLessons } from '@catechise/shared';
import type { AgeTier } from '@catechise/shared';
import { useProfile } from '@/components/ProfileProvider';
import { Quiz } from '@/components/Quiz';
import { MagisteriumPanel } from '@/components/MagisteriumPanel';
import { TIER_LABELS } from '@/lib/storage';

const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  const { ready, profile, completeLesson } = useProfile();
  const [tierOverride, setTierOverride] = useState<AgeTier | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  const ref = getLessonRef(params.lessonId);
  if (!ref) {
    return (
      <p className="text-ink-soft">
        Lesson not found. <Link href="/curriculum" className="underline">Back to the curriculum</Link>.
      </p>
    );
  }
  if (!ready) return null;

  const { lesson, unit, pillar } = ref;
  const tier: AgeTier = tierOverride ?? profile?.tier ?? 'adult';
  const isDone = Boolean(profile?.completed[lesson.id]);
  const next = orderedLessons[ref.index + 1];
  const prev = orderedLessons[ref.index - 1];

  const markDone = () => {
    completeLesson(
      lesson.id,
      quizResult ? { quizScore: quizResult.score, quizTotal: quizResult.total } : undefined,
    );
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header>
        <div className="text-sm text-ink-soft">
          <Link href="/curriculum" className="underline hover:text-marian">
            Pillar {pillar.number}: {pillar.title}
          </Link>{' '}
          · {unit.title}
        </div>
        <h1 className="mt-2 font-display text-4xl font-bold text-marian">{lesson.title}</h1>
        <p className="mt-2 text-ink-soft">
          Catechism §{lesson.ccc} · {lesson.scripture}
        </p>
        <p className="mt-3 rounded-xl bg-gold-soft/50 px-4 py-3 italic">{lesson.objective}</p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink-soft">Written for:</span>
        {TIER_ORDER.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTierOverride(t)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              tier === t ? 'border-marian bg-marian text-white' : 'border-gold-soft bg-white hover:border-marian'
            }`}
          >
            {TIER_LABELS[t]}
          </button>
        ))}
      </div>

      <section className="prose-teaching rounded-2xl border border-gold-soft bg-white p-6 text-lg leading-relaxed shadow-sm whitespace-pre-wrap">
        {lesson.teaching[tier]}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Remember this</h2>
        <ul className="mt-3 space-y-2">
          {lesson.keyPoints.map((kp, i) => (
            <li key={i} className="flex gap-3 rounded-xl bg-white border border-gold-soft px-4 py-3">
              <span aria-hidden>⭐</span>
              <span>{kp}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border-2 border-gold bg-gold-soft/30 p-6">
        <h2 className="font-display text-xl font-bold">🕊️ {lesson.memory.label}</h2>
        <p className="mt-2 text-lg italic leading-relaxed whitespace-pre-wrap">{lesson.memory.text}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Check what you learned</h2>
        <div className="mt-4">
          <Quiz questions={lesson.quiz} onFinish={(score, total) => setQuizResult({ score, total })} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gold-soft bg-white p-5">
          <h3 className="font-semibold">💭 To ponder</h3>
          <p className="mt-2 text-ink-soft">{lesson.reflection[tier]}</p>
        </div>
        <div className="rounded-2xl border border-gold-soft bg-white p-5">
          <h3 className="font-semibold">🤲 Try this today</h3>
          <p className="mt-2 text-ink-soft">{lesson.activity[tier]}</p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Go deeper</h2>
        <p className="mt-1 mb-3 text-sm text-ink-soft">
          Magisterium AI answers from official Church documents, with citations.
        </p>
        <MagisteriumPanel
          buttonLabel={`✨ Go deeper on "${lesson.title}"`}
          buildMessages={() => [
            {
              role: 'user',
              content: buildDeeperPrompt(lesson.title, lesson.ccc, tier),
            },
          ]}
        />
      </section>

      <footer className="space-y-4 border-t border-gold-soft pt-6">
        {!isDone ? (
          <button
            type="button"
            onClick={markDone}
            className="w-full rounded-xl bg-gold px-6 py-4 text-lg font-semibold text-white shadow hover:brightness-110 transition"
          >
            ✓ Mark this lesson complete
          </button>
        ) : (
          <p className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-center font-semibold text-emerald-800">
            Lesson complete — well done!
          </p>
        )}
        <div className="flex justify-between gap-4 text-sm">
          {prev ? (
            <Link href={`/lesson/${prev.lesson.id}`} className="text-marian underline">
              ← {prev.lesson.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/lesson/${next.lesson.id}`}
              className="text-marian underline text-right"
            >
              {next.lesson.title} →
            </Link>
          ) : (
            <button type="button" className="text-marian underline" onClick={() => router.push('/progress')}>
              See your progress →
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}

function buildDeeperPrompt(title: string, ccc: string, tier: AgeTier): string {
  const audience =
    tier === 'child'
      ? 'a young child (explain very simply and warmly, in short sentences)'
      : tier === 'youth'
        ? 'a teenager (be direct and engaging)'
        : 'an adult studying the faith seriously';
  return `I am studying a catechism lesson called "${title}", covering paragraphs ${ccc} of the Catechism of the Catholic Church. Please go deeper: explain the heart of this teaching for ${audience}, add one insight from a saint or Church Father connected to it, and end with one short prayer I could say today. Keep it under 300 words.`;
}
