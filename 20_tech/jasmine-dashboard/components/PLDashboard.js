'use client';
import { useMemo, useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend);

// ── CONSTANTS & DATA ───────────────────────────────────────────────────────────
// Fees based on PDF: Fanvue 15%, Passes/PPV/Telegram/Brand 10%, IG Subs 20%
const KEEP        = [0.85, 0.90, 0.90, 0.90, 0.90, 0.80, 0.70];
const MILESTONES  = { 2: '$2k MRR', 4: 'IG/FB Subs Live', 9: '$30k MRR' };
const REV_LABELS  = ['Fanvue', 'Passes', 'PPV+Voice', 'Telegram', 'Brand Deals', 'IG Subs', 'FB Subs'];
const COST_LABELS = ['Higgsfield', 'ElevenLabs', 'Grok', 'Claude ×2', 'Meta Ads', 'Research', 'Buffer'];

const GLOSSARY = [
  { t: 'Gross Revenue', d: 'Total money earned across all platforms before anyone takes their cut. (Fanvue + Passes + PPV/Voice + Telegram + Brand + IG Subs)' },
  { t: 'Platform Cuts', d: 'Commission fees taken by each platform. Fanvue 15%, Passes/PPV/Telegram/Brand 10%, Instagram Subs 20%.' },
  { t: 'Net Revenue', d: 'Money that actually lands in your account after all platform commissions. (Gross Revenue - Platform Cuts)' },
  { t: 'Total Costs (Expenses)', d: 'Everything you spend each month: AI tools (Higgsfield, ElevenLabs, Grok, Claude), paid ads, and research.' },
  { t: 'Net Profit', d: 'The money you actually keep — after platform fees AND all expenses. (Net Revenue - Total Costs)' },
  { t: 'Cumulative Profit', d: 'Running total of all net profits since Month 1. (Sum of all Net Profits up to this month)' },
  { t: 'MRR', d: 'Monthly Recurring Revenue — predictable subscription income that auto-renews. (Fanvue + IG subscriptions)' },
  { t: 'PPV / GFE', d: 'Pay-Per-View & Girlfriend Experience — high-ticket personal interaction, voice notes, and DMs driving premium yield.' },
];

const ROADMAP = [
  { m: 'Pre-Launch Phase 0 — Foundation', d: 'Generate 40 LoRA training images (Grok + Colab) • QC against character bible • Train Flux.1 LoRA on Civitai/RunPod • Verify face/body lock • OPSEC pipeline: ExifTool strip + film grain.' },
  { m: 'M1 Day 1 — Full Launch', d: 'Fanvue ₹1,200/mo GFE sub • Instagram SFW cycle (1 Post, 3 Stories/day) • Passes mirror • X/Twitter traffic funnel • 12 pre-batched content runway • Metricool setup • DM welcome scripts.' },
  { m: 'M2 Growth & Content Velocity', d: 'Increase post frequency based on engagement data • Launch first PPV campaign (voice note bundle) • Reddit SFW seeding • A/B test caption styles and posting times.' },
  { m: 'M3 $2k MRR Milestone (₹1.86L)', d: 'Meta Ads: Paid Instagram promotion (₹3,000/mo budget) • Launch retargeting to profile visitors • First collab shoutout with micro-influencer (barter).' },
  { m: 'M4 IG Subscriptions Unlock (10k Followers)', d: 'Hit 10k follower milestone • Launch ₹300/mo native IG subscriptions • Exclusive Stories + Close Friends • First "live" voice note AMA session for subscribers.' },
  { m: 'M5 GFE & Sales Automation', d: 'Expand to Telegram VIP for GFE teasers • Dedicated sales script for voice note bundles • Hiring automated content researcher (Perplexity scanning).' },
  { m: 'M6 Scaling & Maturity', d: 'Diversify to lifestyle vlogs • Jasmine POD merchandise store • Scale Meta Ads budget to ₹10,000/mo base.' },
  { m: 'M9+ Maturity & Market Dominance', d: 'Tier-1 Brand sponsorships (Fashion/Tech) • Launch white-label automated GFE SaaS tool • Exit strategy planning — potential $1M+ USD valuation.' },
];

const COMPETITORS = [
  { name: 'Lu do Magalu', followers: '6.8M', url: 'https://www.instagram.com/magazineluiza/' },
  { name: 'Lil Miquela', followers: '2.6M', url: 'https://www.instagram.com/lilmiquela/' },
  { name: 'Imma', followers: '390K', url: 'https://www.instagram.com/imma.gram/' },
  { name: 'Aitana Lopez', followers: '330K', url: 'https://www.instagram.com/fit_aitana/' },
  { name: 'Shudu', followers: '240K', url: 'https://www.instagram.com/shudu.gram/' }
];

const FOOTNOTES = [
  { id: 1, label: 'Aitana Lopez Revenue', text: 'Verified earnings of €10,000/month for Tier-1 virtual models.', url: 'https://www.euractiv.com/section/digital/news/first-spanish-ai-model-earns-up-to-e10000-per-month/' },
  { id: 2, label: 'Meta Ads CPM Gap', text: 'US/Tier-1 CPM ($15–$20) vs India ($1–$3) benchmarks.', url: 'https://adamigo.ai/meta-ads-cpm-benchmarks/' },
  { id: 3, label: 'Subscription ARPPU Logic', text: 'Top 1% creator yield: $15 sub + $25 monthly PPV/Tips average.', url: 'https://influencermarketinghub.com/onlyfans-statistics/' },
  { id: 4, label: 'Market Maturity Lag', text: 'Annual report on 2-year lag in digital influencer monetization between US and India.', url: 'https://www.ey.com/en_in/media-entertainment/the-state-of-influencer-marketing-in-india' }
];

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fi = v => '₹' + Math.round(v).toLocaleString('en-IN');
const fL = v => {
  if (v >= 10000000) return '₹' + (v / 10000000).toFixed(2) + 'Cr';
  if (v >= 100000)   return '₹' + (v / 100000).toFixed(2) + 'L';
  return '₹' + (v / 1000).toFixed(1) + 'K';
};

function deriveRows(data) {
  return data.map(row => {
    const rArr  = [row.fanvue, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs, row.fb_subs || 0];
    const cArr  = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.meta_ads, row.research, row.buffer, row.calilio, row.namecheap, row.later_com];
    const gross = rArr.reduce((a, b) => a + b, 0);
    const net   = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    const cuts  = gross - net;
    const costs = cArr.reduce((a, b) => a + b, 0);
    return { ...row, rArr, cArr, gross, net, cuts, costs, profit: net - costs };
  });
}

// ── COMPACT THEME ──────────────────────────────────────────────────────────────
const C = {
  pageBg:    '#f6f8fa',
  cardBg:    '#ffffff',
  cardBdr:   '#d0d7de',
  textPri:   '#1f2328',
  textSec:   '#57606a',
  textMut:   '#8c959f',
  grid:      '#d8dee4',
  blue:      '#0969da',
  green:     '#1a7f37',
  orange:    '#bc4c00',
  red:       '#cf222e',
  accent:    '#8250df',
  noteBg:    '#f0f6ff',
  noteBdr:   '#cae3fb',
  greenBg:   '#dafbe1',
  greenBdr:  '#2da44e',
};

const S = {
  page:      { background: C.pageBg, color: C.textPri, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif", padding: '24px 20px 80px' },
  header:    { textAlign: 'center', marginBottom: 24 },
  h1:        { fontSize: 24, fontWeight: 700, color: C.blue, marginBottom: 4 },
  sub:       { color: C.textSec, fontSize: 12 },
  stats:     { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 },
  statBox:   { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 8, padding: '12px 14px' },
  statLbl:   { fontSize: 10, color: C.textMut, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 },
  card:      { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 8, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 11, fontWeight: 700, color: C.textSec, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 },
  fn:        { verticalAlign: 'super', fontSize: 9, fontWeight: 700, color: C.blue, marginLeft: 2, cursor: 'help' },
  link:      { color: C.blue, textDecoration: 'none', cursor: 'pointer' },
  grid2:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16 },
};

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function PLDashboard({ data }) {
  const rows       = useMemo(() => deriveRows(data), [data]);
  const months     = rows.map(r => r.label);
  const grossRev   = rows.map(r => r.gross);
  const netRev     = rows.map(r => r.net);
  const totalCosts = rows.map(r => r.costs);
  const netProfit  = rows.map(r => r.profit);
  const cumulative = netProfit.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);

  const T = {
    gross:  grossRev.reduce((a, b) => a + b, 0),
    net:    netRev.reduce((a, b) => a + b, 0),
    costs:  totalCosts.reduce((a, b) => a + b, 0),
    profit: netProfit.reduce((a, b) => a + b, 0),
  };

  const mainChartData = {
    labels: months,
    datasets: [
      { label: 'Gross Revenue', data: grossRev,   borderColor: C.blue,   backgroundColor: 'rgba(9,105,218,0.05)',  borderWidth: 2, pointRadius: 4, fill: false, tension: 0.3 },
      { label: 'Net Profit',    data: netProfit,  borderColor: C.green,  backgroundColor: 'rgba(26,127,55,0.1)',   borderWidth: 2, pointRadius: 4, fill: true, tension: 0.3 },
    ],
  };

  return (
    <div style={S.page}>
      {/* HEADER */}
      <div style={S.header}>
        <h1 style={S.h1}>Virtual Influencer Infrastructure — 12-Month P&L</h1>
        <div style={S.sub}>
           ₹93.08 = $1 USD &nbsp;·&nbsp; <strong>Modeled for EXACTLY 1 Influencer</strong> &nbsp;·&nbsp; Institutional Investment Deck
        </div>
        <div style={{ ...S.sub, marginTop: 4, fontSize: 11, color: C.accent }}>
           IG Subscriptions (₹300/mo) unlock at M4 (10k follower milestone)
        </div>
      </div>

      {/* 12M SUMMARY */}
      <div style={S.stats}>
        {[
          { l: '12M Gross Revenue', v: T.gross },
          { l: '12M Net Revenue',   v: T.net },
          { l: '12M Total Expenses', v: T.costs },
          { l: '12M Net Profit',    v: T.profit, green: true },
        ].map(c => (
          <div key={c.l} style={{ ...S.statBox, background: c.green ? C.greenBg : C.cardBg, borderColor: c.green ? C.greenBdr : C.cardBdr }}>
            <div style={S.statLbl}>{c.l}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: c.green ? C.green : C.textPri }}>{fL(c.v)}</div>
            <div style={{ fontSize: 10, color: C.textSec }}>{fi(c.v)}</div>
          </div>
        ))}
      </div>

      {/* REVENUE GROWTH CHARTS */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>Monthly Revenue & Profit Growth</div>
          <div style={{ height: 220 }}>
            <Line data={mainChartData} options={{ 
              responsive: true, maintainAspectRatio: false, 
              plugins: { legend: { display: false } },
              scales: { 
                x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                y: { ticks: { font: { size: 10 }, callback: v => fL(v) } }
              }
            }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 10, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, background: C.blue }} /> Gross Revenue</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, background: C.green }} /> Net Profit</div>
          </div>
        </div>

        <div style={S.card}>
          <div style={S.cardTitle}>Cumulative Profit Projection</div>
          <div style={{ height: 220 }}>
            <Bar 
              data={{
                labels: months,
                datasets: [{ label: 'Cumulative Profit', data: cumulative, backgroundColor: cumulative.map(v => v < 0 ? C.red + '44' : C.green + '88'), borderColor: cumulative.map(v => v < 0 ? C.red : C.green), borderWidth: 1 }]
              }} 
              options={{ 
                responsive: true, maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: { 
                  x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                  y: { ticks: { font: { size: 10 }, callback: v => fL(v) } }
                }
              }} 
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: C.textSec }}>
            Reach Break-Even at Month 4 &nbsp;·&nbsp; Target ₹1.18Cr+ Annual Profit
          </div>
        </div>
      </div>

      {/* STRATEGIC ADVANTAGE: THE SEVEN MOATS */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🛡️ The Seven Moats (Institutional Defensibility)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { t: 'Identity Sovereignty', d: 'Immortality: no aging, no fatigue, no retirement.' },
              { t: 'Structural Consistency', d: 'Proprietary Flux identity-lock workflows.' },
              { t: 'Capital Efficiency', d: '90% lower marginal OpEx than human agencies.' },
              { t: 'Yield Arbitrage', d: 'US/UK targeting from low-cost compute base.' },
              { t: 'Market Lag Advantage', d: 'Capturing the 2-year maturity gap in India.' },
              { t: 'Automated Scale', d: '24/7 omnipresence across 7 revenue streams.' },
              { t: 'IP Consolidation', d: '100% talent equity retained by the infrastructure.' }
            ].map(m => (
              <div key={m.t} style={{ borderBottom: `1px solid #f0f0f0`, paddingBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{m.t}</div>
                <div style={{ fontSize: 10, color: C.textSec }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MARKET GAP & YIELD */}
        <div style={S.card}>
          <div style={S.cardTitle}>📍 Geography Yield Gap — ARPU Analysis</div>
          <div style={{ background: C.noteBg, border: `1px solid ${C.noteBdr}`, borderRadius: 6, padding: 10, marginBottom: 12 }}>
             <p style={{ margin: 0, fontSize: 11, color: C.textSec }}>
               Tier-1 (US/UK) yield is driven by aggressive PPV spending power, whereas India remains subscription-heavy.<span style={S.fn}>[4]</span>
             </p>
          </div>
          <table style={{ width: '100%', fontSize: 11 }}>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}><td style={{ padding: '6px 0' }}>Annual Yield / Sub (US/UK)</td><td style={{ textAlign: 'right', fontWeight: 700, color: C.green }}>$400 – $600 <span style={S.fn}>[3]</span></td></tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}><td style={{ padding: '6px 0' }}>Annual Yield / Sub (India)</td><td style={{ textAlign: 'right', color: C.red }}>$45 – $60</td></tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}><td style={{ padding: '6px 0' }}>Meta Ads CPM (US Avg)</td><td style={{ textAlign: 'right', color: C.blue }}>$18.50 <span style={S.fn}>[2]</span></td></tr>
              <tr><td style={{ padding: '6px 0' }}>Spending Power Ratio</td><td style={{ textAlign: 'right', fontWeight: 700, color: C.blue }}>10x Advantage</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPACT ECOSYSTEM & COMPETITORS */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🚀 Multichannel Ecosystem</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 9, color: C.textMut, fontWeight: 700, marginBottom: 6 }}>MONETIZATION</div>
              <ul style={{ margin: 0, paddingLeft: 14, fontSize: 11, color: C.textSec, lineHeight: 1.8 }}>
                <li><a href="https://www.fanvue.com" target="_blank" style={S.link}>Fanvue (15% Fee)</a></li>
                <li><a href="https://www.passes.com" target="_blank" style={S.link}>Passes (10% Fee)</a></li>
                <li><a href="https://www.facebook.com/creators" target="_blank" style={S.link}>FB Subs (30% Fee)</a></li>
                <li><a href="https://www.telegram.org" target="_blank" style={S.link}>Telegram VIP</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 9, color: C.textMut, fontWeight: 700, marginBottom: 6 }}>TRAFFIC CHANNELS</div>
              <ul style={{ margin: 0, paddingLeft: 14, fontSize: 11, color: C.textSec, lineHeight: 1.8 }}>
                <li><a href="https://www.instagram.com" target="_blank" style={S.link}>IG Reels/Stories</a></li>
                <li><a href="https://www.x.com" target="_blank" style={S.link}>X (Twitter) Threads</a></li>
                <li><a href="https://www.reddit.com" target="_blank" style={S.link}>Reddit Communities</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>🔥 Global Competitor Benchmarks</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COMPETITORS.map(c => (
              <a key={c.name} href={c.url} target="_blank" style={{ ...S.link, background: '#f6f8fa', border: `1px solid ${C.cardBdr}`, borderRadius: 6, padding: '6px 10px', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700 }}>{c.name}</span>
                <span style={{ color: C.textMut }}>{c.followers}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 10, color: C.textSec, borderTop: `1px solid ${C.grid}`, paddingTop: 8 }}>
             <strong>Market Lead:</strong> Aitana Lopez earns ~$11k/mo ($132k/yr) at 330k followers.<span style={S.fn}>[1]</span>
          </div>
        </div>
      </div>

      {/* ROADMAP & GLOSSARY */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🗓️ Detailed Execution Roadmap (M1 - M9+)</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {ROADMAP.map(r => (
              <div key={r.m}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{r.m}</div>
                <div style={{ fontSize: 10, color: C.textSec, lineHeight: 1.5 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>📖 Key Terms Glossary</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {GLOSSARY.map(g => (
              <div key={g.t}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{g.t}</div>
                <div style={{ fontSize: 10, color: C.textSec, lineHeight: 1.5 }}>{g.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MONTHLY REVENUE TABLE — FULL AUDIT DETAIL */}
      <div style={S.card}>
        <div style={S.cardTitle}>Month-by-Month Financial Audit Breakdown</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, minWidth: 1200 }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: `2px solid ${C.grid}` }}>
                <th style={{ padding: '10px 4px', textAlign: 'left' }}>MONTH</th>
                {/* REVENUE COLUMNS */}
                {REV_LABELS.map(l => <th key={l} style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 400, color: C.textMut }}>{l.toUpperCase()}</th>)}
                <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 800 }}>GROSS REV</th>
                <th style={{ padding: '10px 6px', textAlign: 'right', color: C.orange }}>PLAT. CUTS</th>
                <th style={{ padding: '10px 6px', textAlign: 'right' }}>NET REV</th>
                {/* EXPENSE COLUMNS */}
                {COST_LABELS.slice(0, 6).map(l => <th key={l} style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 400, color: C.textMut }}>{l.toUpperCase()}</th>)}
                <th style={{ padding: '10px 6px', textAlign: 'right', color: C.red }}>TOTAL EXP</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: C.green }}>NET PROFIT</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: C.blue }}>CUMULATIVE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.month} style={{ borderBottom: `1px solid ${C.grid}`, background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                  <td style={{ padding: '8px 4px', fontWeight: 700 }}>{r.label}</td>
                  {/* REVENUE CELLS */}
                  {r.rArr.map((v, idx) => <td key={idx} style={{ padding: '8px 4px', textAlign: 'right', color: C.textSec }}>{v > 0 ? fi(v) : '—'}</td>)}
                  <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 700 }}>{fi(r.gross)}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'right', color: C.orange }}>{fi(r.cuts)}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'right' }}>{fi(r.net)}</td>
                  {/* EXPENSE CELLS */}
                  {r.cArr.slice(0, 6).map((v, idx) => <td key={idx} style={{ padding: '8px 4px', textAlign: 'right', color: C.textSec }}>{v > 0 ? fi(v) : '—'}</td>)}
                  <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 700, color: C.red }}>{fi(r.costs)}</td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 800, color: C.green }}>{fi(r.profit)}</td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 800, color: C.blue }}>{fi(cumulative[i])}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
               <tr style={{ background: '#f6f8fa', fontWeight: 800 }}>
                 <td style={{ padding: '12px 4px' }}>TOTAL</td>
                 {REV_LABELS.map((l, idx) => <td key={idx} style={{ padding: '12px 4px', textAlign: 'right' }}>{fi(rows.reduce((s, r) => s + r.rArr[idx], 0))}</td>)}
                 <td style={{ padding: '12px 6px', textAlign: 'right' }}>{fi(T.gross)}</td>
                 <td style={{ padding: '12px 6px', textAlign: 'right', color: C.orange }}>{fi(T.gross - T.net)}</td>
                 <td style={{ padding: '12px 6px', textAlign: 'right' }}>{fi(T.net)}</td>
                 {COST_LABELS.slice(0, 6).map((l, idx) => <td key={idx} style={{ padding: '12px 4px', textAlign: 'right' }}>{fi(rows.reduce((s, r) => s + r.cArr[idx], 0))}</td>)}
                 <td style={{ padding: '12px 6px', textAlign: 'right', color: C.red }}>{fi(T.costs)}</td>
                 <td style={{ padding: '12px 8px', textAlign: 'right', color: C.green }}>{fi(T.profit)}</td>
                 <td style={{ padding: '12px 8px', textAlign: 'right', color: C.blue }}>{fi(T.profit)}</td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* TECHNICAL APPENDIX */}
      <div id="appendix" style={{ ...S.card, background: '#fcfcfc', border: `1px dashed ${C.cardBdr}`, marginTop: 40 }}>
        <div style={S.cardTitle}>📝 Technical Appendix & Verification Sources</div>
        <div style={{ display: 'grid', gap: 14 }}>
          {FOOTNOTES.map(f => (
            <div key={f.id} style={{ display: 'flex', gap: 12, fontSize: 11 }}>
              <div style={{ fontWeight: 800, color: C.blue, minWidth: 20 }}>[{f.id}]</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{f.label}</div>
                <div style={{ color: C.textSec, lineHeight: 1.5 }}>
                  {f.text} &nbsp;
                  <a href={f.url} target="_blank" style={{ color: C.blue, textDecoration: 'underline' }}>Source Document</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, color: C.textMut, fontSize: 10 }}>
        Institutional Pitch Deck v1.2 — Confidential & Proprietary Information
      </div>
    </div>
  );
}
