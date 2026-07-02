import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCRAMBLE_WORDS, shuffle, type ScrambleWord } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from '@/components/ui';

const ROUND_LENGTH = 5;

interface Tile {
  letter: string;
  used: boolean;
}

function newRound(): ScrambleWord[] {
  return shuffle(SCRAMBLE_WORDS).slice(0, ROUND_LENGTH);
}

export default function ScrambleScreen() {
  const router = useRouter();
  const { addStars } = useProfile();
  const [words, setWords] = useState<ScrambleWord[]>(newRound);
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>(() => makeTiles(words[0].word));
  const [answer, setAnswer] = useState<number[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [solved, setSolved] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const word = words[idx];
  const answerText = answer.map((i) => tiles[i].letter).join('');

  const tapTile = (ti: number) => {
    if (tiles[ti].used || solved) return;
    const nextAnswer = [...answer, ti];
    const nextTiles = tiles.map((t, i) => (i === ti ? { ...t, used: true } : t));
    setTiles(nextTiles);
    setAnswer(nextAnswer);

    if (nextAnswer.length === word.word.length) {
      const guess = nextAnswer.map((i) => nextTiles[i].letter).join('');
      if (guess === word.word) {
        setSolved(true);
        setStarCount((s) => s + 1);
      } else {
        setWrongFlash(true);
        setTimeout(() => {
          setWrongFlash(false);
          setAnswer([]);
          setTiles(nextTiles.map((t) => ({ ...t, used: false })));
        }, 700);
      }
    }
  };

  const undoLetter = () => {
    if (answer.length === 0 || solved) return;
    const last = answer[answer.length - 1];
    setAnswer(answer.slice(0, -1));
    setTiles(tiles.map((t, i) => (i === last ? { ...t, used: false } : t)));
  };

  const nextWord = () => {
    if (idx + 1 < words.length) {
      const n = idx + 1;
      setIdx(n);
      setTiles(makeTiles(words[n].word));
      setAnswer([]);
      setSolved(false);
    } else {
      setFinished(true);
      addStars(Math.max(1, starCount));
    }
  };

  const skipWord = () => {
    if (idx + 1 < words.length) {
      const n = idx + 1;
      setIdx(n);
      setTiles(makeTiles(words[n].word));
      setAnswer([]);
      setSolved(false);
    } else {
      setFinished(true);
      addStars(Math.max(1, starCount));
    }
  };

  const playAgain = () => {
    const fresh = newRound();
    setWords(fresh);
    setIdx(0);
    setTiles(makeTiles(fresh[0].word));
    setAnswer([]);
    setSolved(false);
    setStarCount(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.center]}>
        <Text style={styles.doneEmoji}>🔤</Text>
        <Text style={styles.doneTitle}>Word Builder done!</Text>
        <Text style={styles.doneStars}>
          You earned {Math.max(1, starCount)} star{Math.max(1, starCount) === 1 ? '' : 's'} ⭐
        </Text>
        <Text style={styles.doneBody}>Every one of those words is a little doorway into the faith.</Text>
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
      <Text style={styles.counter}>
        Word {idx + 1} of {words.length} · ⭐ {starCount}
      </Text>
      <Text style={styles.hintLabel}>Your clue:</Text>
      <Text style={styles.hint}>{word.hint}</Text>

      <View style={[styles.answerRow, wrongFlash && styles.answerWrong, solved && styles.answerRight]}>
        {word.word.split('').map((_, i) => (
          <View key={i} style={styles.slot}>
            <Text style={styles.slotText}>{answerText[i] ?? ''}</Text>
          </View>
        ))}
      </View>
      {wrongFlash && <Text style={styles.tryAgain}>Not quite — try again!</Text>}
      {solved && <Text style={styles.gotIt}>🎉 You built it!</Text>}

      <View style={styles.tileRow}>
        {tiles.map((t, i) => (
          <Pressable
            key={i}
            disabled={t.used || solved}
            onPress={() => tapTile(i)}
            style={[styles.tile, t.used && styles.tileUsed]}
          >
            <Text style={[styles.tileText, t.used && { opacity: 0.25 }]}>{t.letter}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: spacing(6), gap: spacing(3) }}>
        {solved ? (
          <Button
            label={idx + 1 < words.length ? 'Next word →' : 'See my stars ⭐'}
            variant="gold"
            onPress={nextWord}
          />
        ) : (
          <>
            <Button label="↩ Take back a letter" variant="outline" onPress={undoLetter} disabled={answer.length === 0} />
            <Pressable onPress={skipWord}>
              <Text style={styles.skipLink}>This one is hard — skip it</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function makeTiles(word: string): Tile[] {
  let letters = shuffle(word.split(''));
  // Never present the word already solved.
  if (letters.join('') === word && word.length > 1) {
    letters = [...letters.slice(1), letters[0]];
  }
  return letters.map((letter) => ({ letter, used: false }));
}

const styles = StyleSheet.create({
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  center: { alignItems: 'center', paddingTop: spacing(10) },
  counter: { color: colors.inkSoft, fontSize: 13 },
  hintLabel: { marginTop: spacing(4), color: colors.inkSoft, fontSize: 14 },
  hint: { marginTop: spacing(1), fontSize: 20, fontWeight: '700', color: colors.ink, lineHeight: 28 },
  answerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(2),
    marginTop: spacing(6),
    padding: spacing(2),
    borderRadius: radius.lg,
  },
  answerWrong: { backgroundColor: colors.dangerBg },
  answerRight: { backgroundColor: colors.successBg },
  slot: {
    width: 44,
    height: 52,
    borderBottomWidth: 3,
    borderBottomColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotText: { fontSize: 28, fontWeight: '800', color: colors.marian },
  tryAgain: { marginTop: spacing(2), color: colors.danger, fontWeight: '600' },
  gotIt: { marginTop: spacing(2), color: colors.success, fontWeight: '700', fontSize: 16 },
  tileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2.5), marginTop: spacing(6) },
  tile: {
    width: 52,
    height: 56,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileUsed: { backgroundColor: colors.parchment },
  tileText: { fontSize: 24, fontWeight: '800', color: colors.ink },
  skipLink: { textAlign: 'center', color: colors.inkSoft, textDecorationLine: 'underline', fontSize: 14 },
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
