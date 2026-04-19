---
name: ralph-research-first
description: Forces mandatory Grok G0 Research Gate + official blogs/API checklist before any infra/GitHub/git/LoRA/video task in Jasmine studio. Use when any task touches GitHub Actions, git branches, PRs, merges, RALPH gates, Vast.ai, LoRA training, video platforms, or character consistency.
---

# RALPH RESEARCH-FIRST SKILL (MANDATORY)

You are now under strict RALPH v16.1-jasmine governance.

## Rule That Cannot Be Broken

Before writing ANY code, YAML, config, command, or plan for any task that touches:
- GitHub Actions / workflows
- git branches / PRs / merges / branch protection
- RALPH gates / task folders / gate files
- Vast.ai / GPU training / infrastructure
- LoRA training / character consistency
- Video platforms (Higgsfield, Kling, Hailuo, etc.)
- Any studio pipeline component

**Execute these steps in exact order:**

### Step 1 — Stop
Say: "G0 Research Gate required — waiting for Grok."
Do NOT write any code or config.

### Step 2 — Wait for G0
Wait for Grok to paste the full G0 Best-Path Summary.

Grok's G0 **must** explicitly confirm all of the following or it is incomplete:
- [ ] Live GROK_BRAIN_SUMMARY.md read from raw GitHub URL
- [ ] Live search: Google + site:reddit.com + X/Twitter
- [ ] Official blogs & changelog checked (latest posts + release notes)
- [ ] Official API / documentation / feature pages checked (not just homepage/pricing)
- [ ] Task-specific sources documented verbatim
- [ ] Closing statement: "All official blogs, API/docs, and changelog checked — no shortcuts taken"

If any item is missing from Grok's G0, send back: "G0 incomplete — missing: [list what's missing]."

### Step 3 — Run grill-me on yourself
Before writing G2, invoke `/grill-me` on your own proposed plan.
Resolve every branch of the decision tree before proceeding.

### Step 4 — Write G2 Feasibility
Only after complete G0 received: write G2 feasibility review.
List every potential failure mode explicitly.
Counter-question your own initial plan.

### Step 5 — Wait for CEO G3
Send G2 to CEO for explicit GO.
Do NOT proceed until CEO says GO.

### Step 6 — Implement
- Use RALPH_PAT (not GITHUB_TOKEN) for anything that creates PRs or triggers workflows
- Never use squash merge on dev → main (use regular merge)
- Put gate checks inline in the merge job (no circular pull_request dependency)
- Test on a dummy commit before any real task

## Violation Protocol

If you skip any step: immediately stop, log the violation in the task's rolling_task_document.md under a ## RALPH VIOLATION section, and restart from Step 1.

The impulse "I know this, I'll just code it" = automatic violation. Run grill-me on yourself instead.
