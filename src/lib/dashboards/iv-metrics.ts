import type { ImpliedVolSnapshot, IvSlice } from '@/types/dashboards/implied-vol';

const ATM_TOLERANCE = 0.02;
const SKEW_PUT_MONEYNESS = 0.9;
const SKEW_CALL_MONEYNESS = 1.1;

export function findAtmIv(slice: IvSlice): number {
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - 1) - Math.abs(b.moneyness - 1)
  );
  return sorted[0]?.iv ?? 0;
}

export function ivAtMoneyness(slice: IvSlice, target: number): number | null {
  if (!slice.ivPoints.length) return null;
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - target) - Math.abs(b.moneyness - target)
  );
  return sorted[0]?.iv ?? null;
}

/** Put skew proxy: IV(~0.9 moneyness) − IV(~1.1 moneyness), in percentage points. */
export function computeSkew25d(slice: IvSlice): number | null {
  const putIv = ivAtMoneyness(slice, SKEW_PUT_MONEYNESS);
  const callIv = ivAtMoneyness(slice, SKEW_CALL_MONEYNESS);
  if (putIv == null || callIv == null) return null;
  return (putIv - callIv) * 100;
}

export function computeSnapshotIvRange(snapshot: ImpliedVolSnapshot): {
  min: number;
  max: number;
} {
  const ivs = snapshot.slices.flatMap((s) => s.ivPoints.map((p) => p.iv)).filter((v) => v > 0);
  if (!ivs.length) return { min: 0, max: 0.3 };
  const min = Math.min(...ivs);
  const max = Math.max(...ivs);
  const pad = Math.max((max - min) * 0.08, 0.005);
  return { min: Math.max(0, min - pad), max: max + pad };
}

export function isAtmMoneyness(moneyness: number): boolean {
  return Math.abs(moneyness - 1) <= ATM_TOLERANCE;
}

export function formatRelativeTime(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const absSec = Math.abs(diffSec);
  if (absSec < 60) return rtf.format(diffSec, 'second');
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
  const diffDay = Math.round(diffHour / 24);
  return rtf.format(diffDay, 'day');
}
