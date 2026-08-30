#!/usr/bin/env node
/**
 * Windows-safe dev reset: free port 3000, remove .next, start next dev.
 * Usage: node scripts/dev-clean.mjs
 */
import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function freePort(port) {
  if (process.platform !== 'win32') return;
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8' });
    const pids = new Set();
    for (const line of out.split('\n')) {
      if (!line.includes('LISTENING')) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* port free */
  }
}

function rmNext() {
  const nextDir = path.join(root, '.next');
  for (let i = 0; i < 3; i++) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true });
      return;
    } catch {
      /* EPERM — wait and retry */
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);
  }
  try {
    execSync('cmd /c rmdir /s /q .next', { cwd: root, stdio: 'ignore' });
  } catch {
    console.warn('Could not fully remove .next — stop other next dev instances first.');
  }
}

freePort(3000);
freePort(3001);
rmNext();
try {
  fs.rmSync(path.join(root, 'node_modules', '.cache'), { recursive: true, force: true });
} catch {
  /* ignore */
}

console.log('Starting next dev on http://localhost:3000 …');
const child = spawn('npx', ['next', 'dev'], { cwd: root, stdio: 'inherit', shell: true });
child.on('exit', (code) => process.exit(code ?? 0));
