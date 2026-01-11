import { Moon, TrendingUp, TrendingDown, Minus, Clock, Star } from 'lucide-react';
import { SleepStats } from '@/types/sleep';
import { formatDuration, getQualityLabel } from '@/utils/sleepUtils';

interface SleepStatsCardsProps {
  stats: SleepStats;
}

export function SleepStatsCards({ stats }: SleepStatsCardsProps) {
  const qualityLabel = getQualityLabel(stats.averageQuality);

  const TrendIcon = stats.weeklyTrend === 'improving'
    ? TrendingUp
    : stats.weeklyTrend === 'declining'
      ? TrendingDown
      : Minus;

  const trendColor = stats.weeklyTrend === 'improving'
    ? 'text-[hsl(var(--sleep-excellent))]'
    : stats.weeklyTrend === 'declining'
      ? 'text-[hsl(var(--sleep-poor))]'
      : 'text-muted-foreground';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Moon className="w-5 h-5" />}
        label="Avg Sleep"
        value={formatDuration(stats.averageDuration)}
        sublabel={stats.totalEntries > 0 ? 'per night' : 'no data'}
      />
      <StatCard
        icon={<Star className="w-5 h-5" />}
        label="Quality"
        value={stats.averageQuality > 0 ? stats.averageQuality.toFixed(1) : '-'}
        sublabel={stats.totalEntries > 0 ? qualityLabel : 'no data'}
        qualityClass={`quality-${qualityLabel}`}
      />
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        label="Entries"
        value={stats.totalEntries.toString()}
        sublabel="nights tracked"
      />
      <StatCard
        icon={<TrendIcon className={`w-5 h-5 ${trendColor}`} />}
        label="Trend"
        value={stats.weeklyTrend}
        sublabel="this week"
        valueClass={trendColor}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
  qualityClass?: string;
  valueClass?: string;
}

function StatCard({ icon, label, value, sublabel, valueClass }: StatCardProps) {
  return (
    <div className="glass-card p-5 glow-effect animate-in">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        {icon}
        <span className="stat-label">{label}</span>
      </div>
      <div className={`stat-value ${valueClass || 'gradient-text'}`}>{value}</div>
      <div className="text-sm text-muted-foreground mt-1 capitalize">{sublabel}</div>
    </div>
  );
}
