import { SleepEntry } from '@/types/sleep';
import { formatDuration, getQualityLabel, formatDate } from '@/utils/sleepUtils';

interface SleepChartProps {
  entries: SleepEntry[];
}

export function SleepChart({ entries }: SleepChartProps) {
  const maxDuration = 10; // Max hours to show

  if (entries.length === 0) {
    return (
      <div className="glass-card p-6 glow-effect animate-in">
        <h2 className="text-lg font-semibold mb-5">Weekly Overview</h2>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          No sleep data yet. Start logging to see your patterns.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 glow-effect animate-in">
      <h2 className="text-lg font-semibold mb-5">Weekly Overview</h2>

      <div className="space-y-3">
        {entries.map((entry, index) => {
          const quality = getQualityLabel(entry.quality);
          const barWidth = (entry.duration / maxDuration) * 100;
          const qualityColors = {
            excellent: 'bg-[hsl(var(--sleep-excellent))]',
            good: 'bg-[hsl(var(--sleep-good))]',
            fair: 'bg-[hsl(var(--sleep-fair))]',
            poor: 'bg-[hsl(var(--sleep-poor))]',
          };

          return (
            <div
              key={entry.id}
              className="animate-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                <span className="text-sm font-medium">{formatDuration(entry.duration)}</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${qualityColors[quality]}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border/50">
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--sleep-excellent))]" />
            <span className="text-muted-foreground">Excellent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--sleep-good))]" />
            <span className="text-muted-foreground">Good</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--sleep-fair))]" />
            <span className="text-muted-foreground">Fair</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--sleep-poor))]" />
            <span className="text-muted-foreground">Poor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
