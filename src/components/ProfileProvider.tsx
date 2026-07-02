'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  loadState,
  saveState,
  todayISO,
  type AppState,
  type LessonRecord,
  type Profile,
} from '@/lib/storage';

interface ProfileContextValue {
  /** True once localStorage has been read on the client. */
  ready: boolean;
  profiles: Profile[];
  profile: Profile | null;
  setActiveProfile: (id: string) => void;
  addProfile: (p: Profile) => void;
  updateProfile: (id: string, patch: Partial<Profile>) => void;
  removeProfile: (id: string) => void;
  completeLesson: (lessonId: string, record?: Partial<LessonRecord>) => void;
  saveJournal: (date: string, text: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({ profiles: [], activeProfileId: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  const persist = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  const value = useMemo<ProfileContextValue>(() => {
    const profile = state.profiles.find((p) => p.id === state.activeProfileId) ?? null;
    return {
      ready,
      profiles: state.profiles,
      profile,
      setActiveProfile: (id) => persist((s) => ({ ...s, activeProfileId: id })),
      addProfile: (p) =>
        persist((s) => ({ profiles: [...s.profiles, p], activeProfileId: p.id })),
      updateProfile: (id, patch) =>
        persist((s) => ({
          ...s,
          profiles: s.profiles.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      removeProfile: (id) =>
        persist((s) => {
          const profiles = s.profiles.filter((p) => p.id !== id);
          return {
            profiles,
            activeProfileId:
              s.activeProfileId === id ? (profiles[0]?.id ?? null) : s.activeProfileId,
          };
        }),
      completeLesson: (lessonId, record) =>
        persist((s) => ({
          ...s,
          profiles: s.profiles.map((p) =>
            p.id === s.activeProfileId
              ? {
                  ...p,
                  completed: {
                    ...p.completed,
                    [lessonId]: { date: todayISO(), ...record },
                  },
                }
              : p,
          ),
        })),
      saveJournal: (date, text) =>
        persist((s) => ({
          ...s,
          profiles: s.profiles.map((p) =>
            p.id === s.activeProfileId
              ? { ...p, journal: { ...p.journal, [date]: text } }
              : p,
          ),
        })),
    };
  }, [state, ready, persist]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
