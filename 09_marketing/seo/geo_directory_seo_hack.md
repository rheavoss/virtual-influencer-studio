# Super-Collections + GeoDirectory SEO Hack — Sonia
**Source:** YouTube transcript analysis (April 15–16 sessions, Framework 8)
**Task:** P1-49
**Owner:** Claude / CEO
**Phase:** Phase 1 (execute after site live, parallel with P1-48)

---

## What Is It

Combine location + category data to auto-generate thousands of high-intent SEO landing pages using Webflow/Airtable/WhaleSync or WordPress + GeoDirectory plugin.

The "flywheel" effect: each new city/category combo = new page = new ranking opportunity.

---

## Two Implementation Paths

### Path A — Webflow + Airtable + WhaleSync (No-Code)
- Airtable = data source (cities × categories × keywords)
- Webflow = template CMS site
- WhaleSync = syncs Airtable rows → Webflow CMS items automatically
- **Result:** Add a row in Airtable → page auto-publishes to site
- **Cost:** Webflow CMS ~$23/mo, Airtable free, WhaleSync ~$49/mo
- **Skill required:** Low — mostly clicking, no coding

### Path B — WordPress + GeoDirectory Plugin (Self-Hosted)
- WordPress on cheap VPS ($5/mo)
- GeoDirectory plugin handles location + category taxonomy automatically
- Add cities + categories → plugin generates pages
- **Cost:** ~$10/mo total
- **Skill required:** Medium — some WordPress setup

**Recommended:** Path B (WordPress) for cost control. Path A if CEO prefers no-code.

---

## Content Structure Per Page

Each auto-generated page targets: `[Category] in [City]` or `[Keyword] + [Location]`

**Example pages:**
- "virtual girlfriend Mumbai"
- "GFE subscription India"
- "AI influencer Fanvue Hindi"
- "Indian/South Asian virtual girlfriend Delhi"
- "non-nude GFE creator India"

**Page structure:**
1. H1: `[Keyword] in [Location]` — exact match for ranking
2. Short intro paragraph (Claude-generated, unique per page)
3. Sonia profile card with CTA
4. FAQ section (3–5 questions, Claude-generated)
5. Internal links to related pages

---

## Keyword Matrix (Starting Point)

**Categories (vertical):**
GFE, virtual girlfriend, AI influencer, subscription content, non-nude creator, Hindi GFE, Indian/South Asian model

**Locations (horizontal):**
Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Kolkata, India (national), plus: UK, US, Canada, Australia

**Math:** 7 categories × 13 locations = 91 unique pages minimum
Add long-tail variants → 500+ pages easily

---

## SEO Flywheel Explained

```
Page goes live → Google indexes → ranks for long-tail → gets clicks
       ↓
Authority increases → shorter keywords start ranking
       ↓
More pages added → more authority → compound growth
       ↓
At 50k visitors/month → monetize via Fanvue CTA conversion
```

---

## Prerequisites

- [ ] Domain registered (P0-10)
- [ ] Basic site live
- [ ] Keyword research completed (feeds both P1-48 and P1-49)

---

## Timeline

| Week | Action |
|---|---|
| Week 1 | Build keyword matrix (Grok does research) |
| Week 2 | Set up WordPress + GeoDirectory OR Webflow + Airtable |
| Week 3 | Generate first 100 pages |
| Week 4 | Submit sitemap to Google Search Console |
| Month 3+ | First rankings appear |

---

## Notes

- This works best combined with P1-48 (programmatic SEO pages) — they are complementary, not competing
- GeoDirectory is specifically designed for this use case — it handles URL structure, sitemaps, schema markup automatically
- India-specific keyword data: Grok must pull live search volume data before finalising keyword matrix
