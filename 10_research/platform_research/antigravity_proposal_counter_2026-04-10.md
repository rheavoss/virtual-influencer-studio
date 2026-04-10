# Counter-Analysis: Antigravity Tech Stack Proposal
**Prepared:** 2026-04-10  
**Based on:** Live web research — official documentation verified April 10, 2026  
**Purpose:** Fact-check Antigravity's proposal before any implementation begins

---

## Summary Verdict

| Section | Antigravity's Call | Verified Status |
|---|---|---|
| Tensor.art for base image gen | Use it | **WRONG — fully SFW since 2025** |
| Google Veo 3 for Club Baddie | Use it | **WRONG — contradicts own warning** |
| SyncLabs / Meta for lip sync | Use it | **Partially wrong — better free option exists** |
| Higgsfield for character swap | Use it | **CORRECT** |
| Wan AI for character swap | Use it | **CORRECT** |
| Civitai for image gen | Use it | **CORRECT — with caveats** |
| ElevenLabs for voice notes | Use it | **CORRECT — confirmed locked** |

---

## Error 1 — Tensor.art Is Dead for NSFW (Listed Twice)

**What Antigravity said:**  
> "The Solution: Civitai and **Tensor.art**"  
> Used again for "Wet Poolside" content

**What the research shows:**  
Tensor.art announced a complete transition to a fully SFW platform in 2025. Their own policy page states:

> *"Any content depicting explicit sexual acts, nudity, or pornographic material is not permitted for public visibility & Generation."*

The change was forced by Visa/Mastercard withdrawing payment processing and regulatory pressure — the same pressure that hit Civitai. The NSFW LoRA libraries that made Tensor.art valuable have all been removed.

**Evidence:** [tensor.art/event/NSFW&CelebrityAdjustments](https://tensor.art/event/NSFW&CelebrityAdjustments)

**Correction:**  
Drop Tensor.art from the stack entirely. Replace with:
- **Civitai** (on-site generation, age-verify, crypto credits) for quick NSFW static images
- **Local ComfyUI + Flux** on RunPod for high-volume NSFW image generation at ~₹85-170/session
- **Higgsfield Seedream 4.0** for NSFW images via web (no local GPU needed)

---

## Error 2 — Internal Contradiction on Google Veo 3

**What Antigravity said:**  
In the WARNING at the top:
> *"Google Veo 3 and Gemini will outright reject deepfake-style character swapping... We must move the video swap pipeline off Google."*

Then in the Content Matrix for "Club Baddie":
> *"Tool Used: Google Veo 3 / Wan AI"*

**What the research shows:**  
Both statements cannot be true simultaneously. Google Veo 3 blocks:
- Deepfake / character swap on third-party videos ✓ (Antigravity correctly identified this)
- Heavy cleavage and NSFW prompts ✓ (correctly identified)
- Any explicit or suggestive content — hard block, no toggle, no workaround

The Club Baddie content type specifically requires "seductive glamour" — this is exactly what Google blocks.

**Correction:**  
Google Veo 3 / Flow should only be used for **fully SFW, non-character-swap content** — specifically Content Type 5 (Lifestyle/Travel UGC) where we control the initial image and need high-quality cinematic B-roll of locations. The user already has this via Google One at no extra cost.

For Club Baddie: use **Wan 2.7 I2V** (start frame with Jasmine in club setting → animate) or **Higgsfield Wan 2.6** (near-uncensored, web-based).

---

## Error 3 — SyncLabs/Meta AI Listed as Production Lip Sync Tools

**What Antigravity said:**  
> "The Solution: Meta AI Translation Tool / SyncLabs"  
> "For offline lip-syncing to custom GFE audio notes, we use an API like SyncLabs or HeyGen"

**What the research shows:**

**Meta AI Translation (SeamlessExpressive):**
- Platform-locked to Instagram/Facebook Reels interface only
- Cannot be used on externally produced video
- Requires 1,000+ Facebook followers to access
- Only supports Hindi ↔ English, Spanish, Portuguese
- The user has already confirmed: *"Meta translation will be used only on already produced final content"*
- This is a **distribution feature, not a production tool**

**SyncLabs:**
- Paid API — starts at ~$49/month for production use
- Applies its own content moderation filters (blocks explicit content)
- No NSFW capability on the hosted platform

**Better verified alternative — MuseTalk 1.5 (free):**
- Open-source, released March 28, 2025 — confirmed live
- Takes ElevenLabs .wav output directly as input
- Drives Jasmine's mouth movement on video frame
- Free locally (or via fal.ai API for occasional use)
- No content restrictions when run locally
- Confirmed pipeline: **ElevenLabs (audio) → MuseTalk 1.5 (video mouth sync) → CapCut (final edit)**

**Evidence:** [github.com/TMElyralab/MuseTalk](https://github.com/TMElyralab/MuseTalk) | [fal.ai/models/fal-ai/musetalk](https://fal.ai/models/fal-ai/musetalk)

**Correction:**  
Replace SyncLabs with MuseTalk 1.5. Saves ~$49/month. No NSFW restriction. Works directly with ElevenLabs output.

---

## Error 4 — "317 Images" for LoRA Training — Needs Clarification

**What Antigravity said:**  
> "We will upload your 317 images to train a Flux.1 LoRA on Civitai/Replicate"

**What the current project state shows:**  
- We have **5 selected Jasmine reference images** in `02_reference_images/jasmine/selected/`
- The Sofia Ansari material in `03_ai_models/jasmine/training_data/` is **driving video reference** (for motion transfer), not Jasmine identity training images
- The LoRA training plan calls for **40–50 carefully curated Jasmine images** covering expressions, poses, angles, and lighting

317 images is either:
1. A reference to the Sofia Ansari dataset (wrong dataset — those are for skeleton/motion, not Jasmine's identity)
2. An unverified number with no documented source

**Correction:**  
LoRA training dataset for Jasmine = 40–50 AI-generated images, planned but not yet created. Training platform = RunPod (~$1–2 per session). Replicate is a valid alternative to RunPod — worth evaluating for cost, but not yet compared.

---

## What Antigravity Got Right

| Item | Verdict |
|---|---|
| Move video swap pipeline off Google | Correct — confirmed by research |
| Higgsfield for character swap | Correct — Character Swap feature verified |
| Wan AI for character swap via reference image + driving video | Correct — I2V with start frame is the mechanism |
| Civitai for base image generation | Correct — with caveat: crypto payment for NSFW generation credits required post May 2025 |
| ElevenLabs for voice notes | Correct — confirmed locked |
| "Do not attempt video for bedroom content — raw static aesthetic" | Correct strategic call |

---

## Corrected Content Pipeline Matrix

| # | Content Type | Antigravity's Tool | Corrected Tool | Why |
|---|---|---|---|---|
| 01 | Bedroom GFE POV | Civitai / Replicate (Flux LoRA) | **Civitai + Jasmine LoRA** (static) OR **local ComfyUI** | Replicate unverified for cost — RunPod cheaper. Civitai correct. |
| 02 | Saree Transition | Wan AI Mix Mode | **Wan 2.7 I2V** (reference image + driving video) | "Mix Mode" is not a documented Wan feature name — correct mechanism is I2V |
| 03 | Wet Poolside | ~~Tensor.art~~ / Civitai | **Civitai + Jasmine LoRA** OR **Higgsfield Seedream 4.0** | Tensor.art fully SFW since 2025 — drop it |
| 04 | In-Car Karaoke | ~~Meta AI~~ / ~~SyncLabs~~ | **ElevenLabs (audio) → MuseTalk 1.5 (lip sync)** | Meta = distribution only. SyncLabs = $49/mo + NSFW blocked. MuseTalk = free. |
| 05 | Gym Flex | Higgsfield Character Swap | **Higgsfield Character Swap** | Confirmed correct |
| 06 | Club Baddie | ~~Google Veo 3~~ / Wan AI | **Wan 2.7 I2V** OR **Higgsfield Wan 2.6** | Google Veo 3 blocks seductive content — contradicts Antigravity's own warning |
| 07 | Street Dance | Higgsfield Character Swap | **Higgsfield Character Swap** OR **Viggle AI** (free, 5/day) | Both confirmed. Viggle free tier worth testing first. |
| 08 | Voice Notes (Fanvue) | ElevenLabs | **ElevenLabs** | Confirmed correct |

---

## Agreed Points — No Change Needed

1. The core architecture (Wan AI + Higgsfield + Civitai) is directionally correct
2. Moving off Google for character swap pipeline is the right call
3. Static images for bedroom and poolside content — right strategic decision
4. ElevenLabs locked for all audio — confirmed

---

## Recommended Next Actions (Priority Order)

1. **Drop Tensor.art** — remove from all planning documents
2. **Fix Club Baddie pipeline** — replace Google Veo 3 with Wan 2.7 I2V or Higgsfield Wan 2.6
3. **Fix lip sync pipeline** — replace SyncLabs with MuseTalk 1.5 (free, no NSFW restriction)
4. **Clarify 317 images source** — confirm whether this is Sofia Ansari data (motion reference, not Jasmine LoRA training)
5. **Run verification test** — use 5-second viral gym reel + Jasmine reference image → test both Higgsfield Character Swap AND Wan 2.7 I2V, compare output quality before committing to either
