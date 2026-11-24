import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Memory, MemoryCategory } from '../Types';
import { MEMORIES } from './Memories';

const CATEGORIES: { key: MemoryCategory; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'family', label: 'Family', icon: 'people' },
  { key: 'places', label: 'Places', icon: 'location' },
  { key: 'stories', label: 'Stories', icon: 'book' },
];

function MemoryPhoto({ memory, size }: { memory: Memory; size: number }) {
  if (memory.photoUri) {
    return (
      <Image
        source={{ uri: memory.photoUri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return (
    <View style={[styles.emojiCircle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.5 }}>{memory.emoji}</Text>
    </View>
  );
}

export default function MemoriesScreen({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState<MemoryCategory>('family');
  const [selected, setSelected] = useState<Memory | null>(null);

  // Detail view: one memory at a time, large and easy to read
  if (selected) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={[styles.container, styles.detail]}>
          <Pressable style={styles.backBtn} onPress={() => setSelected(null)}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <MemoryPhoto memory={selected} size={200} />
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <Text style={styles.detailSubtitle}>{selected.subtitle}</Text>
          <Text style={styles.story}>{selected.story}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const items = MEMORIES.filter((m) => m.category === category);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>My Memories</Text>

        <View style={styles.tabs}>
          {CATEGORIES.map((c) => {
            const active = c.key === category;
            return (
              <Pressable
                key={c.key}
                onPress={() => setCategory(c.key)}
                style={[styles.tab, active && styles.tabActive]}
                accessibilityRole="button"
                accessibilityLabel={c.label}
              >
                <Ionicons name={c.icon} size={30} color={active ? '#ffffff' : '#2563eb'} />
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{c.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {items.length === 0 ? (
          <Text style={styles.empty}>Nothing added here yet.</Text>
        ) : (
          items.map((m) => (
            <Pressable
              key={m.id}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => setSelected(m)}
              accessibilityRole="button"
              accessibilityLabel={`${m.title}, ${m.subtitle}`}
            >
              <MemoryPhoto memory={m} size={80} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{m.title}</Text>
                <Text style={styles.cardSubtitle}>{m.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={32} color="#2563eb" />
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#eff6ff' },
  container: { padding: 16, paddingBottom: 40 },
  detail: { alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 4 },
  backText: { fontSize: 22, fontWeight: '600', color: '#2563eb' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#1e3a8a', marginVertical: 4 },
  tabs: { flexDirection: 'row', marginVertical: 12 },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#2563eb',
    backgroundColor: '#ffffff',
  },
  tabActive: { backgroundColor: '#2563eb' },
  tabText: { fontSize: 20, fontWeight: 'bold', color: '#2563eb', marginTop: 4 },
  tabTextActive: { color: '#ffffff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  cardPressed: { backgroundColor: '#dbeafe' },
  cardInfo: { flex: 1, marginLeft: 14 },
  cardTitle: { fontSize: 26, fontWeight: 'bold', color: '#1e3a8a' },
  cardSubtitle: { fontSize: 20, color: '#475569', marginTop: 2 },
  emojiCircle: { backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' },
  empty: { fontSize: 22, color: '#475569', textAlign: 'center', marginTop: 30 },
  detailTitle: { fontSize: 38, fontWeight: 'bold', color: '#1e3a8a', marginTop: 16 },
  detailSubtitle: { fontSize: 24, color: '#475569', marginTop: 4 },
  story: { fontSize: 24, lineHeight: 34, color: '#1e293b', marginTop: 20, textAlign: 'center' },
});