'use client';
import { useMemo, useState, useCallback, useEffect } from 'react';
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
// Fixed: Added 7th KEEP value for FB Subscriptions (assumed 70% keep due to Meta fees)
const KEEP        = [0.85, 0.90, 0.90, 0.90, 0.90, 0.80, 0.70];
const MILESTONES  = { 2: '$2k MRR', 4: 'Platform Expansion', 9: '$25k MRR' };
const REV_LABELS  = ['Fanvue', 'Passes', 'PPV+Voice', 'Telegram', 'Brand Deals', 'IG Subs', 'FB Subs'];
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
    // Fixed: Added row.fb_subs to revenue array
    const rArr  = [row.fanvue, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs, row.fb_subs || 0];
    const cArr  = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.meta_ads, row.research, row.buffer, row.calilio, row.namecheap, row.later_com];
    const gross = rArr.reduce((a, b) => a + b, 0);
    const net   = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    const cuts  = gross - net;
    const costs = cArr.reduce((a, b) => a + b, 0);
    return { ...row, rArr, cArr, gross, net, cuts, costs, profit: net - costs };
  });
}

// ── LIGHT PREMIUM THEME ────────────────────────────────────────────────────────
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
};

const S = {
  page:      { background: C.pageBg, color: C.textPri, fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', padding: '0 0 100px', scrollBehavior: 'smooth' },
  hero:      { height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: `radial-gradient(circle at 50% 50%, rgba(9, 105, 218, 0.05) 0%, transparent 70%)`, padding: '0 20px' },
  section:   { maxWidth: 1200, margin: '80px auto 0', padding: '0 20px' },
  card:      { background: C.cardBg, border: `1px solid ${C.cardBdr}`, borderRadius: 16, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(140,149,159,0.12)', marginBottom: 24 },
  h1:        { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 16, background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' },
  h2:        { fontSize: 28, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 },
  tag:       { fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: C.blue, marginBottom: 16 },
  p:         { fontSize: 17, color: C.textSec, lineHeight: 1.6, maxWidth: 700, margin: '0 auto 24px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 },
  statBox:   { padding: 24, borderRadius: 12, border: `1px solid ${C.cardBdr}`, background: '#f6f8fa' },
  grid2:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 },
};

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

  const mainChartData = {
    labels: months,
    datasets: [
      { label: 'Gross Revenue', data: grossRev,   borderColor: C.blue,   backgroundColor: 'rgba(9,105,218,0.05)',  borderWidth: 3, pointBackgroundColor: C.blue,   pointBorderColor: '#fff', pointRadius: 5, fill: false, tension: 0.4 },
      { label: 'Net Profit',    data: netProfit,  borderColor: C.green,  backgroundColor: 'rgba(26,127,55,0.1)',   borderWidth: 4, pointBackgroundColor: C.green,  pointBorderColor: '#fff', pointRadius: 6, fill: true,  tension: 0.4 },
    ],
  };

  const mainChartOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: { legend: { display: false }, tooltip: { enabled: false, external: externalTooltip } },
    scales: {
      x: { ticks: { color: C.textSec }, grid: { color: C.grid } },
      y: { ticks: { color: C.textSec, callback: v => fL(v) }, grid: { color: C.grid } },
    },
  };

  return (
    <div style={S.page}>
      {/* 1. HERO / VISION */}
      <section style={S.hero}>
        <div style={S.tag}>The Future of Influence</div>
        <h1 style={S.h1}>Industrializing Digital Identity</h1>
        <p style={S.p}>
          Building the world's most scalable Virtual Influencer Infrastructure. 
          Deploying proprietary AI identities into high-liquid G7 markets to capture Tier-1 ARPU at near-zero marginal cost.
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{ padding: '12px 24px', borderRadius: 8, background: C.blue, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>View Opportunity</button>
          <a href="/graph.html" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', borderRadius: 8, border: `1px solid ${C.cardBdr}`, color: C.textPri, fontWeight: 600, textDecoration: 'none' }}>🔗 Knowledge Graph</a>
          <a href="#financials" style={{ padding: '12px 24px', borderRadius: 8, border: `1px solid ${C.cardBdr}`, color: C.textPri, fontWeight: 600, textDecoration: 'none' }}>Live P&L</a>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION */}
      <section style={S.section}>
        <div style={S.grid2}>
          <div style={S.card}>
            <div style={{ ...S.tag, color: C.red }}>The Problem</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>The "Human Factor" Barrier</h3>
            <ul style={{ color: C.textSec, paddingLeft: 20, lineHeight: 2 }}>
              <li>Fragile: PR scandals and "cancel culture"</li>
              <li>Limited: Human burnout prevents 24/7 output</li>
              <li>Expensive: High lifestyle OpEx and commission</li>
              <li>Untransferable: Brand equity tied to a physical body</li>
            </ul>
          </div>
          <div style={S.card}>
            <div style={{ ...S.tag, color: C.green }}>The AI Solution</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Sovereign AI Identities</h3>
            <ul style={{ color: C.textSec, paddingLeft: 20, lineHeight: 2 }}>
                <li><strong>Immortality:</strong> Do not age, do not tire, do not retire</li>
                <li><strong>Consistency:</strong> 100% brand control and safety</li>
                <li><strong>Omnipresent:</strong> Perpetual 24/7 content generation</li>
                <li><strong>Asset Value:</strong> IP ownership remains in-house</li>
              </ul>
          </div>
        </div>
      </section>

      {/* 3. MARKET & GEOGRAPHY */}
      <section style={S.section}>
        <div style={S.card}>
          <h2 style={S.h2}><span style={{ color: C.orange }}>📍</span> Target Geography: Tier 1 Focus</h2>
          <div style={S.grid2}>
            <div>
              <p style={{ ...S.p, margin: '0 0 16px', textAlign: 'left' }}>
                We avoid low-ARPU markets. Our growth engine is laser-focused on <strong>US, UK, Europe, and Australia</strong>.
              </p>
              <div style={{ background: 'rgba(56, 185, 80, 0.1)', borderLeft: `3px solid ${C.green}`, padding: '8px 12px', marginBottom: 16, fontSize: 13 }}>
                <strong style={{ color: C.green }}>Market Opportunity:</strong> The Indian market is currently <strong>2 years behind the US</strong> – creating a distinct first-mover advantage for Tier-1 arbitrage.
              </div>
              <table style={{ width: '100%', fontSize: 13, color: C.textSec }}>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${C.grid}` }}><td style={{ padding: '8px 0' }}>Annual Yield / Sub (US/UK)</td><td style={{ textAlign: 'right', color: C.green }}>$400 - $600</td></tr>
                  <tr style={{ borderBottom: `1px solid ${C.grid}` }}><td style={{ padding: '8px 0' }}>Annual Yield / Sub (India)</td><td style={{ textAlign: 'right', color: C.red }}>$45 - $60</td></tr>
                  <tr><td style={{ padding: '8px 0' }}>Spending Power Multiple</td><td style={{ textAlign: 'right', color: C.blue, fontWeight: 700 }}>~8x - 10x Revenue Gap</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{ background: '#f6f8fa', padding: 20, borderRadius: 12, border: `1px solid ${C.cardBdr}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Distribution Strategy</div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: C.textSec, lineHeight: 1.8 }}>
                <li><strong>English Primary:</strong> Targeted SFW/NSFW funnels in G7 languages.</li>
                <li><strong>Tier 1 Subs:</strong> Pricing modeled on $10-$20 USD subscription tiers.</li>
                <li><strong>Meta Ads:</strong> Geo-fenced targeting for highest-converting regions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINANCIALS (LIT UP) */}
      <section id="financials" style={S.section}>
        <SectionLabel text="Phase 1: Single Influencer Projection" />
        <div style={S.statsGrid}>
          {[
            { label: 'Year 1 Gross Revenue', val: T.gross, color: C.blue, sub: '7 Combined Revenue Streams' },
            { label: 'Year 1 Net Profit', val: T.profit, color: C.green, sub: 'After all platform fees & OpEx' },
            { label: 'Cumulative Margin', val: ((T.profit / T.gross) * 100).toFixed(1) + '%', color: C.accent, sub: 'Efficiency of AI production' },
            { label: 'Est. Scaling Ceiling', val: '₹1Cr+', color: C.orange, sub: 'Single influencer capacity' },
          ].map(c => (
            <div key={c.label} style={S.statBox}>
              <div style={{ fontSize: 11, color: C.textSec, textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: c.color }}>{typeof c.val === 'number' ? fL(c.val) : c.val}</div>
              <div style={{ fontSize: 10, color: C.textMut, marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 20 }}>REVENUE & PROFIT GROWTH (MO 1-12)</div>
          <div style={{ height: 400 }}>
            <Line data={mainChartData} options={mainChartOpts} />
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 12, color: C.textSec }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: C.blue }} /> Gross Revenue</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: C.green }} /> Net Profit</div>
          </div>
        </div>
      </section>

      {/* 5. THE SCALE ENGINE */}
      <section style={S.section}>
        <div style={{ ...S.card, border: `1px solid ${C.accent}44`, background: `linear-gradient(180deg, ${C.cardBg}, rgba(130, 80, 223, 0.05))` }}>
          <h2 style={S.h2}><span style={{ color: C.accent }}>🚀</span> Professional Scaling — The Multiplier Effect</h2>
          <p style={{ ...S.p, textAlign: 'left', maxWidth: 'none' }}>
            We don't build projects. We build <strong>blueprints</strong>. Every operational cost added for a new influencer is sub-linear compared to the revenue growth.
          </p>
          <div style={S.grid2}>
            <div style={{ background: '#f6f8fa', padding: 24, borderRadius: 16, border: `1px solid ${C.cardBdr}` }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.accent }}>10x</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Scale Potential (Year 2)</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>By replicating this model across 10 distinct AI identities with unique niches.</div>
            </div>
            <div style={{ background: '#f6f8fa', padding: 24, borderRadius: 16, border: `1px solid ${C.cardBdr}` }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.green }}>~₹10Cr+</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Projected Infrastructure Revenue</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>Leveraging the same infrastructure, prompts, and pipeline across the portfolio.</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOATS */}
      <section style={S.section}>
        <div style={{ ...S.card, border: `1px solid ${C.blue}44` }}>
          <h2 style={S.h2}><span style={{ color: C.blue }}>🛡️</span> The Seven Moats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { t: "Proprietary Data", d: "Custom character bibles & high-yield training assets." },
              { t: "Structural Consistency", d: "Fixed identity across 12-month content runways." },
              { t: "Sub-linear OpEx", d: "90% lower marginal production costs than human peers." },
              { t: "24/7 Omni-presence", d: "Automated distribution & infinite content output." },
              { t: "Tier-1 Arbitrage", d: "Targeting high-ARPU markets (US/UK) from day one." },
              { t: "Eternal IP", d: "Zero churn risk; the influencer never leaves or retires." },
              { t: "Algorithmic Feedback", d: "AI character refinement based on real-time data." }
            ].map((m, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, border: `1px solid ${C.grid}`, background: '#f6f8fa' }}>
                <div style={{ color: C.blue, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Moat {i+1}: {m.t}</div>
                <div style={{ color: C.textSec, fontSize: 12 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECH MOAT & PLATFORMS */}
      <section style={S.section}>
        <div style={S.grid2}>
          <div style={S.card}>
             <div style={S.cardTitle}>Execution Pipeline</div>
             <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: C.textSec, lineHeight: 2.2 }}>
                <li><strong>Grok-2 / Colab:</strong> Character Bible & High-Yield Image Gen</li>
                <li><strong>Flux.1 LoRA:</strong> Consistent Face/Body lock across platforms</li>
                <li><strong>ElevenLabs:</strong> 11-Voice synthesis for high-engagement Voice DMs</li>
                <li><strong>Higgsfield / Kling:</strong> AI Motion for Viral Video Reels</li>
                <li><strong>Manual QC:</strong> Human-in-the-loop for 100% aesthetic perfection</li>
             </ul>
          </div>
          <div style={S.card}>
             <div style={S.cardTitle}>Launch Platforms (7 Streams)</div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: C.textSec, lineHeight: 2 }}>
                 <li><strong style={{ color: C.green }}>Fanvue</strong> (Global Sub)</li>
                 <li><strong style={{ color: C.green }}>Passes</strong> (Mirror Sub)</li>
                 <li><strong style={{ color: C.green }}>PPV / Voice</strong> (PPV)</li>
                 <li><strong style={{ color: C.green }}>FB Subs</strong> (Social Sub)</li>
               </ul>
               <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: C.textSec, lineHeight: 2 }}>
                 <li><strong style={{ color: C.blue }}>Instagram</strong> (Marketing)</li>
                 <li><strong style={{ color: C.blue }}>X/Twitter</strong> (Marketing)</li>
                 <li><strong style={{ color: C.green }}>Telegram VIP</strong> (High Tier)</li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 7. DETAILED BREAKDOWN (TABLE) */}
      <section style={S.section}>
        <SectionLabel text="Investor Audit: Month-by-Month Full Breakdown" />
        <PLTable rows={rows} grossRev={grossRev} netRev={netRev} platCuts={platCuts} totalCosts={totalCosts} netProfit={netProfit} cumulative={cumulative} T={T} />
      </section>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', marginTop: 100, color: C.textMut, fontSize: 12 }}>
        Confidential — Virtual Influencer Infrastructure Investor Pitch v1.0
      </div>

      {ttip && <ChartTooltip ttip={ttip} i={ttip.i} grossRev={grossRev} platCuts={platCuts} netRev={netRev} totalCosts={totalCosts} netProfit={netProfit} cumulative={cumulative} months={months} />}
    </div>
  );
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.textMut, textTransform: 'uppercase', letterSpacing: '2px', margin: '40px 0 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
      {text}
      <div style={{ flex: 1, height: 1, background: C.grid }} />
    </div>
  );
}

function PLTable({ rows, grossRev, netRev, platCuts, totalCosts, netProfit, cumulative, T }) {
  const totRev  = Array(REV_LABELS.length).fill(0);
  const totCost = Array(COST_LABELS.length).fill(0);
  rows.forEach(r => { r.rArr.forEach((v, j) => { totRev[j] += v; }); r.cArr.forEach((v, j) => { totCost[j] += v; }); });

  return (
    <div style={{ overflowX: 'auto', borderRadius: 16, border: `1px solid ${C.cardBdr}`, background: C.cardBg }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 1100, fontSize: 12 }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
            <th style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${C.cardBdr}` }}>Month</th>
            <th style={{ padding: '16px', textAlign: 'right', borderBottom: `1px solid ${C.cardBdr}`, color: C.blue }}>Gross Revenue</th>
            <th style={{ padding: '16px', textAlign: 'right', borderBottom: `1px solid ${C.cardBdr}`, color: C.orange }}>Platform Fees</th>
            <th style={{ padding: '16px', textAlign: 'right', borderBottom: `1px solid ${C.cardBdr}`, color: C.green }}>Net Profit</th>
            <th style={{ padding: '16px', textAlign: 'right', borderBottom: `1px solid ${C.cardBdr}`, color: C.blue }}>Cumulative</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.month} style={{ borderBottom: `1px solid ${C.grid}` }}>
              <td style={{ padding: '12px 16px', color: C.textPri, fontWeight: 600 }}>{row.label}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', color: C.textSec }}>{fi(row.gross)}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', color: C.orange }}>{fi(row.cuts)}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', color: C.green, fontWeight: 700 }}>{fi(row.profit)}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', color: C.textPri }}>{fi(cumulative[i])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ background: 'rgba(88,166,255,0.05)' }}>
          <tr>
            <td style={{ padding: '16px', fontWeight: 800 }}>TOTAL EARNINGS</td>
            <td style={{ padding: '16px', textAlign: 'right', color: C.blue, fontWeight: 800 }}>{fL(T.gross)}</td>
            <td style={{ padding: '16px', textAlign: 'right', color: C.orange }}>{fL(T.gross - T.net)}</td>
            <td style={{ padding: '16px', textAlign: 'right', color: C.green, fontWeight: 800 }}>{fL(T.profit)}</td>
            <td style={{ padding: '16px', textAlign: 'right', fontWeight: 800 }}>{fL(T.profit)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function ChartTooltip({ ttip, i, grossRev, platCuts, netRev, totalCosts, netProfit, cumulative, months }) {
  const p = netProfit[i]; const isLoss = p < 0; 
  return (
    <div style={{ position: 'absolute', left: Math.min(ttip.x + 14, (typeof window !== 'undefined' ? window.innerWidth : 800) - 260), top: ttip.y - 10, background: '#fff', border: `1px solid ${C.cardBdr}`, borderRadius: 12, padding: '14px 16px', zIndex: 9999, minWidth: 230, pointerEvents: 'none', boxShadow: '0 8px 24px rgba(140,149,159,0.2)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textPri, marginBottom: 10 }}>Month {i + 1} &nbsp;·&nbsp; <span style={{ color: C.blue }}>{months[i]}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 11, color: C.textSec }}>Gross Revenue</span><span style={{ fontSize: 12, color: C.blue }}>{fi(grossRev[i])}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 11, color: C.textSec }}>Net Profit</span><span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{fi(p)}</span></div>
      <div style={{ height: 1, background: C.grid, margin: '10px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 11, color: C.textSec }}>Cumulative Total</span><span style={{ fontSize: 12, color: C.textPri }}>{fi(cumulative[i])}</span></div>
    </div>
  );
}
