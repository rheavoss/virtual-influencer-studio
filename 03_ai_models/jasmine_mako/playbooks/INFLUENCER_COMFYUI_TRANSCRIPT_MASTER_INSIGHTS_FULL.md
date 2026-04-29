{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 LucidaGrande;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # JASMINE_COMFYUI_TRANSCRIPT_MASTER_INSIGHTS_FULL.md\
\
**Date**: 22 April 2026  \
**Status**: Complete compilation of every useful point from all 3minut node transcripts  \
**Purpose**: Single authoritative offline reference for all ComfyUI techniques relevant to Jasmine Virtual AI Influencer Studio.\
\
## 1. Video Generation & Cinematic Techniques (SeaDance 2 / Higgsfield / LTX 2.3)\
\
- Bullet-time freeze + camera orbit + dramatic time release is the highest-viral pattern for CT-1 Reels.\
- Always start with a strong reference image as the first frame (defines character, lighting, location).\
- Use multi-shot JSON prompting for fast-paced, immersive storytelling (15 rapid shots, beat-synced).\
- Edit every prompt through Claude: \'93Rewrite while maintaining original structure and style exactly.\'94\
- First-frame reference rule is critical for consistency.\
- LTX 2.3 excels at music-driven content and lip-sync; plain speech is still evolving and requires careful prompting.\
- Resolution must be multiples of 32 (e.g. 1920\'d71088) for LTX 2.3.\
- OOM fixes for LTX 2.3: reserve_vram 4 in run.bat, Live Preview = None, FP8 Gemma text encoder.\
\
## 2. Multi-Angle Character Sheet Generation (QN ImageEdit 259)\
\
- Fastest method: Z-Image Turbo (base image) 
\f1 \uc0\u8594 
\f0  Qwen/Qwen-Image-Edit-2509 (multi-angle consistency).\
- Generates 8\'9632 perfectly consistent angles from one image in under 3 minutes.\
- Practical uses: 9-shot Character Reference Grid (P0-32), synthetic dataset expansion (P0-38).\
- GGUF quantization (Q4_K_S recommended) solves OOM on 8\'9612 GB GPUs.\
- Trade-off: Heavy GGUF reduces specialized multi-angle LoRA precision but still gives usable consistency.\
- Workflow: Run ComfyUI updater 
\f1 \uc0\u8594 
\f0  NVIDIA GPU disable API nodes.bat 
\f1 \uc0\u8594 
\f0  load QNage 259 workflow.\
\
## 3. ControlNet & Structural Techniques (Z-Image Turbo + Union Series)\
\
- Two-step KSampler is the pro solution for Z-Image Turbo:\
  - First 4 steps: ControlNet at full strength (locks pose/structure).\
  - Remaining steps: Disable ControlNet so Turbo distillation refines photorealism.\
- Union 2.0 is the most reliable balance of control and quality.\
- Union 2.1 is faster and more creative but can introduce artifacts or more stylized/revealing results.\
- Canny ControlNet + simple 3D blueprint (Blender/Figuro) is the fastest way to enforce exact architectural or pose structure.\
- Scribble ControlNet gives more artistic freedom for loose initial sketches.\
- Face Detail node (Impact Pack) is the best final cleanup step (denoising 0.2\'960.3).\
\
## 4. High-Resolution Fix Methods\
\
- Method A \'96 Latent Upscale: Faster (~24s) but more artifacts in hair/face.\
- Method B \'96 Decode + Img2Img + final low-denoising KSampler: Slightly slower (~25.7s) but significantly cleaner and more professional.\
- Verdict: Use Method B for Jasmine (quality > 1-second speed difference).\
- Two-KSampler Latent Upscale shortcut is the fastest clean high-res path.\
- For A1111 replication: Use BlenderNico/Inspire pack nodes + match noise mode exactly.\
\
## 5. Local LLM & Prompt Enhancement (Qwen 3.5)\
\
- Native Text Generate node in ComfyUI 0.19.1+ is extremely powerful and fully local.\
- Qwen 3.5 excels at:\
  - Detailed image description / tagging (ideal for dataset captioning)\
  - Prompt enhancement (simple idea 
\f1 \uc0\u8594 
\f0  cinematic master prompt)\
  - Art director / critique role\
  - LTX 2.3 video prompt polishing\
- Use markdown preview mode for clean output.\
- Increase max length to 2048 when output gets cut off.\
\
## 6. Automated Dataset Captioning\
\
- WD14 Tagger 
\f1 \uc0\u8594 
\f0  classic comma-separated tags (good for older models).\
- Florence 2 (more detailed caption task) 
\f1 \uc0\u8594 
\f0  modern natural-language captions (best for SD3-style or current models).\
- Workflow: Load Image Dataset From Folder 
\f1 \uc0\u8594 
\f0  run both taggers 
\f1 \uc0\u8594 
\f0  Save Image and Text Dataset To Folder.\
- Creates two ready folders (WD14 + Florence) for immediate LoRA training use.\
\
## 7. IP Adapter Face ID Best Practices\
\
- Use 4 consistent images from the same checkpoint merged into one batch for strongest signal.\
- Best checkpoints: Juggernaut and Absolute Reality (minimal interference with Face ID).\
- Two-pass pipeline: Face ID extraction 
\f1 \uc0\u8594 
\f0  standard text-to-image with Face ID conditioning.\
\
## 8. ComfyUI Setup, Organization & Minimalism\
\
- RG3 Comfy node: Auto-nested folders, fast group toggles, image comparer.\
- Recommended 3-install strategy:\
  - Lab (Python 3.13) \'96 experimental/testing\
  - Production Engine (Python 3.12) \'96 high-volume stable rendering\
  - Forge \'96 LoRA training\
- Prefer native nodes (Primitive, Multiline String, etc.) over unnecessary custom nodes.\
- Always verify downloaded JSONs: scan + search for eval/exec/os.system/subprocess.\
\
## 9. Security & Workflow Sharing\
\
- JSON files are just text blueprints \'97 they cannot execute code by themselves.\
- Malwarebytes/SentinelOne warnings on Discord downloads are almost always false positives.\
- Verification steps: enterprise scanner + multi-engine cloud scanner + manual code inspection.\
\
## 10. General Pro Tips & Observations\
\
- Z-Image Turbo optimal settings: 8 steps + CFG 1.0.\
- High-fidelity checkpoints (Juggernaut, Absolute Reality) give best results with IP Adapter and Face Detail.\
- For ControlNet: Higher strength requires more inference steps.\
- Always test with same seed when comparing workflows/models.\
\
---\
\
**End of Master Insights File**\
\
This is now the **complete, exhaustive collection** of every actionable point from all transcripts you sent.  \
It is longer, more detailed, and structured for easy reference.\
\
Save it on your desktop.\
\
We now have everything useful captured in one place.\
\
Would you like me to **start P0-046 Full Caption + Hook Library for all 11 CTs** next?\
\
Just reply **\'93Yes, start P0-046\'94** and I\'92ll deliver the full document immediately.  \
\
Ready when you are.}