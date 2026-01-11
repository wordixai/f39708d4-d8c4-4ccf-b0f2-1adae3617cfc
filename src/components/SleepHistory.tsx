import { Trash2, Moon, Star } from 'lucide-react';
import { SleepEntry } from '@/types/sleep';
import { formatDuration, formatDate } from '@/utils/sleepUtils';

interface SleepHistoryProps {
  entries: SleepEntry[];
  onRemove: (id: string) => void;
}

export function SleepHistory({ entries, onRemove }: SleepHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="glass-card p-6 glow-effect animate-in">
        <h2 className="text-lg font-semibold mb-4">Recent History</h2>
        <p className="text-muted-foreground text-center py-8">
          No entries yet. Log your first night!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 glow-effect animate-in">
      <h2 className="text-lg font-semibold mb-4">Recent History</h2>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors animate-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Moon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm">{formatDate(entry.date)}</div>
                <div className="text-xs text-muted-foreground">
                  {entry.bedtime} - {entry.wakeTime}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium text-sm">{formatDuration(entry.duration)}</div>
                <div className="flex items-center gap-0.5 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < entry.quality
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => onRemove(entry.id)}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                aria-label="Remove entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
