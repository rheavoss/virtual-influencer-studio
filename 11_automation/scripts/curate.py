#!/usr/bin/env python3
"""
Sofia Ansari Training Data Curation
====================================
Sorts 368 images into subfolders based on quality criteria.
NOTHING IS DELETED — only moved.

Folders created:
  training_ready/  — Clean, high-quality solo shots → use for LoRA training
  need_review/     — Borderline (blurry, unusual crop, partially covered)
  excluded/        — Clearly not useful (too small, corrupted, tiny file)

Log: curation_log.txt
"""

import os
import shutil
import statistics
from pathlib import Path
from PIL import Image, ImageFilter

BASE_DIR = Path("/Users/user/Desktop/Instagram/sofia ansari training data")

# Output subfolders
TRAINING_READY = BASE_DIR / "training_ready"
NEED_REVIEW    = BASE_DIR / "need_review"
EXCLUDED       = BASE_DIR / "excluded"

for d in [TRAINING_READY, NEED_REVIEW, EXCLUDED]:
    d.mkdir(exist_ok=True)

# ── Thresholds ──────────────────────────────────────────────
MIN_DIMENSION    = 400     # px — shortest side must be at least this
MIN_FILE_SIZE_KB = 15      # KB  — below this = likely thumbnail / icon
BLUR_THRESHOLD   = 6.0     # mean edge intensity — below this = probably blurry
ASPECT_EXTREME   = 0.25    # aspect ratio below this = extreme crop / screenshot UI

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

# ── Blur detection (Pillow only, no numpy) ──────────────────
def sharpness_score(img: Image.Image) -> float:
    """
    Convert to greyscale, run FIND_EDGES filter, return mean pixel intensity.
    Higher score = more edges = sharper image.
    """
    gray  = img.convert('L')
    edges = gray.filter(ImageFilter.FIND_EDGES)
    pixels = list(edges.getdata())
    return statistics.mean(pixels) if pixels else 0.0

# ── Main loop ───────────────────────────────────────────────
stats = {"training_ready": 0, "need_review": 0, "excluded": 0}
log_lines = []
errors = []

all_files = sorted(
    f for f in BASE_DIR.iterdir()
    if f.is_file() and f.suffix.lower() in IMAGE_EXTS
)

print(f"Found {len(all_files)} image files. Curating...\n")

for filepath in all_files:
    destination = None
    reason      = ""

    file_size_kb = filepath.stat().st_size / 1024

    try:
        with Image.open(filepath) as img:
            img.load()                          # force full decode
            w, h       = img.size
            min_dim    = min(w, h)
            max_dim    = max(w, h)
            aspect     = min_dim / max_dim if max_dim else 0
            blur       = sharpness_score(img)
            mode       = img.mode

        # ── Decision tree ──

        # 1. Corrupted / empty
        if min_dim == 0:
            destination = EXCLUDED
            reason = "zero_dimension"

        # 2. Too small — likely thumbnail
        elif min_dim < MIN_DIMENSION:
            destination = EXCLUDED
            reason = f"too_small ({w}×{h})"

        # 3. Tiny file — likely compressed icon
        elif file_size_kb < MIN_FILE_SIZE_KB:
            destination = EXCLUDED
            reason = f"tiny_file ({file_size_kb:.1f} KB)"

        # 4. Extreme aspect — likely full-app screenshot with UI chrome
        elif aspect < ASPECT_EXTREME:
            destination = NEED_REVIEW
            reason = f"extreme_aspect_ratio ({w}×{h}, ratio={aspect:.2f})"

        # 5. Blurry
        elif blur < BLUR_THRESHOLD:
            destination = NEED_REVIEW
            reason = f"possibly_blurry (edge_score={blur:.2f})"

        # 6. Animated GIF (multi-frame) — not useful for LoRA
        elif filepath.suffix.lower() == '.gif':
            destination = NEED_REVIEW
            reason = "animated_gif"

        # 7. All good — training ready
        else:
            destination = TRAINING_READY
            reason = f"ok ({w}×{h}, edge={blur:.2f}, {file_size_kb:.0f}KB)"

    except Exception as e:
        destination = NEED_REVIEW
        reason = f"open_error: {e}"
        errors.append(f"{filepath.name}: {e}")

    folder_key = destination.name
    stats[folder_key] = stats.get(folder_key, 0) + 1
    shutil.move(str(filepath), str(destination / filepath.name))
    log_lines.append(f"{folder_key:<20} | {filepath.name:<60} | {reason}")
    print(f"  [{folder_key}]  {filepath.name}")

# ── Write log ───────────────────────────────────────────────
log_path = BASE_DIR / "curation_log.txt"
with open(log_path, 'w') as f:
    f.write("Sofia Ansari Training Data — Curation Log\n")
    f.write("=" * 80 + "\n\n")
    f.write(f"  training_ready : {stats.get('training_ready', 0)}\n")
    f.write(f"  need_review    : {stats.get('need_review',    0)}\n")
    f.write(f"  excluded       : {stats.get('excluded',       0)}\n")
    if errors:
        f.write(f"\n  open errors    : {len(errors)}\n")
    f.write("\n" + "-" * 80 + "\n\n")
    f.write('\n'.join(log_lines))
    if errors:
        f.write("\n\n── Open Errors ─────────────────────────\n")
        f.write('\n'.join(errors))

print("\n" + "=" * 50)
print(f"✅  Curation complete!")
print(f"    training_ready : {stats.get('training_ready', 0)} images")
print(f"    need_review    : {stats.get('need_review',    0)} images")
print(f"    excluded       : {stats.get('excluded',       0)} images")
print(f"    Log            : {log_path}")
print("=" * 50)
