# Document 14: Dataset Acquisition & Curation Pipeline
*Date: Session 2026-04-09*

This document archives the status of the Sofia Ansari dataset scraped and processed today.

## 1. Acquisition
- **Tool Used:** `gallery-dl`
- **Source:** Facebook & Instagram public profiles of Sofia Ansari.
- **Volume:** 368 total raw images downloaded.
- **Security Protocol Deployed:** As per the new Operational Guidelines, the use of `--cookies-from-browser` (using the user's personal Facebook cookies) was aggressively flagged. Future bulk scraping will avoid personal profile authentication unless absolutely necessary and explicitly approved by the user.

## 2. Processing & Curation
- **Tool Used:** `curate.py` (Local python script built for this project).
- **Logic:** The script was executed to sort the 368 raw images based on utility for LoRA training (filtering out low-quality, group shots, or heavily obscured faces/bodies).

**Final Distribution:**
- `training_ready/`: **317 images** (These are the high-quality, LoRA-ready images. They form the core dataset for the Replicate Flux.1 training job).
- `need_review/`: **50 images** (Awaiting manual user review to determine if they should be included in the training dataset or discarded).
- `excluded/`: **1 image** (Automatically flagged and rejected by the script).

## 3. Next Steps for Dataset
1. The user will manually review the 50 images in `need_review/`.
2. Move any acceptable images from `need_review/` to `training_ready/`.
3. Zip the final `training_ready/` directory.
4. Upload to Replicate for Flux.1 LoRA training.
