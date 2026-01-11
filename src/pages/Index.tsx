import { Moon } from 'lucide-react';
import { useSleepData } from '@/hooks/useSleepData';
import { SleepStatsCards } from '@/components/SleepStatsCards';
import { SleepLogForm } from '@/components/SleepLogForm';
import { SleepChart } from '@/components/SleepChart';
import { SleepInsights } from '@/components/SleepInsights';
import { SleepHistory } from '@/components/SleepHistory';

export default function Index() {
  const { recentEntries, stats, addEntry, removeEntry, isLoaded } = useSleepData();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft">
          <Moon className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-float">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">DreamTrack</h1>
          </div>
          <p className="text-muted-foreground">Track your sleep patterns and improve your rest</p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="px-4 mb-6">
        <div className="max-w-6xl mx-auto">
          <SleepStatsCards stats={stats} />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart & History */}
            <div className="lg:col-span-2 space-y-6">
              <SleepChart entries={recentEntries} />
              <SleepHistory entries={recentEntries} onRemove={removeEntry} />
            </div>

            {/* Right Column - Form & Insights */}
            <div className="space-y-6">
              <SleepLogForm onAdd={addEntry} />
              <SleepInsights stats={stats} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
