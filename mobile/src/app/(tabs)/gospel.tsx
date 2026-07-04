import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { todayISO, type AgeTier } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { fetchDailyGospel, type GospelData } from '@/lib/gospel';
import { colors, radius, spacing } from '@/lib/theme';
import { Button, Card, SectionTitle } from '@/components/ui';
import { MagisteriumPanel } from '@/components/MagisteriumPanel';

const PROMPTS: Record<AgeTier, string[]> = {
  child: [
    'What is your favorite part of this story?',
    'What do you think Jesus wants you to do today?',
  ],
  youth: [
    'What word or line stands out to you? Why?',
    'If Jesus said this directly to you today, what would change?',
  ],
  adult: [
    'What word or phrase stops you? Stay with it.',
    'Where does this Gospel meet your life today — and what is one concrete response?',
  ],
};

export default function GospelScreen() {
  const { ready, profile, saveJournal } = useProfile();
  const [gospel, setGospel] = useState<GospelData | null>(null);
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [loadedEntry, setLoadedEntry] = useState(false);
  const today = todayISO();

  useEffect(() => {
    let cancelled = false;
    fetchDailyGospel(new Date()).then((g) => {
      if (!cancelled) setGospel(g);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (ready && profile && !loadedEntry) {
      setEntry(profile.journal[today] ?? '');
      setLoadedEntry(true);
    }
  }, [ready, profile, loadedEntry, today]);

  const tier: AgeTier = profile?.tier ?? 'adult';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.date}>
        {new Date().toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {gospel?.liturgicalDay ? ` · ${gospel.liturgicalDay}` : ''}
      </Text>

      {!gospel ? (
        <Text style={styles.muted}>Opening the lectionary…</Text>
      ) : (
        <View style={{ gap: spacing(4) }}>
          <Card>
            <SectionTitle>{gospel.title}</SectionTitle>
            {gospel.source === 'fallback' && (
              <Text style={styles.fallbackNote}>
                The live lectionary is unreachable right now, so here is a Gospel passage chosen for today.
              </Text>
            )}
            <Text style={styles.gospelText}>{gospel.text}</Text>
          </Card>

          <Card>
            <SectionTitle>💭 Sit with it</SectionTitle>
            {PROMPTS[tier].map((p, i) => (
              <Text key={i} style={styles.prompt}>
                • {p}
              </Text>
            ))}
            <Text style={styles.journalLabel}>My reflection for today</Text>
            <TextInput
              multiline
              value={entry}
              onChangeText={(t) => {
                setEntry(t);
                setSaved(false);
              }}
              placeholder={
                tier === 'child'
                  ? 'You can write or draw on paper — then write one sentence here!'
                  : 'Write freely. This stays on your device.'
              }
              placeholderTextColor={colors.inkSoft}
              style={styles.journalInput}
            />
            <View style={{ marginTop: spacing(3) }}>
              <Button
                label={saved ? '✓ Saved' : 'Save reflection'}
                disabled={entry.trim().length === 0}
                onPress={() => {
                  saveJournal(today, entry);
                  setSaved(true);
                }}
              />
            </View>
          </Card>

          <View>
            <SectionTitle>A guided reflection</SectionTitle>
            <Text style={[styles.muted, { marginBottom: spacing(3) }]}>
              Let Magisterium AI offer a short reflection on this Gospel, drawn from the Church&apos;s teaching.
            </Text>
            <MagisteriumPanel
              buttonLabel="✨ Reflect with Magisterium AI"
              buildMessages={() => [
                { role: 'user', content: buildReflectionPrompt(gospel, tier) },
              ]}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function buildReflectionPrompt(gospel: GospelData, tier: AgeTier): string {
  const audience =
    tier === 'child'
      ? 'a young child: very simple, warm, and encouraging, in short sentences'
      : tier === 'youth'
        ? 'a teenager: honest, direct, connected to daily life'
        : 'an adult: substantive, drawing on the Church Fathers or the Catechism where fitting';
  return `Here is today's Gospel reading (${gospel.title}):\n\n${gospel.text.slice(0, 2500)}\n\nPlease write a short reflection on this Gospel for ${audience}. End with one question to carry through the day and a one-line prayer. Keep it under 250 words.`;
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(10) },
  date: { color: colors.inkSoft, marginBottom: spacing(3), fontSize: 14 },
  muted: { color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  fallbackNote: { fontSize: 12, color: colors.inkSoft, marginBottom: spacing(2) },
  gospelText: { fontSize: 17, lineHeight: 27, color: colors.ink },
  prompt: { color: colors.inkSoft, fontSize: 14, lineHeight: 22 },
  journalLabel: { fontWeight: '700', marginTop: spacing(4), color: colors.ink },
  journalInput: {
    marginTop: spacing(2),
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    backgroundColor: colors.parchment,
    padding: spacing(3),
    fontSize: 15,
    color: colors.ink,
    textAlignVertical: 'top',
  },
});
