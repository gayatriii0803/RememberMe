// app/my-day.tsx
import { router } from 'expo-router';
import MyDayScreenTab from '@/components/ui/MyDayScreenTab';
export default () => <MyDayScreenTab onBack={() => router.navigate('/')} />;