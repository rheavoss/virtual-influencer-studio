---
# G.Brain Communication SOP
**Created:** 2026-04-25
**Authority:** Claude Code — mandatory reference before any Grok/Antigravity handoff
**Purpose:** Complete map of how Claude, Grok, and Antigravity communicate. No surprises.

---

## 1. FILE MAP — WHO READS WHAT

| File | Path | Written by | Read by | Purpose |
|------|------|-----------|---------|---------|
| **Grok Brain** | `99_grok_brain/grok_brain_summary.md` | Claude (Stop hook, every session end) | Grok (GitHub, start of every task) | Live project state — single source of truth for Grok |
| **Grok Inbox** | `90_protocols/gbrain_handoffs/GROK_INBOX.md` | Claude | Grok (CEO shares URL or pastes content) | Claude's research questions queued for Grok |
| **Grok Outbox** | `90_protocols/gbrain_handoffs/GROK_OUTBOX.md` | Claude + Grok | Each other (via CEO bridge) | Handoffs, responses, status updates in both directions |
| **Claude Inbox** | `90_protocols/gbrain_handoffs/CLAUDE_INBOX.md` | Grok | Claude | Grok's specs and tasks for Claude to execute |
| **Antigravity Inbox** | `90_protocols/gbrain_handoffs/ANTIGRAVITY_INBOX.md` | Claude | Antigravity | Claude's tasks for Antigravity to execute |
| **Handoff Template** | `90_protocols/gbrain_handoffs/HANDOFF_TEMPLATE.md` | — | Everyone | Standard format for all handoff entries |
| **RALPH Checklist** | `90_protocols/gbrain_handoffs/RALPH_CHECKLIST.md` | Grok | Grok | Governance gates Grok enforces before every answer |

---

## 2. HOW TO SEND A RESEARCH REQUEST TO GROK

**Claude → Grok flow (step by step):**

1. **Claude writes to `GROK_INBOX.md`** using the handoff template format:
   ```
   ## RESEARCH REQUEST: [Topic]
   **Date:** YYYY-MM-DD
   **From:** Claude
   **Priority:** CRITICAL / High / Medium
   **Context:** [1-2 sentences of why this is needed]

   ### Q1 — [Question category]
   - [Specific question with all context Grok needs to web-search it]

   ### Q2 — [Question category]
   - ...

   **Decision needed:** [What Claude will do with the answer]
   ```

2. **Claude pushes to GitHub** (switch to rheavoss first):
   ```bash
   gh auth switch --user rheavoss
   git add 90_protocols/gbrain_handoffs/GROK_INBOX.md
   git commit -m "chore: add research request to Grok inbox — [topic]"
   git push
   ```

3. **CEO shares with Grok** — one of two methods:
   - **Option A (preferred):** Share the raw GitHub URL:
     ```
     https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/90_protocols/gbrain_handoffs/GROK_INBOX.md
     ```
   - **Option B:** Copy-paste the request block directly into Grok chat

4. **Grok researches** — Grok runs the Research Gate algorithm (web search → first principles → retrograde analysis) before answering. RALPH gates must pass.

5. **CEO pastes Grok's answer** back to Claude in the chat.

6. **Claude saves Grok's answer** to `GROK_OUTBOX.md` and removes the resolved request from `GROK_INBOX.md`.

---

## 3. HOW GROK SENDS TASKS TO CLAUDE

**Grok → Claude flow:**

1. Grok writes a response or task into `GROK_OUTBOX.md` (or CEO pastes it)
2. Claude reads `GROK_OUTBOX.md` at session start or when CEO signals "Grok replied"
3. Claude confirms execution in `CLAUDE_INBOX.md`
4. Claude removes completed items from outbox after acting on them

---

## 4. HOW CLAUDE SENDS TASKS TO ANTIGRAVITY

1. Claude writes to `ANTIGRAVITY_INBOX.md` — include: situation, ordered steps, what's already done, open questions
2. Push to GitHub
3. CEO shares with Antigravity

---

## 5. GROK BRAIN — WHEN CLAUDE UPDATES IT

`grok_brain_summary.md` is updated automatically by the Stop hook at end of every Claude session. It contains:
- Project overview + current phase
- Character spec
- Dataset status
- LoRA training status
- Task table (top pending)
- Platform stack decisions
- Pending research requests (if any)

**Rule:** If Grok needs to know something at the START of a task (project state, locked decisions), it goes in `grok_brain_summary.md`. If Claude needs Grok to RESEARCH something, it goes in `GROK_INBOX.md`.

GitHub raw URL for Grok Brain:
```
https://raw.githubusercontent.com/rheavoss/virtual-influencer-studio/main/99_grok_brain/grok_brain_summary.md
```

---

## 6. RALPH GATES — WHAT THEY MEAN

Grok enforces RALPH before answering any research question:

| Gate | What it means |
|------|--------------|
| **Van Gate** | Grok runs live web search — no relying on training memory |
| **Document Gate** | Grok reads all relevant files before answering |
| **Iron Rule** | Grok does not self-edit or self-verify — CEO/Claude confirms |
| **Live verification** | Grok checks that conclusions match real current data |
| **CEO sign-off** | Grok does not proceed to execution without CEO approval |

If Grok skips any gate → stop and flag immediately.

---

## 7. COMMON MISTAKES — DO NOT REPEAT

| Mistake | What went wrong | Correct action |
|---------|----------------|----------------|
| Writing to `grok_inbox.md` (lowercase) without confirming filename | On macOS case-insensitive = same file, but risky habit | Always use exact filename from `ls` output |
| Writing research request to `grok_brain_summary.md` | That file is Grok's context, not the request queue | Use `GROK_INBOX.md` for requests |
| Forgetting to push before telling CEO to share with Grok | Grok reads stale file | Always push immediately after writing to any handoff file |
| Not switching to rheavoss before push | surajstoic = 403 error | `gh auth switch --user rheavoss` every time |

---

## 8. QUICK REFERENCE

```
New research needed → GROK_INBOX.md → push → CEO shares URL → Grok answers → GROK_OUTBOX.md
Grok tasks for Claude → GROK_OUTBOX.md → Claude reads → CLAUDE_INBOX.md (confirm)
Claude tasks for Antigravity → ANTIGRAVITY_INBOX.md → push → CEO shares
Grok's project context → grok_brain_summary.md (auto-updated by Stop hook)
```
