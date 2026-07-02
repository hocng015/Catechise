import { fallbackForDate } from '@catechise/shared';

export interface GospelData {
  source: 'lectionary' | 'fallback';
  date: string;
  liturgicalDay: string | null;
  title: string;
  text: string;
}

/** Daily Gospel from the Evangelizo lectionary, with a bundled fallback. */
export async function fetchDailyGospel(date: Date): Promise<GospelData> {
  const compact = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const fetchPart = async (params: Record<string, string>): Promise<string | null> => {
    try {
      const qs = new URLSearchParams({ date: compact, lang: 'AM', ...params });
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://api.evangelizo.org/v2/reader?${qs.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(timer);
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

  const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  if (gospelText) {
    return {
      source: 'lectionary',
      date: iso,
      liturgicalDay: liturgicTitle ? stripHtml(liturgicTitle) : null,
      title: gospelTitle ? stripHtml(gospelTitle) : 'Gospel of the Day',
      text: stripHtml(gospelText),
    };
  }

  const fallback = fallbackForDate(date);
  return {
    source: 'fallback',
    date: iso,
    liturgicalDay: null,
    title: `${fallback.title} (${fallback.reference})`,
    text: fallback.text,
  };
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
