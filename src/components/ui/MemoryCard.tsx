import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { CardItem } from '../Types';

interface Props {
  card: CardItem;
  size: number;
  onPress: (id: number) => void;
}

export default function MemoryCard({ card, size, onPress }: Props) {
  const faceUp = card.isFlipped || card.isMatched;

  return (
    <Pressable
      onPress={() => onPress(card.id)}
      accessibilityRole="button"
      accessibilityLabel={faceUp ? `Card ${card.symbol}` : 'Hidden card'}
      style={[
        styles.card,
        { width: size, height: size },
        faceUp ? styles.front : styles.back,
        card.isMatched && styles.matched,
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.5 }]}>{faceUp ? card.symbol : '?'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1e3a8a',
  },
  back: { backgroundColor: '#2563eb' },
  front: { backgroundColor: '#ffffff' },
  matched: { backgroundColor: '#bbf7d0', borderColor: '#16a34a' },
  text: { color: '#ffffff', fontWeight: 'bold' },
});