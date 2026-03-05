-- 2026-03-05: Add sanita_version column to devices
BEGIN;

-- Add column if it does not already exist to avoid errors on re-run
ALTER TABLE public.devices
ADD COLUMN IF NOT EXISTS sanita_version text;

COMMIT;
