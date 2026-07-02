import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { completedCount } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';

const GAMES = [
  {
    href: '/play/quiz' as const,
    emoji: '🎯',
    title: 'Quick Quiz',
    detail: 'Five questions on what you have been learning. Earn a star for each right answer!',
  },
  {
    href: '/play/match' as const,
    emoji: '🧩',
    title: 'Match Up',
    detail: 'Match sacraments, Bible heroes, prayers, and more with their meanings.',
  },
  {
    href: '/play/scramble' as const,
    emoji: '🔤',
    title: 'Word Builder',
    detail: 'Unscramble the letters to build holy words. Can you get all five?',
  },
];

export default function PlayScreen() {
  const { profile } = useProfile();
  const stars = profile?.stars ?? 0;
  const done = profile ? completedCount(profile) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.starBanner}>
        <Text style={styles.starBig}>⭐</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.starCount}>
            {stars} star{stars === 1 ? '' : 's'}
          </Text>
          <Text style={styles.starHint}>
            {stars === 0
              ? 'Play a game to earn your first stars!'
              : 'Keep playing to earn more. Every game helps the faith stick.'}
          </Text>
        </View>
      </View>

      {done === 0 && (
        <Text style={styles.tip}>
          Tip: the Quick Quiz gets better the more lessons you finish — it asks about what
          you have already learned.
        </Text>
      )}

      <View style={{ gap: spacing(3.5), marginTop: spacing(4) }}>
        {GAMES.map((g) => (
          <Link key={g.href} href={g.href} asChild>
            <Pressable style={styles.gameCard}>
              <Text style={styles.gameEmoji}>{g.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.gameTitle}>{g.title}</Text>
                <Text style={styles.gameDetail}>{g.detail}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={styles.footNote}>
        Everything in these games comes from the lessons — playing is another way of learning.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(5), paddingBottom: spacing(12) },
  starBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
    backgroundColor: '#f7edd4',
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  starBig: { fontSize: 36 },
  starCount: { fontSize: 22, fontWeight: '800', color: colors.ink },
  starHint: { color: colors.inkSoft, fontSize: 13, lineHeight: 19, marginTop: spacing(0.5) },
  tip: { marginTop: spacing(4), color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3.5),
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(4.5),
  },
  gameEmoji: { fontSize: 34 },
  gameTitle: { fontSize: 19, fontWeight: '800', color: colors.ink },
  gameDetail: { color: colors.inkSoft, fontSize: 14, lineHeight: 20, marginTop: spacing(1) },
  chevron: { fontSize: 30, color: colors.inkSoft },
  footNote: {
    marginTop: spacing(6),
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});
