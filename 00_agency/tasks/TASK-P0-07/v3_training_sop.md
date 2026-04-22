# JASMINE v3 LoRA — Training SOP & Handoff
**Created:** 2026-04-22 (Session 19)
**Purpose:** Complete handoff so next Claude session resumes without CEO ramp-up
**Status:** READY TO EXECUTE — pending watermark confirmation

---

## CONFIRMED STATE (as of 2026-04-22)

| Item | Status | Notes |
|---|---|---|
| Training dataset | ✅ INTACT | 40 PNGs, full legs visible, no visible watermarks in tested images |
| Dataset local path | ✅ | `/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset/` |
| Dataset Drive backup | ✅ | `virtual-influencer-drive:VirtualInfluencerStudio/03_ai_models/jasmine_mako/training_data/jasmine_dataset/` |
| v2 LoRA | ❌ UNUSABLE | Kling watermarks baked into weights during v2 training + weak inference prompts |
| v3 training | ⏳ PENDING | Blocked on watermark confirmation |
| Vast.ai CLI | ✅ | `/tmp/vastai_env/bin/vastai` — re-authenticate each session (see credentials) |
| Credentials | ✅ | `/Users/user/Desktop/Instagram/00_agency/credentials.md` |

---

## DECISION GATE — WATERMARK CHECK (CEO ACTION REQUIRED FIRST)

CEO manually verified training images via Google Drive:
- Drive link: https://drive.google.com/open?id=1D75rKRFh0eoRFjjZYICs_QMmti1Al8u8
- Check `jasmine_dataset/` subfolder → open 5 random images → inspect bottom-left and bottom-right corners

**If CEO confirms NO watermarks → skip to STEP 2 (training)**
**If CEO confirms watermarks present → execute STEP 1 (watermark removal) first**

---

## STEP 1 — WATERMARK REMOVAL (only if watermarks confirmed)

Install lama-cleaner and run inpainting on all 40 images. Do NOT crop — inpaint only.

```bash
pip install lama-cleaner

# For each image with watermark, run:
lama-cleaner --model=lama --device=cpu \
  --image /path/to/image.png \
  --mask /path/to/mask.png \
  --output /path/to/cleaned/image.png
```

**Mask creation:** Use Python + PIL to create a black image with white rectangle at watermark location:
```python
from PIL import Image, ImageDraw
img = Image.open("jasmine_xxx.png")
w, h = img.size
mask = Image.new("RGB", (w, h), "black")
draw = ImageDraw.Draw(mask)
# Kling watermark: bottom-right corner, approx last 8% height, last 20% width
draw.rectangle([(int(w*0.8), int(h*0.92)), (w, h)], fill="white")
mask.save("mask.png")
```

After cleaning, verify all 40 images have no watermark before proceeding.

---

## STEP 2 — WRITE v3 TRAINING CONFIG

Create `/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_configs/jasmine_v3.yaml`

Key changes from v2:
- Use CORRECT sample prompts (from master generation prompt v2.1 — see below)
- Same hyperparams: 2000 steps, rank 16, lr 1e-4, bf16, quantize true
- Trigger word: `jasmakogirl`

**CORRECT sample prompts to use in config (from `01_characters/jasmine/jasmine_generation_prompt.md`):**
```
jasmakogirl, photorealistic portrait photograph, 24-year-old East Asian woman, broad oval face wide prominent cheekbones, East Asian almond eyes slightly hooded relaxed, dark brown warm hazel irises, medium straight-bridged nose soft natural tip, medium fullness natural bare-pink lips, fair even-toned skin warm neutral-peachy undertone no flush no redness, visible natural pores, matte natural skin finish zero skin smoothing, very long dark black-brown poker straight silky hair, shot on iPhone 14, soft overcast natural daylight, slight film grain
```

```
jasmakogirl, photorealistic full body photograph, 24-year-old East Asian woman, 163cm slim petite frame, DDD cup heavy natural bust with natural drop and weight deep cleavage, flat firm toned midsection dramatically slim defined waist, full feminine hips, wearing black bikini, standing, fair even-toned skin warm neutral-peachy undertone no flush no redness, matte natural skin finish zero skin smoothing, very long dark black-brown straight hair, shot on iPhone 14, soft overcast natural daylight, slight film grain
```

---

## STEP 3 — RENT VAST.AI INSTANCE

Read credentials first: `/Users/user/Desktop/Instagram/00_agency/credentials.md`

```bash
# Authenticate Vast.ai CLI
/tmp/vastai_env/bin/vastai set api-key <KEY_FROM_CREDENTIALS>

# Verify account — must show username kriger5490 and balance > $0
/tmp/vastai_env/bin/vastai show user --raw

# Search for instance
/tmp/vastai_env/bin/vastai search offers \
  'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 inet_down>=800' \
  -t on-demand -o dph_total

# Pick cheapest with verified inet_down>=800
# Rent it:
/tmp/vastai_env/bin/vastai create instance <INSTANCE_ID> \
  --image pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime \
  --disk 80 \
  --raw
```

**MANDATORY pre-flight before training starts:**
```bash
SSH="ssh -o StrictHostKeyChecking=no -p PORT root@HOST"
$SSH "python3 -c 'import torch; import cv2; import diffusers; print(torch.cuda.is_available())'"
# Must print: True
# If cv2 or diffusers fails: apt-get install libgl1-mesa-glx gcc -y, then pip install again
```

---

## STEP 4 — UPLOAD DATASET + CONFIG + RUN TRAINING

```bash
# Upload 40 training images
scp -o StrictHostKeyChecking=no -P PORT \
  /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset/*.png \
  root@HOST:/workspace/dataset/

# Upload .txt caption files (same folder as images)
# Caption files must exist: one .txt per .png, same filename
# If missing, generate from filenames:
python3 -c "
import os
folder = '/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset/'
for f in os.listdir(folder):
    if f.endswith('.png'):
        txt = f.replace('.png', '.txt')
        txt_path = os.path.join(folder, txt)
        if not os.path.exists(txt_path):
            caption = 'jasmakogirl, ' + f.replace('.png','').replace('_',' ')
            open(txt_path, 'w').write(caption)
            print(f'Created: {txt}')
"

# Upload config
scp -o StrictHostKeyChecking=no -P PORT \
  /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_configs/jasmine_v3.yaml \
  root@HOST:/workspace/jasmine_v3.yaml

# On instance: install ai-toolkit
$SSH "cd /workspace && git clone https://github.com/ostris/ai-toolkit && cd ai-toolkit && pip install -r requirements.txt"

# Start training (background, log to file)
$SSH "cd /workspace/ai-toolkit && nohup python3 run.py /workspace/jasmine_v3.yaml > /workspace/train_v3.log 2>&1 &"

# Monitor (check every 5-10 min)
$SSH "tail -50 /workspace/train_v3.log"
# Expected: loss values 0.1–0.4, step count incrementing
# Full run ~90 min on RTX 4090
```

---

## STEP 5 — DOWNLOAD + DESTROY

```bash
# After step 2000 confirmed in log:
scp -o StrictHostKeyChecking=no -P PORT \
  root@HOST:/workspace/output/jasmine_v3/jasmine_v3.safetensors \
  /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v3.safetensors

# Verify file size (~150-180MB)
ls -lh /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v3.safetensors

# Destroy instance IMMEDIATELY
echo y | /tmp/vastai_env/bin/vastai destroy instance <INSTANCE_ID>
```

---

## STEP 6 — TEST INFERENCE

Test script already written: `/tmp/test_v2_vastai.py`
**Rename/copy as `test_v3_vastai.py` and update `LORA_LOCAL` path to `jasmine_v3.safetensors`**

The script generates 10 images covering portraits + body shots + outfits.
All prompts already use correct descriptors from master generation prompt v2.1.

Success criteria for each output:
- [ ] Skin: fair/porcelain, zero flush, zero redness, matte finish
- [ ] Body: DDD bust with natural drop, slim waist, no BBW drift
- [ ] Hair: long straight black-brown
- [ ] No watermark in output
- [ ] Face consistent across images (trigger word working)

---

## FAILURE LOG STATUS

Current failures relevant to this task:
- **#10** — Watermarks baked into v2 (dataset had Kling watermarks at training time)
- **#11** — Weak v2 inference prompts (fixed in test scripts above)
- **#12** — Declared dataset wrong from 3 images (CEO confirmed dataset is clean)
- **#13** — UNCONFIRMED: Cropping described in session summary but images show full legs — do NOT log until verified

---

## KEY FILES

| File | Purpose |
|---|---|
| `01_characters/jasmine/jasmine_generation_prompt.md` | Master prompt v2.1 — ALL inference prompts derive from here |
| `03_ai_models/jasmine_mako/training_data/kling_generation_prompts.md` | How all 40 training images were generated |
| `03_ai_models/jasmine_mako/lora_checkpoints/jasmine_v2.safetensors` | v2 — DO NOT USE (watermarks baked in) |
| `/tmp/test_v2_vastai.py` | Inference test script — update LORA_LOCAL for v3 |
| `00_agency/credentials.md` | All tokens and API keys |
| `00_agency/claude_failure_log.md` | Failure log — update after each session |

---

## COST ESTIMATE

| Item | Cost |
|---|---|
| RTX 4090 ~90 min @ ~$0.35/hr | ~$0.52 |
| Total | **< $1** |

Balance should be > $0 in Vast.ai account. Verify before renting.
