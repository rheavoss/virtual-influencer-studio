# TASK-P0-07 Training Receipt

## LoRA File
- **Filename:** jasmine_v1.safetensors
- **Size:** 164MB
- **Location:** `03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v1.safetensors`
- **SHA256:** `f0d491cf6cf4e855935d06fbb74045c64f110e77e22eae1dd6add3b77ee4badd`
- **Downloaded:** 2026-04-19 06:56 IST

## Training Run
- **Instance:** 35219546 (RTX 4090, 9012 Mbps, cuda 12.8)
- **Started:** 2026-04-18 23:53 UTC
- **Completed:** 2026-04-19 ~01:17 UTC
- **Steps:** 2000/2000
- **Final loss:** ~0.21–0.49 (oscillating, trending down from 0.49)
- **Checkpoints saved:** step 500, 1000, 1500, 2000
- **Sample images:** `/workspace/output/jasmine_v1/samples/` (2 baseline + 8 sample images)

## Instance Destroyed
- Destroyed: 2026-04-19 06:56 IST ✅
- Confirmed empty: `vastai show instances` returned no rows

## Cost
- **This run:** ~$0.35–0.45 (RTX 4090 ~77 min @ ~$0.29/hr)
- **Failed attempts (prior):** $2.40
- **Total P0-07 spend:** ~$2.75–2.85 / ₹256–265

## Prior Incident
See: `/Users/user/Desktop/INCIDENT_REPORT_VAST_AI_2026-04-19.md`
