# Deploy Guide — Jasmine P&L Dashboard

## Status: LIVE ✅

**Production URL:** https://virtual-influencer-dashboard.vercel.app  
**GitHub repo:** https://github.com/rheavoss/jasmine-project (private) — single repo  
**Vercel rootDirectory:** `20_tech/jasmine-dashboard`  
**Supabase project ref:** `vvyexzbtkncitgzraath` (rheavoss account)  
**Vercel account:** `rheavoss` / `contact.rheavoss@gmail.com` / team `rheavoss-projects`

---

## Stack
- **Next.js 14** (App Router) — frontend + server-side data fetching
- **Supabase** — PostgreSQL database (stores P&L projections; update actuals each month)
- **Vercel** — hosting, deployed via API (see below)

---

## CRITICAL: Account Discipline

This project uses `rheavoss` exclusively.  
**Always run this FIRST before any git or Vercel operation:**

```bash
gh auth switch --user rheavoss && gh api user --jq '.login'
# Must print: rheavoss
```

---

## Deploy (from project root `/Users/user/Desktop/Instagram/`)

`vercel --prod` and `vercel deploy` consistently return "Unexpected error" on this account.  
**Always deploy via Vercel API. Run from the project root — no need to cd into the dashboard subfolder.**

```bash
# Step 1 — Switch account and push to GitHub (from project root)
gh auth switch --user rheavoss
git push origin main

# Step 2 — Trigger deployment via API
VERCEL_TOKEN=$(python3 -c "import json; d=json.load(open('/Users/user/Library/Application Support/com.vercel.cli/auth.json')); print(d['token'])")

DEPLOY_ID=$(curl -s -X POST "https://api.vercel.com/v13/deployments?teamId=team_wA18mcHEsEeyCqns1SIX7Ah3" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"virtual-influencer-dashboard","gitSource":{"type":"github","repoId":"1207241996","ref":"main"},"target":"production"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])")

echo "Deploy ID: $DEPLOY_ID"

# Step 3 — Poll until ready
for i in 1 2 3 4 5 6 7 8; do
  STATE=$(curl -s "https://api.vercel.com/v13/deployments/$DEPLOY_ID?teamId=team_wA18mcHEsEeyCqns1SIX7Ah3" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | python3 -c "import json,sys; print(json.load(sys.stdin)['readyState'])")
  echo "[$i] $STATE"
  [ "$STATE" = "READY" ] && break || sleep 15
done

# Step 4 — Point production alias to new deployment
curl -s -X POST "https://api.vercel.com/v2/deployments/$DEPLOY_ID/aliases?teamId=team_wA18mcHEsEeyCqns1SIX7Ah3" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"alias":"virtual-influencer-dashboard.vercel.app"}'
```

---

## Updating actuals each month

When real numbers come in, update Supabase via the Management API:

```bash
SUPABASE_TOKEN="<token from /Users/user/Desktop/jasmine_credentials.md>"
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
