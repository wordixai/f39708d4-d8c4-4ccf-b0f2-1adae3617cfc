import { Lightbulb, BedDouble, Clock, Smartphone, Coffee } from 'lucide-react';
import { SleepStats } from '@/types/sleep';

interface SleepInsightsProps {
  stats: SleepStats;
  avgBedtime?: string;
}

interface Insight {
  icon: React.ReactNode;
  title: string;
  tip: string;
}

export function SleepInsights({ stats }: SleepInsightsProps) {
  const insights: Insight[] = [];

  // Duration-based insights
  if (stats.averageDuration > 0 && stats.averageDuration < 7) {
    insights.push({
      icon: <Clock className="w-5 h-5" />,
      title: 'Sleep Duration',
      tip: 'Aim for 7-9 hours of sleep. Your average is below optimal.',
    });
  } else if (stats.averageDuration > 9) {
    insights.push({
      icon: <Clock className="w-5 h-5" />,
      title: 'Oversleeping',
      tip: 'Sleeping more than 9 hours may affect energy levels. Try a consistent 7-8 hours.',
    });
  }

  // Quality-based insights
  if (stats.averageQuality > 0 && stats.averageQuality < 3) {
    insights.push({
      icon: <BedDouble className="w-5 h-5" />,
      title: 'Improve Environment',
      tip: 'Keep your bedroom cool (65-68°F), dark, and quiet for better sleep quality.',
    });
  }

  // Trend-based insights
  if (stats.weeklyTrend === 'declining') {
    insights.push({
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Screen Time',
      tip: 'Limit screen exposure 1 hour before bed. Blue light affects melatonin production.',
    });
  }

  // General tips if not enough data
  if (insights.length === 0) {
    insights.push(
      {
        icon: <Coffee className="w-5 h-5" />,
        title: 'Caffeine Timing',
        tip: 'Avoid caffeine after 2 PM. It can stay in your system for 8+ hours.',
      },
      {
        icon: <BedDouble className="w-5 h-5" />,
        title: 'Consistent Schedule',
        tip: 'Go to bed and wake up at the same time daily, even on weekends.',
      }
    );
  }

  return (
    <div className="glass-card p-6 glow-effect animate-in">
      <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-accent" />
        Sleep Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-muted/30 border border-border/30 animate-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 text-primary mb-2">
              {insight.icon}
              <span className="font-medium">{insight.title}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
