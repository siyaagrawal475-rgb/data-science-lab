import { ComparisonTableData } from '@/types/experiences';

export const UNIT_4_COMPARISONS: ComparisonTableData[] = [
  {
    id: 'u4-comp-distributions',
    title: 'Parametric Probability Distributions Comparison',
    subtitle: 'Discrete vs Continuous, Support Domains, Parameters, and Real-World Modeling',
    unitId: 'unit-4',
    unitNumber: 4,
    headers: [
      { key: 'dist', label: 'Distribution', primary: true },
      { key: 'type', label: 'Domain Type' },
      { key: 'parameters', label: 'Key Parameters' },
      { key: 'meanVar', label: 'Mean E[X] / Var(X)' },
      { key: 'modelingUse', label: 'Industrial Modeling Application' },
    ],
    rows: [
      {
        dist: 'Bernoulli / Binomial',
        type: 'Discrete k ∈ {0, 1, ..., n}',
        parameters: 'n (trials), p (success probability)',
        meanVar: 'E[X] = np, Var(X) = np(1-p)',
        modelingUse: 'A/B test conversions, quality control defect counts, click-through rates',
      },
      {
        dist: 'Poisson',
        type: 'Discrete k ∈ {0, 1, 2, ...}',
        parameters: 'λ (average event rate per interval)',
        meanVar: 'E[X] = λ, Var(X) = λ',
        modelingUse: 'Server request volume per second, call center incoming calls, website traffic spikes',
      },
      {
        dist: 'Uniform (Continuous)',
        type: 'Continuous x ∈ [a, b]',
        parameters: 'a (lower bound), b (upper bound)',
        meanVar: 'E[X] = (a+b)/2, Var(X) = (b-a)²/12',
        modelingUse: 'Random number generation, baseline uninformed prior in Bayesian modeling',
      },
      {
        dist: 'Normal / Gaussian',
        type: 'Continuous x ∈ (-∞, +∞)',
        parameters: 'μ (mean / center), σ² (variance / spread)',
        meanVar: 'E[X] = μ, Var(X) = σ²',
        modelingUse: 'Measurement errors, physical heights, financial asset returns, Central Limit Theorem',
      },
    ],
    keyTakeaway: 'The Central Limit Theorem guarantees that the sum or mean of independent random variables from ANY distribution approaches a Normal distribution as n → ∞.',
  },
  {
    id: 'u4-comp-errors',
    title: 'Hypothesis Testing Decision Matrix: Type I vs Type II Errors',
    subtitle: 'Null Hypothesis Decisions, Significance Level α, Statistical Power (1 - β)',
    unitId: 'unit-4',
    unitNumber: 4,
    headers: [
      { key: 'condition', label: 'Reality vs Test Decision', primary: true },
      { key: 'nullTrue', label: 'Reality: H₀ is TRUE' },
      { key: 'nullFalse', label: 'Reality: H₀ is FALSE' },
    ],
    rows: [
      {
        condition: 'Decision: Fail to Reject H₀',
        nullTrue: 'Correct Decision (Confidence Level 1 - α, e.g. 95%)',
        nullFalse: 'Type II Error (β) [False Negative: Missed Effect]',
      },
      {
        condition: 'Decision: Reject H₀ (Flag as Significant)',
        nullTrue: 'Type I Error (α) [False Positive: False Alarm]',
        nullFalse: 'Correct Decision (Statistical Power 1 - β, e.g. 80%)',
      },
    ],
    keyTakeaway: 'Decreasing significance level α reduces Type I errors but inherently increases Type II error β unless sample size n is increased.',
  },
];
