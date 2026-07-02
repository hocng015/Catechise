import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { QuizQuestion } from '@catechise/shared';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from './ui';

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

  return (
    <View style={{ gap: spacing(5) }}>
      {questions.map((q, qi) => (
        <View key={qi} style={{ gap: spacing(2) }}>
          <Text style={styles.question}>
            {qi + 1}. {q.question}
          </Text>
          {q.options.map((opt, oi) => {
            const selected = answers[qi] === oi;
            const isCorrect = oi === q.answerIndex;
            let boxStyle = styles.option;
            if (checked && isCorrect) boxStyle = { ...styles.option, ...styles.optionCorrect };
            else if (checked && selected && !isCorrect)
              boxStyle = { ...styles.option, ...styles.optionWrong };
            else if (selected) boxStyle = { ...styles.option, ...styles.optionSelected };
            return (
              <Pressable key={oi} onPress={() => choose(qi, oi)} style={boxStyle}>
                <Text style={styles.optionText}>
                  {checked && isCorrect ? '✅ ' : checked && selected && !isCorrect ? '❌ ' : ''}
                  {opt}
                </Text>
              </Pressable>
            );
          })}
          {checked && <Text style={styles.explanation}>{q.explanation}</Text>}
        </View>
      ))}

      {!checked ? (
        <Button
          label="Check my answers"
          disabled={!allAnswered}
          onPress={() => {
            setChecked(true);
            onFinish(score, questions.length);
          }}
        />
      ) : (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {score === questions.length
              ? `🎉 Perfect — ${score} of ${questions.length}!`
              : `You got ${score} of ${questions.length}. Read the explanations above, they are the best part.`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  question: { fontSize: 16, fontWeight: '700', color: colors.ink },
  option: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    backgroundColor: colors.card,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
  },
  optionSelected: { borderColor: colors.marian, backgroundColor: '#eef1fa' },
  optionCorrect: { borderColor: colors.success, backgroundColor: colors.successBg },
  optionWrong: { borderColor: colors.danger, backgroundColor: colors.dangerBg },
  optionText: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  explanation: { fontStyle: 'italic', color: colors.inkSoft, fontSize: 13, lineHeight: 19 },
  resultBox: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3.5),
  },
  resultText: { fontWeight: '600', color: colors.ink, fontSize: 15 },
});
