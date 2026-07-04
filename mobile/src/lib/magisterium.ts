import * as SecureStore from 'expo-secure-store';

const KEY_NAME = 'magisterium-api-key';
const MAGISTERIUM_URL = 'https://www.magisterium.com/api/v1/chat/completions';

export interface MagisteriumCitation {
  cited_text?: string;
  document_title?: string;
  document_author?: string;
  document_reference?: string;
  source_url?: string;
}

export interface MagisteriumResult {
  content: string;
  citations: MagisteriumCitation[];
}

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function getApiKey(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(KEY_NAME);
  } catch {
    return null;
  }
}

export async function setApiKey(key: string): Promise<void> {
  if (key.trim().length === 0) {
    await SecureStore.deleteItemAsync(KEY_NAME);
  } else {
    await SecureStore.setItemAsync(KEY_NAME, key.trim());
  }
}

export const NOT_CONFIGURED_MESSAGE =
  'Magisterium AI is not set up yet. Get a free API key at magisterium.com, then add it under Settings (the gear icon on the Today tab).';

export async function askMagisterium(messages: ChatMessage[]): Promise<MagisteriumResult> {
  const apiKey = await getApiKey();
  if (!apiKey) throw new Error(NOT_CONFIGURED_MESSAGE);

  const res = await fetch(MAGISTERIUM_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'magisterium-1', messages: messages.slice(-20), stream: false }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Magisterium AI rejected the API key. Check it under Settings.');
    }
    throw new Error(`Magisterium AI returned an error (${res.status}). Please try again.`);
  }

  const data = await res.json();
  return {
    content: data?.choices?.[0]?.message?.content ?? '',
    citations: Array.isArray(data?.citations) ? data.citations : [],
  };
}
