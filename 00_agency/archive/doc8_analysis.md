# Document 7 & 8 Analysis: The Wan AI Pivot

**Source:** `grok-chat (6).json` (Doc 7) and `grok-chat (7).json` (Doc 8).

## Overview
Document 7 was an exact duplicate of Document 5. 
Document 8 is a critical piece of the puzzle. It completely resolves the "Tech Stack Collision" by confirming that the ultimate, high-quality, high-consistency video generation layer will be powered by **Wan AI (Alibaba Cloud)**.

## 1. HeyGen Evaluation (Discarded)
The conversation briefly explored HeyGen's API and Digital Twin features. While HeyGen offers a powerful 15-second "Character Swap" (Image + driving video), the backend API costs ($2–$6 per minute of generated video) do not align with our low-budget scalability constraints.

## 2. The Wan AI ($5/month) Breakthrough
The user pivoted to **Wan.video** (Wan2.1 / Wan2.2 models), which features a pro tier at exactly $5/month. This tier provides enough credits for 40-60 accelerated short IG Reels per month.

Wan AI offers the exact tools required to execute our viral 1:1 cloning strategy:
*   **Wan2.2-Animate (Character Swap):** Takes **1 static image** of Rhea Voss + **1 scraped viral video** (5-15 seconds) and maps the motion, pose, and background exactly to the image. This solves Reel Types 1, 2, and 7 (Dances, Transitions, GRWM).
*   **Speech-to-Video (S2V):** Takes **1 static image** + **1 audio clip** (ElevenLabs) and generates perfectly lip-synced talking head videos with natural head/body movements. This solves Reel Types 3, 4, 5, and 6 (Talking, Reactions, Reviews).

## 3. The Prompt Recipe
The official Alibaba developer docs outlined a strict "Prompt Recipe" which must be integrated into our Agent/Bible for Wan AI generation:
> `Prompt = Subject (Description) + Scene (Description) + Motion (Description) + Aesthetic Control + Stylization`

## Strategic Update
The "Open-Ended" tech stack is officially closed out. The final, operational production pipeline is:
1.  **Image Base:** Z-Image Turbo / Flux (via Civitai IceKiub workflows to train the Rhea Voss LoRA).
2.  **Video Motion:** Wan.video ($5 Pro Tier).
3.  **Content Strategy:** Scraping viral Instagram reels to feed as the "Driving Videos" into Wan.video's Animate layer.

## Recommended Task Updates
We need to update Task 61 to reflect Wan.video as the locked motion engine. We must also update Task 64 to include the Wan AI "Prompt Recipe" specifically.
