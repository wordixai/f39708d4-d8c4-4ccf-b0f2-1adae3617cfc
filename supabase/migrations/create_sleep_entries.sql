/*
  # Create sleep entries table
  1. New Tables: sleep_entries (id, user_id, date, bedtime, wake_time, duration, quality, created_at)
  2. Security: Enable RLS, add policies for authenticated users to manage their own entries
*/

CREATE TABLE IF NOT EXISTS sleep_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  bedtime time NOT NULL,
  wake_time time NOT NULL,
  duration numeric(4,2) NOT NULL,
  quality integer NOT NULL CHECK (quality >= 1 AND quality <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE sleep_entries ENABLE ROW LEVEL SECURITY;

-- Users can view their own entries
CREATE POLICY "Users can view own sleep entries"
  ON sleep_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own entries
CREATE POLICY "Users can insert own sleep entries"
  ON sleep_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own entries
CREATE POLICY "Users can update own sleep entries"
  ON sleep_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own entries
CREATE POLICY "Users can delete own sleep entries"
  ON sleep_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_sleep_entries_user_date ON sleep_entries(user_id, date DESC);
