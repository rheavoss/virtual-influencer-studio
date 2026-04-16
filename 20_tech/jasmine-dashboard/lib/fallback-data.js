// Hardcoded P&L data — used when Supabase is unavailable or not yet configured.
// Update this file (and the Supabase table) when actuals come in each month.
// Revenue for Fanvue/Passes/PPV+Voice are USD-denominated, converted at ₹93.08 = $1.
// Telegram, Brand, IG Subs, FB Subs, Room11 are INR-priced/denominated.
// Costs are all INR (India pricing) — ORIGINAL BASE VALUES (×1).
// costMultiplier is applied at render time (×1 for owner, ×5 for investors).
// Higgsfield: $29/mo Phase 1+ (₹2,699); SpicyChat: ₹1,260/mo; Carrd.co: ₹147/mo; Dolphin: ₹930/mo
//
// ACQUISITION CHANNELS (two separate lines — do NOT merge):
//   ig_ads    = Instagram Reels ads (SFW lifestyle content only — safe on Meta)
//               Drives IG profile growth. Starts M3 at ₹1,500 → scales to ₹3,000.
//   taboola   = Adult ad networks: Taboola + ExoClick
//               Routes: Adult network → rheavoss.com mediator → Fanvue link ONLY.
//               NEVER drive adult network traffic directly to IG profile (instant shadowban).
//               Starts M3 at ₹1,500 → scales to ₹3,000.
//
// Fanvue growth is conservative M1–M3 (cold-start reality), then accelerates M4+.
// Telegram starts M4 (needs 3 months of audience warming before monetization).
export const FALLBACK_DATA = [
  { month:  1, label:'M1',  fanvue:   14893, room11:      0, passes:   3723, ppv_voice:   4654, telegram:      0, brand:       0, ig_subs:      0, fb_subs:      0, higgsfield: 2699, elevenlabs: 420, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads:    0, taboola:    0, research:    0, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  2, label:'M2',  fanvue:   23270, room11:   5000, passes:   6519, ppv_voice:   7447, telegram:      0, brand:       0, ig_subs:      0, fb_subs:      0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads:    0, taboola:    0, research:    0, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  3, label:'M3',  fanvue:   46540, room11:  12000, passes:  18619, ppv_voice:  18619, telegram:      0, brand:       0, ig_subs:      0, fb_subs:      0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 1500, taboola: 1500, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  4, label:'M4',  fanvue:  111696, room11:  20000, passes:  46540, ppv_voice:  46540, telegram:  24000, brand:       0, ig_subs:  24000, fb_subs:      0, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  5, label:'M5',  fanvue:  204776, room11:  32000, passes:  83772, ppv_voice:  74464, telegram:  48000, brand:       0, ig_subs:  48000, fb_subs:  18000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 3000, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  6, label:'M6',  fanvue:  316472, room11:  44000, passes: 130312, ppv_voice:  93080, telegram:  67200, brand:       0, ig_subs:  72000, fb_subs:  36000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  7, label:'M7',  fanvue:  446784, room11:  60000, passes: 186160, ppv_voice: 130312, telegram:  96600, brand:   21000, ig_subs: 102000, fb_subs:  58000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer:    0, calilio: 1303, namecheap:  92 },
  { month:  8, label:'M8',  fanvue:  577096, room11:  76000, passes: 241316, ppv_voice: 167544, telegram: 126000, brand:   42000, ig_subs: 132000, fb_subs:  86000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer: 1500, calilio: 1303, namecheap:  92 },
  { month:  9, label:'M9',  fanvue:  707408, room11:  90000, passes: 297164, ppv_voice: 204776, telegram: 155400, brand:   84000, ig_subs: 162000, fb_subs: 116000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 5000, buffer: 1500, calilio: 1303, namecheap:  92 },
  { month: 10, label:'M10', fanvue:  847028, room11: 106000, passes: 353012, ppv_voice: 251316, telegram: 184800, brand:  126000, ig_subs: 192000, fb_subs: 146000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
  { month: 11, label:'M11', fanvue:  986648, room11: 120000, passes: 427476, ppv_voice: 316472, telegram: 226800, brand:  168000, ig_subs: 222000, fb_subs: 176000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
  { month: 12, label:'M12', fanvue: 1126268, room11: 136000, passes: 502332, ppv_voice: 390936, telegram: 268800, brand:  210000, ig_subs: 252000, fb_subs: 206000, higgsfield: 2699, elevenlabs:   0, grok: 542, claude_code: 4000, spicychat: 1260, carrd: 147, dolphin: 930, ig_ads: 3000, taboola: 3000, research: 8000, buffer: 1500, calilio: 1303, namecheap:  92 },
];
