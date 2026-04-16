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

---

## RULE 5: Ad Traffic Routing — Adult Networks NEVER Direct to Instagram

**The rule:**
> Adult ad networks (Taboola, ExoClick, TrafficJunky) MUST route traffic through the `rheavoss.com` mediator page first → then to Fanvue link.
> NEVER drive adult network traffic directly to the Instagram profile. Instagram detects adult referrer traffic and shadowbans or bans the account immediately.

**Two separate ad channels — never confuse them:**
| Channel | Platform | Target | Safe? |
|---|---|---|---|
| IG Reels Ads | Meta / Instagram | SFW lifestyle content → IG profile growth | ✅ Safe on Meta |
| Taboola / ExoClick | Adult ad networks | Mediator page → Fanvue link ONLY | ✅ Safe if routed correctly |

**Cost benchmarks (India):**
- IG Reels Ads: ₹15–25 cost per follower, ₹60–120 CPM
- Taboola/ExoClick: ₹1–6 per click, 500–1,000 profile visits/day at ₹3,000/month
- IG fitness niche: ₹18–45 per follower

---

## RULE 6: Link-in-Bio — Use Bouncy.cc, NOT Linktree

**Why:** Linktree and Carrd open in Instagram's in-app browser (users are NOT logged into their accounts there). Bouncy.cc opens native Safari/Chrome where users ARE logged in → dramatically higher Fanvue signup conversion.

**Implementation:** All bio links go through Bouncy.cc wrapper first.

---

## RULE 7: Payout Architecture — Skydo as Primary USD Clearinghouse

**Route:** Fanvue USD payouts + Room 11 USD payouts → Skydo virtual US bank account → India.

**Why Skydo:** Bypasses PayPal's extreme FX margins. Acts as B2B cross-border clearinghouse. Flat fee structure vs PayPal's % cut.

**India payment gateway:** Cashfree (for INR-denominated Indian subscribers). WHOP for international. Middleware geo-routes automatically (Task P1-15 — implemented).

---

## RULE 8: Account Verification — Calilio US Virtual Number

**Service:** Calilio — ₹1,303/month for US local number + 100 SMS/month.
**Use case:** Instagram/Fanvue/platform verification that requires a US number.
**Never use personal Indian mobile number** for platform account creation.

---

## RULE 9: OPSEC Pipeline — Every Image/Video Before Upload

Every piece of content MUST pass through this pipeline before uploading to any platform:
1. **ExifTool** — strip all metadata (GPS, device info, creation timestamps)
2. **Film grain overlay** — adds natural noise to break AI-detection fingerprints
3. **FFmpeg** — for video metadata strip

Command reference:
```bash
exiftool -all= image.jpg                          # strip all metadata
ffmpeg -i input.mp4 -map_metadata -1 output.mp4  # strip video metadata
```

Task P0-07 tracks building this as an automated Python pipeline.

---

## RULE 10: CupidBot — Automated DM Conversion

**Service:** CupidBot — auto-chatter that converts free social traffic into paid Fanvue subscribers.
**Free trial:** 300 conversations included.
**Conversion rate:** 10–12% of conversations convert to paid subscribers.
**Use case:** Automatically handles DM responses, teases, and Fanvue upsells 24/7 without manual effort.

---

## RULE 11: Deprecated Methods — Do NOT Use

| Method | Reason Deprecated | Date |
|---|---|---|
| Mother-daughter IG link accounts | Instagram 2026 detects coordinated inauthentic behaviour — chain bans the entire network | 2026-04-11 |
| Direct adult traffic → IG profile | Instant shadowban/ban (see Rule 5) | Always |
| Linktree as link-in-bio | In-app browser = logged-out users = low conversion (see Rule 6) | Always |
