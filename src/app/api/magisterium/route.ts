import { NextRequest, NextResponse } from 'next/server';

const MAGISTERIUM_URL = 'https://www.magisterium.com/api/v1/chat/completions';

export interface MagisteriumCitation {
  cited_text?: string;
  document_title?: string;
  document_author?: string;
  document_reference?: string;
  source_url?: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Server-side proxy to Magisterium AI so the API key never reaches the browser.
 * Docs: https://www.magisterium.com/developers
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.MAGISTERIUM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Magisterium AI is not configured. Add MAGISTERIUM_API_KEY to .env.local (get a key at magisterium.com) and restart the app.',
      },
      { status: 501 },
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('bad');
    messages = messages
      .filter((m) => (m.role === 'user' || m.role === 'assistant' || m.role === 'system') && typeof m.content === 'string')
      .slice(-20);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const upstream = await fetch(MAGISTERIUM_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'magisterium-1',
        messages,
        stream: false,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      return NextResponse.json(
        { error: `Magisterium AI returned an error (${upstream.status}). ${detail.slice(0, 300)}` },
        { status: 502 },
      );
    }

    const data = await upstream.json();
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    const citations: MagisteriumCitation[] = Array.isArray(data?.citations) ? data.citations : [];
    return NextResponse.json({ content, citations });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach Magisterium AI. Check your network connection and try again.' },
      { status: 502 },
    );
  }
}
