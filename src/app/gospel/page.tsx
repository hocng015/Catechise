'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '@/components/ProfileProvider';
import { MagisteriumPanel } from '@/components/MagisteriumPanel';
import { todayISO } from '@/lib/storage';
import type { AgeTier } from '@/data/types';

interface GospelData {
  source: 'lectionary' | 'fallback';
  date: string;
  liturgicalDay: string | null;
  title: string;
  text: string;
}

const PROMPTS: Record<AgeTier, string[]> = {
  child: [
    'What is your favorite part of this story?',
    'What do you think Jesus wants you to do today?',
  ],
  youth: [
    'What word or line stands out to you? Why?',
    'If Jesus said this directly to you today, what would change?',
  ],
  adult: [
    'What word or phrase stops you? Stay with it.',
    'Where does this Gospel meet your life today — and what is one concrete response?',
  ],
};

export default function GospelPage() {
  const { ready, profile, saveJournal } = useProfile();
  const [gospel, setGospel] = useState<GospelData | null>(null);
  const [failed, setFailed] = useState(false);
  const today = todayISO();
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [loadedEntry, setLoadedEntry] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/gospel?date=${today}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setGospel(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [today]);

  useEffect(() => {
    if (ready && profile && !loadedEntry) {
      setEntry(profile.journal[today] ?? '');
      setLoadedEntry(true);
    }
  }, [ready, profile, loadedEntry, today]);

  const tier: AgeTier = profile?.tier ?? 'adult';

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-4xl font-bold text-marian">Today&apos;s Gospel</h1>
        <p className="mt-2 text-ink-soft">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {gospel?.liturgicalDay ? ` · ${gospel.liturgicalDay}` : ''}
        </p>
      </header>

      {!gospel && !failed && <p className="text-ink-soft">Opening the lectionary…</p>}
      {failed && (
        <p className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-800">
          Could not load today&apos;s Gospel. Please try again in a moment.
        </p>
      )}

      {gospel && (
        <>
          <section className="rounded-2xl border border-gold-soft bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold">{gospel.title}</h2>
            {gospel.source === 'fallback' && (
              <p className="mt-1 text-xs text-ink-soft">
                The live lectionary is unreachable right now, so here is a Gospel passage chosen for today.
              </p>
            )}
            <div className="prose-teaching mt-4 whitespace-pre-wrap text-lg leading-relaxed">
              {gospel.text}
            </div>
          </section>

          <section className="rounded-2xl border border-gold-soft bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold">💭 Sit with it</h2>
            <ul className="mt-3 space-y-2 text-ink-soft">
              {PROMPTS[tier].map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
            <label htmlFor="journal" className="mt-5 block font-semibold">
              My reflection for today
            </label>
            <textarea
              id="journal"
              value={entry}
              onChange={(e) => {
                setEntry(e.target.value);
                setSaved(false);
              }}
              rows={5}
              placeholder={
                tier === 'child'
                  ? 'You can write or draw on paper — then write one sentence here!'
                  : 'Write freely. This stays on your device.'
              }
              className="mt-2 w-full rounded-xl border border-gold-soft bg-parchment px-4 py-3 focus:outline-none focus:ring-2 focus:ring-marian"
            />
            <button
              type="button"
              onClick={() => {
                saveJournal(today, entry);
                setSaved(true);
              }}
              disabled={entry.trim().length === 0}
              className="mt-3 rounded-xl bg-marian px-5 py-3 font-semibold text-white disabled:opacity-40 hover:brightness-110 transition"
            >
              {saved ? '✓ Saved' : 'Save reflection'}
            </button>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">A guided reflection</h2>
            <p className="mt-1 mb-3 text-sm text-ink-soft">
              Let Magisterium AI offer a short reflection on this Gospel, drawn from the Church&apos;s teaching.
            </p>
            <MagisteriumPanel
              buttonLabel="✨ Reflect with Magisterium AI"
              buildMessages={() => [
                {
                  role: 'user',
                  content: buildReflectionPrompt(gospel, tier),
                },
              ]}
            />
          </section>
        </>
      )}
    </div>
  );
}

function buildReflectionPrompt(gospel: GospelData, tier: AgeTier): string {
  const audience =
    tier === 'child'
      ? 'a young child: very simple, warm, and encouraging, in short sentences'
      : tier === 'youth'
        ? 'a teenager: honest, direct, connected to daily life'
        : 'an adult: substantive, drawing on the Church Fathers or the Catechism where fitting';
  return `Here is today's Gospel reading (${gospel.title}):\n\n${gospel.text.slice(0, 2500)}\n\nPlease write a short reflection on this Gospel for ${audience}. End with one question to carry through the day and a one-line prayer. Keep it under 250 words.`;
}
