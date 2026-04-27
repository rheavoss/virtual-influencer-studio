# JASMINE VAST.AI TRAINING SOP — v4
**Dataset:** jasmine_v4_training_31.zip (31 images + 31 captions)
**Trigger word:** jasmakogirl
**Config:** training_configs/jasmine_v4.yaml
**Based on:** Verified working run — Instance 35219546, RTX 4090, 2026-04-19

---

## PRE-FLIGHT CHECKLIST (Mac — before touching Vast.ai)

```bash
# 1. Verify zip exists and has 62 files
unzip -l ~/Desktop/Instagram/03_ai_models/jasmine_mako/02_training_data/jasmine_v4_training_31.zip | tail -3

# 2. Check Vast.ai balance (must be > $1)
vastai show user | grep balance

# 3. Get API keys from credentials file
cat ~/Desktop/Instagram/00_agency/credentials.md
# You need: Vast.ai API key + HuggingFace token
```

---

## STEP 1 — Setup Vast.ai CLI (Mac)

```bash
# Install if not already installed
pip install vastai

# Set API key (get from credentials.md)
vastai set api-key YOUR_VAST_AI_KEY

# Verify — must show your account and balance
vastai show user
```

---

## STEP 2 — Search for Instance

```bash
vastai search offers \
  'gpu_name=RTX_4090 num_gpus=1 disk_space>=80 reliability>0.98 cuda_vers>=12.8 inet_down>=800' \
  -t on-demand -o dph_total
```

- Pick the **cheapest** result at the top
- Note the **ID** (leftmost number) — that is your OFFER_ID
- **Do NOT skip the inet_down>=800 filter** — FLUX model is 24GB, slow network = stall

---

## STEP 3 — Rent Instance

```bash
vastai create instance <OFFER_ID> \
  --image pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime \
  --disk 80 \
  --ssh --direct \
  --onstart "env >> /etc/environment"
```

Note the **INSTANCE_ID** from the output.

```bash
# Wait until status = running (2-5 min)
vastai show instances
```

When running, note the **SSH port** and **IP** from the output.

---

## STEP 4 — Pre-flight SSH Check (Mac)

```bash
SSH="ssh -o StrictHostKeyChecking=no -p PORT root@IP"

# Must print: True
$SSH "python3 -c 'import torch; print(torch.cuda.is_available())'"
```

If False → wrong instance, destroy and rent again.

---

## STEP 5 — Install Dependencies (on instance)

```bash
# CRITICAL: Install torch FIRST before requirements.txt
$SSH "pip install torch==2.6.0+cu124 --index-url https://download.pytorch.org/whl/cu124"

# Clone ai-toolkit
$SSH "cd /workspace && git clone https://github.com/ostris/ai-toolkit.git && cd ai-toolkit && git submodule update --init --recursive"

# Install requirements (after torch)
$SSH "cd /workspace/ai-toolkit && pip install -r requirements.txt"
```

---

## STEP 6 — HuggingFace Auth (on instance)

```bash
# Set HF token (get from credentials.md)
$SSH "pip install huggingface_hub && huggingface-cli login --token YOUR_HF_TOKEN"
```

---

## STEP 7 — Upload Dataset (Mac)

```bash
# Upload zip
scp -o StrictHostKeyChecking=no -P PORT \
  ~/Desktop/Instagram/03_ai_models/jasmine_mako/02_training_data/jasmine_v4_training_31.zip \
  root@IP:/workspace/jasmine_v4_training_31.zip

# Extract on instance
$SSH "unzip /workspace/jasmine_v4_training_31.zip -d /workspace/dataset_raw"

# Verify flat structure (PNGs and TXTs must be at same level, not nested)
$SSH "ls /workspace/dataset_raw/ | head -10"

# If files are in a subfolder (e.g. TRAINING_DATASET_20260426_31_images/), flatten:
$SSH "mkdir -p /workspace/dataset && mv /workspace/dataset_raw/*/*.png /workspace/dataset/ && mv /workspace/dataset_raw/*/*.txt /workspace/dataset/ 2>/dev/null; ls /workspace/dataset/ | wc -l"

# Must print: 62 (31 PNG + 31 TXT)
```

---

## STEP 8 — Create Training Config (on instance)

```bash
$SSH "mkdir -p /workspace/ai-toolkit/config"

# Upload config from local
scp -o StrictHostKeyChecking=no -P PORT \
  ~/Desktop/Instagram/03_ai_models/jasmine_mako/training_configs/jasmine_v4.yaml \
  root@IP:/workspace/ai-toolkit/config/jasmine_v4.yaml

# Verify it landed
$SSH "cat /workspace/ai-toolkit/config/jasmine_v4.yaml | head -5"
```

---

## STEP 9 — Start Training (on instance)

```bash
$SSH "cd /workspace/ai-toolkit && nohup python3 run.py config/jasmine_v4.yaml > /workspace/train_v4.log 2>&1 &"

# Confirm started (wait 30 sec)
sleep 30
$SSH "tail -20 /workspace/train_v4.log"
```

Expected first lines: model loading, FLUX downloading (~24GB), then step 1/2000.

---

## STEP 10 — Monitor Training (Mac)

```bash
# Run every 5-10 min
$SSH "tail -30 /workspace/train_v4.log"
```

**Healthy signs:**
- Loss values between 0.15–0.50, trending down
- Step count incrementing
- Sample images saved at step 500, 1000, 1500, 2000

**If log shows no new lines for >10 min → training stalled. Destroy and re-examine.**

Total time: ~50–80 min on RTX 4090.

---

## STEP 11 — Download LoRA (Mac — after step 2000 confirmed)

```bash
# Create local destination
mkdir -p ~/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/

# Download safetensors
scp -o StrictHostKeyChecking=no -P PORT \
  "root@IP:/workspace/output/jasmine_v4/*.safetensors" \
  ~/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/

# Verify size (~150-180MB)
ls -lh ~/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/
```

---

## STEP 12 — DESTROY INSTANCE IMMEDIATELY

```bash
vastai destroy instance <INSTANCE_ID>

# Verify destroyed — must return empty
vastai show instances
```

**If not destroyed, you keep getting charged.**

---

## SUCCESS CRITERIA

- [ ] Step 2000/2000 confirmed in train_v4.log
- [ ] jasmine_v4.safetensors downloaded (~150–180MB)
- [ ] Instance destroyed — `vastai show instances` empty
- [ ] Report back: "Training complete — safetensors downloaded"

---

## COST ESTIMATE

| Item | Cost |
|---|---|
| RTX 4090 ~60–80 min | ~$0.30–0.45 |
| Storage 80GB | ~$0.02 |
| **Total** | **< $0.50** |

---

## LESSONS FROM PRIOR FAILURES (non-negotiable)

| Rule | Why |
|---|---|
| `inet_down>=800` filter always | FLUX 24GB download stalled on slow network — $2.40 lost |
| `pytorch 2.5.1` image always | torch version mismatch with ai-toolkit caused failure |
| Install torch FIRST, then requirements.txt | Version conflict if done in wrong order |
| Verify 62 files in dataset before training | Missing captions = silent training failure |
| Destroy immediately after download | Storage charges continue until destroyed |
