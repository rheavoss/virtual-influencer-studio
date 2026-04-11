'use client';
import { useMemo, useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const KEEP        = [0.85, 0.90, 0.90, 0.90, 0.90, 0.80];
const MILESTONES  = { 2: '$2k MRR', 4: 'IG Subs Live', 9: '$20k MRR' };
const REV_LABELS  = ['Fanvue', 'Passes', 'PPV+Voice', 'Telegram', 'Brand Deals', 'IG Subs'];
const COST_LABELS = ['Higgsfield', 'ElevenLabs', 'Grok', 'Claude ×2', 'Meta Ads', 'Research', 'Buffer'];

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fi = v => '₹' + Math.round(v).toLocaleString('en-IN');
const fL = v => {
  if (v >= 10000000) return '₹' + (v / 10000000).toFixed(2) + 'Cr';
  if (v >= 100000)   return '₹' + (v / 100000).toFixed(2) + 'L';
  return '₹' + (v / 1000).toFixed(1) + 'K';
};

function deriveRows(data) {
  return data.map(row => {
    const rArr  = [row.fanvue, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs];
    const cArr  = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.meta_ads, row.research, row.buffer, row.calilio, row.namecheap, row.later_com];
    const gross = rArr.reduce((a, b) => a + b, 0);
    const net   = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    const cuts  = gross - net;
    const costs = cArr.reduce((a, b) => a + b, 0);
    return { ...row, rArr, cArr, gross, net, cuts, costs, profit: net - costs };
  });
}

// ── LIGHT THEME ────────────────────────────────────────────────────────────────
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
  greenBg:   '#dafbe1',
  greenBdr:  '#2da44e',
  noteBg:    '#f0f6ff',
  noteBdr:   '#cae3fb',
};

const milestonePlugin = {
  id: 'ml',
  afterDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    Object.entries(MILESTONES).forEach(([idx, label]) => {
      const px = x.getPixelForIndex(+idx);
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(px, y.top + 18); ctx.lineTo(px, y.bottom);
      ctx.strokeStyle = 'rgba(188,76,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.orange; ctx.globalAlpha = 0.9;
      ctx.font = 'bold 10px Segoe UI, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(label, px, y.top + 13);
      ctx.restore();
    });
  },
};

const S = {
  page:      { background: C.pageBg, color: C.textPri, fontFamily: "'Segoe UI',system-ui,sans-serif", minHeight: '100vh', padding: '28px 20px 60px' },
  h1:        { textAlign: 'center', fontSize: 22, fontWeight: 700, color: C.blue, marginBottom: 4 },
  sub:       { textAlign: 'center', color: C.textSec, fontSize: 12, marginBottom: 28 },
  stats:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10, marginBottom: 8 },
  statBase:  { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 10, padding: '14px 16px' },
  statGreen: { background: C.greenBg, border: `1px solid ${C.greenBdr}`, borderRadius: 10, padding: '14px 16px' },
  statLbl:   { fontSize: 11, color: C.textMut, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 },
  card:      { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: 12, color: C.textSec, marginBottom: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' },
  note:      { background: C.noteBg, border: `1px solid ${C.noteBdr}`, borderRadius: 8, padding: '10px 14px', fontSize: 11, color: C.textSec, marginBottom: 14, lineHeight: 1.7 },
  legend:    { display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 },
  legItem:   { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.textSec },
  dot:       { width: 9, height: 9, borderRadius: '50%', flexShrink: 0 },
  dsh:       { width: 18, height: 2, flexShrink: 0, background: `repeating-linear-gradient(90deg,${C.red} 0 4px,transparent 4px 8px)` },
};

// ── GLOSSARY ───────────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: 'Gross Revenue',          color: C.blue,   plain: 'Total money earned across all platforms before anyone takes their cut.',                                   formula: 'Fanvue + Passes + PPV/Voice + Telegram + Brand + IG Subs' },
  { term: 'Platform Cuts',          color: C.orange, plain: 'Commission fees taken by each platform. Fanvue 15%, Passes/PPV/Telegram/Brand 10%, Instagram Subs 20%.', formula: 'Gross Revenue × platform fee %' },
  { term: 'Net Revenue',            color: C.green,  plain: 'Money that actually lands in your account after all platform commissions.',                                formula: 'Gross Revenue − Platform Cuts' },
  { term: 'Total Costs (Expenses)', color: C.red,    plain: 'Everything you spend each month: AI tools, paid ads, and research.',                                      formula: 'Higgsfield + ElevenLabs + Grok + Claude + Meta Ads + Research + Buffer' },
  { term: 'Net Profit',             color: C.blue,   plain: 'The money you actually keep — after platform fees AND all expenses.',                                      formula: 'Net Revenue − Total Costs' },
  { term: 'Cumulative Profit',      color: C.green,  plain: 'Running total of all net profits since Month 1.',                                                          formula: 'Sum of all Net Profits up to this month' },
  { term: 'MRR',                    color: C.textSec, plain: 'Monthly Recurring Revenue — predictable subscription income that auto-renews each month.',                formula: 'Fanvue subscriptions + IG subscriptions' },
  { term: 'PPV',                    color: C.textSec, plain: 'Pay-Per-View — fans pay once for a specific piece of content, not a monthly sub.',                       formula: 'Included in PPV+Voice column' },
  { term: 'GFE',                    color: C.textSec, plain: 'Girlfriend Experience — premium personal interaction: voice notes, DMs, personalised content.',           formula: 'Drives higher Fanvue + PPV revenue' },
];

// ── TIMELINE DATA ──────────────────────────────────────────────────────────────
const TIMELINE = [
  { month: 'Pre-Launch', label: 'Phase 0 — Foundation', color: C.textSec, platforms: [],
    tasks: ['Generate 40 LoRA training images (Grok + Colab)', 'QC images against Jasmine character bible', 'Train Jasmine Flux.1 LoRA on Civitai / RunPod', 'QC LoRA — 5 test images, verify face + body lock', 'OPSEC pipeline: ExifTool EXIF strip + film grain overlay'] },
  { month: 'M1', label: 'Day 1 — Full Launch', color: C.green,
    platforms: [
      { name: 'Instagram',  detail: 'SFW — 1 post/day, 3 Stories/day, Reels 3×/week',              color: '#e1306c' },
      { name: 'Fanvue',     detail: 'GFE subscription — ₹1,200/mo (free trial first week)',         color: '#e05a2b' },
      { name: 'Passes',     detail: 'Mirror of Fanvue — PPV unlocks, voice notes',                  color: '#7c3aed' },
      { name: 'X/Twitter',  detail: 'SFW-edge teasers — drive traffic to Fanvue',                   color: '#1d9bf0' },
    ],
    tasks: ['Post 12 pre-batched pieces of content (2-week runway)', 'Set up Metricool scheduler', 'DM welcome script live on Fanvue', 'Linktree / link-in-bio → Fanvue + Passes'] },
  { month: 'M2', label: 'Growth & Content Velocity', color: C.blue, platforms: [],
    tasks: ['Increase post frequency based on engagement data', 'Launch first PPV campaign — voice note bundle', 'Start Reddit seeding (SFW subs)', 'A/B test caption styles and posting times'] },
  { month: 'M3', label: '$2k MRR Milestone — Meta Ads Begin', color: C.orange,
    platforms: [{ name: 'Meta Ads', detail: 'Paid Instagram promotion — ₹3,000/mo budget', color: '#1877f2' }],
    tasks: ['$2k MRR ($2,000 USD = ₹1,86,160) target', 'Launch Meta Ads retargeting to profile visitors', 'First collab shoutout with micro-influencer (barter)'] },
  { month: 'M4', label: 'Instagram Subscriptions Unlock (10k followers)', color: C.green,
    platforms: [{ name: 'Instagram Subscriptions', detail: '₹200/mo native IG sub — exclusive Stories + Close Friends', color: '#e1306c' }],
    tasks: ['10,000 Instagram followers → subscriptions unlock', 'Set IG subscription at ₹200/mo', 'Promote IG subs to existing Fanvue audience'] },
  { month: 'M5', label: '$5k MRR — Telegram VIP Prep', color: C.blue, platforms: [],
    tasks: ['$5k MRR ($5,000 USD = ₹4,65,400) target', 'Build Telegram VIP waitlist', 'Increase Meta Ads to ₹6,000/mo', 'Launch brand deal outreach — DM 20 relevant brands'] },
  { month: 'M6', label: 'Telegram VIP Goes Live', color: C.green,
    platforms: [{ name: 'Telegram VIP', detail: 'Private paid channel — direct personal content, highest tier', color: '#2ca5e0' }],
    tasks: ['Telegram VIP launch — ₹500–₹800/mo pricing', 'Exclusive content: unfiltered voice notes, behind-scenes', 'Cross-promote VIP to Fanvue + Passes subscribers'] },
  { month: 'M7', label: 'Brand Deals — First Paid Partnership', color: C.orange,
    platforms: [{ name: 'Brand Deals', detail: 'First paid sponsorship — wellness, fitness, or beauty brands', color: '#e05a2b' }],
    tasks: ['Close first brand deal — minimum ₹21,000/placement', 'Create sponsored content brief + rate card'] },
  { month: 'M10', label: '$20k MRR Milestone', color: C.green, platforms: [],
    tasks: ['$20k MRR ($20,000 USD = ₹18,61,600) target', 'All 6 revenue streams active and optimised', 'Evaluate hiring VA for DM management'] },
  { month: 'M12', label: '₹1 Crore Cumulative — Year 1 Complete', color: C.green, platforms: [],
    tasks: ['Cumulative net profit target: ~₹1.07 Crore', 'Full P&L review — plan Year 2', 'Evaluate Pinterest + YouTube as additional funnels'] },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function PLDashboard({ data }) {
  const rows       = useMemo(() => deriveRows(data), [data]);
  const months     = rows.map(r => r.label);
  const grossRev   = rows.map(r => r.gross);
  const netRev     = rows.map(r => r.net);
  const totalCosts = rows.map(r => r.costs);
  const netProfit  = rows.map(r => r.profit);
  const platCuts   = rows.map(r => r.cuts);
  const cumulative = netProfit.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);

  const T = {
    gross:  grossRev.reduce((a, b) => a + b, 0),
    net:    netRev.reduce((a, b) => a + b, 0),
    costs:  totalCosts.reduce((a, b) => a + b, 0),
    profit: netProfit.reduce((a, b) => a + b, 0),
  };

  const [ttip, setTtip] = useState(null);

  const externalTooltip = useCallback(({ chart, tooltip }) => {
    if (tooltip.opacity === 0) { setTtip(null); return; }
    const dp = tooltip.dataPoints;
    if (!dp || dp.length === 0) { setTtip(null); return; }
    const rect = chart.canvas.getBoundingClientRect();
    setTtip({ i: dp[0].dataIndex, x: rect.left + window.scrollX + tooltip.caretX, y: rect.top + window.scrollY + tooltip.caretY });
  }, []);

  const scaleStyle = {
    x: { ticks: { color: C.textSec, font: { size: 12 } }, grid: { color: C.grid }, border: { color: C.cardBdr } },
    y: { ticks: { color: C.textSec, font: { size: 11 }, callback: v => fL(v), maxTicksLimit: 7 }, grid: { color: C.grid }, border: { color: C.cardBdr } },
  };

  const mainChartData = {
    labels: months,
    datasets: [
      { label: 'Gross Revenue', data: grossRev,   borderColor: C.blue,   backgroundColor: 'rgba(9,105,218,.07)',  borderWidth: 2, pointBackgroundColor: C.blue,   pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 9,  fill: false, tension: 0.35 },
      { label: 'Net Revenue',   data: netRev,     borderColor: C.orange, backgroundColor: 'rgba(188,76,0,.07)',   borderWidth: 2, pointBackgroundColor: C.orange, pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 8,  fill: false, tension: 0.35 },
      { label: 'Net Profit',    data: netProfit,  borderColor: C.green,  backgroundColor: 'rgba(26,127,55,.10)',  borderWidth: 3, pointBackgroundColor: C.green,  pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 9,  fill: true,  tension: 0.35 },
      { label: 'Total Costs',   data: totalCosts, borderColor: C.red,    backgroundColor: 'rgba(207,34,46,.06)',  borderWidth: 1.5, borderDash: [5, 5], pointBackgroundColor: C.red, pointBorderColor: '#fff', pointRadius: 3, pointHoverRadius: 6, fill: true, tension: 0.1 },
    ],
  };

  const mainChartOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: { legend: { display: false }, tooltip: { enabled: false, external: externalTooltip } },
    scales: scaleStyle,
  };

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Jasmine — 12-Month P&amp;L Dashboard</h1>
      <div style={S.sub}>All values in INR &nbsp;·&nbsp; ₹93.08 = $1 USD &nbsp;·&nbsp; IG subscription ₹200/mo launches at M4 (10k followers)</div>

      {/* SUMMARY CARDS */}
      <SectionLabel text="12-Month Summary" />
      <div style={S.stats}>
        {[
          { label: '12M Gross Revenue', val: T.gross,  color: C.blue,   sub: 'Total earned before platform fees' },
          { label: '12M Net Revenue',   val: T.net,    color: C.green,  sub: 'After all platform commissions' },
          { label: '12M Total Costs',   val: T.costs,  color: C.red,    sub: 'Tools + Ads + Research' },
          { label: '12M Net Profit',    val: T.profit, color: C.green,  sub: 'Money in your pocket', green: true },
        ].map(c => (
          <div key={c.label} style={c.green ? S.statGreen : S.statBase}>
            <div style={S.statLbl}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{fL(c.val)}</div>
            <div style={{ fontSize: 11, color: C.textSec, marginTop: 4 }}>{fi(c.val)}</div>
            <div style={{ fontSize: 10, color: C.textMut, marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <SectionLabel text="Charts — Hover any point to see full monthly breakdown" />
      <div style={S.note}>
        Dashed vertical lines = milestones &nbsp;·&nbsp;
        <span style={{ color: C.blue }}>Blue</span> = Gross Revenue &nbsp;·&nbsp;
        <span style={{ color: C.orange }}>Orange</span> = Net Revenue &nbsp;·&nbsp;
        <span style={{ color: C.green }}>Green</span> = Net Profit &nbsp;·&nbsp;
        <span style={{ color: C.red }}>Red dashed</span> = Total Costs
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>Monthly Revenue &amp; Profit</div>
        <div style={{ height: 340, position: 'relative' }}>
          <Line id="main-chart" data={mainChartData} options={mainChartOpts} plugins={[milestonePlugin]} />
        </div>
        <div style={S.legend}>
          <div style={S.legItem}><div style={{ ...S.dot, background: C.blue }} />Gross Revenue</div>
          <div style={S.legItem}><div style={{ ...S.dot, background: C.orange }} />Net Revenue (after platform cuts)</div>
          <div style={S.legItem}><div style={{ ...S.dot, background: C.green }} />Net Profit (after all costs)</div>
          <div style={S.legItem}><div style={S.dsh} />Total Costs</div>
        </div>
      </div>

      {/* CUMULATIVE BARS */}
      <CumulativeBars months={months} cumulative={cumulative} netProfit={netProfit} />

      {/* CUSTOM TOOLTIP */}
      {ttip && <ChartTooltip ttip={ttip} i={ttip.i} grossRev={grossRev} platCuts={platCuts} netRev={netRev} totalCosts={totalCosts} netProfit={netProfit} cumulative={cumulative} months={months} />}

      {/* GLOSSARY */}
      <SectionLabel text="Key Terms — Plain English Definitions" />
      <div style={{ borderRadius: 10, border: `1px solid ${C.cardBdr}`, overflow: 'hidden', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f0f3f6' }}>
              {['Term', 'What it means (plain language)', 'How it is calculated'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C.textSec, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `1px solid ${C.cardBdr}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GLOSSARY.map((g, i) => (
              <tr key={g.term} style={{ background: i % 2 === 0 ? '#fff' : '#f6f8fa' }}>
                <td style={{ padding: '10px 14px', color: g.color, fontWeight: 700, borderBottom: `1px solid ${C.grid}`, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{g.term}</td>
                <td style={{ padding: '10px 14px', color: C.textPri, borderBottom: `1px solid ${C.grid}`, lineHeight: 1.6, verticalAlign: 'top' }}>{g.plain}</td>
                <td style={{ padding: '10px 14px', color: C.textSec, borderBottom: `1px solid ${C.grid}`, lineHeight: 1.6, verticalAlign: 'top', fontFamily: 'monospace', fontSize: 11 }}>{g.formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LAUNCH TIMELINE */}
      <SectionLabel text="Platform Launch Timeline — When to Go Live Where" />
      <LaunchTimeline />

      {/* BREAKDOWN TABLE */}
      <SectionLabel text="Month-by-Month Full Breakdown — Every Rupee" />
      <div style={S.note}>
        Platform commissions: Fanvue 15% · Passes / PPV / Telegram / Brand 10% · Instagram Subs 20% &nbsp;·&nbsp;
        Milestone months marked with ★
      </div>
      <PLTable rows={rows} grossRev={grossRev} netRev={netRev} platCuts={platCuts} totalCosts={totalCosts} netProfit={netProfit} cumulative={cumulative} T={T} />
    </div>
  );
}

// ── CHART TOOLTIP ──────────────────────────────────────────────────────────────
function ChartTooltip({ ttip, i, grossRev, platCuts, netRev, totalCosts, netProfit, cumulative, months }) {
  const p = netProfit[i]; const isLoss = p < 0; const ms = MILESTONES[i];
  const rows = [
    { label: 'Gross Revenue',               value: fi(grossRev[i]),        color: C.blue,              prefix: '' },
    { label: 'Platform Cuts',               value: fi(platCuts[i]),        color: C.orange,            prefix: '−' },
    { label: 'Net Revenue',                 value: fi(netRev[i]),          color: C.green,             prefix: '', bold: true, sep: true },
    { label: 'Total Costs',                 value: fi(totalCosts[i]),      color: C.red,               prefix: '−' },
    { label: isLoss ? 'Net Loss' : 'Net Profit', value: fi(Math.abs(p)),  color: isLoss ? C.red : C.blue, prefix: isLoss ? '−' : '+', bold: true, sep: true },
    { label: 'Cumulative',                  value: fi(cumulative[i]),      color: C.green,             prefix: '' },
  ];
  return (
    <div style={{ position: 'absolute', left: Math.min(ttip.x + 14, (typeof window !== 'undefined' ? window.innerWidth : 800) - 260), top: ttip.y - 10, background: '#fff', border: `1px solid ${C.cardBdr}`, borderRadius: 12, padding: '14px 16px', zIndex: 9999, minWidth: 230, pointerEvents: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textPri, marginBottom: ms ? 2 : 10 }}>Month {i + 1} &nbsp;·&nbsp; <span style={{ color: C.blue }}>{months[i]}</span></div>
      {ms && <div style={{ fontSize: 10, color: C.orange, fontWeight: 600, marginBottom: 10 }}>★ {ms}</div>}
      {rows.map((r, j) => (
        <div key={j}>
          {r.sep && <div style={{ height: 1, background: C.grid, margin: '8px 0' }} />}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, gap: 24 }}>
            <span style={{ fontSize: 11, color: C.textSec }}>{r.label}</span>
            <span style={{ fontSize: r.bold ? 13 : 12, fontWeight: r.bold ? 700 : 400, color: r.color }}>{r.prefix}{r.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CUMULATIVE BARS ────────────────────────────────────────────────────────────
function CumulativeBars({ months, cumulative, netProfit }) {
  const maxCum    = Math.max(...cumulative.map(v => Math.abs(v)), 1);
  const maxProfit = Math.max(...netProfit.map(v => Math.abs(v)), 1);
  return (
    <div style={{ ...S.card }}>
      <div style={S.cardTitle}>Cumulative Net Profit — Running Total Since Month 1</div>
      <div style={{ display: 'flex', gap: 20, marginBottom: 14, fontSize: 11, color: C.textSec }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 14, height: 8, borderRadius: 2, background: `linear-gradient(90deg,${C.green},#2da44e)` }} />
          Cumulative total
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 14, height: 6, borderRadius: 2, background: `linear-gradient(90deg,${C.blue},#218bff)` }} />
          This month&apos;s profit
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {months.map((m, i) => {
          const cumPct  = Math.max((Math.abs(cumulative[i]) / maxCum) * 100, 0.5);
          const profPct = Math.max((Math.abs(netProfit[i]) / maxProfit) * 100, 0.5);
          const isPos   = netProfit[i] >= 0;
          const cumPos  = cumulative[i] >= 0;
          return (
            <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, fontSize: 11, color: C.textMut, textAlign: 'right', flexShrink: 0 }}>{m}</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Green bar — cumulative */}
                <div style={{ background: '#eef0f3', borderRadius: 3, height: 14, overflow: 'hidden' }}>
                  <div style={{ width: `${cumPct}%`, height: '100%', background: cumPos ? `linear-gradient(90deg,${C.green},#2da44e)` : `linear-gradient(90deg,#cf222e,#e5534b)`, borderRadius: 3 }} />
                </div>
                {/* Blue bar — this month's profit */}
                <div style={{ background: '#eef0f3', borderRadius: 3, height: 9, overflow: 'hidden' }}>
                  <div style={{ width: `${profPct}%`, height: '100%', background: isPos ? `linear-gradient(90deg,${C.blue},#218bff)` : `linear-gradient(90deg,#cf222e,#e5534b)`, borderRadius: 3 }} />
                </div>
              </div>
              <div style={{ width: 82, fontSize: 11, color: cumPos ? C.green : C.red, fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>{fL(cumulative[i])}</div>
              <div style={{ width: 72, fontSize: 10, color: isPos ? C.blue : C.red, fontWeight: 600, textAlign: 'right', flexShrink: 0 }}>{isPos ? '+' : '−'}{fL(Math.abs(netProfit[i]))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── LAUNCH TIMELINE ────────────────────────────────────────────────────────────
function LaunchTimeline() {
  return (
    <div style={{ position: 'relative', paddingLeft: 28, marginBottom: 16 }}>
      <div style={{ position: 'absolute', left: 10, top: 16, bottom: 16, width: 2, background: `linear-gradient(to bottom, ${C.green} 0%, ${C.cardBdr} 100%)` }} />
      {TIMELINE.map((phase) => (
        <div key={phase.month} style={{ position: 'relative', marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: -24, top: 16, width: 14, height: 14, borderRadius: '50%', background: phase.color, border: '2px solid #fff', boxShadow: `0 0 0 2px ${phase.color}44` }} />
          <div style={{ background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 10, padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: phase.color, minWidth: 55 }}>{phase.month}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.textPri }}>{phase.label}</span>
            </div>
            {phase.platforms.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                {phase.platforms.map(p => (
                  <div key={p.name} style={{ background: '#f6f8fa', border: `1px solid ${p.color}44`, borderRadius: 6, padding: '5px 10px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: p.color }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: C.textSec, marginTop: 2, lineHeight: 1.4 }}>{p.detail}</div>
                  </div>
                ))}
              </div>
            )}
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {phase.tasks.map(t => (
                <li key={t} style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6, display: 'flex', gap: 8 }}>
                  <span style={{ color: C.green, flexShrink: 0 }}>›</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SECTION LABEL ──────────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.textMut, textTransform: 'uppercase', letterSpacing: '1.2px', margin: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: C.grid }} />
      {text}
      <div style={{ flex: 1, height: 1, background: C.grid }} />
    </div>
  );
}

// ── BREAKDOWN TABLE ────────────────────────────────────────────────────────────
function PLTable({ rows, grossRev, netRev, platCuts, totalCosts, netProfit, cumulative, T }) {
  const mileSet = new Set([2, 4, 9]);
  const totRev  = Array(REV_LABELS.length).fill(0);
  const totCost = Array(COST_LABELS.length).fill(0);
  rows.forEach(r => { r.rArr.forEach((v, j) => { totRev[j] += v; }); r.cArr.forEach((v, j) => { totCost[j] += v; }); });

  const thS = (bg, col) => ({ background: bg, color: col, padding: '9px 10px', textAlign: 'right', whiteSpace: 'nowrap', border: 'none', borderBottom: `1px solid ${C.grid}`, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 });
  const tdS = (col, bold) => ({ color: col, padding: '8px 10px', textAlign: 'right', whiteSpace: 'nowrap', borderBottom: `1px solid ${C.grid}`, fontWeight: bold ? 700 : 400 });

  return (
    <div style={{ overflowX: 'auto', borderRadius: 10, border: `1px solid ${C.cardBdr}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 1200, fontSize: 12 }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ ...thS('#f0f3f6', C.textPri), textAlign: 'left', position: 'sticky', left: 0, zIndex: 2 }}>Month</th>
            <th colSpan={REV_LABELS.length} style={thS('#e8f5ec', C.green)}>Revenue Streams — Gross (₹)</th>
            <th style={thS('#e8f5ec', C.green)}>Gross Total</th>
            <th style={thS('#fff5ee', C.orange)}>Platform Cuts</th>
            <th style={thS('#e8f5ec', C.green)}>Net Revenue</th>
            <th colSpan={COST_LABELS.length} style={thS('#ffeef0', C.red)}>Expenses (₹)</th>
            <th style={thS('#ffeef0', C.red)}>Total Costs</th>
            <th style={thS('#dff0ff', C.blue)}>Net Profit</th>
            <th style={thS('#dff0ff', C.blue)}>Cumulative</th>
          </tr>
          <tr>
            {REV_LABELS.map(l  => <th key={l} style={thS('#e8f5ec', C.green)}>{l}</th>)}
            <th style={thS('#e8f5ec', C.green)} /><th style={thS('#fff5ee', C.orange)} /><th style={thS('#e8f5ec', C.green)} />
            {COST_LABELS.map(l => <th key={l} style={thS('#ffeef0', C.red)}>{l}</th>)}
            <th style={thS('#ffeef0', C.red)} /><th style={thS('#dff0ff', C.blue)} /><th style={thS('#dff0ff', C.blue)} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isMile = mileSet.has(i);
            const bg = isMile ? '#e8f5ec' : (i % 2 === 0 ? '#fff' : '#f6f8fa');
            return (
              <tr key={row.month}>
                <td style={{ ...tdS(isMile ? C.green : C.textPri, isMile), background: '#f0f3f6', position: 'sticky', left: 0, zIndex: 1, textAlign: 'left' }}>
                  {row.label}{isMile ? <span style={{ color: C.green, fontSize: 9, marginLeft: 4 }}>★</span> : null}
                </td>
                {row.rArr.map((v, j) => <td key={j} style={{ ...tdS(C.green, false), background: bg }}>{v ? fi(v) : '—'}</td>)}
                <td style={{ ...tdS(C.green, true), background: bg }}>{fi(grossRev[i])}</td>
                <td style={{ ...tdS(C.orange, false), background: bg }}>{fi(platCuts[i])}</td>
                <td style={{ ...tdS(C.green, true), background: bg }}>{fi(netRev[i])}</td>
                {row.cArr.map((v, j) => <td key={j} style={{ ...tdS(C.red, false), background: bg }}>{v ? fi(v) : '—'}</td>)}
                <td style={{ ...tdS(C.red, true), background: bg }}>{fi(totalCosts[i])}</td>
                <td style={{ ...tdS(netProfit[i] >= 0 ? C.blue : C.red, true), background: bg }}>{netProfit[i] >= 0 ? '' : '−'}{fi(Math.abs(netProfit[i]))}</td>
                <td style={{ ...tdS(cumulative[i] >= 0 ? C.blue : C.red, true), background: bg }}>{fi(cumulative[i])}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ background: '#f0f3f6' }}>
            <td style={{ ...tdS(C.textPri, true), background: '#f0f3f6', position: 'sticky', left: 0, textAlign: 'left', borderTop: `2px solid ${C.cardBdr}` }}>TOTAL</td>
            {totRev.map((v, j)  => <td key={j} style={{ ...tdS(C.green, false), background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(v)}</td>)}
            <td style={{ ...tdS(C.green, true),  background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(grossRev.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS(C.orange,false), background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(platCuts.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS(C.green, true),  background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(netRev.reduce((a,b)=>a+b,0))}</td>
            {totCost.map((v, j) => <td key={j} style={{ ...tdS(C.red, false), background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(v)}</td>)}
            <td style={{ ...tdS(C.red,  true),   background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(totalCosts.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS(C.blue, true),   background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(T.profit)}</td>
            <td style={{ ...tdS(C.blue, true),   background: '#f0f3f6', borderTop: `2px solid ${C.cardBdr}` }}>{fi(T.profit)}</td>
          </tr>
          <tr style={{ background: '#f6f8fa' }}>
            <td colSpan={REV_LABELS.length + COST_LABELS.length + 7} style={{ color: C.textMut, fontSize: 11, padding: '8px 14px', lineHeight: 1.6 }}>
              Gross {fL(T.gross)} → minus platform cuts → Net Revenue {fL(T.net)} → minus all costs → <strong style={{ color: C.green }}>Net Profit {fL(T.profit)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
