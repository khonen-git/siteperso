import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';
import type { SupportedIvSymbol } from '@/lib/dashboards/implied-vol';

const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'dashboards', 'implied-vol');

export function getImpliedVolSnapshot(symbol: SupportedIvSymbol = 'SPY'): ImpliedVolSnapshot {
  const filePath = path.join(DATA_DIR, `${symbol.toLowerCase()}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Snapshot not found: ${symbol}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as ImpliedVolSnapshot;
}
