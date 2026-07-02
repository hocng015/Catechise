import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getLessonRef, orderedLessons, TIER_LABELS, type AgeTier } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button, Card, Pill, SectionTitle } from '@/components/ui';
import { Quiz } from '@/components/Quiz';
import { MagisteriumPanel } from '@/components/MagisteriumPanel';

const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { ready, profile, completeLesson } = useProfile();
  const [tierOverride, setTierOverride] = useState<AgeTier | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  const ref = getLessonRef(lessonId ?? '');
  if (!ref) {
    return (
      <View style={{ padding: spacing(4) }}>
        <Text style={{ color: colors.inkSoft }}>Lesson not found.</Text>
      </View>
    );
  }
  if (!ready) return null;

  const { lesson, unit, pillar } = ref;
  const tier: AgeTier = tierOverride ?? profile?.tier ?? 'adult';
  const isDone = Boolean(profile?.completed[lesson.id]);
  const next = orderedLessons[ref.index + 1];

  const markDone = () => {
    completeLesson(
      lesson.id,
      quizResult ? { quizScore: quizResult.score, quizTotal: quizResult.total } : undefined,
    );
  };

  const childMode = tier === 'child';

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>
          Pillar {pillar.number}: {pillar.title} · {unit.title}
        </Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.meta}>
          Catechism §{lesson.ccc} · {lesson.scripture}
        </Text>
        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveText}>{lesson.objective}</Text>
        </View>

        <View style={styles.tierRow}>
          {TIER_ORDER.map((t) => (
            <Pill key={t} label={TIER_LABELS[t]} selected={tier === t} onPress={() => setTierOverride(t)} />
          ))}
        </View>

        <Card style={{ marginTop: spacing(4) }}>
          <Text style={[styles.teaching, childMode && styles.teachingChild]}>
            {lesson.teaching[tier]}
          </Text>
        </Card>

        <View style={{ marginTop: spacing(6) }}>
          <SectionTitle>Remember this</SectionTitle>
          <View style={{ gap: spacing(2) }}>
            {lesson.keyPoints.map((kp, i) => (
              <View key={i} style={styles.keyPoint}>
                <Text style={{ fontSize: 14 }}>⭐</Text>
                <Text style={styles.keyPointText}>{kp}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.memoryBox}>
          <Text style={styles.memoryLabel}>🕊️ {lesson.memory.label}</Text>
          <Text style={styles.memoryText}>{lesson.memory.text}</Text>
        </View>

        <View style={{ marginTop: spacing(6) }}>
          <SectionTitle>Check what you learned</SectionTitle>
          <Quiz questions={lesson.quiz} onFinish={(score, total) => setQuizResult({ score, total })} />
        </View>

        <View style={{ marginTop: spacing(6), gap: spacing(3) }}>
          <Card>
            <Text style={styles.smallHeading}>💭 To ponder</Text>
            <Text style={styles.smallBody}>{lesson.reflection[tier]}</Text>
          </Card>
          <Card>
            <Text style={styles.smallHeading}>🤲 Try this today</Text>
            <Text style={styles.smallBody}>{lesson.activity[tier]}</Text>
          </Card>
        </View>

        <View style={{ marginTop: spacing(6) }}>
          <SectionTitle>Go deeper</SectionTitle>
          <Text style={[styles.smallBody, { marginBottom: spacing(3) }]}>
            Magisterium AI answers from official Church documents, with citations.
          </Text>
          <MagisteriumPanel
            buttonLabel={`✨ Go deeper on this lesson`}
            buildMessages={() => [
              { role: 'user', content: buildDeeperPrompt(lesson.title, lesson.ccc, tier) },
            ]}
          />
        </View>

        <View style={{ marginTop: spacing(8), gap: spacing(3) }}>
          {!isDone ? (
            <Button label="✓ Mark this lesson complete" variant="gold" onPress={markDone} />
          ) : (
            <View style={styles.doneBox}>
              <Text style={styles.doneText}>Lesson complete — well done!</Text>
            </View>
          )}
          {next && (
            <Link
              href={{ pathname: '/lesson/[lessonId]', params: { lessonId: next.lesson.id } }}
              replace
              asChild
            >
              <Text style={styles.nextLink}>Next: {next.lesson.title} →</Text>
            </Link>
          )}
        </View>
      </ScrollView>
    </>
  );
}

function buildDeeperPrompt(title: string, ccc: string, tier: AgeTier): string {
  const audience =
    tier === 'child'
      ? 'a young child (explain very simply and warmly, in short sentences)'
      : tier === 'youth'
        ? 'a teenager (be direct and engaging)'
        : 'an adult studying the faith seriously';
  return `I am studying a catechism lesson called "${title}", covering paragraphs ${ccc} of the Catechism of the Catholic Church. Please go deeper: explain the heart of this teaching for ${audience}, add one insight from a saint or Church Father connected to it, and end with one short prayer I could say today. Keep it under 300 words.`;
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(12) },
  kicker: { fontSize: 12, color: colors.inkSoft, letterSpacing: 0.3 },
  title: { fontSize: 26, fontWeight: '800', color: colors.marian, marginTop: spacing(1.5) },
  meta: { color: colors.inkSoft, marginTop: spacing(1.5), fontSize: 13 },
  objectiveBox: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3),
    marginTop: spacing(3),
  },
  objectiveText: { fontStyle: 'italic', color: colors.ink, fontSize: 14, lineHeight: 21 },
  tierRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2), marginTop: spacing(4) },
  teaching: { fontSize: 16, lineHeight: 26, color: colors.ink },
  teachingChild: { fontSize: 18, lineHeight: 30 },
  keyPoint: {
    flexDirection: 'row',
    gap: spacing(2.5),
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3),
  },
  keyPointText: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.ink },
  memoryBox: {
    marginTop: spacing(6),
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: '#f7edd4',
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  memoryLabel: { fontWeight: '800', fontSize: 16, color: colors.ink },
  memoryText: { fontStyle: 'italic', fontSize: 16, lineHeight: 25, marginTop: spacing(2), color: colors.ink },
  smallHeading: { fontWeight: '700', fontSize: 15, color: colors.ink },
  smallBody: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: spacing(1.5) },
  doneBox: {
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: radius.lg,
    padding: spacing(3.5),
    alignItems: 'center',
  },
  doneText: { color: colors.success, fontWeight: '700' },
  nextLink: { color: colors.marian, textDecorationLine: 'underline', textAlign: 'center', fontSize: 15 },
});
