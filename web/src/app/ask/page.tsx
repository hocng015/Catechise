'use client';

import { useRef, useState } from 'react';
import { useProfile } from '@/components/ProfileProvider';
import { askMagisterium } from '@/components/MagisteriumPanel';
import { Citations } from '@/components/Citations';
import type { MagisteriumCitation } from '@/app/api/magisterium/route';
import type { AgeTier } from '@catechise/shared';

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
  citations?: MagisteriumCitation[];
}

const STARTERS: Record<AgeTier, string[]> = {
  child: [
    'Why did God make me?',
    'What happens at Mass?',
    'Who is my guardian angel?',
    'Why do we make the sign of the cross?',
  ],
  youth: [
    'Why do Catholics confess to a priest?',
    'How do we know God is real?',
    'Why do we pray to Mary and the saints?',
    'What is the Eucharist, really?',
  ],
  adult: [
    'What does the Church teach about purgatory?',
    'How do Scripture and Tradition relate?',
    'What is required for a sin to be mortal?',
    'How should I form my conscience?',
  ],
};

export default function AskPage() {
  const { profile } = useProfile();
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tier: AgeTier = profile?.tier ?? 'adult';

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    setError(null);
    setInput('');
    const nextTurns: ChatTurn[] = [...turns, { role: 'user', content: question }];
    setTurns(nextTurns);
    setLoading(true);
    try {
      const system = {
        role: 'system' as const,
        content:
          tier === 'child'
            ? 'You are a gentle Catholic catechist answering a young child. Use very simple, warm language and short sentences. Always be faithful to Catholic teaching.'
            : tier === 'youth'
              ? 'You are a Catholic catechist answering a teenager. Be direct, engaging, and faithful to Catholic teaching.'
              : 'You are a Catholic catechist answering an adult learner. Be substantive, precise, and faithful to Catholic teaching.',
      };
      const history = nextTurns.slice(-8).map((t) => ({ role: t.role, content: t.content }));
      const result = await askMagisterium([system, ...history]);
      setTurns((prev) => [
        ...prev,
        { role: 'assistant', content: result.content, citations: result.citations },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-4xl font-bold text-marian">Ask about the faith</h1>
      <p className="mt-2 text-ink-soft">
        Answers come from <strong>Magisterium AI</strong>, which draws on official Church
        documents and shows its sources. Answers are tuned for{' '}
        {profile ? `${profile.name} (${tier})` : 'you'} — and as with any tool, weigh what
        you read and bring big questions to your priest or catechist.
      </p>

      {turns.length === 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {STARTERS[tier].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-gold-soft bg-white px-4 py-2 text-sm hover:border-marian transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {turns.map((t, i) =>
          t.role === 'user' ? (
            <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-marian px-4 py-3 text-white w-fit">
              {t.content}
            </div>
          ) : (
            <div key={i} className="max-w-[95%] rounded-2xl rounded-bl-sm border border-gold-soft bg-white px-5 py-4">
              <div className="whitespace-pre-wrap leading-relaxed">{t.content}</div>
              <Citations citations={t.citations ?? []} />
            </div>
          ),
        )}
        {loading && <p className="text-ink-soft italic">Searching the Church&apos;s documents…</p>}
        {error && (
          <p className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-800">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="sticky bottom-4 mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the Catholic faith…"
          className="flex-1 rounded-xl border border-gold-soft bg-white px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-marian"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="rounded-xl bg-gold px-5 py-3 font-semibold text-white shadow disabled:opacity-40 hover:brightness-110 transition"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
