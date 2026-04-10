# Document 12: The Sofia Ansari Pivot & Architecture Update
*Date: Session 2026-04-09*

## 1. Strategic Pivot
- **Decision:** The "Rhea Voss" persona is officially put on hold.
- **New Direction:** We are copying a market-proven model. We are creating a new AI influencer based entirely on the body shape, aesthetic, and content pillars of **Sofia Ansari**.
- **The Catch:** While she has Sofia's exact body type and vibe, she will have a completely different face and a lighter skin tone to remain legally distinct.

## 2. Dataset Readiness
- 368 images were scraped via `gallery-dl` from Facebook/Instagram.
- Filtered via `curate.py`.
- **Final Training Dataset:** 317 perfectly curated images in `sofia ansari training data/training_ready/`.

## 3. The Technical Shift: From "Rhea Method" to "LoRA Method"
The technical architecture of how the character is locked has fundamentally shifted.
- **The "Rhea Method" (Old):** Reliant on a massive, "straightjacket" text prompt + a single reference image passed into Image-to-Image (or `--cref`).
  - *Why it worked before:* Perfect for static, standing-pose Instagram photos.
  - *Why it fails now:* Cannot maintain structural integrity of a unique body type in 3D space for dynamic motion (squats, dancing, yoga).
- **The "LoRA Method" (New):**
  - We use the 317 images to train a custom Flux.1 LoRA via Replicate.
  - This mathematically forces the base model to learn Sofia's explicit 3D body volume and dimensions.
  - We will use exact text prompting to override the LoRA's default skin tone (brown) to the new desired tone (lighter shade), and use Face-Swapping (Kontext) or IP-Adapter to inject the new Face ID.

## 4. Google Veo 3 / Nano Banana / Vids Integration
- Research conducted on Google's DeepMind models.
- **Veo 3** supports native "Character Controls" and Motion Transfer. It can take a driving video (Sofia dancing) and an input image (our Master ID), generating a highly consistent video without complex 3rd-party face-swap pipelines.
- **Conclusion:** We will likely transition video generation away from Wan AI directly to Veo 3 / Google AI Studio for superior native consistency.

## 5. Parameter Definition Framework Extracted
- The user supplied the exact production JSON parameter schema used by enterprise pipelines (Seedance/Enhancor).
- These have been permanently saved to:
  - `01_character_bible/seedance_parameter_schema.json`
  - `01_character_bible/seedance_parameter_framework.md`
- Future character definitions (like the upcoming Sofia-based persona) will be built using this strict API-style schema rather than loose conversational text.
