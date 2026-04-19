#!/bin/bash
# Auto-updates GROK_BRAIN_SUMMARY.md at the end of every Claude session.
# Triggered by the Stop hook in .claude/settings.json
# Reads actual file state — never summarises from memory.

REPO="/Users/user/Desktop/Instagram"
BRAIN="$REPO/99_grok_brain/GROK_BRAIN_SUMMARY.md"
TASK_TABLE="$REPO/00_agency/jasmine_mako_task_table.md"
LORA_DIR="$REPO/03_ai_models/jasmine_mako/lora_checkpoints"
LOG="$REPO/.claude/hooks/brain-update.log"
TODAY=$(date '+%Y-%m-%d')

cd "$REPO" || exit 1

# --- Detect what actually changed this session ---
CHANGED=$(git diff HEAD --name-only 2>/dev/null)
STAGED=$(git diff --cached --name-only 2>/dev/null)
ALL_CHANGED="$CHANGED $STAGED"

# Only run if something actually changed (not just .gbrain)
REAL_CHANGES=$(echo "$ALL_CHANGED" | tr ' ' '\n' | grep -v '\.gbrain' | grep -v '^$' | head -5)
if [ -z "$REAL_CHANGES" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No real changes — brain update skipped" >> "$LOG"
  exit 0
fi

# --- Read live state from files ---

# LoRA status
if ls "$LORA_DIR"/*.safetensors 2>/dev/null | grep -q .; then
  LORA_FILE=$(ls "$LORA_DIR"/*.safetensors | head -1 | xargs basename)
  LORA_SIZE=$(ls -lh "$LORA_DIR"/*.safetensors | head -1 | awk '{print $5}')
  LORA_STATUS="✅ COMPLETE — $LORA_FILE ($LORA_SIZE)"
else
  LORA_STATUS="❌ NOT YET"
fi

# Vast.ai remaining credit
VASTAI_CREDIT=$(/tmp/vastai-env/bin/vastai show user --raw 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print('\$'+str(round(d.get('credit',0),2)))" 2>/dev/null || echo "unknown")

# Task statuses from task table (grep for checkboxes)
P0_07=$(grep 'P0-07' "$TASK_TABLE" 2>/dev/null | grep -q '\[x\]\|✅\|COMPLETE' && echo "✅ COMPLETE" || echo "⏳ Pending")
P0_08=$(grep 'P0-08' "$TASK_TABLE" 2>/dev/null | grep -q '\[x\]\|✅\|COMPLETE' && echo "✅ COMPLETE" || echo "⏳ Pending")

# Session changed files summary
CHANGED_SUMMARY=$(git diff HEAD --name-only 2>/dev/null | grep -v '\.gbrain' | head -8 | tr '\n' ', ' | sed 's/,$//')

# --- Update the Last updated line and a dynamic state block ---
# Use python3 for reliable in-place edit
python3 - "$BRAIN" "$TODAY" "$LORA_STATUS" "$VASTAI_CREDIT" "$CHANGED_SUMMARY" << 'PYEOF'
import sys, re

brain_file = sys.argv[1]
today = sys.argv[2]
lora_status = sys.argv[3]
vastai_credit = sys.argv[4]
changed_files = sys.argv[5]

with open(brain_file, 'r') as f:
    content = f.read()

# Update last updated line
content = re.sub(
    r'\*\*Last updated:\*\* .*',
    f'**Last updated:** {today} (auto-updated by Stop hook)',
    content
)

# Update LoRA trained line
content = re.sub(
    r'\| LoRA trained \| .*\|',
    f'| LoRA trained | {lora_status} |',
    content
)

# Update Vast.ai credit line
content = re.sub(
    r'- Remaining Vast\.ai credit: .*',
    f'- Remaining Vast.ai credit: {vastai_credit}',
    content
)

with open(brain_file, 'w') as f:
    f.write(content)

print(f"Brain updated: LoRA={lora_status}, credit={vastai_credit}, changed={changed_files}")
PYEOF

UPDATE_STATUS=$?

if [ $UPDATE_STATUS -ne 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Brain update FAILED (python error)" >> "$LOG"
  exit 0
fi

# --- Commit and push to dev ---
git add "$BRAIN"
if git diff --cached --quiet; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Brain unchanged after update — no commit" >> "$LOG"
  exit 0
fi

git commit -m "auto: grok-brain sync — $TODAY" >> "$LOG" 2>&1

# Push as rheavoss
gh auth switch --user rheavoss 2>/dev/null
TOKEN=$(gh auth token 2>/dev/null)
REMOTE_URL=$(git remote get-url origin)
REPO_PATH=$(echo "$REMOTE_URL" | sed 's|.*github.com/||' | sed 's|\.git$||' | sed 's|https://[^@]*@||')
git remote set-url origin "https://rheavoss:${TOKEN}@github.com/${REPO_PATH}.git"
git push origin "$(git rev-parse --abbrev-ref HEAD)" >> "$LOG" 2>&1
git remote set-url origin "$REMOTE_URL"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Brain synced. Changed: $CHANGED_SUMMARY" >> "$LOG"
