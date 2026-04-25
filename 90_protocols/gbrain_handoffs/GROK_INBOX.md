# GROK INBOX — Questions or tasks for Grok

---

## RESEARCH REQUEST: Jasmine v3 LoRA Training Pipeline
**Date:** 2026-04-25
**From:** Claude
**Priority:** CRITICAL — blocks training execution
**Context:** We have 62 curated training images in `/Users/user/Desktop/jasmine_lora_v3/`. All images have Kling AI watermark bottom-right corner. Previous v2 LoRA failed because watermarks were baked into weights during training. v3 must not repeat this.

**Research needed before we touch any tool:**

### Q1 — Watermark Removal
- Best current tool for batch Kling watermark removal on 62 PNGs (1536×2720): lama-cleaner vs iopaint vs any newer 2025/2026 alternative?
- Can lama-cleaner run on Mac CPU for 62 images in reasonable time, or is GPU mandatory?
- Any known issues with lama-cleaner leaving artifacts at inpaint boundary?
- Is there a batch CLI command (loop over folder) or must each image be processed individually?

### Q2 — Caption Strategy
- For a face/character LoRA (FLUX.1 Dev, ai-toolkit/ostris), what caption strategy produces sharpest identity lock: (a) trigger word only, (b) trigger word + detailed description per image, (c) JoyCaption auto-generated per image?
- Is JoyCaption still the recommended captioning tool for FLUX.1 LoRA in 2026?
- With 62 images (mix of face close-ups, full-body, seated, rear views), does caption strategy differ by image type?

### Q3 — Training Config Validation
- We were going to use: 2000 steps, rank 16, lr 1e-4, bf16, quantize true. Dataset was 40 images. Now it's 62 images. Should steps, rank, or lr change?
- Is 62 images too many (overfitting risk) or still in safe range for FLUX.1 Dev LoRA?
- Any ai-toolkit (ostris) updates since April 2026 that change recommended settings?

**Decision needed:** Watermark tool + caption approach + final config params. Do NOT proceed to Vast.ai until Grok clears this.

---

## RESEARCH REQUEST: Alua Platform Viability
**Date:** 2026-04-24
**From:** Claude
**Priority:** High — blocks platform strategy decision

**Context:** @myvonnieta (AI influencer) uses Alua as primary monetization destination from IG. Alua offers 80% revenue share, internal discovery (5M fans), built-in chat monetization, geo-blocking. Considering running Alua + Fanvue both Day 1.

**Questions for Grok to research:**
1. Does Alua allow AI-generated / virtual creator content? Any policy against it?
2. Does Alua have real internal discovery — do new creators actually get organic fans, or is it bring-your-own-traffic like OnlyFans?
3. India payout options — can Indian creators withdraw? Which methods (Wise, crypto, bank transfer)?
4. Alua revenue split — confirmed 80%? Any hidden fees?
5. Any known issues with Alua (bans, payout delays, content takedowns for AI accounts)?

**Decision pending:** Alua + Fanvue both Day 1 vs Fanvue only. Do NOT finalize until Grok clears this.
