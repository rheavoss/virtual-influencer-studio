# Jasmine Mako IP: Technical Architecture & Content Production Blueprint
**Date:** April 2026 (Updated to SOTA 2026 Standards)
**Target Endpoints:** Instagram (SFW) and Fanvue (NSFW/Monetized)

## Executive Summary
This document outlines the definitive technical stack and production pipeline for generating the Jasmine Mako AI influencer. 

**The Core Architectural Decision: Owning Weights vs. Renting APIs**
Proprietary platforms (e.g., Enhancer, Krea, Midjourney) enforce strict corporate safety filters. Because Jasmine's monetization model relies on generating suggestive and explicit content via Fanvue, utilizing closed APIs is a fatal business risk. 

To ensure zero censorship and full ownership of the Intellectual Property, this architecture relies strictly on **Open Weights (Flux.1 Dev — NOT FLUX.2 which is a fictional model name) and custom-trained Identity Weights (LoRAs)**.

> ⚠️ **Stack corrections (2026-04-17):** This doc was written early and contains outdated tool references:
> - FLUX.2 → **Flux.1 Dev** (actual model name)
> - TikTok → **DEPRECATED** (see master_decisions_log.md §7)
> - Later.com → **DEPRECATED** — replaced by Metricool free tier
> - Avatar 5.0 → not in current stack (use Wan AI S2V for talking head)
> - Kling 3.0 as primary video → replaced by **Wan AI 2.2** ($5/month vs $240–360/month)
> See `master_decisions_log.md` §4 for locked video production decisions. 

---

## The 7 Content Types & Justified 2026 Tool Stack

### 1. High-End Editorial Photos (Instagram Feed)
*   **The Content:** High-resolution, highly detailed modeling photos demonstrating perfect anatomy, realistic skin texture, and lighting.
*   **Target Platform:** Instagram Main Feed, X (Twitter) Timeline.
*   **Estimated Cost:** ~$10-20/month (Civitai Buzz membership or Fal.ai API usage).
*   **The Tool:** **Flux.1 Dev (Base Model) + Custom LoRA + Flux Kontext / IP-Adapter**
*   **The Justification:** Flux.1 Dev is the open-weight standard. A single LoRA causes "identity drift", so the 2026 workflow uses Civitai's Flux.1 Dev trainer combined with **Flux Kontext** (in-context editing) and **IP-Adapter** to ensure zero-drift, 100% facial consistency across 100+ images. 

### 2. Spontaneous Lifestyle Photos (Instagram Stories)
*   **The Content:** Low-fidelity, mirror selfies, "shot on phone" casual images designed to build parasocial relationships.
*   **Target Platform:** Instagram Stories, Fanvue Teasers, X (Twitter) Feed.
*   **Estimated Cost:** $0 (Included in the base image generation budget above).
*   **The Tool:** **Flux.1 Dev + Custom LoRA + Lo-Fi LoRAs**
*   **The Justification:** Using the exact same base model/LoRA ensures facial consistency, augmented by specific "grainy phone camera" LoRAs to emulate amateur lighting and flash photography.

### 3. Monetized Explicit Photos (Fanvue / OF)
*   **The Content:** Highly suggestive, lingerie, and explicit content.
*   **Target Platform:** Fanvue (Paywall), Telegram VIP Group.
*   **Estimated Cost:** ~$15-30/month (RunPod pay-as-you-go GPU rental or PixelBunny.ai).
*   **The Tool:** **Flux.1 Dev + Custom LoRA + Uncensored Cloud GPU (RunPod / PixelBunny.ai)**
*   **The Justification:** Fanvue content generation pipelines cannot be shut down by corporate API updates. We run Flux.1 Dev and our LoRA inside a private ComfyUI instance on a rented RunPod GPU to bypass all safety filters natively.

### 4. Cinematic B-Roll (Reels Backgrounds)
*   **The Content:** Non-speaking video clips (walking, posing, drinking coffee).
*   **Target Platform:** Instagram Reels, YouTube Shorts, Facebook Reels. ~~TikTok — DEPRECATED~~
*   **Estimated Cost:** ~$5/month (Wan AI 2.2 — 300 credits/month covers 40–60 Reels).
*   **The Tool:** **Wan AI 2.2 Image-to-Video (Start Frame method)**
*   **The Justification:** Wan AI 2.2 at $5/month replaces HeyGen ($2–6/min) and Kling for standard B-roll. Always generate a static Flux.1 Dev image first and use it as Start Frame — gives 30–40% better consistency. See `master_decisions_log.md` §4.

### 5. Lip-Synced Talking Head Videos (Reels / GFE)
*   **The Content:** Jasmine speaking directly to the camera, used for vlogs or answering Fanvue messages.
*   **Target Platform:** Instagram Reels, Fanvue PPV (Pay-Per-View) Messages. ~~TikTok — DEPRECATED~~
*   **Estimated Cost:** ~$5/month (included in Wan AI 2.2 plan or Higgsfield Seedance 2.0).
*   **The Tool:** **Wan AI 2.2 S2V or Higgsfield Seedance 2.0** (ElevenLabs audio → lip-sync)
*   **The Justification:** Generate Flux.1 Dev static reference image → feed as Start Frame → Wan AI animates speaking. ElevenLabs provides the voice audio. Result: consistent GFE talking head video at near-zero marginal cost.

### 6. Voice & Audio Assets
*   **The Content:** Custom voice model for scripts and Fanvue voice notes.
*   **Target Platform:** Fanvue Voice Notes, Voiceovers for Reels/Instagram Shorts. ~~TikToks — DEPRECATED~~
*   **Estimated Cost:** ~$5/month.
*   **The Tool:** **ElevenLabs or Cartesia.ai**
*   **The Justification:** ElevenLabs remains high quality, but Cartesia.ai is the 2026 standard for sub-40ms latency and drastically cheaper volume scaling for daily Fanvue audio messages. 

### 7. Automated Fanvue / DM Interactions
*   **The Content:** Real-time, responsive NSFW/SFW chat with subscribers.
*   **Target Platform:** Fanvue Direct Messages, SpicyChat AI interface.
*   **Estimated Cost:** ~$15/month (OurDream or SpicyChat Premium).
*   **The Tool:** **OurDream.ai or SpicyChat AI**
*   **The Justification:** Uncensored Roleplay models. OurDream.ai is the 2026 leader due to zero filters combined with integrated visual replies, allowing Jasmine to respond with text + contextual images generated on the fly.

---

## Production Workflow (How It Operates)

1. **Dataset Generation:** Taking our curated 100+ images (from Grok).
2. **LoRA Training (Next Step):** Upload the dataset to Civitai / RunPod to train the **Flux.1 Dev LoRA**. 
3. **Daily Generation:** Use ComfyUI / Civitai to prompt Flux.1 Dev + our LoRA (augmented with IP-Adapter & Flux Kontext for zero-drift consistency).
4. **Animation:** Pass static images to **Wan AI 2.2** as Start Frame for B-roll; use **Wan AI S2V or Higgsfield Seedance 2.0** for speaking videos.
5. **Distribution:** Polish in CapCut and schedule via Metricool.
