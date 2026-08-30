#!/usr/bin/env node
/**
 * Full IV data pipeline: optional Python export → enrich → validate.
 * Usage: node scripts/iv-data-pipeline.mjs [--export]
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'public', 'data', 'dashboards', 'implied-vol');
const symbol = (process.env.IV_SYMBOL ?? 'SPY').toLowerCase();

function tryPythonExport() {
  const pyScript = path.join(__dirname, 'export-iv-snapshot.py');
  if (!fs.existsSync(pyScript)) return false;
  for (const cmd of ['python', 'python3', 'py']) {
    const result = spawnSync(cmd, [pyScript], {
      cwd: root,
      encoding: 'utf-8',
      timeout: 180_000,
      env: { ...process.env, IV_SYMBOL: symbol.toUpperCase() },
    });
    if (result.status === 0) {
      console.log(`Python export OK (${cmd})`);
      return true;
    }
    if (result.stderr) console.warn(result.stderr.slice(0, 400));
  }
  return false;
}

function ensureDemoSnapshot() {
  const out = path.join(dataDir, `${symbol}.json`);
  if (fs.existsSync(out)) return;
  spawnSync('node', [path.join(__dirname, 'generate-iv-snapshot.mjs')], {
    cwd: root,
    stdio: 'inherit',
  });
}

const wantExport = process.argv.includes('--export') || process.env.IV_EXPORT === '1';

if (wantExport) {
  if (!tryPythonExport()) {
    console.warn('Python export failed — keeping/regenerating existing JSON.');
    ensureDemoSnapshot();
  }
} else if (!fs.existsSync(path.join(dataDir, `${symbol}.json`))) {
  ensureDemoSnapshot();
}

const mod = await import(pathToFileURL(path.join(__dirname, 'lib', 'iv-snapshot-node.mjs')).href);
const snapPath = path.join(dataDir, `${symbol}.json`);
const raw = JSON.parse(fs.readFileSync(snapPath, 'utf-8'));
mod.enrichAndPersist(raw, dataDir, symbol);
console.log(`Pipeline complete: ${snapPath}`);
