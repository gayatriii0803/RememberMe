// app/game.tsx
import { router } from 'expo-router';
import GameScreen from '@/components/ui/GameScreen';
export default () => <GameScreen onBack={() => router.navigate('/')} />;