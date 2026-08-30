/**
 * Node pipeline helpers (mirrors src/lib/dashboards/implied-vol-analytics.ts).
 */
import fs from 'node:fs';
import path from 'node:path';

const PUT_25_M = 0.9;
const CALL_25_M = 1.1;

export function validateSnapshot(data) {
  if (!data?.metadata?.symbol) throw new Error('metadata.symbol required');
  if (typeof data.metadata.spot !== 'number' || data.metadata.spot <= 0) {
    throw new Error('metadata.spot invalid');
  }
  if (!data.metadata.asOf) throw new Error('metadata.asOf required');
  if (!Array.isArray(data.slices) || data.slices.length === 0) {
    throw new Error('slices empty');
  }
  for (const slice of data.slices) {
    if (!slice.expiry || !Array.isArray(slice.ivPoints) || slice.ivPoints.length === 0) {
      throw new Error(`invalid slice ${slice.expiry}`);
    }
    for (const pt of slice.ivPoints) {
      if (pt.iv <= 0 || pt.moneyness <= 0) throw new Error('invalid iv point');
    }
  }
  return data;
}

function findAtmIv(slice) {
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - 1) - Math.abs(b.moneyness - 1)
  );
  return sorted[0]?.iv ?? 0;
}

function ivAtMoneyness(slice, target) {
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - target) - Math.abs(b.moneyness - target)
  );
  return sorted[0]?.iv ?? null;
}

function ssviIvAtMoneyness(moneyness, daysToExpiry, params) {
  if (moneyness <= 0 || daysToExpiry <= 0) return 0;
  const T = daysToExpiry / 365;
  const k = Math.log(moneyness) - params.m;
  const theta = params.sigma ** 2 * T;
  const { rho, eta, gamma } = params;
  const denom = Math.pow(theta, gamma) * Math.pow(1 + theta, 1 - gamma);
  const phi = denom > 0 ? eta / denom : eta;
  const phiK = phi * k;
  const inner = Math.sqrt((phiK + rho) ** 2 + 1 - rho ** 2);
  const w = (theta / 2) * (1 + rho * phiK + inner);
  if (w <= 0) return 0;
  return Math.sqrt(w / T);
}

function computeSliceAnalytics(slice) {
  const atmIv = findAtmIv(slice);
  const putIv = ivAtMoneyness(slice, PUT_25_M);
  const callIv = ivAtMoneyness(slice, CALL_25_M);
  const analytics = { atmIv };
  if (putIv != null && callIv != null) {
    analytics.riskReversal25 = (putIv - callIv) * 100;
    analytics.butterfly25 = ((putIv + callIv) / 2 - atmIv) * 100;
  }
  if (slice.ssvi) {
    const errs = slice.ivPoints
      .map((pt) => {
        const m = ssviIvAtMoneyness(pt.moneyness, slice.daysToExpiry, slice.ssvi);
        return m > 0 ? (pt.iv - m) * 100 : null;
      })
      .filter((e) => e != null);
    if (errs.length) {
      analytics.ssviRmse = Math.sqrt(errs.reduce((s, e) => s + e * e, 0) / errs.length);
    }
  }
  return analytics;
}

function computeForwardVol(dte1, iv1, dte2, iv2) {
  if (dte2 <= dte1 || dte1 <= 0) return null;
  const T1 = dte1 / 365;
  const T2 = dte2 / 365;
  const w1 = iv1 ** 2 * T1;
  const w2 = iv2 ** 2 * T2;
  if (w2 <= w1) return null;
  const fwdVar = (w2 - w1) / (T2 - T1);
  return fwdVar > 0 ? Math.sqrt(fwdVar) : null;
}

function buildSnapshotAnalytics(snapshot, historyPoints) {
  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const front = sorted[0];
  const frontAtm = front ? findAtmIv(front) : 0;
  const analytics = { forwardVols: [], termStructure: 'flat' };

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    const fwd = computeForwardVol(
      prev.daysToExpiry,
      findAtmIv(prev),
      cur.daysToExpiry,
      findAtmIv(cur)
    );
    if (fwd != null) {
      analytics.forwardVols.push({
        fromDte: prev.daysToExpiry,
        toDte: cur.daysToExpiry,
        forwardIv: fwd,
      });
    }
  }

  if (sorted.length >= 2) {
    const diff = findAtmIv(sorted[sorted.length - 1]) - findAtmIv(sorted[0]);
    analytics.termStructure =
      Math.abs(diff) < 0.002 ? 'flat' : diff > 0 ? 'contango' : 'backwardation';
  }

  if (front && frontAtm > 0) {
    const t = front.daysToExpiry / 365;
    const sigma = frontAtm * Math.sqrt(t);
    analytics.expectedMove = {
      daysToExpiry: front.daysToExpiry,
      move68Pct: sigma * 100,
      move95Pct: sigma * 1.96 * 100,
      move68Dollars: snapshot.metadata.spot * sigma,
      move95Dollars: snapshot.metadata.spot * sigma * 1.96,
    };
  }

  const rv = snapshot.metadata.realizedVol20d;
  if (typeof rv === 'number' && frontAtm > 0) {
    analytics.realizedVol20d = rv;
    analytics.volatilityRiskPremium = (frontAtm - rv) * 100;
  }

  const atmHistory = historyPoints.map((p) => p.atmIv).filter((v) => v > 0);
  if (frontAtm > 0 && atmHistory.length >= 2) {
    const min = Math.min(...atmHistory);
    const max = Math.max(...atmHistory);
    if (max > min) {
      analytics.ivRank30d = Math.round(((frontAtm - min) / (max - min)) * 1000) / 10;
    }
    analytics.ivPercentile30d =
      Math.round((atmHistory.filter((v) => v < frontAtm).length / atmHistory.length) * 1000) /
      10;
  }

  const prev = historyPoints.length >= 2 ? historyPoints[historyPoints.length - 2] : null;
  if (prev && frontAtm > 0) {
    analytics.previousAtmIv = prev.atmIv;
    analytics.atmIvDelta = (frontAtm - prev.atmIv) * 100;
  }

  return analytics;
}

function loadHistory(dataDir, symbol) {
  const p = path.join(dataDir, 'history', `${symbol}-atm.json`);
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8')).points ?? [];
  } catch {
    return [];
  }
}

/** Seed ~30d synthetic ATM history when missing (demo / first enrich). */
export function seedDemoHistory(dataDir, symbol, snapshot) {
  const existing = loadHistory(dataDir, symbol);
  if (existing.length >= 2) return existing;

  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const frontAtm = sorted[0] ? findAtmIv(sorted[0]) : 0.14;
  const spot = snapshot.metadata.spot;
  const asOf = snapshot.metadata.asOf;
  const rv = snapshot.metadata.realizedVol20d ?? 0.118;
  const baseDate = new Date(`${asOf}T12:00:00Z`);

  const points = [];
  for (let i = 29; i >= 0; i -= 1) {
    const d = new Date(baseDate);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const variation = 0.015 * Math.sin(i / 5) + 0.005 * (i / 29);
    points.push({
      asOf: dateStr,
      atmIv: Math.round(Math.max(0.08, frontAtm - 0.01 + variation) * 10000) / 10000,
      spot: Math.round(spot * (1 + 0.001 * ((i - 15) / 15)) * 100) / 100,
      realizedVol20d: Math.round((rv - 0.008 + 0.004 * Math.cos(i / 7)) * 10000) / 10000,
    });
  }

  const historyDir = path.join(dataDir, 'history');
  fs.mkdirSync(historyDir, { recursive: true });
  fs.writeFileSync(
    path.join(historyDir, `${symbol}-atm.json`),
    JSON.stringify(
      { symbol: snapshot.metadata.symbol.toUpperCase(), updatedAt: new Date().toISOString(), points },
      null,
      2
    ),
    'utf-8'
  );
  return points;
}

function saveHistory(dataDir, symbol, snapshot) {
  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const front = sorted[0];
  if (!front) return;
  const atmIv = findAtmIv(front);
  if (atmIv <= 0) return;

  const historyDir = path.join(dataDir, 'history');
  fs.mkdirSync(historyDir, { recursive: true });
  const historyPath = path.join(historyDir, `${symbol}-atm.json`);
  const points = loadHistory(dataDir, symbol);
  const asOf = snapshot.metadata.asOf;
  const rv = snapshot.metadata.realizedVol20d ?? snapshot.analytics?.realizedVol20d;
  const entry = {
    asOf,
    atmIv,
    spot: snapshot.metadata.spot,
    ...(rv != null ? { realizedVol20d: rv } : {}),
  };
  const next = [...points.filter((p) => p.asOf !== asOf), entry]
    .sort((a, b) => a.asOf.localeCompare(b.asOf))
    .slice(-90);

  fs.writeFileSync(
    historyPath,
    JSON.stringify(
      { symbol: snapshot.metadata.symbol, updatedAt: new Date().toISOString(), points: next },
      null,
      2
    ),
    'utf-8'
  );
  return next;
}

export function enrichSnapshot(snapshot, historyPoints = []) {
  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const slices = sorted.map((slice) => ({
    ...slice,
    analytics: computeSliceAnalytics(slice),
  }));
  const analytics = buildSnapshotAnalytics({ ...snapshot, slices }, historyPoints);
  return { ...snapshot, slices, analytics };
}

export function enrichAndPersist(raw, dataDir, symbol) {
  validateSnapshot(raw);
  let history = loadHistory(dataDir, symbol);
  if (history.length < 2) {
    history = seedDemoHistory(dataDir, symbol, raw);
  }
  const enriched = enrichSnapshot(raw, history);
  fs.writeFileSync(
    path.join(dataDir, `${symbol}.json`),
    JSON.stringify(enriched, null, 2),
    'utf-8'
  );
  saveHistory(dataDir, symbol, enriched);
  return enriched;
}
