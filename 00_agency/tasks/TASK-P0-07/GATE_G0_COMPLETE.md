# G0 COMPLETE — Grok Research Gate
**Task:** TASK-P0-07 (Train Jasmine FLUX.1-dev LoRA)
**Completed:** 2026-04-19
**By:** Grok

## Best-Path Summary
- FLUX.1-dev LoRA via ostris/ai-toolkit on Vast.ai RTX 4090
- Critical finding: `inet_down>=800` filter mandatory — FLUX is 24GB, slow network = training never starts
- Correct docker: `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
- torch 2.6.0+cu124 must be installed BEFORE requirements.txt
- 2000 steps, rank 16, lr 1e-4, trigger word `jasmakogirl`
- Realistic cost: ~$0.35–0.45 total on correct instance

## Sources
- ostris/ai-toolkit GitHub (verified 2026-04-19)
- Vast.ai CLI search API docs
- Incident report: INCIDENT_REPORT_VAST_AI_2026-04-19.md (prior failures)
- Grok live web research (Reddit, HuggingFace forums)
