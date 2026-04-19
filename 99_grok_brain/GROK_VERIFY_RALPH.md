# RALPH System — Grok Verification Guide
**Generated:** 2026-04-19 (Session 11 post-fix)
**Purpose:** Grok reads this, runs each verification step, reports back what it finds.

---

## What Was Built This Session

### 1. LoRA Training — P0-07 COMPLETE
- `jasmine_v1.safetensors` (164MB) trained on Vast.ai RTX 4090
- 2000/2000 steps, rank 16, trigger word `jasmakogirl`
- Instance 35219546 destroyed. Cost: ~$3.21 total.
- SHA256: `f0d491cf6cf4e855935d06fbb74045c64f110e77e22eae1dd6add3b77ee4badd`

### 2. RALPH v16.1-jasmine — Fully Mechanical
Four components, all live:

| Component | What it does |
|---|---|
| Branch protection ruleset (ID: 15254081) | Blocks all direct pushes to `main`. Requires PR + CI pass. |
| `ralph-gate-enforcer.yml` | CI checks GATE_G0/G2/G3_COMPLETE.md exist. Blocks if brain stale. |
| `auto-merge-dev.yml` | Auto-creates PR dev→main on push. Auto-merges when CI passes. |
| PostToolUse hook | Updates Grok brain after every task write, not just session end. |

### 3. Brain Auto-Sync
- `.claude/hooks/task-brain-sync.sh` — fires on every Write/Edit to task files
- Triggers on: `GATE_G*_COMPLETE.md`, `rolling_task_document.md`, `jasmine_mako_task_table.md`, `00_agency/tasks/*`
- Commits + pushes `GROK_BRAIN_SUMMARY.md` to current branch immediately

### 4. GitHub Permissions Fix (done today)
- Workflow permissions changed to **Read and write** in repo settings
- "Allow GitHub Actions to create and approve pull requests" enabled
- Result: auto-PR creation now works end-to-end

---

## Grok Verification Steps

Run each check. Report pass/fail for each.

### V1 — Brain is fresh on main
```
Fetch: https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/99_grok_brain/GROK_BRAIN_SUMMARY.md
Check: "Last updated:" line shows 2026-04-19
Check: LoRA row shows "✅ COMPLETE — jasmine_v1.safetensors"
Check: P0-07 row shows "✅ COMPLETE"
PASS if all three true. FAIL if any show old data.
```

### V2 — Handoff JSON exists on main
```
Fetch: https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/99_grok_brain/GROK_SESSION_11_HANDOFF.json
Check: HTTP 200 (not 404)
Check: "status": "MECHANICALLY ACTIVE" present
PASS if both true.
```

### V3 — Gate files exist for P0-07
```
Fetch these 3 URLs (all must return 200, not 404):
https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/00_agency/tasks/TASK-P0-07/GATE_G0_COMPLETE.md
https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/00_agency/tasks/TASK-P0-07/GATE_G2_COMPLETE.md
https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/00_agency/tasks/TASK-P0-07/GATE_G3_COMPLETE.md
PASS if all 3 return 200.
```

### V4 — CI workflows exist on main
```
Fetch: https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/.github/workflows/ralph-gate-enforcer.yml
Check: contains "GATE_G0_COMPLETE.md"
Check: contains "GROK_BRAIN_SUMMARY.md is not stale"

Fetch: https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/.github/workflows/auto-merge-dev.yml
Check: contains "gh pr create"
Check: contains "gh pr merge"
PASS if all checks true.
```

### V5 — Latest GitHub Actions run passed
```
Open: https://github.com/rheavoss/virtual-influencer-studio/actions
Check: Most recent "RALPH Gate Enforcer" run = green (✅)
Check: Most recent "Auto PR + Merge dev → main" run = green (✅)
PASS if both green.
```

### V6 — Branch protection is active
```
Open: https://github.com/rheavoss/virtual-influencer-studio/settings/rules
Check: Ruleset "RALPH-protect-main" exists and is Active
Check: Required status check = "enforce-ralph"
Check: Required approving reviews = 0
PASS if ruleset active with CI-only requirement.
```

---

## What Grok Should Report Back

After running all 6 checks, reply with:

```
V1 Brain fresh: PASS/FAIL — [what you found]
V2 Handoff JSON: PASS/FAIL — [what you found]
V3 Gate files P0-07: PASS/FAIL — [which ones found]
V4 CI workflows: PASS/FAIL — [what you found]
V5 Actions runs: PASS/FAIL — [last run status]
V6 Branch protection: PASS/FAIL — [what you found]

Overall: ALL PASS / N failures
```

If any FAIL — paste the exact URL and what you got so Claude can fix it.

---

## Grok's Role Going Forward

1. **Read brain before every task:** `https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/99_grok_brain/GROK_BRAIN_SUMMARY.md`
2. **Do G0 research** (Google + Reddit + X) for the task
3. **Paste G0 findings in chat** — Claude writes and commits the `GATE_G0_COMPLETE.md`
4. **Do NOT try to write files** — Grok is research only. Claude handles all commits.
5. **Brain will be updated automatically** — no need to ask Claude to update it.

---

## Next Tasks Awaiting Grok G0 Research

| Task | What Grok needs to research |
|---|---|
| P0-29 | Recover master Jasmine generation prompts — search Reddit/civitai for FLUX.1-dev best prompt structures for consistent character LoRA output |
| P0-32 | Higgsfield as video platform — pricing India, quality vs Kling/Hailuo, API availability, content policy for AI influencers |
