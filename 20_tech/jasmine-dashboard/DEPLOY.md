# Deploy Guide — Jasmine P&L Dashboard

## Status: LIVE ✅

**Production URL:** https://jasmine-dashboard-lovat.vercel.app  
**GitHub repo:** https://github.com/rheavoss/jasmine-dashboard (private)  
**Supabase project ref:** `vvyexzbtkncitgzraath` (rheavoss account)  
**Vercel account:** `rheavoss` / `contact.rheavoss@gmail.com` / team `rheavoss-projects`

---

## Stack
- **Next.js 14** (App Router) — frontend + server-side data fetching
- **Supabase** — PostgreSQL database (stores P&L projections; update actuals each month)
- **Vercel** — hosting, deployed via API (see below)

---

## CRITICAL: Account Discipline

Three GitHub accounts exist on this machine: `surajhealth` (default), `surajstoic`, `rheavoss`.  
**Always run this FIRST before any git or Vercel operation:**

```bash
gh auth switch --user rheavoss && gh api user --jq '.login'
# Must print: rheavoss
```

---

## CRITICAL: Deploy Method (vercel --prod FAILS)

`vercel --prod` and `vercel deploy` consistently return "Unexpected error" on this account.  
**Always deploy via Vercel API:**

```bash
# Step 1 — Push to GitHub
gh auth switch --user rheavoss
git push origin main

# Step 2 — Trigger deployment via API
VERCEL_TOKEN=$(python3 -c "import json; d=json.load(open('/Users/user/Library/Application Support/com.vercel.cli/auth.json')); print(d['token'])")

curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"jasmine-dashboard","gitSource":{"type":"github","repoId":"1207251857","ref":"main"},"target":"production"}' \
  > /tmp/deploy.json

# Step 3 — Get deploy ID and wait for READY state
python3 -c "import json; d=json.load(open('/tmp/deploy.json')); print('ID:', d['id'], '| URL:', d['url'])"

# Poll until ready (replace DEPLOY_ID)
DEPLOY_ID="<id from above>"
curl -s "https://api.vercel.com/v13/deployments/$DEPLOY_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['readyState'])"

# Step 4 — Point production alias to new deployment
curl -s -X POST "https://api.vercel.com/v2/deployments/$DEPLOY_ID/aliases" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"alias":"jasmine-dashboard-lovat.vercel.app"}'
```

---

## Updating actuals each month

When real numbers come in, update Supabase via the Management API:

```bash
SUPABASE_TOKEN="<token from Claude memory>"
curl -s -X POST "https://api.supabase.com/v1/projects/vvyexzbtkncitgzraath/database/query" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "UPDATE jasmine_pnl SET fanvue = 18500, updated_at = now() WHERE month = 1;"}'
```

The dashboard auto-revalidates from Supabase every hour (`revalidate = 3600` in `app/page.js`).

---

## Fallback behaviour

If Supabase is down or unconfigured, the dashboard uses `lib/fallback-data.js` (hardcoded projections at ₹93.08 rate). The site never goes blank.

---

## Local dev

```bash
cd 20_tech/jasmine-dashboard
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
# Open http://localhost:3000
```
