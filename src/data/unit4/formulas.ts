import { UnitId } from '@/types';
import { DetailedFormulaItem } from '@/data/unit1/formulas';

export const UNIT_4_FORMULAS: DetailedFormulaItem[] = [
  {
    id: 'u4-f1',
    unitId: 'unit-4' as UnitId,
    title: 'Complement Rule',
    category: 'Probability Axioms',
    latex: 'P(A^c) = 1 - P(A)',
    description: 'Calculates the probability that event A does not occur.',
    meaning: 'Used to compute odds of rare event non-occurrence and failure probability in system reliability.',
    variables: [
      { symbol: 'A', meaning: 'Target event of interest' },
      { symbol: 'A^c', meaning: 'Complementary event containing all outcomes in sample space S not in A' },
      { symbol: 'P(A)', meaning: 'Probability of event A occurring' }
    ],
    workedExample: {
      dataset: 'A server has a failure probability P(Crash) = 0.005 on any given day.',
      calculation: 'P(No Crash) = 1 - 0.005 = 0.995',
      result: 'P(A^c) = 0.995 (99.5%)',
      interpretation: 'The probability of the server operating without crashing is 99.5%.'
    }
  },
  {
    id: 'u4-f2',
    unitId: 'unit-4' as UnitId,
    title: 'General Addition Rule',
    category: 'Probability Axioms',
    latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    description: 'Computes the probability of event A or event B (or both) occurring, correcting for joint overlap.',
    meaning: 'Prevents double counting overlapping user cohorts in conversion and engagement telemetry.',
    variables: [
      { symbol: 'P(A \\cup B)', meaning: 'Union probability that either A or B (or both) occurs' },
      { symbol: 'P(A \\cap B)', meaning: 'Joint intersection probability that both A and B occur simultaneously' }
    ],
    workedExample: {
      dataset: 'P(Mobile) = 0.60, P(Discount User) = 0.35, P(Mobile ∩ Discount) = 0.20',
      calculation: 'P(Mobile ∪ Discount) = 0.60 + 0.35 - 0.20 = 0.75',
      result: 'P(A ∪ B) = 0.75 (75%)',
      interpretation: '75% of users accessed via mobile or used a discount code.'
    }
  },
  {
    id: 'u4-f3',
    unitId: 'unit-4' as UnitId,
    title: 'Conditional Probability',
    category: 'Conditional Probability',
    latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} \\quad (\\text{for } P(B) > 0)',
    description: 'Measures the probability of event A given that condition B is known to have occurred.',
    meaning: 'Forms the foundational objective of supervised machine learning: estimating P(Target | Features).',
    variables: [
      { symbol: 'P(A \\mid B)', meaning: 'Conditional probability of A given event B' },
      { symbol: 'P(A \\cap B)', meaning: 'Joint probability of both A and B occurring' },
      { symbol: 'P(B)', meaning: 'Marginal probability of the conditioning event B' }
    ],
    workedExample: {
      dataset: 'P(Spam ∩ Contains "Free") = 0.18, P(Contains "Free") = 0.26',
      calculation: 'P(Spam | Contains "Free") = 0.18 / 0.26 ≈ 0.6923',
      result: 'P(A | B) = 0.6923 (69.23%)',
      interpretation: 'Observing the word "Free" increases the probability of spam from prior base rate to 69.23%.'
    }
  },
  {
    id: 'u4-f4',
    unitId: 'unit-4' as UnitId,
    title: 'Statistical Independence',
    category: 'Conditional Probability',
    latex: 'P(A \\cap B) = P(A) \\cdot P(B) \\iff P(A \\mid B) = P(A)',
    description: 'Condition under which the occurrence of event B provides zero information regarding event A.',
    meaning: 'The core assumption in Naive Bayes classification and independent feature factorizations.',
    variables: [
      { symbol: 'P(A \\cap B)', meaning: 'Joint probability of events A and B' },
      { symbol: 'P(A), P(B)', meaning: 'Marginal probabilities of events A and B' }
    ],
    workedExample: {
      dataset: 'Fair coin flip P(Heads) = 0.5, Fair die roll P(Six) = 1/6 ≈ 0.1667',
      calculation: 'P(Heads ∩ Six) = 0.5 × (1/6) = 1/12 ≈ 0.0833',
      result: 'P(A ∩ B) = 0.0833 (8.33%)',
      interpretation: 'Coin flip and die roll are independent, so their joint probability is the product of marginals.'
    }
  },
  {
    id: 'u4-f5',
    unitId: 'unit-4' as UnitId,
    title: 'Bayes’ Theorem',
    category: 'Bayesian Inference',
    latex: 'P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)} = \\frac{P(B \\mid A) \\, P(A)}{P(B \\mid A)P(A) + P(B \\mid A^c)P(A^c)}',
    description: 'Updates prior belief P(A) with observed evidence B through likelihood P(B|A).',
    meaning: 'Powers Bayesian A/B testing, diagnostic classifier evaluation, and spam filtering.',
    variables: [
      { symbol: 'P(A)', meaning: 'Prior probability of hypothesis A' },
      { symbol: 'P(B \\mid A)', meaning: 'Likelihood of evidence B given hypothesis A is true (Sensitivity)' },
      { symbol: 'P(B)', meaning: 'Marginal evidence / total probability of observing B' },
      { symbol: 'P(A \\mid B)', meaning: 'Updated posterior probability of hypothesis A' }
    ],
    workedExample: {
      dataset: 'Prior P(Fraud) = 0.01, Sensitivity P(Alert|Fraud) = 0.95, False Alarm P(Alert|Legit) = 0.05',
      calculation: 'Evidence = (0.95 × 0.01) + (0.05 × 0.99) = 0.0590; Posterior = (0.95 × 0.01) / 0.0590 ≈ 0.1610',
      result: 'P(Fraud | Alert) = 0.1610 (16.10%)',
      interpretation: 'Despite high test accuracy, low prior prevalence means only 16.1% of alerts are genuine fraud.'
    }
  },
  {
    id: 'u4-f6',
    unitId: 'unit-4' as UnitId,
    title: 'Expected Value (Discrete)',
    category: 'Statistical Moments',
    latex: 'E[X] = \\mu = \\sum_{x} x \\cdot P(X = x)',
    description: 'The probability-weighted average of all possible values of a discrete random variable.',
    meaning: 'Represents the center of mass and long-run expected return in decision trees and reinforcement learning.',
    variables: [
      { symbol: 'x', meaning: 'Specific outcome value in the support of random variable X' },
      { symbol: 'P(X = x)', meaning: 'Probability mass associated with outcome x' },
      { symbol: 'E[X]', meaning: 'Expected value / theoretical mean μ' }
    ],
    workedExample: {
      dataset: 'Lottery outcomes: $0 with p=0.80, $10 with p=0.15, $100 with p=0.05',
      calculation: 'E[X] = (0 × 0.80) + (10 × 0.15) + (100 × 0.05) = 0 + 1.50 + 5.00 = 6.50',
      result: 'E[X] = $6.50',
      interpretation: 'The theoretical expected return per lottery ticket is $6.50.'
    }
  },
  {
    id: 'u4-f7',
    unitId: 'unit-4' as UnitId,
    title: 'Variance & Computational Shortcut',
    category: 'Statistical Moments',
    latex: '\\text{Var}(X) = \\sigma^2 = E[(X - \\mu)^2] = E[X^2] - (E[X])^2',
    description: 'Measures the expected squared deviation of random variable X from its mean μ.',
    meaning: 'Underpins risk assessment in finance, bias-variance tradeoff in machine learning, and regularization.',
    variables: [
      { symbol: 'E[X^2]', meaning: 'Expected value of squared outcomes (second raw moment)' },
      { symbol: '(E[X])^2', meaning: 'Square of the expected value' },
      { symbol: '\\sigma^2', meaning: 'Population variance Var(X)' }
    ],
    workedExample: {
      dataset: 'A random variable with E[X] = 5 and E[X²] = 34',
      calculation: 'Var(X) = 34 - (5)² = 34 - 25 = 9',
      result: 'Var(X) = 9',
      interpretation: 'The variance of the distribution is 9 units squared.'
    }
  },
  {
    id: 'u4-f8',
    unitId: 'unit-4' as UnitId,
    title: 'Standard Deviation',
    category: 'Statistical Moments',
    latex: '\\sigma = \\sqrt{\\text{Var}(X)} = \\sqrt{E[(X - \\mu)^2]}',
    description: 'The positive square root of variance, expressing spread in the original measurement units.',
    meaning: 'Used for feature scaling (StandardScaler), outlier detection (Z-scores), and confidence bounds.',
    variables: [
      { symbol: '\\sigma', meaning: 'Standard deviation in original units' },
      { symbol: '\\text{Var}(X)', meaning: 'Variance in squared units' }
    ],
    workedExample: {
      dataset: 'Server latency variance Var(X) = 900 ms²',
      calculation: 'σ = √900 = 30 ms',
      result: 'σ = 30 ms',
      interpretation: 'Standard deviation indicates latency typically deviates from the mean by ~30 milliseconds.'
    }
  },
  {
    id: 'u4-f9',
    unitId: 'unit-4' as UnitId,
    title: 'Standard Normal Z-Score',
    category: 'Probability Distributions',
    latex: 'z = \\frac{x - \\mu}{\\sigma}',
    description: 'Transforms any normal variable X ~ 𝒩(μ, σ²) into standard normal deviations Z ~ 𝒩(0, 1).',
    meaning: 'Essential for standardization in gradient descent optimization and statistical anomaly scoring.',
    variables: [
      { symbol: 'x', meaning: 'Raw observation value' },
      { symbol: '\\mu', meaning: 'Population mean' },
      { symbol: '\\sigma', meaning: 'Population standard deviation' },
      { symbol: 'z', meaning: 'Number of standard deviations observation x lies above/below the mean' }
    ],
    workedExample: {
      dataset: 'User session duration x = 145s, where μ = 100s and σ = 15s',
      calculation: 'z = (145 - 100) / 15 = 45 / 15 = 3.00',
      result: 'z = +3.00',
      interpretation: 'The session duration is 3 standard deviations above the average, flagged as a high-engagement outlier.'
    }
  },
  {
    id: 'u4-f10',
    unitId: 'unit-4' as UnitId,
    title: 'Standard Error of the Mean',
    category: 'Statistical Inference',
    latex: '\\text{SE} = \\frac{\\sigma}{\\sqrt{n}} \\approx \\frac{s}{\\sqrt{n}}',
    description: 'The standard deviation of the sampling distribution of the sample mean x̄.',
    meaning: 'Measures the precision of a sample mean as an estimate of the population mean μ.',
    variables: [
      { symbol: '\\sigma', meaning: 'Population standard deviation (or sample estimate s)' },
      { symbol: 'n', meaning: 'Sample size / number of observations' },
      { symbol: '\\text{SE}', meaning: 'Standard error of the sample mean' }
    ],
    workedExample: {
      dataset: 'Sample of n = 100 customer ratings with standard deviation s = 1.5',
      calculation: 'SE = 1.5 / √100 = 1.5 / 10 = 0.15',
      result: 'SE = 0.15',
      interpretation: 'The sample average is estimated with a standard error precision of ±0.15 rating units.'
    }
  },
  {
    id: 'u4-f11',
    unitId: 'unit-4' as UnitId,
    title: 'Two-Sided Confidence Interval',
    category: 'Statistical Inference',
    latex: '\\text{CI}_{1-\\alpha} = \\bar{x} \\pm z_{\\alpha/2} \\left( \\frac{\\sigma}{\\sqrt{n}} \\right)',
    description: 'Constructs an interval estimate for population mean μ at confidence level (1 - α).',
    meaning: 'Communicates estimation precision in A/B test conversion rate reporting and KPI tracking.',
    variables: [
      { symbol: '\\bar{x}', meaning: 'Sample mean point estimate' },
      { symbol: 'z_{\\alpha/2}', meaning: 'Standard normal critical value (1.96 for 95% confidence)' },
      { symbol: '\\text{ME}', meaning: 'Margin of error: z_{\\alpha/2} × (σ / √n)' }
    ],
    workedExample: {
      dataset: 'Sample mean x̄ = $45.00, SE = $1.50, 95% confidence (z* = 1.960)',
      calculation: 'ME = 1.960 × 1.50 = 2.94; CI = [45.00 - 2.94, 45.00 + 2.94]',
      result: '95% CI = [$42.06, $47.94]',
      interpretation: 'We are 95% confident that the true population average customer order value is between $42.06 and $47.94.'
    }
  },
  {
    id: 'u4-f12',
    unitId: 'unit-4' as UnitId,
    title: 'Normal (Gaussian) Distribution PDF',
    category: 'Probability Distributions',
    latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)',
    description: 'The probability density function for the continuous Gaussian bell curve.',
    meaning: 'Underlies maximum likelihood estimation, linear regression residuals, and natural process modeling.',
    variables: [
      { symbol: '\\mu', meaning: 'Distribution mean (location parameter / peak center)' },
      { symbol: '\\sigma', meaning: 'Distribution standard deviation (scale parameter / width)' },
      { symbol: 'f(x)', meaning: 'Probability density height at point x' }
    ],
    workedExample: {
      dataset: 'Standard Normal μ = 0, σ = 1 at peak x = 0',
      calculation: 'f(0) = 1 / (1 × √(2π)) × exp(0) = 1 / √6.283185 ≈ 0.3989',
      result: 'f(0) ≈ 0.3989',
      interpretation: 'The maximum height of the standard normal density curve at its mean center is approximately 0.3989.'
    }
  }
];
