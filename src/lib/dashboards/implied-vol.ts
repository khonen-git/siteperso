import fs from 'node:fs';
import path from 'node:path';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'dashboards', 'implied-vol');

const SUPPORTED_SYMBOLS = ['SPY'] as const;

export type SupportedIvSymbol = (typeof SUPPORTED_SYMBOLS)[number];

export function getSupportedIvSymbols(): readonly SupportedIvSymbol[] {
  return SUPPORTED_SYMBOLS;
}

export function getImpliedVolSnapshot(symbol: SupportedIvSymbol = 'SPY'): ImpliedVolSnapshot {
  const filePath = path.join(DATA_DIR, `${symbol.toLowerCase()}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Snapshot not found: ${symbol}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as ImpliedVolSnapshot;
}
