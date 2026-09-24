/**
 * Strict TypeScript Mathematics Utility for Unit 4: Probability & Statistics
 * Data Science Lab
 */

export const EPSILON = 1e-9;

/**
 * Basic Summary Statistics
 */
export function mean(values: number[]): number {
  if (!values || values.length === 0) {
    throw new Error('Cannot compute mean of empty or undefined array');
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

export function weightedMean(values: number[], weights: number[]): number {
  if (!values || !weights || values.length === 0 || values.length !== weights.length) {
    throw new Error('Values and weights must be non-empty arrays of identical length');
  }
  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  if (Math.abs(totalWeight) < EPSILON) {
    throw new Error('Total weight cannot be zero');
  }
  const weightedSum = values.reduce((acc, val, idx) => acc + val * weights[idx], 0);
  return weightedSum / totalWeight;
}

export function median(values: number[]): number {
  if (!values || values.length === 0) {
    throw new Error('Cannot compute median of empty array');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function variance(values: number[], isSample: boolean = true): number {
  if (!values || values.length === 0) {
    throw new Error('Cannot compute variance of empty array');
  }
  if (isSample && values.length < 2) {
    throw new Error('Sample variance requires at least 2 observations (Bessel correction)');
  }
  const m = mean(values);
  const sumSqDiff = values.reduce((acc, val) => acc + (val - m) ** 2, 0);
  const divisor = isSample ? values.length - 1 : values.length;
  return sumSqDiff / divisor;
}

export function populationVariance(values: number[]): number {
  return variance(values, false);
}

export function sampleVariance(values: number[]): number {
  return variance(values, true);
}

export function standardDeviation(values: number[], isSample: boolean = true): number {
  return Math.sqrt(variance(values, isSample));
}

export function covariance(x: number[], y: number[], isSample: boolean = true): number {
  if (!x || !y || x.length === 0 || x.length !== y.length) {
    throw new Error('Input arrays must be non-empty and have matching dimensions');
  }
  if (isSample && x.length < 2) {
    throw new Error('Sample covariance requires at least 2 data points');
  }
  const meanX = mean(x);
  const meanY = mean(y);
  const sumProd = x.reduce((acc, val, i) => acc + (val - meanX) * (y[i] - meanY), 0);
  const divisor = isSample ? x.length - 1 : x.length;
  return sumProd / divisor;
}

export function correlation(x: number[], y: number[]): number {
  const stdX = standardDeviation(x, true);
  const stdY = standardDeviation(y, true);
  if (stdX < EPSILON || stdY < EPSILON) {
    return 0; // zero variance means no linear correlation
  }
  const cov = covariance(x, y, true);
  const r = cov / (stdX * stdY);
  return Math.max(-1, Math.min(1, r));
}

/**
 * Combinatorics
 */
export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Factorial requires a non-negative integer');
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function permutations(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
    throw new Error('Permutations require non-negative integers with k <= n');
  }
  let result = 1;
  for (let i = n; i > n - k; i--) {
    result *= i;
  }
  return result;
}

export function combinations(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
    throw new Error('Combinations require non-negative integers with k <= n');
  }
  if (k === 0 || k === n) return 1;
  const effectiveK = Math.min(k, n - k);
  let numerator = 1;
  let denominator = 1;
  for (let i = 1; i <= effectiveK; i++) {
    numerator *= n - (effectiveK - i);
    denominator *= i;
  }
  return Math.round(numerator / denominator);
}

/**
 * Probability Distributions PMF / PDF / CDF
 */
export function bernoulliPMF(k: number, p: number): number {
  if (p < 0 || p > 1) {
    throw new Error('Probability p must be in range [0, 1]');
  }
  if (k === 1) return p;
  if (k === 0) return 1 - p;
  return 0;
}

export function binomialPMF(k: number, n: number, p: number): number {
  if (p < 0 || p > 1) {
    throw new Error('Probability p must be in range [0, 1]');
  }
  if (!Number.isInteger(n) || n < 0 || !Number.isInteger(k) || k < 0 || k > n) {
    return 0;
  }
  const nCk = combinations(n, k);
  return nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function poissonPMF(k: number, lambda: number): number {
  if (lambda <= 0) {
    throw new Error('Poisson parameter lambda must be strictly positive');
  }
  if (!Number.isInteger(k) || k < 0) {
    return 0;
  }
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function uniformPDF(x: number, a: number, b: number): number {
  if (b <= a) {
    throw new Error('Upper bound b must be strictly greater than lower bound a');
  }
  if (x >= a && x <= b) {
    return 1 / (b - a);
  }
  return 0;
}

export function normalPDF(x: number, mu: number = 0, sigma: number = 1): number {
  if (sigma <= 0) {
    throw new Error('Standard deviation sigma must be strictly positive');
  }
  const coefficient = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
  return coefficient * Math.exp(exponent);
}

/**
 * Error function erf(x) approximation for normal CDF
 * Abramowitz and Stegun formula 7.1.26 (max error: 1.5e-7)
 */
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-absX * absX);

  return sign * y;
}

export function normalCDF(x: number, mu: number = 0, sigma: number = 1): number {
  if (sigma <= 0) {
    throw new Error('Standard deviation sigma must be strictly positive');
  }
  const z = (x - mu) / (sigma * Math.sqrt(2));
  return 0.5 * (1 + erf(z));
}

export function zScore(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) {
    throw new Error('Standard deviation sigma must be strictly positive');
  }
  return (x - mu) / sigma;
}

export function standardError(sigma: number, n: number): number {
  if (sigma < 0) {
    throw new Error('Standard deviation cannot be negative');
  }
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error('Sample size n must be a positive integer');
  }
  return sigma / Math.sqrt(n);
}

export interface ConfidenceIntervalResult {
  mean: number;
  stdError: number;
  marginOfError: number;
  lower: number;
  upper: number;
  criticalValue: number;
  confidenceLevel: number;
}

export function confidenceInterval(
  sampleMean: number,
  sigma: number,
  n: number,
  confidenceLevel: 0.90 | 0.95 | 0.99 = 0.95
): ConfidenceIntervalResult {
  const criticalValueMap = {
    0.90: 1.644853,
    0.95: 1.959964,
    0.99: 2.575829,
  };
  const zCritical = criticalValueMap[confidenceLevel];
  const se = standardError(sigma, n);
  const marginOfError = zCritical * se;

  return {
    mean: sampleMean,
    stdError: se,
    marginOfError,
    lower: sampleMean - marginOfError,
    upper: sampleMean + marginOfError,
    criticalValue: zCritical,
    confidenceLevel,
  };
}

/**
 * Conditional Probability & Bayes' Theorem
 */
export function conditionalProbability(jointProb: number, conditionProb: number): number | null {
  if (jointProb < 0 || jointProb > 1 || conditionProb < 0 || conditionProb > 1) {
    throw new Error('Probabilities must be in range [0, 1]');
  }
  if (jointProb > conditionProb + EPSILON) {
    throw new Error('Joint probability P(A ∩ B) cannot exceed marginal probability P(B)');
  }
  if (conditionProb < EPSILON) {
    return null; // Undefined condition when P(B) = 0
  }
  return Math.min(1, Math.max(0, jointProb / conditionProb));
}

export interface BayesResult {
  prior: number;
  likelihood: number;
  falsePositiveRate: number;
  evidence: number;
  posterior: number;
}

export function bayesTheorem(
  priorA: number,
  likelihoodBGivenA: number,
  falsePositiveBGivenNotA: number
): BayesResult {
  if (
    priorA < 0 || priorA > 1 ||
    likelihoodBGivenA < 0 || likelihoodBGivenA > 1 ||
    falsePositiveBGivenNotA < 0 || falsePositiveBGivenNotA > 1
  ) {
    throw new Error('All probability parameters must lie within [0, 1]');
  }

  const priorNotA = 1 - priorA;
  const evidence = (likelihoodBGivenA * priorA) + (falsePositiveBGivenNotA * priorNotA);

  if (evidence < EPSILON) {
    return {
      prior: priorA,
      likelihood: likelihoodBGivenA,
      falsePositiveRate: falsePositiveBGivenNotA,
      evidence: 0,
      posterior: 0,
    };
  }

  const posterior = (likelihoodBGivenA * priorA) / evidence;

  return {
    prior: priorA,
    likelihood: likelihoodBGivenA,
    falsePositiveRate: falsePositiveBGivenNotA,
    evidence,
    posterior: Math.min(1, Math.max(0, posterior)),
  };
}
