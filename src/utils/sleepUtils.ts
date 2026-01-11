import { SleepEntry, SleepQuality, SleepStats } from '@/types/sleep';

export function calculateDuration(bedtime: string, wakeTime: string): number {
  const [bedHour, bedMin] = bedtime.split(':').map(Number);
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);

  let bedMinutes = bedHour * 60 + bedMin;
  let wakeMinutes = wakeHour * 60 + wakeMin;

  // Handle overnight sleep
  if (wakeMinutes <= bedMinutes) {
    wakeMinutes += 24 * 60;
  }

  return (wakeMinutes - bedMinutes) / 60;
}

export function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

export function getQualityLabel(quality: number): SleepQuality {
  if (quality >= 4.5) return 'excellent';
  if (quality >= 3.5) return 'good';
  if (quality >= 2.5) return 'fair';
  return 'poor';
}

export function getQualityColor(quality: SleepQuality): string {
  const colors = {
    excellent: 'hsl(var(--sleep-excellent))',
    good: 'hsl(var(--sleep-good))',
    fair: 'hsl(var(--sleep-fair))',
    poor: 'hsl(var(--sleep-poor))',
  };
  return colors[quality];
}

export function calculateStats(entries: SleepEntry[]): SleepStats {
  if (entries.length === 0) {
    return {
      averageDuration: 0,
      averageQuality: 0,
      totalEntries: 0,
      weeklyTrend: 'stable',
    };
  }

  const avgDuration = entries.reduce((sum, e) => sum + e.duration, 0) / entries.length;
  const avgQuality = entries.reduce((sum, e) => sum + e.quality, 0) / entries.length;

  // Calculate trend from last 7 entries
  const recentEntries = entries.slice(-7);
  const olderEntries = entries.slice(-14, -7);

  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  if (recentEntries.length >= 3 && olderEntries.length >= 3) {
    const recentAvg = recentEntries.reduce((s, e) => s + e.quality, 0) / recentEntries.length;
    const olderAvg = olderEntries.reduce((s, e) => s + e.quality, 0) / olderEntries.length;
    if (recentAvg > olderAvg + 0.3) trend = 'improving';
    else if (recentAvg < olderAvg - 0.3) trend = 'declining';
  }

  return {
    averageDuration: avgDuration,
    averageQuality: avgQuality,
    totalEntries: entries.length,
    weeklyTrend: trend,
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
