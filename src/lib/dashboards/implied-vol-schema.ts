import type { ImpliedVolSnapshot, IvPoint, IvSlice } from '@/types/dashboards/implied-vol';

export class ImpliedVolSnapshotValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImpliedVolSnapshotValidationError';
  }
}

function assertIvPoint(pt: IvPoint, ctx: string): void {
  if (typeof pt.strike !== 'number' || pt.strike <= 0) {
    throw new ImpliedVolSnapshotValidationError(`${ctx}: invalid strike`);
  }
  if (typeof pt.iv !== 'number' || pt.iv <= 0 || pt.iv > 5) {
    throw new ImpliedVolSnapshotValidationError(`${ctx}: invalid iv`);
  }
  if (typeof pt.moneyness !== 'number' || pt.moneyness <= 0) {
    throw new ImpliedVolSnapshotValidationError(`${ctx}: invalid moneyness`);
  }
}

function assertSlice(slice: IvSlice, index: number): void {
  if (!slice.expiry || typeof slice.daysToExpiry !== 'number' || slice.daysToExpiry < 0) {
    throw new ImpliedVolSnapshotValidationError(`slice[${index}]: invalid expiry/dte`);
  }
  if (!Array.isArray(slice.ivPoints) || slice.ivPoints.length === 0) {
    throw new ImpliedVolSnapshotValidationError(`slice[${index}]: empty ivPoints`);
  }
  slice.ivPoints.forEach((pt, i) => assertIvPoint(pt, `slice[${index}].ivPoints[${i}]`));
}

/** Validates snapshot shape; throws ImpliedVolSnapshotValidationError on failure. */
export function validateImpliedVolSnapshot(data: unknown): ImpliedVolSnapshot {
  if (!data || typeof data !== 'object') {
    throw new ImpliedVolSnapshotValidationError('snapshot must be an object');
  }

  const snap = data as ImpliedVolSnapshot;

  if (!snap.metadata?.symbol || typeof snap.metadata.symbol !== 'string') {
    throw new ImpliedVolSnapshotValidationError('metadata.symbol required');
  }
  if (typeof snap.metadata.spot !== 'number' || snap.metadata.spot <= 0) {
    throw new ImpliedVolSnapshotValidationError('metadata.spot must be > 0');
  }
  if (!snap.metadata.asOf) {
    throw new ImpliedVolSnapshotValidationError('metadata.asOf required');
  }
  if (!Array.isArray(snap.slices) || snap.slices.length === 0) {
    throw new ImpliedVolSnapshotValidationError('slices must be non-empty array');
  }

  snap.slices.forEach((slice, i) => assertSlice(slice, i));

  return snap;
}
