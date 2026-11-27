import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  game: 'game-controller',
  'my-day': 'calendar',
  memories: 'images',
};

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIcon: ({ color }) => (
          <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse'} size={28}  />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="game" options={{ title: 'Game' }} />
      <Tabs.Screen name="my-day" options={{ title: 'My Day' }} />
      <Tabs.Screen name="memories" options={{ title: 'Memories' }} />
    </Tabs>
  );
}