import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  completedCount,
  estimatedWeeksRemaining,
  progressPercent,
  streak,
  todaysPlan,
  totalLessonCount,
  todayISO,
} from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Card, Pill, ProgressBar, SectionTitle } from '@/components/ui';

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
  const weeks = estimatedWeeksRemaining(profile);
  const journaledToday = Boolean(profile.journal[todayISO()]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.switcherRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing(2) }}>
          {profiles.map((p) => (
            <Pill key={p.id} label={p.name} selected={p.id === profile.id} onPress={() => setActiveProfile(p.id)} />
          ))}
          <Pill label="+ Add" onPress={() => router.push('/onboarding')} />
        </ScrollView>
        <Pressable onPress={() => router.push('/settings')} accessibilityLabel="Settings" hitSlop={8}>
          <Text style={{ fontSize: 22 }}>⚙️</Text>
        </Pressable>
      </View>

      <Text style={styles.greeting}>
        {greeting()}, {profile.name}.
      </Text>
      <Text style={styles.subtitle}>
        {done === 0
          ? 'Today is a wonderful day to begin.'
          : `${done} of ${totalLessonCount} lessons done — about ${weeks} week${weeks === 1 ? '' : 's'} to go at your pace.`}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 {days} day{days === 1 ? '' : 's'}</Text>
        </View>
        <ProgressBar pct={pct} />
        <Text style={styles.pctText}>{pct}%</Text>
      </View>

      <Card style={{ marginTop: spacing(5) }}>
        <SectionTitle>Today&apos;s lesson{plan.length > 1 ? 's' : ''}</SectionTitle>
        {plan.length === 0 ? (
          <Text style={styles.muted}>
            {done === totalLessonCount
              ? 'You have walked the whole Catechism — Deo gratias! Revisit any lesson, or keep praying with the daily Gospel.'
              : 'A rest day at your gentle pace. The daily Gospel still awaits you.'}
          </Text>
        ) : (
          <View style={{ gap: spacing(3) }}>
            {plan.map((ref) => (
              <Link key={ref.lesson.id} href={{ pathname: '/lesson/[lessonId]', params: { lessonId: ref.lesson.id } }} asChild>
                <Pressable style={styles.lessonCard}>
                  <Text style={styles.lessonKicker}>
                    PILLAR {ref.pillar.number} · {ref.unit.title.toUpperCase()}
                  </Text>
                  <Text style={styles.lessonTitle}>{ref.lesson.title}</Text>
                  <Text style={styles.lessonMeta}>
                    CCC {ref.lesson.ccc} · {ref.lesson.scripture}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </Card>

      <Card style={{ marginTop: spacing(4) }}>
        <SectionTitle>Daily Gospel</SectionTitle>
        <Text style={styles.muted}>
          {journaledToday
            ? 'You have already reflected on today’s Gospel — well done. You can revisit or add to it.'
            : 'Read today’s Gospel, sit with it for a moment, and write a short reflection.'}
        </Text>
        <Link href="/gospel" asChild>
          <Pressable style={styles.gospelButton}>
            <Text style={styles.gospelButtonText}>
              {journaledToday ? 'Return to today’s Gospel' : 'Open today’s Gospel'}
            </Text>
          </Pressable>
        </Link>
      </Card>
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
  container: { padding: spacing(4), paddingBottom: spacing(10) },
  switcherRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(3), marginBottom: spacing(4) },
  greeting: { fontSize: 28, fontWeight: '800', color: colors.marian },
  subtitle: { marginTop: spacing(1.5), color: colors.inkSoft, fontSize: 15, lineHeight: 21 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(3), marginTop: spacing(4) },
  streakBadge: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(1.5),
  },
  streakText: { fontWeight: '700', fontSize: 13, color: colors.ink },
  pctText: { color: colors.inkSoft, fontSize: 13 },
  muted: { color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  lessonCard: {
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3.5),
  },
  lessonKicker: { fontSize: 11, color: colors.inkSoft, letterSpacing: 0.5 },
  lessonTitle: { fontSize: 18, fontWeight: '700', color: colors.ink, marginTop: spacing(1) },
  lessonMeta: { fontSize: 13, color: colors.inkSoft, marginTop: spacing(1) },
  gospelButton: {
    marginTop: spacing(3),
    backgroundColor: colors.marian,
    borderRadius: radius.lg,
    paddingVertical: spacing(3),
    alignItems: 'center',
  },
  gospelButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
