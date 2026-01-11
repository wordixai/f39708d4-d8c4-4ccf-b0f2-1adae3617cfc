import { useState, useEffect, useCallback } from 'react';
import { SleepEntry, SleepStats } from '@/types/sleep';
import { calculateStats, generateId } from '@/utils/sleepUtils';

const STORAGE_KEY = 'dreamtrack-sleep-entries';

// Sample data for demo
const sampleEntries: SleepEntry[] = [
  { id: '1', date: '2025-01-05', bedtime: '22:30', wakeTime: '06:45', duration: 8.25, quality: 4 },
  { id: '2', date: '2025-01-06', bedtime: '23:15', wakeTime: '07:00', duration: 7.75, quality: 3 },
  { id: '3', date: '2025-01-07', bedtime: '22:00', wakeTime: '06:30', duration: 8.5, quality: 5 },
  { id: '4', date: '2025-01-08', bedtime: '23:45', wakeTime: '07:30', duration: 7.75, quality: 3 },
  { id: '5', date: '2025-01-09', bedtime: '22:15', wakeTime: '06:15', duration: 8, quality: 4 },
  { id: '6', date: '2025-01-10', bedtime: '23:00', wakeTime: '07:00', duration: 8, quality: 4 },
  { id: '7', date: '2025-01-11', bedtime: '22:30', wakeTime: '06:30', duration: 8, quality: 5 },
];

export function useSleepData() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries(sampleEntries);
      }
    } else {
      setEntries(sampleEntries);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const addEntry = useCallback((entry: Omit<SleepEntry, 'id'>) => {
    const newEntry: SleepEntry = {
      ...entry,
      id: generateId(),
    };
    setEntries(prev => [...prev, newEntry].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const stats: SleepStats = calculateStats(entries);
  const recentEntries = entries.slice(-7).reverse();

  return {
    entries,
    recentEntries,
    stats,
    addEntry,
    removeEntry,
    isLoaded,
  };
}
