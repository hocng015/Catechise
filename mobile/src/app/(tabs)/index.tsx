import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  completedCount,
  progressPercent,
  streak,
  todaysPlan,
  todayISO,
  totalLessonCount,
  type Goal,
} from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Pill, ProgressBar } from '@/components/ui';

const WELCOME_LINES: Partial<Record<Goal, string>> = {
  ocia: 'Every saint started exactly where you are. One small step today.',
  returning: 'Welcome home. The door has always been open.',
  'first-communion': 'Jesus is getting ready to meet you. Keep going!',
  confirmation: 'You are learning the faith you will soon make your own.',
  family: 'A family that learns together, grows together.',
  grow: 'Deeper roots, stronger branches. Keep going.',
};

export default function TodayScreen() {
  const router = useRouter();
  const { ready, profile, profiles, setActiveProfile } = useProfile();

  useFocusEffect(
    useCallback(() => {
      if (ready && profiles.length === 0) {
        router.replace('/onboarding');
      }
    }, [ready, profiles.length, router]),
  );

  if (!ready || !profile) return null;

  const plan = todaysPlan(profile);
  const done = completedCount(profile);
  const pct = progressPercent(profile);
  const days = streak(profile);
  const journaledToday = Boolean(profile.journal[todayISO()]);
  const firstLesson = plan[0];
  const welcomeLine = profile.goals[0] ? WELCOME_LINES[profile.goals[0]] : undefined;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        {profiles.length > 1 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing(2) }}
            style={{ flex: 1 }}
          >
            {profiles.map((p) => (
              <Pill key={p.id} label={p.name} selected={p.id === profile.id} onPress={() => setActiveProfile(p.id)} />
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <Pressable onPress={() => router.push('/settings')} accessibilityLabel="Settings" hitSlop={10}>
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </Pressable>
      </View>

      <Text style={styles.greeting}>
        {greeting()}, {profile.name}.
      </Text>
      {welcomeLine && <Text style={styles.welcomeLine}>{welcomeLine}</Text>}

      <View style={styles.heroCard}>
        {firstLesson ? (
          <>
            <Text style={styles.heroKicker}>TODAY&apos;S LESSON</Text>
            <Text style={styles.heroTitle}>{firstLesson.lesson.title}</Text>
            <Text style={styles.heroMeta}>
              About 10 minutes · {firstLesson.unit.title}
            </Text>
            <Link
              href={{ pathname: '/lesson/[lessonId]', params: { lessonId: firstLesson.lesson.id } }}
              asChild
            >
              <Pressable style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Start today&apos;s lesson →</Text>
              </Pressable>
            </Link>
            {plan[1] && <Text style={styles.thenLine}>Then: {plan[1].lesson.title}</Text>}
          </>
        ) : (
          <>
            <Text style={styles.heroKicker}>
              {done === totalLessonCount ? 'JOURNEY COMPLETE' : 'REST DAY'}
            </Text>
            <Text style={styles.heroTitle}>
              {done === totalLessonCount
                ? 'You have walked the whole journey — Deo gratias!'
                : 'No lesson today at your gentle pace.'}
            </Text>
            <Text style={styles.heroMeta}>
              {done === totalLessonCount
                ? 'Revisit any lesson from the Lessons tab, and keep praying with the daily Gospel.'
                : 'The daily Gospel below is a lovely way to keep the habit going.'}
            </Text>
          </>
        )}
      </View>

      <Link href="/gospel" asChild>
        <Pressable style={styles.gospelCard}>
          <Text style={styles.gospelEmoji}>✝️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.gospelTitle}>
              {journaledToday ? "Today's Gospel — visit again" : "Read today's Gospel"}
            </Text>
            <Text style={styles.gospelDetail}>
              {journaledToday
                ? 'You already wrote a reflection today. Well done.'
                : 'A short reading and a quiet moment. About 5 minutes.'}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </Link>

      <Link href="/play" asChild>
        <Pressable style={styles.gospelCard}>
          <Text style={styles.gospelEmoji}>🧩</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.gospelTitle}>
              {profile.tier === 'adult' ? 'Play & review' : 'Time to play!'}
            </Text>
            <Text style={styles.gospelDetail}>
              {profile.tier === 'adult'
                ? 'Quick quizzes and matching games to keep what you learn fresh.'
                : `Fun games about your faith — you have ${profile.stars ?? 0} star${(profile.stars ?? 0) === 1 ? '' : 's'} ⭐`}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </Link>

      {done > 0 && (
        <View style={styles.progressCard}>
          <Text style={styles.progressLine}>
            {days > 1 ? `🔥 You have shown up ${days} days in a row.` : '🌱 Every day is a fresh start.'}
          </Text>
          <View style={styles.progressRow}>
            <ProgressBar pct={pct} />
            <Text style={styles.progressPct}>{pct}%</Text>
          </View>
          <Text style={styles.progressDetail}>
            {done} of {totalLessonCount} lessons finished. See more on the My Journey tab.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(3), marginBottom: spacing(3) },
  greeting: { fontSize: 30, fontWeight: '800', color: colors.marian, lineHeight: 38 },
  welcomeLine: { marginTop: spacing(2), color: colors.inkSoft, fontSize: 16, lineHeight: 24, fontStyle: 'italic' },
  heroCard: {
    marginTop: spacing(5),
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(5),
  },
  heroKicker: { fontSize: 12, letterSpacing: 1.2, color: colors.gold, fontWeight: '800' },
  heroTitle: { fontSize: 24, fontWeight: '800', color: colors.ink, marginTop: spacing(2), lineHeight: 31 },
  heroMeta: { color: colors.inkSoft, marginTop: spacing(2), fontSize: 15, lineHeight: 22 },
  heroButton: {
    marginTop: spacing(4),
    backgroundColor: colors.gold,
    borderRadius: radius.lg,
    paddingVertical: spacing(4.5),
    alignItems: 'center',
  },
  heroButtonText: { color: '#fff', fontSize: 19, fontWeight: '800' },
  thenLine: { marginTop: spacing(3), color: colors.inkSoft, fontSize: 14 },
  gospelCard: {
    marginTop: spacing(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  gospelEmoji: { fontSize: 26 },
  gospelTitle: { fontSize: 17, fontWeight: '700', color: colors.ink },
  gospelDetail: { color: colors.inkSoft, fontSize: 14, marginTop: spacing(0.5), lineHeight: 20 },
  chevron: { fontSize: 28, color: colors.inkSoft },
  progressCard: { marginTop: spacing(5), paddingHorizontal: spacing(1) },
  progressLine: { fontSize: 15, color: colors.ink, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(3), marginTop: spacing(2.5) },
  progressPct: { color: colors.inkSoft, fontSize: 13 },
  progressDetail: { color: colors.inkSoft, fontSize: 13, marginTop: spacing(2) },
});
