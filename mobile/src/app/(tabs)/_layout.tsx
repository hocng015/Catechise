import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '@/lib/theme';

function emojiIcon(emoji: string) {
  return ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.parchment },
        headerShadowVisible: false,
        headerTintColor: colors.marian,
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
        tabBarActiveTintColor: colors.marian,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarStyle: { backgroundColor: '#fff' },
        sceneStyle: { backgroundColor: colors.parchment },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: emojiIcon('☀️') }} />
      <Tabs.Screen name="curriculum" options={{ title: 'Lessons', tabBarIcon: emojiIcon('📖') }} />
      <Tabs.Screen name="play" options={{ title: 'Play', tabBarIcon: emojiIcon('🧩') }} />
      <Tabs.Screen name="gospel" options={{ title: 'Gospel', tabBarIcon: emojiIcon('✝️') }} />
      <Tabs.Screen name="ask" options={{ title: 'Ask', tabBarIcon: emojiIcon('💬') }} />
      <Tabs.Screen name="progress" options={{ title: 'My Journey', tabBarIcon: emojiIcon('🌱') }} />
    </Tabs>
  );
}
