import { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getApiKey, setApiKey } from '@/lib/magisterium';
import { colors, radius, spacing } from '@/lib/theme';
import { Button, Card, SectionTitle } from '@/components/ui';

export default function SettingsScreen() {
  const [key, setKey] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getApiKey().then((k) => {
      setKey(k ?? '');
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <SectionTitle>Magisterium AI</SectionTitle>
        <Text style={styles.body}>
          This is optional — everything else in the app works without it. Magisterium AI
          answers your questions on the Ask tab from the Church&apos;s own documents. To turn
          it on:
        </Text>
        <Text style={styles.steps}>
          1. Visit{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.magisterium.com')}>
            magisterium.com
          </Text>{' '}
          and create a free account.{'\n'}
          2. On their site, create an &quot;API key&quot; — a long password made of letters and
          numbers.{'\n'}
          3. Copy it, come back here, and paste it in the box below.
        </Text>
        <Text style={styles.body}>
          It is saved securely on this phone only. If this feels fiddly, ask a family member
          to help — it takes about two minutes, once.
        </Text>
        <TextInput
          value={key}
          onChangeText={(t) => {
            setKey(t);
            setSaved(false);
          }}
          placeholder="Paste your API key"
          placeholderTextColor={colors.inkSoft}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          style={styles.input}
        />
        <View style={{ marginTop: spacing(3) }}>
          <Button
            label={saved ? '✓ Saved' : key.trim() ? 'Save key' : 'Clear key'}
            onPress={async () => {
              await setApiKey(key);
              setSaved(true);
            }}
          />
        </View>
      </Card>

      <Card style={{ marginTop: spacing(4) }}>
        <SectionTitle>About Catechise</SectionTitle>
        <Text style={styles.body}>
          Lesson references follow the Catechism of the Catholic Church, 2nd edition,
          covering paragraphs 1–2865 across its four pillars. This app is a study
          companion, not a substitute for parish catechesis or the sacraments. Progress and
          journals stay on this device.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(4), paddingBottom: spacing(10) },
  body: { color: colors.inkSoft, fontSize: 15, lineHeight: 23 },
  steps: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 26,
    marginVertical: spacing(3),
  },
  link: { color: colors.marian, textDecorationLine: 'underline' },
  input: {
    marginTop: spacing(3),
    backgroundColor: colors.parchment,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(3),
    fontSize: 15,
    color: colors.ink,
  },
});
