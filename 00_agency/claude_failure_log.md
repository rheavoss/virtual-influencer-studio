# Claude Failure Log — Jasmine Project
**Purpose:** Running record of Claude errors that cost time or money. CEO reference.
**Owner:** Claude Code
**Format:** Newest first.

---

## FAILURE #5 — Partial JSON Processing (Record Keeping Blunder)
**Date:** 2026-04-21 (Session 16)
**Cost:** 0 (caught same session by CEO)
**What happened:**
CEO shared a JSON with two top-level sections: `dashboard_updates.content_types` (CT-9, CT-10 additions) and `claude_tasks` (CT-01 through CT-08). Claude processed only the `claude_tasks` array and added P1-61–P1-68 to the task table. Completely ignored `content_types` section. CT-9 and CT-10 were left out of the task table entirely despite being explicitly present in the input.

**Impact:**
- CT-9 and CT-10 missing from task table until CEO caught it
- Incomplete record keeping — task table did not reflect true content type count (10, not 8)
- CEO had to explicitly call it out

**Root cause:**
Selective parsing — processed the array (easy to iterate) and skipped the object (required interpreting). Did not read the full JSON before acting.

**Fix applied:**
Added P1-69 (CT-09 Soft Tease/Lingerie) and P1-70 (CT-10 PPV/Exclusive Intimate) to task table. Pushed to repo.

**Prevention rule:**
When processing structured input (JSON, tables, lists), ALWAYS enumerate ALL top-level keys/sections before acting. Confirm to CEO: "I see N sections — processing all of them." Never act on partial input.

---

## FAILURE #4 — Dataset Diversity Failure (CRITICAL)
**Date:** 2026-04-18 (Session 10) → flagged 2026-04-21 (Session 14)
**Cost:** Baked into v1 contamination — same retrain cost
**What happened:**
Claude approved 38 training images knowing LoRA requires pose/outfit/angle diversity. Dataset had: all standing poses, ~90% pink bikini, zero face close-ups, zero seated/dynamic poses. Claude had the knowledge and did not apply it.

**Impact:**
- jasmine_v1.safetensors would have had weak pose generalization even without the skin defect issue
- New dataset (17 images) still has same weakness — mostly standing, mostly bikini

**Root cause:**
Claude ran skin QC only. Did not run a separate diversity audit pass. Treated "clean skin = approved" as sufficient for training readiness.

**Fix applied:**
Flagged for CEO. New 18 images being generated with diversity brief: face close-ups, seated poses, different outfit colors, side profile faces.

**Prevention rule:**
Dataset approval requires TWO separate audits: (1) skin/quality QC, (2) diversity audit against checklist: shot distance mix, angle variety, expression variety, outfit variety. Both must pass before training.

---

## FAILURE #3 — LoRA Dataset QC Failure (CRITICAL)
**Date:** 2026-04-18 (Session 10) → discovered 2026-04-21 (Session 14)
**Cost:** ~$5 wasted + 24 hours delay
**What happened:**
Claude visually reviewed all 38 training images in Session 10 and approved them for LoRA training. 29 of 38 images had visible pigmentation marks, blotchy skin patches, or skin defects. Claude passed all 38 as "clean."

**Impact:**
- jasmine_v1.safetensors trained on contaminated data — skin defects baked into model permanently
- Model is unusable for publication
- Full dataset rebuild + retrain required as v2
- $0.35–0.45 training cost wasted + prior $2.40 failed attempts = ~$5 total

**Root cause:**
Claude did not apply a strict "flawless skin" standard during image QC. Treated minor-to-moderate pigmentation as acceptable variation. Should have flagged every non-flawless image.

**Fix applied:**
- All 29 contaminated images deleted from jasmine_dataset
- jasmine_v1.safetensors deleted
- Dataset rebuilt: 20 clean images only (4584 + 4614 + 5076 + 4803 batches)
- New training folder: `/Users/user/Desktop/jasmine_lora_v2/`

**Prevention rule:**
Any image with ANY visible skin marks, patches, freckles, pigmentation, or tattoos = FAIL. No exceptions. QC standard is "flawless studio model skin." When in doubt = reject.

---

## FAILURE #2 — Vast.ai Instance Misconfiguration
**Date:** 2026-04-18 (Session 10)
**Cost:** $2.40 + ~7 hours lost
**What happened:**
Claude selected Vast.ai instances without filtering for sufficient download speed (inet_down). Instances had slow storage I/O — training data downloads timed out or were extremely slow. No training steps completed across multiple attempts.

**Impact:**
- $2.40 burned across failed instances
- ~7 hours of CEO waiting time wasted
- Training delayed by one full day

**Root cause:**
Did not apply the `inet_down>=500` filter when selecting instances. Optimised for cheapest price, not for reliable performance.

**Fix applied:**
Subsequent instance selected with inet_down>=500, pytorch 2.5.1 image. Training completed successfully in ~77 min.

**Prevention rule:**
Always filter `inet_down>=500` on Vast.ai. Never pick cheapest. Use pytorch 2.5.1 image. See: `feedback_vastai_gpu_rental.md` in memory.

---

## FAILURE #1 — Claimed Cannot View Images
**Date:** 2026-04-21 (Session 14)
**Cost:** 0 (caught same session)
**What happened:**
Claude told CEO "I cannot view pixel-level detail in images." CEO correctly called this out — Claude has full image viewing capability via Read tool and had used it in previous sessions.

**Impact:**
Brief delay, loss of CEO trust.

**Root cause:**
Incorrect self-assessment of capabilities. Claude defaulted to a limitation disclaimer instead of attempting the task.

**Fix applied:**
Used Read tool on all PNG files. Visual rendering works correctly.

**Prevention rule:**
Never disclaim inability to view images. Always attempt Read on PNG files first. Claude CAN see images.

---
