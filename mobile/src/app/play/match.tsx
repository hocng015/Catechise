import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MATCH_SETS, pickRandom, shuffle, type MatchSet } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from '@/components/ui';

const MAX_PAIRS = 6;

export default function MatchScreen() {
  const router = useRouter();
  const { addStars } = useProfile();
  const [round, setRound] = useState(0);
  const game = useMemo(() => makeGame(pickRandom(MATCH_SETS)), [round]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [missed, setMissed] = useState<Set<number>>(new Set());
  const [wrongRight, setWrongRight] = useState<number | null>(null);

  const finished = matched.size === game.pairs.length;
  const starsEarned = Math.max(1, game.pairs.length - missed.size);

  const tapRight = (rightIdx: number) => {
    if (selectedLeft === null) return;
    const pairIdx = game.rightOrder[rightIdx];
    if (pairIdx === selectedLeft) {
      const nextMatched = new Set(matched).add(pairIdx);
      setMatched(nextMatched);
      setSelectedLeft(null);
      setWrongRight(null);
      if (nextMatched.size === game.pairs.length) {
        addStars(Math.max(1, game.pairs.length - missed.size));
      }
    } else {
      setMissed((m) => new Set(m).add(selectedLeft));
      setWrongRight(rightIdx);
      setTimeout(() => setWrongRight(null), 600);
    }
  };

  const playAgain = () => {
    setRound((r) => r + 1);
    setSelectedLeft(null);
    setMatched(new Set());
    setMissed(new Set());
    setWrongRight(null);
  };

  if (finished) {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.center]}>
        <Text style={styles.doneEmoji}>🧩</Text>
        <Text style={styles.doneTitle}>All matched!</Text>
        <Text style={styles.doneStars}>
          You earned {starsEarned} star{starsEarned === 1 ? '' : 's'} ⭐
        </Text>
        <Text style={styles.doneBody}>
          {missed.size === 0
            ? 'First try on every pair — wonderful!'
            : 'The tricky ones are the ones you will remember best.'}
        </Text>
        <View style={{ alignSelf: 'stretch', gap: spacing(3), marginTop: spacing(6) }}>
          <Button label="Play a new set" variant="gold" onPress={playAgain} />
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>Back to games</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.setTitle}>{game.set.title}</Text>
      <Text style={styles.instruction}>
        {game.set.instruction} Tap one on the left, then its partner on the right.
      </Text>
      <Text style={styles.counter}>
        {matched.size} of {game.pairs.length} matched
      </Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          {game.pairs.map((p, i) => {
            const isMatched = matched.has(i);
            const isSelected = selectedLeft === i;
            return (
              <Pressable
                key={i}
                disabled={isMatched}
                onPress={() => setSelectedLeft(i)}
                style={[
                  styles.tile,
                  isSelected && styles.tileSelected,
                  isMatched && styles.tileMatched,
                ]}
              >
                <Text
                  style={[
                    styles.tileText,
                    styles.tileTextBold,
                    isSelected && { color: '#fff' },
                    isMatched && styles.tileTextMatched,
                  ]}
                >
                  {isMatched ? '✓ ' : ''}
                  {p.a}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.column}>
          {game.rightOrder.map((pairIdx, rightIdx) => {
            const isMatched = matched.has(pairIdx);
            const isWrong = wrongRight === rightIdx;
            return (
              <Pressable
                key={rightIdx}
                disabled={isMatched || selectedLeft === null}
                onPress={() => tapRight(rightIdx)}
                style={[
                  styles.tile,
                  isMatched && styles.tileMatched,
                  isWrong && styles.tileWrong,
                  selectedLeft === null && !isMatched && { opacity: 0.75 },
                ]}
              >
                <Text style={[styles.tileText, isMatched && styles.tileTextMatched]}>
                  {game.pairs[pairIdx].b}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedLeft === null && matched.size < game.pairs.length && (
        <Text style={styles.hint}>Start by tapping something on the left.</Text>
      )}
    </ScrollView>
  );
}

function makeGame(set: MatchSet) {
  const pairs = shuffle(set.pairs).slice(0, MAX_PAIRS);
  const rightOrder = shuffle(pairs.map((_, i) => i));
  return { set, pairs, rightOrder };
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(12) },
  center: { alignItems: 'center', paddingTop: spacing(10) },
  setTitle: { fontSize: 24, fontWeight: '800', color: colors.marian },
  instruction: { marginTop: spacing(2), color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  counter: { marginTop: spacing(2.5), color: colors.inkSoft, fontSize: 13, fontWeight: '600' },
  columns: { flexDirection: 'row', gap: spacing(2.5), marginTop: spacing(4) },
  column: { flex: 1, gap: spacing(2.5) },
  tile: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3),
    minHeight: 74,
    justifyContent: 'center',
  },
  tileSelected: { backgroundColor: colors.marian, borderColor: colors.marian },
  tileMatched: { backgroundColor: colors.successBg, borderColor: '#a7f3d0' },
  tileWrong: { backgroundColor: colors.dangerBg, borderColor: colors.danger },
  tileText: { fontSize: 13.5, lineHeight: 19, color: colors.ink },
  tileTextBold: { fontWeight: '700', fontSize: 15 },
  tileTextMatched: { color: colors.success },
  hint: { marginTop: spacing(4), textAlign: 'center', color: colors.inkSoft, fontSize: 13 },
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
