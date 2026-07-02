import { orderedLessons, totalLessonCount, type LessonRef } from './curriculum';
import type { Pace, Profile } from './profile';

/** Lessons the profile should do today, given pace and what is already done. */
export function todaysPlan(profile: Profile): LessonRef[] {
  const remaining = orderedLessons.filter((r) => !profile.completed[r.lesson.id]);
  const per = lessonsForToday(profile);
  return remaining.slice(0, per);
}

function lessonsForToday(profile: Profile): number {
  if (profile.pace === 'eager') return 2;
  if (profile.pace === 'steady') return 1;
  // Gentle: one lesson every other day. If yesterday had a completion, today is a rest day.
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = isoOf(yesterday);
  const doneYesterday = Object.values(profile.completed).some((r) => r.date === y);
  return doneYesterday ? 0 : 1;
}

export function nextLesson(profile: Profile): LessonRef | undefined {
  return orderedLessons.find((r) => !profile.completed[r.lesson.id]);
}

export function completedCount(profile: Profile): number {
  return Object.keys(profile.completed).length;
}

export function progressPercent(profile: Profile): number {
  return Math.round((completedCount(profile) / totalLessonCount) * 100);
}

/** Consecutive days (ending today or yesterday) with at least one completed lesson or journal entry. */
export function streak(profile: Profile): number {
  const activeDays = new Set<string>([
    ...Object.values(profile.completed).map((r) => r.date),
    ...Object.keys(profile.journal),
  ]);
  let count = 0;
  const cursor = new Date();
  // A streak survives if today has no activity yet but yesterday did.
  if (!activeDays.has(isoOf(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (activeDays.has(isoOf(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

/** Estimated finish date at the current pace. */
export function estimatedWeeksRemaining(profile: Profile): number {
  const remaining = totalLessonCount - completedCount(profile);
  const perWeek: Record<Pace, number> = { gentle: 3.5, steady: 7, eager: 14 };
  return Math.ceil(remaining / perWeek[profile.pace]);
}

function isoOf(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
