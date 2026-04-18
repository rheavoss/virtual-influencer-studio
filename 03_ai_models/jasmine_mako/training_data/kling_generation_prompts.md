# Jasmine LoRA Dataset — Kling Generation Prompts
**Date:** 2026-04-18 (Session 10)
**Reference image:** Pink micro bikini (approved Jasmine reference)
**Settings:** Kling Image 3, Series mode, 9 images, 2k, 9:16
**Face lock:** "Keep this person's facial features exactly" in prompt

---

## MASTER CHARACTER PROMPT — Jasmine Mako
> Used to generate the original approved reference image (pink micro bikini).
> Use this to regenerate Jasmine from scratch or launch a new character variant.
> Platform: Kling Image 3 (single image, NOT series mode)

```
photorealistic, ultra-detailed 8k raw photo
east asian taiwanese female 22 years
face: wide cheek bones, wide face
breast: soft, perky, DD breasts with deep plunging cleavage
body_type: Curvy, voluptuous, wide hips, flat tummy
hair: Long straight black hair, tied in top bun
eyes: Blue eyes
lips: glossy red lipstick, slight pouted, plump
skin: ultra white skin with micro imperfections, with subtle sheen
dress: hot pink bikini
direct intense eye contact with viewer and sultry seductive expression
overall_aesthetic: Strong sensual curvy look — deep cleavage, confident and seductive
standing straight looking straight in camera sensually
bare foot
head to toe image
setup: plain white background
```

**Negative prompt:**
```
fit, abs, shiny skin, plastic skin, no belly, no BBW drift
```

**Workflow after reference is approved:**
1. Generate single reference image with master prompt above
2. Approve reference image — this becomes Image1 for all series
3. Switch to **Series mode** (9 images, 2k, 9:16)
4. Use series prompts below with "Keep this person's facial features exactly... @Image1"

---

## Backup Architecture (IMPORTANT)
- **Images** → Google Drive (`virtual-influencer-drive:VirtualInfluencerStudio/`)
- **Git** → tracks `.md`, `.yaml`, `.json` docs only — NOT image files
- **Image files are too large for Git** — Drive is the image backup
- Drive is auto-synced via studio-sync LaunchAgent (fswatch, 4s debounce)
- Git tracks a manifest/list of what's on Drive, not the files themselves

---

---

## Batch 1 — Black Gym Wear (Chinese prompt by CEO)
```
商业摄影, 极简主义, 8k分辨率, 杰作, 摄影写实主义，在纯净的白色背景前，(一名面部特征与图1完全一致的女性，有着大眼睛和高盘的深色发髻，她拥有极端的沙漏型身材，包含极丰满的胸部、纤细的腰肢以及宽阔圆润的胯部和大腿)，她穿着(黑色简约运动内衣和黑色紧身运动短裤)，身体面向左前方45度站立，面带自信的微笑。前侧左方45度视角, 三分之二侧面姿势，工作室柔和漫射光 @Image1
```
**Result:** 9 generated — 2 kept (_1, _7) — body too heavy, "extreme" language caused BBW drift

---

## Batch 2 — Black Gym Wear (Corrected English prompt)
```
Commercial photography, minimalist studio, 8K resolution, masterpiece, photorealistic. Pure white background. A beautiful 24-year-old East Asian woman with facial features exactly matching Image1 — large expressive eyes, high dark bun hairstyle, bold red lips. Body type matching Image1: full natural bust, defined narrow waist, curved hips. Wearing black minimal sports bra and black fitted workout shorts. Standing pose, body angled 45 degrees to the left, confident smile. Two-thirds side view, soft studio diffused lighting. @Image1
```
**Result:** 9 generated — 4 kept (_1, _3, _7, _8)

---

## Batch 3 — Pink Micro Bikini
```
Keep this person's facial features exactly. Character has high dark bun hairstyle, bold red lips, large expressive eyes. Full body: natural full bust, defined narrow waist, curved hips matching the reference. Wearing a pink micro bikini. Pure white studio background, soft diffused lighting. Various confident poses — standing front, 3/4 angle, hands on waist, looking over shoulder. Photorealistic, commercial photography, 9:16. @Image1
```
**Result:** 9 generated — 7 kept (_0,_1,_2,_4,_6,_7,_8) — best batch, face consistency excellent

---

## Batch 4 — White Bodysuit
```
Keep this person's facial features exactly. Character has high dark bun hairstyle, bold red lips, large expressive eyes. Full body: natural full bust, defined narrow waist, curved hips matching the reference. Wearing a white tight bodysuit, deep V-neckline, showing deep cleavage. Pure white studio background, soft diffused lighting. Various confident poses — standing front, 3/4 angle, hands on waist, looking over shoulder. Photorealistic, commercial photography, 9:16. @Image1
```
**Result:** 9 generated — 6 kept (_0,_1,_3,_4,_6,_7) — mottled skin on 3 images trashed

---

## Batch 5 — Red Bodycon Dress
```
Keep this person's facial features exactly. Character has high dark bun hairstyle, bold red lips, large expressive eyes. Full body: natural full bust, defined narrow waist, curved hips matching the reference. Wearing a tight red bodycon midi dress, figure-hugging, deep V-neckline showing cleavage. Pure white studio background, soft diffused lighting. Full body shot, face always forward or maximum 45 degrees to camera, confident expression. Photorealistic, commercial photography, 9:16.
```
**Result:** 9 generated — 6 kept (_0,_1,_2,_5,_6,_8) — face-forward rule fixed back shot waste

---

## Batch 6 — Micro String Bikini (NSFW limit)
```
Keep this person's facial features exactly. Character has high dark bun hairstyle, bold red lips, large expressive eyes. Full body: natural full bust, defined narrow waist, curved hips matching the reference. Wearing an extremely tiny string bikini, thin string ties, minimal fabric coverage, deep cleavage fully visible, sheer mesh panels on sides. Pure white studio background, soft diffused lighting. Full body shot, face always forward or maximum 45 degrees to camera, confident seductive expression. Photorealistic, commercial photography, 9:16.
```
**Result:** 10 images — 6 kept — nipples covered, within content ceiling ✅

---

## Key Lessons Learned
- **Never use "extreme" / "极端"** — pushes body past reference into BBW drift
- **Never use "wide round hips and thighs"** — same issue
- **Always add "face always forward or maximum 45 degrees"** — stops back shot waste
- **Always add "body proportions matching Image1"** — anchors body to reference
- **Mottled skin on bare legs** — Kling artifact, reject those images
- **Face fidelity 0.7 (old API) = "Keep this person's facial features exactly" (Image 3)**

---

## Final Dataset Stats
- Total generated: ~63 images across 6 batches
- Total kept: 38 images
- Keep rate: ~60%
- Outfits covered: black gym wear, pink micro bikini, white bodysuit, red bodycon, micro string bikini
