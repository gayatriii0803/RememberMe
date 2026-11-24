import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { formatReminderTime, getNextReminder } from '../Reminders'

interface Props {
  patientName: string;
  photoUri?: string; // optional familiar profile photo
  onPlayMemoryGame: () => void;
  onOpenMyDay: () => void;
  onOpenMemories: () => void;
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreenTab({
  patientName,
  photoUri,
  onPlayMemoryGame,
  onOpenMyDay,
  onOpenMemories,
}: Props) {
  const [now, setNow] = useState(new Date());

  // Refresh every 30s so the clock stays current
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const dateText = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeText = now.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const nextReminder = getNextReminder(now);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitial}>{patientName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <Text style={styles.greeting}>{getGreeting(now.getHours())},</Text>
          <Text style={styles.name}>{patientName}</Text>
        </View>

        <View style={styles.dateBox}>
          <Text style={styles.time}>{timeText}</Text>
          <Text style={styles.date}>{dateText}</Text>
        </View>

        <View style={styles.reminderCard}>
          <Ionicons
            name={(nextReminder?.icon ?? 'checkmark-circle') as keyof typeof Ionicons.glyphMap}
            size={40}
            color="#b45309"
          />
          <View style={styles.reminderInfo}>
            <Text style={styles.reminderLabel}>NEXT REMINDER</Text>
            <Text style={styles.reminderTitle}>
              {nextReminder ? nextReminder.title : 'No more reminders today'}
            </Text>
          </View>
          {nextReminder && (
            <Text style={styles.reminderTime}>{formatReminderTime(nextReminder.time)}</Text>
          )}
        </View>

        <View style={styles.actions}>
        <Pressable
          onPress={onPlayMemoryGame}
          accessibilityRole="button"
          accessibilityLabel="Play Memory Game"
          style={({ pressed }) => [styles.playBtn, pressed && styles.playBtnPressed]}
        >
          <Ionicons name="game-controller" size={56} color="#ffffff" />
          <Text style={styles.playText}>Play Memory Game</Text>
        </Pressable>

        <View style={styles.secondaryRow}>
        <Pressable
          onPress={onOpenMyDay}
          accessibilityRole="button"
          accessibilityLabel="My Day"
          style={styles.myDayBtn}
        >
          <Ionicons name="calendar" size={30} color="#2563eb" />
          <Text style={styles.myDayText}>My Day</Text>
        </Pressable>

        <Pressable
          onPress={onOpenMemories}
          accessibilityRole="button"
          accessibilityLabel="My Memories"
          style={styles.myDayBtn}
        >
          <Ionicons name="images" size={30} color="#2563eb" />
          <Text style={styles.myDayText}>My Memories</Text>
        </Pressable>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#eff6ff' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 24 },
  header: { alignItems: 'center', marginTop: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#2563eb' },
  avatarFallback: { backgroundColor: '#bfdbfe', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontSize: 56, fontWeight: 'bold', color: '#1e3a8a' },
  greeting: { fontSize: 28, color: '#1e3a8a', marginTop: 16 },
  name: { fontSize: 40, fontWeight: 'bold', color: '#1e3a8a' },
  dateBox: { alignItems: 'center' },
  time: { fontSize: 36, fontWeight: '600', color: '#1e3a8a' },
  date: { fontSize: 20, color: '#334155', marginTop: 4, textAlign: 'center' },
  playBtn: {
    width: '100%',
    minHeight: 140,
    backgroundColor: '#2563eb',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 6,
  },
  playBtnPressed: { backgroundColor: '#1d4ed8' },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fef3c7',
    borderWidth: 3,
    borderColor: '#f59e0b',
    borderRadius: 20,
    padding: 14,
  },
  reminderInfo: { flex: 1, marginLeft: 12 },
  reminderLabel: { fontSize: 14, fontWeight: 'bold', color: '#b45309' },
  reminderTitle: { fontSize: 22, fontWeight: 'bold', color: '#78350f' },
  reminderTime: { fontSize: 22, fontWeight: 'bold', color: '#78350f', marginLeft: 8 },
  actions: { width: '100%' },
  secondaryRow: { flexDirection: 'row' },
  myDayBtn: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#2563eb',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  myDayText: { fontSize: 22, fontWeight: 'bold', color: '#2563eb', marginTop: 4, textAlign: 'center' },
  playText: { fontSize: 30, fontWeight: 'bold', color: '#ffffff', marginTop: 10 },
});