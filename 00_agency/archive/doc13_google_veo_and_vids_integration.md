# Document 13: Google Veo 3 & Google Vids Integration Analysis
*Date: Session 2026-04-09*

This document captures the analysis of Google's DeepMind models (Veo 3.1, Nano Banana / Gemini Image) and Google Vids as alternatives to the current Replicate/Wan AI stack.

## 1. Google Veo 3: The Video Engine
DeepMind's Veo 3 offers native capabilities that completely replace our multi-tool pipeline (Wan AI + Face Swap). 

**Key Capabilities Extracted:**
- **Text-to-Video & Image-to-Video:** Generates highly realistic 1080p outputs.
- **Native Audio Generation:** Generates environmental audio and dialogue *with* the video in a single pass. This is crucial for GFE realism (e.g., sounding like a real gym environment rather than a mute video with dubbed music).
- **Character Consistency:** Natively locks character appearance across different prompt scenes using reference images. This potentially eliminates the need for an external Face-Swap pipeline.
- **Character Controls (Motion Transfer):** Takes an Input Video (e.g., Sofia dancing) AND an Input Image (our new Master ID of the influencer). Veo 3 then drives the character using the motion of the video. This is the exact "Motion Transfer" process we previously did with Kling/Wan AI.

**Strategic Pivot:** Veo 3 natively replaces 3 steps of our old pipeline. We will use Google AI Studio to run inference via Veo 3 for all video content (The 7 Reel Types).

## 2. Google Vids: The Workspace Engine
- Google Vids is tightly integrated into Google Workspace.
- It is primarily geared toward enterprise video creation (prompt-to-storyboard).
- **Application to Project:** While Vids provides a high-level UI, we require surgical control over the specific Veo 3 model weights and input arrays to ensure the influencer's face doesn't drift. Google AI Studio (direct API access) is preferred over Google Vids UI for generating the actual Reels.

## 3. Nano Banana (Google's Image Model) vs Replicate (Flux.1 LoRA)
The project faced a critical choice in how to "clone" Sofia Ansari's body:

**Approach A: Nano Banana (Reference / Zero-Shot)**
- Fast, no training required.
- Uses 1-4 images as a "style reference".
- *Failure Point:* It cannot mathematically learn the 3D volume, exact proportions, and geometric physics of a specific human body from multiple angles. It "guesses" the body shape if the pose changes.

**Approach B: Replicate Flux.1 LoRA (The Chosen Path)**
- Training cost: ~$5 to $8 one-time.
- Generation cost: ~$0.03 to $0.05 per image.
- *Success Point:* By uploading 317 diverse images of Sofia into the Flux.1 trainer, the model permanently alters its latent space to understand her specific body geometry. This ensures her body shape does not warp or change regardless of the text prompt or pose.

**Conclusion:** We MUST use Replicate (Flux.1) to train a LoRA on the 317 body images to ensure structural consistency. Nano Banana / Veo 3 can be used for the inference/video generation phase once we have our "Master ID".
