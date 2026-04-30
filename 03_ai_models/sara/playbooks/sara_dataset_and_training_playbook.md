# SARA — Dataset + Training Playbook
**Source:** YouTube transcripts (Qwen LoRA workflow series)
**Created:** 2026-04-27
**Character:** Sara | Trigger word: `saragirl`
**Status:** ACTIVE — replaces all Jasmine/inkqueen docs

---

## THE EXACT 5-PHASE WORKFLOW

---

### PHASE 1 — FACE SWAP (one time, CEO action)

**Goal:** Produce 1 composite image — Sara's face on the correct body

**Tool:** Any face-swap ComfyUI workflow (Mimic PC / faceswapper.ai / Reactor node)

**Steps:**
1. Open face-swap tool
2. Input A: `sara_face_ref.jpg` (Sara's face)
3. Input B: `body_donor.jpg` (red bikini Maui balcony body)
4. Run → download result
5. Save as `01_characters/sara/face_reference/sara_composite_v1.png`

**Notes from transcript:**
- No tattoos on body donor preferred — ✅ already done
- Do this once. All 25 dataset images come from this 1 composite.

**STATUS: ✅ COMPLETE** — `sara_composite_v1.png` locked. Face crop also generated (`sara_face_crop.jpg`).

---

### PHASE 2 — DATASET GENERATION (Claude action, ComfyUI + PuLID + Flux on RunPod)

> ⚠️ **Qwen pipeline ABANDONED** — Lightning LoRA poisoning + tensor mismatch + grid artifacts. See `20260429_qwen_image_edit_failure_analysis.md`. Do NOT use Qwen for dataset generation.

**Goal:** Generate 25–30 varied pose images from sara_composite_v1.png with consistent face

**Tool:** ComfyUI on RunPod RTX 4090 + PuLID Flux node
**Full SOP:** `00_agency/session_logs/2026-04-29_sara_pulid_session_log.md`

**Confirmed working stack (2026-04-29):**
- Node: `balazik/ComfyUI-PuLID-Flux` (master) — NOT cubiq (SDXL only)
- Base: `flux1-dev-fp8.safetensors` (Comfy-Org, public)
- PuLID model: `pulid_flux_v0.9.1.safetensors` (guozinan/PuLID)
- CLIP: `clip_l.safetensors` + `t5xxl_fp8_e4m3fn.safetensors` (comfyanonymous)
- VAE: `ae.safetensors` (black-forest-labs, needs HF token)
- InsightFace: antelopev2 (MonsterMMORPG)
- EVA-CLIP: `EVA02_CLIP_L_336_psz14_s6B.pt` (QuanSun, place in models/clip/)

**Critical settings (CEO-approved 2026-04-29):**
| Parameter | Value | Why |
|---|---|---|
| FluxGuidance node | guidance=3.5 | MANDATORY — without this = cartoon output |
| KSampler CFG | **1.0** | Flux ignores KSampler CFG — guidance from FluxGuidance |
| Steps | 28 | Quality vs speed balance |
| Sampler | euler | Grok spec |
| Scheduler | beta | Grok spec |
| Denoise | 1.0 | txt2img from scratch |
| PuLID weight | **0.95–1.0** | Grok SARA_BODY_FIX_001 (was 0.9) |
| PuLID start_timestep | 4 | Grok spec |
| PuLID end_timestep | 8 | Grok spec |
| PuLID method | (not required for balazik node) | |
| Resolution | 1024×1536 | Portrait, ~1.5MP |

**Required patch to node (ComfyUI 0.20.1 compat):**
Add `**kwargs` to `forward_orig` in `pulidflux.py` — without this: `forward_orig() got unexpected keyword argument 'timestep_zero_index'`

**✅ GROK DECISION (SARA_BODY_FIX_001 — 2026-04-29):**
- Body fix method: **stronger txt2img prompt only** — img2img at denoise=0.65 REJECTED
- PuLID strength: **0.95–1.0** (was 0.9), start_timestep: 4, end_timestep: 8
- Dataset size: **25–30 images** confirmed

**LOCKED body descriptor (use verbatim in every prompt):**
```
41 year old white woman, 5 feet 2 inches tall, 130 pounds, extremely voluptuous hourglass figure, 42-27-41 inch measurements, massive natural 32H breasts with realistic weight and soft movement, deep cleavage, soft realistic belly with natural softness and slight belly pooch, narrow waist, very wide hips, thick juicy thighs, full round ass, curvy soft body with realistic fat distribution and natural skin folds, realistic detailed skin texture with visible pores, subtle imperfections and natural skin sheen, photorealistic
```

**Full positive prompt template:**
```
Sara, exact same woman as in reference photo, 41 year old white woman, 5 feet 2 inches tall, 130 pounds, extremely voluptuous hourglass figure, 42-27-41 inch measurements, massive natural 32H breasts with realistic weight and soft movement, deep cleavage, soft realistic belly with natural softness and slight belly pooch, narrow waist, very wide hips, thick juicy thighs, full round ass, curvy soft body with realistic fat distribution and natural skin folds, realistic detailed skin texture with visible pores, subtle imperfections and natural skin sheen, photorealistic, 8k, sharp focus, perfect anatomy, both feet firmly on the ground, correct toes, detailed feet, long straight dark brunette hair worn down loose, no bun, no updo, blue eyes, [OUTFIT AND SETTING]
```

**Negative prompt:**
```
blurry, low quality, deformed, mutated, extra limbs, bad anatomy, malformed feet, fused toes, extra toes, missing fingers, deformed hands, ugly, distorted proportions, cartoon, 3d render, painting, text, watermark, plastic skin, waxy skin, barbie skin, airbrushed skin, overly smooth skin, slim athletic body, flat chest, narrow hips, small breasts, grid artifacts, bun, updo
```

**Workflow:** Use `sara_pulid_batch.py` script (Claude writes, runs inside pod via SSH, calls localhost:8188)

**The 25 pose prompts for Sara:**
```
1. saragirl, standing front, white triangle bikini, pool edge, bright sunlight, full body
2. saragirl, standing 3/4 angle, red bikini, beach, golden hour light, full body
3. saragirl, sitting at pool edge, feet in water, black bikini, outdoor pool
4. saragirl, walking toward camera, floral sundress, street, daytime, full body
5. saragirl, leaning on railing, crop top and high-waist jeans, rooftop city view
6. saragirl, sitting cross-legged on bed, oversized white tee, cozy bedroom
7. saragirl, standing gym mirror selfie, sports bra and leggings, gym
8. saragirl, sitting at cafe table laughing, summer dress, outdoor cafe
9. saragirl, lying on beach towel propped on elbows, bikini, beach
10. saragirl, standing in kitchen, casual tank top and shorts, modern kitchen
11. saragirl, kneeling on bed looking at camera, lace lingerie fully covered, soft bedroom lighting
12. saragirl, leaning against wall arms raised, leather jacket and bodysuit, street night
13. saragirl, standing in doorway, swimsuit coverup, resort hotel
14. saragirl, sitting on couch legs tucked, body-con mini dress, living room
15. saragirl, portrait shoulders up wet hair steamy, bathroom
16. saragirl, walking on beach wind in hair, white bikini, waves crashing
17. saragirl, sitting in car arm out window, casual outfit sunglasses, daytime
18. saragirl, standing by apartment window golden light, sheer top visible bra underneath
19. saragirl, gym mirror selfie hand on hip, high-waist shorts and sports bra
20. saragirl, lying on bed reading relaxed, casual pyjamas, bedroom
21. saragirl, back to camera looking over shoulder, bikini, pool edge
22. saragirl, seated on chair legs crossed, elegant evening dress, luxury interior
23. saragirl, outdoor cafe laughing at phone, light summer outfit
24. saragirl, standing by hotel window arms raised, short silk robe, city view
25. saragirl, standing front hand on hip confident, black bikini, clean white studio
```

**Output:** 20-25 PNG images, varied lighting 2700K–6500K, consistent face, clean background

---

### PHASE 3 — CAPTIONING (Claude action)

**Goal:** Create .txt caption file for every image

**Tool:** GPT — upload images in batches of 5, ask it to describe each

**Exact GPT instruction:**
> "Describe each of these photos in detail. For each description, start with the trigger word `saragirl` followed by a comma. Include: clothing, pose, setting, lighting, mood. Keep each description under 100 words."

**Rules:**
- Every caption MUST start with `saragirl,`
- .txt filename must match image filename exactly (e.g. `sara_01.png` → `sara_01.txt`)
- Pack all images + .txt files into one folder: `03_ai_models/sara/training_data/TRAINING_DATASET_YYYYMMDD_XX_images/`

**Claude handles this entirely once images are received.**

---

### PHASE 4 — TRAINING (Claude action, Vast.ai)

**Tool:** Vast.ai + ostris/ai-toolkit
**Config:** `train_lora_qwen_image_24gb.yaml` (ships with ai-toolkit repo)
**Base model:** `Qwen/Qwen-Image-Edit-2511` (NOT gated — no HF token needed)

**Proven hyperparameters:**
| Parameter | Value |
|---|---|
| Rank | 16 |
| Alpha | 16 |
| LR | 0.0001 |
| Steps | 3000–4000 |
| Optimizer | AdamW8Bit |
| Scheduler | cosine |
| Precision | bf16 |
| Batch size | 1 |
| Trigger word | saragirl |

**Vast.ai instance:** RTX 4090 24GB, pytorch 2.5.1 image, inet_down>=500

**Claude runs this end-to-end once dataset + captions are ready.**

---

### PHASE 5 — INFERENCE / CONTENT GENERATION (ComfyUI)

**Workflow:** Two-sampler + face detailer
- Sampler 1: Base render from prompts (50 steps)
- Sampler 2: Refinement / cleanup pass
- Face detailer: Uses character LoRA — keeps face consistent
- Optional: Depth map pass for 3D realism
- Optional: Skin detailer workflow

**LoRA stack at inference:**
- 1GIRL Qwen v3
- NiceGirls UltraReal
- SamsungCam
- sara_v1.safetensors (character LoRA)

**ControlNet:** InstantX Qwen Image ControlNet Union — for pose reference images

**RunPod template:** Available from transcript creator (link in their description)

---

## WHAT EACH TEAM MEMBER DOES

| Phase | Who | Tool |
|---|---|---|
| Face swap | CEO | faceswapper.ai or Mimic PC |
| Carousel 25 poses | CEO | ComfyUI + Qwen on RunPod |
| Captions | Claude | GPT batch |
| Training | Claude | Vast.ai + ai-toolkit |
| Inference/content | Claude | ComfyUI on RunPod |

---

## ✅ CONFIRMED PATH — Option C: Carousel Engine (Grok-validated 2026-04-28)

**Grok decision:** Option C is lowest-risk, highest-success-probability. Matches transcripts exactly.
**Full playbook:** Phase 2 above (25 preset prompts, style LoRA stack, CFG=1, 6 steps, Euler+Beta)

**Spec corrections (Grok had stale data — ignore these in Grok's response):**
- Body donor = **red bikini** (Maui balcony) — NOT blue dress
- Eye color = **blue** — NOT green

**Dataset target:** 25–30 images (20 minimum, 35+ risks dilution per Grok)

---

## Option A — Qwen Multi-Angles LoRA (test only if Option C underperforms)

**Full checklist:** `00_agency/sara_free_multiangle_checklist.md`
Grok: "Promising but least validated for photorealistic Caucasian characters April 2026."

---

## Option B — Genesis Engine (Paid — $10–20/mo, fallback only)

**What it is:** Midnight Lab Genesis Engine = Qwen Image Edit 2511 + Lightning LoRA + Gemini 2.5 Pro art director. No LoRA training required. 1 face image → 10 consistent shots.

**Cost (April 2026 verified):**

| Item | Cost |
|---|---|
| Midnight Lab membership (Ghost tier — full access) | **$10–20/month** |
| Genesis Engine workflow (individual, one-time) | $10–15 one-time |
| Lightning LoRA + Angle LoRA | Included in membership |
| Gemini 2.5 Pro per 10-shot run | $0.01–0.05 |
| Qwen Image Edit inference (RunPod) per 10 images | $0.20–0.30 |
| **Total per 10-shot photoshoot** | **Under $0.40** |

**Recommendation:** Join Midnight Lab membership ($10–20/mo) → get Genesis Engine V2 + all other workflows (Carousel, Muse Engine, etc.) + all future updates.

**Source:** Midnight Lab Gumroad → midnightlab.gumroad.com/l/labmembers

---

## CURRENT STATUS

- [x] Sara character bible created
- [x] Face reference locked (`sara_face_ref.jpg`) — blue eyes, dark hair
- [x] Body donor locked (`body_donor.jpg`) — red bikini, Maui balcony, watermark cropped
- [x] Composite locked (`sara_composite_v1.png` — swap_2026-04-27_23-58-46)
- [x] Pipeline validated by Grok (2026-04-28) — Option C confirmed
- [x] **Phase 2 GENERATED** — 25 dataset images generated via fal.ai API. Output: `03_ai_models/sara/training_data/dataset_raw/sara_01–25.png`. Cost: ~$1/25 images.
- [x] **Phase 3 COMPLETE** — 25 captions written alongside PNGs. Files: `sara_01–25.txt`. NOTE: captions are for rejected images — must be rewritten once new dataset is approved.
- [x] Training config saved: `03_ai_models/sara/training_configs/sara_v1_lora.yaml`
- [ ] **Phase 2 QC: ❌ REJECTED (2026-04-29)** — All 25 images rejected by CEO. Issue: plastic skin — waxy/airbrushed appearance, not photorealistic. Dataset unusable for training.
- [ ] **NEXT: Regenerate dataset** — Fix plastic skin before training. New pipeline or prompt fix required. Grok gate mandatory before proceeding.
- [ ] Claude trains on Vast.ai — BLOCKED until new dataset approved by CEO
- [ ] Claude + CEO: Verify Sara LoRA output → lock character permanently

## ACTUAL PATH TAKEN (differs from original plan)

| Step | Planned | Actual |
|---|---|---|
| Dataset generation | CEO on RunPod/ComfyUI | Claude via fal.ai Python API — no CEO involvement |
| Captioning | GPT batch | Claude from visual inspection — more accurate |
| Training model | GGUF Q8 for inference | Full HF model `Qwen/Qwen2.5-VL-7B-Instruct` for training |
| CEO involvement | Phases 1, 2 | Phase 1 only (face swap) |
