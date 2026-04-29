# Failure Analysis: Qwen-Image-Edit-2511 ComfyUI Pipeline
**Date:** April 29, 2026
**Subject:** Sara Influencer Dataset Generation (Option C)
**Status:** ABORTED / ALL PAID SERVICES TERMINATED

## 1. Objective
The goal was to execute a batch generation of 25-30 images of the AI Influencer "Sara" using the `Qwen-Image-Edit-2511` model via a custom `submit_generation.py` ComfyUI script running on a RunPod RTX 4090 instance. The objective was to physically alter a composite seed image to reflect specific voluptuous body measurements while retaining facial consistency.

## 2. Chronology of Failures

### Issue A: The `mat1 and mat2 shapes cannot be multiplied` Error
- **Symptom:** The generation pipeline immediately crashed with a tensor shape mismatch (`5412x1280` and `3840x1280`) inside the `TextEncodeQwenImageEdit` node.
- **Root Cause:** The ComfyUI-GGUF loader failed to correctly map the multi-modal projector weights because the corresponding `mmproj-F16.gguf` file was either missing or improperly named. 
- **Resolution:** Downloaded the exact matching `mmproj` file and renamed it strictly to `Qwen2.5-VL-7B-Instruct-mmproj-F16.gguf`. This successfully allowed the model to begin generating frames.

### Issue B: Blurry Output + Severe Grid Artifacts
- **Symptom:** Once the tensor issue was bypassed, the model successfully outputted images, but they were visually unacceptable. The output was a severely blurred, 1:1 structural copy of the original seed image covered in a permanent "screen-door" grid. 
- **Root Cause 1 (The Grid):** Qwen-Image-Edit is a "Flow Matching" architecture. It strictly requires a dedicated math node (`ModelSamplingDiscrete` set to `img_to_img_flow`) to properly resolve diffusion noise into pixels. The original script lacked this node, causing the math to fail and leaving raw latent noise baked into the image.
- **Root Cause 2 (The Blur):** The script fed a completely blank canvas (`EmptyQwenImageLayeredLatentImage`) into the KSampler, but attempted to use partial denoising (`denoise: 0.85`). Applying partial denoising to a 100% empty canvas caused the model to skip the foundational sketching layer. Panicking, the model simply smeared the reference image instructions onto the blank canvas without fully rendering it.

### Issue C: Lightning LoRA Poisoning
- **Symptom:** Even after injecting the correct math node and adjusting parameters, the pipeline continued to struggle with mathematical resolution and over-baked rendering.
- **Root Cause:** The `lightning_4steps.safetensors` LoRA was active. Lightning LoRAs are highly brittle and mathematically hardcoded to expect exactly 4 to 6 steps using specific schedulers (like `sgm_uniform`). Attempting to force the model to 8 steps or 20 steps with conflicting `euler` / `img_to_img_flow` logic caused the LoRA to actively fight the base model's rendering engine.

## 3. Financial Mitigation
At 00:27 AM IST (April 29, 2026), the user ordered an immediate halt to all operations.
- The active RunPod instance (`17hyzsxsa4znlm`) was **permanently terminated** via the RunPod API. 
- Independent verification via the RunPod SDK confirmed: `All pods are completely terminated. Zero active machines.`
- Independent verification via the Vast.ai CLI confirmed zero active machines. 
- **Current Financial Bleeding:** $0.00 / hour.

## 4. Conclusion & Next Steps
The GGUF-quantized Qwen-Image-Edit pipeline inside ComfyUI is too unstable, brittle, and mathematically conflicting when combined with Empty Latents and Lightning accelerators. The Option C approach has been officially aborted to prevent further financial waste.

When the project resumes, the pipeline must be fundamentally restructured—either by abandoning GGUF in favor of full-precision non-quantized models (if VRAM permits), or by reverting to a highly stable, traditional SDXL / FLUX.1 Image-to-Image pipeline with ControlNet.
