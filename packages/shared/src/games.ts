import { orderedLessons } from './curriculum';
import type { QuizQuestion } from './types';

/** A question drawn from a lesson, for review quizzes. */
export interface ReviewQuestion extends QuizQuestion {
  lessonId: string;
  lessonTitle: string;
}

/**
 * Build a review quiz that keeps learners fresh on what they have already studied.
 * Draws from completed lessons; brand-new learners get the opening lessons.
 */
export function buildReviewQuiz(completedIds: string[], count: number): ReviewQuestion[] {
  const done = new Set(completedIds);
  let pool = orderedLessons.filter((r) => done.has(r.lesson.id));
  if (pool.length === 0) pool = orderedLessons.slice(0, 3);

  const questions: ReviewQuestion[] = pool.flatMap((r) =>
    r.lesson.quiz.map((q) => ({ ...q, lessonId: r.lesson.id, lessonTitle: r.lesson.title })),
  );
  return shuffle(questions).slice(0, count);
}

/** A matching-pairs game set. Every pair is curated, never generated. */
export interface MatchSet {
  id: string;
  title: string;
  instruction: string;
  pairs: { a: string; b: string }[];
}

export const MATCH_SETS: MatchSet[] = [
  {
    id: 'sacraments',
    title: 'The Seven Sacraments',
    instruction: 'Match each sacrament to what happens in it.',
    pairs: [
      { a: 'Baptism', b: 'Washed with water into God’s family' },
      { a: 'Confirmation', b: 'Sealed with the gift of the Holy Spirit' },
      { a: 'Eucharist', b: 'Jesus himself, under the signs of bread and wine' },
      { a: 'Penance', b: 'God forgives our sins through the priest' },
      { a: 'Anointing of the Sick', b: 'Strength and peace for the seriously ill' },
      { a: 'Holy Orders', b: 'A man becomes a deacon, priest, or bishop' },
      { a: 'Matrimony', b: 'A man and woman promise love for life' },
    ],
  },
  {
    id: 'bible-people',
    title: 'People of the Bible',
    instruction: 'Match each person to their story.',
    pairs: [
      { a: 'Noah', b: 'Built the ark before the great flood' },
      { a: 'Abraham', b: 'Trusted God and became the father of faith' },
      { a: 'Moses', b: 'Led God’s people out of Egypt' },
      { a: 'David', b: 'The shepherd boy who became king' },
      { a: 'Mary', b: 'Said yes to God and became the Mother of Jesus' },
      { a: 'Peter', b: 'The fisherman Jesus made the first pope' },
    ],
  },
  {
    id: 'prayers',
    title: 'Prayers We Love',
    instruction: 'Match each prayer to what makes it special.',
    pairs: [
      { a: 'The Our Father', b: 'The prayer Jesus himself taught us' },
      { a: 'The Hail Mary', b: 'Begins with the angel’s greeting to Mary' },
      { a: 'The Glory Be', b: 'A little song of praise to the Trinity' },
      { a: 'The Sign of the Cross', b: 'We begin and end our prayers with it' },
      { a: 'The Rosary', b: 'Praying with Mary through the life of Jesus' },
      { a: 'Grace at meals', b: 'Thanking God before we eat' },
    ],
  },
  {
    id: 'mass-things',
    title: 'Inside the Church',
    instruction: 'Match each holy thing to what it is for.',
    pairs: [
      { a: 'The altar', b: 'The holy table where the Mass is offered' },
      { a: 'The tabernacle', b: 'Where Jesus in the Eucharist is kept' },
      { a: 'The sanctuary lamp', b: 'The little light that says Jesus is here' },
      { a: 'The ambo', b: 'Where God’s Word is read aloud' },
      { a: 'The baptismal font', b: 'Where new Christians are baptized' },
      { a: 'Holy water', b: 'We bless ourselves with it at the door' },
    ],
  },
  {
    id: 'liturgical-colors',
    title: 'Colors of the Church Year',
    instruction: 'Match each color to its season.',
    pairs: [
      { a: 'Purple', b: 'Advent and Lent — getting our hearts ready' },
      { a: 'White', b: 'Christmas and Easter — great joy' },
      { a: 'Green', b: 'Ordinary Time — growing in faith' },
      { a: 'Red', b: 'Pentecost and the martyrs — fire and love' },
      { a: 'Rose', b: 'Two special Sundays of almost-there joy' },
    ],
  },
  {
    id: 'commandments',
    title: 'The Ten Commandments',
    instruction: 'Match each commandment to its number.',
    pairs: [
      { a: 'Love God above everything', b: 'The 1st commandment' },
      { a: 'Keep the Lord’s Day holy', b: 'The 3rd commandment' },
      { a: 'Honor your father and mother', b: 'The 4th commandment' },
      { a: 'Do not steal', b: 'The 7th commandment' },
      { a: 'Always tell the truth', b: 'The 8th commandment' },
    ],
  },
  {
    id: 'holy-words',
    title: 'Holy Words',
    instruction: 'Match each word to what it means.',
    pairs: [
      { a: 'Amen', b: 'Yes! So be it — I believe it' },
      { a: 'Alleluia', b: 'Praise the Lord!' },
      { a: 'Gospel', b: 'The Good News about Jesus' },
      { a: 'Grace', b: 'God’s own life and help inside us' },
      { a: 'Saint', b: 'A friend of God who is with him in heaven' },
      { a: 'Trinity', b: 'One God in three Persons' },
    ],
  },
];

/** A word for the unscramble game. All simple, positive faith vocabulary. */
export interface ScrambleWord {
  word: string;
  hint: string;
}

export const SCRAMBLE_WORDS: ScrambleWord[] = [
  { word: 'JESUS', hint: 'The Son of God, our Savior' },
  { word: 'MARY', hint: 'The Mother of Jesus' },
  { word: 'FAITH', hint: 'Believing and trusting God' },
  { word: 'GRACE', hint: 'God’s life and help inside us' },
  { word: 'BIBLE', hint: 'The book of God’s Word' },
  { word: 'CHURCH', hint: 'God’s family all over the world' },
  { word: 'PRAYER', hint: 'Talking and listening to God' },
  { word: 'ANGEL', hint: 'God’s messenger and helper' },
  { word: 'SAINT', hint: 'A friend of God in heaven' },
  { word: 'CROSS', hint: 'Where Jesus showed his greatest love' },
  { word: 'AMEN', hint: 'The word that means “yes, I believe!”' },
  { word: 'HEAVEN', hint: 'Being with God forever' },
  { word: 'BAPTISM', hint: 'The sacrament with water that makes us God’s children' },
  { word: 'GOSPEL', hint: 'The Good News about Jesus' },
  { word: 'ROSARY', hint: 'Beads for praying with Mary' },
  { word: 'EASTER', hint: 'The day Jesus rose from the dead' },
  { word: 'ADVENT', hint: 'The season of waiting for Christmas' },
  { word: 'TRINITY', hint: 'One God in three Persons' },
  { word: 'MERCY', hint: 'God’s love that always forgives' },
  { word: 'POPE', hint: 'The shepherd of the whole Church' },
  { word: 'ALTAR', hint: 'The holy table at Mass' },
  { word: 'CANDLE', hint: 'Its little flame reminds us Jesus is the light' },
];

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
