# SONIA_POST_LORA_ACTIVATION_CHECKLIST.md

**Date**: 22 April 2026  
**Task**: Immediate action plan the moment LoRA training finishes

**When the LoRA finishes training, do these steps in exact order:**

1. Locate the `.safetensors` file in Flex Gym output folder.
2. Copy it to Forge → models/Lora folder (rename to `soniagfe.safetensors` if needed).
3. Open Forge and load Flux.1 Dev + your new LoRA at weight 0.85.
4. Test with the official base prompt from `SONIA_TRIGGER_AND_ADVANCED_PROMPT_STRATEGY.md`.
5. Run 5–10 test generations with different seeds.
6. If face/skin is good → proceed to Soul ID in Higgsfield.
7. Generate 9-shot Character Reference Grid (P0-32).
8. Load LoRA into ControlNet workflows (P0-39).
9. Apply two-step upscale (P0-40) for final 4K images.
10. Generate 1 sample each of CT-1 to CT-11 (P0-45).

**Success Criteria:**

- Face lock must be near-perfect
- Skin must be flawless
- Breasts must have realistic gravity

If any test fails → immediately log in `claude_failure_log.md` and go back to dataset QC.
