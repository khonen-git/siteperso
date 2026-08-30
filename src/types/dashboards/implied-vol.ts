export interface IvPoint {
  strike: number;
  iv: number;
  moneyness: number;
  /** Optional — populated when export pipeline includes quotes. */
  bid?: number;
  ask?: number;
  /** Open interest placeholder for future chain enrichment. */
  openInterest?: number;
}

export interface SsviParams {
  rho: number;
  eta: number;
  gamma: number;
  m: number;
  sigma: number;
}

export interface IvSlice {
  expiry: string;
  daysToExpiry: number;
  ivPoints: IvPoint[];
  ssvi?: SsviParams;
}

export interface ImpliedVolSnapshotMetadata {
  symbol: string;
  spot: number;
  /** Calendar date of the market snapshot (YYYY-MM-DD). */
  asOf: string;
  /** ISO timestamp when the snapshot file was generated or last fetched. */
  fetchedAt?: string;
  source: string;
  sourceDisclaimer: string;
}

export interface ImpliedVolSnapshot {
  metadata: ImpliedVolSnapshotMetadata;
  slices: IvSlice[];
}
