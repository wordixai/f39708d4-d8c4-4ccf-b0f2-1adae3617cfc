import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { SleepEntry, SleepStats } from '@/types/sleep';
import { calculateStats } from '@/utils/sleepUtils';

export function useSleepData(user: User | null) {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch entries from Supabase
  const fetchEntries = useCallback(async () => {
    if (!user) {
      setEntries([]);
      setIsLoaded(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('sleep_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      const mapped: SleepEntry[] = (data || []).map(row => ({
        id: row.id,
        date: row.date,
        bedtime: row.bedtime.slice(0, 5), // HH:MM format
        wakeTime: row.wake_time.slice(0, 5),
        duration: Number(row.duration),
        quality: row.quality,
      }));

      setEntries(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch entries');
    } finally {
      setIsLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = useCallback(async (entry: Omit<SleepEntry, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('sleep_entries')
        .insert({
          user_id: user.id,
          date: entry.date,
          bedtime: entry.bedtime,
          wake_time: entry.wakeTime,
          duration: entry.duration,
          quality: entry.quality,
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: SleepEntry = {
        id: data.id,
        date: data.date,
        bedtime: data.bedtime.slice(0, 5),
        wakeTime: data.wake_time.slice(0, 5),
        duration: Number(data.duration),
        quality: data.quality,
      };

      setEntries(prev => [...prev, newEntry].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add entry');
    }
  }, [user]);

  const removeEntry = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('sleep_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove entry');
    }
  }, [user]);

  const stats: SleepStats = calculateStats(entries);
  const recentEntries = entries.slice(-7).reverse();

  return {
    entries,
    recentEntries,
    stats,
    addEntry,
    removeEntry,
    isLoaded,
    error,
    refetch: fetchEntries,
  };
}
