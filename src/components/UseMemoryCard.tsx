import { useCallback, useEffect, useRef, useState } from 'react';
import { CardItem, Difficulty } from './Types';
import { buildDeck } from './Card';

const FLIP_BACK_DELAY = 1000; // a bit slower than usual, kinder for elderly users

export function useMemoryGame(difficulty: Difficulty) {
  const [cards, setCards] = useState<CardItem[]>(() => buildDeck(difficulty));
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const selected = useRef<number[]>([]);
  const locked = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const won = cards.length > 0 && cards.every((c) => c.isMatched);
  const started = moves > 0;

  // Timer: starts on first move, stops when the game is won
  useEffect(() => {
    if (!started || won) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [started, won]);

  // Clean up pending flip-back on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCardPress = useCallback(
    (id: number) => {
      if (locked.current || selected.current.includes(id)) return;

      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)));
      selected.current.push(id);

      if (selected.current.length < 2) return;

      const [firstId, secondId] = selected.current;
      selected.current = [];
      setMoves((m) => m + 1);

      const first = cards.find((c) => c.id === firstId);
      if (first && first.pairId === card.pairId) {
        setCards((prev) =>
          prev.map((c) => (c.pairId === card.pairId ? { ...c, isMatched: true } : c))
        );
      } else {
        locked.current = true;
        timeoutRef.current = setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          locked.current = false;
        }, FLIP_BACK_DELAY);
      }
    },
    [cards]
  );

  return { cards, moves, seconds, won, onCardPress };
}