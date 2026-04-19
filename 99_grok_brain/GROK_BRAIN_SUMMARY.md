# GROK BRAIN — Jasmine Project State
**Last updated:** 2026-04-19 (Session 11)
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
| LoRA trained | ✅ DONE — jasmine_v1.safetensors (164MB), SHA256: f0d491cf6cf4e855935d06fbb74045c64f110e77e22eae1dd6add3b77ee4badd |
| Training tool | ostris/ai-toolkit |
| Base model | FLUX.1-dev (black-forest-labs) |
| Steps | 2000 |
| LoRA rank | 16 |
| Trigger word | `jasmakogirl` |
| Training config | `03_ai_models/jasmine_mako/vast_ai_training_guide.md` |

**Vast.ai training — INCIDENT (2026-04-19):**
- $2.40 spent, 7 hours wasted, 0 training steps completed
- Root cause: picked cheapest instance, no network speed filter — 24GB FLUX model never finished downloading
- Full report: `INCIDENT_REPORT_VAST_AI_2026-04-19.md` on Desktop

**Correct instance search (DO NOT DEVIATE):**
```
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' -t on-demand -o dph_total
```
- Docker image: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- Install torch FIRST: `pip3 install torch==2.6.0 torchvision==0.21.0 --index-url https://download.pytorch.org/whl/cu124`
- Then: `pip install -r requirements.txt`
- Download FLUX model explicitly BEFORE starting training. Confirm >23GB before run.
- Realistic cost: ~$0.45 total

**Vast.ai credentials:**
- Account: kriger5490@gmail.com
- Remaining credit: ~$2.16
- HuggingFace token: stored in `~/Desktop/jasmine_credentials.md` (FLUX.1-dev access granted)
- vastai CLI: `/tmp/vastai-env/bin/vastai`
- SSH key: `~/.ssh/id_ed25519`

---

## 5. PHASE 0 TASK TABLE — TOP PENDING

| ID | Task | Owner | RICE | Status |
|---|---|---|---|---|
| P0-07 | Train Jasmine FLUX.1 Dev LoRA on Vast.ai | CEO | 33.3 | ✅ COMPLETE |
| P0-08 | Subscribe Higgsfield Starter ($9/mo) | CEO | 100 | ⏳ Pending |
| P0-10 | Register domain on Namecheap | CEO | 40 | ⏳ Pending |
| P0-14 | Buy Calilio US virtual number | CEO | 100 | ⏳ Pending |
| P0-15 | Create @jasmine.mako IG account | CEO | 100 | ⏳ Pending |
| P0-18 | Build ExifTool strip + film grain pipeline | Antigravity | 22.5 | ⏳ Pending |
| P0-19 | Test OPSEC pipeline on sample image | Antigravity | 50 | ⏳ Pending |
| P0-20 | Set up Fanvue account + pricing | CEO | 33 | ⏳ Pending |
| P0-29 | Recover/recreate master prompt files | Grok/Claude | 100 | ⏳ Pending |
| P0-32 | Test Higgsfield as primary video platform | Grok/Antigravity | 120 | ⏳ Blocked (needs P0-29) |

**Completed P0:**
P0-00 ✅ P0-01 ✅ P0-02 ✅ P0-03 ✅ P0-04 ✅ P0-05 ✅ P0-06 ✅ P0-26 ✅ P0-27 ✅ P0-28 ✅

---

## 6. ACTIVE PLATFORMS & TECH STACK

| Platform | Purpose | Status |
|---|---|---|
| Kling Image 3 | Image generation | ✅ Active |
| FLUX.1-dev + ai-toolkit | LoRA training | ⏳ Pending training |
| Vast.ai | GPU rental for training | ⏳ Next use |
| Fanvue | Primary paid content platform | ⏳ Not set up |
| Instagram | Top of funnel (SFW) | ⏳ Not set up |
| Passes | Mirror platform | ⏳ Not set up |
| X/Twitter | SFW teasers | ⏳ Not set up |
| Higgsfield | AI video (cinematic) | ⏳ Pending subscription |
| Metricool | Scheduling | ⏳ Pending Phase 1 |
| Room 11 | Monetization | ⏳ Pending LoRA |
| Vercel Dashboard | P&L tracking | ✅ Live at virtual-influencer-dashboard.vercel.app |

---

## 7. KEY DECISIONS (LOCKED)

- **Single character only:** Jasmine. No other characters.
- **All revenue platforms Day 1:** Fanvue + Passes + X/Twitter simultaneously
- **Content ceiling:** Option A — Lena Paul level. No nudity. No topless. Ever.
- **Currency:** All costs in INR. USD × ₹93.08. Always verify India pricing directly.
- **Follower count:** Cross-platform total (IG + FB + YouTube + X + Pinterest + Telegram)
- **LoRA trigger word:** `jasmakogirl`

---

## 8. RALPH PROTOCOL (GOVERNANCE)

**Status:** ACTIVE as of 2026-04-19
**Version:** RALPH v16.1-jasmine (fork of master v16.1)
**Playbook file:** `00_agency/ralph_jasmine_playbook.json`
**Enforcement:** GitHub CI/CD mechanical turnstiles (`.github/workflows/ralph-gate-enforcer.yml`)
**Rolling task docs:** `00_agency/tasks/TASK-XXXX/rolling_task_document.md` — eternal, never deleted

**Gate sequence (every task must follow):**
- G0: Grok Research Gate (Google + Reddit + X + task-specific) — MANDATORY FIRST
- G1: Rolling Task Document created
- G2: Claude feasibility + counter-questions
- G3: CEO plan approval
- G4–G11: Dev → test → verify
- G12: Eternal docs + forensic PROOF_* folder committed
- G13: Antigravity browser verification

**Current active task docs:** `00_agency/tasks/TASK-P0-07/` (LoRA training — IN PROGRESS)

---

## 9. TEAM ROLES

| Role | Who | Can do |
|---|---|---|
| CEO | Human | Strategy, payments, physical accounts, final decisions |
| Claude Code | Claude (this instance) | Files, code, memory, task tracking, P&L, document management |
| Antigravity | AI advisor | Research, GFE copy, captions, DM scripts. Cannot write files or run code |
| Grok | AI advisor | Live web/X/Reddit research, market intel, van gate verification |

---

## 10. FINANCIAL SNAPSHOT

**P&L Dashboard:** https://virtual-influencer-dashboard.vercel.app
**Month 0 spend to date (approx):**
- Vast.ai training attempts: ~$2.40 (wasted — incident)
- Remaining Vast.ai credit: ~$2.16

---

## 11. MAINTENANCE RULE

Claude updates this file at the end of every session or after any major change.
Grok reads this file at the start of every important task before doing anything else.
This file is the handshake between Grok and the project state.
