# Seedance 2.0 (Cedence) — UGC Product Integration

This document archives the specific capabilities of Seedance 2.0 (often transcribed as Cedence 2.0 or Cense 2.0) operating within Enhancor.ai, as extracted from the second Sirio Berati YouTube transcript.

## Core Thesis
The video argues that AI has effectively "killed traditional UGC influencers" because specialized video models can now handle **physical product consistency**, which was previously the massive failing point of AI video generators (i.e., text would melt, logos would warp, hands holding the product would turn into claws).

## Main Capabilities of Seedance 2.0 (UGC Mode)

### 1. High-Fidelity Product Handling
*   **Object Permanence:** The model can maintain the structure, shape, and label text of real physical products (e.g., a protein bar wrapper, a skincare bottle, a gym bag) while the AI influencer holds it, rotates it, and talks about it.
*   **Text Rendering:** Text on labels and packaging stays legible and mostly avoids the "melting/morphing" effect common in Gen-2 or early Kling models.
*   **Physics:** It can simulate correct physics for human hands holding, squeezing, or pointing at the product.

### 2. Built-in Multi-Modal Lip Sync
*   You can upload a custom voice track (either your own human voice or a generated TTS) directly into the UI.
*   The model natively maps the lip movements of the avatar to the audio in the same generation pass, bypassing the need for a secondary tool like Sync.so.

### 3. Multi-Input / Mood Board Mode
*   Unlike standard generators that accept 1 image + 1 text prompt, Seedance allows for **Multi-Input generation**.
*   You supply:
    1.  The character face lock (Anchor image)
    2.  The product image
    3.  A "Vibe/Mood" image (e.g., a specific gym lighting shot or beach scene).
*   The model synthesizes these three distinct images into one cohesive video.

### 4. Enterprise AI Agent Mode
*   **The Workflow:** You paste a URL for a Shopify product or Amazon listing.
*   The internal Agent scrapes the product details, auto-generates 5 different UGC ad scripts, and automatically renders the video variations for A/B testing without further human prompting.

## Known Limitations (As of Early 2026)
The video honestly admitted several ongoing flaws with the model:
1.  **Physics Hallucinations:** Occasionally, the Avatar squeezes a solid object as if it were made of sponge, or fingers clip slightly into the packaging.
2.  **Minor Text Morphing:** Very small text on the back of bottles still morphs and wiggles due to temporal instability.
3.  **"Phantom Words":** The lip-sync engine occasionally adds an extra mouth movement or "word" at the end of the video that wasn't in the audio track.

## Application to Jasmine
Seedance 2.0 proves that the technology to automate highly lucrative product sponsorships (gym wear, supplements, travel bags) completely exists. By writing robust prompts, Rhea can hold "real" products to drive affiliate traffic or execute paid brand deals.
