import { Reminder } from './Types';

// Sample daily reminders, sorted by time. Replace with caregiver-set data (Firebase) later.
export const REMINDERS: Reminder[] = [
  { id: 1, time: '09:00', title: 'Take morning medicine', icon: 'medkit' },
  { id: 2, time: '10:00', title: 'Drink a glass of water', icon: 'water' },
  { id: 3, time: '12:00', title: 'Drink a glass of water', icon: 'water' },
  { id: 4, time: '15:00', title: 'Doctor appointment', icon: 'calendar' },
  { id: 5, time: '16:00', title: 'Drink a glass of water', icon: 'water' },
  { id: 6, time: '20:00', title: 'Take evening medicine', icon: 'medkit' },
];

// First reminder at or after the current time, or undefined if none are left today
export function getNextReminder(now: Date): Reminder | undefined {
  const current = now.getHours() * 60 + now.getMinutes();
  return REMINDERS.find((r) => {
    const [h, m] = r.time.split(':').map(Number);
    return h * 60 + m >= current;
  });
}

export function formatReminderTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${suffix}`;
}