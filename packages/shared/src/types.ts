export type AgeTier = 'child' | 'youth' | 'adult';

/** The same truth, taught in three voices. */
export interface TieredText {
  /** Ages ~5-9: warm, concrete, story-like, short sentences. */
  child: string;
  /** Ages ~10-15: engaging, direct, explains "why". */
  youth: string;
  /** Ages 16+: substantive, doctrinally precise, terms defined. */
  adult: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index into options of the correct answer. */
  answerIndex: number;
  /** Shown after answering. */
  explanation: string;
}

export interface Lesson {
  /** e.g. 'p1u2l3' */
  id: string;
  title: string;
  /** CCC paragraph range covered, e.g. '50-73' */
  ccc: string;
  /** Primary scripture passage, e.g. 'Hebrews 1:1-2' */
  scripture: string;
  /** One sentence: what the learner will understand by the end. */
  objective: string;
  /** The core teaching, in three voices. */
  teaching: TieredText;
  /** 3-4 truths to remember, doctrinally precise but plain. */
  keyPoints: string[];
  /** A verse or prayer to memorize. */
  memory: { label: string; text: string };
  /** 2-3 questions; simple enough for children, worthwhile for all. */
  quiz: QuizQuestion[];
  /** A reflection question, in three voices. */
  reflection: TieredText;
  /** A small concrete practice for today, in three voices. */
  activity: TieredText;
}

export interface Unit {
  /** e.g. 'p1u2' */
  id: string;
  title: string;
  /** CCC paragraph range, e.g. '26-141' */
  ccc: string;
  /** 1-2 sentence summary of the unit. */
  summary: string;
  lessons: Lesson[];
}

export interface Pillar {
  id: string;
  number: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  ccc: string;
  /** Accent hue used by the UI. */
  accent: 'sky' | 'rose' | 'emerald' | 'amber';
  units: Unit[];
}
