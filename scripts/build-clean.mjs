#!/usr/bin/env node
/**
 * Windows-safe production build: free dev ports, remove .next, then next build.
 * Avoids EPERM/ENOENT on .next when dev server or stale Node processes hold locks.
 */
import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function killStaleNextProcesses() {
  if (process.platform !== 'win32') return;
  const rootNorm = root.replace(/\//g, '\\').toLowerCase();
  try {
    const out = execSync(
      'wmic process where "name=\'node.exe\'" get ProcessId,CommandLine /format:csv',
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    for (const line of out.split('\n')) {
      if (!line.includes('next')) continue;
      const lower = line.toLowerCase();
      if (!lower.includes(rootNorm.replace(/\\/g, '\\\\'))) continue;
      if (!lower.includes('next') && !lower.includes('build-clean')) continue;
      const pid = line.trim().split(',').pop()?.trim();
      if (!pid || !/^\d+$/.test(pid) || pid === String(process.pid)) continue;
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        console.log(`Stopped stale Node process ${pid}`);
      } catch {
        /* gone */
      }
    }
  } catch {
    /* wmic unavailable */
  }
}

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

function rmDirWithRetry(dir) {
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      if (!fs.existsSync(dir)) return true;
    } catch {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);
    }
  }
  if (process.platform === 'win32' && fs.existsSync(dir)) {
    try {
      execSync(`takeown /f "${dir}" /r /d y`, { cwd: root, stdio: 'ignore' });
      execSync(`icacls "${dir}" /grant ${process.env.USERNAME}:F /t`, {
        cwd: root,
        stdio: 'ignore',
      });
      execSync(`cmd /c rmdir /s /q "${dir}"`, { cwd: root, stdio: 'ignore' });
    } catch {
      /* fall through */
    }
  }
  return !fs.existsSync(dir);
}

const skipClean = process.argv.includes('--skip-clean');

freePort(3000);
freePort(3001);
if (!skipClean) {
  killStaleNextProcesses();
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 800);
}

const buildDir = path.join(root, '.next-build');
const cacheDir = path.join(root, 'node_modules', '.cache');

// Production build uses an isolated dist dir so a locked `.next/trace` (dev / IDE) cannot block CI.
const distDirName = '.next-build';
if (!skipClean) {
  if (!rmDirWithRetry(buildDir)) {
    console.warn(`Could not fully remove ${distDirName} — retrying after ACL reset…`);
    if (!rmDirWithRetry(buildDir)) {
      console.warn(`Could not fully remove ${distDirName} — close other Next.js instances and retry.`);
      process.exit(1);
    }
  }
  rmDirWithRetry(cacheDir);
}

console.log(`Starting next build (distDir: ${distDirName})…`);
const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const result = spawnSync(process.execPath, [nextBin, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_BUILD_DIST_DIR: distDirName,
    NODE_OPTIONS: process.env.NODE_OPTIONS ?? '--max-old-space-size=4096',
  },
});

process.exit(result.status ?? 1);
