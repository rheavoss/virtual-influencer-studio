# Jasmine Project — Non-Negotiable Operational Guidelines
**Created:** 2026-04-09
**Authority:** These rules are non-negotiable and override any urgency or convenience in all future sessions.

---

## RULE 1: Risk Disclosure Before ANY Command Execution

**What happened:** AI ran `gallery-dl --cookies-from-browser chrome` (which used the user's personal Facebook account cookies to scrape another user's public photos) without disclosing the account ban/flagging risk first.

**The rule:**
> Before executing ANY command that touches external accounts, cookies, credentials, APIs, or third-party platforms, the AI MUST first:
> 1. Explicitly state what account/credential is being used
> 2. State the risk level (Low / Medium / High) and what the risk is
> 3. State if there is a safer zero-risk alternative
> 4. Wait for explicit user approval AFTER disclosing risks

**Format required:**
```
⚠️ Risk Check Before Running:
- Action: [what the command will do]
- Account used: [which account/cookie/credential]
- Risk: [Low/Medium/High] — [specific risk]
- Safer alternative: [yes/no — explain]
Proceed? (yes/no)
```

**No exceptions. "yes to install and run" is NOT blanket approval for all risk decisions inside that run.**

---

## RULE 2: Never Use User's Personal Accounts for Bulk Scraping Without Explicit Permission

**The rule:**
> When scraping or downloading from public pages, ALWAYS attempt the no-credentials / no-cookie approach first.
> Only use the user's logged-in account cookies if:
> (a) The content is private/requires login, AND
> (b) The user has explicitly approved account usage after being told the risk

**For gallery-dl:** Default command is `gallery-dl -d ~/Downloads/folder "URL"` — no `--cookies-from-browser` flag unless explicitly approved.

---

## RULE 3: No Command Auto-Run Without Verifying It Is Safe

**The rule:**
> If a command could result in: account bans, rate limits, API charges, file deletions, irreversible state changes, or external service calls — it MUST be discussed first.
> `SafeToAutoRun` must only be set for true read-only/zero-risk operations.

---

## RULE 4: State Open Questions Before Executing, Not During

**The rule:**
> If the AI has questions about risks, approach, or safer alternatives — ask them BEFORE starting execution. Do not start a risky execution and then ask mid-way.

---

*These rules apply to all future sessions on this project. They are to be checked at the start of every session.*
