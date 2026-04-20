# GROK BRAIN — Jasmine Project State
**Last updated:** 2026-04-20 (auto-updated by Stop hook)
**Maintained by:** Claude Code after every session
**Purpose:** Grok reads this file live from GitHub at the start of every task. Single source of truth.

---

## 1. PROJECT OVERVIEW

**Project:** Jasmine — AI virtual influencer
**Funnel:** Instagram (SFW) → Fanvue (paid GFE)
**Revenue goal:** $2,000 MRR by Month 3 → $20,000 MRR by Month 12
**Current phase:** PHASE 0 — Foundation. Nothing is live yet.
**CEO location:** India. All financials in INR. USD rate: ₹93.08 = $1.

---

## 2. CHARACTER SPEC (SOURCE OF TRUTH)

**File:** `01_characters/jasmine/jasmine_character_bible.json`

| Field | Value |
|---|---|
| Name | Jasmine (Instagram handle: @jasmine.mako) |
| Age | 24 |
| Ethnicity | East Asian — Japanese-Korean blend |
| Height / Weight | 163cm / 52kg |
| Measurements | 32DDD-23-36 |
| Body type | Strong hourglass / voluptuous |
| Face | Soft oval, slightly hooded almond eyes, dark brown warm hazel iris |
| Hair | Long straight black hair, high dark bun |
| Lips | Medium fullness, natural bare-pink (generation uses bold red lipstick) |
| Trigger word | `jasmakogirl` |

**Content ceiling — LOCKED. Non-negotiable. CEO personal values.**
- Allowed: deep cleavage, micro-bikini, sheer lingerie, sensual poses, wet skin, bedroom/fantasy settings
- Hard limits: NO nudity, NO topless, NO genital exposure
- Reference: Lena Paul level. Not one step beyond.

---

## 3. DATASET STATUS

| Item | Status |
|---|---|
| Total images | **38 images** ✅ |
| Location (local) | `03_ai_models/jasmine_mako/training_data/jasmine_dataset/` |
| Location (Drive) | `VirtualInfluencerStudio/03_ai_models/jasmine_mako/training_data/jasmine_dataset/` |
| Manifest | `03_ai_models/jasmine_mako/training_data/DATASET_MANIFEST.md` |
| Generation tool | Kling Image 3, series mode, 9 images/batch, 9:16, 2K |
| Reference image | Pink micro bikini (approved Jasmine reference) |

**Outfits in dataset:**
- Black gym wear: 11 images
- Pink micro bikini: 9 images
- White bodysuit: 6 images
- Red bodycon dress: 6 images
- Micro string bikini: 5 images
- Single image: 1

**Kling generation rules (hard lessons):**
- Never use "extreme" / "极端" — causes BBW drift
- Always: "face always forward or maximum 45 degrees to camera"
- Always: "body proportions matching Image1"
- Face lock method: "Keep this person's facial features exactly" in prompt text (no UI sliders in Image 3)

---

## 4. LORA TRAINING STATUS

| Item | Status |
|---|---|
| LoRA trained | ✅ COMPLETE — jasmine_v1.safetensors (164M) |
| Local path | `03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v1.safetensors` |
| SHA256 | `f0d491cf6cf4e855935d06fbb74045c64f110e77e22eae1dd6add3b77ee4badd` |
| Training tool | ostris/ai-toolkit |
| Base model | FLUX.1-dev (black-forest-labs) |
| Steps completed | 2000/2000 |
| LoRA rank | 16 |
| Trigger word | `jasmakogirl` |
| Instance destroyed | ✅ Instance 35219546 destroyed 2026-04-19 |
| Total P0-07 cost | ~$3.21 / ₹299 (incl. $2.40 incident) |
| Remaining Vast.ai credit | ~$1.35 |

**Vast.ai rules — NON-NEGOTIABLE (learned from $2.40 incident):**
```
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' -t on-demand -o dph_total
```
- Docker: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- Install torch FIRST: `pip3 install torch==2.6.0 torchvision==0.21.0 --index-url https://download.pytorch.org/whl/cu124`
- Then: `pip install -r requirements.txt`
- Confirm FLUX >23GB downloaded before training starts
- Credentials: kriger5490@gmail.com | vastai CLI: `/tmp/vastai-env/bin/vastai` | SSH: `~/.ssh/id_ed25519`

---

## 5. TASK TABLE — TOP PENDING

**Full task table (authoritative):** `00_agency/jasmine_mako_task_table.md`
**Read that file for complete list. This section = Grok's quick-reference only.**

### Phase 0 — Top Pending
| ID | Task | Owner | RICE | Status |
|---|---|---|---|---|
| P0-08 | Subscribe Higgsfield Starter ($5/mo trial) | CEO | 100 | ⏳ IN PROGRESS — Soul ID being trained |
| P0-10 | Register domain on Namecheap | CEO | 40 | ⏳ Pending |
| P0-14 | Buy Calilio US virtual number | CEO | 100 | ⏳ Pending |
| P0-15 | Create @jasmine.mako IG account | CEO | 100 | ⏳ Pending (needs P0-14) |
| P0-18 | Build ExifTool strip + film grain pipeline | Claude | 22.5 | ⏳ Pending |
| P0-20 | Set up Fanvue account + pricing | CEO | 33 | ⏳ Pending |
| P0-29 | Recover/recreate master prompt files | Grok/Claude | 100 | ⏳ Pending |
| P0-32 | Test Higgsfield as primary video platform | Grok/Claude | 120 | ⏳ Blocked (needs P0-08 + P0-29) |

**Completed P0:**
P0-00 ✅ P0-01 ✅ P0-02 ✅ P0-03 ✅ P0-04 ✅ P0-05 ✅ P0-06 ✅ P0-07 ✅ P0-26 ✅ P0-27 ✅ P0-28 ✅

### Phase 1 — Key Tasks (NEW — added 2026-04-19)
| ID | Task | Owner | Doc |
|---|---|---|---|
| P1-48 | Programmatic SEO Pages (Cursor + Claude + Firecrawl) | Claude/CEO | `09_marketing/seo/programmatic_seo_strategy.md` |
| P1-49 | GeoDirectory SEO Flywheel (WordPress/Webflow) | Claude/CEO | `09_marketing/seo/geo_directory_seo_hack.md` |
| P1-50 | Threads Scaling SOP (7-day warm-up → 20–100 subs/day) | CEO/Antigravity | `09_marketing/threads/threads_scaling_sop.md` |
| P1-51 | AI Personas Authority Network (10–50 endorser accounts) | Antigravity/Claude | `09_marketing/growth/ai_personas_authority_strategy.md` |
| P1-52 | Hybrid Faceless RPV YouTube Channels | Antigravity/CEO | `09_marketing/youtube/hybrid_youtube_rpv_strategy.md` |
| P1-53 | Cance 2 + Arc Ads Cloning Pipeline | Antigravity/Claude | `04_content_pipeline/cance2_arc_ads_cloning_pipeline.md` |
| P1-54 | Hyperframes HTML-First Video Pipeline | Claude/Antigravity | `04_content_pipeline/hyperframes_video_pipeline.md` |
| P1-55 | Flow 3D Motion Graphics overlay pipeline | Antigravity | `04_content_pipeline/flow_3d_motion_graphics.md` |
| P1-56 | 7-Day Instagram Warm-Up SOP | CEO | `09_marketing/instagram/ig_warmup_sop.md` |
| P1-57 | UGC Ad Testing Pipeline (Cance 2 API + Claude) | Antigravity/Claude | `04_content_pipeline/ugc_ad_testing_pipeline.md` |
| P1-58 | 6-Step Editing SOP + brand kit lock | Antigravity/CEO | `04_content_pipeline/editing_system_sop.md` |

---

## 6. ACTIVE PLATFORMS & TECH STACK

| Platform | Purpose | Status |
|---|---|---|
| Kling Image 3 | Image generation | ✅ Active |
| FLUX.1-dev + jasmine_v1 LoRA | AI image generation (character-locked) | ✅ LoRA ready |
| Vast.ai | GPU rental for future training | ✅ CLI ready, $1.35 credit |
| Fanvue | Primary paid content platform | ⏳ Not set up |
| Instagram | Top of funnel (SFW) | ⏳ Not set up |
| Passes | Mirror platform | ⏳ Not set up |
| X/Twitter | SFW teasers | ⏳ Not set up |
| Higgsfield | AI video (cinematic) | ⏳ Pending P0-08 |
| Metricool | Scheduling | ⏳ Pending Phase 1 |
| Room 11 | Monetization | ⏳ Pending |
| Vercel Dashboard | P&L tracking | ✅ Live at virtual-influencer-dashboard.vercel.app |

---

## 7. KEY DECISIONS (LOCKED)

- **Multi-character scaling:** Jasmine = Char 1. Desi = Char 2 (M2 warmup). Plan: 3 chars M4, 4 chars M5, 5 chars M7, 6 chars M9, 7 chars M11, 8 chars M12. Chars 3–N run at 50% efficiency vs chars 1–2.
- **USD-first strategy:** Fanvue + Passes + PPV target Tier-1 (US/UK/EU) from Day 1. IG Subs + FB Subs + Brand Deals are INR-additive from M4 (10k follower gate). Both markets run in parallel.
- **All revenue platforms Day 1:** Fanvue + Passes + X/Twitter simultaneously. Room11 = ₹0 until M4 (needs subscriber base).
- **Content ceiling:** Option A — Lena Paul level. No nudity. No topless. Ever. Non-negotiable.
- **Currency:** All costs in INR. USD × ₹93.08. Always verify India pricing directly.
- **Follower count:** Cross-platform total (IG + FB + YouTube + X + Pinterest + Telegram)
- **LoRA trigger word:** `jasmakogirl`
- **GitHub account for this project:** `rheavoss` only. No other accounts.
- **ElevenLabs:** DEPRECATED 2026-04-19. Replaced by VoiceBox (github.com/jamiepine/voicebox) — free, local Mac DMG, zero-shot voice cloning. Cost = ₹0 all months.

---

## 8. RALPH PROTOCOL (GOVERNANCE)

**Status:** MECHANICALLY ACTIVE as of 2026-04-19 (Session 11)
**Version:** RALPH v16.1-jasmine
**Playbook:** `00_agency/ralph_jasmine_playbook.json`
**Full system report:** `Desktop/RALPH_SYSTEM_REPORT_2026-04-19.md`

### How it works
```
Auto-commit hook → pushes to [dev branch]
                        ↓
           GitHub Action auto-creates PR dev→main
                        ↓
           ralph-gate-enforcer CI checks GATE_*.md files
                        ↓
           PASS → auto-merges to main (CEO does nothing)
           FAIL → PR blocked until gate files added
```

### Branch protection
- Ruleset `RALPH-protect-main` (ID: 15254081) active on `main`
- Direct push to `main` **mechanically blocked** — tested and confirmed
- Requires PR + `enforce-ralph` CI pass before any merge

### Gate files (per task, in `00_agency/tasks/TASK-XXXX/`)
| File | Owner | Proves |
|---|---|---|
| `GATE_G0_COMPLETE.md` | Grok | Live research done |
| `GATE_G2_COMPLETE.md` | Claude | Feasibility checked |
| `GATE_G3_COMPLETE.md` | CEO | Plan approved |
| `PROOF_*/` folder | Claude | Evidence, costs, SHA256 |

### Grok's role in RALPH
1. Read this file from GitHub before every task
2. Do live research (Google + `site:reddit.com` + X + task-specific)
3. Write `GATE_G0_COMPLETE.md` content → Claude commits it
4. Research output goes into rolling task document under `## G0`

### Workflows in repo
- `.github/workflows/ralph-gate-enforcer.yml` — CI gate checker (v2, real checks)
- `.github/workflows/auto-merge-dev.yml` — auto PR + auto-merge on CI pass
  - Triggers: `push` to dev, `check_run` complete, `workflow_run` complete, schedule every 15min, `workflow_dispatch`

### Known gap
Auto-merge requires a PR to exist. PRs can't be created via CLI due to a known token/collaborator issue with the `gh` CLI on this machine. The `auto-merge-dev.yml` creates them automatically on push to dev — no manual action needed after initial bootstrap.

---

## 9. TEAM ROLES

| Role | Who | Can do |
|---|---|---|
| CEO | Human | Strategy, payments, physical accounts, final decisions |
| Claude Code | Claude (this instance) | Files, code, memory, task tracking, P&L, document management, commits GATE files |
| Antigravity | AI advisor | Research, GFE copy, captions, DM scripts. Cannot write files or run code |
| Grok | AI advisor | Live web/X/Reddit research, market intel, G0 Research Gate for every task |

### Grok G0 Research Gate — MANDATORY CHECKLIST (effective immediately)
Every G0 must include and verify the following items. No shortcuts allowed.

- [ ] Read live GROK_BRAIN_SUMMARY.md from raw GitHub URL
- [ ] Live search: Google + site:reddit.com + X/Twitter
- [ ] **Official blogs & changelog** (latest blog posts and release notes)
- [ ] **Official API / documentation / character / feature pages** (exact relevant product pages, not just homepage/pricing)
- [ ] Task-specific sources (Vast.ai docs, GitHub repos, etc.)
- [ ] Document all sources + findings verbatim in GATE_G0_COMPLETE.md and rolling_task_document.md
- [ ] Explicitly state at the end: "All official blogs, API/docs, and changelog checked — no shortcuts taken"

Violation of this checklist = immediate RALPH violation logged.

---

## 10. FINANCIAL SNAPSHOT

**P&L Dashboard:** https://virtual-influencer-dashboard.vercel.app ✅ LIVE — data from Supabase (updated 2026-04-20)

**Month 0 spend to date:**
| Item | Cost |
|---|---|
| Vast.ai P0-07 failed attempts | ~$2.40 / ₹223 |
| Vast.ai P0-07 successful run | ~$0.81 / ₹75 |
| **Total spent** | **~$3.21 / ₹299** |
| Vast.ai remaining credit | ~$1.35 |

**Real monthly burn (verified 2026-04-20):**
| Tool | Cost |
|---|---|
| Higgsfield | ₹2,699 |
| Grok (X Premium) | ₹542 |
| Claude Code (×2 seats) | ₹4,000 |
| Calilio (US number) | ₹1,303 |
| SpicyChat AI | ₹1,260 |
| Carrd.co | ₹147 |
| Dolphin{anty} | ₹930 |
| Namecheap (domain) | ₹92 |
| VoiceBox | ₹0 (free, local) |
| **Fixed base** | **₹10,973/month** |
| + Variable (IG Ads, Taboola, Research) | ₹0 M1–M2, ₹6,000 M3, ₹9,000+ M4+ |

**Corrected Year-1 projections (LOCKED 2026-04-20 — Investor Plan v2):**
| Metric | Value |
|---|---|
| Year-1 pre-tax net | ₹2.25 Cr |
| Year-1 post-tax (~29% effective) | ₹1.60 Cr |
| Break-even | M4 |
| M12 monthly net profit | ~₹50L |

**Character scaling schedule:**
M1=1 char · M2=2 chars · M3=2 · M4=3 · M5=4 · M6=4 · M7=5 · M8=5 · M9=6 · M10=6 · M11=7 · M12=8
Chars 3–N at 50% efficiency vs chars 1–2.

**Platform keep rates (after platform commission):**
Fanvue 85% | Room11 60% | Passes 90% | PPV+Voice 90% | Telegram 90% | Brand Deals 90% | IG Subs 80% | FB Subs 70%

**Native platform monetization gates:**
- IG Subscriptions (₹300/mo): unlocks M4 at 10k followers
- FB Subscriptions: unlocks M5
- Brand Deals: micro M4 (₹20K/post) → macro M12 (₹5L/post)
- Room11 DM monetization: operational from M4 (needs subscriber base)

**Key financial doc:** `00_agency/growth_and_revenue_timeline.md` — authoritative M1–M12 P&L table

---

## 11. REPO STRUCTURE (KEY PATHS)

```
rheavoss/virtual-influencer-studio (GitHub)
├── main branch — protected, RALPH enforced
├── dev branch  — auto-commits land here
│
├── 00_agency/
│   ├── ralph_jasmine_playbook.json
│   ├── jasmine_mako_task_table.md
│   └── tasks/
│       ├── TEMPLATE/rolling_task_document.md
│       └── TASK-P0-07/  ← complete, all gates closed
│           ├── rolling_task_document.md
│           ├── GATE_G0_COMPLETE.md
│           ├── GATE_G2_COMPLETE.md
│           ├── GATE_G3_COMPLETE.md
│           └── PROOF_training/training_receipt.md
├── 01_characters/jasmine/jasmine_character_bible.json
├── 03_ai_models/jasmine_mako/
│   ├── lora_checkpoints/jasmine_v1.safetensors  ← 164MB, ready to use
│   └── vast_ai_training_guide.md
├── 99_grok_brain/GROK_BRAIN_SUMMARY.md  ← this file
└── .github/workflows/
    ├── ralph-gate-enforcer.yml
    └── auto-merge-dev.yml
```

---

## 12. MAINTENANCE RULE

Claude updates this file at the end of every session or after any major change.
Grok reads this file at the start of every important task before doing anything else.
This file is the handshake between Grok and the project state.

---

## 14. SESSION 14 CHANGES (2026-04-20)

- **Auto-commit burn rate fixed:** Found source — `~/.studio-sync/watcher.sh` + `sync-project.sh` (LaunchAgent `com.rheavoss.studiosync`). `git add .` was staging all files including dashboard → auto-commits → Vercel deploys. Fix: `git reset HEAD 20_tech/jasmine-dashboard/` added after `git add .` in sync-project.sh. Dashboard only deploys on explicit push now.
- **RALPH failing on brain-update.log commits:** Systemic issue — auto-commits of `.claude/hooks/brain-update.log` don't include GROK_BRAIN_SUMMARY.md → RALPH blocks every merge. Fix: update brain summary explicitly (this commit).
- **Karpathy Protocol enforced:** Research-first discipline enforced — read all files before proposing fixes. Senior programmer pros/cons analysis required before any technical proposal.
- **commandForIgnoringBuildStep:** Confirmed working but Vercel token expired. PLDashboard.js touched in this commit to force rebuild with new subtitle + character factory table.

## 13. SESSION 13 CHANGES (2026-04-20)

- **Investor Plan v2 LOCKED:** All 12 months recalculated. Room11 ₹0 for M1–M3. ElevenLabs ₹0 all months. Multi-char scaling verified. Year-1 pre-tax ₹2.25Cr | post-tax ₹1.60Cr.
- **Supabase schema fixed:** 7 missing columns added (room11, fb_subs, spicychat, carrd, dolphin, ig_ads, taboola). Dashboard now loads live from Supabase correctly.
- **Dashboard code fixes:** ElevenLabs column removed, CHARS column added (shows active char count per month), dual-market section updated (was "Tier-1 only" — wrong), brand deal footnote [6] added, cost label mismatch fixed (Taboola was missing, caused columns 5–12 to show wrong labels).
- **Token savings:** PreToolUse hooks removed from `~/.claude/settings.json`. CLAUDE.md trimmed 50%. Now uses only UserPromptSubmit G.Brain hook (once per message, not per tool call).
- **Vercel deploy quota burned:** Auto-commit hook + RALPH auto-merge + GitHub integration = 100 deploys/day limit hit. Next reset ~02:01 UTC. Dashboard data correct via Supabase ISR; code changes visible after next deploy.
- **Team structure:** Operations Lead (₹35–45K) + Brand Outreach (₹30–35K + fixed quarterly bonus) planned for M4 hire when revenue hits ₹2L/month.

## 14. FRAMEWORK INTAKE RULE (NON-NEGOTIABLE)

**Every strategy, framework, or tool Grok researches or recommends is INCOMPLETE until:**
1. It has a task ID in `00_agency/jasmine_mako_task_table.md`
2. It has a strategy/SOP document in the correct folder
3. This brain file references the task ID and doc path

**Correct folder by type:**
| Type | Folder |
|---|---|
| SEO strategy | `09_marketing/seo/` |
| Social media SOP | `09_marketing/[platform]/` |
| Growth strategy | `09_marketing/growth/` |
| Content production pipeline | `04_content_pipeline/` |
| Automation / tech | `11_automation/` |
| Revenue strategy | `07_monetization/` |
| Research / market intel | `10_research/` |

**Grok's session close checklist — before ending ANY session:**
- [ ] Every framework discussed → has a task ID
- [ ] Every task ID → has a doc file path
- [ ] Every doc file path → file actually exists (Claude confirms)
- [ ] This brain file updated with new task IDs

**Violation:** If Grok delivers a framework into `master_frameworks_compilation.md` without simultaneously providing the task ID and doc path → that is a documentation gap violation. Claude must flag it immediately and create the missing items before the session closes.
