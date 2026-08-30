import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { enrichImpliedVolSnapshot } from '@/lib/dashboards/implied-vol-analytics';
import { validateImpliedVolSnapshot } from '@/lib/dashboards/implied-vol-schema';
import { findAtmIv } from '@/lib/dashboards/iv-metrics';
import type { SupportedIvSymbol } from '@/lib/dashboards/implied-vol';
import type { ImpliedVolSnapshot, IvHistorySeries } from '@/types/dashboards/implied-vol';

const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'dashboards', 'implied-vol');
const HISTORY_DIR = path.join(DATA_DIR, 'history');

function historyPath(symbol: SupportedIvSymbol): string {
  return path.join(HISTORY_DIR, `${symbol.toLowerCase()}-atm.json`);
}

export function loadIvHistory(symbol: SupportedIvSymbol): IvHistorySeries | null {
  const filePath = historyPath(symbol);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as IvHistorySeries;
  } catch {
    return null;
  }
}

export function appendIvHistory(snapshot: ImpliedVolSnapshot): void {
  const symbol = snapshot.metadata.symbol as SupportedIvSymbol;
  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const front = sorted[0];
  if (!front) return;

  const atmIv = findAtmIv(front);
  if (atmIv <= 0) return;

  const existing = loadIvHistory(symbol);
  const points = existing?.points ?? [];
  const asOf = snapshot.metadata.asOf;
  const rv = snapshot.metadata.realizedVol20d ?? snapshot.analytics?.realizedVol20d;

  const entry = {
    asOf,
    atmIv,
    spot: snapshot.metadata.spot,
    ...(rv != null ? { realizedVol20d: rv } : {}),
  };

  const withoutToday = points.filter((p) => p.asOf !== asOf);
  const next = [...withoutToday, entry].sort((a, b) => a.asOf.localeCompare(b.asOf)).slice(-90);

  const series: IvHistorySeries = {
    symbol: snapshot.metadata.symbol,
    updatedAt: new Date().toISOString(),
    points: next,
  };

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  fs.writeFileSync(historyPath(symbol), JSON.stringify(series, null, 2), 'utf-8');
}

export function getImpliedVolSnapshot(symbol: SupportedIvSymbol = 'SPY'): ImpliedVolSnapshot {
  const filePath = path.join(DATA_DIR, `${symbol.toLowerCase()}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Snapshot not found: ${symbol}`);
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown;
  const validated = validateImpliedVolSnapshot(raw);
  const history = loadIvHistory(symbol);
  return enrichImpliedVolSnapshot(validated, history?.points ?? []);
}

export function writeImpliedVolSnapshot(snapshot: ImpliedVolSnapshot): void {
  const symbol = snapshot.metadata.symbol.toLowerCase();
  const enriched = enrichImpliedVolSnapshot(
    snapshot,
    loadIvHistory(snapshot.metadata.symbol as SupportedIvSymbol)?.points ?? []
  );
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, `${symbol}.json`),
    JSON.stringify(enriched, null, 2),
    'utf-8'
  );
  appendIvHistory(enriched);
}

export function getIvDataDir(): string {
  return DATA_DIR;
}
