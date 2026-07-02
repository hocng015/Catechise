import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { AgeTier } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import {
  askMagisterium,
  NOT_CONFIGURED_MESSAGE,
  type ChatMessage,
  type MagisteriumCitation,
} from '@/lib/magisterium';
import { colors, radius, spacing } from '@/lib/theme';
import { Pill } from '@/components/ui';
import { Citations } from '@/components/Citations';

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
  citations?: MagisteriumCitation[];
}

const STARTERS: Record<AgeTier, string[]> = {
  child: [
    'Why did God make me?',
    'What happens at Mass?',
    'Who is my guardian angel?',
    'Why do we make the sign of the cross?',
  ],
  youth: [
    'Why do Catholics confess to a priest?',
    'How do we know God is real?',
    'Why do we pray to Mary and the saints?',
    'What is the Eucharist, really?',
  ],
  adult: [
    'What does the Church teach about purgatory?',
    'How do Scripture and Tradition relate?',
    'What is required for a sin to be mortal?',
    'How should I form my conscience?',
  ],
};

export default function AskScreen() {
  const { profile } = useProfile();
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const tier: AgeTier = profile?.tier ?? 'adult';

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    setError(null);
    setInput('');
    const nextTurns: ChatTurn[] = [...turns, { role: 'user', content: question }];
    setTurns(nextTurns);
    setLoading(true);
    try {
      const system: ChatMessage = {
        role: 'system',
        content:
          tier === 'child'
            ? 'You are a gentle Catholic catechist answering a young child. Use very simple, warm language and short sentences. Always be faithful to Catholic teaching.'
            : tier === 'youth'
              ? 'You are a Catholic catechist answering a teenager. Be direct, engaging, and faithful to Catholic teaching.'
              : 'You are a Catholic catechist answering an adult learner. Be substantive, precise, and faithful to Catholic teaching.',
      };
      const history: ChatMessage[] = nextTurns.slice(-8).map((t) => ({ role: t.role, content: t.content }));
      const result = await askMagisterium([system, ...history]);
      setTurns((prev) => [
        ...prev,
        { role: 'assistant', content: result.content, citations: result.citations },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        <Text style={styles.intro}>
          Answers come from Magisterium AI, which draws on official Church documents and shows
          its sources. As with any tool, weigh what you read and bring big questions to your
          priest or catechist.
        </Text>

        {turns.length === 0 && (
          <View style={styles.starters}>
            {STARTERS[tier].map((s) => (
              <Pill key={s} label={s} onPress={() => send(s)} />
            ))}
          </View>
        )}

        <View style={{ gap: spacing(3), marginTop: spacing(4) }}>
          {turns.map((t, i) =>
            t.role === 'user' ? (
              <View key={i} style={styles.userBubble}>
                <Text style={styles.userText}>{t.content}</Text>
              </View>
            ) : (
              <View key={i} style={styles.assistantBubble}>
                <Text style={styles.assistantText}>{t.content}</Text>
                <Citations citations={t.citations ?? []} />
              </View>
            ),
          )}
          {loading && <Text style={styles.loading}>Searching the Church&apos;s documents…</Text>}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
              {error === NOT_CONFIGURED_MESSAGE && (
                <Link href="/settings" asChild>
                  <Pressable>
                    <Text style={styles.errorLink}>Open Settings →</Text>
                  </Pressable>
                </Link>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about the Catholic faith…"
          placeholderTextColor={colors.inkSoft}
          style={styles.input}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable
          onPress={() => send(input)}
          disabled={loading || input.trim().length === 0}
          style={[styles.sendButton, (loading || input.trim().length === 0) && { opacity: 0.4 }]}
        >
          <Text style={styles.sendText}>Ask</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(6) },
  intro: { color: colors.inkSoft, fontSize: 13, lineHeight: 19 },
  starters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2), marginTop: spacing(4) },
  userBubble: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    backgroundColor: colors.marian,
    borderRadius: radius.xl,
    borderBottomRightRadius: 4,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(2.5),
  },
  userText: { color: '#fff', fontSize: 15, lineHeight: 21 },
  assistantBubble: {
    alignSelf: 'flex-start',
    maxWidth: '95%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    borderBottomLeftRadius: 4,
    padding: spacing(3.5),
  },
  assistantText: { color: colors.ink, fontSize: 15, lineHeight: 23 },
  loading: { fontStyle: 'italic', color: colors.inkSoft },
  errorBox: {
    backgroundColor: colors.dangerBg,
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: radius.lg,
    padding: spacing(3),
  },
  errorText: { color: colors.danger, fontSize: 13, lineHeight: 19 },
  errorLink: { color: colors.marian, fontWeight: '700', marginTop: spacing(2) },
  inputRow: {
    flexDirection: 'row',
    gap: spacing(2),
    padding: spacing(3),
    backgroundColor: colors.parchment,
    borderTopWidth: 1,
    borderTopColor: colors.goldSoft,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(2.5),
    fontSize: 15,
    color: colors.ink,
  },
  sendButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(4),
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
