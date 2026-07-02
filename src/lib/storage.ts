import type { AgeTier } from '@/data/types';

export type Pace = 'gentle' | 'steady' | 'eager';

export const PACE_LESSONS_PER_DAY: Record<Pace, number> = {
  gentle: 1, // one lesson every other day (see pacing.ts)
  steady: 1,
  eager: 2,
};

export const PACE_LABELS: Record<Pace, string> = {
  gentle: 'Gentle — a lesson every other day',
  steady: 'Steady — one lesson a day',
  eager: 'Eager — two lessons a day',
};

export type Goal =
  | 'first-communion'
  | 'confirmation'
  | 'ocia'
  | 'family'
  | 'grow';

export const GOAL_LABELS: Record<Goal, string> = {
  'first-communion': 'Preparing for First Reconciliation & Communion',
  confirmation: 'Preparing for Confirmation',
  ocia: 'Becoming Catholic (OCIA / RCIA)',
  family: 'Learning together as a family',
  grow: 'Growing deeper in my faith',
};

export interface LessonRecord {
  /** ISO date (yyyy-mm-dd) of completion. */
  date: string;
  /** Quiz score out of quiz length, if taken. */
  quizScore?: number;
  quizTotal?: number;
}

export interface Profile {
  id: string;
  name: string;
  tier: AgeTier;
  pace: Pace;
  goals: Goal[];
  createdAt: string;
  completed: Record<string, LessonRecord>;
  /** Gospel journal entries keyed by ISO date. */
  journal: Record<string, string>;
}

export interface AppState {
  profiles: Profile[];
  activeProfileId: string | null;
}

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

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function newProfileId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const TIER_LABELS: Record<AgeTier, string> = {
  child: 'Child (ages 5-9)',
  youth: 'Youth (ages 10-15)',
  adult: 'Adult (16+)',
};
