import { CardItem, Difficulty, DifficultyConfig } from './Types';

// Familiar, easy-to-recognise symbols (several tied to North East India)
export const SYMBOLS: string[] = [
  '🍍', // pineapple
  '🍵', // tea
  '🐘', // elephant
  '🦏', // one-horned rhino
  '🌺', // orchid / flower
  '🍊', // orange
  '🌶️', // chilli
  '🐟', // fish
  '🥭', // mango
  '🏔️', // hills
];

export const DIFFICULTY: Record<Difficulty, DifficultyConfig> = {
  easy: { label: 'Easy', pairs: 3, columns: 2 },     // 6 cards
  medium: { label: 'Medium', pairs: 6, columns: 3 }, // 12 cards
  hard: { label: 'Hard', pairs: 8, columns: 4 },     // 16 cards
};

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(difficulty: Difficulty): CardItem[] {
  const { pairs } = DIFFICULTY[difficulty];
  const chosen = shuffle(SYMBOLS).slice(0, pairs);

  const deck: CardItem[] = [];
  chosen.forEach((symbol, pairId) => {
    for (let copy = 0; copy < 2; copy++) {
      deck.push({
        id: pairId * 2 + copy,
        pairId,
        symbol,
        isFlipped: false,
        isMatched: false,
      });
    }
  });

  return shuffle(deck);
}