#!/usr/bin/env python3
"""
jasmine_batch_generator.py
Batch 1 - Jasmine Mako LoRA Training Dataset (J001-J020)
Uses Google Gemini API (Imagen 3) — SFW Instagram content only.
Batches 2-3: Use colab_flux1_generator.ipynb instead.

SETUP:
  1. Get free API key → https://aistudio.google.com → "Get API Key"
  2. pip install google-genai pillow
  3. Set your API key in the CONFIG block below
  4. Run: python jasmine_batch_generator.py
"""

import json
import os
import time
import sys
from pathlib import Path

# ─── CONFIG ──────────────────────────────────────────────────────────────────
API_KEY      = "PASTE_YOUR_GOOGLE_AI_STUDIO_KEY_HERE"   # aistudio.google.com
PROMPTS_FILE = "jasmine_prompts_batch1.json"             # same folder as script
OUTPUT_DIR   = "jasmine_output_batch1"                   # images saved here
BATCH_FILTER = 1                                         # only process batch:1 records
ASPECT_RATIO = "9:16"                                    # portrait (Instagram/Fanvue)
IMAGES_PER_PROMPT = 2                                    # generate 2, keep the better one
DELAY_BETWEEN = 4                                        # seconds between API calls (rate limit)
# ─────────────────────────────────────────────────────────────────────────────


# Jasmine's core character anchor — prepended to EVERY prompt.
# This replaces the "reference image" feature we don't have in the free API.
JASMINE_ANCHOR = (
    "Ultra-realistic photographic portrait of Jasmine Mako, a 23-year-old Northeast Indian woman. "
    "Round very full cheeks, wide soft face with high facial fat, extremely youthful and cushioned face shape. "
    "Dark brown almond-shaped eyes, natural soft double eyelids, straight dark eyebrows. "
    "Small straight nose with a rounded soft button tip. "
    "Full pillowy lips, soft natural cupid's bow, no visible lip liner. "
    "Soft rounded jawline, no angular definition, blends gently into neck. "
    "Direct unflinching camera gaze, warm and slightly seductive but serene. "
    "Milky white extremely fair skin, ultra-realistic raw unedited skin texture, "
    "visible natural pores and micro-imperfections, no blush, no heavy makeup, no beauty filter applied. "
    "2 to 3 small natural acne marks on left cheek only. "
    "Small dark beauty mark mole on center of chest. "
    "Small red lipstick kiss mark tattoo located right above her deep cleavage on upper chest. "
    "Small black cross tattoo on front right collarbone. "
    "G-cup massive natural breasts, voluptuous curvy build, wide hips, thick thighs. "
    "Dark espresso to black hair, silky thick loose voluminous waves, center parted, "
    "cascading over shoulders. "
    "Shot on Canon EOS R5 85mm f/1.8 lens. Natural light. 4K ultra-sharp. Photorealistic. "
    "NOT a cartoon, NOT anime, NOT AI art style, NOT airbrushed, NOT plastic skin. "
    "Hyper-realistic photograph indistinguishable from real photography. "
)

NEGATIVE_PROMPT = (
    "plastic skin, barbie skin, overly smooth skin, airbrushed skin, beauty filter, "
    "doll-like skin, waxy skin, AI artifacts, anime, cartoon, low quality, blurry, "
    "deformed, extra fingers, missing fingers, bad anatomy, sharp jawline, thin face, "
    "angular cheekbones, slim body, flat chest, small breasts, narrow hips, toned body, "
    "wrong face, face morphing, different face proportions, extra limbs, watermark, text"
)


def setup():
    """Install dependencies and configure API."""
    try:
        from google import genai
    except ImportError:
        print("Installing google-genai...")
        os.system(f"{sys.executable} -m pip install google-genai pillow -q")
        from google import genai

    if API_KEY == "PASTE_YOUR_GOOGLE_AI_STUDIO_KEY_HERE":
        print("\n❌  ERROR: You haven't set your API key.")
        print("    Get one free at: https://aistudio.google.com")
        print("    Then paste it into API_KEY in the CONFIG block.\n")
        sys.exit(1)

    client = genai.Client(api_key=API_KEY)
    return client


def load_prompts(filepath, batch_filter):
    """Load JSON and filter to the target batch only."""
    with open(filepath, "r") as f:
        all_prompts = json.load(f)

    batch = [p for p in all_prompts if p.get("batch") == batch_filter]
    print(f"📋  Loaded {len(batch)} prompts from batch {batch_filter}")
    return batch


def generate_single(client, prompt_id, scene_prompt, output_dir, images_per_prompt):
    """Call Imagen 3 API and save the best image."""
    from google.genai import types

    full_prompt = JASMINE_ANCHOR + scene_prompt

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        response = client.models.generate_images(
            model="imagen-3.0-generate-002",
            prompt=full_prompt,
            config=types.GenerateImagesConfig(
                number_of_images=images_per_prompt,
                aspect_ratio=ASPECT_RATIO,
                safety_filter_level="BLOCK_ONLY_HIGH",
                person_generation="ALLOW_ADULT",
            ),
        )

        saved = []
        for i, img in enumerate(response.generated_images):
            suffix = "" if images_per_prompt == 1 else f"_v{i+1}"
            output_path = output_dir / f"{prompt_id}{suffix}.png"
            img.image.save(str(output_path))
            saved.append(str(output_path))

        print(f"  ✅  {prompt_id} → {len(saved)} image(s) saved")
        return saved

    except Exception as e:
        error_msg = str(e)
        if "safety" in error_msg.lower() or "blocked" in error_msg.lower():
            print(f"  ⛔  {prompt_id} blocked by safety filter — skipping")
        elif "quota" in error_msg.lower() or "rate" in error_msg.lower():
            print(f"  ⏳  {prompt_id} rate limited — waiting 30s...")
            time.sleep(30)
            return generate_single(client, prompt_id, scene_prompt, output_dir, images_per_prompt)
        else:
            print(f"  ❌  {prompt_id} failed: {error_msg}")
        return []


def main():
    print("\n" + "═" * 60)
    print("  JASMINE MAKO — Batch 1 LoRA Training Dataset Generator")
    print("  Powered by Google Imagen 3 (Gemini API)")
    print("═" * 60 + "\n")

    client     = setup()
    prompts    = load_prompts(PROMPTS_FILE, BATCH_FILTER)

    total      = len(prompts)
    success    = 0
    failed     = []
    all_files  = []

    print(f"\n🚀  Starting generation — {total} prompts × {IMAGES_PER_PROMPT} images each\n")

    for idx, item in enumerate(prompts, 1):
        pid   = item["id"]
        scene = item["scene"]

        print(f"[{idx:02d}/{total}]  Generating {pid}...")

        files = generate_single(client, pid, scene, OUTPUT_DIR, IMAGES_PER_PROMPT)

        if files:
            success += 1
            all_files.extend(files)
        else:
            failed.append(pid)

        # Rate limit buffer (free tier: ~10 req/min)
        if idx < total:
            time.sleep(DELAY_BETWEEN)

    # ── Summary ──────────────────────────────────────────────────────────────
    print("\n" + "═" * 60)
    print(f"  DONE")
    print(f"  ✅  {success}/{total} prompts succeeded")
    print(f"  📁  Output folder: {Path(OUTPUT_DIR).resolve()}")
    print(f"  🖼️   Total images: {len(all_files)}")

    if failed:
        print(f"\n  ❌  Failed ({len(failed)}): {', '.join(failed)}")
        print("      → Try re-running just these with IMAGES_PER_PROMPT = 1")
        print("      → Or regenerate on Grok/NanaBananaPro manually for blocked prompts")

    print("\n  NEXT STEP: QC review — keep best image per prompt ID,")
    print("  delete alternates, then upload J001-J020 to Civitai for LoRA training.")
    print("═" * 60 + "\n")


if __name__ == "__main__":
    main()
