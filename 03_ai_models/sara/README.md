# Sara — AI Model Directory
**Created:** 2026-04-27
**Character:** Sara (trigger: `saragirl`)
**Base model:** Qwen/Qwen-Image-Edit-2511
**Status:** PENDING — awaiting engineered dataset

## Directory Structure
- `training_data/dataset_raw/` — engineered dataset (face-swap + Carousel Engine outputs)
- `training_configs/` — Qwen-Image ai-toolkit YAML configs
- `lora_checkpoints/` — trained .safetensors files
- `test_outputs/` — inference test images
- `scripts/` — pre-training gate, generation scripts
- `generation_logs/` — training logs

## Pipeline
1. Face-swap sara_face_ref.jpg onto body_donor.jpg
2. Carousel Engine → 25 synthetic poses via Qwen-Image-Edit
3. Caption all 25 images (trigger: `saragirl`)
4. Train: Rank 16, LR 0.0001, 3000 steps, AdamW8Bit
5. ComfyUI inference: ControlNet Union + style LoRAs + face detailer

## Face + Body References
Both in `01_characters/sara/face_reference/`
- `sara_face_ref.jpg` — Grok-generated synthetic face (CEO approved 2026-04-27)
- `body_donor.jpg` — CEO-approved body reference (CEO approved 2026-04-27)
