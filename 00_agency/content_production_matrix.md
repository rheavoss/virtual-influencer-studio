# Sonia — Content Production Matrix
**Last Updated:** 2026-04-09
**Purpose:** Reference spec for all 8 content types, their individual building components, and the exact tools used at each step.

---

## Shared Infrastructure (Runs Under All Content Types)

| Layer | What It Does | Tool | Cost |
|---|---|---|---|
| **Character Identity — Images** | Locks Sonia's face/body in static images | Z-Image Base + Turbo + Sonia Z-Image LoRA | ~₹0 (Fal.ai, negligible) |
| **Character Identity — Video** | Locks Sonia's face during video generation | Wan 2.2 T2V + Sonia Wan LoRA | $5/month (Wan AI Pro) |
| **Voice Identity** | Sonia's cloned voice + emotion tags | OmniVoice (Local/Colab) — Initial reference via ElevenLabs | ₹0/month |
| **OPSEC** | EXIF strip, film grain, metadata clean before every post | ExifTool + FFmpeg | ₹0 |
| **Frame Extraction** | Lossless frame extraction from driving Reels | FFmpeg (`ffmpeg -i reel.mp4 -ss 00:00:01 -vframes 1 frame1.png`) | ₹0 |
| **Caption + Platform Text** | IG caption + Fanvue teaser + X thread per post | sonia_agent.py (triple-text output) | ₹0 |
| **Scheduling** | Auto-post across platforms | Metricool (free tier) | ₹0 |
| **Color Correction** | Fix Wan AI washed-out colors after every video | CapCut (free) | ₹0 |

---

## Content Type 1 — Viral Clone Reel (Motion Transfer)
**Volume:** Primary content type — 60% of all output  
**Format:** Instagram Reel (15–30 sec), portrait 9:16

### Building Components
1. Identify 6-month-old viral Reel from target influencer (Instaloader scrape)
2. Download without watermark (Instaloader or SnapSave)
3. Extract Frame 1: `ffmpeg -i driving_reel.mp4 -ss 00:00:00.5 -vframes 1 frame1.png`
4. Flux Kontext 9B generates Jasmine in same pose/outfit/background as Frame 1
5. DW Pose extracts full skeleton from driving video
6. Wan Animate 2.2 **IMAGE-TO-VIDEO** (start frame + skeleton → video output)
7. Frame interpolation: 16fps → 32fps (within Wan workflow)
8. Color correction (CapCut LUT or manual grade)
9. Captions overlay (CapCut auto-caption)
10. OPSEC: EXIF strip + film grain + metadata clean

### Tools
`Instaloader → FFmpeg (frame extract) → Flux Kontext 9B FP8 → Wan AI Animate 2.2 I2V → CapCut`

### Critical Technical Parameters
- Wan model: IMAGE-TO-VIDEO (not text-to-video)
- Native FPS: **16fps** — do NOT change
- Frames per K-sampler batch: **81 frames = 5 seconds**
- 10-second Reel = 2 K-samplers (81 + ~75 frames)
- Colors will wash out — always color correct in CapCut

---

## Content Type 2 — Face Swap Reel (Direct Identity Swap)
**Volume:** Alternative to Type 1 when motion transfer is complex  
**Format:** Instagram Reel (15–30 sec), portrait 9:16

### Building Components
1. Find driving video (viral Reel, any source)
2. Jasmine's Wan 2.2 LoRA loaded (trained on Wan 2.2 text-to-video, low noise only)
3. Wan 2.2 **TEXT-TO-VIDEO** + Jasmine LoRA + denoise at 0.4–0.5
4. Color correct (CapCut)
5. OPSEC

### Tools
`Source video → Wan AI T2V + Jasmine Wan LoRA → CapCut`

### Critical Technical Parameters
- Wan model: **TEXT-TO-VIDEO** (not image-to-video — I2V doesn't work for this use case)
- **Denoise 0.4–0.5**: lower = more original motion preserved, higher = more Jasmine identity
- Resolution: 960×540 recommended, 720 for speed
- No flickering during occlusion (hand over face) — LoRA knows the face

---

## Content Type 3 — Talking Head / Direct-to-Camera
**Volume:** 1–2 per week  
**Format:** Instagram Reel, portrait. Also repurposed as Stories

### Building Components
1. Write script (gym tips, travel commentary, GFE personal chat)
2. OmniVoice generates voice with emotion tags: [laughter], [sigh], [energetic]
3. Wan AI S2V (Speech-to-Video) lip-syncs Jasmine's static reference image to audio
4. Add background (lifestyle location image via Flux Kontext or Google Whisk)
5. Captions overlay (CapCut)
6. OPSEC

### Tools
`Script → OmniVoice → Wan AI S2V → CapCut`

---

## Content Type 4 — GRWM / Outfit Transition
**Volume:** 2–4 per month  
**Format:** Instagram Reel, portrait. High saves content

### Building Components
1. Generate Jasmine in Outfit 1 (Z-Image Base + Turbo + Jasmine LoRA) → e.g., gym wear
2. Generate Jasmine in Outfit 2 → e.g., evening dress
3. Generate Jasmine in Outfit 3 (optional) → e.g., travel casual
4. VACE chaining: links outfit segments with face lock between transitions
5. Optional: OmniVoice voiceover ("okay, so which one are you taking to Goa?")
6. Trending audio overlay (CapCut music library)
7. OPSEC

### Tools
`Z-Image Base+Turbo (Fal.ai) + Jasmine Z-Image LoRA → Wan VACE → OmniVoice (optional) → CapCut`

---

## Content Type 5 — Lifestyle / Travel UGC
**Volume:** 4–6 per month  
**Format:** Instagram Reel or Feed Post, portrait/square

### Building Components
1. Pinterest reference images for location (Goa beach, Himalayan trail, luxury hotel)
2. Jasmine reference + location mood board → Wan Animate multi-reference OR Higgsfield Seedance 2.0
3. Optional ambient OmniVoice narration ("three days in Goa was everything I needed")
4. iPhone-style grain filter (CapCut)
5. OPSEC

### Tools
`Pinterest → Flux Kontext OR Higgsfield Seedance 2.0 → OmniVoice (optional) → CapCut`

---

## Content Type 6 — Trend Reaction
**Volume:** As trends emerge  
**Format:** Instagram Reel, portrait. Reaction/PiP format

### Building Components
1. Source viral trend clip from Reels/TikTok
2. VACE picture-in-picture: Jasmine reaction box beside trend footage
3. OmniVoice voice reaction: "[laughs] okay wait, did she really just—"
4. Trending audio + captions (CapCut)
5. OPSEC

### Tools
`Source clip → Wan VACE (PiP mode) → OmniVoice → CapCut`

---

## Content Type 7 — Product Review / UGC Ads
**Volume:** On-demand (Instagram Shop Affiliate / Brand Deals)  
**Format:** Instagram Reel, portrait. Structured UGC format

### Building Components
1. Source raw real-world affiliate product image (e.g., from Instagram Shop/Brand)
2. Execute custom Antigravity `.md` Skill file via Claude Code
3. Claude automatically hits Higgsfield API to mass-generate Static ad frames (Jasmine holding product) and writes voiceover scripts.
4. Select best A-roll frame -> Feed to Higgsfield Cinema Studio for Speech-to-Video.
5. Generate Voice using OmniVoice.
6. Editor (CapCut/Premiere) splices A-roll, generated B-roll, and Audio.
7. OPSEC

### Tools
`Product image + .md Skill File → Claude Code → Higgsfield API + OmniVoice → CapCut`

---

## Content Type 8 — Carousel (Static Multi-Image)
**Volume:** 4–6 per month  
**Format:** Instagram Carousel post (4–8 slides). Maximum saves format

### Building Components
1. One Jasmine reference image + Jasmine Z-Image LoRA
2. Flux Kontext carousel workflow in ComfyUI
3. One pose prompt per slide — **must press Enter between each prompt** (no ghost images between generations)
4. Same background auto-maintained across all slides
5. Optional detail upscale pass (low denoise second pass)
6. Compile into carousel order (CapCut or direct upload)
7. OPSEC (each image individually processed)

### Tools
`Flux Kontext 9B + Jasmine Z-Image LoRA → CapCut (compile) → Instagram Carousel upload`

### Example Pose Prompts (Fitness Theme, Same Gym Location)
```
Slide 1: standing at squat rack, hands on bar, looking at camera, confident smile
Slide 2: seated on bench press, towel around neck, water bottle in hand
Slide 3: doing a bicep curl, slight side angle, focused expression
Slide 4: standing by mirror, gym bag on shoulder, ready to leave
```

---

## Tool Stack Summary

| Tool | Content Types | Monthly Cost |
|---|---|---|
| Wan AI Pro | 1, 2, 3, 4, 6 | $5 (~₹420) |
| ElevenLabs Starter | Master clone ref only (Month 1) | ₹420 (M1 only) |
| OmniVoice (Colab) | 3, 4, 5, 6, 7 | ₹0 |
| Flux Kontext 9B (via Fal.ai) | 1, 8 | ~₹25 |
| Claude Code API | 7 (Ad generation) | Variable |
| Higgsfield Seedance 2.0 | 5 (High-Status Motion) | Included in $9/mo sub |

| Meta AI Image (meta.ai) | Quick concept tests | ₹0 |
| CapCut | All | ₹0 |
| FFmpeg | 1, 2, OPSEC | ₹0 |
| Metricool | All (scheduling) | ₹0 |
| **TOTAL** | | **~₹445/month (M2+)** |

---

## Production Best Practices (Buried Research — Now Locked)

### Rule 1: Start Frame Technique (ALWAYS generate image first)
**Never prompt text directly into a video model.** Always:
1. Generate a perfect static image of Jasmine in the exact pose/outfit/scene using Flux Kontext or Z-Image
2. Feed that image as the **Start Frame** into Wan AI / Kling / Seedance
3. This improves consistency by 30–40% vs text-only video prompts

For motion transfer specifically: extract Frame 1 of the driving video → face-swap Jasmine onto it → use THAT as Start Frame. This locks her face from frame 1.

---

### Rule 2: Wan AI Official Prompt Recipe
**Format:** `Subject + Scene + Motion + Aesthetic Control + Stylization`
**Length:** 80–120 words. Natural language only — NOT Stable Diffusion keyword tags.

**Good example:**
```
Jasmine, a young East Asian woman with long black hair and a voluptuous figure,
walks slowly through a sunlit Goa beach. She turns her head toward the camera
with a soft confident smile. Warm golden hour light, gentle ocean breeze moves
her hair. Cinematic teal-orange grade, shallow depth of field, smooth motion.
```

**Bad (keyword stacking — degrades output):**
```
jasmine, beach, walking, golden hour, 4k, photorealistic, bokeh, high quality
```

---

### Rule 3: Seedance 2.0 Structural Prompt Format (Higgsfield)
Two prompt types accepted:

**Type A — Freestyle (outcome-focused):**
Natural language description of the final scene. Best for lifestyle/travel.

**Type B — Structural (timeline breakdown):**
```
[00:00–00:03] Jasmine standing at hotel balcony, looking at city skyline, wind in hair.
[00:03–00:06] She slowly turns toward camera, soft smile, raises glass of wine.
[00:06–00:10] Close-up on her face, warm sunset light, confident expression.
```
Use structural format for: GFE videos, PPV content, scripted Reels.

**Voice consistency rule (from character bible):** Always include `"soft warm East Asian accent, gentle and intimate tone"` in every voice/Seedance prompt. Never leave accent vague.

---

### Rule 4: Pinterest → Prompt Reverse-Engineering Workflow
For lifestyle/travel content where you need a specific scene:
1. Find the exact real-world reference photo on Pinterest (Goa beach, Himalayan trail, luxury hotel lobby)
2. Feed that image to **Qwen 3VL** (vision model): *"Describe this photo as a generation prompt — include lighting, composition, background details, mood, and camera angle"*
3. Use Qwen's output as the scene prompt for Wan AI / Flux Kontext
4. This produces ultra-detailed, research-backed prompts vs guessing scene descriptions

---

### Rule 5: Cherry-Pick Method (Cost Efficiency)
For any high-stakes generation (PPV content, hero feed posts):
1. Generate **twice** using the same 3 Omni-reference images but **two different Claude-written prompts**
2. Select the best output, discard the other
3. For Higgsfield: screenshot the image upload order — note which slot is `[image 1]`, `[image 2]`, `[image 3]` so Claude can reference them precisely in prompts by tag

---

### Rule 6: Wan AI Credit Economics
- Wan2.2-Animate (I2V): 1 credit per generation
- Speech-to-Video (S2V): 1 credit per generation
- Pro tier: 300 credits/month at $5/month
- Typical Reel (5–10 sec): 4–8 credits (accelerated mode)
- **Output:** 40–60 Reels per month at $5 total — the core reason Wan beats HeyGen ($240–360/month for same output)

---

## LoRA Reference

| LoRA | Trained On | Optimizer | Steps | Use Case |
|---|---|---|---|---|
| **Jasmine Z-Image LoRA** | Z-Image Base | Prodigy, LR=1 | ~800 | Static images (Types 4, 8) |
| **Jasmine Wan 2.2 LoRA** | Wan 2.2 14B T2V, low noise only | Adam, LR=2e-4 | ~600–1000 | Video face swap (Type 2) |

Both trained once on RunPod (~$1–2 each). One-time cost.
