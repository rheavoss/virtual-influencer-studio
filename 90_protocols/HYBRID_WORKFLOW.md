# HYBRID WORKFLOW — Grok + Claude + Antigravity (RALPH Enforced)
1. Task → Grok (Research Gate)
2. Grok → GROK_OUTBOX.md → Claude reads
3. Claude writes spec → CLAUDE_INBOX.md
4. Antigravity executes → writes result to ANTIGRAVITY_INBOX.md
5. Grok verifies live → updates RALPH_CHECKLIST.md + GROK_OUTBOX.md
6. Only after Grok sign-off → commit & push
Any error → STOP and ping Grok immediately.
