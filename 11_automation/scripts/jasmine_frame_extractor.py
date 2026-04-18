#!/usr/bin/env python3
"""
JASMINE FRAME EXTRACTOR
High-quality frame extractor for Reels, videos, and shots.
Optimized for Jasmine LoRA training and reference use.
"""

import argparse
import os
from pathlib import Path
import subprocess

def extract_frames(input_video: str, output_dir: str, fps: float = 2.0):
    input_path = Path(input_video)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print(f"🔍 Extracting frames from: {input_path.name}")
    print(f"📁 Saving to: {output_path}")

    # Extract frames at fixed interval + select sharpest via scene filter
    regular_cmd = [
        "ffmpeg", "-i", str(input_path),
        "-vf", f"fps={fps},select='gt(scene,0.1)'",
        "-vsync", "vfr",
        "-q:v", "2",
        str(output_path / "frame_%06d.png")
    ]
    result = subprocess.run(regular_cmd, capture_output=True)
    if result.returncode != 0:
        # Fallback: plain fps extraction without scene filter
        subprocess.run([
            "ffmpeg", "-i", str(input_path),
            "-vf", f"fps={fps}",
            "-q:v", "2",
            str(output_path / "frame_%06d.png")
        ], check=True, capture_output=True)

    print(f"✅ Extraction complete. Frames saved to {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Jasmine Frame Extractor")
    parser.add_argument("video", help="Path to input Reel/video file")
    parser.add_argument("--fps", type=float, default=2.0, help="Frames per second (default: 2.0)")
    parser.add_argument("--output", default="03_ai_models/jasmine_mako/training_data/need_review",
                       help="Output folder")

    args = parser.parse_args()
    extract_frames(args.video, args.output, args.fps)
