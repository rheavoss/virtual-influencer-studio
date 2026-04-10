# Document 5 Analysis: The 7 Reel Types & Veo/Z-Image Stack

**Source:** `grok-chat (4).json` (Extracted to `doc_5_grok_4.md`)

## Overview
Document 5 is a very short, localized conversation (2 messages) where the user tests an RTF transcript against a highly structured production table. This document introduces a specific pipeline for churning out 7 specific Instagram Reel formats.

## 1. The 7 Reel Types Framework
The user provides a blueprint mapping exactly what AI elements and "blocks" are needed for specific Instagram Reel formats. This is highly actionable and provides a roadmap for what exact content the production engine must support:

1.  **Non-speaking Dance:** Motion control (Trending dance ref) + Trending song.
2.  **GRWM (Get Ready With Me):** Outfit transitions + Background music.
3.  **Comedy / Movie Dialogue Lip-Sync:** Expressive gestures + external audio clip.
4.  **Authentic Speaking:** Talking-head + Real gestures + Generated voice.
5.  **Snack / Product Review:** Talking head + reactions (High monetization value).
6.  **Trend Reaction / Commentary:** Expressive face + trend sound.
7.  **Fashion Transition / OOTD:** Quick pose changes + trending music.

## 2. The Tech Stack Dilemma
This document explicitly names a different tech stack than what was settled on at the end of Document 4.
*   **Document 4 Final Decision:** Zero-Cost Free Stack (Flux.1 Dev, ComfyUI, Wan Animate, ElevenLabs).
*   **Document 5 Proposition:** Paid / High-End Stack (**Z-Image Turbo**, **Veo 3.1 Motion Control**, **ElevenLabs**).

Grok's analysis in this document confirms that using Z-Image Turbo for the "Start Frame" and feeding it into Veo 3.1 alongside a "Reference Video" (motion control) will perfectly execute the 7 reel types.

## 3. Workflow Insights (The "Start Frame" Technique)
The core insight extracted from the RTF transcript in this document is the strict adherence to an **Image-First Workflow**:
1.  Never generate a video from a raw text prompt.
2.  Always generate a hyper-realistic, consistent image of Rhea Voss first (using the `character_bible.json`).
3.  Feed that static image into the video generator (Veo 3.1) as the **Start Frame**.
4.  Provide a **Reference Video** (a real human doing the dance, reviewing the snack, etc.) to drive the motion accurately.

## Pending Questions for the Master Plan
1.  **Tech Stack Collision:** Which stack are we officially building the agent for? The Zero-Cost Local stack (Task 61) or the Z-Image Turbo & Veo 3.1 stack outlined here?
2.  **Reel Types Table:** Should we add these 7 reel types to the `character_bible.json` or the master task list so the agent knows exactly what "blocks" are required when prompted for a "GRWM" reel vs a "Dance" reel?
