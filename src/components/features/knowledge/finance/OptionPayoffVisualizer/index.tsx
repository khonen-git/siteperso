'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  blackScholesGreeks,
  blackScholesPrice,
  positionSign,
  type OptionType,
} from '@/lib/finance/blackScholes';
import { buildOptionCurves } from '@/lib/finance/optionCurves';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ParamControl } from './ParamControl';
import { OptionPayoffChart } from './OptionPayoffChart';

const COPY = {
  fr: {
    optionType: 'Type',
    call: 'Call',
    put: 'Put',
    position: 'Position',
    long: 'Long',
    short: 'Short',
    spot: 'Spot S',
    strike: 'Strike K',
    maturity: 'Maturité T (années)',
    maturityFormat: (v: number) => `${v.toFixed(2)} an`,
    rate: 'Taux r',
    vol: 'Vol σ',
    greeksTitle: 'Grecques (position)',
    delta: 'Δ',
    gamma: 'Γ',
    theta: 'Θ / jour',
    vega: 'ν / pt vol',
    premiumAtEntry: "Prime à l'entrée (S = spot courant)",
    chart: {
      payoff: 'Payoff (échéance)',
      premium: 'Valeur BS (avant échéance)',
      pnl: "P&L à l'échéance vs prime",
      spot: 'Spot',
    },
  },
  en: {
    optionType: 'Type',
    call: 'Call',
    put: 'Put',
    position: 'Position',
    long: 'Long',
    short: 'Short',
    spot: 'Spot S',
    strike: 'Strike K',
    maturity: 'Maturity T (years)',
    maturityFormat: (v: number) => `${v.toFixed(2)} yr`,
    rate: 'Rate r',
    vol: 'Vol σ',
    greeksTitle: 'Greeks (position)',
    delta: 'Δ',
    gamma: 'Γ',
    theta: 'Θ / day',
    vega: 'ν / vol pt',
    premiumAtEntry: 'Premium at entry (S = current spot)',
    chart: {
      payoff: 'Payoff (expiry)',
      premium: 'BS value (before expiry)',
      pnl: 'P&L at expiry vs premium',
      spot: 'Spot',
    },
  },
} as const;

function formatGreek(value: number, decimals = 4): string {
  if (Math.abs(value) < 1e-6) return '0';
  return value.toFixed(decimals);
}

export function OptionPayoffVisualizer({ className }: { className?: string }): React.JSX.Element {
  const locale = useLocale();
  const t = locale === 'en' ? COPY.en : COPY.fr;

  const [optionType, setOptionType] = React.useState<OptionType>('call');
  const [isLong, setIsLong] = React.useState(true);
  const [spot, setSpot] = React.useState(100);
  const [strike, setStrike] = React.useState(100);
  const [timeYears, setTimeYears] = React.useState(0.25);
  const [rate, setRate] = React.useState(0.05);
  const [volatility, setVolatility] = React.useState(0.2);

  const sign = positionSign(isLong);
  const bsParams = React.useMemo(
    () => ({
      spot,
      strike,
      timeYears,
      rate,
      volatility,
      optionType,
    }),
    [spot, strike, timeYears, rate, volatility, optionType]
  );

  const greeks = React.useMemo(() => blackScholesGreeks(bsParams), [bsParams]);
  const entryPremium = blackScholesPrice(bsParams);

  const curveData = React.useMemo(
    () =>
      buildOptionCurves({
        strike,
        timeYears,
        rate,
        volatility,
        optionType,
        isLong,
        spotMin: Math.max(1, Math.min(strike, spot) * 0.55),
        spotMax: Math.max(strike, spot) * 1.45,
        entrySpot: spot,
      }),
    [strike, timeYears, rate, volatility, optionType, isLong, spot]
  );

  const positionGreeks = {
    delta: sign * greeks.delta,
    gamma: sign * greeks.gamma,
    theta: sign * greeks.thetaPerDay,
    vega: sign * greeks.vegaPerVolPoint,
  };

  return (
    <div className={cn('not-prose space-y-6', className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">{t.optionType}</span>
          <Select value={optionType} onValueChange={(v) => setOptionType(v as OptionType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">{t.call}</SelectItem>
              <SelectItem value="put">{t.put}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium">{t.position}</span>
          <Select
            value={isLong ? 'long' : 'short'}
            onValueChange={(v) => setIsLong(v === 'long')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long">{t.long}</SelectItem>
              <SelectItem value="short">{t.short}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ParamControl label={t.spot} value={spot} min={10} max={300} step={1} onChange={setSpot} />
        <ParamControl
          label={t.strike}
          value={strike}
          min={10}
          max={300}
          step={1}
          onChange={setStrike}
        />
        <ParamControl
          label={t.maturity}
          value={timeYears}
          min={0.02}
          max={2}
          step={0.01}
          onChange={setTimeYears}
          format={t.maturityFormat}
        />
        <ParamControl
          label={t.rate}
          value={rate}
          min={0}
          max={0.15}
          step={0.005}
          onChange={setRate}
          format={(v) => `${(v * 100).toFixed(1)} %`}
        />
        <ParamControl
          label={t.vol}
          value={volatility}
          min={0.05}
          max={1}
          step={0.01}
          onChange={setVolatility}
          format={(v) => `${(v * 100).toFixed(0)} %`}
        />
      </div>

      <OptionPayoffChart data={curveData} strike={strike} labels={t.chart} />

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="mb-3 text-sm font-medium">{t.greeksTitle}</p>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <span className="text-muted-foreground">{t.delta}</span>
            <p className="font-mono font-medium">{formatGreek(positionGreeks.delta)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{t.gamma}</span>
            <p className="font-mono font-medium">{formatGreek(positionGreeks.gamma)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{t.theta}</span>
            <p className="font-mono font-medium">{formatGreek(positionGreeks.theta)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{t.vega}</span>
            <p className="font-mono font-medium">{formatGreek(positionGreeks.vega)}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t.premiumAtEntry}: <span className="font-mono">{(sign * entryPremium).toFixed(4)}</span>
        </p>
      </div>
    </div>
  );
}
