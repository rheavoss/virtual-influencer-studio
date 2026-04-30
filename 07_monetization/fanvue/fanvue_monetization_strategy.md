# 💸 Fanvue Monetization & Pricing Strategy

To reach our primary objective of **$2000 MRR ASAP**, we are implementing a proven "Girlfriend Experience" (GFE) tiered monetization strategy on Fanvue. 

We are not just selling photos; we are selling intimacy, validation, and parasocial connection.

---

## 🎯 The Financial Math to $2000 MRR
*Fanvue keep rate: **80%** (20% platform fee).* To gross ~$2,500 (netting $2,000), we need some combination of subscriptions and PPV.

> ⚠️ Pricing update: Sub price is **$20/month flat** (locked in master_decisions_log.md §5). The $9.99/$24.99 tier split below is a deprecated draft. Use $20/mo as the baseline subscription price.

**Target Composition (at $20/mo sub price):**
*   `75` Core Subscribers @ $20 = ~$1,500
*   `PPV & Tips (DMs)` = ~$1,000
*   **Total = $2,500 Gross ($2,000 Net at 80% keep)**

---

## 🔒 The Tiered Pacing Strategy

### 1. Free/Follower Tier (The Teaser)
**Price:** Free Entry
**What they get:**
*   A mirrored version of her Instagram feed.
*   "Locked" posts where the image is blurred.
*   **Monetization Mechanism:** The user has to pay **$4.99 to $9.99** just to view a single locked post or PPV message. This catches the impulsive spenders who don't want a monthly subscription yet.

### 2. ~~The Core Boyfriend Tier (The Anchor)~~
> ⚠️ **DEPRECATED TIER:** $9.99/$24.99 split is superseded. Sub price is **$20/month flat** (see note above and `master_decisions_log.md` §5). Sections below are kept for historical GFE mechanics reference only.

**Price:** ~~$9.99 / Month~~ → **$20/month flat**
**What they get:**
*   Unlocks all standard Fanvue posts (3-4 exclusive posts per week—more intimate/casual than Instagram).
*   Gets "Good Morning / Goodnight" mass messages (sent via Claude Agent automation).
*   Ability to DM her directly.
*   **The Hook:** She replies to them, but replies are delayed and basic. To get VIP attention, they must tip.

### 3. The VIP "GFE" Tier (The Whales)
**Price:** $24.99 / Month
**What they get:**
*   **Priority DMs:** When they message her, she replies within hours, and the replies are hyper-personalized (using Claude prompting to remember their names).
*   **Voice Notes:** 2 monthly custom audio messages (e.g., *"Hey [Name], just finished hot yoga, I'm completely dead... thinking of you."*) driven by ElevenLabs.
*   **Exclusive Content:** Access to the "spiciest" end of her content spectrum.

### 4. Custom Requests & Tipping (Pure Profit Margin)
This is where the real MRR accelerator lives.
*   **Custom Sign/Name Request:** $30. (We take a text-to-image prompt and write their name on a gym mirror or a Starbucks cup using the AI).
*   **"Pick my outfit" voting:** Send a PPV mass message to all subs saying *"Going to yoga in an hour, unlock this to vote on which shorts I wear."* ($5 unlock).

---

## 🤖 The Automated Execution
To run this without you sitting at a keyboard 12 hours a day:
1. **The Content Agent** generates the Fanvue post backlog.
2. **Claude Chatbot Workflow:** When a VIP messages her, you paste their message into Claude alongside the prompt: *"You are Jasmine. Answering a $25/mo VIP patron named Mark. Respond flirtatiously to this."*
3. **ElevenLabs:** Use the "soft warm Indian/South Asian accent" voice clone to generate 5-second voice replies for tips over $10.
