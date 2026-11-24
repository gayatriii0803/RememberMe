import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '../Types';
import { INITIAL_ROUTINE } from '@/components/ui/Routine';

const VISIBLE_COUNT = 3; // only show the next few activities

function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export default function MyDayScreenTab({ onBack }: { onBack: () => void }) {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ROUTINE);

  const markDone = (id: number) =>
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, done: true } : a)));

  const pending = [...activities]
    .filter((a) => !a.done)
    .sort((a, b) => a.time.localeCompare(b.time));
  const upcoming = pending.slice(0, VISIBLE_COUNT);
  const laterCount = pending.length - upcoming.length;
  const doneCount = activities.length - pending.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>My Day</Text>
        <Text style={styles.subtitle}>
          {doneCount} of {activities.length} done today
        </Text>

        {upcoming.length === 0 ? (
          <View style={styles.allDone}>
            <Text style={styles.allDoneEmoji}>🎉</Text>
            <Text style={styles.allDoneText}>All done for today!</Text>
            <Text style={styles.allDoneSub}>Well done. Time to relax.</Text>
          </View>
        ) : (
          upcoming.map((item, index) => (
            <View key={item.id} style={[styles.card, index === 0 && styles.cardFirst]}>
              {index === 0 && <Text style={styles.upNext}>UP NEXT</Text>}

              <View style={styles.row}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={36}
                    color="#1e3a8a"
                  />
                </View>
                <View style={styles.info}>
                  <Text style={styles.time}>{formatTime(item.time)}</Text>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [styles.doneBtn, pressed && styles.doneBtnPressed]}
                onPress={() => markDone(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Mark ${item.title} as done`}
              >
                <Ionicons name="checkmark-circle" size={30} color="#ffffff" />
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            </View>
          ))
        )}

        {laterCount > 0 && <Text style={styles.later}>+ {laterCount} more later today</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#eff6ff' },
  container: { padding: 16, paddingBottom: 40 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 4 },
  backText: { fontSize: 22, fontWeight: '600', color: '#2563eb' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#1e3a8a', marginTop: 4 },
  subtitle: { fontSize: 20, color: '#334155', marginBottom: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  cardFirst: { borderColor: '#2563eb', borderWidth: 3 },
  upNext: { fontSize: 16, fontWeight: 'bold', color: '#2563eb', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, marginLeft: 14 },
  time: { fontSize: 20, color: '#475569' },
  activityTitle: { fontSize: 26, fontWeight: 'bold', color: '#1e3a8a' },
  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 14,
  },
  doneBtnPressed: { backgroundColor: '#15803d' },
  doneText: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginLeft: 8 },
  later: { fontSize: 20, color: '#475569', textAlign: 'center', marginTop: 8 },
  allDone: { alignItems: 'center', marginTop: 40 },
  allDoneEmoji: { fontSize: 64 },
  allDoneText: { fontSize: 32, fontWeight: 'bold', color: '#15803d', marginTop: 8 },
  allDoneSub: { fontSize: 20, color: '#166534', marginTop: 6 },
});