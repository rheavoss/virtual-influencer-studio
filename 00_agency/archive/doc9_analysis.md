# Document 9 Analysis: HeyGen Deep-Dive & Wan AI Production Playbook

**Source:** `grok-chat (8).json` (Extracted to `doc_9_grok_8.md`)

## Overview
Document 9 is a highly technical session with two parts: first, a detailed evaluation of HeyGen's Avatar API, and second, a comprehensive breakdown of how Wan AI's `$5/month Pro` plan is the definitive execution engine for **all 7 of Rhea Voss's Reel types**. This document closes out all remaining ambiguity around the video production pipeline.

---

## Part 1: HeyGen API Evaluation (Result: Disqualified)

### Why It Was Evaluated
HeyGen offers a "Character Swap" feature identical to Wan AI: 1 static image + 1 reference video (≤15s) → realistic animated talking-head output. This was attractive on the surface.

### The Dealbreaker: Cost
| HeyGen Engine | Cost |
|---|---|
| Digital Twin III (standard) | ~$2/minute of final video |
| Digital Twin IV (premium) | ~$6/minute of final video |
| Digital Twin Training (via API) | Enterprise-only, contact sales |

At $2–$6 per minute and a target of 40–60 Reels/month, HeyGen becomes **extremely cost-prohibitive** vs. Wan AI's $5/month flat rate. **Verdict: Eliminated.**

### Key HeyGen Technical Notes (for Task 37)
These were captured as important operational details to store in `character_bible.json` if HeyGen is ever re-evaluated:
*   `avatar_id` and `voice_id` must be stored permanently.
*   Generated video URLs **expire after 7 days** — must be downloaded to Google Drive immediately.
*   Training footage uploads must use **S3 or Dropbox** raw URLs. Google Drive links are broken on the HeyGen API.
*   `POST https://api.heygen.com/v2/video_avatar` is the Digital Twin training endpoint.

---

## Part 2: Wan AI ($5/month) — The Definitive Production Playbook

This part confirms Wan AI as the primary motion/video engine and provides a **reel-type-by-reel-type** execution blueprint using the official Wan AI User Guide (Alibaba DingTalk docs).

### Wan AI Model Architecture
| Wan Feature | Use Case for Rhea Voss |
|---|---|
| **Wan2.2-Animate (Character Swap)** | Dance reels, GRWM, OOTD — 1 image + 1 muted ref video ≤15s |
| **Speech-to-Video (S2V)** | Talking head, product reviews, commentary — 1 image + ElevenLabs audio |
| **VACE (Video Creation & Editing)** | Chaining clips, outfit changes, product close-ups, PiP overlays |
| **Reference-to-Video (R2V)** | Up to 150 reference frames for ultra-consistent identity lock (Wan2.6 "Starring" mode) |
| **First-Last Frame Mode** | Longer controlled shots stitched seamlessly |

### The Official Wan Prompt Recipe
> `Subject (description) + Scene (description) + Motion (description) + Aesthetic Control + Stylization`
- Write in natural language sentences, not Stable Diffusion keyword tags.
- 80–120 words per prompt is the recommended length.
- Use the built-in **Qwen LLM prompt extension** to auto-enrich details.
- Be specific: *"she slowly lifts her right hand, smiles with teeth, soft volumetric indoor lighting, cinematic teal-orange grade"* → not vague terms.

### 7 Reel Types — Wan AI Execution Map

| Reel Type | Wan Mode | Credits Used | Key Detail |
|---|---|---|---|
| 1. Non-Speaking Dance | Animate | 1 credit block | Upload muted dance ref video; overlay trending song in CapCut post |
| 2. GRWM (no speaking) | Animate + VACE | 1–2 blocks | VACE chains 2–3 outfit segments; keeps identical face and lighting |
| 3. Comedy Lip-Sync | S2V | 1 block | Upload external audio or ElevenLabs clone; expressive prompt |
| 4. Authentic Speaking | S2V + ElevenLabs | 1 block | Script → ElevenLabs → export audio → S2V with character image |
| 5. Product Review | S2V + VACE | 1 block | Prompt her holding product; VACE adds close-up insert |
| 6. Trend Reaction | S2V + Optional VACE | 1–2 blocks | VACE for PiP overlay of trend footage beside Rhea |
| 7. Fashion Transition/OOTD | Animate | 1 block | Animate + quick transition ref video; trending music overlaid |

### Monthly Output on $5 Pro Plan
- **300 credits/month.**
- Typical credit cost per Reel: **4–8 credits** (accelerated queue).
- Realistic monthly output: **40–60 finished Reels/month** (enough for daily posting).
- **Unlimited slow generations** for prompt experimentation/testing at zero credit cost.
- Enterprise API (via `wan_ai@service.alibaba.com`) for automation when ready.

---

## Key Decisions Locked by This Document
1.  **HeyGen is permanently disqualified** on cost grounds. This is confirmed, not revisited.
2.  **Wan AI ($5 Pro) is the primary video motion engine.** All 7 Reel types are executable within the monthly credit budget.
3.  **The Wan Prompt Recipe** (natural language sentences, 80–120 words) must be the standard in `character_bible.json` and the agent — keyword-style SD prompts degrade Wan's output quality.
4.  **VACE is the professional chaining tool** for multi-segment reels (GRWM, Product Review, Trend PiP) — this is distinct from basic Animate/S2V and must be a first-class workflow.

## Tasks Confirmed/Reinforced by This Document
- **Task 29** (Wan AI Generation Pipeline Setup): Fully validated.
- **Task 36** (Wan-Specific Compressed Prompt Schema): The official recipe format is now documented above.
- **Task 37** (HeyGen Avatar ID Storage Protocol): Still valid as a future-proofing task even though HeyGen is disqualified for primary use.
- **Task 38** (VACE Multi-Mode Workflows): Validated — VACE is explicitly required for GRWM, Product Review, and Trend Reaction reel types.
