# Sara — Free Multi-Angles Dataset Checklist
**Source:** CEO research (April 2026)
**Created:** 2026-04-28
**Character:** Sara | Trigger word: `saragirl`
**Cost:** $0 — fully open-source, local ComfyUI

This is the free alternative to Midnight Lab Genesis Engine. Uses Qwen-Image-Edit-2511 + fal Multi-Angles LoRA to generate 10–20+ varied shots from one hybrid reference image.

---

## TOOLS

| Tool | Source | Cost |
|---|---|---|
| Qwen-Image-Edit-2511 | Alibaba / HuggingFace | Free |
| fal Multi-Angles LoRA | HuggingFace (fal org) | Free |
| ComfyUI-qwenmultiangle node | GitHub (jtydhr88) | Free |
| Lightning LoRA (optional, 4-step fast gen) | CivitAI | Free |

---

## STEP-BY-STEP CHECKLIST

### Step 1 — Download Multi-Angles LoRA (one-time)

```
https://huggingface.co/fal/Qwen-Image-Edit-2511-Multiple-Angles-LoRA/resolve/main/qwen-image-edit-2511-multiple-angles-lora.safetensors
```

Save to: `ComfyUI/models/loras/`

The LoRA is trained on 3000+ views for 96 precise camera angles.

---

### Step 2 — Install Custom Node (one-time)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/jtydhr88/ComfyUI-qwenmultiangle.git
```

Restart ComfyUI after install.

---

### Step 3 — Get the Workflow JSON

Official example from fal:
```
https://huggingface.co/fal/Qwen-Image-Edit-2511-Multiple-Angles-LoRA/blob/main/comfyui-workflow-multiple-angles.json
```

Download raw JSON → drag into ComfyUI.

Alternative: search "Qwen Image Edit 2511 multi angle" on YouTube — many creators share free enhanced JSONs (AxiomGraph, AtelierDarren, etc.).

---

### Step 4 — Prepare Sara Hybrid Reference Image

- Face-swap: Sara face (`sara_face_ref.jpg`) onto body donor (`body_donor.jpg`)
- Save result as `SARA_HYBRID_REF_01.png` (high resolution, clean)
- This 1 image drives all 10–20+ outputs

File locations:
- Face: `01_characters/sara/face_reference/sara_face_ref.jpg`
- Body: `01_characters/sara/face_reference/body_donor.jpg`
- Composite (existing attempt): `01_characters/sara/face_reference/sara_composite_v1.png`

---

### Step 5 — Run the Workflow

1. Load `SARA_HYBRID_REF_01.png` into the Input Image / Genesis node
2. Load Multi-Angles LoRA in LoRA loader (strength: 0.8–1.0)
3. Use qwenmultiangle node (Camera Angle Selector) — pick 8–12 angles:
   - Front, side, 3/4, low angle, high angle, back, over-shoulder, etc.
4. Add Lightning LoRA (optional) for 4-step fast generation

**Positive prompt:**
```
saragirl, beautiful Caucasian woman, long straight jet black hair, blue eyes,
strong dark brows, warm smile, voluptuous natural body, large bust, defined waist,
hourglass figure, photorealistic, sharp focus, natural lighting
```

**Negative prompt:**
```
blurry, deformed, bad anatomy, extra limbs, watermark, logo, text,
nudity, topless, nipples, cartoon, anime, CGI
```

**Resolution:** 1024×1536 or 1536×1536

---

### Step 6 — Tips for Best Results

- Start with 4–6 angles first to test quality
- Run workflow 2–3 times with different angle selections for more variety
- For extra polish: feed good outputs into ControlNet + Face Detailer pass
- Target: 20–25 approved images for training dataset

---

## OUTPUT → NEXT STEP

Save approved images to:
```
03_ai_models/sara/training_data/dataset_raw/
```

Then: Claude captions all images (GPT batch, every caption starts with `saragirl,`) → Vast.ai training → Sara LoRA locked.

---

## COMPARISON: Free vs Paid Path

| | Free (this doc) | Paid (Genesis Engine) |
|---|---|---|
| Cost | $0 | $10–20/mo membership |
| Setup | ComfyUI local install | ComfyUI + Gemini API key |
| Per-shoot cost | Electricity only | <$0.40 |
| Gemini art director | No | Yes (writes prompts automatically) |
| Angle control | Manual (96 preset angles) | Auto via Gemini prompt |
| Quality | Very good | Slightly more polished |
| **Recommendation** | **Start here** | Upgrade if free path underperforms |
