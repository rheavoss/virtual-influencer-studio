# Programmatic SEO Strategy — Jasmine Mako
**Source:** YouTube transcript analysis (April 15–16 sessions, Framework 7)
**Task:** P1-48
**Owner:** Claude / CEO
**Phase:** Phase 1 (execute after domain live + 50k monthly visitors)

---

## What Is It

Use Cursor + Claude Code + Firecrawl + Perplexity to automatically build hundreds of city/niche landing pages targeting long-tail search queries.

**Example pages:**
- "GFE in Mumbai"
- "AI girlfriend experience India"
- "virtual girlfriend Hindi"
- "East Asian virtual influencer Fanvue"

Each page targets a specific keyword combination. Thousands of pages = compounding organic traffic with zero paid spend.

---

## Tools Required

| Tool | Role | Cost |
|---|---|---|
| Claude Code | Generates page content at scale | ₹0 (already subscribed) |
| Cursor | IDE for coding the page generator | Free tier |
| Firecrawl | Scrapes competitor pages for content structure | Free tier available |
| Perplexity | Keyword research + SERP analysis | Free tier |
| Webflow or Next.js | Hosts the generated pages | Webflow ~₹1,500/mo or self-hosted |

---

## Process (Step by Step)

1. **Keyword research** — Use Perplexity to find 200–500 long-tail keywords in the GFE / virtual influencer niche
2. **Competitor scrape** — Use Firecrawl to extract page structure from top-ranking competitor sites
3. **Template creation** — Build one master landing page template (headline, description, CTA, Jasmine image)
4. **Generator script** — Claude Code writes a script that takes keyword list → outputs 500+ unique pages
5. **Deploy** — Push all pages to domain (jasminemako.com or similar)
6. **Link internally** — Cross-link pages to build SEO authority
7. **Track** — Google Search Console monitors which pages rank and convert

---

## Expected Results (Realistic Timeline)

| Month | Status |
|---|---|
| 0–3 | Pages indexed, zero traffic (Google sandbox period) |
| 3–6 | Long-tail pages begin ranking, 500–5,000 monthly visitors |
| 6–12 | SEO flywheel active, 10k–50k monthly visitors possible |
| 12+ | Compounding — each new page adds to authority |

**This is a long-term moat, not a short-term traffic play.**

---

## Prerequisites

- [ ] Domain registered (P0-10)
- [ ] Site live with at least basic pages
- [ ] Minimum 50 Jasmine images for page content
- [ ] LoRA outputs ready for page illustrations

---

## Integration With Jasmine Funnel

```
Google search "virtual GFE India"
        ↓
Landing page (jasminemako.com/gfe-india)
        ↓
CTA → Instagram follow + Fanvue subscribe
        ↓
Revenue
```

---

## Notes

- Do NOT start this before domain is live (P0-10)
- Grok must verify keyword opportunity before any dev work starts
- Pages must be unique enough to avoid Google duplicate content penalty — use dynamic content blocks, not copy-paste
