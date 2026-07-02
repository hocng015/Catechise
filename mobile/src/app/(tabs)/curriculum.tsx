import { Link } from 'expo-router';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { pillars, type Lesson, type Pillar, type Unit } from '@catechise/shared';
import { useProfile } from '@/lib/ProfileProvider';
import { colors, radius, spacing } from '@/lib/theme';

interface Row {
  lesson: Lesson;
}
interface Section {
  pillar: Pillar;
  unit: Unit;
  data: Row[];
}

export default function CurriculumScreen() {
  const { profile } = useProfile();
  const completed = profile?.completed ?? {};

  const sections: Section[] = pillars.flatMap((pillar) =>
    pillar.units.map((unit) => ({
      pillar,
      unit,
      data: unit.lessons.map((lesson) => ({ lesson })),
    })),
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(row) => row.lesson.id}
      contentContainerStyle={{ padding: spacing(4), paddingBottom: spacing(10) }}
      ListHeaderComponent={
        <Text style={styles.intro}>
          The whole Catechism in four pillars — what we believe, how we worship, how we live,
          and how we pray. Every lesson is keyed to the Catechism&apos;s own paragraphs (1–2865).
        </Text>
      }
      renderSectionHeader={({ section }) => {
        const unitDone = section.unit.lessons.filter((l) => completed[l.id]).length;
        return (
          <View style={styles.sectionHeader}>
            <View style={[styles.pillarTag, { backgroundColor: colors.pillars[section.pillar.accent] }]}>
              <Text style={styles.pillarTagText}>P{section.pillar.number}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.unitTitle}>{section.unit.title}</Text>
              <Text style={styles.unitMeta}>
                CCC {section.unit.ccc} · {unitDone}/{section.unit.lessons.length} done
              </Text>
            </View>
          </View>
        );
      }}
      renderItem={({ item }) => (
        <Link href={{ pathname: '/lesson/[lessonId]', params: { lessonId: item.lesson.id } }} asChild>
          <Pressable style={styles.row}>
            <Text style={[styles.check, !completed[item.lesson.id] && { opacity: 0.25 }]}>
              {completed[item.lesson.id] ? '✅' : '⭕'}
            </Text>
            <Text style={styles.rowText}>{item.lesson.title}</Text>
          </Pressable>
        </Link>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginBottom: spacing(4) },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2.5),
    marginTop: spacing(4),
    marginBottom: spacing(2),
  },
  pillarTag: {
    borderRadius: radius.full,
    paddingHorizontal: spacing(2.5),
    paddingVertical: spacing(1),
  },
  pillarTagText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  unitTitle: { fontWeight: '700', fontSize: 16, color: colors.ink },
  unitMeta: { fontSize: 12, color: colors.inkSoft },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2.5),
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    borderRadius: radius.md,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2.5),
    marginBottom: spacing(1.5),
  },
  check: { fontSize: 14 },
  rowText: { fontSize: 15, color: colors.ink, flex: 1 },
});
