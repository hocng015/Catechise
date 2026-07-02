'use client';

import type { MagisteriumCitation } from '@/app/api/magisterium/route';

export function Citations({ citations }: { citations: MagisteriumCitation[] }) {
  if (citations.length === 0) return null;
  return (
    <details className="mt-3 rounded-xl border border-gold-soft bg-parchment px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-ink-soft">
        📚 {citations.length} citation{citations.length === 1 ? '' : 's'} from Church documents
      </summary>
      <ul className="mt-2 space-y-2">
        {citations.map((c, i) => (
          <li key={i} className="text-sm">
            <span className="font-semibold">
              {c.document_title ?? 'Church document'}
              {c.document_reference ? `, ${c.document_reference}` : ''}
            </span>
            {c.document_author ? <span className="text-ink-soft"> — {c.document_author}</span> : null}
            {c.cited_text ? (
              <blockquote className="mt-1 border-l-2 border-gold pl-3 text-ink-soft italic">
                {c.cited_text.length > 300 ? `${c.cited_text.slice(0, 300)}…` : c.cited_text}
              </blockquote>
            ) : null}
            {c.source_url ? (
              <a
                href={c.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-marian underline"
              >
                Source
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
  );
}
