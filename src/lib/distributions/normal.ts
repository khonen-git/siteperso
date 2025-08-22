import { DistributionConfig } from '@/types/distributions';

function pdf(params: Record<string, number>, x: number): number {
  const mu = params.mu;
  const sigma = params.sigma;
  return (1 / Math.sqrt(2 * Math.PI * Math.pow(sigma, 2))) * 
         Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
}

function cdf(params: Record<string, number>, x: number): number {
  const mu = params.mu;
  const sigma = params.sigma;
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

// Approximation de la fonction d'erreur (erf)
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

export const normalDistribution: DistributionConfig = {
  name: "Loi Normale",
  parameters: [
    {
      name: "mu",
      label: "μ (moyenne)",
      defaultValue: 0,
      min: -5,
      max: 5,
      step: 0.1
    },
    {
      name: "sigma",
      label: "σ (écart-type)",
      defaultValue: 1,
      min: 0.1,
      max: 3,
      step: 0.1
    }
  ],
  range: {
    min: -5,
    max: 5
  },
  functions: {
    pdf,
    cdf
  }
}; 