export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number; // in hours
  quality: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export type SleepQuality = 'excellent' | 'good' | 'fair' | 'poor';

export interface SleepStats {
  averageDuration: number;
  averageQuality: number;
  totalEntries: number;
  weeklyTrend: 'improving' | 'declining' | 'stable';
}
