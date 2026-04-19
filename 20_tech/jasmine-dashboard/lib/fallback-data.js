// Hardcoded P&L data — used when Supabase is unavailable or not yet configured.
// Update this file (and the Supabase table) when actuals come in each month.
// Revenue for Fanvue/Passes/PPV+Voice/Room11/Telegram are USD-denominated, converted at ₹93.08 = $1.
// IG Subs, FB Subs, Brand Deals are INR-priced/denominated.
// Costs are all INR (India pricing) — ORIGINAL BASE VALUES (×1).
// costMultiplier is applied at render time (×1 for owner, ×5 for investors).
//
// LAST UPDATED: 2026-04-20 — Corrected Investor Plan v2
// Changes vs previous version:
//   - Room 11 set to ₹0 for M1–M3 (requires live subscriber base — not operational until M4)
//   - ElevenLabs set to ₹0 all months (deprecated 2026-04-19 — replaced by VoiceBox free)
//   - M1–M12 revenue streams recalculated to match corrected multi-character projections:
//     · M1–M3: USD-first single/dual char ramp (Fanvue + Passes + PPV primary)
//     · M4+: IG Subscriptions layer on after 10k follower gate + multi-char brand deals
//     · M7–M12: 5–8 character factory scale (chars 3–N at 50% efficiency vs chars 1–2)
//   - Year-1 pre-tax net: ₹2.25 Cr | Post-tax (~29% effective): ₹1.60 Cr
//
// ACQUISITION CHANNELS (two separate lines — do NOT merge):
//   ig_ads    = Instagram Reels ads (SFW lifestyle content only — safe on Meta)
//               Drives IG profile growth. Starts M3 at ₹1,500 → scales to ₹3,000.
//   taboola   = Adult ad networks: Taboola + ExoClick
//               Routes: Adult network → mediator → Fanvue link ONLY.
//               NEVER drive adult network traffic directly to IG profile (instant shadowban).
//               Starts M3 at ₹1,500 → scales to ₹3,000.
//
// Platform keep rates (applied in PLDashboard.js KEEP array):
//   Fanvue 85% | Room 11 60% | Passes 90% | PPV+Voice 90% | Telegram 90%
//   Brand Deals 90% | IG Subs 80% | FB Subs 70%
export const FALLBACK_DATA = [
  // M1 — 1 char (Jasmine). USD-first. Room11 ₹0 (no subscriber base yet).
  { month:  1, label:'M1',  fanvue:   16306, room11:       0, passes:    4076, ppv_voice:    5095, telegram:       0, brand:        0, ig_subs:       0, fb_subs:       0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads:    0, taboola:    0, research:    0, buffer:    0, calilio: 1303, namecheap:  92 },
  // M2 — 2 chars (Jasmine + Desi warmup). Desi ₹0 revenue. Room11 ₹0 (still building).
  { month:  2, label:'M2',  fanvue:   54219, room11:       0, passes:   15189, ppv_voice:   17350, telegram:       0, brand:        0, ig_subs:       0, fb_subs:       0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads:    0, taboola:    0, research:    0, buffer:    0, calilio: 1303, namecheap:  92 },
  // M3 — 2 chars. Video pipeline live (5× reach). Room11 ₹0 (sub base too small). IG subs still locked (<10k).
  { month:  3, label:'M3',  fanvue:  140178, room11:       0, passes:   56081, ppv_voice:   56081, telegram:       0, brand:        0, ig_subs:       0, fb_subs:       0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 1500, taboola: 1500, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  // M4 ★ — 3 chars. IG Subs unlock (10k followers). Brand deals begin (micro). Room11 operational.
  { month:  4, label:'M4',  fanvue:  194686, room11:   34860, passes:   81128, ppv_voice:   81128, telegram:   41832, brand:    20667, ig_subs:   62500, fb_subs:       0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  // M5 — 3–4 chars. Compound Reels growth. Brand deals scaling.
  { month:  5, label:'M5',  fanvue:  245731, room11:   38400, passes:  100526, ppv_voice:   89357, telegram:   57600, brand:    51667, ig_subs:  150000, fb_subs:   21600, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  // M6 — 4 chars. Telegram VIP live. IG Subs both chars scaling.
  { month:  6, label:'M6',  fanvue:  310966, room11:   43234, passes:  128045, ppv_voice:   91460, telegram:   66031, brand:   103333, ig_subs:  312500, fb_subs:   35374, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer:    0, calilio: 1303, namecheap:  92 },
  // M7 — 5 chars. Chars 3–5 at 50% efficiency vs chars 1–2. Brand deals macro-entry.
  { month:  7, label:'M7',  fanvue:  659176, room11:   88524, passes:  274747, ppv_voice:  192266, telegram:  142523, brand:   166667, ig_subs:  375000, fb_subs:   85573, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer:    0, calilio: 1303, namecheap:  92 },
  // M8 — 5 chars. Full automation stable. Chars 1–2 at peak USD revenue.
  { month:  8, label:'M8',  fanvue:  976361, room11:  128584, passes:  408066, ppv_voice:  283454, telegram:  213179, brand:   277778, ig_subs:  562500, fb_subs:  145503, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer: 1500, calilio: 1303, namecheap:  92 },
  // M9 — 6 chars. Char 6 warmup. Brand deals approaching macro rates (30k–50k IG).
  { month:  9, label:'M9',  fanvue: 1184407, room11:  150678, passes:  497375, ppv_voice:  342828, telegram:  260191, brand:   388889, ig_subs:  687500, fb_subs:  194207, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer: 1500, calilio: 1303, namecheap:  92 },
  // M10 ★ ₹1Cr cumulative — 6 chars. Brand deals macro. IG Subs both chars at scale.
  { month: 10, label:'M10', fanvue: 1287742, room11:  161152, passes:  536681, ppv_voice:  382168, telegram:  281031, brand:   826667, ig_subs:  750000, fb_subs:  221964, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
  // M11 — 7 chars. Brand deals at macro rates (50k–90k IG, ₹1L–₹5L/post).
  { month: 11, label:'M11', fanvue: 1410555, room11:  171516, passes:  611202, ppv_voice:  452269, telegram:  324204, brand:  1000000, ig_subs:  937500, fb_subs:  251557, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
  // M12 — 7–8 chars. Year-1 close. Pre-tax ₹2.25Cr | Post-tax ~₹1.60Cr.
  { month: 12, label:'M12', fanvue: 1529244, room11:  184647, passes:  682115, ppv_voice:  530889, telegram:  364951, brand:  1222222, ig_subs: 1125000, fb_subs:  279687, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
];
