import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  completedCount,
  estimatedWeeksRemaining,
  GOAL_LABELS,
  PACE_LABELS,
  pillars,
  progressPercent,
  streak,
  TIER_LABELS,
  totalLessonCount,
  type AgeTier,
  type Pace,
} from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Card, Pill, ProgressBar, SectionTitle } from '@/components/ui';

const PACE_ORDER: Pace[] = ['gentle', 'steady', 'eager'];
const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];

export default function ProgressScreen() {
  const { ready, profile, updateProfile, removeProfile } = useProfile();
  if (!ready || !profile) return null;

  const done = completedCount(profile);
  const days = streak(profile);
  const journalCount = Object.keys(profile.journal).length;
  const weeks = estimatedWeeksRemaining(profile);

  const badges = [
    { emoji: '🌱', label: 'First lesson', earned: done >= 1 },
    { emoji: '🕯️', label: 'Ten lessons', earned: done >= 10 },
    { emoji: '🔥', label: '7-day streak', earned: days >= 7 },
    { emoji: '📖', label: 'First reflection', earned: journalCount >= 1 },
    { emoji: '✍️', label: 'Ten reflections', earned: journalCount >= 10 },
    ...pillars.map((p, i) => ({
      emoji: ['⛪', '🍞', '💛', '🙏'][i],
      label: `Pillar ${p.number} done`,
      earned: p.units.flatMap((u) => u.lessons).every((l) => profile.completed[l.id]),
    })),
    { emoji: '👑', label: 'Whole Catechism!', earned: done === totalLessonCount },
  ];

  const confirmRemove = () => {
    Alert.alert(
      'Remove learner',
      `Remove ${profile.name}'s profile and all progress? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeProfile(profile.id) },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>{profile.name}&apos;s journey</Text>
      <Text style={styles.sub}>
        {done} of {totalLessonCount} lessons · {progressPercent(profile)}%
        {done < totalLessonCount ? ` · about ${weeks} week${weeks === 1 ? '' : 's'} to go` : ' · complete!'}
      </Text>

      <Card style={{ marginTop: spacing(4) }}>
        <SectionTitle>Badges</SectionTitle>
        <View style={styles.badgeGrid}>
          {badges.map((b) => (
            <View key={b.label} style={[styles.badge, !b.earned && { opacity: 0.35 }]}>
              <Text style={{ fontSize: 26 }}>{b.emoji}</Text>
              <Text style={styles.badgeLabel}>{b.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ marginTop: spacing(4) }}>
        <SectionTitle>By pillar</SectionTitle>
        <View style={{ gap: spacing(3) }}>
          {pillars.map((p) => {
            const lessons = p.units.flatMap((u) => u.lessons);
            const pillarDone = lessons.filter((l) => profile.completed[l.id]).length;
            return (
              <View key={p.id}>
                <View style={styles.pillarRow}>
                  <Text style={styles.pillarName}>
                    Pillar {p.number}: {p.title}
                  </Text>
                  <Text style={styles.pillarCount}>
                    {pillarDone}/{lessons.length}
                  </Text>
                </View>
                <ProgressBar
                  pct={(pillarDone / lessons.length) * 100}
                  color={colors.pillars[p.accent]}
                />
              </View>
            );
          })}
        </View>
      </Card>

      <Card style={{ marginTop: spacing(4) }}>
        <SectionTitle>Settings for {profile.name}</SectionTitle>

        <Text style={styles.settingLabel}>Lessons are written for</Text>
        <View style={styles.pillRow}>
          {TIER_ORDER.map((t) => (
            <Pill
              key={t}
              label={TIER_LABELS[t]}
              selected={profile.tier === t}
              onPress={() => updateProfile(profile.id, { tier: t })}
            />
          ))}
        </View>

        <Text style={styles.settingLabel}>Daily pace</Text>
        <View style={styles.pillRow}>
          {PACE_ORDER.map((p) => (
            <Pill
              key={p}
              label={PACE_LABELS[p]}
              selected={profile.pace === p}
              onPress={() => updateProfile(profile.id, { pace: p })}
            />
          ))}
        </View>

        {profile.goals.length > 0 && (
          <Text style={styles.goals}>
            Working toward: {profile.goals.map((g) => GOAL_LABELS[g]).join(' · ')}
          </Text>
        )}

        <Text style={styles.remove} onPress={confirmRemove}>
          Remove this learner
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(10) },
  headline: { fontSize: 26, fontWeight: '800', color: colors.marian },
  sub: { color: colors.inkSoft, marginTop: spacing(1.5), fontSize: 14 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2.5) },
  badge: {
    width: 96,
    alignItems: 'center',
    backgroundColor: colors.parchment,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    paddingVertical: spacing(2.5),
    paddingHorizontal: spacing(1.5),
  },
  badgeLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center', marginTop: spacing(1), color: colors.ink },
  pillarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing(1) },
  pillarName: { fontWeight: '600', fontSize: 13, color: colors.ink, flex: 1 },
  pillarCount: { color: colors.inkSoft, fontSize: 13 },
  settingLabel: { fontWeight: '700', marginTop: spacing(3), marginBottom: spacing(2), color: colors.ink },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2) },
  goals: { marginTop: spacing(4), color: colors.inkSoft, fontSize: 13, lineHeight: 19 },
  remove: { marginTop: spacing(5), color: colors.danger, textDecorationLine: 'underline', fontSize: 13 },
});
