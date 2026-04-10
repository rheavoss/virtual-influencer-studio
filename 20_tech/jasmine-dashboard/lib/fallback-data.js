// Hardcoded P&L data — used when Supabase is unavailable or not yet configured.
// Update this file (and the Supabase table) when actuals come in each month.
export const FALLBACK_DATA = [
  { month:  1, label:'M1',  fanvue:   13440, passes:   3360, ppv_voice:   4200, telegram:      0, brand:       0, ig_subs:      0, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads:    0, research:    0, buffer:    0 },
  { month:  2, label:'M2',  fanvue:   50400, passes:  13440, ppv_voice:  12600, telegram:      0, brand:       0, ig_subs:      0, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads:    0, research:    0, buffer:    0 },
  { month:  3, label:'M3',  fanvue:  117600, passes:  33600, ppv_voice:  34020, telegram:      0, brand:       0, ig_subs:      0, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 3000, research: 3000, buffer:    0 },
  { month:  4, label:'M4',  fanvue:  184800, passes:  58800, ppv_voice:  58800, telegram:      0, brand:       0, ig_subs:  36000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 3000, buffer:    0 },
  { month:  5, label:'M5',  fanvue:  268800, passes:  92400, ppv_voice:  79800, telegram:      0, brand:       0, ig_subs:  60000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 3000, buffer:    0 },
  { month:  6, label:'M6',  fanvue:  352800, passes: 134400, ppv_voice: 100800, telegram:  67200, brand:       0, ig_subs:  90000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 5000, buffer:    0 },
  { month:  7, label:'M7',  fanvue:  470400, passes: 184800, ppv_voice: 134400, telegram:  96600, brand:   21000, ig_subs: 120000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 5000, buffer:    0 },
  { month:  8, label:'M8',  fanvue:  588000, passes: 235200, ppv_voice: 168000, telegram: 126000, brand:   42000, ig_subs: 150000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 5000, buffer: 1500 },
  { month:  9, label:'M9',  fanvue:  714000, passes: 285600, ppv_voice: 210000, telegram: 155400, brand:   84000, ig_subs: 180000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 5000, buffer: 1500 },
  { month: 10, label:'M10', fanvue:  840000, passes: 336000, ppv_voice: 252000, telegram: 184800, brand:  126000, ig_subs: 210000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 8000, buffer: 1500 },
  { month: 11, label:'M11', fanvue:  966000, passes: 403200, ppv_voice: 315000, telegram: 226800, brand:  168000, ig_subs: 240000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 8000, buffer: 1500 },
  { month: 12, label:'M12', fanvue: 1092000, passes: 470400, ppv_voice: 378000, telegram: 268800, brand:  210000, ig_subs: 270000, higgsfield: 756, elevenlabs: 420, grok: 542, claude_code: 4000, meta_ads: 6000, research: 8000, buffer: 1500 },
];
