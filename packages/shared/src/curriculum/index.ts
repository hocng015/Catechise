import type { Lesson, Pillar, Unit } from '../types';
import { pillar1UnitsA } from './pillar1a';
import { pillar1UnitsB } from './pillar1b';
import { pillar2Units } from './pillar2';
import { pillar3UnitsA } from './pillar3a';
import { pillar3UnitsB } from './pillar3b';
import { pillar4Units } from './pillar4';

export const pillars: Pillar[] = [
  {
    id: 'pillar-1',
    number: 1,
    title: 'The Profession of Faith',
    subtitle: 'What we believe: the Creed, from creation to life everlasting',
    ccc: '1-1065',
    accent: 'sky',
    units: [...pillar1UnitsA, ...pillar1UnitsB],
  },
  {
    id: 'pillar-2',
    number: 2,
    title: 'The Celebration of the Christian Mystery',
    subtitle: 'How we worship: the liturgy and the seven sacraments',
    ccc: '1066-1690',
    accent: 'rose',
    units: pillar2Units,
  },
  {
    id: 'pillar-3',
    number: 3,
    title: 'Life in Christ',
    subtitle: 'How we live: beatitude, virtue, and the Ten Commandments',
    ccc: '1691-2557',
    accent: 'emerald',
    units: pillar3UnitsA,
  },
  {
    id: 'pillar-4',
    number: 4,
    title: 'Christian Prayer',
    subtitle: 'How we pray: the life of prayer and the Our Father',
    ccc: '2558-2865',
    accent: 'amber',
    units: pillar4Units,
  },
];

// Pillar 3 is split across two authored files.
pillars[2].units = [...pillar3UnitsA, ...pillar3UnitsB];

export interface LessonRef {
  lesson: Lesson;
  unit: Unit;
  pillar: Pillar;
  /** Zero-based position in the whole curriculum. */
  index: number;
}

export const orderedLessons: LessonRef[] = (() => {
  const refs: LessonRef[] = [];
  for (const pillar of pillars) {
    for (const unit of pillar.units) {
      for (const lesson of unit.lessons) {
        refs.push({ lesson, unit, pillar, index: refs.length });
      }
    }
  }
  return refs;
})();

const byId = new Map(orderedLessons.map((r) => [r.lesson.id, r]));

export function getLessonRef(id: string): LessonRef | undefined {
  return byId.get(id);
}

export const totalLessonCount = orderedLessons.length;
