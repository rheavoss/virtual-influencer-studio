# Virtual Influencer Studio — Technical Architecture Blueprint
**Character:** Jasmine Mako (Character #1)
**Date:** April 2026
**Target Endpoints:** Instagram (SFW) → Fanvue (paid GFE)

## Executive Summary

**The Core Decision: Own Weights vs. Rent APIs**

Proprietary platforms (Midjourney, Krea, Enhancer) enforce safety filters. Jasmine's Fanvue monetization requires suggestive content. Closed APIs = fatal business risk.

Architecture relies strictly on **open weights (Flux.1 Dev) + custom-trained LoRA**. Zero censorship. Full IP ownership.

---

## The 7 Content Types & 2026 Tool Stack

### 1. High-End Editorial Photos (Instagram Feed)
- **Content:** High-resolution modeling photos, perfect anatomy, realistic skin texture
- **Platform:** Instagram Main Feed, X Timeline
- **Cost:** ~₹930–₹1,860/mo (Fal.ai API or Civitai Buzz)
- **Tool:** **Flux.1 Dev + Custom Jasmine LoRA + IP-Adapter**
- **Why:** Flux.1 Dev is the open-weight standard. LoRA locks Jasmine's face. IP-Adapter maintains zero-drift consistency across 100+ images.

### 2. Lifestyle / Stories Photos
- **Content:** Mirror selfies, "shot on phone" casual images — parasocial relationship building
- **Platform:** Instagram Stories, Fanvue teasers, X feed
- **Cost:** ₹0 (same generation budget)
- **Tool:** **Flux.1 Dev + Jasmine LoRA + Lo-Fi LoRAs**
- **Why:** Same base model = same face. Lo-fi LoRAs add grainy phone camera feel.

### 3. GFE Content (Fanvue Paywall)
- **Content:** Suggestive, lingerie, high-heat GFE (Option A ceiling — nipple always covered)
- **Platform:** Fanvue (paywall), Telegram VIP
- **Cost:** ~₹1,395–₹2,790/mo (Vast.ai pay-per-GPU or RunPod)
- **Tool:** **Flux.1 Dev + Jasmine LoRA + private ComfyUI on Vast.ai**
- **Why:** Run Flux.1 Dev inside a private GPU instance. No API safety filters. CEO controls the generation environment entirely.

### 4. Cinematic B-Roll (Reels / TikTok)
- **Content:** Non-speaking video clips — walking, posing, lifestyle
- **Platform:** Instagram Reels, TikTok, YouTube Shorts
- **Cost:** ~₹930–₹1,395/mo (Kling credits)
- **Tool:** **Kling 3.0 (primary) + Seedance 2.0 (test per clip)**
- **Why:** Blind test confirmed Kling 3.0 = best for character consistency (face/body stable in motion). Strategy: run both, use winner per clip.

### 5. Lip-Synced Talking Head Videos
- **Content:** Jasmine speaking to camera — vlogs, Fanvue PPV messages
- **Platform:** Instagram Reels, TikTok, Fanvue PPV
- **Cost:** ~₹930/mo (Higgsfield Starter at ₹838/mo — already subscribed)
- **Tool:** **Higgsfield + Kling 3.0 native lip-sync**
- **Why:** Audio-driven facial landmarks mapped onto static Flux.1 source image. Identity stays locked while lips animate.

### 6. Voice & Audio
- **Content:** Custom Jasmine voice for scripts, Fanvue voice notes, Reels voiceover
- **Platform:** Fanvue Voice Notes, Reels/TikTok audio
- **Cost:** ~₹420/mo (ElevenLabs — India price unconfirmed, verify)
- **Tool:** **ElevenLabs (primary) → Moss TTS Nano (free Hindi alternative, P1-45)**
- **Why:** ElevenLabs for English GFE. Moss TTS Nano (100M params, CPU, 20 languages) for Hindi pipeline at zero cost.

### 7. Automated DM Interactions
- **Content:** Real-time GFE chat with Fanvue subscribers
- **Platform:** Fanvue DMs
- **Cost:** ~₹1,395/mo
- **Tool:** **OurDream.ai or SpicyChat AI**
- **Why:** Uncensored roleplay models with zero filters. OurDream.ai allows visual replies (text + generated image in one response).

---

## Production Workflow

```
1. GENERATE     Flux.1 Dev + Jasmine LoRA → static images (Fal.ai API or Vast.ai)
2. ANIMATE      Kling 3.0 / Seedance 2.0 → B-roll video from static image
3. LIP-SYNC     Higgsfield / Kling lip-sync → talking head from ElevenLabs audio
4. OPSEC        ExifTool strip + film grain → metadata-clean export (P0-07)
5. SCHEDULE     Metricool → Instagram + Facebook + X + YouTube + Pinterest
6. MONETIZE     Fanvue (GFE sub) + Passes (mirror) + Telegram VIP (Hindi M6+)
```

---

## Phase 0 Status

| Component | Status |
|---|---|
| Jasmine LoRA training dataset | ⏳ 27/47 images — 20 more needed (run `generate_dataset.py`) |
| Flux.1 Dev LoRA training | ⏳ Pending dataset completion → Vast.ai (P0-07) |
| Higgsfield Starter | ✅ Subscribed ₹838/mo |
| ElevenLabs voice | ⏳ Pending India pricing confirmation |
| Fal.ai API access | ✅ Key in credentials vault |
