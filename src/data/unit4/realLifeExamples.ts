import { RealLifeExample } from '@/types/experiences';

export const UNIT_4_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u4-ex-medical',
    unitId: 'unit-4',
    unitNumber: 4,
    title: 'Rare Disease Medical Diagnostic Screening & Bayes Theorem',
    industry: 'Clinical Pathology & Epidemiology',
    scenario:
      'A rare medical condition affects 0.1% of the population (Prevalence P(D) = 0.001). A diagnostic blood test has 99% sensitivity (P(+|D) = 0.99) and 95% specificity (P(-|¬D) = 0.95, meaning 5% false positive rate P(+|¬D) = 0.05).',
    dataVariables: 'Prior P(D)=0.001, Sensitivity P(+|D)=0.99, False Positive P(+|¬D)=0.05',
    whatWeWantToKnow:
      'If an asymptomatic patient tests positive (+), what is the actual probability P(D|+) that they have the disease?',
    mathematicalMethod:
      'Apply Bayes Theorem: P(D|+) = [P(+|D) · P(D)] / [P(+|D)P(D) + P(+|¬D)P(¬D)].',
    resultInterpretation:
      'P(D|+) = [0.99 · 0.001] / [0.99 · 0.001 + 0.05 · 0.999] = 0.00099 / (0.00099 + 0.04995) ≈ 0.0194 (1.94%). Despite a "99% accurate" test, a positive patient only has a ~2% chance of having the rare condition!',
    whyItMatters:
      'When the prior disease base rate is extremely low, false positives from the large healthy majority overwhelm true positives, making mandatory confirmatory secondary testing essential.',
  },
  {
    id: 'u4-ex-clt',
    unitId: 'unit-4',
    unitNumber: 4,
    title: 'Cloud Infrastructure SLA Latency & Central Limit Theorem',
    industry: 'Cloud Infrastructure & Distributed Systems',
    scenario:
      'Microservice database queries have a heavily skewed Pareto/exponential latency distribution with high variance. A load balancer batches 100 requests at a time.',
    dataVariables: 'Sample size n = 100, Population mean μ = 45ms, Population std dev σ = 30ms',
    whatWeWantToKnow:
      'What is the probability that the average batch latency of 100 requests exceeds the 50ms SLA budget?',
    mathematicalMethod:
      'Apply Central Limit Theorem: The distribution of sample mean X̄ is approximately Normal N(μ, σ²/n) with standard error SE = 30 / √100 = 3.0ms. Compute Z = (50 - 45) / 3.0 = 1.67 and tail probability P(Z > 1.67).',
    resultInterpretation:
      'P(Z > 1.67) = 1 - 0.9525 = 0.0475 (4.75%). Approximately 4.75% of batched workloads will exceed the 50ms SLA under heavy load.',
    whyItMatters:
      'CLT allows cloud architects to establish precise capacity planning and autoscaling rules regardless of whether individual queries have power-law distributions.',
  },
];
