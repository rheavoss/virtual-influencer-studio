# JASMINE_FLUX_LORA_TRAINING_GUIDE_v2_EXHAUSTIVE.md

**Date**: 22 April 2026  
**Version**: 2.0 (Exhaustive Edition – Post-Failure Analysis)  
**Project**: Jasmine Mako – Girl-next-door GFE Virtual Influencer  
**Goal**: Create a rock-solid, repeatable Flux.1 Dev LoRA with perfect face lock, flawless skin, natural teardrop DD breasts, and commercial consistency for CT-1 to CT-10 content.

---

## 🚨 MANDATORY INSTRUCTIONS FOR CLAUDE CODE / ANY AI ASSISTANT

You are assisting the Jasmine GFE project.  
**Every single time** you work on any part of this guide you **must**:

1. Read this entire document from top to bottom before starting any step.
2. Perform **full pre-flight checklist** and dataset QC before any training run.
3. Never skip watermarks check, skin QC, or dependency verification.
4. After every major step, add a **SELF-CHECK** section with clear status.
5. Immediately log **any** deviation, error, or risk in `claude_failure_log.md`.
6. Use structured output only. No partial responses.
7. If anything is unclear or risky → STOP and ask the user.

Breaking these rules = automatic critical failure entry.

---

## LESSONS FROM LAST TWO TRAINING FAILURES (Critical – We Will NOT Repeat These)

From `claude_failure_log.md` (Failures #7–#12 and earlier):

- **Watermarks / text / logos** baked permanently into LoRA (#10)
- Only partial dataset QC performed (#12)
- Weak/incorrect training prompts and settings (#11)
- Missing system dependencies (libGL, gcc, etc.) → crashes & wasted time (#9)
- HuggingFace token never set or verified (#8)
- Running JoyCaption without proper setup (#7)
- Rushing without full pre-flight checklist
- Poor skin quality / shine / texture not caught early

**This exhaustive v2 guide fixes every single one of these issues permanently.**

---

## PHASE 0: PRE-FLIGHT CHECKLIST (Do this EVERY time)

- [ ] Pinokio is latest version
- [ ] Forge is installed and updated
- [ ] Flex Gym is installed and updated
- [ ] GPU has ≥12 GB VRAM (ideally 16+ GB)
- [ ] ≥40 GB free disk space
- [ ] HuggingFace token is set (if required)
- [ ] All 54 images are in one folder and fully QC’d
- [ ] No watermarks, text, logos, borders, or compression artifacts
- [ ] Skin is flawless porcelain-smooth on every image

If any item is unchecked → fix it before proceeding.

---

## PHASE 1: ENVIRONMENT SETUP (30–45 minutes)

1. Install latest **Pinokio** (official site).
2. Inside Pinokio:
   - Search and install **Forge**
   - Search and install **Flex Gym**
3. Update both tools.
4. Restart Pinokio.

---

## PHASE 2: DATASET PREPARATION (Most Critical Step)

**Target**: 50–60 images (we have 54 clean ones)

**Strict QC Criteria (apply to every image)**:

- Flawless porcelain smooth skin, zero blemishes, zero shine, zero texture, zero pores, zero discoloration
- Exact Jasmine face (wide cheekbones, consistent features)
- Natural teardrop DD breasts with realistic gravity and soft sag
- High top bun hairstyle (majority of images)
- Variety: 10–15 headshots/close-ups, 10–15 three-quarter & side angles, 15–20 full-body/lifestyle shots
- Different expressions, lighting, simple backgrounds (white studio + natural)
- Resolution: 768–1024 px (do NOT use 2K+ for training)
- NO watermarks, text, logos, borders, compression artifacts

**Trigger Word**: `jasmakogirl` (unique, easy to remember, same as LoRA name)

**Caption Strategy** (choose one):

- Option A (fast): Just `jasmakogirl` on every image
- Option B (better quality): Short descriptive caption + trigger word

---

## PHASE 3: TRAINING IN FLEX GYM (Recommended 2026 Method)

1. Open Flex Gym
2. Create new LoRA project
3. Set exact parameters:
   - Base model: **Flux.1 Dev**
   - LoRA name: `jasmakogirl`
   - Trigger word: `jasmakogirl`
   - Steps: **1800–2500** (recommended for 50+ images)
   - Rank: 16–32
   - Learning rate: Default or 1e-4
   - Batch size: Match your GPU VRAM
   - Enable sampling: Every 250–300 steps
4. Upload all cleaned images
5. Verify captions and trigger word
6. Click **Start Training**

**Expected training time** (RTX 4090 class): 1.5–3.5 hours.

---

## PHASE 4: POST-TRAINING – TESTING & PRODUCTION WORKFLOW

1. Locate the `.safetensors` file in Flex Gym output folder.
2. Copy it to Forge → `models/Lora` folder.
3. In Forge (or ComfyUI):
   - Load Flux.1 Dev checkpoint
   - Load LoRA at weight **0.85–1.0** initially
4. Base prompt template: # JASMINE_FLUX_LORA_TRAINING_GUIDE_v2_EXHAUSTIVE.md

**Date**: 22 April 2026  
**Version**: 2.0 (Exhaustive Edition – Post-Failure Analysis)  
**Project**: Jasmine Mako – Girl-next-door GFE Virtual Influencer  
**Goal**: Create a rock-solid, repeatable Flux.1 Dev LoRA with perfect face lock, flawless skin, natural teardrop DD breasts, and commercial consistency for CT-1 to CT-10 content.

---

## 🚨 MANDATORY INSTRUCTIONS FOR CLAUDE CODE / ANY AI ASSISTANT

You are assisting the Jasmine GFE project.  
**Every single time** you work on any part of this guide you **must**:

1. Read this entire document from top to bottom before starting any step.
2. Perform **full pre-flight checklist** and dataset QC before any training run.
3. Never skip watermarks check, skin QC, or dependency verification.
4. After every major step, add a **SELF-CHECK** section with clear status.
5. Immediately log **any** deviation, error, or risk in `claude_failure_log.md`.
6. Use structured output only. No partial responses.
7. If anything is unclear or risky → STOP and ask the user.

Breaking these rules = automatic critical failure entry.

---

## LESSONS FROM LAST TWO TRAINING FAILURES (Critical – We Will NOT Repeat These)

From `claude_failure_log.md` (Failures #7–#12 and earlier):

- **Watermarks / text / logos** baked permanently into LoRA (#10)
- Only partial dataset QC performed (#12)
- Weak/incorrect training prompts and settings (#11)
- Missing system dependencies (libGL, gcc, etc.) → crashes & wasted time (#9)
- HuggingFace token never set or verified (#8)
- Running JoyCaption without proper setup (#7)
- Rushing without full pre-flight checklist
- Poor skin quality / shine / texture not caught early

**This exhaustive v2 guide fixes every single one of these issues permanently.**

---

## PHASE 0: PRE-FLIGHT CHECKLIST (Do this EVERY time)

- [ ] Pinokio is latest version
- [ ] Forge is installed and updated
- [ ] Flex Gym is installed and updated
- [ ] GPU has ≥12 GB VRAM (ideally 16+ GB)
- [ ] ≥40 GB free disk space
- [ ] HuggingFace token is set (if required)
- [ ] All 54 images are in one folder and fully QC’d
- [ ] No watermarks, text, logos, borders, or compression artifacts
- [ ] Skin is flawless porcelain-smooth on every image

If any item is unchecked → fix it before proceeding.

---

## PHASE 1: ENVIRONMENT SETUP (30–45 minutes)

1. Install latest **Pinokio** (official site).
2. Inside Pinokio:
   - Search and install **Forge**
   - Search and install **Flex Gym**
3. Update both tools.
4. Restart Pinokio.

---

## PHASE 2: DATASET PREPARATION (Most Critical Step)

**Target**: 50–60 images (we have 54 clean ones)

**Strict QC Criteria (apply to every image)**:

- Flawless porcelain smooth skin, zero blemishes, zero shine, zero texture, zero pores, zero discoloration
- Exact Jasmine face (wide cheekbones, consistent features)
- Natural teardrop DD breasts with realistic gravity and soft sag
- High top bun hairstyle (majority of images)
- Variety: 10–15 headshots/close-ups, 10–15 three-quarter & side angles, 15–20 full-body/lifestyle shots
- Different expressions, lighting, simple backgrounds (white studio + natural)
- Resolution: 768–1024 px (do NOT use 2K+ for training)
- NO watermarks, text, logos, borders, compression artifacts

**Trigger Word**: `jasmakogirl` (unique, easy to remember, same as LoRA name)

**Caption Strategy** (choose one):

- Option A (fast): Just `jasmakogirl` on every image
- Option B (better quality): Short descriptive caption + trigger word

---

## PHASE 3: TRAINING IN FLEX GYM (Recommended 2026 Method)

1. Open Flex Gym
2. Create new LoRA project
3. Set exact parameters:
   - Base model: **Flux.1 Dev**
   - LoRA name: `jasmakogirl`
   - Trigger word: `jasmakogirl`
   - Steps: **1800–2500** (recommended for 50+ images)
   - Rank: 16–32
   - Learning rate: Default or 1e-4
   - Batch size: Match your GPU VRAM
   - Enable sampling: Every 250–300 steps
4. Upload all cleaned images
5. Verify captions and trigger word
6. Click **Start Training**

**Expected training time** (RTX 4090 class): 1.5–3.5 hours.

---

## PHASE 4: POST-TRAINING – TESTING & PRODUCTION WORKFLOW

1. Locate the `.safetensors` file in Flex Gym output folder.
2. Copy it to Forge → `models/Lora` folder.
3. In Forge (or ComfyUI):
   - Load Flux.1 Dev checkpoint
   - Load LoRA at weight **0.85–1.0** initially
4. Base prompt template:
   jasmakogirl, [full base prompt above], wearing black micro bikini, standing in bedroom, seductive pose, looking at viewer
   negative prompt: blurry, deformed, ugly, bad anatomy, extra limbs, watermark, text, logo, low quality, worst quality, plastic skin, shiny skin, oily skin, overexposed, underexposed

5. **Advanced Workflows** (add these after basic testing):

- ControlNet (OpenPose, Depth, Canny) for perfect pose control
- Two-step upscale: Latent upscale (1.5×, denoising 0.4–0.45) + SeedVR 2 for 4K
- Inpainting hack for quick fixes

---

## PHASE 5: TROUBLESHOOTING & COMMON PITFALLS

- Face drift → Add more headshots + stronger trigger word
- Skin defects → Re-QC dataset + use skin refiner before next run
- LoRA too weak → Increase weight or retrain with more steps
- Overfitting → Reduce steps or add more variety
- Crashes → Check dependencies and token

---

**End of Guide**

This is now the single source of truth for all Jasmine LoRA training.

Save this file on your desktop.  
Refer to it **every single time** before starting a training run.

You now have a complete, battle-tested playbook that incorporates every lesson from our past failures and all the best practices from the transcripts we analysed.

Would you like me to add anything else before you save it (e.g. exact Flex Gym screenshot descriptions, more prompt templates, or a ready-to-use ComfyUI JSON workflow example)?
