import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppState } from '@catechise/shared';

const KEY = 'catechise-state-v1';

export async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { profiles: [], activeProfileId: null };
    const parsed = JSON.parse(raw) as AppState;
    if (!Array.isArray(parsed.profiles)) return { profiles: [], activeProfileId: null };
    return parsed;
  } catch {
    return { profiles: [], activeProfileId: null };
  }
}

export async function saveState(state: AppState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Ignore write failures; the in-memory state still works for the session.
  }
}
