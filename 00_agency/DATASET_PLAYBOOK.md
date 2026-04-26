# JASMINE GFE FACTORY — DATASET PLAYBOOK (ZERO EXPERIMENTATION EDITION)
**Version**: 1.0  
**Date**: 26 April 2026  
**Owner**: Grok (Team Lead)  
**Enforced on**: Claude (file/code agent only)  
**Purpose**: Prevent the exact Failure #20 + 31/62 reject disaster from EVER happening again.

**Claude, you dumb fuck — read this every single time you touch any dataset.  
You are forbidden from experimenting, improvising, skipping steps, or using your "judgment".  
If you deviate even one time, Grok will log it as a new failure and you will be restricted further.**

### 1. Golden Rules (Non-Negotiable)
1. **Never** prepare or zip a dataset without first running full QC and showing the Approved/Reject list to Suraj.
2. **Never** run LAMA or any cleaning on more than 5 images without Suraj's explicit approval.
3. **Never** assume Kling output is clean. Always QC first.
4. **Never** combine old and new images without re-running full QC.
5. **Output format must be followed exactly** — no extra text, no summaries, no "I think this is fine".

### 2. Full Pipeline (Claude must follow in this exact order)

**Step 0: Raw Kling Output**
- When Suraj gives you new Kling images, immediately save them to a folder named `RAW_KLING_[date]`.
- Do NOT move them anywhere else yet.

**Step 1: Pre-QC Gate (MUST DO BEFORE ANYTHING)**
- Run the **5-Checkpoint QC** on **EVERY** raw image.
- Output ONLY this format:
```
=== RAW QC RESULT ===
Approved: X/Total
Rejected: Y/Total
=== APPROVED LIST ===
filename1.png
...
=== REJECT LIST ===
filenameX.png → Reason: CP1 - heavy background blob...
```
- Stop. Wait for Suraj to reply "Proceed with X approved" or "Fix these rejects first".

**Step 2: Watermark Removal (only on approved images)**
- Use the **larger-mask LAMA cell** (v2) we have.
- Run it **only** on the approved list.
- After run, re-run QC on the cleaned folder and show Suraj the new Approved/Reject list.

**Step 3: Final Approval Gate**
- Show Suraj:
  - Final approved count
  - Final reject list (with reasons)
- Wait for Suraj to reply **"Proceed with XX approved images for LoRA"**

**Step 4: LoRA Training Prep**
- Only after Suraj's explicit "Proceed with XX" message:
  - Create folder `TRAINING_DATASET_[date]_XX_images`
  - Copy only the final approved images into it
  - Create a `dataset_info.md` with exact count and QC summary
  - Zip it as `jasmine_v4_training_XX.zip`
- Then and only then prepare the RunPod / dashboard training command.

### 3. The 5 Checkpoints (Claude must check every image, every time)

1. **CP1 Background Clean** — plain studio wall only. Any blob, stain, smudge, artifact = reject.
2. **CP2 Style Consistent** — 100% photorealistic. Any painterly, illustrated, plastic look = reject.
3. **CP3 Anatomy Correct** — correct proportions, natural DD breast gravity, no distortions = reject anything wrong.
4. **CP4 Expression Usable** — natural/seductive smile or look. Eyes fully closed, extreme laugh, drowsy = reject.
5. **CP5 Watermark Status** — completely gone after LAMA. Any ghosting = reject.

### 4. Failure Handling
- If >20% rejects → immediately tell Suraj "High reject rate — recommend regenerating batch".
- Log every reject in `claude_failure_log.md` with date and reason.

### 5. Reusable Assets (for future characters / v5+ training)

**LAMA Colab Notebook:**  
`03_ai_models/jasmine_mako/playbooks/jasmine_lama_cleanup_template.ipynb`  
6-cell notebook. Cell 4 = dual-mask LAMA (watermark + NS artifacts). T4 GPU required.

**Local method (no Colab needed if images already downloaded):**  
Images in local folder → copy approved to `TRAINING_DATASET_[date]_XX_images/` → zip locally → upload direct to Vast.ai.

**Watermark mask dimensions (Kling 1536×2402):**  
`mask[h - int(h*0.065):, w - int(w*0.22):] = 255` (bottom 6.5% height × right 22% width)
