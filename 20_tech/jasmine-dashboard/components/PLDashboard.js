'use client';
import { useMemo } from 'react';
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
// Platform fee retention rates (1 - fee%):
// Fanvue 15%, Passes 10%, PPV+Voice 10%, Telegram 10%, Brand 10%, IG Subs 20%, FB Subs 30%
const KEEP = [0.85, 0.60, 0.90, 0.90, 0.90, 0.90, 0.80, 0.70];

// Revenue stream labels — maps 1:1 to rArr indices
const REV_LABELS = ['Fanvue', 'Room 11', 'Passes', 'PPV+Voice', 'Telegram', 'Brand Deals', 'IG Subs', 'FB Subs'];

// Expense labels — maps 1:1 to cArr indices (ALL 10 items)
const COST_LABELS = [
  'Higgsfield', 'ElevenLabs', 'Grok', 'Claude ×2',
  'IG Ads', 'Taboola', 'Research', 'Buffer', 'Calilio', 'Namecheap', 'SpicyChat', 'Carrd.co', 'Dolphin',
];

// Platform fee breakdown for display
const PLATFORM_FEES = [
  { name: 'Fanvue', fee: '15%', type: 'Subscription Platform', url: 'https://www.fanvue.com' },
  { name: 'Room 11', fee: '40%', type: 'Managed DM Service', url: 'https://room11.com' },
  { name: 'Passes', fee: '10%', type: 'Subscription Platform', url: 'https://www.passes.com' },
  { name: 'PPV / Voice Notes', fee: '10%', type: 'Pay-Per-View', url: 'https://www.passes.com' },
  { name: 'Telegram VIP', fee: '10%', type: 'Community Tier', url: 'https://www.telegram.org' },
  { name: 'Brand Deals', fee: '10%', type: 'Sponsored Content', url: '' },
  { name: 'IG Subscriptions', fee: '20%', type: 'Native IG (unlocks at 10k)', url: 'https://www.instagram.com' },
  { name: 'FB Subscriptions', fee: '30%', type: 'Facebook Creator', url: 'https://www.facebook.com/creators' },
];

// Fixed monthly tool costs — base values (×1). Multiplied at render time via costMultiplier prop.
const TOOL_STACK = [
  { name: 'Higgsfield',  cost: 2699, desc: 'AI Video Gen / Animation',        url: 'https://higgsfield.ai' },
  { name: 'ElevenLabs',  cost: 420,  desc: 'AI Voice Cloning & Synthesis',     url: 'https://elevenlabs.io' },
  { name: 'Grok (X)',    cost: 542,  desc: 'Training Data / Content Research', url: 'https://x.com' },
  { name: 'Claude x2',   cost: 4000, desc: 'Logic, Scripts & Automation (2 Seats)', url: 'https://claude.ai' },
  { name: 'IG Reels Ads', cost: null, desc: 'SFW lifestyle ads → IG profile growth (safe on Meta)', url: 'https://www.facebook.com/business/ads' },
  { name: 'Taboola / ExoClick', cost: null, desc: 'Adult ad networks → mediator → Fanvue only. NEVER direct to IG.', url: 'https://www.taboola.com' },
  { name: 'Research',    cost: null, desc: 'Variable — scales with multiplier', url: '' },
  { name: 'Buffer',      cost: null, desc: 'Variable — scales with multiplier', url: '' },
  { name: 'Calilio',     cost: 1303, desc: 'VoIP / International Comms',       url: 'https://calilio.com' },
  { name: 'Namecheap',   cost: 92,   desc: 'Domain Only (Redirect Chain)',     url: 'https://namecheap.com' },
  { name: 'SpicyChat AI', cost: 1260, desc: 'Automated GFE DM Engine',        url: 'https://spicychat.ai' },
  { name: 'Carrd.co Pro', cost: 147,  desc: 'Link-in-bio redirect page',      url: 'https://carrd.co' },
  { name: 'Dolphin{anty}',cost: 930,  desc: 'OpSec Browser + USA Proxy',      url: 'https://dolphin-anty.com' },
  { name: 'Metricool',   cost: 0,    desc: 'Social Scheduling (Free Tier)',   url: 'https://metricool.com' },
];

const FIXED_MONTHLY_COST = TOOL_STACK.filter(t => t.cost).reduce((s, t) => s + t.cost, 0);

// ── CONTENT PRODUCTION MATRIX ─────────────────────────────────────────────────
// costs are BASE numbers (×1). Multiplied at render time by costMultiplier prop.
// cost: 0 = free. cost: -1 = 'included'. cost: -2 = 'already paid'.
const CONTENT_TYPES = [
  {
    id: 'CT-1', name: 'Viral Clone Reel', emoji: '🎬',
    volume: '60% of all output', format: 'Instagram Reel · 15–30s · 9:16',
    components: [
      { role: 'Source',                tool: 'Instaloader',                    cost: 0 },
      { role: 'Frame extraction',      tool: 'FFmpeg',                         cost: 0 },
      { role: 'Jasmine pose match',    tool: 'Flux Kontext 9B FP8 (Fal.ai)',  cost: 25, approx: true },
      { role: 'Motion skeleton',       tool: 'DW Pose',                        cost: 0 },
      { role: 'Video gen (I2V)',        tool: 'Wan AI Animate 2.2 I2V',        cost: 420 },
      { role: 'Color correction',      tool: 'CapCut',                         cost: 0 },
      { role: 'Captions overlay',      tool: 'CapCut auto-caption',            cost: 0 },
      { role: 'Script / caption text', tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                 tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',            tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-2', name: 'Face Swap Reel', emoji: '🔄',
    volume: 'Alt to CT-1 (complex motion)', format: 'Instagram Reel · 15–30s · 9:16',
    components: [
      { role: 'Driving video source',  tool: 'Reels / TikTok (manual)',        cost: 0 },
      { role: 'Video gen (T2V)',        tool: 'Wan AI 2.2 T2V + Jasmine Wan LoRA · denoise 0.4–0.5', cost: 420 },
      { role: 'Color correction',      tool: 'CapCut',                         cost: 0 },
      { role: 'Script / caption text', tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                 tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',            tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-3', name: 'Talking Head / Direct-to-Camera', emoji: '🎤',
    volume: '1–2 per week', format: 'Instagram Reel + repurposed as Stories',
    components: [
      { role: 'Script',                      tool: 'Claude / manual',                cost: 0 },
      { role: 'Voice (emotion-tagged)',       tool: 'OmniVoice (local/Colab)',        cost: 0 },
      { role: 'Voice clone ref (M1 only)',    tool: 'ElevenLabs Starter',             cost: 420, m1only: true },
      { role: 'Lip-sync video (S2V)',         tool: 'Wan AI S2V',                     cost: 420 },
      { role: 'Background image',            tool: 'Flux Kontext OR Google Whisk',   cost: 0 },
      { role: 'Captions overlay',            tool: 'CapCut',                         cost: 0 },
      { role: 'Script / caption text',       tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                       tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',                  tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-4', name: 'GRWM / Outfit Transition', emoji: '👗',
    volume: '2–4 per month', format: 'Instagram Reel · High saves format',
    components: [
      { role: 'Static outfit images (2–3)',   tool: 'Z-Image Base+Turbo + Jasmine Z-Image LoRA (Fal.ai)', cost: 0 },
      { role: 'Transition video (VACE chain)', tool: 'Wan VACE',                    cost: 420 },
      { role: 'Voice narration (optional)',   tool: 'OmniVoice',                     cost: 0 },
      { role: 'Trending audio',              tool: 'CapCut music library',           cost: 0 },
      { role: 'OPSEC',                       tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',                  tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-5', name: 'Lifestyle / Travel UGC', emoji: '✈️',
    volume: '4–6 per month', format: 'Instagram Reel or Feed Post',
    components: [
      { role: 'Location mood board',         tool: 'Pinterest',                      cost: 0 },
      { role: 'Video gen (primary)',          tool: 'Google Veo 3 via Flow (Google One)', cost: -2 },
      { role: 'Video gen (fallback)',         tool: 'Flux Kontext',                   cost: 25, approx: true },
      { role: 'Voice narration (optional)',   tool: 'OmniVoice',                     cost: 0 },
      { role: 'Grain / film filter',         tool: 'CapCut',                         cost: 0 },
      { role: 'Script / caption text',       tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                       tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',                  tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-6', name: 'Trend Reaction', emoji: '⚡',
    volume: 'As trends emerge', format: 'Instagram Reel · Reaction/PiP format',
    components: [
      { role: 'Viral trend clip',            tool: 'Reels / TikTok (manual)',        cost: 0 },
      { role: 'PiP video (reaction box)',    tool: 'Wan VACE (PiP mode)',            cost: 420 },
      { role: 'Voice reaction',              tool: 'OmniVoice',                      cost: 0 },
      { role: 'Trending audio + captions',   tool: 'CapCut',                         cost: 0 },
      { role: 'Script / caption text',       tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                       tool: 'ExifTool + FFmpeg',              cost: 0 },
      { role: 'Scheduling',                  tool: 'Metricool',                      cost: 0 },
    ],
  },
  {
    id: 'CT-7', name: 'Product Review / UGC Ad', emoji: '🛍️',
    volume: 'On demand (affiliate / brand deals)', format: 'Instagram Reel · Structured UGC',
    components: [
      { role: 'Product image',               tool: 'Instagram Shop / Brand',         cost: 0 },
      { role: 'API orchestration',           tool: 'Claude Code + .md Skill File',   cost: 4000 },
      { role: 'Static ad frames (batch)',    tool: 'Higgsfield API (auto-batch)',     cost: 838 },
      { role: 'A-roll video (S2V)',          tool: 'Higgsfield Cinema Studio',        cost: -1 },
      { role: 'Voice',                       tool: 'OmniVoice',                      cost: 0 },
      { role: 'Final edit',                  tool: 'CapCut / Premiere',              cost: 0 },
      { role: 'Script / caption text',       tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC',                       tool: 'ExifTool + FFmpeg',              cost: 0 },
    ],
  },
  {
    id: 'CT-8', name: 'Carousel (Static Multi-Image)', emoji: '🖼️',
    volume: '4–6 per month', format: 'Instagram Carousel · 4–8 slides · Max saves',
    components: [
      { role: 'Multi-image gen (4–8 slides)', tool: 'Flux Kontext 9B + Jasmine Z-Image LoRA (ComfyUI)', cost: 25, approx: true },
      { role: 'Compile + order',             tool: 'CapCut or direct upload',        cost: 0 },
      { role: 'Caption text per slide',      tool: 'jasmine_agent.py',               cost: 0 },
      { role: 'OPSEC (each image)',          tool: 'ExifTool',                        cost: 0 },
      { role: 'Scheduling',                  tool: 'Metricool',                      cost: 0 },
    ],
  },
];

const COMPETITORS = [
  { name: 'Lu do Magalu',  followers: '6.8M',  url: 'https://www.instagram.com/magazineluiza/', note: 'Brazil — World\'s most followed AI influencer' },
  { name: 'Lil Miquela',   followers: '2.6M',  url: 'https://www.instagram.com/lilmiquela/',   note: 'USA — Brud / first mainstream AI influencer' },
  { name: 'Aitana Lopez',  followers: '330K',  url: 'https://www.instagram.com/aitana.lopez/', note: 'Spain — €10k/mo, Fanvue creator economy leader' },
  { name: 'Imma',          followers: '390K',  url: 'https://www.instagram.com/imma.gram/',    note: 'Japan — Fashion-forward virtual model' },
  { name: 'Shudu',         followers: '240K',  url: 'https://www.instagram.com/shudu.gram/',  note: 'UK — First AI supermodel, Cameron-James Wilson' },
];

const GLOSSARY = [
  { t: 'Gross Revenue',       d: 'Total money earned across all platforms before anyone takes their cut. (Fanvue + Passes + PPV/Voice + Telegram + Brand + IG Subs + FB Subs)' },
  { t: 'Platform Cuts',       d: 'Commission fees taken by each platform. Fanvue 15%, Passes/PPV/Telegram/Brand 10%, Instagram Subs 20%, FB Subs 30%.' },
  { t: 'Net Revenue',         d: 'Money that hits your bank account after platform commissions AND Payment Gateway/Forex fees (Razorpay 2.5% on INR + Skydo flat ₹3537 for USD).' },
  { t: 'Total Costs',         d: 'Everything spent each month: AI tools (Higgsfield ₹2,699 + ElevenLabs ₹420 + Grok ₹542 + Claude ₹4,000 + Calilio ₹1,303 + SpicyChat ₹1,260 + Carrd.co ₹147 + Namecheap ₹92) + variable ads and research.' },
  { t: 'Net Profit',          d: 'The money you actually keep — after platform fees, gateway fees AND all expenses. (Net Revenue − Total Costs)' },
  { t: 'Cumulative Profit',   d: 'Running total of all net profits since Month 1. (Sum of all Net Profits up to this month)' },
  { t: 'MRR',                 d: 'Monthly Recurring Revenue — predictable subscription income that auto-renews. (Fanvue subscriptions + IG subscriptions)' },
  { t: 'PPV',                 d: 'Pay-Per-View — fans pay once for specific content, not a monthly sub. (Included in PPV+Voice column)' },
  { t: 'GFE',                 d: 'Girlfriend Experience — premium personal interaction: voice notes, DMs, personalised content. Drives higher Fanvue + PPV yield.' },
  { t: 'ARPU / ARPPU',        d: 'Average Revenue Per User / Per Paying User. ARPPU excludes free followers and tracks only subscribers and buyers.' },
];

const ROADMAP = [
  { m: 'Pre-Launch Phase 0 — Foundation', d: 'Generate 40 LoRA training images (Grok + Colab) • QC against character bible • Train Flux.1 LoRA on Civitai/RunPod • QC LoRA — 5 test images, verify face + body lock • OPSEC pipeline: ExifTool EXIF strip + film grain overlay.' },
  { m: 'M1 Day 1 — Full Launch',          d: 'Fanvue GFE subscription ₹1,200/mo (free trial first week) • Instagram SFW: 1 post/day, 3 Stories/day, Reels 3×/week • Passes: Mirror of Fanvue + PPV unlocks, voice notes • X/Twitter: SFW-edge teasers → traffic to Fanvue • Post 12 pre-batched content pieces (2-week runway) • Metricool scheduler setup • DM welcome script live on Fanvue • Linktree setup: link-in-bio → Fanvue + Passes.' },
  { m: 'M2 Growth & Content Velocity',    d: 'Increase post frequency based on engagement data • Launch first PPV campaign — voice note bundle • Start Reddit seeding (SFW communities) • A/B test caption styles and posting times.' },
  { m: 'M3 — $2k MRR Milestone (₹1.86L)', d: 'Meta Ads: Paid Instagram promotion — ₹3,000/mo budget • $2k MRR ($2,000 USD = ₹1,86,160) target • Launch Meta Ads retargeting to profile visitors • First collab shoutout with micro-influencer (barter).' },
  { m: 'M4 — IG Subscriptions Unlock (10k Followers)', d: 'Hit 10k follower milestone • Instagram Subscriptions: ₹300/mo native IG sub — exclusive Stories + Close Friends • First "live" voice note AMA session for subscribers.' },
  { m: 'M5 — GFE & Sales Automation',    d: 'Expand to Telegram — premium channel for GFE teasers (₹500–₹800/mo tier) • Dedicated sales script for voice note bundles (GFE 2.0) • Content researcher role automated using Perplexity.' },
  { m: 'M6 — Scaling & Infrastructure Maturity', d: 'Diversify content — lifestyle vlogs (high-production values) • Launch branded merchandise store (print-on-demand) • Scale Meta Ads budget to ₹10,000/mo base.' },
  { m: 'M9+ — Market Dominance',          d: 'Brand sponsorships in Fashion, Tech, Gaming (Tier-1 focus: US/UK/EU minimum ₹21,000/deal) • White-label SaaS: automated GFE tool for other creators.' },
];

const FOOTNOTES = [
  { id: 1, label: 'Aitana Lopez Revenue Proof',   text: 'AI influencer earns €10,000/month ($11k USD) sourced from The Clueless Studio — confirmed by Euractiv & Forbes.',        url: 'https://www.euractiv.com/section/digital/news/first-spanish-ai-model-earns-up-to-e10000-per-month/' },
  { id: 2, label: 'US vs India Meta Ads CPM Gap', text: 'Tier-1 CPM: $15–$20 (US/UK). Tier-3 CPM: $1–$3 (India). Source: Adamigo Ads Benchmarks 2024.',                         url: 'https://adamigo.ai/meta-ads-cpm-benchmarks/' },
  { id: 3, label: 'Tier-1 Subscriber LTV Logic',  text: 'US/UK ARPPU calculation: $15.99 base sub + avg $15–$25 PPV = ~$370–$490/yr per paying subscriber. Source: IMH 2024.',   url: 'https://influencermarketinghub.com/onlyfans-statistics/' },
  { id: 4, label: 'India Market Maturity Lag',     text: 'EY India Influencer Report: Indian market is 2 years behind US/EU in premium creator economy adoption and monetization.', url: 'https://www.ey.com/en_in/media-entertainment/the-state-of-influencer-marketing-in-india' },
  { id: 5, label: 'Virtual Influencer Market Size', text: 'Global virtual influencer market projected to reach $37.8B by 2030 (CAGR 36%). Source: Grand View Research.',          url: 'https://www.grandviewresearch.com/industry-analysis/virtual-influencer-market-report' },
];

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fi = v => '₹' + Math.round(v).toLocaleString('en-IN');
const fL = v => {
  if (v >= 10000000) return '₹' + (v / 10000000).toFixed(2) + 'Cr';
  if (v >= 100000)   return '₹' + (v / 100000).toFixed(2) + 'L';
  return '₹' + (v / 1000).toFixed(1) + 'K';
};

function deriveRows(data, costMultiplier = 1) {
  return data.map(row => {
    const rArr  = [row.fanvue, row.room11 || 0, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs, row.fb_subs || 0];
    // ALL cost fields multiplied by costMultiplier
    const cArr  = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.ig_ads, row.taboola, row.research, row.buffer, row.calilio, row.namecheap, row.spicychat, row.carrd, row.dolphin || 0].map(v => v * costMultiplier);
    
    const gross = rArr.reduce((a, b) => a + b, 0);
    const platformNet = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    
    // Gateway Fees: Razorpay (2.5% on INR platforms) + Skydo (Flat $38 = ₹3537 for USD payouts)
    // Telegram is rArr[4], Brand is rArr[5], IG/FB Subs are rArr[6], rArr[7]
    const inrRev = rArr[4] + rArr[5] + rArr[6] + rArr[7];
    const razorpayFee = inrRev * 0.025;
    const skydoFee = 3537;
    const gatewayFees = razorpayFee + skydoFee;
    
    // Final Cuts = Platform Commission + Gateway Fees
    const platformCuts = gross - platformNet;
    const cuts = platformCuts + gatewayFees;
    const trueNet = platformNet - gatewayFees;
    
    const costs = cArr.reduce((a, b) => a + b, 0);
    return { ...row, rArr, cArr, gross, net: trueNet, cuts, costs, profit: trueNet - costs };
  });
}

// ── COMPACT LIGHT THEME ────────────────────────────────────────────────────────
const C = {
  pageBg:   '#f6f8fa',
  cardBg:   '#ffffff',
  cardBdr:  '#d0d7de',
  textPri:  '#1f2328',
  textSec:  '#57606a',
  textMut:  '#8c959f',
  grid:     '#d8dee4',
  blue:     '#0969da',
  green:    '#1a7f37',
  orange:   '#bc4c00',
  red:      '#cf222e',
  accent:   '#8250df',
  noteBg:   '#f0f6ff',
  noteBdr:  '#cae3fb',
  greenBg:  '#dafbe1',
  greenBdr: '#2da44e',
};

const S = {
  page:      { background: C.pageBg, color: C.textPri, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif", padding: '24px 20px 80px', maxWidth: 1600, margin: '0 auto' },
  header:    { textAlign: 'center', marginBottom: 24 },
  h1:        { fontSize: 22, fontWeight: 700, color: C.blue, marginBottom: 4 },
  sub:       { color: C.textSec, fontSize: 12 },
  stats:     { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 },
  statBox:   { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 8, padding: '12px 14px' },
  statLbl:   { fontSize: 10, color: C.textMut, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 },
  card:      { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 8, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 11, fontWeight: 700, color: C.textSec, textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.5px' },
  fn:        { verticalAlign: 'super', fontSize: 9, fontWeight: 700, color: C.blue, marginLeft: 2, cursor: 'help' },
  link:      { color: C.blue, textDecoration: 'none', cursor: 'pointer' },
  grid2:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16, marginBottom: 16 },
  divider:   { borderBottom: `1px solid ${C.grid}`, paddingBottom: 8, marginBottom: 8 },
};

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
// Helper to format a CONTENT_TYPES component cost with a multiplier
function fCost(comp, m) {
  if (comp.cost === -1) return 'included';
  if (comp.cost === -2) return '₹0 (already paid)';
  if (comp.cost === 0)  return '₹0';
  const v = comp.cost * m;
  return (comp.approx ? '~' : '') + '₹' + Math.round(v).toLocaleString('en-IN') + (comp.m1only ? ' (M1 only)' : '/mo');
}

export default function PLDashboard({ data, costMultiplier = 1 }) {
  const m = costMultiplier; // shorthand
  const rows       = useMemo(() => deriveRows(data, m), [data, m]);
  const months     = rows.map(r => r.label);
  const grossRev   = rows.map(r => r.gross);
  const netRev     = rows.map(r => r.net);
  const netProfit  = rows.map(r => r.profit);
  const cumulative = netProfit.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);

  const T = {
    gross:  grossRev.reduce((a, b) => a + b, 0),
    net:    netRev.reduce((a, b) => a + b, 0),
    costs:  rows.map(r => r.costs).reduce((a, b) => a + b, 0),
    profit: netProfit.reduce((a, b) => a + b, 0),
  };

  const lineChartData = {
    labels: months,
    datasets: [
      { label: 'Gross Revenue', data: grossRev,  borderColor: C.blue,  backgroundColor: 'rgba(9,105,218,0.05)', borderWidth: 2, pointRadius: 4, fill: false, tension: 0.3 },
      { label: 'Net Profit',    data: netProfit, borderColor: C.green, backgroundColor: 'rgba(26,127,55,0.1)',  borderWidth: 2, pointRadius: 4, fill: true,  tension: 0.3 },
    ],
  };

  const barChartData = {
    labels: months,
    datasets: [{
      label: 'Cumulative Profit',
      data: cumulative,
      backgroundColor: cumulative.map(v => v < 0 ? C.red + '55' : C.green + '88'),
      borderColor:     cumulative.map(v => v < 0 ? C.red : C.green),
      borderWidth: 1,
    }],
  };

  const chartOpts = (cb) => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { font: { size: 10 }, callback: cb || (v => fL(v)) } },
    },
  });

  return (
    <div style={S.page}>

      {/* ── HEADER ── */}
      <div style={S.header}>
        <h1 style={S.h1}>Virtual Influencer Infrastructure — 12-Month P&L</h1>
        <div style={S.sub}>
          ₹93.08 = $1 USD &nbsp;·&nbsp; <strong>Modeled for EXACTLY 1 Influencer</strong>
        </div>
        <div style={{ ...S.sub, marginTop: 4, fontSize: 11, color: C.accent }}>
          IG Subscriptions (₹300/mo) unlock at M4 (10k follower milestone) &nbsp;·&nbsp; FB Subs launch M5
        </div>
      </div>

      {/* ── 12-MONTH SUMMARY CARDS ── */}
      <div style={S.stats}>
        {[
          { l: '12M Gross Revenue',  v: T.gross },
          { l: '12M Net Revenue',    v: T.net },
          { l: '12M Total Expenses', v: T.costs },
          { l: '12M Net Profit',     v: T.profit, green: true },
        ].map(c => (
          <div key={c.l} style={{ ...S.statBox, background: c.green ? C.greenBg : C.cardBg, borderColor: c.green ? C.greenBdr : C.cardBdr }}>
            <div style={S.statLbl}>{c.l}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: c.green ? C.green : C.textPri }}>{fL(c.v)}</div>
            <div style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{fi(c.v)}</div>
          </div>
        ))}
      </div>

      {/* ── CHARTS ── */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>Monthly Revenue & Profit Growth</div>
          <div style={{ height: 210 }}><Line data={lineChartData} options={chartOpts()} /></div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 10, justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ display: 'inline-block', width: 10, height: 10, background: C.blue }} /> Gross Revenue</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ display: 'inline-block', width: 10, height: 10, background: C.green }} /> Net Profit</span>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>Cumulative Profit — Path to Break-Even</div>
          <div style={{ height: 210 }}><Bar data={barChartData} options={chartOpts()} /></div>
          <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: C.textSec }}>
            Break-even: Month 4 &nbsp;·&nbsp; Year-1 Target: ₹1.18Cr+
          </div>
        </div>
      </div>

      {/* ── THE SEVEN MOATS + GEOGRAPHY YIELD ── */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🛡️ The Seven Moats — Business Defensibility</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { t: '1. Identity Sovereignty',    d: 'Immortality: no aging, no fatigue, no retirement. Ever.' },
              { t: '2. Structural Consistency',  d: 'Proprietary Flux.1 LoRA identity-lock — perfect face/body every render.' },
              { t: '3. Capital Efficiency',      d: '90%+ lower marginal production cost vs. human influencer operations.' },
              { t: '4. Yield Arbitrage',         d: 'USD streams (Fanvue/PPV) target $400+ yield/sub. INR streams (IG/FB Subs + Brand Deals) layer on from M4 — dual-market compound growth.' },
              { t: '5. Market Lag Advantage',    d: 'Indian market is 2 years behind US/EU. First-mover captures premium.' },
              { t: '6. Omnipresent Scale',       d: '24/7 content production across 7 revenue streams simultaneously.' },
              { t: '7. IP Consolidation',        d: '100% talent equity and character IP retained by the infrastructure.' },
            ].map(m => (
              <div key={m.t} style={S.divider}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{m.t}</div>
                <div style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={S.cardTitle}>📍 Dual-Market Strategy — Revenue Geography</div>
          <div style={{ background: C.noteBg, border: `1px solid ${C.noteBdr}`, borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 11, color: C.textSec }}>
            <strong>USD-first (M1+):</strong> Fanvue, Passes, PPV+Voice target Tier-1 (US/UK/EU/AU) — premium GFE yield. <strong>INR-additive (M4+):</strong> IG Subs ₹300/mo, FB Subs, Brand Deals activate after 10k follower gate. Both markets run in parallel — West pays for content, India scales native reach.<span style={S.fn}>[4]</span>
          </div>
          <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>USD Stream Yield / Sub (US/UK/EU)</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: C.green }}>$370 – $490 <span style={S.fn}>[3]</span></td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>Calculation basis</td>
                <td style={{ textAlign: 'right', fontSize: 10, color: C.textMut }}>Fanvue sub + PPV+Voice avg × 12 @ ₹93.08/$</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>INR Stream — IG Sub price</td>
                <td style={{ textAlign: 'right', color: C.blue }}>₹300/mo (unlocks M4 @ 10k followers)</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>INR Stream — Brand Deals range</td>
                <td style={{ textAlign: 'right', color: C.blue }}>₹20K – ₹5L/post (M4 → M12)</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>Meta Ads CPM — US Avg</td>
                <td style={{ textAlign: 'right', color: C.blue }}>$15 – $20 <span style={S.fn}>[2]</span></td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${C.grid}` }}>
                <td style={{ padding: '6px 0', color: C.textSec }}>Meta Ads CPM — India Avg</td>
                <td style={{ textAlign: 'right', color: C.textMut }}>$1 – $3</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 700 }}>USD vs India Spending Power</td>
                <td style={{ textAlign: 'right', fontWeight: 800, color: C.blue }}>~8x – 10x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CONTENT PRODUCTION MATRIX ── */}
      <div style={S.card}>
        <div style={S.cardTitle}>🎯 Content Production Matrix — All 8 Types · Components · Tools · Costs</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: `2px solid ${C.grid}` }}>
                <th style={{ padding: '9px 8px', textAlign: 'left', color: C.textMut, fontWeight: 600, whiteSpace: 'nowrap' }}>Type</th>
                <th style={{ padding: '9px 8px', textAlign: 'left', color: C.textMut, fontWeight: 600, whiteSpace: 'nowrap' }}>Volume</th>
                <th style={{ padding: '9px 8px', textAlign: 'left', color: C.textMut, fontWeight: 600 }}>Component / Role</th>
                <th style={{ padding: '9px 8px', textAlign: 'left', color: C.textMut, fontWeight: 600 }}>Tool</th>
                <th style={{ padding: '9px 8px', textAlign: 'right', color: C.textMut, fontWeight: 600, whiteSpace: 'nowrap' }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {CONTENT_TYPES.map((ct, ctIdx) =>
                ct.components.map((comp, compIdx) => (
                  <tr
                    key={`${ct.id}-${compIdx}`}
                    style={{
                      borderBottom: compIdx === ct.components.length - 1
                        ? `2px solid ${C.grid}`
                        : `1px solid ${C.grid}`,
                      background: ctIdx % 2 === 0 ? '#fff' : '#fafbfc',
                    }}
                  >
                    {compIdx === 0 ? (
                      <td
                        rowSpan={ct.components.length}
                        style={{
                          padding: '8px 8px',
                          verticalAlign: 'top',
                          fontWeight: 700,
                          color: C.blue,
                          borderRight: `1px solid ${C.grid}`,
                          whiteSpace: 'nowrap',
                          fontSize: 10,
                        }}
                      >
                        <div style={{ fontSize: 14, marginBottom: 2 }}>{ct.emoji}</div>
                        <div>{ct.id}</div>
                        <div style={{ fontWeight: 800, fontSize: 10.5, color: C.textPri, marginTop: 2 }}>{ct.name}</div>
                        <div style={{ fontWeight: 400, fontSize: 9, color: C.textMut, marginTop: 3, maxWidth: 130, whiteSpace: 'normal', lineHeight: 1.4 }}>{ct.format}</div>
                      </td>
                    ) : null}
                    {compIdx === 0 ? (
                      <td
                        rowSpan={ct.components.length}
                        style={{
                          padding: '8px 8px',
                          verticalAlign: 'top',
                          color: C.accent,
                          fontWeight: 600,
                          fontSize: 9.5,
                          borderRight: `1px solid ${C.grid}`,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {ct.volume}
                      </td>
                    ) : null}
                    <td style={{ padding: '7px 8px', color: C.textSec }}>{comp.role}</td>
                    <td style={{ padding: '7px 8px', fontWeight: 600, color: C.textPri }}>{comp.tool}</td>
                    <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap', color: comp.cost <= 0 ? (comp.cost === 0 ? C.green : C.textMut) : C.orange }}>{fCost(comp, m)}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f6f8fa', borderTop: `2px solid ${C.grid}` }}>
                <td colSpan={4} style={{ padding: '10px 8px', fontWeight: 700, fontSize: 11 }}>Monthly Tool Cost Rollup (M2+)</td>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 800, fontSize: 12, color: C.green }}>~{fi(1283 * m)}/mo</td>
              </tr>
              <tr style={{ background: '#f6f8fa' }}>
                <td colSpan={5} style={{ padding: '6px 8px', fontSize: 9, color: C.textMut }}>
                  Wan AI {fi(420*m)} · Higgsfield {fi(838*m)} · Flux/Fal.ai ~{fi(25*m)} · ElevenLabs {fi(420*m)} (M1 only, then ₹0) · OmniVoice ₹0 · Google Veo 3 ₹0 (already paid) · CapCut ₹0 · FFmpeg/ExifTool ₹0 · Metricool ₹0
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── TOOL STACK & MONTHLY COSTS ── */}
      <div style={S.card}>
        <div style={S.cardTitle}>🛠️ Operational Stack — Full Monthly Pricing Breakdown</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10, marginBottom: 14 }}>
          {TOOL_STACK.map(t => (
            <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${C.grid}`, paddingBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>
                  {t.url ? <a href={t.url} target="_blank" style={S.link}>{t.name}</a> : t.name}
                </div>
                <div style={{ fontSize: 9, color: C.textMut, marginTop: 2 }}>{t.desc}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.cost ? C.red : C.orange }}>
                  {t.cost ? fi(t.cost * m) : 'Variable'}
                </div>
                <div style={{ fontSize: 9, color: C.textMut }}>per month</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: C.greenBg, border: `1px solid ${C.greenBdr}`, borderRadius: 6, padding: '10px 14px', fontSize: 11 }}>
          <strong>Fixed Monthly Overhead (excl. Ads & Research):</strong> {fi(FIXED_MONTHLY_COST * m)} &nbsp;·&nbsp;
          <span style={{ color: C.textSec }}>Breakeven on fixed costs from Month 1.</span>
        </div>
      </div>

      {/* ── PLATFORM FEES + COMPETITORS ── */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🚀 Revenue Platforms & Fee Structure</div>
          <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: `1px solid ${C.grid}` }}>
                <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: 600, color: C.textMut }}>Platform</th>
                <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: 600, color: C.textMut }}>Type</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 600, color: C.textMut }}>Fee</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 600, color: C.textMut }}>We Keep</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_FEES.map((p, i) => (
                <tr key={p.name} style={{ borderBottom: `1px solid ${C.grid}`, background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                  <td style={{ padding: '7px 6px', fontWeight: 700 }}>
                    {p.url ? <a href={p.url} target="_blank" style={S.link}>{p.name}</a> : p.name}
                  </td>
                  <td style={{ padding: '7px 6px', color: C.textSec, fontSize: 10 }}>{p.type}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', color: C.orange }}>{p.fee}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 700, color: C.green }}>{(100 - parseInt(p.fee)) + '%'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, fontSize: 10, color: C.textMut }}>+ Marketing: Instagram, X, Reddit (traffic channels, no fee)</div>
        </div>

        <div style={S.card}>
          <div style={S.cardTitle}>🔥 Global Virtual Influencer Benchmarks</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {COMPETITORS.map(c => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.grid}`, paddingBottom: 8 }}>
                <div>
                  <a href={c.url} target="_blank" style={{ ...S.link, fontWeight: 700, fontSize: 12 }}>{c.name}</a>
                  <div style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{c.note}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.textPri }}>{c.followers}</div>
                  <div style={{ fontSize: 9, color: C.textMut }}>followers</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: C.noteBg, border: `1px solid ${C.noteBdr}`, borderRadius: 6, padding: '8px 12px', fontSize: 10, color: C.textSec }}>
            <strong>Market Proof:</strong> Aitana Lopez (330K followers) earns €10k/month (~₹9.3L) through Fanvue subscriptions and brand deals. <a href={FOOTNOTES[0].url} target="_blank" style={S.link}>Source [1]</a>
          </div>
        </div>
      </div>

      {/* ── ROADMAP + GLOSSARY ── */}
      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardTitle}>🗓️ Detailed Execution Roadmap (Phase 0 → M9+)</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {ROADMAP.map(r => (
              <div key={r.m} style={S.divider}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{r.m}</div>
                <div style={{ fontSize: 10, color: C.textSec, lineHeight: 1.6, marginTop: 3 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>📖 Key Terms Glossary</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {GLOSSARY.map(g => (
              <div key={g.t} style={S.divider}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{g.t}</div>
                <div style={{ fontSize: 10, color: C.textSec, lineHeight: 1.5, marginTop: 3 }}>{g.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FULL P&L AUDIT TABLE ── */}
      <div style={S.card}>
        <div style={S.cardTitle}>📊 Month-by-Month Full Financial Audit (All Columns)</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, minWidth: 1600 }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: `2px solid ${C.grid}` }}>
                <th style={{ padding: '10px 5px', textAlign: 'left', position: 'sticky', left: 0, background: '#f6f8fa' }}>MONTH</th>
                {/* Revenue sub-columns */}
                {REV_LABELS.map(l => <th key={l} style={{ padding: '10px 5px', textAlign: 'right', color: C.blue, fontWeight: 500 }}>{l}</th>)}
                <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 800, borderLeft: `2px solid ${C.grid}` }}>GROSS</th>
                <th style={{ padding: '10px 6px', textAlign: 'right', color: C.orange }}>CUTS</th>
                <th style={{ padding: '10px 6px', textAlign: 'right', borderRight: `2px solid ${C.grid}` }}>NET REV</th>
                {/* Expense sub-columns — ALL 10 */}
                {COST_LABELS.map(l => <th key={l} style={{ padding: '10px 5px', textAlign: 'right', color: C.red, fontWeight: 500 }}>{l}</th>)}
                <th style={{ padding: '10px 6px', textAlign: 'right', color: C.red, fontWeight: 800, borderLeft: `2px solid ${C.grid}` }}>TOTAL EXP</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: C.green, fontWeight: 800 }}>NET PROFIT</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: C.blue, fontWeight: 800 }}>CUMULATIVE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.month} style={{ borderBottom: `1px solid ${C.grid}`, background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                  <td style={{ padding: '7px 5px', fontWeight: 700, position: 'sticky', left: 0, background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>{r.label}</td>
                  {r.rArr.map((v, idx) => <td key={idx} style={{ padding: '7px 5px', textAlign: 'right', color: C.textSec }}>{v > 0 ? fi(v) : '—'}</td>)}
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 700, borderLeft: `2px solid ${C.grid}` }}>{fi(r.gross)}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', color: C.orange }}>{fi(r.cuts)}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', borderRight: `2px solid ${C.grid}` }}>{fi(r.net)}</td>
                  {r.cArr.map((v, idx) => <td key={idx} style={{ padding: '7px 5px', textAlign: 'right', color: C.textSec }}>{v > 0 ? fi(v) : '—'}</td>)}
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 700, color: C.red, borderLeft: `2px solid ${C.grid}` }}>{fi(r.costs)}</td>
                  <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 800, color: r.profit < 0 ? C.red : C.green }}>{fi(r.profit)}</td>
                  <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 800, color: cumulative[i] < 0 ? C.orange : C.blue }}>{fi(cumulative[i])}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f6f8fa', fontWeight: 800, borderTop: `2px solid ${C.grid}` }}>
                <td style={{ padding: '12px 5px', position: 'sticky', left: 0, background: '#f6f8fa' }}>12M TOTAL</td>
                {REV_LABELS.map((_, idx) => <td key={idx} style={{ padding: '12px 5px', textAlign: 'right' }}>{fi(rows.reduce((s, r) => s + r.rArr[idx], 0))}</td>)}
                <td style={{ padding: '12px 6px', textAlign: 'right', borderLeft: `2px solid ${C.grid}` }}>{fi(T.gross)}</td>
                <td style={{ padding: '12px 6px', textAlign: 'right', color: C.orange }}>{fi(T.gross - T.net)}</td>
                <td style={{ padding: '12px 6px', textAlign: 'right', borderRight: `2px solid ${C.grid}` }}>{fi(T.net)}</td>
                {COST_LABELS.map((_, idx) => <td key={idx} style={{ padding: '12px 5px', textAlign: 'right' }}>{fi(rows.reduce((s, r) => s + r.cArr[idx], 0))}</td>)}
                <td style={{ padding: '12px 6px', textAlign: 'right', color: C.red, borderLeft: `2px solid ${C.grid}` }}>{fi(T.costs)}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', color: C.green }}>{fi(T.profit)}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', color: C.blue }}>{fi(T.profit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: C.textMut }}>
          * All 10 expense categories are visible. Total Expenses column = sum of all 10. Revenue conversion: Fanvue/Passes/PPV at ₹93.08 = $1.
        </div>
      </div>

      {/* ── TECHNICAL APPENDIX ── */}
      <div id="appendix" style={{ ...S.card, background: '#fcfcfc', border: `1px dashed ${C.cardBdr}`, marginTop: 8 }}>
        <div style={S.cardTitle}>📝 Technical Appendix & Verification Sources</div>
        <div style={{ display: 'grid', gap: 14 }}>
          {FOOTNOTES.map(f => (
            <div key={f.id} style={{ display: 'flex', gap: 12, fontSize: 11 }}>
              <div style={{ fontWeight: 800, color: C.blue, minWidth: 22, flexShrink: 0 }}>[{f.id}]</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{f.label}</div>
                <div style={{ color: C.textSec, lineHeight: 1.5 }}>
                  {f.text} &nbsp;
                  <a href={f.url} target="_blank" style={{ color: C.blue, textDecoration: 'underline' }}>Source →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, color: C.textMut, fontSize: 10 }}>
        Financial Dashboard v2.0 — Confidential &amp; Proprietary.
      </div>
    </div>
  );
}
