# Vast.ai — Jasmine Flux.1 Dev LoRA Training Playbook
**Account:** kriger5490@gmail.com
**Credit:** $4.56 (training costs ~$0.25–0.55 total)
**Dataset:** 38 images — `03_ai_models/jasmine_mako/training_data/jasmine_dataset/`
**Trigger word:** `jasmakogirl`

---

## STEP 0 — One-time Setup (Mac)

```bash
# Install CLI
pip install vastai

# Get API key from: https://cloud.vast.ai/cli/
# Copy the command shown there — it looks like:
vastai set api-key YOUR_KEY_HERE

# Verify
vastai show user
```

---

## STEP 1 — Search for RTX 4090

```bash
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 disk_space>=50 reliability>0.98' \
  -t on-demand -o dph_total
```

Look at first result — note the **ID** (leftmost number). That's your offer_id.

---

## STEP 2 — Rent the Instance

```bash
vastai create instance <OFFER_ID> \
  --image pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime \
  --disk 50 \
  --ssh --direct \
  --onstart "env >> /etc/environment"
```

Then check status:
```bash
vastai show instances
```

Wait until status = **running** (takes 2–5 min). Note the **SSH command** shown.

---

## STEP 3 — Upload Dataset from Mac

```bash
# Get SSH port and IP from:
vastai show instances --raw

# Upload dataset (replace PORT and IP)
scp -P <PORT> -r \
  "/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset/" \
  root@<IP>:/workspace/jasmine_dataset/
```

Using vastai copy (alternative):
```bash
vastai copy local:"/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset" \
  C.<INSTANCE_ID>:/workspace/jasmine_dataset
```

---

## STEP 4 — SSH Into Instance

```bash
ssh -p <PORT> root@<IP>
```

---

## STEP 5 — Install ai-toolkit (on instance)

```bash
cd /workspace
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit
git submodule update --init --recursive
pip install -r requirements.txt
```

---

## STEP 6 — Caption Images (on instance)

```bash
cd /workspace/jasmine_dataset
for img in *.png *.jpg; do
  base="${img%.*}"
  echo "jasmakogirl, east asian taiwanese woman, high dark bun, blue eyes, bold red lips, DD bust, defined waist, white skin, photorealistic" > "${base}.txt"
done
echo "Captions done: $(ls *.txt | wc -l) files"
```

---

## STEP 7 — Create Training Config (on instance)

```bash
cat > /workspace/ai-toolkit/config/jasmine.yaml << 'EOF'
job: extension
config:
  name: jasmine_v1
  process:
    - type: 'sd_trainer'
      training_folder: "/workspace/output"
      device: cuda:0
      trigger_word: "jasmakogirl"
      network:
        type: "lora"
        linear: 16
        linear_alpha: 16
      save:
        dtype: float16
        save_every: 500
        max_step_saves_to_keep: 4
      datasets:
        - folder_path: "/workspace/jasmine_dataset"
          caption_ext: "txt"
          caption_dropout_rate: 0.05
          shuffle_tokens: false
          cache_latents_to_disk: true
          resolution: [512, 768, 1024]
      train:
        batch_size: 1
        steps: 2000
        gradient_accumulation_steps: 1
        train_unet: true
        train_text_encoder: false
        gradient_checkpointing: true
        noise_scheduler: "flowmatch"
        optimizer: "adamw8bit"
        lr: 1e-4
        ema_config:
          use_ema: true
          ema_decay: 0.99
        dtype: bf16
      model:
        name_or_path: "black-forest-labs/FLUX.1-dev"
        is_flux: true
        quantize: true
      sample:
        sampler: "flowmatch"
        sample_every: 500
        width: 768
        height: 1024
        prompts:
          - "jasmakogirl, pink micro bikini, white background, red lips, blue eyes, photorealistic"
          - "jasmakogirl, red dress, studio lighting, confident, photorealistic"
        neg: ""
        seed: 42
        walk_seed: true
        guidance_scale: 4
        sample_steps: 20
EOF
```

---

## STEP 8 — Run Training (on instance)

```bash
cd /workspace/ai-toolkit
python run.py config/jasmine.yaml
```

**What to watch:**
- Loss should decrease gradually
- Sample images generated every 500 steps — check quality
- Total time: ~35–45 min on RTX 4090

---

## STEP 9 — Download LoRA (from Mac)

```bash
scp -P <PORT> \
  root@<IP>:/workspace/output/jasmine_v1/*.safetensors \
  "/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/"
```

---

## STEP 10 — DESTROY INSTANCE IMMEDIATELY

```bash
vastai destroy instance <INSTANCE_ID>
```

Verify destroyed:
```bash
vastai show instances
```

Should return empty. **If not destroyed, you keep getting charged.**

---

## Key Notes
- `env >> /etc/environment` in onstart = env vars visible in SSH sessions
- `runtype ssh_direct` = direct SSH on port 22 (no proxy)
- Storage charges start at creation; GPU charges start when running
- `vastai stop instance` saves storage but stops GPU billing (use if pausing)
- Offer IDs are dynamic — if rent fails, offer was taken, search again
- HuggingFace token needed for FLUX.1-dev download (gated model)

## HuggingFace Token Setup (on instance)
```bash
pip install huggingface_hub
huggingface-cli login
# Paste your HF token when prompted
# Get token from: huggingface.co/settings/tokens
```

---

## Cost Breakdown
| Item | Cost |
|---|---|
| RTX 4090 ~40 min | ~$0.20 |
| Storage 50GB | ~$0.02 |
| **Total** | **~$0.25** |
| Credit available | $4.56 |
| Remaining after | ~$4.31 |
