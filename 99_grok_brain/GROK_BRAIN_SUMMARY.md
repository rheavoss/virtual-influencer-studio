# GROK BRAIN — Sonia GFE Project
**Last updated:** 2026-04-30
**Maintained by:** Claude Code after every session
**Purpose:** Grok reads this file live from GitHub at the start of every task. Single source of truth.

---

## 1. PROJECT OVERVIEW

**Project:** Sonia — Indian/South Asian AI virtual influencer (GFE)
**Funnel:** Instagram (SFW) → Fanvue (paid GFE)
**Revenue goal:** ₹40,000 MRR by Month 3 → ₹20L+ MRR by Month 12
**Current phase:** PHASE 0 — Foundation. Nothing is live yet.
**CEO location:** India. All financials in INR. USD rate: ₹93.08 = $1.
**Target to reverse-engineer:** @zaraso_phia (517K followers, 6 months old, 245 posts, perfect consistency)

---

## 2. CHARACTER SPEC (SOURCE OF TRUTH)

**Trigger word:** `soniagfe`
**Character bible:** `01_characters/sonia/sonia_character_bible.json` *(pending creation)*

| Field | Value |
|---|---|
| Name | Sonia |
| Age | 22 |
| Ethnicity | Indian / South Asian |
| Skin | Porcelain fair white skin with warm undertones — highly realistic texture, visible pores, subtle imperfections, natural sheen and soft flush |
| Body | Ultra-voluptuous hourglass — large full natural breasts with realistic soft tissue physics, natural weight, gravity, deep cleavage with visible compression folds and underboob crease, narrow cinched waist, soft flat stomach with subtle natural folds when posed, wide hips, thick juicy thighs with realistic skin creases and compression, long toned legs |
| Hair | Long thick dark brown with subtle caramel highlights, past waist in soft loose waves with face-framing strands |
| Eyes | Large captivating almond-shaped hazel-brown, long thick black eyelashes, perfectly arched thick eyebrows |
| Face | Symmetrical, straight delicate nose, high cheekbones, full plump glossy lips, soft seductive confident expression with direct gaze |
| Beauty marks | NONE — explicitly prohibited |
| Trigger word | `soniagfe` |

**Content ceiling — LOCKED. Non-negotiable. CEO personal values.**
- Allowed: deep cleavage, micro-bikini, sheer lingerie, sensual poses, wet skin, bedroom/fantasy settings
- Hard limits: NO nudity, NO topless, NO genital exposure
- Reference: Lena Paul level. Not one step beyond.

**Master Positive Prompt (use AFTER LoRA trained):**
```
soniagfe, exact same woman as in reference photo, a breathtakingly beautiful 22-year-old Indian/South Asian woman with an ultra-voluptuous hourglass figure, large full natural breasts with realistic soft tissue physics, natural weight, gravity, deep cleavage showing visible compression folds and underboob crease, narrow cinched waist, soft flat stomach with subtle natural folds when posed, wide hips, thick juicy thighs with realistic skin creases and compression, long toned legs, porcelain fair white skin with warm undertones, highly realistic texture including visible pores, subtle natural imperfections and freckles, natural sheen and soft flush, long thick voluminous dark brown hair with subtle caramel highlights reaching past her waist in soft loose waves with face-framing strands, incredibly symmetrical and feminine face, large captivating almond-shaped hazel-brown eyes with long thick black eyelashes and perfectly arched thick eyebrows, straight delicate nose, high cheekbones, full plump glossy lips, soft seductive confident expression with direct gaze, glamorous yet natural makeup, masterpiece, best quality, ultra-detailed skin texture and pores, realistic skin folds and creases, natural body physics, d351 l1ght, 8k RAW photo, photorealistic, highly detailed, sharp focus, cinematic lighting, [OUTFIT AND SETTING]
```

**Negative Prompt:**
```
blurry, low quality, deformed, mutated, extra limbs, bad anatomy, malformed feet, fused toes, extra toes, missing fingers, deformed hands, ugly, distorted proportions, cartoon, 3d render, painting, text, watermark, plastic skin, waxy skin, barbie skin, airbrushed skin, overly smooth skin, slim athletic body, flat chest, narrow hips, small breasts, extremely large breasts, dark olive skin, tanned skin, grid artifacts, bun, updo, beauty mark, mole
```

---

## 3. PIPELINE (CIVITAI-VERIFIED APRIL 2026)

**Image base:** Flux.2 Klein 9B — current meta for consistent character work
**Consistency method:** Custom Sonia character LoRA + PuLID on top
**Supporting LoRA:** DeZi Coffee (ZIT base) — trigger `d351 l1ght` — fair/porcelain skin with warm undertones (758 downloads, top Indian/South Asian LoRA on Civitai April 2026)
**Video:** Kling AI 3.0 Image-to-Video (Subject Reference / Character Library) — community consensus winner

**Full generation stack:**
1. Trained Sonia LoRA (strength 0.8–1.0) on Flux.2 Klein 9B
2. PuLID (strength 0.95–1.0, start_timestep 4, end_timestep 8)
3. DeZi Coffee LoRA (`d351 l1ght`)
4. Flux.2 Klein 9B base

**Why this pipeline:** zaraso_phia (our target) runs 245+ posts with perfect face+body lock. Pure PuLID API cannot deliver this at volume. This is a trained character LoRA + PuLID combo — confirmed by creators running 200+ post accounts.

---

## 4. DATASET STATUS

| Item | Status |
|---|---|
| Face reference | ✅ LOCKED — `01_characters/sonia/face_reference/sonia_face_reference_v1.png` |
| Pose reference images | ✅ 700 zaraso_phia images in `~/Downloads/target/` |
| Training images | ⏳ NOT STARTED — ready to generate now |
| Dataset target | 20–25 images (zaraso_phia-style body compositions + Sonia face via PuLID) |
| Generation tool | Flux.2 Klein 9B + PuLID (using `sonia_face_reference_v1.png`) |

**Note:** zaraso_phia's 700 images = pose/composition reference ONLY. Not training data. Sonia needs her own unique face.

**Previous character datasets (ABANDONED):**
- Jasmine dataset (40 images, Kling): ARCHIVED — character abandoned 2026-04-27
- Sara dataset (25 images, fal.ai): DELETED — plastic skin rejection 2026-04-30
- Sara PuLID test (4 images, RunPod): REJECTED — body too slim

---

## 5. LORA TRAINING STATUS

| Item | Status |
|---|---|
| Sonia LoRA | ⏳ READY TO START — face reference locked, dataset generation next |
| Training tool | ostris/ai-toolkit |
| Base model | Flux.2 Klein 9B |
| Steps | 4000–6000 |
| LoRA rank | 32–64 |
| LR | 1e-4 |
| Trigger word | `soniagfe` |
| Dataset size | 20–25 images |

**Vast.ai rules — NON-NEGOTIABLE:**
```
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' -t on-demand -o dph_total
```
- Docker: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- inet_down >= 800 always. Never optimise for cheapest.
- Download everything before destroying: safetensors + full dataset folder + training log

---

## 6. TASK TABLE — TOP PENDING

**Next action:** Generate 20–25 Sonia training images using `sonia_face_reference_v1.png` + zaraso_phia pose refs → LoRA training on Vast.ai

| Priority | Task | Owner | Status |
|---|---|---|---|
| 1 | Provide Sonia face reference photo | CEO | ✅ DONE — `01_characters/sonia/face_reference/sonia_face_reference_v1.png` |
| 2 | Generate 20–25 Sonia training images (Flux.2 Klein + PuLID) | Claude | ⏳ NEXT — unblocked |
| 3 | Train Sonia LoRA on Vast.ai (Flux.2 Klein 9B) | Claude | Blocked on #2 |
| 4 | Generate first 4-image test batch | Claude + CEO QC | Blocked on #3 |
| 5 | Set up Instagram account | CEO | ⏳ Pending |
| 6 | Set up Fanvue account | CEO | ⏳ Pending |
| 7 | Create Sonia character bible + folder structure | Claude | ✅ DONE |
| 8 | Update content calendar + post queue for Sonia | Claude + Antigravity | Blocked on #4 |

---

## 7. ACTIVE PLATFORMS & TECH STACK

| Platform | Purpose | Status |
|---|---|---|
| Flux.2 Klein 9B | Image generation base | ✅ Confirmed (Civitai April 2026 meta) |
| PuLID | Face consistency at inference | ✅ Settings locked |
| DeZi Coffee LoRA | Fair skin / Indian aesthetic | ✅ Confirmed, trigger `d351 l1ght` |
| Vast.ai | GPU rental for LoRA training | ✅ CLI ready |
| Kling AI 3.0 | Image-to-video | ✅ Confirmed |
| Fanvue | Primary paid content platform | ⏳ Not set up |
| Instagram | Top of funnel (SFW) | ⏳ Not set up |
| Passes | Mirror platform | ⏳ Not set up |
| Vercel Dashboard | P&L tracking | ✅ Live at virtual-influencer-dashboard.vercel.app |

---

## 8. KEY DECISIONS (LOCKED)

- **Active character:** Sonia only. Jasmine (East Asian) = ARCHIVED. Sara (white Caucasian) = ARCHIVED.
- **Pipeline:** Flux.2 Klein 9B + custom Sonia LoRA + PuLID + DeZi Coffee. NOT Flux.1-dev. NOT Qwen. NOT fal.ai.
- **Trigger word:** `soniagfe`
- **Beauty marks:** NONE — explicitly prohibited by CEO
- **Face reference method:** Option A — new unique face photo (not zaraso_phia's face)
- **Content ceiling:** Option A — Lena Paul level. No nudity. No topless. Ever. Non-negotiable.
- **Currency:** All costs in INR. USD × ₹93.08. Always verify India pricing directly.
- **GitHub account for this project:** `rheavoss` only. No other accounts.
- **LoRA training dataset:** 20–25 images minimum. QC every single image — no sampling.

---

## 9. ABANDONED CHARACTER HISTORY (for context)

| Character | Ethnicity | Abandoned | Reason |
|---|---|---|---|
| Jasmine | East Asian / Japanese-Korean | 2026-04-27 | 4 LoRA attempts, all failed. See `00_agency/claude_failure_log.md` #1–#28 |
| Sara | White Caucasian, 41yo | 2026-04-30 | Dataset rejected twice (plastic skin + body too slim). See failure log #29–#31 |
| Sonia | Indian / South Asian, 22yo | ACTIVE | Current character |

---

## 10. RALPH PROTOCOL (GOVERNANCE)

**Status:** MECHANICALLY ACTIVE
**Version:** RALPH v16.1
**Playbook:** `00_agency/ralph_jasmine_playbook.json`

```
Auto-commit hook → pushes to [dev branch]
                        ↓
           GitHub Action auto-creates PR dev→main
                        ↓
           ralph-gate-enforcer CI checks GATE_*.md files
                        ↓
           PASS → auto-merges to main
           FAIL → PR blocked until gate files added
```

**Branch protection:** Ruleset `RALPH-protect-main` (ID: 15254081) — direct push to `main` mechanically blocked.

**Gate files (per task):**
| File | Owner | Proves |
|---|---|---|
| `GATE_G0_COMPLETE.md` | Grok | Live research done |
| `GATE_G2_COMPLETE.md` | Claude | Feasibility checked |
| `GATE_G3_COMPLETE.md` | CEO | Plan approved |

---

## 11. TEAM ROLES

| Role | Who | Can do |
|---|---|---|
| CEO | Human | Strategy, payments, physical accounts, final decisions |
| Claude Code | Claude | Files, code, memory, task tracking, document management, commits |
| Antigravity | AI advisor | Research, GFE copy, captions, DM scripts. Cannot write files or run code |
| Grok | AI advisor | Live web/X/Reddit research, market intel, G0 Research Gate |

### Claude Failure Log (READ BEFORE ANY TASK)
**File:** `00_agency/claude_failure_log.md`
**Raw URL:** `https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/00_agency/claude_failure_log.md`
Running record of all Claude errors (34 logged to date). Newest first. Fetch before starting any task.

### Grok G0 Research Gate — MANDATORY CHECKLIST
- [ ] Read live GROK_BRAIN_SUMMARY.md from raw GitHub URL
- [ ] Live search: Google + site:reddit.com + X/Twitter
- [ ] Official blogs & changelog
- [ ] Official API / documentation pages
- [ ] Task-specific sources
- [ ] State explicitly: "All official blogs, API/docs, and changelog checked — no shortcuts taken"

---

## 12. FINANCIAL SNAPSHOT

**P&L Dashboard:** https://virtual-influencer-dashboard.vercel.app

**Real monthly burn (verified 2026-04-24):**
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

**Platform keep rates:**
Fanvue 85% | Passes 90% | PPV+Voice 90% | Telegram 90% | Brand Deals 90% | IG Subs 80% | FB Subs 70%

**Native platform monetization gates:**
- IG Subscriptions: unlocks at 10k followers
- Brand Deals micro: unlocks at 10k followers (M4)

---

## 13. REPO STRUCTURE (KEY PATHS)

```
rheavoss/virtual-influencer-studio (GitHub)
├── main branch — protected, RALPH enforced
├── dev branch  — auto-commits land here
│
├── 00_agency/
│   ├── ralph_jasmine_playbook.json
│   ├── claude_failure_log.md          ← 34 failures logged, read before every task
│   └── session_logs/
├── 01_characters/
│   ├── sonia/                          ← ACTIVE (pending creation)
│   ├── desi_character/character_brief.md  ← early Sonia blueprint
│   ├── jasmine/  ARCHIVED
│   └── sara/     ARCHIVED
├── 03_ai_models/
│   ├── sonia/                          ← ACTIVE (pending creation)
│   ├── jasmine_mako/  ARCHIVED
│   └── sara/          ARCHIVED
├── 99_grok_brain/GROK_BRAIN_SUMMARY.md  ← this file
└── .github/workflows/
    ├── ralph-gate-enforcer.yml
    └── auto-merge-dev.yml
```

---

## 14. FRAMEWORK INTAKE RULE (NON-NEGOTIABLE)

Every strategy/tool Grok recommends is INCOMPLETE until:
1. It has a task ID in the task table
2. It has a strategy/SOP document in the correct folder
3. This brain file references the task ID and doc path

| Type | Folder |
|---|---|
| SEO strategy | `09_marketing/seo/` |
| Social media SOP | `09_marketing/[platform]/` |
| Growth strategy | `09_marketing/growth/` |
| Content production | `04_content_pipeline/` |
| Automation / tech | `11_automation/` |
| Revenue strategy | `07_monetization/` |
| Research / market intel | `10_research/` |

---

## 15. MAINTENANCE RULE

Claude updates this file at the end of every session or after any major change.
Grok reads this file at the start of every important task before doing anything else.
This file is the handshake between Grok and the project state.

---

## 16. SESSION CHANGES LOG

### 2026-04-30 (Current session)
- **MAJOR PIVOT:** Sara abandoned → Sonia launched. Indian/South Asian character targeting zaraso_phia market.
- **Pipeline confirmed:** Flux.2 Klein 9B + custom Sonia LoRA + PuLID + DeZi Coffee (`d351 l1ght`)
- **Trigger word locked:** `soniagfe`
- **Beauty marks:** Explicitly prohibited by CEO
- **Face reference method:** Option A — unique new face photo (CEO to provide)
- **Face reference LOCKED:** Grok-generated, beauty-mark-free — `01_characters/sonia/face_reference/sonia_face_reference_v1.png`
- **Dataset plan:** 20–25 images from `sonia_face_reference_v1.png` + zaraso_phia pose compositions
- **Competitor research updated:** BizzIndia + zaraso_phia subscription screenshots → `10_research/competitor_research/subscription_screenshots/`
- **Sara rejected dataset deleted:** 25 PNGs + 25 captions removed 2026-04-30
- **ARCHIVED:** jasmine_mako/, sara/ (both model and character folders)
- **Failure log:** Updated to #34 (Haar cascade, fal.ai deviation, Sara plastic skin)
- **Grok Brain:** Fully rewritten from Jasmine → Sonia
