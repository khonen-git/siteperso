import { findAtmIv, ivAtMoneyness } from '@/lib/dashboards/iv-metrics';
import { ssviIvAtMoneyness } from '@/lib/dashboards/ssvi-curve';
import type {
  ForwardVolPoint,
  ImpliedVolSnapshot,
  IvHistoryPoint,
  IvSlice,
  SliceAnalytics,
  SnapshotAnalytics,
} from '@/types/dashboards/implied-vol';

const PUT_25_M = 0.9;
const CALL_25_M = 1.1;

export function computeRiskReversal25(slice: IvSlice): number | null {
  const putIv = ivAtMoneyness(slice, PUT_25_M);
  const callIv = ivAtMoneyness(slice, CALL_25_M);
  if (putIv == null || callIv == null) return null;
  return (putIv - callIv) * 100;
}

export function computeButterfly25(slice: IvSlice): number | null {
  const putIv = ivAtMoneyness(slice, PUT_25_M);
  const callIv = ivAtMoneyness(slice, CALL_25_M);
  const atm = findAtmIv(slice);
  if (putIv == null || callIv == null || atm <= 0) return null;
  return ((putIv + callIv) / 2 - atm) * 100;
}

export function computeSsviRmse(slice: IvSlice): number | null {
  if (!slice.ssvi) return null;
  const errors: number[] = [];
  for (const pt of slice.ivPoints) {
    const model = ssviIvAtMoneyness(pt.moneyness, slice.daysToExpiry, slice.ssvi);
    if (model > 0) errors.push((pt.iv - model) * 100);
  }
  if (!errors.length) return null;
  return Math.sqrt(errors.reduce((s, e) => s + e * e, 0) / errors.length);
}

export function computeSliceAnalytics(slice: IvSlice): SliceAnalytics {
  const analytics: SliceAnalytics = { atmIv: findAtmIv(slice) };
  const rr = computeRiskReversal25(slice);
  const bf = computeButterfly25(slice);
  const rmse = computeSsviRmse(slice);
  if (rr != null) analytics.riskReversal25 = rr;
  if (bf != null) analytics.butterfly25 = bf;
  if (rmse != null) analytics.ssviRmse = rmse;
  return analytics;
}

export function computeForwardVol(
  dte1: number,
  iv1: number,
  dte2: number,
  iv2: number
): number | null {
  if (dte2 <= dte1 || dte1 <= 0) return null;
  const T1 = dte1 / 365;
  const T2 = dte2 / 365;
  const w1 = iv1 ** 2 * T1;
  const w2 = iv2 ** 2 * T2;
  if (w2 <= w1) return null;
  const fwdVar = (w2 - w1) / (T2 - T1);
  if (fwdVar <= 0) return null;
  return Math.sqrt(fwdVar);
}

export function computeForwardVolChain(slices: IvSlice[]): ForwardVolPoint[] {
  const sorted = [...slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const out: ForwardVolPoint[] = [];
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    const iv1 = findAtmIv(prev);
    const iv2 = findAtmIv(cur);
    const fwd = computeForwardVol(prev.daysToExpiry, iv1, cur.daysToExpiry, iv2);
    if (fwd != null) {
      out.push({ fromDte: prev.daysToExpiry, toDte: cur.daysToExpiry, forwardIv: fwd });
    }
  }
  return out;
}

export function classifyTermStructure(slices: IvSlice[]): SnapshotAnalytics['termStructure'] {
  if (slices.length < 2) return 'flat';
  const sorted = [...slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const front = findAtmIv(sorted[0]);
  const back = findAtmIv(sorted[sorted.length - 1]);
  const diff = back - front;
  if (Math.abs(diff) < 0.002) return 'flat';
  return diff > 0 ? 'contango' : 'backwardation';
}

export function computeExpectedMove(
  spot: number,
  atmIv: number,
  daysToExpiry: number
): SnapshotAnalytics['expectedMove'] {
  const t = daysToExpiry / 365;
  const sigma = atmIv * Math.sqrt(t);
  const move68Pct = sigma * 100;
  const move95Pct = sigma * 1.96 * 100;
  return {
    daysToExpiry,
    move68Pct,
    move95Pct,
    move68Dollars: spot * sigma,
    move95Dollars: spot * sigma * 1.96,
  };
}

export function computeIvRank(current: number, history: number[]): number | null {
  if (history.length < 2) return null;
  const min = Math.min(...history);
  const max = Math.max(...history);
  if (max <= min) return 50;
  return Math.round(((current - min) / (max - min)) * 1000) / 10;
}

export function computeIvPercentile(current: number, history: number[]): number | null {
  if (history.length < 2) return null;
  const below = history.filter((v) => v < current).length;
  return Math.round((below / history.length) * 1000) / 10;
}

export function buildSnapshotAnalytics(
  snapshot: ImpliedVolSnapshot,
  historyPoints: IvHistoryPoint[] = []
): SnapshotAnalytics {
  const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const front = sorted[0];
  const frontAtm = front ? findAtmIv(front) : 0;

  const analytics: SnapshotAnalytics = {
    forwardVols: computeForwardVolChain(snapshot.slices),
    termStructure: classifyTermStructure(snapshot.slices),
  };

  if (front && frontAtm > 0) {
    analytics.expectedMove = computeExpectedMove(
      snapshot.metadata.spot,
      frontAtm,
      front.daysToExpiry
    );
  }

  const rv = snapshot.metadata.realizedVol20d ?? snapshot.analytics?.realizedVol20d;
  if (typeof rv === 'number' && frontAtm > 0) {
    analytics.realizedVol20d = rv;
    analytics.volatilityRiskPremium = (frontAtm - rv) * 100;
  }

  const atmHistory = historyPoints.map((p) => p.atmIv).filter((v) => v > 0);
  if (frontAtm > 0 && atmHistory.length >= 2) {
    analytics.ivRank30d = computeIvRank(frontAtm, atmHistory) ?? undefined;
    analytics.ivPercentile30d = computeIvPercentile(frontAtm, atmHistory) ?? undefined;
  }

  const prev = historyPoints.length >= 2 ? historyPoints[historyPoints.length - 2] : undefined;
  if (prev && frontAtm > 0) {
    analytics.previousAtmIv = prev.atmIv;
    analytics.atmIvDelta = (frontAtm - prev.atmIv) * 100;
  }

  return analytics;
}

/** Idempotent enrichment: slice analytics + snapshot analytics. */
export function enrichImpliedVolSnapshot(
  snapshot: ImpliedVolSnapshot,
  historyPoints: IvHistoryPoint[] = []
): ImpliedVolSnapshot {
  const sortedSlices = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const slices = sortedSlices.map((slice) => ({
    ...slice,
    analytics: computeSliceAnalytics(slice),
  }));

  const rv =
    snapshot.analytics?.realizedVol20d ??
    (typeof snapshot.metadata.realizedVol20d === 'number'
      ? snapshot.metadata.realizedVol20d
      : undefined);

  const meta = { ...snapshot.metadata };
  if (rv != null) meta.realizedVol20d = rv;

  const analytics = buildSnapshotAnalytics({ ...snapshot, slices, metadata: meta }, historyPoints);

  if (rv != null) analytics.realizedVol20d = rv;

  return { metadata: meta, slices, analytics };
}
