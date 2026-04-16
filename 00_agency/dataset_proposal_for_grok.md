# VERIFICATION REQUEST: AI Influencer Dataset Generation Pipeline

**Objective:** Build a custom Flux.1 Dev LoRA to permanently lock the identity of Jasmine Mako for Instagram/Fanvue monetization.

## 1. The Core Problem Statement

To train a high-quality LoRA on Vast.ai (see P0-07), the trainer requires a dataset of 47 images with **consistent facial geometry**.

- **The Flaw in the Current Dataset:** We have 27 images generated via Grok. While body type and aesthetic are correct, some images have subtle face drift. If we feed morphing faces into a LoRA trainer, the resulting model will generate a blurry or averaged face.
- **The Hardware/Tooling Blockers:**
  1. Mac lacks the GPU required to run ComfyUI locally
  2. Browser-based cloud UIs (Colab / HuggingFace Spaces) crash during automated generation
  3. Proprietary platforms (Midjourney, Krea) enforce safety filters, killing the Fanvue model

**Bottleneck:** Cannot train the LoRA because we cannot generate the remaining 20 identical training images due to local hardware limits and browser instability.

---

## 2. The Proposed Solution

Programmatically generate the 20-image gap by hitting a cloud GPU **API** using a Python script.

- **Technology:** PuLID for Flux.1 Dev — tuning-free ID customization. Injects a perfect identity into Flux.1 generation without training.
- **Provider:** Fal.ai serverless API (`fal-ai/flux-pulid`)
- **Script:** `03_ai_models/jasmine_mako/generation/generate_dataset.py` (ready to run)

**Execution Plan:**
1. Place the single best approved Jasmine reference image at `jasmine_reference.jpg`
2. Set `export FAL_KEY="your-key"` (from credentials vault)
3. Run `python generate_dataset.py`
4. Script loops through 20 scene prompts (different outfits, lighting, angles)
5. Cloud API (H100 GPU, ~10s/image) locks facial geometry to reference photo
6. 20 images downloaded to `03_ai_models/jasmine_mako/training_data/jasmine_dataset/`

**Cost & Time:** ~$0.40–$0.60 total in Fal.ai credits. ~5 minutes runtime.

**Result:** 47-image dataset ready for Vast.ai Flux.1 Dev LoRA training (P0-07).

---

## 3. Character Spec Reminder for Reviewer

Jasmine spec (source of truth: `01_characters/jasmine/jasmine_character_bible.json`):
- East Asian, 24yo, 163cm/52kg, 32DDD-23-36
- **NO tattoo** (previously had kiss mark — removed Apr 2026)
- No flush, no redness, matte natural skin
- Negative prompt includes: tattoo, rosy flush, BBW, plus-size

---

**Prompt for Grok Reviewer:**
*Given the blockers (no local GPU, browser failure, 27/47 images done) and the goal (Flux.1 Dev LoRA for Fanvue influencer), is the proposed solution (Python script → Fal.ai PuLID → 20 face-locked images → Vast.ai LoRA trainer) the most technically sound approach? Any better alternatives in April 2026?*
