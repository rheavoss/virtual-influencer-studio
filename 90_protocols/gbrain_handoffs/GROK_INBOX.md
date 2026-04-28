# GROK INBOX — Questions or tasks for Grok

---

## BLOCKING QUESTION: Qwen-Image-Edit-2511 Model Format on RunPod
**Date:** 2026-04-28
**From:** Claude Code
**Priority:** BLOCKING — CEO cannot run Carousel Engine until this is confirmed

### Context
We are about to run the Carousel Engine on RunPod (RTX 4090 24GB) using ComfyUI + Qwen-Image-Edit-2511.
The YouTube transcripts (our source) specify the model must be loaded as **Q8 GUF quantized** format (not full precision) to fit in 24GB VRAM without quality loss.

Full pipeline context: `https://github.com/rheavoss/virtual-influencer-studio`
- Prompts ready: `00_agency/sara_carousel_prompts_final.md`
- Playbook: `00_agency/sara_dataset_and_training_playbook.md`

### Question (one answer needed)
When CEO launches the standard **RunPod ComfyUI template** and loads Qwen-Image-Edit-2511:

1. Does the template auto-download the Q8 GUF quantized checkpoint, OR must CEO manually download a specific quantized file from HuggingFace before running?
2. If manual: what is the exact HuggingFace repo + filename for the Q8 GUF quantized Qwen-Image-Edit-2511?
3. Is there a specific RunPod template (from Midnight Lab or transcript creator) that comes pre-loaded with the correct quantized model + all required nodes?

**This is the last unresolved question before CEO hits RunPod. Everything else is ready.**

---

## ~~TASK: Sara — Face-Swap + Carousel Engine Dataset Generation~~ [VOIDED 2026-04-28]
> **REASON VOIDED:** Grok cannot generate images. This task was incorrectly assigned.
> Carousel Engine = CEO action using ComfyUI + Qwen-Image-Edit on RunPod. See playbook: `00_agency/sara_dataset_and_training_playbook.md`
> Genesis Engine (Midnight Lab) is now the recommended first path — $10-20/mo membership + <$0.40/shoot. Try before Vast.ai training.

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
