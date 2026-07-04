import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import type { MagisteriumCitation } from '@/lib/magisterium';
import { colors, radius, spacing } from '@/lib/theme';

export function Citations({ citations }: { citations: MagisteriumCitation[] }) {
  const [open, setOpen] = useState(false);
  if (citations.length === 0) return null;
  return (
    <View style={styles.box}>
      <Pressable onPress={() => setOpen((o) => !o)}>
        <Text style={styles.summary}>
          📚 {citations.length} citation{citations.length === 1 ? '' : 's'} from Church documents{' '}
          {open ? '▾' : '▸'}
        </Text>
      </Pressable>
      {open && (
        <View style={{ gap: spacing(2.5), marginTop: spacing(2) }}>
          {citations.map((c, i) => (
            <View key={i}>
              <Text style={styles.title}>
                {c.document_title ?? 'Church document'}
                {c.document_reference ? `, ${c.document_reference}` : ''}
                {c.document_author ? ` — ${c.document_author}` : ''}
              </Text>
              {c.cited_text ? (
                <Text style={styles.quote}>
                  {c.cited_text.length > 280 ? `${c.cited_text.slice(0, 280)}…` : c.cited_text}
                </Text>
              ) : null}
              {c.source_url ? (
                <Text style={styles.link} onPress={() => Linking.openURL(c.source_url!)}>
                  Source
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: spacing(3),
    backgroundColor: colors.parchment,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    padding: spacing(3),
  },
  summary: { fontWeight: '600', color: colors.inkSoft, fontSize: 13 },
  title: { fontWeight: '700', fontSize: 13, color: colors.ink },
  quote: {
    fontStyle: 'italic',
    color: colors.inkSoft,
    fontSize: 13,
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
    paddingLeft: spacing(2.5),
    marginTop: spacing(1),
    lineHeight: 19,
  },
  link: { color: colors.marian, textDecorationLine: 'underline', fontSize: 13, marginTop: spacing(1) },
});
