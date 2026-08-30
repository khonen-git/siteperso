export interface IvPoint {
  strike: number;
  iv: number;
  moneyness: number;
  bid?: number;
  ask?: number;
  openInterest?: number;
  volume?: number;
  optionType?: 'call' | 'put';
}

export interface SsviParams {
  rho: number;
  eta: number;
  gamma: number;
  m: number;
  sigma: number;
}

export interface SliceAnalytics {
  atmIv: number;
  /** Put IV − call IV at 25Δ proxy moneyness (pp). */
  riskReversal25?: number;
  /** Wing avg − ATM at 25Δ proxy (pp). */
  butterfly25?: number;
  /** Root mean square error vs SSVI fit (pp). */
  ssviRmse?: number;
}

export interface ForwardVolPoint {
  fromDte: number;
  toDte: number;
  forwardIv: number;
}

export interface ExpectedMove {
  daysToExpiry: number;
  move68Pct: number;
  move95Pct: number;
  move68Dollars: number;
  move95Dollars: number;
}

export interface SnapshotAnalytics {
  expectedMove?: ExpectedMove;
  forwardVols?: ForwardVolPoint[];
  termStructure?: 'contango' | 'backwardation' | 'flat';
  /** IV rank vs last N history points (0–100). */
  ivRank30d?: number;
  /** Percentile of current ATM IV in history (0–100). */
  ivPercentile30d?: number;
  realizedVol20d?: number;
  /** ATM IV − realized vol (pp). */
  volatilityRiskPremium?: number;
  previousAtmIv?: number;
  atmIvDelta?: number;
}

export interface IvSlice {
  expiry: string;
  daysToExpiry: number;
  ivPoints: IvPoint[];
  ssvi?: SsviParams;
  analytics?: SliceAnalytics;
}

export interface ImpliedVolSnapshotMetadata {
  symbol: string;
  spot: number;
  asOf: string;
  fetchedAt?: string;
  source: string;
  sourceDisclaimer: string;
  riskFreeRate?: number;
  dividendYield?: number;
  /** 20-day realized vol from underlying (decimal). */
  realizedVol20d?: number;
}

export interface ImpliedVolSnapshot {
  metadata: ImpliedVolSnapshotMetadata;
  slices: IvSlice[];
  analytics?: SnapshotAnalytics;
}

export interface IvHistoryPoint {
  asOf: string;
  atmIv: number;
  spot: number;
  realizedVol20d?: number;
}

export interface IvHistorySeries {
  symbol: string;
  updatedAt: string;
  points: IvHistoryPoint[];
}
