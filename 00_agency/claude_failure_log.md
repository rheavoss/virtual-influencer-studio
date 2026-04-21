# Claude Failure Log — Jasmine Project
**Purpose:** Running record of Claude errors that cost time or money. CEO reference.
**Owner:** Claude Code
**Format:** Newest first.

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
