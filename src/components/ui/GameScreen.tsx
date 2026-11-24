import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MemoryCard from './MemoryCard';
import { useMemoryGame } from '../UseMemoryCard';
import { Difficulty } from '../Types'
import { DIFFICULTY } from '../Card';

const LEVELS: Difficulty[] = ['easy', 'medium', 'hard'];

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function Game({ difficulty, onRestart }: { difficulty: Difficulty; onRestart: () => void }) {
  const { cards, moves, seconds, won, onCardPress } = useMemoryGame(difficulty);
  const { width } = useWindowDimensions();
  const { columns } = DIFFICULTY[difficulty];

  // 12px = margin around each card, 32px = screen padding
  const cardSize = Math.min(130, (width - 32) / columns - 12);

  return (
    <>
      <View style={styles.stats}>
        <Text style={styles.statText}>Moves: {moves}</Text>
        <Text style={styles.statText}>Time: {formatTime(seconds)}</Text>
      </View>

      <View style={[styles.grid, { width: (cardSize + 12) * columns }]}>
        {cards.map((card) => (
          <MemoryCard key={card.id} card={card} size={cardSize} onPress={onCardPress} />
        ))}
      </View>

      {won && (
        <View style={styles.winBox}>
          <Text style={styles.winText}>🎉 Well done!</Text>
          <Text style={styles.winSub}>
            You finished in {moves} moves and {formatTime(seconds)}.
          </Text>
        </View>
      )}

      <Pressable style={styles.restartBtn} onPress={onRestart}>
        <Text style={styles.restartText}>{won ? 'Play Again' : 'Restart'}</Text>
      </Pressable>
    </>
  );
}

export default function GameScreen({ onBack }: { onBack: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [round, setRound] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>←Home</Text>
        </Pressable>
        <Text style={styles.title}>Memory Match</Text>

        <View style={styles.levels}>
          {LEVELS.map((level) => (
            <Pressable
              key={level}
              onPress={() => {
                setDifficulty(level);
                setRound((r) => r + 1);
              }}
              style={[styles.levelBtn, difficulty === level && styles.levelBtnActive]}
            >
              <Text style={[styles.levelText, difficulty === level && styles.levelTextActive]}>
                {DIFFICULTY[level].label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* key remounts Game => fresh deck on level change or restart */}
        <Game
          key={`${difficulty}-${round}`}
          difficulty={difficulty}
          onRestart={() => setRound((r) => r + 1)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#eff6ff' },
  container: { alignItems: 'center', padding: 16, paddingBottom: 40 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 4 },
  backText: { fontSize: 22, fontWeight: '600', color: '#2563eb' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1e3a8a', marginVertical: 12 },
  levels: { flexDirection: 'row', marginBottom: 12 },
  levelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
    backgroundColor: '#ffffff',
  },
  levelBtnActive: { backgroundColor: '#2563eb' },
  levelText: { fontSize: 20, fontWeight: '600', color: '#2563eb' },
  levelTextActive: { color: '#ffffff' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 12 },
  statText: { fontSize: 22, fontWeight: '600', color: '#1e3a8a' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  winBox: { marginTop: 20, alignItems: 'center' },
  winText: { fontSize: 32, fontWeight: 'bold', color: '#15803d' },
  winSub: { fontSize: 20, color: '#166534', marginTop: 6, textAlign: 'center' },
  restartBtn: {
    marginTop: 24,
    backgroundColor: '#1e3a8a',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  restartText: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
});