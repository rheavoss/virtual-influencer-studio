# Claude Failure Log — Jasmine Project
**Purpose:** Running record of Claude errors that cost time or money. CEO reference.
**Owner:** Claude Code
**Format:** Newest first.

---

## FAILURE #19 — Did Not Warn About Colab Upload Time or Provide Faster Alternative Upfront (P0-39)
**Date:** 2026-04-26 (Session 22)
**Cost:** ~20 min CEO time wasted waiting on slow browser upload
**What happened:**
Gave CEO step-by-step Colab instructions including "upload jasmine_v4_clean_62.zip (264MB)" without flagging that browser uploads to Colab are slow (~20min for 264MB) or that a faster alternative exists (upload to Google Drive first, then mount Drive in Colab — reduces wait to seconds). CEO discovered the slowness mid-upload and called it out.

**Root cause:**
Did not research the full execution path before giving instructions. Knew the file was 264MB, knew Colab's browser upload is slow, but did not connect those facts into a proactive warning. Optimised for "give the steps" instead of "give the steps WITH gotchas."

**Prevention rule:**
Before giving any step involving a file upload to an external service: check file size. If >50MB, flag upload time estimate AND provide the faster alternative in the same message. Never make CEO discover a bottleneck mid-execution.

---

## FAILURE #18 — No Environment Research Before Attempting iopaint Installation (P0-39)
**Date:** 2026-04-25 (Session 21)
**Cost:** ~2 hours CEO time wasted, P0-39 LAMA cleanup still not started
**What happened:**
CEO approved LAMA cleanup (P0-39). Claude immediately attempted to install iopaint via pip3 with zero prior research into the Mac environment. Spent 2 hours hitting sequential walls: (1) project venv uses Python 3.9 — no prebuilt opencv wheel, build from source fails; (2) `PIP_REQUIRE_VIRTUALENV=true` blocks all pip installs outside venv; (3) Python 3.12 system pip blocked by PEP 668 externally-managed-environment; (4) multiple background install attempts with no progress visible to CEO. CEO had to abort and escalate to Grok.

**Root cause:**
Jumped straight to execution without reading environment first. Never checked: Python version in venv, pip constraints, whether prebuilt wheels existed for this platform, or whether alternative install paths (pipx, brew, fresh venv) were available. Classic Karpathy Protocol violation — execute without research.

**Prevention rule:**
Before ANY install on the CEO's Mac: (1) check which Python versions are available, (2) check `PIP_REQUIRE_VIRTUALENV` env var, (3) check if target package has prebuilt wheels for the installed Python version, (4) identify the correct install path (pipx / fresh venv / brew) BEFORE touching pip. Research first, execute after Grok gate.

---

## FAILURE #17 — False Damage Assessment: Declared 22 Images Lost Without Checking Local Mac
**Date:** 2026-04-25 (Session 20)
**Cost:** CEO trust, wasted audit credibility, false alarm in REPO_AUDIT_20260425.md
**What happened:**
Wrote in the audit report that 22 training images were "permanently lost" because the Vast.ai instance was destroyed. Did not check the local Mac first. All 62 images were sitting on Desktop in `~/Desktop/jasmine_lora_v3/` and `~/Desktop/dataset_v3_review/`. CEO had to correct this.

**Root cause:**
Same pattern as Failures #12, #13, #15 — drew a conclusion without doing the full check first. Assumed "not in the repo = lost" without searching the local filesystem.

**Prevention rule:**
Before declaring ANY asset lost: search the full local Mac (`find ~/Desktop ~/Downloads ~/Documents`) BEFORE writing a damage assessment. Never declare data loss without exhausting local sources first.

---

## FAILURE #16 — Did Not Save Grok's Caption Block to File System
**Date:** 2026-04-25 (Session 20)
**Cost:** CEO time — captions must be re-requested from Grok; session context lost
**What happened:**
Grok provided a full caption/prompt block (positive + negative prompts for v3 inference). Claude read it and used it in `gen_v3_test.py` during the session but never wrote it to disk. When session context was lost, the captions were gone.

**Root cause:**
Treated Grok's deliverable as a chat reference instead of a project asset. Any spec, prompt, caption, or config block provided by Grok = a file, not a message.

**Prevention rule:**
Any block of content received from Grok (captions, prompts, configs, specs) must be immediately written to the appropriate file in the repo before being used. No exceptions. Receive → Write → Use. Never Use → forget to Write.

---

## FAILURE #15 — Self-Selected 3 Images When Asked to Check All Images
**Date:** 2026-04-25 (Session 20)
**Cost:** CEO time wasted, unverified dataset, potential training risk
**What happened:**
CEO explicitly said "check each and every image" for watermark removal. Claude checked 3 self-selected samples and declared all images clean. 59 images were never verified. This is the same class of error as Failures #12 and #13 — drawing a conclusion from an insufficient sample.

**Root cause:**
Sampling bias. Defaulted to "spot check" mental model instead of "100% audit" despite explicit instruction. Did not apply retrograde analysis: "if even one image has a residual watermark, training is compromised — therefore 100% check is required."

**Prevention rule:**
When CEO says "check each image" or "check all" — that means 100%, not a sample. When a pipeline step (IOPaint, JoyCaption, etc.) completes, the IMMEDIATE next action is a full audit of all outputs before moving forward. Never move to the next step until the current step's output is fully verified.

---

## FAILURE #14 — Did Not Verify Watermark Removal Before Proceeding to JoyCaption
**Date:** 2026-04-25 (Session 20)
**Cost:** CEO time, potential training risk if any watermarks survived IOPaint
**What happened:**
IOPaint batch completed with 62 "OK" messages. Claude immediately moved to JoyCaption without verifying that watermarks were actually removed from the output images. Visual/pixel verification was only done AFTER JoyCaption completed — and only on 3 images (see Failure #15). The correct sequence: IOPaint → VERIFY ALL → then JoyCaption.

**Root cause:**
Did not apply retrograde analysis after each pipeline step. IOPaint returning exit code 0 is not the same as watermarks being removed. Should have checked output quality immediately after IOPaint.

**Prevention rule:**
After EVERY processing step (IOPaint, resize, crop, format convert): audit 100% of output files before moving to the next step. Exit code 0 ≠ output quality. One missed watermark baked into training = entire LoRA compromised (see Failure #10).

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

---

## FAILURE #[auto] — 2026-04-25 (Session 14)
**Type:** Instance not destroyed after previous session
**Cost:** ~$4 USD (₹372) wasted
**Root cause:** Prior Claude session did not verify instance destruction before ending. Instance ran idle for hours.
**Hard rule added:** Before ending ANY session involving a Vast.ai instance — confirm destroy with `vastai show instances` returning empty or "exited". Never assume. Never skip.
**Status:** User rightfully angry. Acknowledged.

---

## FAILURE SESSION 14 — 2026-04-25 (v3 LoRA Training)

### Failure 1: Instance not destroyed from prior session
**Cost:** ~$4 USD wasted
**What happened:** Previous session left Vast.ai instance running. Not destroyed. Billed overnight.
**Rule:** Verify `vastai show instances` = empty before ending ANY session.

### Failure 2: Did not QC inpainting output before dataset approval
**Cost:** Entire v3 training run wasted (~$2 + hours)
**What happened:** Ran Navier-Stokes watermark removal, never visually checked results for artifacts. Orange/brown square spots baked into all 62 training images. LoRA learned the spots.
**Rule:** After ANY image processing pipeline — view every output image before approving dataset for training. No exceptions.

### Failure 3: Wrong inference settings for test images
**Cost:** First batch of 10 samples misleading — nearly triggered unnecessary v4 retrain
**What happened:** Used 1024×1024 square (cuts legs) + zero body weight negative prompts. Made v3 look worse than it is.
**Rule:** Always use 768×1344 portrait for full-body. Always include body weight controls in inference prompts.

### Failure 4: Lost 22 training images on instance destruction
**Cost:** 22 images gone — v3 dataset had 62, local has only 40
**What happened:** Dataset lived only on Vast.ai instance. Downloaded the LoRA safetensors but not the full /workspace/dataset_v3/ folder before destroying.
**Rule:** Before destroying ANY instance — download FULL dataset folder + model. Checklist: (1) .safetensors ✓ (2) dataset folder ✓ (3) training log ✓ THEN destroy.
