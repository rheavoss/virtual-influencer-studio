'use client';
import { useState, useMemo } from 'react';
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

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const KEEP = [0.85, 0.90, 0.90, 0.90, 0.90, 0.80]; // fanvue, passes, ppvVoice, telegram, brand, igSubs
const MILESTONES = { 2: '$2k MRR', 4: 'IG Sub', 9: '$20k MRR' };
const REV_LABELS  = ['Fanvue', 'Passes', 'PPV+Voice', 'Telegram', 'Brand Deals', 'IG Subs ₹200'];
const COST_LABELS = ['Higgsfield', 'ElevenLabs', 'Grok', 'Claude ×2', 'Meta Ads', 'Research', 'Buffer'];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fi = v => '₹' + Math.round(v).toLocaleString('en-IN');
const fL = v => {
  if (v >= 10000000) return '₹' + (v / 10000000).toFixed(2) + 'Cr';
  if (v >= 100000)   return '₹' + (v / 100000).toFixed(2) + 'L';
  return '₹' + (v / 1000).toFixed(1) + 'K';
};

function deriveRows(data) {
  return data.map(row => {
    const rArr = [row.fanvue, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs];
    const cArr = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.meta_ads, row.research, row.buffer];
    const gross  = rArr.reduce((a, b) => a + b, 0);
    const net    = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    const cuts   = gross - net;
    const costs  = cArr.reduce((a, b) => a + b, 0);
    const profit = net - costs;
    return { ...row, rArr, cArr, gross, net, cuts, costs, profit };
  });
}

// ── MILESTONE PLUGIN ─────────────────────────────────────────────────────────
const milestonePlugin = {
  id: 'ml',
  afterDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    Object.entries(MILESTONES).forEach(([idx, label]) => {
      const px = x.getPixelForIndex(+idx);
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(px, y.top + 16);
      ctx.lineTo(px, y.bottom);
      ctx.strokeStyle = 'rgba(240,136,62,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f0883e';
      ctx.globalAlpha = 0.8;
      ctx.font = '10px Segoe UI, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, px, y.top + 12);
      ctx.restore();
    });
  },
};

// ── STYLES (inline — no external CSS required) ────────────────────────────────
const S = {
  page:     { background: '#0d1117', color: '#e6edf3', fontFamily: "'Segoe UI',system-ui,sans-serif", minHeight: '100vh', padding: '20px 16px' },
  h1:       { textAlign: 'center', fontSize: 20, color: '#58a6ff', marginBottom: 4 },
  sub:      { textAlign: 'center', color: '#6e7681', fontSize: 12, marginBottom: 20 },
  stats:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10, marginBottom: 20 },
  statBase: { background: '#161b22', border: '1px solid #30363d', borderRadius: 10, padding: '14px 16px' },
  statGreen:{ background: '#161b22', border: '1px solid #238636', borderRadius: 10, padding: '14px 16px' },
  statLbl:  { fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 },
  tabs:     { display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid #30363d' },
  tabBase:  { background: 'none', border: 'none', color: '#8b949e', padding: '10px 20px', cursor: 'pointer', fontSize: 14, borderBottom: '2px solid transparent', marginBottom: -1 },
  tabActive:{ background: 'none', border: 'none', color: '#58a6ff', padding: '10px 20px', cursor: 'pointer', fontSize: 14, borderBottom: '2px solid #58a6ff', marginBottom: -1 },
  card:     { background: '#161b22', border: '1px solid #30363d', borderRadius: 10, padding: 20, marginBottom: 16 },
  cardTitle:{ fontSize: 14, color: '#8b949e', marginBottom: 14, fontWeight: 600 },
  note:     { background: '#1c2128', border: '1px solid #30363d', borderRadius: 8, padding: '10px 14px', fontSize: 11, color: '#8b949e', marginBottom: 16, lineHeight: 1.6 },
  legend:   { display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 },
  legItem:  { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8b949e' },
  dot:      { width: 9, height: 9, borderRadius: '50%', flexShrink: 0 },
  dsh:      { width: 18, height: 2, flexShrink: 0, background: 'repeating-linear-gradient(90deg,rgba(248,81,73,.7) 0 4px,transparent 4px 8px)' },
  tblOuter: { overflowX: 'auto', borderRadius: 10, border: '1px solid #30363d' },
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PLDashboard({ data }) {
  const [tab, setTab] = useState('charts');
  const rows = useMemo(() => deriveRows(data), [data]);

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

  // Tooltip factory
  const makeTooltip = () => ({
    backgroundColor: '#1c2128',
    borderColor: '#30363d',
    borderWidth: 1,
    titleColor: '#e6edf3',
    titleFont: { size: 13, weight: '700' },
    bodyColor: '#8b949e',
    bodyFont: { size: 12 },
    padding: 14,
    callbacks: {
      title: items => {
        const i = items[0].dataIndex;
        const ms = MILESTONES[i] ? ` — ${MILESTONES[i]}` : '';
        return `Month ${i + 1}${ms}`;
      },
      beforeBody: () => '',
      label: ctx => {
        const i = ctx.dataIndex;
        if (ctx.datasetIndex === 0) return [
          `  Gross Revenue :  ${fi(grossRev[i])}`,
          `  Platform Cuts :  ${fi(platCuts[i])}`,
          `  Net Revenue   :  ${fi(netRev[i])}`,
        ];
        if (ctx.datasetIndex === 2) return [
          `  Net Profit    :  ${fi(netProfit[i])}`,
          `  Cumulative    :  ${fi(cumulative[i])}`,
        ];
        return null;
      },
      afterBody: items => {
        const i = items[0].dataIndex;
        return ['  ─────────────────────────', `  Total Costs   :  ${fi(totalCosts[i])}`];
      },
    },
  });

  const mainChartData = {
    labels: months,
    datasets: [
      { label: 'Gross Revenue', data: grossRev,   borderColor: '#58a6ff', backgroundColor: 'rgba(88,166,255,.05)', borderWidth: 2, pointBackgroundColor: '#58a6ff',           pointBorderColor: '#0d1117', pointBorderWidth: 1.5, pointRadius: 5, pointHoverRadius: 9, fill: false, tension: 0.35 },
      { label: 'Net Revenue',   data: netRev,     borderColor: '#f0883e', backgroundColor: 'rgba(240,136,62,.05)', borderWidth: 2, pointBackgroundColor: '#f0883e',           pointBorderColor: '#0d1117', pointBorderWidth: 1.5, pointRadius: 4, pointHoverRadius: 8, fill: false, tension: 0.35 },
      { label: 'Net Profit',    data: netProfit,  borderColor: '#3fb950', backgroundColor: 'rgba(63,185,80,.12)',  borderWidth: 3, pointBackgroundColor: '#3fb950',           pointBorderColor: '#0d1117', pointBorderWidth: 1.5, pointRadius: 5, pointHoverRadius: 9, fill: true,  tension: 0.35 },
      { label: 'Total Costs',   data: totalCosts, borderColor: 'rgba(248,81,73,.6)', backgroundColor: 'rgba(248,81,73,.06)', borderWidth: 1.5, borderDash: [5, 5], pointBackgroundColor: 'rgba(248,81,73,.6)', pointRadius: 3, pointHoverRadius: 5, fill: true, tension: 0.1 },
    ],
  };

  const mainChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: { legend: { display: false }, tooltip: makeTooltip() },
    scales: {
      x: { ticks: { color: '#8b949e', font: { size: 12 } }, grid: { color: '#21262d' }, border: { color: '#30363d' } },
      y: { ticks: { color: '#8b949e', font: { size: 11 }, callback: v => fL(v), maxTicksLimit: 7 }, grid: { color: '#21262d' }, border: { color: '#30363d' } },
    },
  };

  const cumulData = {
    labels: months,
    datasets: [{
      label: 'Cumulative Net Profit',
      data: cumulative,
      borderColor: '#3fb950',
      backgroundColor: 'rgba(63,185,80,.15)',
      borderWidth: 2.5,
      pointBackgroundColor: months.map((_, i) => i === months.length - 1 ? '#3fb950' : 'rgba(63,185,80,.6)'),
      pointBorderColor: '#0d1117',
      pointBorderWidth: 1.5,
      pointRadius: months.map((_, i) => i === months.length - 1 ? 7 : 4),
      fill: true,
      tension: 0.4,
    }],
  };

  const cumulOpts = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1c2128', borderColor: '#30363d', borderWidth: 1,
        titleColor: '#e6edf3', bodyColor: '#8b949e', padding: 12,
        callbacks: {
          title: items => `Month ${items[0].dataIndex + 1}`,
          label: ctx => `  Cumulative Profit: ${fi(ctx.parsed.y)}  (${fL(ctx.parsed.y)})`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#8b949e', font: { size: 12 } }, grid: { color: '#21262d' }, border: { color: '#30363d' } },
      y: { ticks: { color: '#8b949e', font: { size: 11 }, callback: v => fL(v), maxTicksLimit: 6 }, grid: { color: '#21262d' }, border: { color: '#30363d' } },
    },
  };

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Jasmine — 12-Month P&amp;L Dashboard</h1>
      <div style={S.sub}>All values in INR · ₹84 = $1 USD · IG subscription ₹200/mo launches at M4 (10k followers)</div>

      {/* STAT CARDS */}
      <div style={S.stats}>
        {[
          { label: '12M Gross Revenue', val: T.gross,  cls: '#58a6ff', sub: 'Before platform cuts' },
          { label: '12M Net Revenue',   val: T.net,    cls: '#3fb950', sub: 'After all platform fees' },
          { label: '12M Total Costs',   val: T.costs,  cls: '#f85149', sub: 'Tools + Ads + Research' },
          { label: '12M Net Profit',    val: T.profit, cls: '#3fb950', sub: 'Money in your pocket', green: true },
        ].map(c => (
          <div key={c.label} style={c.green ? S.statGreen : S.statBase}>
            <div style={S.statLbl}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.cls }}>{fL(c.val)}</div>
            <div style={{ fontSize: 11, color: '#6e7681', marginTop: 3 }}>{fi(c.val)} · {c.sub}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div style={S.tabs}>
        <button style={tab === 'charts' ? S.tabActive : S.tabBase} onClick={() => setTab('charts')}>Charts</button>
        <button style={tab === 'table'  ? S.tabActive : S.tabBase} onClick={() => setTab('table')}>Full Breakdown</button>
      </div>

      {/* CHARTS TAB */}
      {tab === 'charts' && (
        <div>
          <div style={S.note}>
            <span style={{ color: '#3fb950' }}>▲ M3</span> $2k MRR milestone &nbsp;·&nbsp;
            <span style={{ color: '#3fb950' }}>▲ M5</span> $5k MRR &nbsp;·&nbsp;
            <span style={{ color: '#58a6ff' }}>★ M4</span> Instagram ₹200 subscription launches &nbsp;·&nbsp;
            <span style={{ color: '#3fb950' }}>▲ M10</span> $20k MRR &nbsp;·&nbsp;
            <span style={{ color: '#f0883e' }}>Hover</span> over graph for full monthly detail
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>Monthly Revenue &amp; Profit</div>
            <div style={{ height: 320, position: 'relative' }}>
              <Line data={mainChartData} options={mainChartOpts} plugins={[milestonePlugin]} />
            </div>
            <div style={S.legend}>
              <div style={S.legItem}><div style={{ ...S.dot, background: '#58a6ff' }} />Gross Revenue</div>
              <div style={S.legItem}><div style={{ ...S.dot, background: '#f0883e' }} />Net Revenue (after platform cuts)</div>
              <div style={S.legItem}><div style={{ ...S.dot, background: '#3fb950' }} />Net Profit (after all costs)</div>
              <div style={S.legItem}><div style={S.dsh} />Total Costs</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>Cumulative Net Profit (Running Total)</div>
            <div style={{ height: 220, position: 'relative' }}>
              <Line data={cumulData} options={cumulOpts} />
            </div>
          </div>
        </div>
      )}

      {/* TABLE TAB */}
      {tab === 'table' && (
        <div>
          <div style={S.note}>
            Milestone months highlighted in green &nbsp;·&nbsp;
            Platform cuts: Fanvue 15% · Passes/PPV/Telegram/Brand 10% · Instagram 20% &nbsp;·&nbsp;
            IG subscription (₹200/mo) active from M4 when Instagram crosses 10,000 followers
          </div>
          <PLTable rows={rows} grossRev={grossRev} netRev={netRev} platCuts={platCuts} totalCosts={totalCosts} netProfit={netProfit} cumulative={cumulative} T={T} />
        </div>
      )}
    </div>
  );
}

// ── TABLE SUB-COMPONENT ───────────────────────────────────────────────────────
function PLTable({ rows, grossRev, netRev, platCuts, totalCosts, netProfit, cumulative, T }) {
  const mileSet = new Set([2, 4, 9]); // 0-indexed

  // Column totals
  const totRev  = Array(REV_LABELS.length).fill(0);
  const totCost = Array(COST_LABELS.length).fill(0);
  rows.forEach(r => {
    r.rArr.forEach((v, j) => { totRev[j]  += v; });
    r.cArr.forEach((v, j) => { totCost[j] += v; });
  });

  const thS = (bg, col) => ({ background: bg, color: col, padding: '8px 10px', textAlign: 'right', whiteSpace: 'nowrap', border: 'none', borderBottom: '1px solid #21262d', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 });
  const tdS = (col, bold) => ({ color: col, padding: '8px 10px', textAlign: 'right', whiteSpace: 'nowrap', borderBottom: '1px solid #21262d', fontWeight: bold ? 700 : 400 });

  return (
    <div style={S.tblOuter}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 1200, fontSize: 12 }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ ...thS('#0d1117', '#e6edf3'), textAlign: 'left', position: 'sticky', left: 0, zIndex: 2 }}>Month</th>
            <th colSpan={REV_LABELS.length} style={thS('#0d2a12', '#3fb950')}>Revenue Streams (Gross ₹)</th>
            <th style={thS('#0d2a12', '#3fb950')}>Gross Total</th>
            <th style={thS('#2d1214', '#f0883e')}>Platform Cuts</th>
            <th style={thS('#0d2a12', '#3fb950')}>Net Revenue</th>
            <th colSpan={COST_LABELS.length} style={thS('#2d1214', '#f85149')}>Cost Line Items (₹)</th>
            <th style={thS('#2d1214', '#f85149')}>Total Costs</th>
            <th style={thS('#101c30', '#58a6ff')}>Net Profit</th>
            <th style={thS('#101c30', '#58a6ff')}>Cumulative</th>
          </tr>
          <tr>
            {REV_LABELS.map(l  => <th key={l} style={thS('#0d2a12', '#3fb950')}>{l}</th>)}
            <th style={thS('#0d2a12', '#3fb950')} />
            <th style={thS('#2d1214', '#f0883e')} />
            <th style={thS('#0d2a12', '#3fb950')} />
            {COST_LABELS.map(l => <th key={l} style={thS('#2d1214', '#f85149')}>{l}</th>)}
            <th style={thS('#2d1214', '#f85149')} />
            <th style={thS('#101c30', '#58a6ff')} />
            <th style={thS('#101c30', '#58a6ff')} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isMile = mileSet.has(i);
            const bg = isMile ? '#0d2a1a' : 'transparent';
            const td = (val, col, bold, zero) => (
              <td style={{ ...tdS(col, bold), background: bg }}>{zero && !val ? '—' : fi(val)}</td>
            );
            return (
              <tr key={row.month}>
                <td style={{ ...tdS(isMile ? '#3fb950' : '#e6edf3', isMile), background: '#161b22', position: 'sticky', left: 0, zIndex: 1, textAlign: 'left' }}>{row.label}</td>
                {row.rArr.map((v, j) => <td key={j} style={{ ...tdS('#3fb950', false), background: bg }}>{v ? fi(v) : '—'}</td>)}
                <td style={{ ...tdS('#3fb950', true), background: bg }}>{fi(grossRev[i])}</td>
                <td style={{ ...tdS('#f0883e', false), background: bg }}>{fi(platCuts[i])}</td>
                <td style={{ ...tdS('#3fb950', true), background: bg }}>{fi(netRev[i])}</td>
                {row.cArr.map((v, j) => <td key={j} style={{ ...tdS('#f85149', false), background: bg }}>{v ? fi(v) : '—'}</td>)}
                <td style={{ ...tdS('#f85149', true), background: bg }}>{fi(totalCosts[i])}</td>
                <td style={{ ...tdS(netProfit[i] >= 0 ? '#58a6ff' : '#f85149', true), background: bg }}>{fi(netProfit[i])}</td>
                <td style={{ ...tdS('#58a6ff', true), background: bg }}>{fi(cumulative[i])}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ background: '#1c2128' }}>
            <td style={{ ...tdS('#e6edf3', true), background: '#1c2128', position: 'sticky', left: 0, textAlign: 'left', borderTop: '2px solid #30363d' }}>TOTAL</td>
            {totRev.map((v, j)  => <td key={j} style={{ ...tdS('#3fb950', false), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(v)}</td>)}
            <td style={{ ...tdS('#3fb950', true), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(grossRev.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS('#f0883e', false), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(platCuts.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS('#3fb950', true), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(netRev.reduce((a,b)=>a+b,0))}</td>
            {totCost.map((v, j) => <td key={j} style={{ ...tdS('#f85149', false), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(v)}</td>)}
            <td style={{ ...tdS('#f85149', true), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(totalCosts.reduce((a,b)=>a+b,0))}</td>
            <td style={{ ...tdS('#58a6ff', true), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(T.profit)}</td>
            <td style={{ ...tdS('#58a6ff', true), background: '#1c2128', borderTop: '2px solid #30363d' }}>{fi(T.profit)}</td>
          </tr>
          <tr>
            <td colSpan={REV_LABELS.length + 4} style={{ color: '#6e7681', fontSize: 11, padding: '6px 10px', background: '#161b22' }}>
              Gross {fL(T.gross)} → After platform cuts {fL(T.net)} → After all costs <strong style={{ color: '#3fb950' }}>{fL(T.profit)}</strong>
            </td>
            <td colSpan={COST_LABELS.length + 3} style={{ background: '#161b22' }} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
