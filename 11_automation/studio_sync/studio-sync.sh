#!/bin/bash
# Virtual Influencer Studio - Auto Sync Daemon
# Syncs code to GitHub and large binary assets directly to Google Drive via rclone

# Paths
cd /Users/user/Desktop/Instagram
RCLONE="/Users/user/.local/bin/rclone"
DRIVE="virtual-influencer-drive:VirtualInfluencerStudio"

echo "============================================="
echo "[$(date)] Starting Studio Auto-Sync..."

# 1. Sync Code to GitHub
echo ">>> Syncing Code to GitHub..."
git add .
git commit -m "chore(sync): automated studio heartbeat sync"
git push origin main

# 2. Sync Large Assets to Google Drive
echo ">>> Syncing High-Value Assets to Drive..."
$RCLONE sync 01_characters/ $DRIVE/characters/ --progress --transfers 8
$RCLONE sync 02_reference_images/ $DRIVE/reference_images/ --progress --transfers 8
$RCLONE sync 30_dataset/ $DRIVE/datasets/ --progress --transfers 8

echo "[$(date)] Sync Complete!"
echo "============================================="
