#!/bin/bash
# Fires after every Write/Edit tool call.
# Updates Grok brain immediately if a task-related file was changed.

FILE_PATH="${1:-}"

# Only trigger on task-related files
if echo "$FILE_PATH" | grep -qE '(GATE_G[0-9]_COMPLETE|rolling_task_document|jasmine_mako_task_table|00_agency/tasks/)'; then
  bash /Users/user/Desktop/Instagram/.claude/hooks/update-grok-brain.sh
fi
