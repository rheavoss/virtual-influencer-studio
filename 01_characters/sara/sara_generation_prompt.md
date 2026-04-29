# Sara — Master Generation Prompt
**Version:** 2.0
**Updated:** 2026-04-29 (Grok SARA_BODY_FIX_001 — full spec overwrite)
**Trigger word:** `saragirl`

## FULL POSITIVE PROMPT TEMPLATE (use verbatim, replace [OUTFIT AND SETTING])

```
Sara, exact same woman as in reference photo, 41 year old white woman, 5 feet 2 inches tall, 130 pounds, extremely voluptuous hourglass figure, 42-27-41 inch measurements, massive natural 32H breasts with realistic weight and soft movement, deep cleavage, soft realistic belly with natural softness and slight belly pooch, narrow waist, very wide hips, thick juicy thighs, full round ass, curvy soft body with realistic fat distribution and natural skin folds, realistic detailed skin texture with visible pores, subtle imperfections and natural skin sheen, photorealistic, 8k, sharp focus, perfect anatomy, both feet firmly on the ground, correct toes, detailed feet, long straight dark brunette hair worn down loose, no bun, no updo, blue eyes, [OUTFIT AND SETTING]
```

## NEGATIVE PROMPT

```
blurry, low quality, deformed, mutated, extra limbs, bad anatomy, malformed feet, fused toes, extra toes, missing fingers, deformed hands, ugly, distorted proportions, cartoon, 3d render, painting, text, watermark, plastic skin, waxy skin, barbie skin, airbrushed skin, overly smooth skin, slim athletic body, flat chest, narrow hips, small breasts, grid artifacts, bun, updo
```

## CHARACTER SPEC (Grok-locked 2026-04-29)

| Field | Value |
|---|---|
| Age | 41 |
| Ethnicity | White / Caucasian |
| Height | 5ft 2in (157cm) |
| Weight | 130lb (59kg) |
| Measurements | 42-27-41 inches (107-69-104cm) |
| Bra size | 32H natural (70H / GG cup) |
| Body type | Extremely voluptuous hourglass — curvy soft |
| Hair | Long straight dark brunette, worn down loose |
| Eyes | Blue |
| Skin | Fair, warm undertone, visible pores, natural sheen |

## PULID SETTINGS (Grok SARA_BODY_FIX_001)

| Parameter | Value |
|---|---|
| PuLID strength | 0.95 – 1.0 |
| Start timestep | 4 |
| End timestep | 8 |
| FluxGuidance | 3.5 |
| KSampler CFG | 1.0 |
| Steps | 28, euler, beta |
| Denoise | 1.0 (txt2img — img2img REJECTED by Grok) |

## 25 DATASET POSES (outfit/setting placeholder)

Replace `[OUTFIT AND SETTING]` in the full prompt template with each line below:

```
1.  standing front facing camera, white triangle bikini, pool edge, bright midday sunlight, full body
2.  standing 3/4 angle, red bikini, beach, golden hour warm light, full body
3.  sitting at pool edge feet in water, black bikini, outdoor pool, daytime
4.  walking toward camera, floral sundress, city street, daytime, full body
5.  leaning on railing arms out, crop top and high-waist jeans, rooftop city view, golden hour
6.  sitting cross-legged on bed, oversized white tee, cozy bedroom, soft light
7.  standing gym mirror selfie, sports bra and leggings, gym interior
8.  sitting at cafe table laughing, summer dress, outdoor cafe, daytime
9.  lying on beach towel propped on elbows, bikini, sandy beach, bright sun
10. standing in kitchen, casual tank top and denim shorts, modern kitchen
11. standing at rooftop bar holding cocktail glass, elegant blouse and trousers, city lights background, night
12. leaning against wall arms raised, leather jacket and bodysuit, street at night
13. standing in hotel doorway, swimsuit coverup, resort setting
14. sitting on couch legs tucked, body-con mini dress, living room
15. portrait shoulders up wet hair steamy, bathroom, soft warm light
16. walking on beach wind blown hair, white bikini, ocean waves, golden hour
17. sitting in car arm on window, casual outfit sunglasses, daytime
18. standing by apartment window, sheer white top with bra fully visible underneath, golden light
19. gym mirror selfie hand on hip, high-waist shorts and sports bra
20. lying on bed reading relaxed, casual pyjamas, cozy bedroom
21. standing in front of luxury car, white jeans and fitted blazer, parking lot, daytime, full body
22. seated on chair legs crossed, evening dress, luxury interior
23. outdoor cafe laughing at phone, light summer outfit
24. standing by hotel window arms raised, short silk robe, city view
25. standing front hand on hip confident, black bikini, clean white studio
```

## VERSION HISTORY
- v1.0 (2026-04-27): Age 24, 34DD, 170cm — SUPERSEDED
- v2.0 (2026-04-29): Age 41, 32H, 157cm — Grok SARA_BODY_FIX_001 locked
