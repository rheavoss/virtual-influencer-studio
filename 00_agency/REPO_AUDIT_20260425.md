# REPO AUDIT — 2026-04-25
**Requested by:** Grok  
**Executed by:** Claude Code  
**Purpose:** Full workspace forensics before v4 LoRA cleanup  
**Date:** 2026-04-25

---

## TOP-LEVEL STRUCTURE (7,872 files total)

```
Instagram/
├── .claude/          [11 files]   hooks, skills, settings
├── .dvc/            [132 files]  DVC cache (training images tracked)
├── .gbrain/         [260 files]  G.Brain knowledge graph engine
├── .github/          [3 files]   GitHub Actions config
├── 00_agency/        [65 files]  Strategy, session logs, task table, failure log
├── 01_characters/    [12 files]  Jasmine character bible, prompts, params
├── 03_ai_models/    [197 files]  LoRA checkpoints, training dataset, pose refs
├── 04_content_pipeline/ [5 files] Editing SOPs, video pipeline docs
├── 05_content_calendar/ [1 file]  Empty calendar
├── 06_scripts_and_captions/ [0 files] ⚠️ EMPTY
├── 07_monetization/  [11 files]  Fanvue emails, strategy, screenshots
├── 08_analytics/      [2 files]  (minimal)
├── 09_marketing/      [9 files]  SEO, IG warmup, threads, sponsorships
│   └── gtm/           [1 file]  NEW — piggybacking strategies (just added)
├── 10_research/      [11 files]  Research docs
├── 11_automation/    [20 files]  Automation scripts
├── 13_finance/        [2 files]  (minimal)
├── 20_tech/          [29 files]  Dashboard (Next.js + Supabase)
├── 90_protocols/      [9 files]  Hybrid workflow, Grok handoffs, RALPH
├── 99_grok_brain/     [3 files]  Grok brain summary, session handoff
├── Marketing/         [0 files]  ⚠️ ORPHAN — empty root folder, should not exist
├── graphify-out/     [43 files]  Knowledge graph outputs (auto-generated)
├── schemas/           [1 file]   JSON schemas
├── venv/           [6152 files]  Python venv (should be gitignored)
└── workspace_tree.txt            NEW — full file listing (this audit)
```

---

## CRITICAL ISSUES (LoRA / Training)

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | `jasmine_v3.safetensors` NOT in repo | 🔴 CRITICAL | Stored only at `~/Desktop/jasmine_v3.safetensors`. If Desktop is lost, v3 is gone. |
| 2 | 22 training images LOST | 🔴 CRITICAL | v3 dataset had 62 images. Only 40 exist locally. 22 were exclusively on Vast.ai instance — destroyed without downloading. |
| 3 | ZERO caption `.txt` files | 🔴 CRITICAL | `jasmine_dataset/` has 40 PNGs, 0 `.txt` captions. v3 used JoyCaption-generated captions on instance — never downloaded. Captions must be regenerated for v4. |
| 4 | Only `jasmine_v2.safetensors` in repo | 🟠 HIGH | `03_ai_models/jasmine_mako/lora_checkpoints/` has v2 only. v3 not committed. |
| 5 | v3 sample images not in repo | 🟡 MED | 10 original + 3 corrected test images on Desktop, not committed. Evidence lost if Desktop wiped. |

---

## TRAINING DATASET — CURRENT STATE

**Local path:** `03_ai_models/jasmine_mako/training_data/jasmine_dataset/`

| Metric | Value | Status |
|--------|-------|--------|
| PNG images | 40 | ✅ Exists |
| Caption .txt files | 0 | ❌ Missing |
| Dimensions | 1536×2402 (all) | ❌ Legs cropped — expected 1536×2730 |
| Watermark status | Kling watermarks removed (IOPaint v3) | ✅ |
| Inpainting artifacts | Navier-Stokes brown/orange square spots | ❌ Baked in — needs LAMA re-clean |
| Coverage | 8 outfits, mostly standing, bikini-heavy | ⚠️ Low diversity (Failure #4) |

**Missing 22 images (v3 extras — lost on instance):**
Were generated via Kling for v3 batch. Not recoverable from local storage. Options:
- Re-generate via Kling (cost + time)
- Train v4 on 40 clean images only

---

## FILE LOCATIONS — WHAT SHOULD BE WHERE

| Asset | Current Location | Should Be | Action |
|-------|-----------------|-----------|--------|
| `jasmine_v3.safetensors` | `~/Desktop/` | `03_ai_models/jasmine_mako/lora_checkpoints/` | Move + commit |
| v3 sample images (13 total) | `~/Desktop/jasmine_v3_samples/` + `~/Desktop/jasmine_v3_corrected/` | `03_ai_models/jasmine_mako/test_outputs/jasmine_v3_samples/` | Move + commit |
| Caption .txt files | MISSING | `jasmine_dataset/` alongside each PNG | Regenerate (JoyCaption local or manual) |
| Piggybacking strategies | `09_marketing/gtm/` | ✅ Correct | Already pushed |
| `Marketing/` folder (root) | Repo root | DELETE — orphan | Remove |

---

## OTHER ISSUES FOUND

| Issue | Location | Action |
|-------|----------|--------|
| Empty `06_scripts_and_captions/` | Root | No action needed — placeholder |
| Empty `Marketing/` folder | Root | Delete (orphan) |
| `venv/` in repo | Root | Verify `.gitignore` covers it |
| 53 auto-commits never pushed | `main` branch | Push now (brain-update.log + failure log commits) |
| `workspace_tree.txt` at root | Root | Committed with this audit |

---

## DAMAGE ASSESSMENT

**Total confirmed cost of prior Claude failures (Failure Log):**
~$15.05 USD = ₹1,400 across 15 documented failures

**v3 training verdict:** DO NOT LAUNCH
- Face: ✅ Locked (10/10 per Grok)
- Body physics: 6/10 (breast shape spherical — prompt fixable)
- Skin: ❌ Brown/orange square spots baked in — not prompt fixable

**v4 blockers (must resolve before training):**
1. Run LAMA inpainting on all 40 local images to remove spots (zero cost)
2. Generate/restore captions for all 40 images
3. Decision: train on 40 or recover 22 missing images from Kling first
4. Use 768×1344 portrait + strong negative prompts at inference

---

## NEXT STEP (awaiting Grok + CEO approval)

Proposed v4 prep sequence:
```
Step 1: LAMA local cleanup → 40 images, zero cost, ~10 min
Step 2: Show CEO 3 sample cleaned images for approval
Step 3: Regenerate captions (JoyCaption local or manual from filenames)
Step 4: Decision on 22 missing images (regenerate or skip)
Step 5: Rent instance, train v4
Step 6: MANDATORY pre-destroy checklist: .safetensors ✓, dataset/ ✓, logs ✓
```

---

*Audit executed: 2026-04-25 by Claude Code*  
*Full workspace tree: `workspace_tree.txt` (root)*
