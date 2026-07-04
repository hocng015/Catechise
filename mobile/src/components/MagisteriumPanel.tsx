import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { askMagisterium, type ChatMessage, type MagisteriumResult } from '@/lib/magisterium';
import { colors, radius, spacing } from '@/lib/theme';
import { Button } from './ui';
import { Citations } from './Citations';

/** One-shot "go deeper" panel used on lesson and Gospel screens. */
export function MagisteriumPanel({
  buttonLabel,
  buildMessages,
}: {
  buttonLabel: string;
  buildMessages: () => ChatMessage[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MagisteriumResult | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      setResult(await askMagisterium(buildMessages()));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: spacing(3) }}>
      {!result && (
        <Button
          variant="outline"
          label={loading ? 'Consulting the Church’s documents…' : buttonLabel}
          onPress={run}
          disabled={loading}
        />
      )}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result.content}</Text>
          <Citations citations={result.citations} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: colors.dangerBg,
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: radius.lg,
    padding: spacing(3),
  },
  errorText: { color: colors.danger, fontSize: 13, lineHeight: 19 },
  resultBox: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.xl,
    padding: spacing(4),
  },
  resultText: { fontSize: 15, lineHeight: 23, color: colors.ink },
});
