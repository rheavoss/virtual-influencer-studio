# Sara Dataset Plan — Grok Approved (PuLID + Flux.1-dev FP8)
**Date:** 2026-04-29 13:15 IST
**Status:** ✅ APPROVED EXECUTION PLAN
**Supersedes:** Qwen-Image-Edit Carousel Engine plan

## Logic Summary
Flux.1-dev FP8 + PuLID (EVA-CLIP + InsightFace) + Empty LatentImage.
Surgically locks face from sara_composite_v1.png while generating new outfits/poses/environments.
No VAEEncode, no extra LoRAs, no Qwen/GGUF, no RABBAI base.
Goal: 4 test images → QC → 25–30 dataset → Ostris training.

## Step 1 — Verify Pod
- Run `nvidia-smi` → confirm RTX 4090, 24GB VRAM

## Step 2 — Install PuLID for Flux
```bash
cd /workspace/ComfyUI/custom_nodes
git clone https://github.com/cubiq/ComfyUI_PuLID_Flux.git
cd ComfyUI_PuLID_Flux
pip install -r requirements.txt
# Restart ComfyUI after install
```

## Step 3 — Download PuLID Models
```bash
mkdir -p /workspace/ComfyUI/models/pulid
mkdir -p /workspace/ComfyUI/models/clip_vision
mkdir -p /workspace/ComfyUI/models/insightface

wget -q --show-progress https://huggingface.co/lllyasviel/PuLID/resolve/main/pulid_flux.safetensors \
  -O /workspace/ComfyUI/models/pulid/pulid_flux.safetensors

wget -q --show-progress https://huggingface.co/lllyasviel/PuLID/resolve/main/EVA02-CLIP-L-14-336.safetensors \
  -O /workspace/ComfyUI/models/clip_vision/EVA02-CLIP-L-14-336.safetensors

wget -q --show-progress https://huggingface.co/lllyasviel/PuLID/resolve/main/insightface/inswapper_128.onnx \
  -O /workspace/ComfyUI/models/insightface/inswapper_128.onnx
```

## Step 4 — Workflow Config
- Load standard Flux workflow or default PuLID example JSON
- DELETE: VAEEncode node, InstantX IP-Adapter node
- ADD: EmptyLatentImage (width=1024, height=1536)
- ADD: PuLID node → reference_image=sara_composite_v1.png, strength=0.85–1.0, start_timestep=4, end_timestep=8

## Step 5 — Prompts & Settings

**Positive template:**
`Sara, exact same woman as reference, stunning voluptuous hourglass figure, large natural breasts, narrow waist, wide hips, thick thighs, full curvy body, beautiful detailed face, long wavy hair, [OUTFIT AND SETTING], realistic skin texture, photorealistic, 8k, sharp focus, perfect anatomy, both feet firmly on the ground, correct toes, detailed feet`

**Negative:**
`blurry, low quality, deformed, mutated, extra limbs, bad anatomy, malformed feet, fused toes, extra toes, missing fingers, deformed hands, ugly, distorted proportions, cartoon, 3d render, painting, text, watermark, plastic skin, grid artifacts`

**Sampler:** Steps=28 · CFG=3.5 · Euler · Beta scheduler · Random seed per image

## Step 6 — 4 Test Images
1. Black cocktail dress, Parisian cafe, golden hour, looking at camera
2. White summer sundress, tropical beach balcony, ocean view, slight smile
3. Red lace lingerie, luxury hotel bed, soft bedroom lighting, relaxed pose
4. Casual jeans + crop top, modern city street at sunset, dynamic stride

## Step 7 — QC Checklist (ALL must pass)
- [ ] Face = near-perfect match to sara_composite_v1.png
- [ ] Body = voluptuous hourglass (large breasts, narrow waist, wide hips, thick thighs)
- [ ] Anatomy = perfect feet/toes/legs, both feet on ground
- [ ] Variation = new outfit + new environment (no seed copies)
- [ ] No artifacts = no blur, no grid, no malformations

Pass → "✅ PuLID test batch complete" + images
Fail → note exact issue, max 2 retries

## Step 8 — Next Phase
QC passed → 25–30 varied images → auto-captions → Ostris AI Toolkit training
(rank 16, LR 0.0001, 3000 steps)

## Grok Gate
Follow this plan exactly. Any deviation (new base model, extra LoRAs, Qwen, VAEEncode) = STOP and report to Grok.
