export interface IvPoint {
  strike: number;
  iv: number;
  moneyness: number;
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
  asOf: string;
  source: string;
  sourceDisclaimer: string;
}

export interface ImpliedVolSnapshot {
  metadata: ImpliedVolSnapshotMetadata;
  slices: IvSlice[];
}
