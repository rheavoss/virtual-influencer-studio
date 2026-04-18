# Vast.ai — Jasmine Flux.1 Dev LoRA Training Guide
**Account:** kriger5490@gmail.com
**Credit available:** $4.56 (sufficient — training costs ~$2)
**Dataset:** 38 images in `03_ai_models/jasmine_mako/training_data/jasmine_dataset/`

---

## Training Parameters
| Parameter | Value |
|---|---|
| Base model | Flux.1 Dev |
| Tool | ostris/ai-toolkit |
| Steps | 2000 |
| LoRA rank | 16 |
| Trigger word | `jasmakogirl` |
| Est. cost | ~$2 (~₹186) |

---

## Step 1 — Rent GPU on Vast.ai

1. Go to [cloud.vast.ai](https://cloud.vast.ai)
2. Click **Search** in left sidebar
3. Filter: **GPU RAM ≥ 24GB**, **CUDA 12+**
4. Recommended GPU: **RTX 4090** or **A100** (cheapest with 24GB+)
5. Template: Search for **"ostris ai-toolkit"** or **"Flux LoRA"** in template search
   - If not found: use **PyTorch 2.x** base template
6. Disk space: set **50GB minimum**
7. Click **Rent** — note the instance IP and port

---

## Step 2 — Connect to Instance

```bash
ssh -p <PORT> root@<IP_ADDRESS>
```

---

## Step 3 — Install ai-toolkit (if not pre-installed)

```bash
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit
git submodule update --init --recursive
pip install -r requirements.txt
```

---

## Step 4 — Upload Dataset

From your local machine:
```bash
# Zip the dataset first
cd /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data
zip -r jasmine_dataset.zip jasmine_dataset/

# Upload to Vast.ai instance
scp -P <PORT> jasmine_dataset.zip root@<IP_ADDRESS>:/workspace/
```

On the instance:
```bash
cd /workspace
unzip jasmine_dataset.zip
mkdir -p training_data/jasmine
mv jasmine_dataset/* training_data/jasmine/
```

---

## Step 5 — Create config.yaml

```bash
cat > /workspace/ai-toolkit/config/jasmine_lora.yaml << 'EOF'
job: extension
config:
  name: jasmine_lora_v1
  process:
    - type: 'sd_trainer'
      training_folder: "/workspace/output/jasmine_lora"
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
        - folder_path: "/workspace/training_data/jasmine"
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
        width: 512
        height: 768
        prompts:
          - "jasmakogirl, studio portrait, white background, red lips, photorealistic"
          - "jasmakogirl, pink micro bikini, confident pose, photorealistic"
        neg: ""
        seed: 42
        walk_seed: true
        guidance_scale: 4
        sample_steps: 20
EOF
```

---

## Step 6 — Caption the Images

Each image needs a `.txt` caption file. Run this on the instance:

```bash
cd /workspace/training_data/jasmine

for img in *.png *.jpg; do
  base="${img%.*}"
  echo "jasmakogirl, East Asian woman, high dark bun, bold red lips, full bust, defined waist, photorealistic" > "${base}.txt"
done
```

---

## Step 7 — Run Training

```bash
cd /workspace/ai-toolkit
python run.py config/jasmine_lora.yaml
```

Training takes ~30-45 minutes on RTX 4090. Watch for loss going down.

---

## Step 8 — Download the LoRA

When done, the `.safetensors` file is in `/workspace/output/jasmine_lora/`:

```bash
# On your local machine:
scp -P <PORT> root@<IP_ADDRESS>:/workspace/output/jasmine_lora/jasmine_lora_v1.safetensors \
  /Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/lora_checkpoints/
```

---

## Step 9 — Destroy Instance

**IMPORTANT: Destroy the instance immediately after download to stop billing.**

In Vast.ai console → Instances → Click **Destroy** on your instance.

---

## After Training — Test on RunPod

Load the LoRA in ComfyUI on RunPod (see `jasmine_runpod_expansion.md`):
- Trigger word: `jasmakogirl`
- LoRA strength: 0.8–1.0
- Base model: Flux.1 Dev
