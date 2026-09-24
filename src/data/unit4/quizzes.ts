import { UnitQuiz } from '@/data/unit1/quizzes';

export const UNIT_4_QUIZ: UnitQuiz = {
  id: 'unit-4-mastery-quiz',
  unitId: 'unit-4',
  unitNumber: 4,
  title: 'Unit 4 Mastery Assessment: Probability & Statistics',
  description: 'Evaluate your conceptual, mathematical, and inferential understanding across all 10 topics of Unit 4.',
  passingScorePercent: 70,
  questions: [
    {
      id: 'u4-q1',
      topic: 'Probability Axioms',
      type: 'conceptual',
      question: 'Which of the following is NOT one of Kolmogorov’s three foundational probability axioms?',
      options: [
        'Non-negativity: P(A) ≥ 0 for all events A',
        'Normalization: P(S) = 1 for the total sample space S',
        'Multiplication: P(A ∩ B) = P(A) × P(B) for all events A and B',
        'Additivity: P(A ∪ B) = P(A) + P(B) for mutually exclusive events'
      ],
      correctIndex: 2,
      explanation: 'The multiplication formula P(A ∩ B) = P(A)P(B) only holds for independent events, not universally as an axiom. The third axiom is countable additivity for disjoint events.'
    },
    {
      id: 'u4-q2',
      topic: 'Probability of Unions',
      type: 'calculation',
      question: 'Given events A and B with P(A) = 0.50, P(B) = 0.40, and P(A ∩ B) = 0.20, what is the union probability P(A ∪ B)?',
      options: ['0.90', '0.70', '0.60', '0.30'],
      correctIndex: 1,
      explanation: 'By the general addition rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.50 + 0.40 - 0.20 = 0.70.'
    },
    {
      id: 'u4-q3',
      topic: 'Random Variables & PDFs',
      type: 'conceptual',
      question: 'For a continuous random variable X with probability density function f(x), what is P(X = 4.0)?',
      options: [
        'f(4.0)',
        '1.0',
        '0.0',
        '1 - f(4.0)'
      ],
      correctIndex: 2,
      explanation: 'For any continuous random variable, the probability of taking an exact single value is zero (P(X = c) = 0), because probability corresponds to the area under the PDF curve over a non-zero interval.'
    },
    {
      id: 'u4-q4',
      topic: 'Binomial Distribution',
      type: 'calculation',
      question: 'A quality control test examines n = 4 items, where each item has a p = 0.5 probability of passing. What is the probability that exactly 2 items pass?',
      options: ['0.250', '0.375', '0.500', '0.125'],
      correctIndex: 1,
      explanation: 'Using the Binomial PMF: P(X=2) = C(4, 2) × (0.5)² × (0.5)² = 6 × 0.25 × 0.25 = 6 × 0.0625 = 0.375.'
    },
    {
      id: 'u4-q5',
      topic: 'Conditional Probability',
      type: 'calculation',
      question: 'If P(A ∩ B) = 0.12 and P(B) = 0.40, what is the conditional probability P(A | B)?',
      options: ['0.30', '0.52', '0.48', '0.048'],
      correctIndex: 0,
      explanation: 'Using the conditional probability definition: P(A | B) = P(A ∩ B) / P(B) = 0.12 / 0.40 = 0.30.'
    },
    {
      id: 'u4-q6',
      topic: 'Statistical Independence',
      type: 'conceptual',
      question: 'If events A and B are statistically independent with P(A) = 0.30 and P(B) = 0.60, what is P(A | B)?',
      options: ['0.18', '0.30', '0.60', '0.90'],
      correctIndex: 1,
      explanation: 'By definition of statistical independence, knowledge that event B occurred provides no information about A, so P(A | B) = P(A) = 0.30.'
    },
    {
      id: 'u4-q7',
      topic: 'Bayes’ Theorem',
      type: 'calculation',
      question: 'A medical condition has a 1% base rate (Prior P(D) = 0.01). A diagnostic test has 90% sensitivity (P(+|D) = 0.90) and a 10% false-positive rate (P(+|D^c) = 0.10). What is the posterior probability P(D | +)?',
      options: ['0.9000', '0.0833', '0.0909', '0.0090'],
      correctIndex: 1,
      explanation: 'Evidence P(+) = (0.90 × 0.01) + (0.10 × 0.99) = 0.0090 + 0.0990 = 0.1080. Posterior P(D|+) = 0.0090 / 0.1080 = 1/12 ≈ 0.0833 (8.33%).'
    },
    {
      id: 'u4-q8',
      topic: 'Expectation & Variance',
      type: 'calculation',
      question: 'If a random variable has E[X] = 4 and E[X²] = 25, what is its variance Var(X)?',
      options: ['21', '9', '16', '5'],
      correctIndex: 1,
      explanation: 'Using the computational formula: Var(X) = E[X²] - (E[X])² = 25 - (4)² = 25 - 16 = 9.'
    },
    {
      id: 'u4-q9',
      topic: 'Central Limit Theorem',
      type: 'conceptual',
      question: 'According to the Central Limit Theorem, what happens to the sampling distribution of the sample mean x̄ as sample size n becomes large?',
      options: [
        'It approaches the exact shape of the underlying population distribution',
        'It approaches a Normal distribution with mean μ and standard error σ / √n',
        'Its variance increases proportionally with n',
        'It becomes a Uniform distribution over the interval [0, 1]'
      ],
      correctIndex: 1,
      explanation: 'The Central Limit Theorem establishes that the distribution of sample means approaches 𝒩(μ, σ²/n) as n increases, regardless of the population distribution shape.'
    },
    {
      id: 'u4-q10',
      topic: 'Confidence Intervals',
      type: 'interpretation',
      question: 'Which statement represents the correct frequentist interpretation of a 95% confidence interval for a population mean?',
      options: [
        'There is a 95% probability that the true parameter μ lies inside this specific computed interval',
        '95% of individual observations in the population fall inside this interval',
        'If the experiment is repeated many times, approximately 95% of the constructed confidence intervals will contain the true population parameter μ',
        'The sample mean has a 95% chance of being equal to the population mean'
      ],
      correctIndex: 2,
      explanation: 'In frequentist statistics, the true parameter μ is a fixed constant. The 95% confidence level describes the long-run success rate of the estimation procedure across infinite repeated random samples.'
    },
    {
      id: 'u4-q11',
      topic: 'Hypothesis Testing & P-Values',
      type: 'interpretation',
      question: 'In an A/B test conducted at significance level α = 0.05, we obtain a p-value of p = 0.008. What is the correct decision and interpretation?',
      options: [
        'Fail to reject H₀ because p < α',
        'Reject H₀ and conclude that there is statistically significant evidence of an effect',
        'Accept H₀ and conclude that the null hypothesis is proven true',
        'Conclude that there is an 0.8% chance that the treatment is ineffective'
      ],
      correctIndex: 1,
      explanation: 'Since p = 0.008 ≤ α = 0.05, we reject the null hypothesis H₀, concluding there is statistically significant evidence supporting the alternative hypothesis.'
    },
    {
      id: 'u4-q12',
      topic: 'Error Types in Decision Making',
      type: 'conceptual',
      question: 'What is a Type II error (β) in hypothesis testing?',
      options: [
        'Rejecting the null hypothesis when it is actually true (false positive)',
        'Failing to reject the null hypothesis when it is actually false (false negative / missed detection)',
        'Setting the significance level α too high',
        'Calculating an incorrect standard deviation'
      ],
      correctIndex: 1,
      explanation: 'A Type II error (beta) occurs when the test fails to reject a false null hypothesis (missing a genuine effect, i.e., a false negative).'
    }
  ]
};
