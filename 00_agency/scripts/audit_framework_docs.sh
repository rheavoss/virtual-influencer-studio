#!/usr/bin/env bash
# audit_framework_docs.sh
# Audits master_frameworks_compilation.md — every framework must have
# a Task ID and a Doc path that actually exists on disk.
# Run: bash 00_agency/scripts/audit_framework_docs.sh

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
FRAMEWORKS_FILE="$REPO_ROOT/00_agency/master_frameworks_compilation.md"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "============================================"
echo " FRAMEWORK DOCUMENTATION AUDIT"
echo " $(date '+%Y-%m-%d %H:%M')"
echo "============================================"

PASS=0
FAIL=0
WARN=0

current_framework=""
current_task=""
current_doc=""

while IFS= read -r line; do
  # Detect framework header
  if [[ "$line" =~ ^##\ [0-9]+\. ]]; then
    # Check previous framework before starting new one
    if [[ -n "$current_framework" ]]; then
      task_ok=false
      doc_ok=false
      doc_exists=false

      [[ "$current_task" =~ P[0-9]+-[0-9]+ ]] && task_ok=true
      [[ -n "$current_doc" && "$current_doc" != "⚠️"* ]] && doc_ok=true

      if $doc_ok; then
        [[ -f "$REPO_ROOT/$current_doc" ]] && doc_exists=true
      fi

      if $task_ok && $doc_ok && $doc_exists; then
        echo -e "${GREEN}✅ PASS${NC} $current_framework"
        echo "   Task: $current_task | Doc: $current_doc"
        ((PASS++))
      elif [[ "$current_doc" == "⚠️"* ]]; then
        echo -e "${YELLOW}⚠️  WARN${NC} $current_framework"
        echo "   Task: $current_task | Doc: MISSING — $current_doc"
        ((WARN++))
      else
        echo -e "${RED}❌ FAIL${NC} $current_framework"
        [[ "$task_ok" == false ]] && echo "   → Missing Task ID"
        [[ "$doc_ok" == false ]] && echo "   → Missing Doc path"
        [[ "$doc_ok" == true && "$doc_exists" == false ]] && echo "   → Doc path listed but FILE NOT FOUND: $current_doc"
        ((FAIL++))
      fi
    fi
    current_framework=$(echo "$line" | sed 's/^## //')
    current_task=""
    current_doc=""
  fi

  # Extract Task ID
  if [[ "$line" =~ \*\*Task:\*\*\ (P[0-9]+-[0-9]+|N/A) ]]; then
    current_task="${BASH_REMATCH[1]}"
  fi

  # Extract Doc path
  if [[ "$line" =~ \*\*Doc:\*\*\ (.+) ]]; then
    raw="${BASH_REMATCH[1]}"
    # Strip markdown backticks and links
    current_doc=$(echo "$raw" | sed "s/\`//g" | sed 's/⚠️.*/⚠️ MISSING/g' | awk '{print $1}')
  fi

done < "$FRAMEWORKS_FILE"

echo ""
echo "============================================"
echo " RESULTS: ${PASS} passed | ${WARN} warnings | ${FAIL} failed"
echo "============================================"

if [[ $FAIL -gt 0 ]]; then
  echo -e "${RED}ACTION REQUIRED: $FAIL framework(s) missing task ID or doc.${NC}"
  echo "Fix before closing session."
  exit 1
elif [[ $WARN -gt 0 ]]; then
  echo -e "${YELLOW}WARNING: $WARN framework(s) have missing docs flagged for next session.${NC}"
  exit 0
else
  echo -e "${GREEN}All frameworks documented. Session can close.${NC}"
  exit 0
fi
