# ANTIGRAVITY INBOX — Verified code tasks from Grok

---

## HANDOFF — 2026-04-22 IST
**From:** Claude Code (Session 19)
**To:** Antigravity
**Priority:** CRITICAL — Claude tokens expired, you have the ball

---

### SITUATION IN ONE LINE
jasmine_v2 LoRA is unusable. v3 training is blocked. Dataset has legs cropped off every image. No uncropped originals exist locally or on Drive.

---

### WHAT YOU NEED TO DO (in order)

**STEP 1 — Guide CEO to recover the original images from Kling**

CEO needs to log into Kling account and re-download the original training images at full resolution.

- Kling account email: kriger5490@gmail.com (check `00_agency/credentials.md` for password)
- Go to: kling.ai → Generation History
- Find the 10 batches of Jasmine images (generated 2026-04-18)
- Re-download each image at full resolution — must be **1536×2730** (9:16 2K native)
- The cropped versions on disk are **1536×2402** — reject these, they have legs cut off
- Save fresh downloads to: `/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset/`

If Kling history has expired or images are gone → regenerate using exact prompts in:
`03_ai_models/jasmine_mako/training_data/kling_generation_prompts.md` (Batches 1–10)

**STEP 2 — Once CEO has 40 fresh uncropped images, confirm to Claude**

When Claude is back (2 days), CEO tells Claude: "images recovered, proceed with v3 training"
Claude will then: check watermarks → write config → rent GPU → train → download safetensors

---

### WHAT CLAUDE LEFT READY (nothing for you to build)

- Full v3 training SOP: `00_agency/tasks/task-p0-07/v3_training_sop.md`
- Inference test script: `/tmp/test_v2_vastai.py` (Claude will update for v3)
- Training config sample prompts: already in SOP, sourced from `01_characters/jasmine/jasmine_generation_prompt.md`

---

### OPEN QUESTION FOR GROK (see GROK_OUTBOX)

One unresolved spec conflict — check GROK_OUTBOX for the 3 Grok questions. Grok needs to answer before Claude trains v3.

---

### PARALLEL WORK YOU CAN DO NOW

While CEO recovers dataset, you can work on other Phase 0 tasks:
- Content calendar for Instagram launch
- Caption templates for first 9 posts
- Bio copy for IG + Fanvue

Check `00_agency/jasmine_mako_task_table.md` for open Phase 1 items assigned to Antigravity.
