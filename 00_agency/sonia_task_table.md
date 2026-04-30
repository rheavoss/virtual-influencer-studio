# Virtual Influencer Studio — Sonia Execution Pipeline
**Updated:** 2026-04-30 · Active character: Sonia (Indian/South Asian, 22yo, trigger: `soniagfe`)
**Target to reverse-engineer:** @zaraso_phia (517K followers, 6 months old, 245 posts)

**Legend:**
- **Assignee:** [CEO] (Physical accounts/Payments), [Claude] (Files/Code/Tasks), [Grok] (Research/Market Intel), [Antigravity] (Copy/Captions/GFE scripts)
- **RICE Score:** Reach × Impact × Confidence ÷ Effort. Higher = higher priority.

---

## PHASE 0 — FOUNDATION (Current Phase)

### LoRA Training Pipeline

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S0-01 | Face reference locked — `01_characters/sonia/face_reference/sonia_face_reference_v1.png` | CEO+Grok | ✅ DONE 2026-04-30 | — |
| S0-02 | Character bible + folder structure — `01_characters/sonia/sonia_character_bible.json` | Claude | ✅ DONE 2026-04-30 | — |
| S0-03 | Generate 20–25 Sonia training images (Flux.2 Klein 9B + PuLID, using face ref + zaraso_phia pose compositions) | Claude | ⏳ NEXT — unblocked | 10×10×1.0÷2 = 50 |
| S0-04 | Dataset QC — review every single image against spec before training. No sampling. | Claude + CEO | Blocked on S0-03 | 10×10×1.0÷1 = 100 |
| S0-05 | Train `sonia_v1.safetensors` on Vast.ai (Flux.2 Klein 9B, 4000–6000 steps, rank 32–64, lr 1e-4) | Claude + CEO | Blocked on S0-04 | 10×10×1.0÷3 = 33 |
| S0-06 | Generate first 4-image test batch — QC face+body lock before declaring LoRA pass | Claude + CEO | Blocked on S0-05 | 10×10×1.0÷1 = 100 |

**Vast.ai search command (NON-NEGOTIABLE):**
```
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' -t on-demand -o dph_total
```
Docker: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime` · inet_down >= 800 always · Never optimise cheapest.
Pre-destroy checklist: safetensors ✓ + full dataset folder ✓ + training log ✓

---

### Platform Setup

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S0-07 | Set up Instagram account (Indian phone number, Dolphin{anty} browser) | CEO | ⏳ Pending | 10×10×1.0÷1 = 100 |
| S0-08 | Set up Fanvue account + subscription pricing | CEO | ⏳ Pending | 10×10×1.0÷2 = 50 |
| S0-09 | Set up Passes account (non-nude policy = our fit) | CEO | ⏳ Pending | 8×8×1.0÷2 = 32 |
| S0-10 | Register domain on Namecheap | CEO | ⏳ Pending | 10×8×1.0÷2 = 40 |
| S0-11 | Configure link-in-bio (Bouncy.cc) — domain redirect | Antigravity | Blocked on S0-10 | 10×9×1.0÷2 = 45 |

---

### Content & OPSEC Pipeline

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S0-12 | Build ExifTool strip + film grain pipeline (OPSEC before every upload) | Antigravity | Blocked on S0-06 | 10×10×0.9÷4 = 22.5 |
| S0-13 | Generate 30-day Hindi/Hinglish content calendar (Sonia captions, story scripts, GFE DM templates) | Antigravity | Blocked on S0-06 | 9×9×0.9÷2 = 36.4 |
| S0-14 | Update 8 shared playbooks in `00_agency/playbooks_shared/` — trigger word jasmakogirl → soniagfe, East Asian → South Asian descriptors | Claude | ⏳ In progress | 8×7×1.0÷2 = 28 |
| S0-15 | 7-day Instagram warm-up execution — full SOP: `09_marketing/instagram/ig_warmup_sop.md` | CEO | Blocked on S0-07 | 10×10×1.0÷1 = 100 |

---

## PHASE 1 — GROWTH & AUTOMATION

### Content Production

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S1-01 | Test Kling AI 3.0 Image-to-Video (Subject Reference) with first Sonia images | Claude + CEO | Blocked on S0-06 | 10×10×0.9÷2 = 45 |
| S1-02 | Clone Sonia Hindi voice via VoiceBox (zero-shot, local). Test lip-sync with Kling/Higgsfield. | Antigravity | Blocked on S0-06 | 9×9×0.8÷3 = 21.6 |
| S1-03 | 6-Step Editing SOP — lock brand kit (font, color, watermark position). Doc: `04_content_pipeline/editing_system_sop.md` | Antigravity | ⏳ Pending | 8×9×1.0÷1 = 72 |
| S1-04 | Test CoMoVi for human motion fix (Wan 2.2 — fixes limb glitching in AI video) | Antigravity | ⏳ Pending | 9×8×0.8÷2 = 28.8 |
| S1-05 | Integrate Flow 3D motion graphics overlays. Doc: `04_content_pipeline/flow_3d_motion_graphics.md` | Antigravity | ⏳ Pending | 8×8×0.8÷2 = 25.6 |
| S1-06 | Monitor Seedance 2.0 on Higgsfield — test Omni multi-reference with Sonia outputs when live | Antigravity | ⏳ Watching | 8×8×0.9÷1 = 57.6 |

---

### Growth & SEO

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S1-07 | Threads Scaling SOP — launch after IG warm. 3–6 posts/day + 8–10 viral comments. Doc: `09_marketing/threads/threads_scaling_sop.md` | CEO + Antigravity | Blocked on S0-15 | 9×9×0.8÷3 = 21.6 |
| S1-08 | $5/day IG Boost for static images | CEO | Blocked on S0-15 | 9×8×0.8÷2 = 28.8 |
| S1-09 | AI Personas Authority Network — 10–50 fan/reviewer accounts endorsing Sonia across Threads/X/IG. Doc: `09_marketing/growth/ai_personas_authority_strategy.md` | Antigravity + Claude | Blocked on S0-06 | 9×8×0.7÷4 = 12.6 |
| S1-10 | Programmatic SEO — 500+ landing pages (Indian GFE niche). Doc: `09_marketing/seo/programmatic_seo_strategy.md` | Claude + CEO | Blocked on S0-10 (domain) | 9×9×0.8÷5 = 12.9 |
| S1-11 | TAM research: Hindi-speaking Indian GFE/subscription market size, willingness to pay | Grok | ⏳ Pending | 8×8×0.8÷2 = 25.6 |
| S1-12 | IG native subscriptions unlock at 10k followers (₹250–390/month tier) | CEO | Blocked on followers | 10×10×1.0÷1 = 100 |

---

### Monetization & GFE

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S1-13 | Sonia character profile + backstory + personality. Output: `01_characters/sonia/sonia_character_profile.md` | Claude | Blocked on S0-06 | 9×10×0.9÷2 = 40.5 |
| S1-14 | GFE system prompt + DM sales scripts (qualification, girlfriend experience, PPV upsell, retention). Output: `04_content_pipeline/dm_sales_scripts.md` | Claude + Antigravity | Blocked on S1-13 | 10×10×0.9÷3 = 30 |
| S1-15 | Fanvue bio + welcome message + automated DM templates. Output: `07_monetization/fanvue/fanvue_onboarding_scripts.md` | Claude + Antigravity | Blocked on S0-08 | 10×10×0.9÷1 = 90 |
| S1-16 | PPV content strategy + pricing tiers. Output: `07_monetization/fanvue/ppv_strategy.md` | Claude | ⏳ Pending | 10×10×0.9÷2 = 45 |
| S1-17 | Sonia media kit (INR-denominated, Indian brand targeting). Output: `09_marketing/sponsorships/sonia_media_kit.md` | Claude | Blocked on traction | 9×9×1.0÷1 = 81 |

---

### Tech & Automation

| # | Task | Owner | Status | RICE |
|---|---|---|---|---|
| S1-18 | Configure Metricool free tier for IG+FB scheduling | Antigravity | ⏳ Pending | 10×8×1.0÷4 = 20 |
| S1-19 | Deploy self-hosted Postiz on Railway for multi-platform scheduling | Antigravity | ⏳ Pending | 10×9×0.9÷4 = 20.2 |
| S1-20 | ManyChat automation — IG DMs → Fanvue funnel | Antigravity | Blocked on S0-07 | 10×8×0.8÷5 = 12.8 |
| S1-21 | Configure Skydo receiving account as default payout for all gateways | CEO | ⏳ Pending | 10×8×1.0÷2 = 40 |
| S1-22 | Cance 2 + Arc Ads cloning pipeline — Sonia versions of winning competitor ads. Doc: `04_content_pipeline/cance2_arc_ads_cloning_pipeline.md` | Antigravity + Claude | Blocked on S0-06 | 9×9×0.7÷5 = 11.3 |

---

## BACKLOG (Post ₹50K MRR)

| # | Task | Owner |
|---|---|---|
| B-01 | Deploy Sonia to SpicyChat Premium for interactive GFE funnels | Antigravity |
| B-02 | Hybrid Faceless YouTube channels (AI creator case studies). Doc: `09_marketing/youtube/hybrid_youtube_rpv_strategy.md` | Antigravity + CEO |
| B-03 | Investor deck — "Virtual Influencer Studio" portfolio pitch. Target: $750k–$900k at $7–7.5M SAFE | Claude + CEO |
| B-04 | Second character launch (different niche, same pipeline) | Claude + CEO |

---

## PIPELINE REFERENCE

**Full generation stack:**
1. Trained Sonia LoRA (`sonia_v1.safetensors`, strength 0.8–1.0) on Flux.2 Klein 9B
2. PuLID (strength 0.95–1.0, start_timestep 4, end_timestep 8)
3. DeZi Coffee LoRA (trigger: `d351 l1ght`)
4. Flux.2 Klein 9B base

**Face reference:** `01_characters/sonia/face_reference/sonia_face_reference_v1.png`
**Pose reference:** `~/Downloads/target/` (700 zaraso_phia images — composition reference ONLY)
**Negative prompt includes:** `beauty mark, mole` — explicitly prohibited

---

## ARCHIVED CHARACTERS

| Character | Ethnicity | Archived | Reason |
|---|---|---|---|
| Jasmine | East Asian / Japanese-Korean | 2026-04-27 | 4 LoRA attempts failed. See `00_agency/claude_failure_log.md` #1–#28 |
| Sara | White Caucasian, 41yo | 2026-04-30 | Dataset rejected (plastic skin + body too slim). See failure log #29–#31 |
