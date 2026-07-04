'use client';

import { useState } from 'react';
import type { MagisteriumCitation } from '@/app/api/magisterium/route';
import { Citations } from './Citations';

interface Result {
  content: string;
  citations: MagisteriumCitation[];
}

export async function askMagisterium(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
): Promise<Result> {
  const res = await fetch('/api/magisterium', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? 'Something went wrong.');
  return { content: data.content, citations: data.citations ?? [] };
}

/**
 * A one-shot "go deeper" panel: sends a prepared prompt to Magisterium AI
 * and renders the cited answer. Used on lesson and Gospel pages.
 */
export function MagisteriumPanel({
  buttonLabel,
  buildMessages,
}: {
  buttonLabel: string;
  buildMessages: () => { role: 'system' | 'user' | 'assistant'; content: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      setResult(await askMagisterium(buildMessages()));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!result && (
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className="rounded-xl border border-marian px-5 py-3 font-semibold text-marian hover:bg-marian hover:text-white transition disabled:opacity-50"
        >
          {loading ? 'Consulting the Church’s documents…' : buttonLabel}
        </button>
      )}
      {error && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-800">{error}</p>}
      {result && (
        <div className="mt-2 rounded-2xl border border-gold-soft bg-white p-5">
          <div className="whitespace-pre-wrap leading-relaxed">{result.content}</div>
          <Citations citations={result.citations} />
          <button
            type="button"
            onClick={run}
            disabled={loading}
            className="mt-4 text-sm text-marian underline disabled:opacity-50"
          >
            {loading ? 'Asking again…' : 'Ask again'}
          </button>
        </div>
      )}
    </div>
  );
}
