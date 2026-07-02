import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/lib/theme';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function Pill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, selected ? styles.pillSelected : null]}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
    >
      <Text style={[styles.pillText, selected ? styles.pillTextSelected : null]}>{label}</Text>
    </Pressable>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'gold' | 'outline';
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        variant === 'gold' && { backgroundColor: colors.gold },
        variant === 'outline' && styles.buttonOutline,
        disabled && { opacity: 0.4 },
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.buttonText, variant === 'outline' && { color: colors.marian }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ProgressBar({ pct, color }: { pct: number; color?: string }) {
  return (
    <View style={styles.track}>
      <View
        style={[styles.fill, { width: `${Math.min(100, Math.max(0, pct))}%` }, color ? { backgroundColor: color } : null]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    padding: spacing(4),
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing(2),
  },
  pill: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    backgroundColor: colors.card,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2.5),
  },
  pillSelected: {
    backgroundColor: colors.marian,
    borderColor: colors.marian,
  },
  pillText: { color: colors.ink, fontSize: 15 },
  pillTextSelected: { color: '#fff', fontWeight: '600' },
  button: {
    backgroundColor: colors.marian,
    borderRadius: radius.lg,
    paddingVertical: spacing(4.5),
    paddingHorizontal: spacing(5),
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.marian,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  track: {
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    overflow: 'hidden',
    flex: 1,
  },
  fill: { height: '100%', backgroundColor: colors.marian },
});
