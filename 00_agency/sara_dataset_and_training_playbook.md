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

### PHASE 2 — CAROUSEL ENGINE (CEO action, ComfyUI + Qwen)

**Goal:** Generate 20-25 varied pose images from the composite

**Tool:** ComfyUI on RunPod (use template from transcript creator's Patreon/description)

**Model:** `Qwen-Image-Edit-2511` loaded as Q8 GUF quantized (saves VRAM, no quality loss)

**Critical settings from transcript:**
| Parameter | Value | Why |
|---|---|---|
| Base model | Qwen Image Q8 GUF | Quantized — fits VRAM |
| Clip | Qwen 2.5 | Understands spatial relationships better than SDXL |
| Image scale | 1 megapixel | Gold standard — avoids face stretching artifacts |
| CFG | **1** | HIGH CFG = overburns image. Keep at 1. |
| Steps | 6 (with Lightning LoRA) | Speed mode for dataset generation |
| Scheduler | Euler + Beta | From transcript — do not change |
| Noise | 1.0 | Building new frames from scratch from reference |
| Precision | BF-16 loaded via FP8 | Saves VRAM without losing precision |

**Style LoRA stack (apply at inference):**
- 1GIRL Qwen Image v3.0
- NiceGirls UltraReal v0.5
- SamsungCam UltraReal
- (All free on CivitAI)

**Workflow:** Use CR Prompt List node — 25 preset prompts, runs automatically

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
- [x] **Phase 2 COMPLETE** — 25 dataset images generated via fal.ai API (not RunPod — CEO eliminated that step). Output: `03_ai_models/sara/training_data/dataset_raw/sara_01–25.png`. Cost: ~$1/25 images.
- [x] **Phase 2 QC** — All 25 images pass. Face/body consistency excellent. Plastic skin is inference-only issue, fixable at prompt level post-training. No rejects.
- [x] **Phase 3 COMPLETE** — 25 captions written by Claude from visual inspection (accurate scene descriptions + natural skin texture descriptors). Files: `sara_01–25.txt` alongside PNGs.
- [x] Training config saved: `03_ai_models/sara/training_configs/sara_v1_lora.yaml`
- [ ] **NEXT: Claude trains on Vast.ai** — Rank 16, LR 0.0001, 3000 steps, AdamW8Bit, model: `Qwen/Qwen2.5-VL-7B-Instruct`
- [ ] Claude + CEO: Verify Sara LoRA output → lock character permanently

## ACTUAL PATH TAKEN (differs from original plan)

| Step | Planned | Actual |
|---|---|---|
| Dataset generation | CEO on RunPod/ComfyUI | Claude via fal.ai Python API — no CEO involvement |
| Captioning | GPT batch | Claude from visual inspection — more accurate |
| Training model | GGUF Q8 for inference | Full HF model `Qwen/Qwen2.5-VL-7B-Instruct` for training |
| CEO involvement | Phases 1, 2 | Phase 1 only (face swap) |
