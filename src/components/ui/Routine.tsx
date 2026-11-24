import { Activity } from '../Types';
// Sample routine. Replace with caregiver-set data (Firebase) later.
export const INITIAL_ROUTINE: Activity[] = [
  { id: 1, time: '08:00', title: 'Breakfast', icon: 'cafe', done: false },
  { id: 2, time: '09:00', title: 'Take morning medicine', icon: 'medkit', done: false },
  { id: 3, time: '10:00', title: 'Drink a glass of water', icon: 'water', done: false },
  { id: 4, time: '11:00', title: 'Go for a walk', icon: 'walk', done: false },
  { id: 5, time: '13:00', title: 'Lunch', icon: 'restaurant', done: false },
  { id: 6, time: '16:00', title: 'Tea time', icon: 'cafe', done: false },
  { id: 7, time: '20:00', title: 'Take evening medicine', icon: 'medkit', done: false },
];