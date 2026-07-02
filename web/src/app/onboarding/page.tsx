'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProfile } from '@/components/ProfileProvider';
import {
  GOAL_LABELS,
  PACE_LABELS,
  TIER_LABELS,
  newProfileId,
  todayISO,
  type Goal,
  type Pace,
} from '@/lib/storage';
import type { AgeTier } from '@catechise/shared';

const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];
const PACE_ORDER: Pace[] = ['gentle', 'steady', 'eager'];
const GOAL_ORDER: Goal[] = ['first-communion', 'confirmation', 'ocia', 'family', 'grow'];

const TIER_BLURBS: Record<AgeTier, string> = {
  child: 'Warm, simple lessons with pictures to draw, prayers to learn, and fun quizzes.',
  youth: 'Straight talk about what we believe and why it matters in real life.',
  adult: 'The full depth of the Catechism, with precise doctrine and daily practices.',
};

export default function OnboardingPage() {
  const router = useRouter();
  const { profiles, addProfile } = useProfile();
  const [name, setName] = useState('');
  const [tier, setTier] = useState<AgeTier | null>(null);
  const [pace, setPace] = useState<Pace>('steady');
  const [goals, setGoals] = useState<Goal[]>([]);

  const canSave = name.trim().length > 0 && tier !== null;

  const toggleGoal = (g: Goal) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const save = () => {
    if (!canSave || !tier) return;
    addProfile({
      id: newProfileId(),
      name: name.trim(),
      tier,
      pace,
      goals,
      createdAt: todayISO(),
      completed: {},
      journal: {},
    });
    router.push('/');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl font-bold text-marian">
        {profiles.length === 0 ? 'Welcome to Catechise' : 'Add a learner'}
      </h1>
      <p className="mt-3 text-ink-soft leading-relaxed">
        A daily companion for learning the Catholic faith — the whole Catechism, one small
        step at a time. Each lesson is written for the learner in front of it, whether that
        is a seven-year-old or a grandparent. Set up a profile for each member of your
        household and switch between them anytime.
      </p>

      <section className="mt-8 space-y-8">
        <div>
          <label htmlFor="name" className="block font-semibold">
            What is the learner&apos;s name?
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Teresa"
            className="mt-2 w-full rounded-xl border border-gold-soft bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-marian"
          />
        </div>

        <div>
          <p className="font-semibold">How should lessons be written?</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {TIER_ORDER.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  tier === t
                    ? 'border-marian bg-marian text-white'
                    : 'border-gold-soft bg-white hover:border-marian'
                }`}
              >
                <div className="font-semibold">{TIER_LABELS[t]}</div>
                <div className={`mt-1 text-sm ${tier === t ? 'text-white/85' : 'text-ink-soft'}`}>
                  {TIER_BLURBS[t]}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Pick a daily pace</p>
          <p className="text-sm text-ink-soft">
            Steady finishes the whole Catechism in about three months; gentle in about six.
            You can change this anytime from the Progress page.
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {PACE_ORDER.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPace(p)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  pace === p
                    ? 'border-marian bg-marian text-white'
                    : 'border-gold-soft bg-white hover:border-marian'
                }`}
              >
                <div className="font-semibold capitalize">{p}</div>
                <div className={`mt-1 text-sm ${pace === p ? 'text-white/85' : 'text-ink-soft'}`}>
                  {PACE_LABELS[p].split('— ')[1]}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Anything you&apos;re working toward? (optional)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOAL_ORDER.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGoal(g)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  goals.includes(g)
                    ? 'border-marian bg-marian text-white'
                    : 'border-gold-soft bg-white hover:border-marian'
                }`}
              >
                {GOAL_LABELS[g]}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={!canSave}
          className="w-full rounded-xl bg-gold px-6 py-4 text-lg font-semibold text-white shadow disabled:opacity-40 hover:brightness-110 transition"
        >
          Begin the journey
        </button>
      </section>
    </div>
  );
}
