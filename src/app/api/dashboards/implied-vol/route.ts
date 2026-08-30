import { NextResponse } from 'next/server';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { getSupportedIvSymbols } from '@/lib/dashboards/implied-vol';
import { getImpliedVolSnapshot } from '@/lib/dashboards/implied-vol.server';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const CACHE_MAX_AGE = 86_400;

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') ?? 'SPY').toUpperCase();
  const supported = getSupportedIvSymbols();

  if (!supported.includes(symbol as (typeof supported)[number])) {
    return NextResponse.json({ error: 'Unsupported symbol' }, { status: 400 });
  }

  try {
    const snapshot = getImpliedVolSnapshot(symbol as (typeof supported)[number]);
    return NextResponse.json(snapshot, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=3600`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') ?? 'SPY').toUpperCase();
  const supported = getSupportedIvSymbols();

  if (!supported.includes(symbol as (typeof supported)[number])) {
    return NextResponse.json({ error: 'Unsupported symbol' }, { status: 400 });
  }

  const pipeline = path.join(process.cwd(), 'scripts', 'iv-data-pipeline.mjs');
  const result = spawnSync(process.execPath, [pipeline, '--export'], {
    cwd: process.cwd(),
    encoding: 'utf-8',
    timeout: 175_000,
    env: { ...process.env, IV_SYMBOL: symbol, IV_EXPORT: '1' },
  });

  if (result.status !== 0) {
    return NextResponse.json(
      {
        error: 'Refresh failed',
        detail: (result.stderr || result.stdout || '').slice(0, 500),
      },
      { status: 500 }
    );
  }

  try {
    const snapshot = getImpliedVolSnapshot(symbol as (typeof supported)[number]);
    return NextResponse.json(snapshot, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Snapshot load failed' },
      { status: 500 }
    );
  }
}
