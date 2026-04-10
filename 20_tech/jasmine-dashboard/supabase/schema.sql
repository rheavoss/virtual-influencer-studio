-- Jasmine P&L Dashboard — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

CREATE TABLE IF NOT EXISTS jasmine_pnl (
  month        INTEGER PRIMARY KEY CHECK (month BETWEEN 1 AND 12),
  label        TEXT    NOT NULL,
  -- Revenue streams (INR gross)
  fanvue       INTEGER NOT NULL DEFAULT 0,
  passes       INTEGER NOT NULL DEFAULT 0,
  ppv_voice    INTEGER NOT NULL DEFAULT 0,
  telegram     INTEGER NOT NULL DEFAULT 0,
  brand        INTEGER NOT NULL DEFAULT 0,
  ig_subs      INTEGER NOT NULL DEFAULT 0,
  -- Cost line items (INR)
  higgsfield   INTEGER NOT NULL DEFAULT 756,
  elevenlabs   INTEGER NOT NULL DEFAULT 420,
  grok         INTEGER NOT NULL DEFAULT 542,
  claude_code  INTEGER NOT NULL DEFAULT 4000,
  meta_ads     INTEGER NOT NULL DEFAULT 0,
  research     INTEGER NOT NULL DEFAULT 0,
  buffer       INTEGER NOT NULL DEFAULT 0,
  -- Timestamps
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (public read, no write from client)
ALTER TABLE jasmine_pnl ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON jasmine_pnl FOR SELECT USING (true);

-- Seed projected data (all values in INR)
INSERT INTO jasmine_pnl (month, label, fanvue, passes, ppv_voice, telegram, brand, ig_subs, higgsfield, elevenlabs, grok, claude_code, meta_ads, research, buffer) VALUES
(  1, 'M1',    13440,   3360,   4200,      0,      0,      0,  756, 420, 542, 4000,    0,    0,    0),
(  2, 'M2',    50400,  13440,  12600,      0,      0,      0,  756, 420, 542, 4000,    0,    0,    0),
(  3, 'M3',   117600,  33600,  34020,      0,      0,      0,  756, 420, 542, 4000, 3000, 3000,    0),
(  4, 'M4',   184800,  58800,  58800,      0,      0,  36000,  756, 420, 542, 4000, 6000, 3000,    0),
(  5, 'M5',   268800,  92400,  79800,      0,      0,  60000,  756, 420, 542, 4000, 6000, 3000,    0),
(  6, 'M6',   352800, 134400, 100800,  67200,      0,  90000,  756, 420, 542, 4000, 6000, 5000,    0),
(  7, 'M7',   470400, 184800, 134400,  96600,  21000, 120000,  756, 420, 542, 4000, 6000, 5000,    0),
(  8, 'M8',   588000, 235200, 168000, 126000,  42000, 150000,  756, 420, 542, 4000, 6000, 5000, 1500),
(  9, 'M9',   714000, 285600, 210000, 155400,  84000, 180000,  756, 420, 542, 4000, 6000, 5000, 1500),
( 10, 'M10',  840000, 336000, 252000, 184800, 126000, 210000,  756, 420, 542, 4000, 6000, 8000, 1500),
( 11, 'M11',  966000, 403200, 315000, 226800, 168000, 240000,  756, 420, 542, 4000, 6000, 8000, 1500),
( 12, 'M12', 1092000, 470400, 378000, 268800, 210000, 270000,  756, 420, 542, 4000, 6000, 8000, 1500)
ON CONFLICT (month) DO NOTHING;
