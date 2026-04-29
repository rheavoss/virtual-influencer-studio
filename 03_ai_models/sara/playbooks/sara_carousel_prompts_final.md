# Sara — Carousel Engine Prompts (Final, RunPod-Ready)
**Date:** 2026-04-28
**Use:** Paste each line into CR Prompt List node in ComfyUI
**Seed image:** sara_composite_v1.png (full body) + sara_face_crop.jpg (face identity)

## PERMANENT FACE LOCK PREFIX (add to EVERY prompt)
```
saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, defined waist, fair warm skin, no tattoos, photorealistic, 8k, sharp focus, natural lighting,
```

## 25 CAROUSEL PROMPTS (prefix already embedded)

Paste these directly into CR Prompt List node — one per line:

```
saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing front facing camera, white triangle bikini, pool edge, bright midday sunlight, full body, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing 3/4 angle, red bikini, beach, golden hour warm light, full body, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting at pool edge feet in water, black bikini, outdoor pool, daytime, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, walking toward camera, floral sundress, city street, daytime, full body, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, leaning on railing arms out, crop top and high-waist jeans, rooftop city view, golden hour, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting cross-legged on bed, oversized white tee, cozy bedroom, soft light, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing gym mirror selfie, sports bra and leggings, gym interior, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, laughing, large natural heavy bust, hourglass figure, fair warm skin, sitting at cafe table, summer dress, outdoor cafe, daytime, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, lying on beach towel propped on elbows, bikini, sandy beach, bright sun, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing in kitchen, casual tank top and denim shorts, modern kitchen, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, kneeling on bed looking at camera, lace lingerie fully covered, soft bedroom lighting, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident expression, large natural heavy bust, hourglass figure, fair warm skin, leaning against wall arms raised, leather jacket and bodysuit, street at night, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing in hotel doorway, swimsuit coverup, resort setting, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting on couch legs tucked, body-con mini dress, living room, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair wet, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, portrait shoulders up, steamy bathroom, soft warm light, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair wind blown, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, walking on beach, white bikini, ocean waves, golden hour, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting in car arm on window, casual outfit sunglasses, daytime, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing by apartment window, sheer white top with bra fully visible underneath nipples covered, golden light, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident expression, large natural heavy bust, hourglass figure, fair warm skin, gym mirror selfie hand on hip, high-waist shorts and sports bra, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, relaxed expression, large natural heavy bust, hourglass figure, fair warm skin, lying on bed reading, casual pyjamas, cozy bedroom, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, looking over shoulder, large natural heavy bust, hourglass figure, fair warm skin, back to camera, bikini, pool edge, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, elegant expression, large natural heavy bust, hourglass figure, fair warm skin, seated on chair legs crossed, evening dress, luxury interior, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, laughing, large natural heavy bust, hourglass figure, fair warm skin, outdoor cafe, looking at phone, light summer outfit, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing by hotel window arms raised, short silk robe, city view, photorealistic, 8k

saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident smile, large natural heavy bust, hourglass figure, fair warm skin, standing front hand on hip, black bikini, clean white studio, photorealistic, 8k
```

## COMFYUI SETTINGS (do not change)
| Parameter | Value |
|---|---|
| CFG | 1.0 |
| Steps | 6 (with Lightning LoRA) |
| Scheduler | Euler + Beta |
| Noise | 1.0 |
| Resolution | 1024×1536 (portrait) = ~1 megapixel |
| Clip | Qwen 2.5 |
| Model format | **Q8 GUF quantized** (NOT full precision — fits 24GB VRAM) |
| Precision | BF-16 loaded via FP8 |

## STYLE LoRA STRENGTHS (Grok-confirmed values 2026-04-28)
| LoRA | Strength |
|---|---|
| 1GIRL Qwen Image v3.0 | 0.85 |
| NiceGirls UltraReal v0.5 | 0.80 |
| SamsungCam UltraReal | 0.75 |
| Lightning LoRA | 1.0 |

## NEGATIVE PROMPT (paste into negative node)
```
cartoon, anime, CGI, 3d render, plastic skin, watermark, text, logo,
nudity, topless, nipples, tattoos, Asian features, extra limbs,
deformed hands, bad anatomy, blurry, out of focus, ponytail, updo
```

Note `ponytail, updo` in negative — forces long flowing hair on every output.
