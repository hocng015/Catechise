import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  GOAL_LABELS,
  newProfileId,
  PACE_LABELS,
  TIER_LABELS,
  todayISO,
  type AgeTier,
  type Goal,
  type Pace,
} from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button, Pill } from '@/components/ui';

const TIER_ORDER: AgeTier[] = ['child', 'youth', 'adult'];
const PACE_ORDER: Pace[] = ['gentle', 'steady', 'eager'];
const GOAL_ORDER: Goal[] = ['first-communion', 'confirmation', 'ocia', 'family', 'grow'];

export default function OnboardingScreen() {
  const router = useRouter();
  const { profiles, addProfile } = useProfile();
  const [name, setName] = useState('');
  const [tier, setTier] = useState<AgeTier | null>(null);
  const [pace, setPace] = useState<Pace>('steady');
  const [goals, setGoals] = useState<Goal[]>([]);

  const canSave = name.trim().length > 0 && tier !== null;

  const toggleGoal = (g: Goal) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const save = () => {
    if (!canSave || !tier) return;
    addProfile({
      id: newProfileId(),
      name: name.trim(),
      tier,
      pace,
      goals,
      createdAt: todayISO(),
      completed: {},
      journal: {},
    });
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>
        {profiles.length === 0 ? '✠ Welcome to Catechise' : 'Add a learner'}
      </Text>
      <Text style={styles.lede}>
        A daily companion for learning the Catholic faith — the whole Catechism, one small
        step at a time. Each lesson is written for the learner in front of it, whether that
        is a seven-year-old or a grandparent. Set up a profile for each member of your
        household and switch between them anytime.
      </Text>

      <Text style={styles.label}>What is the learner&apos;s name?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Teresa"
        placeholderTextColor={colors.inkSoft}
        style={styles.input}
      />

      <Text style={styles.label}>How should lessons be written?</Text>
      <View style={styles.pillRow}>
        {TIER_ORDER.map((t) => (
          <Pill key={t} label={TIER_LABELS[t]} selected={tier === t} onPress={() => setTier(t)} />
        ))}
      </View>

      <Text style={styles.label}>Pick a daily pace</Text>
      <Text style={styles.hint}>
        Steady finishes the whole Catechism in about three months; gentle in about six. You can
        change this anytime on the Progress tab.
      </Text>
      <View style={styles.pillRow}>
        {PACE_ORDER.map((p) => (
          <Pill key={p} label={PACE_LABELS[p]} selected={pace === p} onPress={() => setPace(p)} />
        ))}
      </View>

      <Text style={styles.label}>Anything you&apos;re working toward? (optional)</Text>
      <View style={styles.pillRow}>
        {GOAL_ORDER.map((g) => (
          <Pill
            key={g}
            label={GOAL_LABELS[g]}
            selected={goals.includes(g)}
            onPress={() => toggleGoal(g)}
          />
        ))}
      </View>

      <View style={{ marginTop: spacing(6) }}>
        <Button label="Begin the journey" variant="gold" disabled={!canSave} onPress={save} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(10) },
  headline: { fontSize: 28, fontWeight: '800', color: colors.marian },
  lede: { marginTop: spacing(2.5), color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  label: { fontWeight: '700', fontSize: 16, marginTop: spacing(6), marginBottom: spacing(2), color: colors.ink },
  hint: { color: colors.inkSoft, fontSize: 13, lineHeight: 19, marginBottom: spacing(2) },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(3),
    fontSize: 16,
    color: colors.ink,
  },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2) },
});
