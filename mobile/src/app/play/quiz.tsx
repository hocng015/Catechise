import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { buildReviewQuiz, type ReviewQuestion } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from '@/components/ui';

const QUIZ_LENGTH = 5;

export default function QuickQuizScreen() {
  const router = useRouter();
  const { profile, addStars } = useProfile();
  const [round, setRound] = useState(0);
  const questions = useMemo<ReviewQuestion[]>(
    () => buildReviewQuiz(Object.keys(profile?.completed ?? {}), QUIZ_LENGTH),
    // A new round reshuffles the questions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [round, profile?.id],
  );

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  const q = questions[idx];
  const answered = selected !== null;

  const choose = (oi: number) => {
    if (answered) return;
    setSelected(oi);
    if (oi === q.answerIndex) setCorrectCount((c) => c + 1);
  };

  const nextQuestion = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (!rewarded) {
        addStars(correctCount);
        setRewarded(true);
      }
    }
  };

  const playAgain = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
    setRewarded(false);
  };

  if (finished) {
    const perfect = correctCount === questions.length;
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.center]}>
        <Text style={styles.doneEmoji}>{perfect ? '🏆' : '🎉'}</Text>
        <Text style={styles.doneTitle}>
          {perfect ? 'Perfect round!' : 'Great playing!'}
        </Text>
        <Text style={styles.doneStars}>
          You earned {correctCount} star{correctCount === 1 ? '' : 's'} ⭐
        </Text>
        <Text style={styles.doneBody}>
          {perfect
            ? 'You really know your faith. Try another round — new questions every time!'
            : 'Every question teaches you something, right or wrong. Want another go?'}
        </Text>
        <View style={{ alignSelf: 'stretch', gap: spacing(3), marginTop: spacing(6) }}>
          <Button label="Play again" variant="gold" onPress={playAgain} />
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>Back to games</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressSeg,
              i < idx && styles.progressDone,
              i === idx && styles.progressCurrent,
            ]}
          />
        ))}
      </View>
      <Text style={styles.counter}>
        Question {idx + 1} of {questions.length} · ⭐ {correctCount}
      </Text>

      <Text style={styles.question}>{q.question}</Text>

      <View style={{ gap: spacing(3), marginTop: spacing(5) }}>
        {q.options.map((opt, oi) => {
          const isCorrect = oi === q.answerIndex;
          const isSelected = selected === oi;
          let boxStyle = styles.option;
          if (answered && isCorrect) boxStyle = { ...styles.option, ...styles.optionCorrect };
          else if (answered && isSelected) boxStyle = { ...styles.option, ...styles.optionWrong };
          return (
            <Pressable key={oi} onPress={() => choose(oi)} style={boxStyle}>
              <Text style={styles.optionText}>
                {answered && isCorrect ? '✅ ' : answered && isSelected ? '❌ ' : ''}
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <View style={styles.explainBox}>
          <Text style={styles.explainText}>{q.explanation}</Text>
          <Text style={styles.fromLesson}>From the lesson “{q.lessonTitle}”</Text>
        </View>
      )}

      {answered && (
        <View style={{ marginTop: spacing(5) }}>
          <Button
            label={idx + 1 < questions.length ? 'Next question →' : 'See my stars ⭐'}
            variant="gold"
            onPress={nextQuestion}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  center: { alignItems: 'center', paddingTop: spacing(10) },
  progressRow: { flexDirection: 'row', gap: spacing(1.5) },
  progressSeg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.goldSoft },
  progressDone: { backgroundColor: colors.gold },
  progressCurrent: { backgroundColor: colors.marian },
  counter: { marginTop: spacing(2.5), color: colors.inkSoft, fontSize: 13 },
  question: {
    marginTop: spacing(5),
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
    lineHeight: 30,
  },
  option: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  optionCorrect: { borderColor: colors.success, backgroundColor: colors.successBg },
  optionWrong: { borderColor: colors.danger, backgroundColor: colors.dangerBg },
  optionText: { fontSize: 16, lineHeight: 23, color: colors.ink },
  explainBox: {
    marginTop: spacing(4),
    backgroundColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3.5),
  },
  explainText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  fromLesson: { marginTop: spacing(2), color: colors.inkSoft, fontSize: 12, fontStyle: 'italic' },
  doneEmoji: { fontSize: 56 },
  doneTitle: { fontSize: 28, fontWeight: '800', color: colors.marian, marginTop: spacing(4) },
  doneStars: { fontSize: 20, fontWeight: '700', color: colors.ink, marginTop: spacing(3) },
  doneBody: {
    marginTop: spacing(3),
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  backLink: { textAlign: 'center', color: colors.marian, textDecorationLine: 'underline', fontSize: 16 },
});
