#!/usr/bin/env python3
"""
Civitai Top Models Query
Pulls ranked tables for: consistent character, Indian/South Asian, Flux LoRAs,
ZIT base model, video generation, realistic female influencer.
"""

import requests
import json
from datetime import datetime

BASE = "https://civitai.com/api/v1"
HEADERS = {"Content-Type": "application/json"}

def query(params):
    try:
        r = requests.get(f"{BASE}/models", params=params, headers=HEADERS, timeout=15)
        r.raise_for_status()
        return r.json().get("items", [])
    except Exception as e:
        print(f"  ERROR: {e}")
        return []

def print_table(title, items, limit=15):
    print(f"\n{'='*80}")
    print(f"  {title}")
    print(f"{'='*80}")
    if not items:
        print("  No results.")
        return
    print(f"  {'#':<4} {'Downloads':>10}  {'Type':<12} {'Base':<20} {'Name'}")
    print(f"  {'-'*4} {'-'*10}  {'-'*12} {'-'*20} {'-'*40}")
    for i, m in enumerate(items[:limit], 1):
        name = m.get("name", "?")[:55]
        dl = sum(v.get("stats", {}).get("downloadCount", 0) for v in m.get("modelVersions", []))
        mtype = m.get("type", "?")
        base = m.get("modelVersions", [{}])[0].get("baseModel", "?")[:18]
        print(f"  {i:<4} {dl:>10,}  {mtype:<12} {base:<20} {name}")

def get_top_downloads(dl_field="downloadCount"):
    """Get total downloads across all versions"""
    pass

# ── 1. Consistent Character + Instagram Influencer ──────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "consistent character instagram influencer"})
print_table("CONSISTENT CHARACTER — INSTAGRAM INFLUENCER (Most Downloaded)", items)

# ── 2. Z-Image Turbo base model ──────────────────────────────────────────────
items = query({"limit": 10, "sort": "Most Downloaded", "query": "Z-Image Turbo", "types": "Checkpoint"})
print_table("Z-IMAGE TURBO BASE CHECKPOINT", items)

# ── 3. ZIT LoRAs — all types ─────────────────────────────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "ZImageTurbo influencer", "baseModels": "ZImageTurbo"})
print_table("ZIT LoRAs — INFLUENCER (sorted by downloads)", items)

# ── 4. Flux.1 consistent character ──────────────────────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "consistent character realistic", "baseModels": "Flux.1 D", "types": "LORA"})
print_table("FLUX.1 D — CONSISTENT CHARACTER LoRAs", items)

# ── 5. Indian / South Asian female ──────────────────────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "indian south asian woman realistic"})
print_table("INDIAN / SOUTH ASIAN REALISTIC FEMALE", items)

# ── 6. Realistic skin / photorealistic Flux ──────────────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "realistic skin photorealistic flux woman", "types": "LORA"})
print_table("REALISTIC SKIN / PHOTOREALISTIC FLUX LoRAs", items)

# ── 7. Video generation — Wan / consistent character ────────────────────────
items = query({"limit": 15, "sort": "Most Downloaded", "query": "wan video consistent character realistic"})
print_table("VIDEO GENERATION — WAN / CONSISTENT CHARACTER", items)

# ── 8. Virtual influencer — all bases ────────────────────────────────────────
items = query({"limit": 20, "sort": "Most Downloaded", "query": "virtual influencer realistic photorealistic"})
print_table("VIRTUAL INFLUENCER — ALL BASES (Most Downloaded)", items)

# ── 9. Fair skin Indian / fair skin South Asian ─────────────────────────────
items = query({"limit": 15, "sort": "Most Downloaded", "query": "fair skin indian light skin south asian woman"})
print_table("FAIR SKIN INDIAN / LIGHT SKIN SOUTH ASIAN", items)

# ── 10. Top Flux checkpoints overall ─────────────────────────────────────────
items = query({"limit": 15, "sort": "Most Downloaded", "types": "Checkpoint", "baseModels": "Flux.1 D"})
print_table("TOP FLUX.1 D CHECKPOINTS (Most Downloaded)", items)

print(f"\n\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
print("Source: civitai.com/api/v1/models")
