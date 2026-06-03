-- ============================================================
-- MIGRATION: ADD MAKKAH/MADINAH HOTELS AND EXCLUSIONS
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Add new columns for dual-hotel setup
ALTER TABLE packages ADD COLUMN IF NOT EXISTS hotel_makkah TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS distance_makkah TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS hotel_madinah TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS distance_madinah TEXT;

-- Add new column for exclusions
ALTER TABLE packages ADD COLUMN IF NOT EXISTS not_includes TEXT[];
