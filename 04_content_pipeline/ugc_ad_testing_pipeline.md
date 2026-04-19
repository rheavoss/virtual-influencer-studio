# UGC Ad Testing Pipeline — Cance 2 API + Claude
**Source:** Master Frameworks Compilation — Framework 12
**Task:** P1-57
**Owner:** Antigravity / Claude
**Phase:** Phase 1 (after Fanvue funnel live, Month 2+)

---

## What Is It

Local Claude Code dashboard → upload Jasmine assets → auto-generate 8+ UGC ad variants → review → iterate.

**Key advantage:** 46% cheaper than using Cance 2 direct API via third-party platforms.

---

## Architecture

```
Claude Code local dashboard
        ↓
Upload: Jasmine image + product/concept brief
        ↓
Cance 2 API generates 8+ video variants
  Variant A: Hook style 1 + CTA style 1
  Variant B: Hook style 1 + CTA style 2
  Variant C: Hook style 2 + CTA style 1
  ... (8+ combinations)
        ↓
Review payload → approve/reject per variant
        ↓
Approved → auto-schedule via Metricool
        ↓
Track CTR, CPC, conversion per variant
        ↓
Scale winner, kill loser
```

---

## Ad Variants to Test

### Hook Types
1. **Curiosity:** "I found something that actually works for GFE..."
2. **Social proof:** "1,200 subscribers can't be wrong about this"
3. **Direct offer:** "Subscribe for ₹X and get..."
4. **Personal story:** "I've been lonely too, that's why I built this"
5. **Visual hook:** No text — Jasmine in striking pose, no caption for 3 seconds

### CTA Types
1. Soft: "Link in bio for more"
2. Direct: "Subscribe now — first month free"
3. Urgency: "Only 50 spots left this month"
4. Value: "₹X/month for daily exclusive content"

**Matrix:** 5 hooks × 4 CTAs = 20 possible variants. Start with 8 best combinations.

---

## Build Plan (P1-57)

1. **Claude Code dashboard** — simple Python/Node.js local web UI
2. **Cance 2 API integration** — POST endpoint with Jasmine reference + brief
3. **Variant generator** — loops through hook/CTA matrix
4. **Review UI** — video player + approve/reject buttons
5. **Output folder** — approved ads saved to `04_content_pipeline/approved_ads/`
6. **Metricool integration** — approved ads queued for scheduling

---

## Cost

| Item | Cost |
|---|---|
| Cance 2 API | ~$49–99/month |
| Ad spend | $5–20/day (start small) |
| Claude Code (already subscribed) | ₹0 |
| **Total** | **₹5,000–12,000/month** |

Start with minimum viable spend ($5/day = ₹465/day) to test before scaling.

---

## Prerequisites

- [ ] Fanvue funnel live and converting organically (prove it works first)
- [ ] Cance 2 API access confirmed
- [ ] 10+ Jasmine video clips available as source material
- [ ] Budget confirmed by CEO
