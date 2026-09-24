import { MiniProjectData } from '@/types/experiences';

export const UNIT_4_MINI_PROJECT: MiniProjectData = {
  id: 'u4-project-ab-testing',
  title: 'E-Commerce Checkout Funnel Two-Sample Z-Test A/B Experiment',
  unitId: 'unit-4',
  unitNumber: 4,
  industryContext: 'Product Growth Analytics & Conversion Rate Optimization (CRO)',
  scenario:
    'You are a Growth Data Scientist at ShopStream. The product team deployed a redesigned 1-click checkout experience (Variant B) against the existing multi-step checkout (Control A). You need to determine if the increase in conversion rate is statistically significant.',
  problemStatement:
    'Control A received n_A = 5,000 visitors with x_A = 600 conversions (p̂_A = 12.0%). Variant B received n_B = 5,000 visitors with x_B = 710 conversions (p̂_B = 14.2%). Formulate null and alternative hypotheses, compute the pooled standard error, calculate the two-proportion Z-score and p-value at significance level α = 0.05, and compute the 95% Confidence Interval.',
  dataset: {
    name: 'checkout_ab_test_summary.csv',
    description: 'Summary metrics from the 14-day randomized experiment',
    columns: ['variant', 'visitors_n', 'conversions_x', 'conversion_rate', 'std_error'],
    sampleRows: [
      { variant: 'Control A (Multi-Step)', visitors_n: 5000, conversions_x: 600, conversion_rate: '12.0%', std_error: '0.0046' },
      { variant: 'Variant B (1-Click)', visitors_n: 5000, conversions_x: 710, conversion_rate: '14.2%', std_error: '0.0049' },
      { variant: 'Pooled Aggregate', visitors_n: 10000, conversions_x: 1310, conversion_rate: '13.1%', std_error: '0.0034' },
    ],
  },
  objectives: [
    'State H₀: p_B - p_A = 0 vs H₁: p_B - p_A > 0 (one-tailed) or p_B ≠ p_A (two-tailed)',
    'Compute pooled conversion proportion p̂_pool = (600 + 710) / (5000 + 5000) = 0.131',
    'Calculate standard error SE_pool = √(p̂(1-p̂)(1/n_A + 1/n_B)) and Z-statistic',
    'Compute two-sided p-value and construct the 95% confidence interval for the uplift',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'State Hypotheses & Pooled Proportion',
      instruction: 'Formulate H0 and H1, then calculate pooled conversion rate p_pool.',
      codeSnippet: `n_a, x_a = 5000, 600\nn_b, x_b = 5000, 710\np_a = x_a / n_a # 0.120\np_b = x_b / n_b # 0.142\np_pool = (x_a + x_b) / (n_a + n_b)\nprint(f"p_a: {p_a:.3f}, p_b: {p_b:.3f}, p_pool: {p_pool:.3f}")`,
      expectedResult: 'p̂_A = 0.120 (12.0%), p̂_B = 0.142 (14.2%), p̂_pool = 0.131 (13.1%)',
      explanation: 'Variant B demonstrates an observed absolute conversion rate lift of +2.2% (+18.3% relative lift).',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Compute Standard Error & Z-Score',
      instruction: 'Calculate SE = √(0.131 · 0.869 · (1/5000 + 1/5000)) and Z = (p_b - p_a) / SE.',
      codeSnippet: `import numpy as np\nfrom scipy import stats\nse_pool = np.sqrt(p_pool * (1 - p_pool) * (1/n_a + 1/n_b))\nz_score = (p_b - p_a) / se_pool\np_val = 2 * (1 - stats.norm.cdf(abs(z_score)))\nprint(f"SE: {se_pool:.5f}, Z: {z_score:.3f}, p-value: {p_val:.5e}")`,
      expectedResult: 'SE = 0.00675, Z = 3.261, p-value = 0.00111 (p < 0.005)',
      explanation: 'With Z = 3.261 and p = 0.00111, the probability of observing a 2.2% lift under the null hypothesis of no effect is approximately 1 in 900.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: '95% Confidence Interval Calculation',
      instruction: 'Calculate 95% CI for the difference (p_B - p_A) ± 1.96 · SE_diff.',
      codeSnippet: `se_diff = np.sqrt((p_a*(1-p_a)/n_a) + (p_b*(1-p_b)/n_b))\nci_lower = (p_b - p_a) - 1.96 * se_diff\nci_upper = (p_b - p_a) + 1.96 * se_diff\nprint(f"95% CI: [{ci_lower*100:.2f}%, {ci_upper*100:.2f}%]")`,
      expectedResult: '95% CI: [+0.88%, +3.52%]',
      explanation: 'The entire 95% confidence interval is strictly positive and bounded away from zero, providing strong evidence for launch.',
    },
  ],
  finalInterpretation:
    'The 1-click checkout experiment yielded a statistically significant conversion rate increase from 12.0% to 14.2% (Z = 3.261, p = 0.0011). Because p < 0.05, we reject the null hypothesis H0. With 95% confidence, deploying Variant B across all traffic will generate between +0.88% and +3.52% in permanent conversion rate uplift.',
  challengeQuestion: {
    question: 'If the team had stopped the test on Day 3 after only 400 visitors because p < 0.01 was observed, what statistical risk would they commit?',
    options: [
      'Type I Error inflation due to continuous peeking without alpha correction',
      'Underpowering the test leading to immediate Type II error',
      'Violating the law of large numbers by changing the sample mean formula',
      'No risk; early stopping is always optimal if p < 0.05',
    ],
    correctIndex: 0,
    explanation:
      'Continuous monitoring and early stopping ("peeking") without statistical correction inflates the false-positive rate (Type I error) from 5% to over 30% due to random early fluctuations.',
  },
};
