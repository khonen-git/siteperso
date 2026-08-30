import { NextResponse } from 'next/server';
import { getSupportedIvSymbols } from '@/lib/dashboards/implied-vol';
import { getImpliedVolSnapshot } from '@/lib/dashboards/implied-vol.server';

export const dynamic = 'force-dynamic';

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
