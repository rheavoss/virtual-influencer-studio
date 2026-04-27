# GROK INBOX — Questions or tasks for Grok

---

## TASK: Sara — Face-Swap + Carousel Engine Dataset Generation
**Date:** 2026-04-27
**From:** Claude Code
**Priority:** HIGH — blocks all training
**Character:** Sara (trigger: `saragirl`) — new character replacing Jasmine/inkqueen

### CONTEXT
We have locked Sara's character spec:
- White Caucasian, 24yo, long jet black hair, green eyes, strong dark brows
- Body: large bust (34DD), defined 26" waist, 38" hips — hourglass
- No tattoos, no piercings except ears
- Content ceiling: Option A (Lena Paul level — nipples always covered)

Two reference images are in the GitHub repo:
- **Face:** `01_characters/sara/face_reference/sara_face_ref.jpg`
- **Body donor:** `01_characters/sara/face_reference/body_donor.jpg`

Repo: `https://github.com/rheavoss/virtual-influencer-studio`

---

### STEP 1 — FACE-SWAP
Use your best face-swap tool (Reactor, InsightFace, or equivalent) to:
- Take Sara's face from `sara_face_ref.jpg`
- Paste it onto the body in `body_donor.jpg`
- Result: 1 composite image — Sara's face + correct body proportions
- Requirements: skin tone must blend at neck, hair must flow naturally, no seam artifacts

---

### STEP 2 — CAROUSEL ENGINE (25 poses)
Using the face-swapped composite as the seed image, generate 25 varied poses via Qwen-Image-Edit.

**Non-negotiable rules for ALL 25 images:**
- Same face (Sara's green eyes, dark hair, strong brows) — locked
- Same body proportions (large bust, defined waist, hourglass) — locked
- Nipples covered in every single image — no exceptions
- No tattoos visible
- Photorealistic, natural lighting, 8k quality

**The 25 poses:**

| # | Pose | Outfit | Setting |
|---|---|---|---|
| 01 | Standing front, slight smile | White triangle bikini | Pool edge, bright day |
| 02 | Standing 3/4 angle | Red bikini | Beach, golden hour |
| 03 | Sitting pool edge, feet in water | Black bikini | Outdoor pool |
| 04 | Walking toward camera | Floral sundress | Street, daytime |
| 05 | Leaning on railing, arms crossed | Crop top + high-waist jeans | Rooftop city view |
| 06 | Sitting cross-legged on bed | Oversized white tee | Cozy bedroom |
| 07 | Standing mirror selfie | Sports bra + leggings | Gym |
| 08 | Sitting at cafe table, laughing | Summer dress | Outdoor cafe |
| 09 | Lying on beach towel, propped on elbows | Bikini | Beach |
| 10 | Standing in kitchen | Casual tank + shorts | Modern kitchen |
| 11 | Kneeling on bed, looking at camera | Lace lingerie (fully covered) | Soft bedroom lighting |
| 12 | Leaning against wall, arms raised | Leather jacket + bodysuit | Street, night |
| 13 | Standing in doorway | Swimsuit coverup | Resort/hotel |
| 14 | Sitting on couch, legs tucked | Body-con mini dress | Living room |
| 15 | Shoulders-up, wet hair, steamy | Bare shoulders only (collarbone up) | Shower/bathroom |
| 16 | Walking on beach, wind in hair | White bikini | Beach, waves |
| 17 | Sitting in car, arm out window | Casual outfit, sunglasses | Car interior |
| 18 | Standing by window, golden light | Sheer top + visible bra | Apartment |
| 19 | Gym mirror selfie, hand on hip | High-waist shorts + sports bra | Gym |
| 20 | Lying on bed, reading, relaxed | Casual pyjamas | Bedroom |
| 21 | Back to camera, looking over shoulder | Bikini bottom | Pool edge |
| 22 | Seated on chair, legs crossed | Elegant evening dress | Luxury interior |
| 23 | Outdoor cafe, laughing at phone | Light summer outfit | Street cafe |
| 24 | Standing by hotel window, arms raised | Short silk robe | Hotel room, city view |
| 25 | Standing front, hand on hip, confident | Black bikini | Clean white studio |

---

### OUTPUT REQUIREMENTS
- 25 PNG or JPG images, minimum 1024×1024px, ideally 1536×2048px portrait
- Save to a folder named `sara_carousel_dataset`
- Share folder or individual images back to CEO
- CEO will drop them into `03_ai_models/sara/training_data/dataset_raw/`

### WHAT HAPPENS NEXT
Claude captions all 25 images → trains Qwen-Image-Edit-2511 LoRA on Vast.ai → Sara character locked permanently.

**Do not proceed to Vast.ai or any spend until these 25 images are delivered and approved by CEO.**

---

## CRITICAL RESEARCH REQUEST: Switch from FLUX to Qwen-Image LoRA Pipeline
**Date:** 2026-04-27
**From:** Claude Code
**Priority:** CRITICAL — project survival. 5 failed FLUX LoRA training attempts. CEO has declared FLUX abandoned.
**Decision needed:** Full Qwen-Image character LoRA pipeline spec before we spend another dollar.

---

### BACKGROUND — Why We're Switching

5 FLUX.1-dev LoRA training attempts across Jasmine (v1–v4) and inkqueen (v1):
- **v1**: Skin defect QC failure
- **v2**: Watermark baked into weights
- **v3**: Blocked — all 40 images leg-cropped (wrong resolution)
- **v4**: 27/62 images had artifacts; only 31 usable. Trained. Moderate results.
- **inkqueen v1**: Trained 2000 steps. Body renders as BBW/plus-size on full-body shots. Tattoo style inconsistent every generation. Body spec (36-28-45, 28" waist) not learned.

YouTube creators using **Qwen-Image** (not FLUX) are getting superior, consistent character outputs: correct body proportions, locked face, consistent style. We have identified the full stack they use. We need Grok to validate it end-to-end before we proceed.

---

### THE STACK WE IDENTIFIED (needs Grok validation)

From YouTube tutorials (transcripts reviewed by Claude):
- **Base model**: `Qwen/Qwen-Image-Edit-2511` (HuggingFace)
- **Training tool**: ostris/ai-toolkit — example config `train_lora_qwen_image_24gb.yaml`
- **Inference**: ComfyUI + InstantX `Qwen-Image-ControlNet-Union` (pose + depth + canny + edge)
- **Style LoRAs stacked at inference**: 1GIRL QWEN-IMAGE v3.0 + NiceGirls UltraReal v0.5 + SamsungCam UltraReal
- **Face detailer**: ComfyUI face detailer node with character LoRA re-applied
- **Dataset**: 20–40 images, same caption format

---

### RESEARCH QUESTIONS — Grok must answer ALL before we proceed

#### Q1 — Model Validation
- Is `Qwen/Qwen-Image-Edit-2511` the correct model for character LoRA training in 2026? Or is there a newer/better Qwen-Image variant (2512, 2.0, etc.)?
- Is the "Edit" variant better for LoRA training than the base T2I model? Why/why not?
- Any known architecture issues or limitations for photorealistic human character LoRAs specifically?
- What VRAM does Qwen-Image-Edit-2511 require for inference at 768×1024? Does it fit on RTX 4090 24GB?

#### Q2 — ai-toolkit Qwen-Image Config (CRITICAL)
- Does the `train_lora_qwen_image_24gb.yaml` example in ai-toolkit actually work for Qwen-Image-Edit-2511, or is it for a different variant?
- What are the PROVEN working hyperparameters for a character/person LoRA on Qwen-Image: steps, rank, lr, batch size, optimizer?
- Does Qwen-Image LoRA training require a HuggingFace token? Is the model gated?
- Any known issues with ai-toolkit + Qwen-Image (missing dependencies, import errors, CUDA versions)?
- Recommended Vast.ai docker image for Qwen-Image training (we know `runtime` not `devel` — does this still apply)?

#### Q3 — Dataset Strategy
- For a consistent body-type character (specific measurements: 36-28-45 waist, large bust, tattoos): how many training images minimum? What pose/shot variety is needed?
- The YouTubers generate their dataset synthetically using Qwen-Image-Edit itself (face swap → generate 20-25 poses). Is this better than real photos for character LoRA? Why?
- Caption strategy for Qwen-Image LoRA: trigger word only? Detailed per-image descriptions? JoyCaption still recommended?
- Can we reuse our existing 40 inkqueen images (real photos, JPG, 512–1024px), or must dataset be regenerated for Qwen-Image?

#### Q4 — Inference Pipeline Validation
- Confirm: does `InstantX/Qwen-Image-ControlNet-Union` work in ComfyUI for pose control? Is it production stable?
- The style LoRAs (1GIRL QWEN-IMAGE v3.0, NiceGirls UltraReal, SamsungCam) — do they actually improve character output consistency and body realism, or are they marketing? Real user results?
- Two-sampler pass + face detailer — is this standard ComfyUI setup? Any guide or workflow link?
- Does RunPod have a ready ComfyUI template with Qwen-Image + ControlNet pre-loaded? Or must we build from scratch?

#### Q5 — Cost Estimate
- Qwen-Image-Edit-2511 model size? Download cost on Vast.ai at $0.039/GB?
- Estimated training time for 2000 steps, 40 images, RTX 4090?
- Total estimated cost per training run (GPU compute + model download + storage)?
- Is the model cached if we reuse the same Vast.ai instance, or does it re-download every time?

#### Q6 — Known Failure Modes (MOST IMPORTANT)
- What are the top 3 ways Qwen-Image character LoRAs fail in production?
- Body size / measurements: does Qwen-Image actually learn specific body proportions from captions (e.g., "36-28-45")? Or does it have the same problem as FLUX?
- Tattoo style consistency: does Qwen-Image lock tattoo styles better than FLUX, or is this a dataset problem regardless of base model?
- Any creators who've trained AI influencer character LoRAs on Qwen-Image and published results? Links?

---

### WHAT CLAUDE HAS ALREADY CONFIRMED (do not re-research)
- ai-toolkit supports Qwen-Image LoRA (example config exists in repo)
- InstantX ControlNet-Union released and HuggingFace URL confirmed
- All 3 style LoRAs exist on CivitAI and are free
- ComfyUI has official Qwen-Image workflow at docs.comfy.org
- VRAM needed: 24GB minimum

### WHAT GROK MUST VALIDATE
All 6 question sets above. Specifically Q2 (exact working hyperparameters), Q3 (synthetic dataset vs real photos), and Q6 (known failure modes) are BLOCKING.

**Do NOT proceed to any Vast.ai instance, training run, or spend until Grok clears this gate.**

---

## RESEARCH REQUEST: Jasmine v3 LoRA Training Pipeline
**Date:** 2026-04-25
**From:** Claude
**Priority:** CRITICAL — blocks training execution
**Context:** We have 62 curated training images in `/Users/user/Desktop/jasmine_lora_v3/`. All images have Kling AI watermark bottom-right corner. Previous v2 LoRA failed because watermarks were baked into weights during training. v3 must not repeat this.

**Research needed before we touch any tool:**

### Q1 — Watermark Removal
- Best current tool for batch Kling watermark removal on 62 PNGs (1536×2720): lama-cleaner vs iopaint vs any newer 2025/2026 alternative?
- Can lama-cleaner run on Mac CPU for 62 images in reasonable time, or is GPU mandatory?
- Any known issues with lama-cleaner leaving artifacts at inpaint boundary?
- Is there a batch CLI command (loop over folder) or must each image be processed individually?

### Q2 — Caption Strategy
- For a face/character LoRA (FLUX.1 Dev, ai-toolkit/ostris), what caption strategy produces sharpest identity lock: (a) trigger word only, (b) trigger word + detailed description per image, (c) JoyCaption auto-generated per image?
- Is JoyCaption still the recommended captioning tool for FLUX.1 LoRA in 2026?
- With 62 images (mix of face close-ups, full-body, seated, rear views), does caption strategy differ by image type?

### Q3 — Training Config Validation
- We were going to use: 2000 steps, rank 16, lr 1e-4, bf16, quantize true. Dataset was 40 images. Now it's 62 images. Should steps, rank, or lr change?
- Is 62 images too many (overfitting risk) or still in safe range for FLUX.1 Dev LoRA?
- Any ai-toolkit (ostris) updates since April 2026 that change recommended settings?

**Decision needed:** Watermark tool + caption approach + final config params. Do NOT proceed to Vast.ai until Grok clears this.

---

## RESEARCH REQUEST: Alua Platform Viability
**Date:** 2026-04-24
**From:** Claude
**Priority:** High — blocks platform strategy decision

**Context:** @myvonnieta (AI influencer) uses Alua as primary monetization destination from IG. Alua offers 80% revenue share, internal discovery (5M fans), built-in chat monetization, geo-blocking. Considering running Alua + Fanvue both Day 1.

**Questions for Grok to research:**
1. Does Alua allow AI-generated / virtual creator content? Any policy against it?
2. Does Alua have real internal discovery — do new creators actually get organic fans, or is it bring-your-own-traffic like OnlyFans?
3. India payout options — can Indian creators withdraw? Which methods (Wise, crypto, bank transfer)?
4. Alua revenue split — confirmed 80%? Any hidden fees?
5. Any known issues with Alua (bans, payout delays, content takedowns for AI accounts)?

**Decision pending:** Alua + Fanvue both Day 1 vs Fanvue only. Do NOT finalize until Grok clears this.
