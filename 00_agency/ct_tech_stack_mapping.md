# Sonia CT → Tech Stack Mapping
**Project:** Virtual Influencer Studio — Sonia
**Version:** 2026-04-18 (Grok-verified, final)
**Source:** Grok analysis + Claude draft → Grok finalised
**Status:** OFFICIAL — use this for all production decisions

---

## CT → Primary Tools

| CT Type | Primary Tool(s) | Why Best Fit | Cost per Piece (approx.) | Automation (API?) |
|---|---|---|---|---|
| **CT1 — Viral Clone Reel** | Higgsfield (Kling/Veo) + Flux LoRA | Best cinematic motion transfer + identity lock; reference sheets ensure Sonia consistency | ₹15–35 | Higgsfield API + fal.ai ✅ |
| **CT2 — Face Swap Reel** | Wan AI 2.2 T2V + Jasmine Wan LoRA | Excellent face swap + motion preservation; low cost | ₹8–20 | Wan API (fal.ai) ✅ |
| **CT3 — Talking Head** | Higgsfield (Veo 3.1) + OmniVoice | Native audio/dialogue + lip-sync; cinematic quality | ₹6–12 | Higgsfield API ✅ + local voice |
| **CT4 — GRWM / Outfit Transition** | Higgsfield (Nano Banana Pro + VACE) + Flux LoRA | Perfect outfit consistency + seamless transitions | ₹12–25 | Higgsfield API ✅ |
| **CT5 — Lifestyle / Travel UGC** | Higgsfield (Seedance 2.0 fallback) | Multi-reference cinematic scenes; best for realistic locations | ₹0 marginal (subscription) | Higgsfield API ✅ |
| **CT6 — Trend Reaction** | Wan VACE (PiP mode) + Higgsfield | Fast picture-in-picture reaction box + high quality | ₹8–18 | Wan API + Higgsfield API ✅ |
| **CT7 — Product Review / UGC Ads** | Higgsfield + OpenMontage (Claude orchestration) | Full agentic pipeline for professional ads with product integration | ₹15–40 per ad variant | Full pipeline (Higgsfield + OpenMontage) ✅ |
| **CT8 — Carousel (Static Multi-Image)** | Flux Kontext 9B + Z-Image LoRA | Perfect consistency across slides; cheapest for statics | ₹5–15 (8 slides) | fal.ai API + ComfyUI JSON ✅ |

---

## Stack Coverage Summary

| Tool | CTs Covered | Monthly Cost (est.) | Notes |
|---|---|---|---|
| **Higgsfield** (primary) | 1, 3, 4, 5, 6, 7 | ₹840–1,200 | Cinematic engine — default for high-quality CTs |
| **Wan AI** (via fal.ai) | 2, 6, 8 | ₹420 | Core low-cost workhorse |
| **Flux Kontext 9B** (fal.ai) | 1, 4, 8 | ₹25–50 | Identity lock |
| **OpenMontage** | 7 (orchestration) | ₹0 (OSS) | Agentic pipeline |
| **OmniVoice** (local) | 3, 7 | ₹0 | Voiceover |
| **CapCut + FFmpeg** | All | ₹0 | Final assembly |

**Total estimated monthly stack cost: ₹1,300 – 1,700**

---

## Key Decisions

- Higgsfield is primary cinematic engine for CTs 1, 3, 4, 5, 6, 7 (per P0-32 priority)
- Seedance kept as fallback only — strict NSFW filters make it risky for sensual content
- Runway Gen-4.5 is optional backup only — Wan + Higgsfield cover it cheaper
- Full automation path confirmed for every CT type
