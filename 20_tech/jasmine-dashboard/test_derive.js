import { FALLBACK_DATA } from './lib/fallback-data.js';

const KEEP = [0.85, 0.60, 0.90, 0.90, 0.90, 0.90, 0.80, 0.70];

function deriveRows(data) {
  return data.map(row => {
    const rArr  = [row.fanvue, row.room11 || 0, row.passes, row.ppv_voice, row.telegram, row.brand, row.ig_subs, row.fb_subs || 0];
    const cArr  = [row.higgsfield, row.elevenlabs, row.grok, row.claude_code, row.meta_ads, row.research, row.buffer, row.calilio, row.namecheap, row.spicychat, row.carrd];
    const gross = rArr.reduce((a, b) => a + b, 0);
    const net   = rArr.reduce((s, v, i) => s + v * KEEP[i], 0);
    const cuts  = gross - net;
    const costs = cArr.reduce((a, b) => a + b, 0);
    return { costs, cArr };
  });
}

console.log(deriveRows(FALLBACK_DATA)[0]);
