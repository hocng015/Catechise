import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getLessonRef, orderedLessons, streak, type AgeTier } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button, Card, SectionTitle } from '@/components/ui';
import { Quiz } from '@/components/Quiz';
import { MagisteriumPanel } from '@/components/MagisteriumPanel';

const STEPS = ['Read', 'Remember', 'Quiz', 'Pray', 'Done'] as const;

const TIER_SHORT: Record<AgeTier, string> = {
  child: 'Young child',
  youth: 'Teen',
  adult: 'Adult',
};
const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];

export default function LessonScreen() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { ready, profile, completeLesson } = useProfile();
  const [step, setStep] = useState(0);
  const [tierOverride, setTierOverride] = useState<AgeTier | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);
  const [completedNow, setCompletedNow] = useState(false);

  const ref = getLessonRef(lessonId ?? '');
  if (!ref) {
    return (
      <View style={{ padding: spacing(5) }}>
        <Text style={{ color: colors.inkSoft, fontSize: 16 }}>
          We could not find that lesson. Go back and try another.
        </Text>
      </View>
    );
  }
  if (!ready) return null;

  const { lesson, unit, pillar } = ref;
  const tier: AgeTier = tierOverride ?? profile?.tier ?? 'adult';
  const wasAlreadyDone = Boolean(profile?.completed[lesson.id]) && !completedNow;
  const next = orderedLessons[ref.index + 1];
  const childMode = tier === 'child';

  const goToStep = (s: number) => {
    if (s === STEPS.length - 1 && !profile?.completed[lesson.id]) {
      completeLesson(
        lesson.id,
        quizResult ? { quizScore: quizResult.score, quizTotal: quizResult.total } : undefined,
      );
      setCompletedNow(true);
    }
    setStep(s);
  };

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />
      <View style={{ flex: 1 }}>
        <View style={styles.stepperBar}>
          {STEPS.map((label, i) => (
            <View key={label} style={styles.stepItem}>
              <View style={[styles.stepDot, i <= step && styles.stepDotActive]}>
                <Text style={[styles.stepDotText, i <= step && { color: '#fff' }]}>
                  {i < step ? '✓' : i + 1}
                </Text>
              </View>
              <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{label}</Text>
            </View>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.container} key={step}>
          {step === 0 && (
            <View>
              <Text style={styles.kicker}>
                Part {pillar.number} of 4 · {unit.title}
              </Text>
              <Text style={styles.title}>{lesson.title}</Text>
              <View style={styles.objectiveBox}>
                <Text style={styles.objectiveText}>{lesson.objective}</Text>
              </View>

              <View style={styles.tierRow}>
                <Text style={styles.tierLabel}>Written for:</Text>
                {TIER_ORDER.map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => setTierOverride(t)}
                    style={[styles.tierPill, tier === t && styles.tierPillActive]}
                  >
                    <Text style={[styles.tierPillText, tier === t && { color: '#fff' }]}>
                      {TIER_SHORT[t]}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Card style={{ marginTop: spacing(4) }}>
                <Text style={[styles.teaching, childMode && styles.teachingChild]}>
                  {lesson.teaching[tier]}
                </Text>
              </Card>
              <Text style={styles.sourceNote}>
                From the Catechism of the Catholic Church, paragraphs {lesson.ccc} · {lesson.scripture}
              </Text>

              <View style={{ marginTop: spacing(6) }}>
                <Button label="Continue →" variant="gold" onPress={() => goToStep(1)} />
              </View>
            </View>
          )}

          {step === 1 && (
            <View>
              <SectionTitle>Remember this</SectionTitle>
              <View style={{ gap: spacing(2.5) }}>
                {lesson.keyPoints.map((kp, i) => (
                  <View key={i} style={styles.keyPoint}>
                    <Text style={{ fontSize: 15 }}>⭐</Text>
                    <Text style={styles.keyPointText}>{kp}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.memoryBox}>
                <Text style={styles.memoryLabel}>🕊️ {lesson.memory.label}</Text>
                <Text style={styles.memoryText}>{lesson.memory.text}</Text>
                <Text style={styles.memoryHint}>
                  Try reading it out loud, slowly, two times.
                </Text>
              </View>

              <View style={{ marginTop: spacing(6) }}>
                <Button label="Continue →" variant="gold" onPress={() => goToStep(2)} />
              </View>
            </View>
          )}

          {step === 2 && (
            <View>
              <SectionTitle>A little quiz</SectionTitle>
              <Text style={styles.quizNote}>
                Just for fun — wrong answers are how we learn. The explanations are the best part.
              </Text>
              <View style={{ marginTop: spacing(4) }}>
                <Quiz
                  questions={lesson.quiz}
                  onFinish={(score, total) => setQuizResult({ score, total })}
                />
              </View>
              <View style={{ marginTop: spacing(6), gap: spacing(3) }}>
                {quizResult ? (
                  <Button label="Continue →" variant="gold" onPress={() => goToStep(3)} />
                ) : (
                  <Pressable onPress={() => goToStep(3)}>
                    <Text style={styles.skipLink}>Skip the quiz for today</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <SectionTitle>Take it to prayer</SectionTitle>
              <Card>
                <Text style={styles.smallHeading}>💭 To ponder</Text>
                <Text style={styles.smallBody}>{lesson.reflection[tier]}</Text>
              </Card>
              <Card style={{ marginTop: spacing(3) }}>
                <Text style={styles.smallHeading}>🤲 Try this today</Text>
                <Text style={styles.smallBody}>{lesson.activity[tier]}</Text>
              </Card>

              <View style={{ marginTop: spacing(5) }}>
                <Text style={styles.smallHeading}>Want more?</Text>
                <Text style={[styles.smallBody, { marginBottom: spacing(3) }]}>
                  Ask for a deeper look at this lesson, answered from the Church&apos;s own documents.
                </Text>
                <MagisteriumPanel
                  buttonLabel="✨ Go deeper (optional)"
                  buildMessages={() => [
                    { role: 'user', content: buildDeeperPrompt(lesson.title, lesson.ccc, tier) },
                  ]}
                />
              </View>

              <View style={{ marginTop: spacing(6) }}>
                <Button label="Finish lesson ✓" variant="gold" onPress={() => goToStep(4)} />
              </View>
            </View>
          )}

          {step === 4 && (
            <View style={styles.doneWrap}>
              <Text style={styles.doneEmoji}>🎉</Text>
              <Text style={styles.doneTitle}>
                {wasAlreadyDone ? 'Lesson revisited — well done!' : 'Lesson complete — well done!'}
              </Text>
              {profile && streak(profile) > 1 && (
                <Text style={styles.doneStreak}>
                  🔥 That&apos;s {streak(profile)} days in a row.
                </Text>
              )}
              <Text style={styles.doneBody}>
                Faith grows like a seed — a little light and water every day. See you tomorrow.
              </Text>
              <View style={{ marginTop: spacing(6), alignSelf: 'stretch', gap: spacing(3) }}>
                <Button label="Back to Today" onPress={() => router.dismissTo('/')} />
                {next && (
                  <Pressable
                    onPress={() =>
                      router.replace({
                        pathname: '/lesson/[lessonId]',
                        params: { lessonId: next.lesson.id },
                      })
                    }
                  >
                    <Text style={styles.nextLink}>Keep going: {next.lesson.title} →</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

function buildDeeperPrompt(title: string, ccc: string, tier: AgeTier): string {
  const audience =
    tier === 'child'
      ? 'a young child (explain very simply and warmly, in short sentences)'
      : tier === 'youth'
        ? 'a teenager (be direct and engaging)'
        : 'an adult who may be new to the faith (be substantive but assume no prior knowledge)';
  return `I am studying a catechism lesson called "${title}", covering paragraphs ${ccc} of the Catechism of the Catholic Church. Please go deeper: explain the heart of this teaching for ${audience}, add one insight from a saint or Church Father connected to it, and end with one short prayer I could say today. Keep it under 300 words.`;
}

const styles = StyleSheet.create({
  stepperBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2),
    backgroundColor: colors.parchment,
    borderBottomWidth: 1,
    borderBottomColor: colors.goldSoft,
  },
  stepItem: { alignItems: 'center', gap: spacing(1) },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: colors.marian, borderColor: colors.marian },
  stepDotText: { fontSize: 12, fontWeight: '700', color: colors.inkSoft },
  stepLabel: { fontSize: 11, color: colors.inkSoft },
  stepLabelActive: { fontWeight: '800', color: colors.marian },
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  kicker: { fontSize: 13, color: colors.inkSoft },
  title: { fontSize: 27, fontWeight: '800', color: colors.marian, marginTop: spacing(1.5), lineHeight: 34 },
  objectiveBox: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3.5),
    marginTop: spacing(3.5),
  },
  objectiveText: { fontStyle: 'italic', color: colors.ink, fontSize: 15, lineHeight: 23 },
  tierRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing(2), marginTop: spacing(4) },
  tierLabel: { color: colors.inkSoft, fontSize: 14 },
  tierPill: {
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    backgroundColor: colors.card,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(1.5),
  },
  tierPillActive: { backgroundColor: colors.marian, borderColor: colors.marian },
  tierPillText: { fontSize: 14, color: colors.ink },
  teaching: { fontSize: 17, lineHeight: 28, color: colors.ink },
  teachingChild: { fontSize: 19, lineHeight: 32 },
  sourceNote: { marginTop: spacing(3), color: colors.inkSoft, fontSize: 13, lineHeight: 19 },
  keyPoint: {
    flexDirection: 'row',
    gap: spacing(2.5),
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3.5),
  },
  keyPointText: { flex: 1, fontSize: 15, lineHeight: 23, color: colors.ink },
  memoryBox: {
    marginTop: spacing(5),
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: '#f7edd4',
    borderRadius: radius.xl,
    padding: spacing(4.5),
  },
  memoryLabel: { fontWeight: '800', fontSize: 17, color: colors.ink },
  memoryText: { fontStyle: 'italic', fontSize: 17, lineHeight: 27, marginTop: spacing(2.5), color: colors.ink },
  memoryHint: { marginTop: spacing(3), fontSize: 13, color: colors.inkSoft },
  quizNote: { color: colors.inkSoft, fontSize: 15, lineHeight: 22 },
  skipLink: { textAlign: 'center', color: colors.inkSoft, textDecorationLine: 'underline', fontSize: 15 },
  smallHeading: { fontWeight: '700', fontSize: 16, color: colors.ink },
  smallBody: { color: colors.inkSoft, fontSize: 15, lineHeight: 23, marginTop: spacing(1.5) },
  doneWrap: { alignItems: 'center', paddingTop: spacing(8) },
  doneEmoji: { fontSize: 56 },
  doneTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.marian,
    textAlign: 'center',
    marginTop: spacing(4),
    lineHeight: 33,
  },
  doneStreak: { marginTop: spacing(3), fontSize: 17, fontWeight: '700', color: colors.ink },
  doneBody: {
    marginTop: spacing(3),
    color: colors.inkSoft,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  nextLink: { textAlign: 'center', color: colors.marian, textDecorationLine: 'underline', fontSize: 16 },
});
