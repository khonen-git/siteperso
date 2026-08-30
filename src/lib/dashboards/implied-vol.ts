const SUPPORTED_SYMBOLS = ['SPY'] as const;

export type SupportedIvSymbol = (typeof SUPPORTED_SYMBOLS)[number];

export function getSupportedIvSymbols(): readonly SupportedIvSymbol[] {
  return SUPPORTED_SYMBOLS;
}
