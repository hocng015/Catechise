import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  newProfileId,
  todayISO,
  type AgeTier,
  type Goal,
  type Pace,
} from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from '@/components/ui';

interface Choice<T> {
  value: T;
  title: string;
  detail: string;
}

const TIER_CHOICES: Choice<AgeTier>[] = [
  {
    value: 'child',
    title: 'A young child (about 5–9)',
    detail: 'Short, warm lessons with simple words, prayers to learn, and little quizzes.',
  },
  {
    value: 'youth',
    title: 'A pre-teen or teen (about 10–15)',
    detail: 'Straight talk about what we believe, why it matters, and how it fits real life.',
  },
  {
    value: 'adult',
    title: 'An adult (16 and up)',
    detail: 'The full depth of the faith, explained clearly — no prior knowledge needed.',
  },
];

const GOAL_CHOICES: Choice<Goal>[] = [
  {
    value: 'ocia',
    title: 'I am new to the Catholic faith',
    detail: 'Welcome! We will start at the very beginning and walk together.',
  },
  {
    value: 'returning',
    title: 'I am finding my way back to the Church',
    detail: 'Welcome home. Go at your own pace — every day is a fresh start.',
  },
  {
    value: 'first-communion',
    title: 'Getting ready for First Communion',
    detail: 'A gentle path through everything a young heart needs to know.',
  },
  {
    value: 'confirmation',
    title: 'Getting ready for Confirmation',
    detail: 'Understand the faith you are about to confirm as your own.',
  },
  {
    value: 'family',
    title: 'We are learning as a family',
    detail: 'You can add a profile for each family member after this.',
  },
  {
    value: 'grow',
    title: 'I want to grow deeper in my faith',
    detail: 'A steady daily walk through everything the Church teaches.',
  },
];

const PACE_CHOICES: Choice<Pace>[] = [
  {
    value: 'gentle',
    title: 'Gentle',
    detail: 'A short lesson every other day. About six months for the whole journey.',
  },
  {
    value: 'steady',
    title: 'Steady (a good place to start)',
    detail: 'One short lesson a day. About three months for the whole journey.',
  },
  {
    value: 'eager',
    title: 'Eager',
    detail: 'Two lessons a day, for when you cannot wait to learn more.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { profiles, addProfile } = useProfile();
  const firstTime = profiles.length === 0;

  const [step, setStep] = useState(firstTime ? 0 : 1);
  const [name, setName] = useState('');
  const [tier, setTier] = useState<AgeTier | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);

  const totalSteps = 5; // welcome, name, who, journey, pace

  const finish = (chosenPace: Pace) => {
    if (!name.trim() || !tier) return;
    addProfile({
      id: newProfileId(),
      name: name.trim(),
      tier,
      pace: chosenPace,
      goals: goal ? [goal] : [],
      createdAt: todayISO(),
      completed: {},
      journal: {},
    });
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {step > (firstTime ? 0 : 1) && (
        <Pressable onPress={() => setStep((s) => s - 1)} hitSlop={12} style={styles.backRow}>
          <Text style={styles.backText}>← Go back</Text>
        </Pressable>
      )}

      <View style={styles.dots}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View key={i} style={[styles.dot, i <= step && styles.dotActive]} />
        ))}
      </View>

      {step === 0 && (
        <View>
          <Text style={styles.bigMark}>✠</Text>
          <Text style={styles.headline}>Welcome to Catechise</Text>
          <Text style={styles.lede}>
            This app walks you through the Catholic faith one small day at a time — what we
            believe, how we worship, how we live, and how we pray.
          </Text>
          <Text style={styles.lede}>
            You do not need any experience with the faith, or with apps. There is always one
            clear next step, and you can never get it wrong.
          </Text>
          <View style={{ marginTop: spacing(8) }}>
            <Button label="Let's begin" variant="gold" onPress={() => setStep(1)} />
          </View>
        </View>
      )}

      {step === 1 && (
        <View>
          <Text style={styles.headline}>{firstTime ? "What's your name?" : 'Who is joining?'}</Text>
          <Text style={styles.lede}>We will use it to cheer you on.</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Type a first name here"
            placeholderTextColor={colors.inkSoft}
            style={styles.input}
            autoFocus
          />
          <View style={{ marginTop: spacing(6) }}>
            <Button label="Continue" disabled={name.trim().length === 0} onPress={() => setStep(2)} />
          </View>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.headline}>Who are the lessons for?</Text>
          <Text style={styles.lede}>
            The same faith, explained in the right words. You can change this anytime.
          </Text>
          <View style={styles.choiceList}>
            {TIER_CHOICES.map((c) => (
              <ChoiceCard
                key={c.value}
                title={c.title}
                detail={c.detail}
                selected={tier === c.value}
                onPress={() => {
                  setTier(c.value);
                  setStep(3);
                }}
              />
            ))}
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.headline}>Where are you on your journey?</Text>
          <Text style={styles.lede}>
            Pick the one that fits best. Everyone gets the same complete journey — this just
            helps us walk beside you.
          </Text>
          <View style={styles.choiceList}>
            {GOAL_CHOICES.map((c) => (
              <ChoiceCard
                key={c.value}
                title={c.title}
                detail={c.detail}
                selected={goal === c.value}
                onPress={() => {
                  setGoal(c.value);
                  setStep(4);
                }}
              />
            ))}
          </View>
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.headline}>How much time each day?</Text>
          <Text style={styles.lede}>
            Little and often is the secret. You can change your pace anytime.
          </Text>
          <View style={styles.choiceList}>
            {PACE_CHOICES.map((c) => (
              <ChoiceCard
                key={c.value}
                title={c.title}
                detail={c.detail}
                selected={pace === c.value}
                onPress={() => {
                  setPace(c.value);
                  finish(c.value);
                }}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function ChoiceCard({
  title,
  detail,
  selected,
  onPress,
}: {
  title: string;
  detail: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.choice,
        selected && styles.choiceSelected,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.choiceTitle, selected && { color: '#fff' }]}>{title}</Text>
      <Text style={[styles.choiceDetail, selected && { color: 'rgba(255,255,255,0.85)' }]}>
        {detail}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  backRow: { marginBottom: spacing(3) },
  backText: { color: colors.marian, fontSize: 16, fontWeight: '600' },
  dots: { flexDirection: 'row', gap: spacing(1.5), marginBottom: spacing(5) },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.goldSoft,
  },
  dotActive: { backgroundColor: colors.gold },
  bigMark: { fontSize: 44, color: colors.marian, marginBottom: spacing(2) },
  headline: { fontSize: 30, fontWeight: '800', color: colors.marian, lineHeight: 38 },
  lede: {
    marginTop: spacing(3),
    color: colors.inkSoft,
    fontSize: 17,
    lineHeight: 26,
  },
  input: {
    marginTop: spacing(5),
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(4),
    fontSize: 20,
    color: colors.ink,
  },
  choiceList: { marginTop: spacing(5), gap: spacing(3) },
  choice: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  choiceSelected: { backgroundColor: colors.marian, borderColor: colors.marian },
  choiceTitle: { fontSize: 18, fontWeight: '700', color: colors.ink, lineHeight: 25 },
  choiceDetail: { marginTop: spacing(1.5), fontSize: 15, color: colors.inkSoft, lineHeight: 22 },
});
