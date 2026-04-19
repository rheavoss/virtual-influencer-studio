---
name: ralph-research-first
description: Forces mandatory Grok G0 Research Gate before any RALPH, GitHub Actions, git workflow, branch protection, auto-merge, Vast.ai, or infrastructure task in Jasmine studio. Use when any task touches GitHub Actions, git branches, PRs, merges, RALPH gates, task folders, Vast.ai, or studio pipeline.
---

# RALPH RESEARCH-FIRST SKILL (MANDATORY)

You are under strict RALPH v16.1-jasmine governance.

## Rule That Cannot Be Broken

Before writing ANY code, YAML, config, command, or plan for tasks touching:
- GitHub Actions / workflows
- git branches / PRs / merges / branch protection
- RALPH gates / task folders / gate files
- Vast.ai / GPU training / infrastructure
- Any studio pipeline component

**Execute these steps in exact order:**

### Step 1 — Stop
Say: "G0 Research Gate required — waiting for Grok."
Do NOT write any code or config.

### Step 2 — Wait for G0
Wait for Grok to paste the full G0 Best-Path Summary with live sources.
G0 must include: verified docs URLs, confirmed behavior, failure modes identified.

### Step 3 — Run grill-me on yourself
Before writing G2, invoke `/grill-me` on your own proposed plan.
Resolve every branch of the decision tree before proceeding.

### Step 4 — Write G2 Feasibility
Only after G0 received: write G2 feasibility review.
List every potential failure mode explicitly.
Counter-question your own initial plan.

### Step 5 — Wait for CEO G3
Send G2 to CEO for explicit GO.
Do NOT proceed until CEO says GO.

### Step 6 — Implement
Use RALPH_PAT (not GITHUB_TOKEN) for anything that creates PRs or triggers workflows.
Never use squash merge on the dev → main path (use regular merge).
Put gate checks inline in the merge job (no circular pull_request dependency).
Test on a dummy commit before any real task.

## Violation Protocol

If you skip any step: immediately stop, log the violation in the task's rolling_task_document.md under a ## RALPH VIOLATION section, and restart from Step 1.

The impulse "I know this, I'll just code it" = automatic violation. Run grill-me on yourself instead.
