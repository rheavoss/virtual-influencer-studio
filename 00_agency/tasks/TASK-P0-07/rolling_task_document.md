# TASK-P0-07 Rolling Document (Eternal Reference)

**Task ID:** P0-07
**Task Name:** Train Jasmine FLUX.1-dev LoRA on Vast.ai
**Date Opened:** 2026-04-18
**Owner:** CEO (execution) + Claude (configs/code) + Grok (research gate)
**Status:** ✅ COMPLETE — v4 LoRA downloaded, instance destroyed 2026-04-26

---

## G0: Grok Research Gate

**Best-Path Summary:**
- FLUX.1-dev LoRA training via ostris/ai-toolkit on Vast.ai RTX 4090
- Trigger word: `jasmakogirl`
- 38-image dataset, 2000 steps, rank 16, lr 1e-4, bf16, quantize: true
- Critical filter: `inet_down>=800` — FLUX model is 24GB, slow network = death
- Correct docker: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- Install torch 2.6.0+cu124 FIRST, then requirements.txt (prevents version conflict)

**Sources:**
- ostris/ai-toolkit GitHub (verified 2026-04-18)
- Vast.ai CLI docs
- Jasmine Incident Report 2026-04-19 (₹223 / $2.40 lost in failed attempts)

---

## G1: Rolling Task Document

This document. Created 2026-04-19.

---

## G2: Claude Feasibility & Counter-Questions

**Feasibility:** CONFIRMED. All prerequisites met:
- 38 images in `03_ai_models/jasmine_mako/training_data/jasmine_dataset/` ✅
- HuggingFace token with FLUX.1-dev access granted ✅
- Vast.ai credit $2.16 remaining ✅
- ai-toolkit config `jasmine.yaml` created ✅

**Counter-Questions addressed:**
1. Network speed filter — added `inet_down>=800` after incident
2. Docker image — upgraded to pytorch 2.5.1 to match ai-toolkit torch 2.5+ requirement
3. FLUX pre-download — confirmed >23GB before training start
4. Dataset path — fixed double-nesting issue (`mv` corrected)
5. Caption count — verified 38 captions matching 38 images

---

## G3: Approved Plan

**CEO Approval:** Granted 2026-04-18 after Grok van-gate verification
**Approved instance:** 35219546 (RTX 4090, 9012 Mbps inet_down, cuda 12.8)
**Approved search command:**
```
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' -t on-demand -o dph_total
```

---

## Execution Log

| Timestamp (UTC) | Step | Actor | Result |
|---|---|---|---|
| 2026-04-18 ~21:30 | Instance 1 rented (35193864) | Claude | FAILED — no inet filter, torch mismatch |
| 2026-04-18 ~23:00 | Instance 2 rented (35199297) | Claude | FAILED — no inet filter, download stalled |
| 2026-04-19 ~03:00 | Both instances destroyed | CEO | $2.40 wasted |
| 2026-04-19 | Incident report created | Claude | `/Users/user/Desktop/INCIDENT_REPORT_VAST_AI_2026-04-19.md` |
| 2026-04-19 | Correct instance search run | CEO + Claude | Instance 35219546 selected |
| 2026-04-19 23:53 | Training started | Claude | `nohup python3 run.py config/jasmine.yaml` |
| 2026-04-19 00:00 | Baseline samples generated | ai-toolkit | 2 samples in `/workspace/output/jasmine_v1/samples/` |
| 2026-04-19 00:03 | Step 72/2000 confirmed | Claude | Loss ~0.24–0.43, healthy |
| 2026-04-19 00:20 | Step 437/2000 confirmed | Claude | ETA ~50 min |
| 2026-04-19 00:30 | Step 991/2000 — 50% done | Claude | Elapsed 39:49, ETA ~40 min, loss 0.21–0.35 trending down, step-500 checkpoint saved |
| 2026-04-19 01:17 | Step 2000/2000 — COMPLETE | ai-toolkit | jasmine_v1.safetensors saved to /workspace/output/jasmine_v1/ |
| 2026-04-19 06:56 | LoRA downloaded | Claude | 164MB → 03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v1.safetensors |
| 2026-04-19 06:56 | Instance 35219546 DESTROYED | Claude | vastai show instances returns empty ✅ |

---

## Training Config

```yaml
# /workspace/ai-toolkit/config/jasmine.yaml (on instance)
trigger_word: jasmakogirl
steps: 2000
lora_rank: 16
lr: 1e-4
base_model: black-forest-labs/FLUX.1-dev
dtype: bf16
optimizer: adamw8bit
quantize: true
sample_every: 500
save_every: 500
```

---

## Testing Results

- [x] Step 500 checkpoint saved
- [x] Step 1000 checkpoint
- [x] Step 1500 checkpoint
- [x] Step 2000 — jasmine_v1.safetensors (164MB) downloaded to `03_ai_models/jasmine_mako/lora_checkpoints/`
- [x] Instance 35219546 DESTROYED ✅

---

## Forensic Evidence

- **Incident report:** `/Users/user/Desktop/INCIDENT_REPORT_VAST_AI_2026-04-19.md`
- **Instance ID:** 35219546
- **SSH:** `ssh -p 19546 root@ssh8.vast.ai`
- **Training log:** `/workspace/training.log` (on instance)
- **Output:** `/workspace/output/jasmine_v1/`
- **Costs (failed attempts):** ~$2.40 / ₹223
- **Costs (this run):** ~$0.35–0.45 / ₹33–42 (estimate)

---

## Closure & Lessons for Future Teams

**Status:** ✅ SUCCESS

**Root cause of prior failures:**
1. No `inet_down` filter — FLUX 24GB download stalled on slow network
2. Wrong docker image — torch version mismatch with ai-toolkit
3. No active download monitoring — stall silent for 3 hours

**Non-negotiable rules locked into memory and GROK_BRAIN_SUMMARY.md:**
- Always filter `inet_down>=800`
- Always use `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- Install torch FIRST, then requirements.txt
- Pre-download FLUX model, confirm >23GB before training
