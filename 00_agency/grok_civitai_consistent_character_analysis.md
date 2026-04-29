# Grok Analysis — CivitAI Consistent Character Models
**Date:** 2026-04-29
**Source:** Grok (via CEO relay)
**Verified by:** Claude Code (API cross-check, same session)
**Status:** ✅ VERIFIED — all model IDs confirmed live on CivitAI

---

## Task
Find CivitAI models/workflows (Flux-focused, 2026) that generate one fixed Instagram influencer character with:
- Perfect face + body consistency across every image
- Full variation in poses, clothes, settings, backgrounds, lighting, moods
- Ready for Instagram-style content (fashion, lifestyle, reels, GFE vibes)

---

## Top Recommendations (Grok-ranked, Claude-verified)

### #1 — AI Influencer DATASET maker for Consistent Character
**URL:** https://civitai.com/models/2182806
**Type:** Workflow | **Base:** Flux.2 Klein 4B
**DL:** 5,291 | **👍:** 331

**Why it's #1:**
- One reference image → 50–60 consistent images (poses, outfits, settings, backgrounds varied)
- Designed explicitly for training your own influencer LoRA
- Users report 57/60 usable images from a single seed (excellent face lock + variation)
- NSFW support included
- "BEST One-Click Consistent Character Dataset Creator" per its own title
- 177+ positive reviews

**Best for:** Generating Sara dataset from `sara_composite_v1.png` in one batch

---

### #2 — Dataset Generator: Flux 2 Klein 9B Image Edit Workflow
**URL:** https://civitai.com/models/2339379
**Type:** Workflow | **Base:** Flux.2 Klein 9B
**DL:** 1,199 | **👍:** 56

**Why it matters:**
- Batch-generates 200+ character-consistent images from one headshot reference
- Built-in prompt list (store multiple prompts in workflow nodes)
- Auto character name replacement with one trigger word
- Auto-captioning → saves .txt files (LoRA-ready dataset, no extra step)
- Queue hundreds of images, walk away
- Strong praise for Instagram influencer datasets

**Best for:** High-volume dataset generation (30 usable → 200+ generated)

---

### #3 — PRO PHOTOSHOOT ULTIMATE: Flux Consistent Character + PuLID + OpenPose
**URL:** https://civitai.com/models/914293
**Type:** Workflow | **Base:** Flux.1 D
**DL:** 1,481 | **👍:** 69

**Why it matters:**
- PuLID = current gold standard for face lock
- OpenPose = control exact body pose per image
- Specifically built for consistent character across many poses/outfits
- Full creative variation in clothes, settings, storytelling
- What top Instagram influencer accounts are running in 2026

**Best for:** Precise control when face-lock + pose-control both needed simultaneously

---

### #4 — Ready-to-use Character LoRAs (pre-trained, no training needed)
| Model | URL | Use |
|---|---|---|
| Flux 1D Cora Female Model | https://civitai.com/models/2326085 | Pre-trained consistent female character |
| Woman037 Dutch Blonde Influencer | https://civitai.com/models/1850005 | Blonde influencer, Flux-compatible |
| Woman549 Irish Redhead Influencer | https://civitai.com/models/1900089 | Redhead, Flux-compatible |

---

## Grok's Winning Pattern (April 2026)

```
Step 1: PuLID + Flux dataset workflow (#1 or #3 above)
        → Feed sara_composite_v1.png
        → Generate 25–60 varied images (poses, outfits, settings)

Step 2: Train Sara LoRA
        → Use Ostris AI Toolkit (rank 16, LR 0.0001, 3000 steps)

Step 3 (optional): Stack with Instagram style LoRA at inference
        → NiceGirls UltraReal ZIT for SFW
        → ZIT Mystic XXX for NSFW/Fanvue
```

This is confirmed as the method used by top accounts (@tatianaromanoff_, @liliindwali).

---

## Claude's Additional Findings (ZIT Ecosystem)

For reference — discovered during same session, complements Grok's Flux recommendations:

**SFW ZIT Stack:**
- NiceGirls UltraReal (ZIT v7): ID 1862761, 23.4K DL
- Realistic Snapshot ZIT: ID 2268008, 27.9K DL
- Realistic Skin Texture ZTurbo: ID 580857, 12.5K DL

**NSFW ZIT Stack (Fanvue):**
- ZIT Mystic XXX: ID 2206377, 75.2K DL — unlocks explicit on ZIT
- PhotoReal BetterNudes: ID 2174081, 34.9K DL — natural anatomy, no face alter

**Note:** ZIT = 8-10 steps (3× cheaper than Flux). Character LoRAs trained on ZIT also work (proven by "Izumi" NSFW character LoRA, ID 2543619).

---

## Decision Required (CEO)

| Option | Method | Speed | Quality | Setup |
|---|---|---|---|---|
| A — Grok plan | #1 workflow + PuLID + Flux | Medium | Best face-lock | Fix RunPod API key |
| B — ZIT alternative | Train Sara LoRA on ZImageTurbo | Fast | Good | Different base model |
| C — Hybrid | Use #1 for dataset → train on ZIT | Best of both | High | Medium |
