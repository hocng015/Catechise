import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ProfileProvider } from '@/lib/ProfileProvider';
import { colors } from '@/lib/theme';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.parchment },
          headerTintColor: colors.marian,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.parchment },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ title: 'Welcome', headerBackVisible: false }} />
        <Stack.Screen name="lesson/[lessonId]" options={{ title: 'Lesson' }} />
        <Stack.Screen name="play/quiz" options={{ title: 'Quick Quiz' }} />
        <Stack.Screen name="play/match" options={{ title: 'Match Up' }} />
        <Stack.Screen name="play/scramble" options={{ title: 'Word Builder' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', presentation: 'modal' }} />
      </Stack>
    </ProfileProvider>
  );
}
