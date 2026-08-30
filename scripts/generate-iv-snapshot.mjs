#!/usr/bin/env node
/**
 * Validates or generates SPY implied-vol snapshot JSON (offline, Yahoo-style demo data).
 * Live export: run scripts/export-iv-snapshot.py when ivsurface + yfinance are available.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'data', 'dashboards', 'implied-vol');
const outFile = path.join(outDir, 'spy.json');

function demoMarketFields(pt, spot) {
  const t = 0.06;
  const mid = Math.max(0.05, pt.iv * spot * Math.sqrt(t) * 0.04);
  const spread = Math.max(0.01, mid * 0.08);
  const seed = Math.floor(pt.strike * 100) % 10000;
  return {
    bid: Math.round((mid - spread / 2) * 100) / 100,
    ask: Math.round((mid + spread / 2) * 100) / 100,
    openInterest: 500 + seed * 3,
    volume: 50 + (seed % 500),
    optionType: pt.moneyness >= 1 ? 'call' : 'put',
  };
}

function ensureDemoMarketFields(snapshot) {
  const spot = snapshot.metadata.spot;
  for (const slice of snapshot.slices) {
    slice.ivPoints = slice.ivPoints.map((pt) =>
      pt.bid != null ? pt : { ...pt, ...demoMarketFields(pt, spot) }
    );
  }
  if (snapshot.metadata.realizedVol20d == null) {
    snapshot.metadata.realizedVol20d = 0.118;
  }
  return snapshot;
}

function buildDemoSnapshot() {
  const spot = 580;
  const asOf = new Date().toISOString().slice(0, 10);
  const expiries = [
    { expiry: '2026-09-19', daysToExpiry: 20 },
    { expiry: '2026-10-17', daysToExpiry: 48 },
    { expiry: '2026-11-21', daysToExpiry: 83 },
    { expiry: '2026-12-19', daysToExpiry: 111 },
  ];

  const slices = expiries.map(({ expiry, daysToExpiry }) => {
    const atmIv = 0.14 + daysToExpiry * 0.00015;
    const ivPoints = [];
    for (let m = 0.85; m <= 1.15; m += 0.025) {
      const skew = -0.08 * (m - 1) ** 2 - 0.12 * (m - 1);
      const base = {
        strike: Math.round(spot * m * 100) / 100,
        moneyness: Math.round(m * 1000) / 1000,
        iv: Math.round((atmIv + skew) * 10000) / 10000,
      };
      ivPoints.push({ ...base, ...demoMarketFields(base, spot) });
    }
    return {
      expiry,
      daysToExpiry,
      ivPoints,
      ssvi: { rho: -0.35, eta: 0.45, gamma: 0.5, m: 0.0, sigma: atmIv },
    };
  });

  return {
    metadata: {
      symbol: 'SPY',
      spot,
      asOf,
      fetchedAt: new Date().toISOString(),
      source: 'Yahoo Finance (delayed, demo snapshot)',
      sourceDisclaimer:
        'Educational demo only. Data may be delayed ~15 min. Not investment advice.',
      realizedVol20d: 0.118,
    },
    slices,
  };
}

function tryPythonExport() {
  const pyScript = path.join(__dirname, 'export-iv-snapshot.py');
  if (!fs.existsSync(pyScript)) return false;
  const result = spawnSync('python', [pyScript], { cwd: root, encoding: 'utf-8', timeout: 120_000 });
  if (result.status === 0 && fs.existsSync(outFile)) {
    console.log('Python export succeeded.');
    return true;
  }
  if (result.stderr) console.warn(result.stderr.slice(0, 500));
  return false;
}

const ivNode = await import(
  pathToFileURL(path.join(__dirname, 'lib', 'iv-snapshot-node.mjs')).href
);

fs.mkdirSync(outDir, { recursive: true });

const usePython = process.env.IV_EXPORT === '1' || process.argv.includes('--export');
if (usePython && tryPythonExport()) {
  const raw = JSON.parse(fs.readFileSync(outFile, 'utf-8'));
  ivNode.validateSnapshot(raw);
  const enriched = ivNode.enrichAndPersist(raw, outDir, 'spy');
  console.log(`Exported + enriched ${outFile} · term=${enriched.analytics?.termStructure ?? '—'}`);
  process.exit(0);
}

if (!fs.existsSync(outFile)) {
  const demo = buildDemoSnapshot();
  fs.writeFileSync(outFile, JSON.stringify(demo, null, 2));
  console.log(`Created demo snapshot: ${outFile}`);
}

const data = JSON.parse(fs.readFileSync(outFile, 'utf-8'));
ensureDemoMarketFields(data);
ivNode.validateSnapshot(data);
const enriched = ivNode.enrichAndPersist(data, outDir, 'spy');
console.log(
  `OK ${enriched.metadata.symbol} spot=${enriched.metadata.spot} asOf=${enriched.metadata.asOf} slices=${enriched.slices.length} · analytics=${enriched.analytics?.termStructure ?? '—'}`
);
