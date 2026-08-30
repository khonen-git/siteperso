#!/usr/bin/env node
/**
 * Enrich snapshot JSON with analytics + update ATM history.
 * Usage: node scripts/enrich-iv-snapshot.mjs [symbol]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

async function main() {
  const symbol = (process.argv[2] ?? 'SPY').toLowerCase();
  const dataDir = path.join(root, 'public', 'data', 'dashboards', 'implied-vol');
  const snapPath = path.join(dataDir, `${symbol}.json`);

  if (!fs.existsSync(snapPath)) {
    console.error(`Missing ${snapPath}`);
    process.exit(1);
  }

  const mod = await import(
    pathToFileURL(path.join(root, 'scripts', 'lib', 'iv-snapshot-node.mjs')).href
  );

  const raw = JSON.parse(fs.readFileSync(snapPath, 'utf-8'));
  mod.validateSnapshot(raw);
  const enriched = mod.enrichAndPersist(raw, dataDir, symbol);
  console.log(
    `Enriched ${symbol.toUpperCase()} · slices=${enriched.slices.length} · term=${enriched.analytics?.termStructure ?? '—'}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
