'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@catechise/shared';

export function Quiz({
  questions,
  onFinish,
}: {
  questions: QuizQuestion[];
  onFinish: (score: number, total: number) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === questions[i].answerIndex).length;

  const choose = (qi: number, oi: number) => {
    if (checked) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const check = () => {
    setChecked(true);
    onFinish(score, questions.length);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={qi}>
          <p className="font-semibold">
            {qi + 1}. {q.question}
          </p>
          <div className="mt-2 space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = oi === q.answerIndex;
              let cls = 'border-gold-soft bg-white hover:border-marian';
              if (checked && isCorrect) cls = 'border-emerald-600 bg-emerald-50';
              else if (checked && selected && !isCorrect) cls = 'border-rose-500 bg-rose-50';
              else if (selected) cls = 'border-marian bg-marian/5';
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => choose(qi, oi)}
                  className={`block w-full rounded-xl border px-4 py-3 text-left transition-colors ${cls}`}
                >
                  {checked && isCorrect ? '✅ ' : checked && selected && !isCorrect ? '❌ ' : ''}
                  {opt}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="mt-2 text-sm text-ink-soft italic">{q.explanation}</p>
          )}
        </div>
      ))}

      {!checked ? (
        <button
          type="button"
          onClick={check}
          disabled={!allAnswered}
          className="rounded-xl bg-marian px-6 py-3 font-semibold text-white disabled:opacity-40 hover:brightness-110 transition"
        >
          Check my answers
        </button>
      ) : (
        <p className="rounded-xl bg-gold-soft/60 px-4 py-3 font-semibold">
          {score === questions.length
            ? `🎉 Perfect — ${score} of ${questions.length}!`
            : `You got ${score} of ${questions.length}. Read the explanations above, they are the best part.`}
        </p>
      )}
    </div>
  );
}
