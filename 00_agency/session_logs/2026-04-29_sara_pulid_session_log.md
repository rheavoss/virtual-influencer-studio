# Sara PuLID Flux — Session Log & Grok Handoff
**Date:** 2026-04-29
**Status:** PARTIAL SUCCESS — pipeline working, body spec needs fix
**Pod terminated:** glocmuk6g69guo (billing stopped)
**4 test images:** ~/Desktop/sara_v2_400{1-4}_*.png

---

## WHAT WORKS ✅

### Pipeline (fully operational)
- **Node:** `balazik/ComfyUI-PuLID-Flux` (NOT cubiq — cubiq is SDXL only, Flux = 404)
- **Model:** `pulid_flux_v0.9.1.safetensors` from `guozinan/PuLID` ✅
- **Base:** `flux1-dev-fp8.safetensors` from Comfy-Org (public, no token) ✅
- **CLIP:** `clip_l.safetensors` + `t5xxl_fp8_e4m3fn.safetensors` from comfyanonymous ✅
- **VAE:** `ae.safetensors` from black-forest-labs (needs HF token) ✅
- **InsightFace:** antelopev2 zip from MonsterMMORPG ✅
- **EVA-CLIP:** `EVA02_CLIP_L_336_psz14_s6B.pt` from QuanSun ✅
- **Face lock:** CONFIRMED — same face across all 4 generated images ✅
- **Photorealism:** CONFIRMED — real photograph quality, no cartoon ✅

### Critical fix applied to node
ComfyUI 0.20.1 broke balazik node. Fix: add `**kwargs` to `forward_orig` signature in `pulidflux.py`:
```python
def forward_orig(
    self,
    img: Tensor,
    img_ids: Tensor,
    txt: Tensor,
    txt_ids: Tensor,
    timesteps: Tensor,
    y: Tensor,
    guidance: Tensor = None,
    control=None,
    **kwargs,   # <-- ADD THIS
) -> Tensor:
```

### Correct KSampler settings for Flux
```
FluxGuidance node: guidance = 3.5   ← MANDATORY, separate node
KSampler: cfg = 1.0                  ← NOT 3.5 (Flux ignores KSampler CFG)
Steps: 28
Sampler: euler
Scheduler: beta
Denoise: 1.0
```
**Without FluxGuidance node → cartoon/stylized output (confirmed failure)**

---

## WHAT FAILED ❌

### Body type too slim — root cause
PuLID locks FACE ONLY. Body shape = 100% from prompt text.
Generated images had slim body + small breasts. Reference has extreme hourglass + very large natural breasts.

**Weak descriptors used (wrong):**
`voluptuous hourglass figure, large natural breasts, narrow waist, wide hips, thick thighs`

**Grok's exact spec needed (from sara_pulid_flux_plan_grok_approved.md):**
`very large heavy natural breasts with realistic gravity and soft tissue drape, deep cleavage, slim waist, wide hips, thick thighs, natural physics, soft realistic skin, natural skin texture`

### Hair defaults to updo
2/4 images generated hair in updo/bun despite prompt. Fix: add `long straight dark hair worn down loose, hair not tied, hair not in bun` explicitly.

---

## ERRORS ENCOUNTERED & FIXES

| Error | Root Cause | Fix |
|---|---|---|
| 401 on RunPod API | OCR misread key from screenshot | CEO pasted fresh key as text |
| `ComfyUI_PuLID_Flux` 404 | Grok plan had wrong repo name | Correct: `PuLID_ComfyUI` (SDXL) or `ComfyUI-PuLID-Flux` (Flux, balazik) |
| Architecture mismatch | `guozinan/PuLID` model ≠ cubiq node | cubiq node = SDXL only. balazik = Flux ✅ |
| `torch.library.custom_op` error | PyTorch 2.1.0 too old | Upgraded to torch 2.4.1+cu118 |
| `forward_orig() unexpected kwarg 'timestep_zero_index'` | ComfyUI 0.20.1 changed Flux signature | Added `**kwargs` to forward_orig |
| Cartoon/stylized output | CFG=3.5 in KSampler without FluxGuidance | FluxGuidance node + CFG=1.0 in KSampler |
| `prompt_outputs_failed_validation` | Missing `method` field | Wrong node — switched to balazik |
| Body too slim | Prompt descriptors too weak | Need Grok's exact body spec (see above) |

---

## NEXT SESSION ACTIONS (for Grok to approve)

### Fix 1 — Body prompt (MANDATORY before dataset)
Use Grok's exact descriptors from approved plan:
```
sara, very large heavy natural breasts with realistic gravity and soft tissue drape, 
deep cleavage, slim waist, wide hips, thick thighs, natural physics, soft realistic skin, 
natural skin texture, long straight dark hair worn down loose
```

### Fix 2 — Consider higher PuLID weight for body influence
Current: `weight=0.9`. Test `weight=1.0` to see if body reference transfers more.

### Fix 3 — Prompt: force hair down
Add to every prompt: `long straight dark hair worn down loose, hair not tied up, no bun, no updo`

### Fix 4 — Consider img2img instead of txt2img
Use sara_composite_v1.png as img2img at denoise=0.60-0.75 → forces body shape from reference image. PuLID handles face. This combo may solve both issues.

---

## RUNPOD SETUP (recreate from scratch — all steps)

```bash
# Pod: RTX 4090, 50GB disk+volume, runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04
# SSH: root@<ip> -p <port>

# 1. Install ComfyUI
cd /workspace && git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI && pip install -q -r requirements.txt

# 2. Upgrade torch (2.1.0 too old for ComfyUI 0.20.1)
pip install torch==2.4.1 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install "numpy<2"

# 3. Install balazik PuLID Flux node
cd /workspace/ComfyUI/custom_nodes
wget -q "https://github.com/balazik/ComfyUI-PuLID-Flux/archive/refs/heads/master.zip" -O /tmp/pulid.zip
python3 -c "import zipfile; zipfile.ZipFile('/tmp/pulid.zip').extractall('.')"
mv ComfyUI-PuLID-Flux-master ComfyUI-PuLID-Flux
cd ComfyUI-PuLID-Flux && pip install -q -r requirements.txt

# 4. Patch forward_orig for ComfyUI 0.20.1 compatibility
python3 << 'EOF'
with open('pulidflux.py', 'r') as f: c = f.read()
c = c.replace(
    "    control=None,\n) -> Tensor:",
    "    control=None,\n    **kwargs,\n) -> Tensor:"
)
with open('pulidflux.py', 'w') as f: f.write(c)
print("Patched")
EOF

# 5. Download models (parallel)
mkdir -p /workspace/ComfyUI/models/{unet,clip,vae,pulid,clip_vision,insightface/models}
HF_TOKEN="<see 00_agency/credentials.md>"

wget -q "https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/flux1-dev-fp8.safetensors" \
  -O /workspace/ComfyUI/models/unet/flux1-dev-fp8.safetensors &
wget -q "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors" \
  -O /workspace/ComfyUI/models/clip/clip_l.safetensors &
wget -q "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp8_e4m3fn.safetensors" \
  -O /workspace/ComfyUI/models/clip/t5xxl_fp8_e4m3fn.safetensors &
wget -q --header="Authorization: Bearer $HF_TOKEN" \
  "https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/ae.safetensors" \
  -O /workspace/ComfyUI/models/vae/ae.safetensors &
wget -q "https://huggingface.co/guozinan/PuLID/resolve/main/pulid_flux_v0.9.1.safetensors" \
  -O /workspace/ComfyUI/models/pulid/pulid_flux_v0.9.1.safetensors &
wget -q "https://huggingface.co/QuanSun/EVA-CLIP/resolve/main/EVA02_CLIP_L_336_psz14_s6B.pt" \
  -O /workspace/ComfyUI/models/clip/EVA02_CLIP_L_336_psz14_s6B.pt &
wget -q "https://huggingface.co/MonsterMMORPG/tools/resolve/main/antelopev2.zip" \
  -O /tmp/antelopev2.zip &
wait
python3 -c "import zipfile; zipfile.ZipFile('/tmp/antelopev2.zip').extractall('/workspace/ComfyUI/models/insightface/models/')"

# 6. Install insightface
pip install insightface onnxruntime-gpu

# 7. Upload reference image
# scp -P <port> sara_composite_v1.png root@<ip>:/workspace/ComfyUI/input/

# 8. Start ComfyUI
cd /workspace/ComfyUI
nohup python main.py --listen 0.0.0.0 --port 8188 > /tmp/comfyui.log 2>&1 &
```

---

## WORKFLOW (correct — copy-paste ready)

```python
# Node class names (balazik):
# PulidFluxModelLoader, PulidFluxInsightFaceLoader, PulidFluxEvaClipLoader, ApplyPulidFlux

workflow = {
    "1":  {"inputs": {"unet_name": "flux1-dev-fp8.safetensors", "weight_dtype": "fp8_e4m3fn"}, "class_type": "UNETLoader"},
    "2":  {"inputs": {"clip_name1": "clip_l.safetensors", "clip_name2": "t5xxl_fp8_e4m3fn.safetensors", "type": "flux", "device": "default"}, "class_type": "DualCLIPLoader"},
    "3":  {"inputs": {"vae_name": "ae.safetensors"}, "class_type": "VAELoader"},
    "4":  {"inputs": {"image": "sara_composite_v1.png"}, "class_type": "LoadImage"},
    "5":  {"inputs": {"pulid_file": "pulid_flux_v0.9.1.safetensors"}, "class_type": "PulidFluxModelLoader"},
    "6":  {"inputs": {"provider": "CUDA"}, "class_type": "PulidFluxInsightFaceLoader"},
    "7":  {"inputs": {}, "class_type": "PulidFluxEvaClipLoader"},
    "8":  {"inputs": {"model": ["1",0], "pulid_flux": ["5",0], "eva_clip": ["7",0], "face_analysis": ["6",0], "image": ["4",0], "weight": 0.9, "start_at": 0.0, "end_at": 1.0}, "class_type": "ApplyPulidFlux"},
    "9":  {"inputs": {"text": "POSITIVE PROMPT HERE", "clip": ["2",0]}, "class_type": "CLIPTextEncode"},
    "10": {"inputs": {"text": "NEGATIVE PROMPT HERE", "clip": ["2",0]}, "class_type": "CLIPTextEncode"},
    "15": {"inputs": {"guidance": 3.5, "conditioning": ["9",0]}, "class_type": "FluxGuidance"},
    "11": {"inputs": {"width": 1024, "height": 1536, "batch_size": 1}, "class_type": "EmptyLatentImage"},
    "12": {"inputs": {"seed": SEED, "steps": 28, "cfg": 1.0, "sampler_name": "euler", "scheduler": "beta", "denoise": 1.0, "model": ["8",0], "positive": ["15",0], "negative": ["10",0], "latent_image": ["11",0]}, "class_type": "KSampler"},
    "13": {"inputs": {"samples": ["12",0], "vae": ["3",0]}, "class_type": "VAEDecode"},
    "14": {"inputs": {"filename_prefix": "sara_pulid_SEED", "images": ["13",0]}, "class_type": "SaveImage"},
}
```

---

## GROK QUESTIONS (CEO to relay)

1. **Body fix:** Approve img2img approach (denoise 0.65) to force body shape from reference, or stick with txt2img + stronger prompt?
2. **Body prompt:** Confirm exact body descriptor string to use
3. **Dataset size:** 25–30 images confirmed? Or more?
4. **Captions:** Auto-caption with JoyCaption after generation, or manual?

---

## COST THIS SESSION
- Pod `glocmuk6g69guo`: RTX 4090, $0.34/hr
- Runtime: ~1.5 hrs
- Total: ~$0.51 (₹47)
- Downloads (models): ~$1.20 one-time
- **Total session: ~$1.71 (₹159)**

**Approved results:** 4 images on Desktop (`sara_v2_400{1-4}_*.png`)
**Face:** ✅ CEO approved
**Photorealism:** ✅ CEO approved
**Body:** ❌ Too slim — fix before full dataset run
