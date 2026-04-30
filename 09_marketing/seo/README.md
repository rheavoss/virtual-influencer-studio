# 09_marketing/seo — Jasmine SEO Strategy Hub

**Phase:** Phase 1 (unlocked after domain live + first reels published)

---

## Documents in This Folder

| File | Task | Description |
|---|---|---|
| `programmatic_seo_strategy.md` | P1-48 | Cursor + Claude Code auto-build city/niche landing pages |
| `geo_directory_seo_hack.md` | P1-49 | Super-Collections + GeoDirectory — thousands of keyword pages |
| `cc-backlinks.sh` | P1-05 | Common Crawl competitor backlink analysis script |
| `competitor_backlinks_YYYY-MM-DD.md` | P1-05 | Grok's first competitor scan output (not yet run) |
| `backlink_playbook.md` | P1-05 | Backlink acquisition plan (Grok deliverable) |

---

## SEO Strategy Overview

Three-layer SEO approach for Jasmine:

```
Layer 1 — Backlinks (P1-05)
  Competitor backlink analysis → acquire same links → build domain authority

Layer 2 — Programmatic Pages (P1-48)
  Claude Code auto-generates 500+ city/niche landing pages
  e.g. "virtual GFE India", "AI girlfriend Mumbai"

Layer 3 — GeoDirectory Flywheel (P1-49)
  WordPress + GeoDirectory → thousands of location×category pages
  Compounds over time → traffic moat
```

---

## P1-05 — Common Crawl Backlinks Script

**Owner:** Grok
**Unlocked when:** First 5 reels published

**Usage:**
```bash
chmod +x cc-backlinks.sh
./cc-backlinks.sh jasminemako.com 200
```

Arguments: `<domain> <max_results>`

**First run targets (Indian/South Asian GFE / virtual influencer domains):**
- Top 5–10 competitor accounts with landing pages / Linktrees
- Any AI virtual influencer sites ranking in GFE niche

**Deliverables (Grok):**
1. `cc-backlinks.sh` script committed here
2. First competitor scan results → `competitor_backlinks_YYYY-MM-DD.md`
3. Backlink acquisition playbook → `backlink_playbook.md`

---

## Execution Order

1. Register domain (P0-10) — prerequisite for all SEO work
2. Run P1-05 competitor scan — understand the landscape
3. P1-48 — build programmatic page generator
4. P1-49 — set up GeoDirectory flywheel
5. Submit sitemap to Google Search Console
6. Monitor via Google Search Console monthly
