import { useState } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateDuration } from '@/utils/sleepUtils';
import { SleepEntry } from '@/types/sleep';

interface SleepLogFormProps {
  onAdd: (entry: Omit<SleepEntry, 'id'>) => void;
}

export function SleepLogForm({ onAdd }: SleepLogFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [bedtime, setBedtime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('06:30');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = calculateDuration(bedtime, wakeTime);
    onAdd({ date, bedtime, wakeTime, duration, quality });
    // Reset form
    setDate(today);
    setBedtime('22:30');
    setWakeTime('06:30');
    setQuality(4);
  };

  const duration = calculateDuration(bedtime, wakeTime);
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 glow-effect animate-in">
      <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Log Sleep
      </h2>

      <div className="space-y-5">
        <div>
          <label className="stat-label block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
            className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="stat-label block mb-2 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5" /> Bedtime
            </label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="stat-label block mb-2 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" /> Wake Up
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="text-center py-3 bg-muted/30 rounded-lg">
          <span className="text-muted-foreground text-sm">Duration: </span>
          <span className="gradient-text font-semibold">{hours}h {minutes}m</span>
        </div>

        <div>
          <label className="stat-label block mb-3">Sleep Quality</label>
          <div className="flex justify-between gap-2">
            {([1, 2, 3, 4, 5] as const).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                className={`flex-1 py-2.5 rounded-lg border transition-all font-medium ${
                  quality === q
                    ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                    : 'bg-muted/30 border-border hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground px-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-5">
          <Plus className="w-4 h-4 mr-2" />
          Log Sleep Entry
        </Button>
      </div>
    </form>
  );
}
