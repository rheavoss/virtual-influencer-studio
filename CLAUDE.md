# Jasmine Project — Claude Code Briefing

> Auto-loaded at the start of every session. Keep this current.  
> Last updated: 2026-04-10 (Session 02)

---

## Who You Are Working With

- **CEO** — based in India, all financial decisions in INR. Non-technical on the dev side but fully owns strategy. Works with two AI advisors: Claude Code (you) and Antigravity AI.
- **Antigravity** — second AI advisor. Handles live browser research, creative strategy, GFE copywriting, captions, DM scripts. Cannot write files or run code. Messages passed to you verbatim by CEO.
- **You (Claude Code)** — file system, spec compliance, code, persistent memory, task tracking, P&L, document management. Always defer to CEO on values decisions.

---

## The Project

**Jasmine** — a 24-year-old East Asian AI-generated influencer.  
Funnel: Instagram (SFW) → Fanvue (paid GFE content)  
Goal: $2,000 MRR by Month 3 → $20,000 MRR by Month 12

**This is not a hobby project.** The CEO is running this as a real business. Treat every decision like money is on the line.

---

## Locked Decisions (Never Re-Open Without CEO Instruction)

| Decision | Status |
|---|---|
| **Content ceiling: Option A — Lena Paul level. No nudity. No topless. Ever.** | LOCKED — CEO personal values, not negotiable |
| Single character: Jasmine only. Prior names (Rhea, Riyaz) are archived/dead. | LOCKED |
| All revenue platforms live Day 1: Fanvue + Passes + X/Twitter simultaneously | LOCKED |
| Follower count = cross-platform total (Instagram + Facebook + YouTube + X + Pinterest + Telegram) | LOCKED |
| Dual sign-off: each advisor reviews the other's work before marking complete | LOCKED |
| All costs and pricing in INR. USD revenue converted at ₹84 = $1. | LOCKED |
| Annual tool plans prorated monthly (annual ÷ 12) | LOCKED |
| India pricing — always verify actual INR price, not USD × ₹84 (India is cheaper) | LOCKED |

---

## Jasmine Character Spec

- **Age:** 24 | **Ethnicity:** East Asian (Japanese-Korean blend)
- **Body:** 163cm / 52kg / 32DDD-23-36 (DDD cup — not G-cup, G-cup causes BBW drift)
- **Reference:** Lena Paul aesthetic (not explicit)
- **Style:** Fashion-forward, saree competence, gym-fit, GFE warmth
- **Character bible:** `01_characters/jasmine/jasmine_character_bible.json`
- **Generation prompts:** `01_characters/jasmine/jasmine_reference_prompts.json`

**Content ceiling (Option A):** Deep cleavage, micro bikini, sheer fabric (nipple ALWAYS covered), GFE voice notes. Instagram hard line = female nipple/areola. Everything else permitted.

---

## Current Phase: PHASE 0 — Foundation

**Nothing is live yet.** No LoRA trained. No Instagram account. No Fanvue page.

| Task | Status | Owner |
|---|---|---|
| P0-01 Generate 40 LoRA training images | ⏳ Pending | CEO (Grok + Colab) |
| P0-02 QC 40 images against character bible | ⏳ Pending | Claude |
| P0-03 Train Jasmine Flux.1 LoRA | ⏳ Pending | CEO (Civitai/RunPod) |
| P0-04 QC LoRA — 5 test images, verify face+body lock | ⏳ Pending | Claude |
| P0-05 Set up Instagram account | ⏳ Pending | CEO |
| P0-06 Set up Fanvue account + pricing | ⏳ Pending | Antigravity → CEO |
| P0-07 OPSEC pipeline (ExifTool strip + film grain) | ⏳ Pending | Claude writes script |

**Full 38-task retrograde list (all 4 phases):** `00_agency/final_strategy_planning.md`

---

## Revenue Model

| Platform | Keep Rate | Content Type | Launch |
|---|---|---|---|
| Fanvue | 85% | GFE subscription (primary) | Day 1 |
| Passes | 90% | Mirror / PPV | Day 1 |
| X/Twitter | 90% | Teasers (SFW edge) | Day 1 |
| Telegram VIP | 90% | Direct, uncensored | M6 |
| Brand Deals | 90% | Sponsored posts | M7 |
| Instagram Subs | 80% | ₹200/mo native IG sub | M4 (10k followers trigger) |

**P&L targets:** M3 = ₹1,49,100 net profit | M10 = ₹16,69,702 net profit | M12 cumulative = ~₹1.07 crore

---

## Tool Stack

| Tool | Cost | Status |
|---|---|---|
| Higgsfield | ₹756/mo ⚠️ | Verify India price |
| ElevenLabs | ₹420/mo ⚠️ | Verify India price |
| Grok (xAI) | ₹542/mo ✅ | ₹6,500/yr confirmed |
| Claude Code | ₹4,000/mo ✅ | 2 × ₹2,000 confirmed |
| Google One | ₹___/mo ⏳ | CEO to confirm annual plan ÷ 12 |
| Metricool | ₹0 | Free tier |
| Context7 MCP | ₹0 | Queued: P2-09 |
| Firecrawl MCP | ₹0 | Queued: P2-10 (M3) |

**Base fixed (confirmed):** ₹5,718/mo

---

## Active Build: Vercel P&L Dashboard

Hosting `pnl_chart.html` as a Next.js app at a live URL.

**Stack:** Next.js 14 + Supabase + Vercel (GitHub auto-deploy)  
**Directory:** `20_tech/jasmine-dashboard/`  
**Status:** All files written ✅ — awaiting credentials to deploy

**Deploy order:**
1. Supabase — create project, run `supabase/schema.sql`, copy URL + anon key
2. GitHub — push `20_tech/jasmine-dashboard/` to new private repo
3. Vercel — import from GitHub, add env vars, deploy

**Deploy guide:** `20_tech/jasmine-dashboard/DEPLOY.md`

**Credentials needed from CEO:** Supabase URL + anon key → GitHub username → Vercel (OAuth, no creds needed)

---

## Key Documents

| Document | Purpose |
|---|---|
| `00_agency/final_strategy_planning.md` | Master chessboard — all moves, task list, sign-off system |
| `00_agency/growth_and_revenue_timeline.md` | Month-by-month P&L + tool costs |
| `00_agency/pnl_chart.html` | Local P&L dashboard (open in browser) |
| `00_agency/session_logs/` | Permanent record of all CEO ↔ Claude ↔ Antigravity messages |
| `01_characters/jasmine/jasmine_character_bible.json` | Character spec (source of truth) |
| `10_research/competitor_research/muskan_kariya_case_study_2026-04-10.md` | Indian creator case study — key market validation |
| `10_research/platform_research/instagram_content_policy_and_tools_2026-04-10.md` | Instagram TOS hard lines |
| `20_tech/jasmine-dashboard/` | Vercel dashboard project |
| `memory/MEMORY.md` | Persistent memory index |

---

## Open Items (As of Session 02)

| Item | Owner |
|---|---|
| Confirm Google One annual plan cost → prorate monthly | CEO |
| Verify Higgsfield India pricing (higgsfield.ai/pricing) | Antigravity (live browser) |
| Verify ElevenLabs India pricing (elevenlabs.io/pricing) | Antigravity (live browser) |
| Antigravity Move 9: confirm Option A ceiling + Day 1 launches + sign-off system | CEO → Antigravity |
| Supabase credentials → GitHub push → Vercel deploy | CEO provides creds |
| P0-01: Generate 40 LoRA training images on Grok + Colab | CEO |

---

## How to Update This File

At the end of each session, Claude updates:
1. **Current Phase** section — mark completed tasks ✅
2. **Open Items** — remove resolved, add new ones
3. **Active Build** section — update status of whatever is being built
4. Bump the "Last updated" date at the top
