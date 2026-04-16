# Kling AI — Prompting & Generation Guide
> Source: Kling official docs (kling.ai/document-api) + Best Practices guide
> Last updated: 2026-04-17

---

## 1. The 5W1H Prompt Formula

Kling's official formula. Use it for all image generation prompts.

| Element | What to Describe | Examples |
|---|---|---|
| **Who** | Main subject | East Asian woman, long black hair, voluptuous figure |
| **What** | Detailed appearance | White spaghetti-strap bodysuit, red lips, confident expression |
| **When** | Time / lighting condition | Golden hour, midnight, soft morning light, noon |
| **Where** | Background / setting | White studio, rooftop, tropical poolside, luxury hotel |
| **Why** | Action / pose / emotion | Standing with hands on waist, leaning forward, smiling at camera |
| **How** | Technical specs | 3/4 angle, soft cinematic lighting, close-up portrait, photorealistic |

**Critical rule from Kling docs: Do NOT blindly stack elements. Focused prompts outperform long stacked ones.**

### Good prompt structure
```
[Who + What] + [Where + When] + [Why] + [How]
```

### Example
```
A stunning East Asian woman with long straight blue-black hair, wearing a white 
micro bikini, standing at a tropical poolside at noon, face turned toward camera 
with a confident smile, bright sunlight, full body, photorealistic, 9:16
```

---

## 2. Series Generation (Key Feature for LoRA Dataset)

### What it is
One prompt → Kling auto-generates 2–9 **consistent** variations in a single task.
This is the correct way to generate LoRA training datasets — NOT 26 individual prompts.

### Model
`kling-v3-omni` — ONLY model that supports series generation.

### API Parameters
```json
{
  "model_name": "kling-v3-omni",
  "prompt": "your single series prompt",
  "result_type": "series",
  "series_amount": 9,
  "aspect_ratio": "9:16",
  "resolution": "2k",
  "image": "reference_image_url",
  "image_reference": "face",
  "image_fidelity": 0.7
}
```

### Key rules
- `result_type`: `series` (not `single`)
- `series_amount`: 2–9 (set to 9 for max output)
- When `result_type = series`, the `n` parameter is **ignored**
- Results return in `series_images` array (not `images`)
- `image_reference = face` locks facial identity to your reference photo
- `image_fidelity` range: 0–1. Higher = stronger face lock. Use 0.7 for training datasets.

### Web UI equivalent
In the Kling web UI, select **Series** mode before generating. Set amount to 9.

---

## 3. Image Parameters Reference

| Parameter | Options | Notes |
|---|---|---|
| Model | `kling-v1`, `kling-v1-5`, `kling-v2-1`, `kling-v3`, `kling-v3-omni` | Use `kling-v3-omni` for series |
| Aspect ratio | `1:1`, `2:3`, `3:2`, `9:16`, `16:9`, `3:4`, `4:3` | `9:16` for portraits |
| Resolution | `1k`, `2k`, `4k` | `2k` minimum for LoRA training |
| Images per batch | 1–9 (via `n`) | Irrelevant when using series |
| Series amount | 2–9 (via `series_amount`) | Only for `kling-v3-omni` |
| Face fidelity | 0–1 (via `image_fidelity`) | 0.7 recommended for training |

---

## 4. Jasmine LoRA Dataset — Series Prompts

Use these 3 series to generate 26 images (9 + 9 + 8).

### Series 1 — Studio Portraits (9 images)
```
A stunning East Asian woman with long straight blue-black hair, voluptuous 
hourglass figure, wearing different outfits including white bodysuit, red bodycon 
dress, black lace bralette — studio white background, soft cinematic lighting, 
face forward or 3/4 angle, confident expression, photorealistic
```
Settings: `series_amount: 9` · `aspect_ratio: 9:16` · `resolution: 2k`

### Series 2 — Lifestyle & Outdoor (9 images)
```
A stunning East Asian woman with long straight blue-black hair, voluptuous 
hourglass figure, in different lifestyle settings — poolside, beach sunset, 
rooftop golden hour, gym mirror, luxury hotel — wearing bikini, sundress, 
lingerie — face always toward camera, natural lighting, photorealistic
```
Settings: `series_amount: 9` · `aspect_ratio: 9:16` · `resolution: 2k`

### Series 3 — Glam & Editorial (8 images)
```
A stunning East Asian woman with long straight blue-black hair, voluptuous 
hourglass figure, in glam editorial settings — red carpet, nightclub, art gallery 
— wearing evening gown, sequin dress, sheer bodysuit — dramatic lighting, 
face forward, bold makeup, photorealistic
```
Settings: `series_amount: 8` · `aspect_ratio: 9:16` · `resolution: 2k`

---

## 5. LoRA Training QC Rules (Hard Rules)

Before accepting any generated image into the dataset:

- [ ] Face clearly visible — no back shots, no profile-only
- [ ] Face is 3/4 or front angle — not looking away from camera
- [ ] Same facial geometry as reference — check bone structure, not just style
- [ ] No face drift — if she looks like a different person, reject
- [ ] No floor/ground poses with face cut off or distorted
- [ ] Watermark visible = AI generated ✅ (fine for LoRA training)

**Reject immediately if:** face is cut off, back to camera, anatomy distorted, looks like different character.

---

## 6. Content Ceiling (Non-Negotiable)

| Platform | Allowed | Hard Limit |
|---|---|---|
| Instagram | Deep cleavage, micro bikini, sheer fabric | No nipple/areola. Ever. |
| Fanvue | Edge-pushing non-nude NSFW | No nudity, no topless, no genital exposure |

All Kling prompts must stay within these limits regardless of platform target.

---

## 7. API Endpoint Reference

```
Base URL: https://api-singapore.klingai.com

Image generation:  POST /v1/images/generations
Image omni:        POST /v1/images/omni-image   (series generation lives here)
Text to video:     POST /v1/videos/text2video
Image to video:    POST /v1/videos/image2video

Auth: Authorization: Bearer <token>
```
