
export type Difficulty = 'easy' | 'medium' | 'hard';
 
export type MemoryCategory = 'family' | 'places' | 'stories';
 
export interface Memory {
  id: number;
  category: MemoryCategory;
  title: string;      // person's name, place name or story title
  subtitle: string;   // e.g. "Daughter", "Where I raised my family"
  story: string;      // short personal note shown on the detail view
  emoji: string;      // fallback when there is no photo
  photoUri?: string;  // optional real photo
}
 
export interface Reminder {
  id: number;
  time: string;   // 24h "HH:mm", zero-padded
  title: string;
  icon: string;   // Ionicons name
}
 
export interface Activity {
  id: number;
  time: string;   // 24h "HH:mm", zero-padded so it sorts correctly
  title: string;
  icon: string;   // Ionicons name
  done: boolean;
}
 
export interface CardItem {
  id: number;       // unique per card
  pairId: number;   // same for the two matching cards
  symbol: string;   // emoji shown on the card face
  isFlipped: boolean;
  isMatched: boolean;
}
 
export interface DifficultyConfig {
  label: string;
  pairs: number;    // number of pairs in the deck
  columns: number;  // grid columns
}