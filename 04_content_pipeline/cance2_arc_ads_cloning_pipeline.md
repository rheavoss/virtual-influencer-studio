# Cance 2 + Arc Ads — Ad-Cloning Pipeline
**Source:** Master Frameworks Compilation — Framework 2
**Task:** P1-53
**Owner:** Antigravity / Claude
**Phase:** Phase 1 (after first Jasmine videos live)

---

## What Is It

Drag a high-converting competitor ad → AI analyzes vibe/pacing/shots → auto-generates a cloned version starring Jasmine.

**Tool:** Claude Code + Arc Ads API + Cance 2 (accepts image, video, and audio inputs)

---

## Why It's the Highest-Leverage Tool

- Eliminates guesswork: you clone what's already proven to convert
- Takes 5 minutes vs 5 hours to produce a UGC ad
- Works for: product ads, teaser ads, Fanvue subscriber acquisition ads

---

## Process

### Step 1 — Find a Winning Ad
- Source: Facebook Ad Library, TikTok Creative Center, X Ads
- Filter: AI creator / GFE / virtual influencer category
- Criteria: Running for 30+ days = proven winner

### Step 2 — Feed to Cance 2
1. Go to [arcads.ai](https://arcads.ai) or Cance 2 endpoint
2. Upload the winning ad video
3. AI analyzes: pacing, shot types, music vibe, CTA placement, caption style

### Step 3 — Generate Jasmine Version
1. Select Jasmine as the "actor" (upload reference image)
2. Cance 2 generates a Jasmine version of the same ad
3. Download payload (video + caption + CTA)

### Step 4 — A/B Test
- Run original competitor structure vs your Jasmine version
- Track: CTR, cost per click, Fanvue conversion rate
- Scale the winner, kill the loser

---

## Automation (Claude Code Version)

Claude Code handles the full loop:
```
1. Monitor Facebook Ad Library for new winning ads in GFE niche
2. Auto-download top performers
3. Pass to Cance 2 API with Jasmine reference image
4. Receive generated video
5. Post to staging folder for CEO review
6. CEO approves → auto-schedule via Metricool
```

Reference task: P1-08 (build Antigravity `.md` skill for this)

---

## Cost

| Item | Cost |
|---|---|
| Arcads.ai / Cance 2 | ~$49–99/month (verify India pricing) |
| Ad spend to test | $5–20/day minimum |
| **Total** | **~₹5,000–10,000/month** |

**Note:** This is only worth activating when Fanvue LTV justifies ad spend. Start Month 2–3.

---

## Prerequisites

- [ ] Cance 2 / Arcads account created
- [ ] Jasmine video reference assets ready (5+ clips)
- [ ] Fanvue funnel live and converting organically first
- [ ] Budget allocated for ad testing

---

## Files

- Source code for automation script → `11_automation/scripts/arc_ads_cloner.py` (to be built in P1-53)
