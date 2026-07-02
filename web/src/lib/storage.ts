import type { AppState } from '@catechise/shared';

export * from '@catechise/shared';

const KEY = 'catechise-state-v1';

export function loadState(): AppState {
  if (typeof window === 'undefined') return { profiles: [], activeProfileId: null };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { profiles: [], activeProfileId: null };
    const parsed = JSON.parse(raw) as AppState;
    if (!Array.isArray(parsed.profiles)) return { profiles: [], activeProfileId: null };
    return parsed;
  } catch {
    return { profiles: [], activeProfileId: null };
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode); the app still works for the session.
  }
}
