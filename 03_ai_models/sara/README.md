# Sara — AI Model Directory
**Created:** 2026-04-27
**Character:** Sara (trigger: `saragirl`)
**Pipeline:** ComfyUI + PuLID Flux (RunPod RTX 4090) → LoRA training (Vast.ai)
**Status:** Phase 2 PARTIAL — face/photorealism approved, body fix pending Grok

## Directory Structure
- `playbooks/` — **ALL SOPs, plans, and runbooks (start here)**
- `training_data/dataset_raw/` — 25 dataset images + captions
- `training_configs/` — LoRA training YAML configs
- `lora_checkpoints/` — trained .safetensors files
- `test_outputs/` — inference test images
- `scripts/` — generation scripts
- `generation_logs/` — training logs

## Playbooks (for Grok)
| File | Purpose |
|---|---|
| `playbooks/sara_dataset_and_training_playbook.md` | **MASTER** — full 5-phase pipeline SOP |
| `playbooks/sara_pulid_flux_plan_grok_approved.md` | Grok-approved PuLID+Flux dataset plan |
| `playbooks/sara_carousel_prompts_final.md` | 25 pose prompts for dataset generation |
| `playbooks/sara_free_multiangle_checklist.md` | Option A checklist (fallback) |
| `00_agency/session_logs/2026-04-29_sara_pulid_session_log.md` | Session log + errors + Grok questions |

## Current Blockers (Grok approval needed)
1. **Body too slim** — PuLID locks face only, body = 100% from prompt
   - Approve approach: img2img at denoise=0.65 OR stronger txt2img descriptors?
   - Confirm exact body prompt string
2. **Hair updo** — add `long straight dark hair worn down loose, no bun, no updo` to every prompt

## Face + Body References
In `01_characters/sara/face_reference/`
- `sara_face_ref.jpg` — face reference
- `sara_composite_v1.png` — face-swapped composite (body donor + Sara face)
- `sara_face_crop.jpg` — face crop used as PuLID input
