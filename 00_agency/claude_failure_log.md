# Claude Failure Log — Jasmine Project
**Purpose:** Running record of Claude errors that cost time or money. CEO reference.
**Owner:** Claude Code
**Format:** Newest first.

---

## FAILURE #13 — Declared Dataset Intact After Checking 2 Images (All 40 Have Legs Cropped)
**Date:** 2026-04-22 (Session 19)
**Cost:** Wasted CEO time, delayed v3 training, false confidence in broken dataset
**What happened:**
Viewed 2 of 40 training images and declared entire dataset "intact — full legs visible, no crop." CEO confirmed all 40 images have legs cropped. Local and Drive versions are identical — both have the cropped versions. Claude failed to audit the full dataset before making a definitive claim.

**Root cause:**
Same as Failure #12 — drew sweeping conclusion from 2 data points out of 40. Did not check dimensions against expected Kling native output (1536×2730 for 9:16 2K). Current images are 1536×2402 — 12% shorter than native = legs cropped.

**Prevention rule:**
Never declare dataset pass or fail without checking ALL 40 images. For crop detection: always compare actual dimensions against expected native resolution (Kling 9:16 2K = 1536×2730). 1536×2402 ≠ intact. State sample size explicitly before any conclusion.

---

## FAILURE #12 — Declared Entire Training Dataset Wrong After Seeing 3 Images
**Date:** 2026-04-22 (Session 18)
**Cost:** Wasted CEO time, caused conflict, nearly triggered unnecessary dataset regeneration
**What happened:**
Viewed 3 of 40 training images and declared the entire dataset invalid — wrong eye color, wrong hair, wrong spec. CEO had to defend their own approved dataset. On full audit of all 40 images, dataset is clean, consistent, and correctly spec'd: fair porcelain skin throughout, consistent character face lock, correct body proportions, no watermarks in training images.

**Root cause:**
Drew sweeping conclusion from 3 data points out of 40. Did not complete the audit before making claims. Classic overconfidence failure — same root cause as failures #1–#11.

**Prevention rule:**
Never declare a dataset pass or fail without auditing 100% of images. State sample size explicitly: "I have checked X of Y images." No conclusions until all checked.

---

## FAILURE #11 — Weak Sample Prompts, No Pre-Research on FLUX Inference
**Date:** 2026-04-21 (Session 17)
**Cost:** v2 test results unusable for body shots; full inference quality unknown; wasted validation time
**What happened:**
Wrote training sample prompts with zero research on FLUX inference best practices. Prompts had no skin tone, no body physics descriptors, no character-specific terms. FLUX base model defaults filled every gap — resulting in tanned skin and physically wrong breast rendering. Then blamed the training data (which was CEO-approved and clean). CEO correctly called this out.

**Impact:**
- All 5 body sample images failed spec
- Wasted CEO time on a fake "QC pass"
- Cannot determine if LoRA itself is good or bad without proper prompt testing

**Root cause:**
Overconfidence. Wrote prompts from memory without researching how FLUX renders skin tone, body physics, or DDD proportions. Did not read a single reference on FLUX prompt engineering before writing the config.

**Prevention rule:**
Before writing ANY inference prompt for FLUX: research skin tone descriptors, physics descriptors, and body spec prompts that are known to work. Never write prompts from memory. Test with at least 3 prompt variations before declaring a model pass or fail.

---

## FAILURE #10 — Watermarks Not Removed from Training Images (Baked Into LoRA)
**Date:** 2026-04-21 (Session 17)
**Cost:** v2 LoRA unusable without post-processing on every image; v3 retrain required for clean output
**What happened:**
Ran LoRA training on 40 Grok/Kling-generated images without checking for or removing platform watermarks. Every generated image from jasmine_v2.safetensors now has Kling watermarks baked into the bottom corner. The fix (check training images, crop/inpaint watermarks before training) was trivially available — all 40 images were on disk before the instance was even rented.

**Impact:**
- jasmine_v2 outputs require manual watermark removal on every generated image
- Clean production use requires v3 retrain with watermark-free dataset
- All 40 training images need watermark removal pass before v3

**Root cause:**
Did not audit training images for platform artifacts before training. Grok and Kling both embed watermarks into generated images. This is known behavior. Research would have caught it in 2 minutes.

**Fix applied:**
None yet. v3 training dataset prep must include watermark removal step (lama-cleaner or crop).

**Prevention rule:**
Before ANY training run: visually audit 5 random training images for watermarks, logos, and platform artifacts. Any found = remove from ALL images before training. This is mandatory — baked artifacts cannot be removed post-training.

---

## FAILURE #9 — Missing System Dependencies Not Pre-Checked (libGL + gcc)
**Date:** 2026-04-21 (Session 17)
**Cost:** ~15 min delay, 3 extra restart cycles
**What happened:**
Started training without verifying system dependencies. Instance was missing `libGL.so.1` (needed by cv2) and `gcc` (needed by diffusers). Each caused a separate crash and restart. Both are standard deps for ML training containers that should be checked upfront.

**Impact:**
- 3 failed training starts
- Extra time on rented GPU instance = money burned

**Root cause:**
Did not run a pre-flight dependency check before starting training. Should have verified imports and system libs before launching the long-running process.

**Prevention rule:**
Before starting any training run: SSH in and run `python3 -c "import torch; import cv2; import diffusers; import transformers; print('all ok')"` to catch import errors upfront. If anything fails, fix it BEFORE starting the background process.

---

## FAILURE #8 — HuggingFace Token Never Recorded
**Date:** 2026-04-21 (Session 17)
**Cost:** Delay — had to ask CEO for token during live training session
**What happened:**
G2 feasibility doc marked HuggingFace token as "✅ access granted" but never stored the actual token anywhere. No credentials file, no memory entry, no session log. When v2 training needed the token, Claude had no record of it.

**Impact:**
- Training blocked waiting for CEO to provide token
- CEO had to be asked for information Claude should have stored

**Root cause:**
Record keeper did not record. Marked a prerequisite as "done" without storing the value.

**Fix applied:**
Token stored in credentials file after CEO provides it this session.

**Prevention rule:**
Any credential, token, or API key used in a task = store immediately in `/Users/user/Desktop/Instagram/00_agency/credentials.md` AND memory. Never mark a credential as "✅" without recording the actual value.

---

## FAILURE #7 — Ran JoyCaption Without Checking V1 Setup (Broke Instance)
**Date:** 2026-04-21 (Session 17)
**Cost:** Time lost + JoyCaption broke torch on instance
**What happened:**
Started JoyCaption on instance without first reading v1 rolling doc or G2 feasibility doc. V1 had pre-existing caption .txt files — JoyCaption was never used. JoyCaption's requirements.txt upgraded torch from 2.6.0 → 2.7.0 and broke torchvision, making the instance unusable for training until repaired.

**Impact:**
- Instance in broken state; torch/torchvision mismatch
- Extra time to repair + generate captions manually

**Root cause:**
Did not read v1 docs before executing. Karpathy Protocol violation — executed without reading first.

**Fix applied:**
Generate captions locally from filenames, upload .txt files, reinstall correct torch on instance, then train.

**Prevention rule:**
Before ANY training session: read the previous run's rolling_task_document.md AND gate_g2_complete.md FIRST. Map every prerequisite (captions, torch version, config) before touching the instance.

---

## FAILURE #6 — Wrong Vast.ai Balance (Unauthenticated CLI)
**Date:** 2026-04-21 (Session 17)
**Cost:** 0 (caught same session by CEO)
**What happened:**
Reported Vast.ai balance as $0. CEO's browser showed $1.34. CLI was using a fresh `/tmp/vastai_env` venv with no API key loaded — it returned a default/empty user object. Claude reported that number without verifying it matched the known account.

**Impact:**
- Told CEO to top up when account had sufficient funds
- Lost trust; wasted CEO time

**Root cause:**
Careless — ran `vastai show user` in a new venv that had never been authenticated. Did not cross-check CLI output against the known account (kriger5490).

**Fix applied:**
Set API key in new venv: `vastai set api-key <key>`. Balance confirmed $1.34. Training can proceed.

**Prevention rule:**
After any `vastai show user`, verify the username in the output matches kriger5490. If username is blank or balance is 0, re-authenticate before reporting. Never report $0 balance without confirming account identity.

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
