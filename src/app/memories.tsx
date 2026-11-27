// app/memories.tsx
import { router } from 'expo-router';
import MemoriesScreenTab from '@/components/ui/MemoriesScreenTab';
export default () => <MemoriesScreenTab onBack={() => router.navigate('/')} />;