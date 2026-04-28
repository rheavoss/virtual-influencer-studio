# SARA OPTION C — FULL SETUP & EXECUTION CHECKLIST
**Date:** 2026-04-28
**Source:** Grok-validated + Claude-verified links
**Pipeline:** Qwen-Image-Edit-2511 Carousel Engine (free, validated)
**Trigger word:** `saragirl`
**Goal:** 25–30 varied consistent Sara images for LoRA training

---

## REFERENCE FILES (all in project)
| File | Path | Purpose |
|---|---|---|
| Face reference | `01_characters/sara/face_reference/sara_face_ref.jpg` | Blue eyes, dark hair |
| Body donor | `01_characters/sara/face_reference/body_donor.jpg` | Red bikini Maui balcony |
| Full composite | `01_characters/sara/face_reference/sara_composite_v1.png` | Carousel seed — body |
| Face crop | `01_characters/sara/face_reference/sara_face_crop.jpg` | Carousel seed — face identity |

---

## STEP 1 — LAUNCH RUNPOD (CEO, ~5 min)

1. Go to https://runpod.io → Launch New Pod
2. Template: **ComfyUI** (latest)
3. GPU: **RTX 4090** (24GB)
4. Disk: **50GB+**
5. Cost: ~$0.44–0.50/hr
6. Open ComfyUI link once running

---

## STEP 2 — DOWNLOAD MODEL + LoRAs (CEO, RunPod terminal)

```bash
# Qwen-Image-Edit-2511 Q8 GGUF — fits 24GB VRAM exactly
cd /workspace/ComfyUI/models/unet
wget https://huggingface.co/unsloth/Qwen-Image-Edit-2511-GGUF/resolve/main/qwen-image-edit-2511-Q8_0.gguf

# SamsungCam UltraReal — also on HuggingFace (faster than CivitAI)
cd /workspace/ComfyUI/models/loras
wget https://huggingface.co/Danrisi/Qwen-image_SamsungCam_UltraReal/resolve/main/Qwen-image_SamsungCam_UltraReal.safetensors -O samsungcam_ultrareal.safetensors
```

**Download from CivitAI** (use CivitAI Manager in ComfyUI or browser download):
- 1GIRL Qwen Image v3.0 → https://civitai.com/models/1923241/1girl-qwen-image
- NiceGirls UltraReal v0.5 → https://civitai.com/models/1862761/nicegirls-ultrareal
- SamsungCam UltraReal → https://civitai.com/models/1551668/samsungcam-ultrareal

**Lightning LoRA** — search "Qwen Lightning LoRA" on CivitAI or use the one from the transcript creator's Patreon.

**Install ComfyUI-GGUF node** (if not present):
ComfyUI Manager → Search "GGUF" → Install → Restart ComfyUI

---

## STEP 3 — GET THE WORKFLOW JSON (CEO)

**Option A — Pre-built GGUF workflow (recommended):**
Download from CivitAI: https://civitai.com/models/1879666
(ComfyUI beginner-friendly Image-to-Image QWEN GGUF Workflow by SarcasticTOFU — includes LoRA support)

**Option B — Manual build:**
Load standard Qwen-Image-Edit workflow → swap UNet loader for GGUF loader node

---

## STEP 4 — CONFIGURE & RUN (CEO)

Load workflow in ComfyUI, set exactly:

| Node | Setting | Value |
|---|---|---|
| UNET Loader (GGUF) | Model | `qwen-image-edit-2511-Q8_0.gguf` |
| LoRA Stack | 1GIRL Qwen v3.0 | strength **0.85** |
| LoRA Stack | NiceGirls UltraReal v0.5 | strength **0.80** |
| LoRA Stack | SamsungCam UltraReal | strength **0.75** |
| LoRA Stack | Lightning LoRA | strength **1.0** |
| Input Image | Seed (body) | `sara_composite_v1.png` |
| Input Image | Face lock | `sara_face_crop.jpg` |
| CR Prompt List | Prompts | 25 prompts from `sara_carousel_prompts_final.md` |
| KSampler | CFG | **1.0** |
| KSampler | Steps | **6** |
| KSampler | Sampler | **Euler** |
| KSampler | Scheduler | **Beta** |
| KSampler | Noise | **1.0** |
| Image Size | Resolution | **1024×1536** (portrait, ~1 megapixel) |

**Negative prompt** (paste into negative node):
```
cartoon, anime, CGI, 3d render, plastic skin, watermark, text, logo,
nudity, topless, nipples, tattoos, Asian features, extra limbs,
deformed hands, bad anatomy, blurry, out of focus, ponytail, updo
```

Run → generate 25–30 images → download full output folder.

---

## STEP 5 — HAND TO CLAUDE (Claude takes over)

Upload all output images. Claude will:
1. 100% visual QC — reject fails, flag any content ceiling violations
2. GPT-batch caption every approved image (`saragirl,` prefix on every caption)
3. Package dataset with matching `.txt` files
4. Provide exact Vast.ai training config (Rank 16, LR 0.0001, 3000 steps, AdamW8Bit)
5. Run training end-to-end

**Do NOT start training until Claude approves the full dataset.**

---

## COST SUMMARY
| Item | Cost |
|---|---|
| RunPod RTX 4090 ~1hr | ~$0.50 = ₹42 |
| Vast.ai training ~2hrs | ~$0.90 = ₹75 |
| Models + LoRAs | Free |
| **Total** | **~₹117 ($1.40)** |
