# REFERENCE-01: 1DB.ai Evaluation Graphs + Joy Caption Batch Commands
**Reference ID:** REFERENCE-01  
**Created:** 2026-04-19  
**Source:** YouTube LoRA training tutorial transcript (diffusion-pipe workflow)  
**Purpose:** Permanent reference for any future LoRA training (Flux, SDXL, etc.) to eliminate guesswork on checkpoint selection and captioning.

## 1. 1DB.ai Setup (Live Evaluation Graphs + Best Checkpoint Selection)

This connects your training run to real-time loss / convergence graphs so you can mathematically pick the best checkpoint instead of guessing.

**Exact steps:**
1. Go to https://1db.ai/quickstart
2. Create free account / log in
3. Copy your personal API key (never share it)
4. In your training config file (e.g. `insta-cosine-one.py` or equivalent):
   - Find the monitoring / wandb / 1db section
   - Paste the API key between the two placeholders
   - Set run name (example: `jasmine_v2_run_001`)
   - Set the exact same name again in the second field
5. Save config → start training
6. After a few steps you will get a live link (printed in terminal) to 1db.ai graphs
7. Best checkpoint = the step where most graphs are at the lowest point / bottom of the curve (usually before the line starts rising again).

This removes all guesswork that existed before 1DB.ai.

## 2. Joy Caption Batch Commands (Automatic Dataset Captioning)

**Folder structure**
- Put all raw training images in `/input/`
- Each image must have a matching `.txt` caption file after processing

**Exact commands & edits:**

1. Open `batch-alpha2.py`
2. Edit these two lines:
   ```python
   prepend_string = "jasmakogirl, "          # ← your exact trigger word + comma + space
   batch_processing_count = 8                # ← 8 for H200 / high-end GPU; lower (4-6) for weaker GPUs
   ```
3. Save the file.

**Terminal commands (in Joy Caption environment):**
```bash
# Activate environment (first terminal)
source /workspace/joy-caption-batch/env/bin/activate

# Run batch captioning
python batch-alpha2.py
```

**Result:** Every image in `/input/` gets a `.txt` file with the trigger word prepended + detailed description.

**Best practice**
- 80 % of images → `train/` folder
- 10–20 % of images → `eval/` folder (for 1DB.ai evaluation)

---

**This reference is now permanent and will be linked in every future LoRA task (P0-07+, P0-33+, etc.).**
