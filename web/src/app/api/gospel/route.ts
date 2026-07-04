import { NextRequest, NextResponse } from 'next/server';
import { fallbackForDate } from '@catechise/shared';

export const revalidate = 3600;

/**
 * Daily Gospel, from the Evangelizo lectionary service (the day's actual
 * liturgical Gospel), with a built-in fallback passage when unreachable.
 * GET /api/gospel?date=YYYY-MM-DD
 */
export async function GET(req: NextRequest) {
  const dateParam = req.nextUrl.searchParams.get('date');
  const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? new Date(`${dateParam}T12:00:00`) : new Date();
  const compact = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const fetchPart = async (params: Record<string, string>): Promise<string | null> => {
    try {
      const qs = new URLSearchParams({ date: compact, lang: 'AM', ...params });
      const res = await fetch(`https://api.evangelizo.org/v2/reader?${qs.toString()}`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) return null;
      const text = (await res.text()).trim();
      return text.length > 0 ? text : null;
    } catch {
      return null;
    }
  };

  const [liturgicTitle, gospelTitle, gospelText] = await Promise.all([
    fetchPart({ type: 'liturgic_title' }),
    fetchPart({ type: 'reading_lt', content: 'GSP' }),
    fetchPart({ type: 'reading', content: 'GSP' }),
  ]);

  if (gospelText) {
    return NextResponse.json({
      source: 'lectionary',
      date: date.toISOString().slice(0, 10),
      liturgicalDay: liturgicTitle ? stripHtml(liturgicTitle) : null,
      title: gospelTitle ? stripHtml(gospelTitle) : 'Gospel of the Day',
      text: stripHtml(gospelText),
    });
  }

  const fallback = fallbackForDate(date);
  return NextResponse.json({
    source: 'fallback',
    date: date.toISOString().slice(0, 10),
    liturgicalDay: null,
    title: `${fallback.title} (${fallback.reference})`,
    text: fallback.text,
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&laquo;\s*/g, '"')
    .replace(/\s*&raquo;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
