# Deploy Guide — Jasmine P&L Dashboard

## Stack
- **Next.js 14** (App Router) — frontend + server-side data fetching
- **Supabase** — PostgreSQL database (stores P&L projections; update actuals each month)
- **Vercel** — hosting, auto-deploys from GitHub on every push

---

## Step 1 — Supabase

1. Go to [supabase.com](https://supabase.com) → New project (name it `jasmine-dashboard`)
2. Once created, go to **SQL Editor → New query**
3. Paste the full contents of `supabase/schema.sql` and click **Run**
   - This creates the `jasmine_pnl` table and seeds all 12 months of projected data
4. Go to **Project Settings → API**
   - Copy **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 2 — GitHub

1. Create a new **private** repo (e.g. `jasmine-dashboard`) on GitHub
2. In your terminal, from the `20_tech/jasmine-dashboard/` directory:
   ```bash
   git init
   git add .
   git commit -m "feat: initial P&L dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/jasmine-dashboard.git
   git push -u origin main
   ```
   > Do NOT commit `.env.local` — it is in `.gitignore`

---

## Step 3 — Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo you just pushed
3. Framework preset: **Next.js** (auto-detected)
4. Before clicking Deploy, open **Environment Variables** and add:
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (from Supabase Step 1) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase Step 1) |
5. Click **Deploy** — your URL will be `https://jasmine-dashboard.vercel.app` (or similar)

---

## Step 4 — Local dev (optional)

```bash
cd 20_tech/jasmine-dashboard
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key in .env.local
npm install
npm run dev
# Open http://localhost:3000
```

---

## Updating actuals each month

When real numbers come in (month closes), update Supabase directly:

```sql
-- Example: update M1 with actual fanvue revenue
UPDATE jasmine_pnl
SET fanvue = 18500, updated_at = now()
WHERE month = 1;
```

The dashboard auto-revalidates from Supabase every hour (`revalidate = 3600` in `app/page.js`).
To force an immediate refresh, trigger a Vercel redeploy.

---

## Fallback behaviour

If Supabase credentials are missing or the table is empty, the dashboard silently falls back to the hardcoded projected data in `lib/fallback-data.js`. The site never goes blank.
