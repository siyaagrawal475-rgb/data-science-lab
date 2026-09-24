import { UnitId } from '@/types';
import { FullLessonData } from '@/data/unit1/lessons';

export const UNIT_4_LESSONS: FullLessonData[] = [
  {
    id: 'u4-l1',
    slug: 'probability-basics',
    order: 1,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Probability Fundamentals',
    shortDescription: 'Master the foundational axioms of probability, sample spaces, events, set operations, and classical likelihood quantification.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Define random experiments, sample spaces (S), elementary outcomes, and event sets (E ⊆ S)',
      'Understand Kolmogorov’s three fundamental probability axioms',
      'Calculate event complements, unions, intersections, and mutually exclusive event probabilities',
      'Apply the general addition rule P(A ∪ B) = P(A) + P(B) - P(A ∩ B) to empirical datasets'
    ],
    mainExplanation: 'Probability is the mathematical framework for quantifying uncertainty and reasoning about random phenomena. In data science, every model prediction, feature distribution, anomaly detector, and A/B test is grounded in probability theory. We define a random experiment as any process with uncertain outcomes, its sample space S as the set of all possible outcomes, and an event A as a subset of S.',
    conceptSections: [
      {
        id: 'sec-sample-space',
        title: 'Sample Spaces, Events & Kolmogorov Axioms',
        content: [
          'The sample space S encompasses every possible outcome of an experiment. An event A is any collection of outcomes (A ⊆ S). If an experiment has N equally likely outcomes and event A contains n_A favorable outcomes, the classical probability is P(A) = n_A / N.',
          'Modern probability is rigorously governed by Kolmogorov’s three axioms: (1) Non-negativity: P(A) ≥ 0 for any event A; (2) Normalization: P(S) = 1 (the certain event); and (3) Additivity: for mutually exclusive events A and B (where A ∩ B = ∅), P(A ∪ B) = P(A) + P(B).'
        ],
        table: {
          caption: 'Fundamental Set-Theoretic Probability Rules',
          headers: ['Operation', 'Mathematical Rule', 'Intuition'],
          rows: [
            ['Complement', 'P(A^c) = 1 - P(A)', 'Probability of event A not occurring'],
            ['General Addition', 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)', 'Accounts for double-counting overlapping outcomes'],
            ['Disjoint Union', 'P(A ∪ B) = P(A) + P(B) if A ∩ B = ∅', 'Direct sum when events cannot occur simultaneously'],
            ['Impossible Event', 'P(∅) = 0', 'Probability of the empty outcome set is zero']
          ]
        },
        callout: {
          type: 'tip',
          title: 'Avoiding Double Counting',
          text: 'When calculating the union of non-disjoint events (e.g. user churn OR customer discount usage), always subtract the joint intersection P(A ∩ B) to prevent probability inflation.'
        }
      },
      {
        id: 'sec-counting-empirical',
        title: 'Empirical vs Theoretical Probability',
        content: [
          'Theoretical probability calculates odds from first principles and combinatorial symmetries (e.g. rolling a 6 on a fair die yields P = 1/6 ≈ 0.1667).',
          'Empirical (frequentist) probability estimates likelihood from observed relative frequencies across N recorded trials: P̂(A) = count(A) / N. By the Law of Large Numbers, empirical frequency converges to theoretical probability as N → ∞.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Simulating Empirical vs Theoretical Probability with NumPy',
          code: `import numpy as np

# Simulate 10,000 rolls of a standard fair 6-sided die
trials = 10000
rolls = np.random.randint(1, 7, size=trials)

# Empirical probability of rolling an even number (2, 4, 6)
empirical_p = np.mean(rolls % 2 == 0)
theoretical_p = 3 / 6

print(f"Empirical P(Even):   {empirical_p:.4f}")
print(f"Theoretical P(Even): {theoretical_p:.4f}")
print(f"Estimation Error:    {abs(empirical_p - theoretical_p):.4f}")`
        }
      }
    ],
    keyTakeaways: [
      'A probability measures uncertainty on the bounded interval [0, 1], where 0 represents impossibility and 1 represents absolute certainty.',
      'Kolmogorov axioms guarantee non-negativity, total sample space certainty P(S) = 1, and additivity for mutually exclusive events.',
      'The general addition rule P(A ∪ B) = P(A) + P(B) - P(A ∩ B) corrects for overlap in non-disjoint event sets.',
      'The Law of Large Numbers connects empirical frequency in observational data to underlying theoretical probability distributions.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p1-q1',
        question: 'If event A has probability P(A) = 0.35 and event B has P(B) = 0.40, with joint overlap P(A ∩ B) = 0.15, what is the union probability P(A ∪ B)?',
        options: ['0.75', '0.60', '0.50', '0.90'],
        correctIndex: 1,
        explanation: 'Using the general addition formula: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.35 + 0.40 - 0.15 = 0.60.'
      },
      {
        id: 'u4-p1-q2',
        question: 'Which of the following violates Kolmogorov’s probability axioms?',
        options: [
          'An event with P(A) = 0.0',
          'A sample space with P(S) = 1.0',
          'An event with P(A) = 1.15',
          'Disjoint events where P(A ∪ B) = P(A) + P(B)'
        ],
        correctIndex: 2,
        explanation: 'Probabilities are strictly bounded in the range [0, 1]. A probability of 1.15 violates the normalization axiom.'
      }
    ]
  },
  {
    id: 'u4-l2',
    slug: 'random-variables',
    order: 2,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Random Variables',
    shortDescription: 'Learn how random variables map experimental outcomes to real numbers, contrasting discrete PMFs and continuous PDFs.',
    estimatedDuration: 18,
    contentType: 'derivation',
    learningObjectives: [
      'Define discrete and continuous random variables X: S → ℝ',
      'Interpret Probability Mass Functions (PMF) vs Probability Density Functions (PDF)',
      'Understand Cumulative Distribution Functions (CDF) F(x) = P(X ≤ x)',
      'Differentiate point probabilities P(X = x) from interval integrals P(a ≤ X ≤ b)'
    ],
    mainExplanation: 'A random variable X is a mathematical function that maps outcomes from a sample space S into real numerical values X: S → ℝ. Instead of tracking abstract events, random variables allow us to apply algebra, calculus, and linear modeling to uncertain phenomena. In data science, features in a tabular dataset (e.g. click counts, latency, user age) are modeled as random variables.',
    conceptSections: [
      {
        id: 'sec-discrete-vs-continuous',
        title: 'Discrete vs Continuous Random Variables',
        content: [
          'A Discrete Random Variable takes countable distinct values (e.g. number of server errors X ∈ {0, 1, 2, ...}). It is characterized by a Probability Mass Function (PMF) p(x) = P(X = x), satisfying p(x) ≥ 0 and Σ p(x) = 1.',
          'A Continuous Random Variable takes uncountably infinite values in a real interval (e.g. response latency X ∈ [0, ∞)). It is characterized by a Probability Density Function (PDF) f(x), where probabilities correspond to areas under the curve.'
        ],
        table: {
          caption: 'Discrete vs Continuous Random Variable Comparison',
          headers: ['Characteristic', 'Discrete Variable (X)', 'Continuous Variable (X)'],
          rows: [
            ['Support', 'Countable set {x_1, x_2, ...}', 'Uncountable interval [a, b] ⊆ ℝ'],
            ['Density Function', 'PMF: p(x) = P(X = x)', 'PDF: f(x) ≥ 0 (height is density, not prob)'],
            ['Point Probability', 'P(X = x) ≥ 0', 'P(X = x) = 0 for any single point'],
            ['Interval Probability', 'P(a ≤ X ≤ b) = Σ_{x=a}^b p(x)', 'P(a ≤ X ≤ b) = ∫_a^b f(x) dx'],
            ['Total Measure', 'Σ_{x} p(x) = 1', '∫_{-∞}^∞ f(x) dx = 1']
          ]
        },
        callout: {
          type: 'warning',
          title: 'Continuous Point Probability Paradox',
          text: 'For a continuous random variable, the probability of obtaining an exact instantaneous value is 0 (P(X = 3.14159...) = 0). Probability is only non-zero over a finite interval interval [a, b].'
        }
      },
      {
        id: 'sec-cdf-concept',
        title: 'The Cumulative Distribution Function (CDF)',
        content: [
          'The Cumulative Distribution Function (CDF) F(x) represents the probability that random variable X takes a value less than or equal to x: F(x) = P(X ≤ x).',
          'For discrete variables, F(x) = Σ_{t ≤ x} p(t). For continuous variables, F(x) = ∫_{-∞}^x f(t) dt. Key properties include: F(-∞) = 0, F(∞) = 1, and F(x) is monotonically non-decreasing. Any interval probability can be computed directly as P(a < X ≤ b) = F(b) - F(a).'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Evaluating Discrete PMF and CDF with SciPy',
          code: `from scipy import stats
import numpy as np

# Discrete Binomial(n=10, p=0.3)
binom = stats.binom(n=10, p=0.3)

# PMF at X=3 successes: P(X = 3)
p_exact_3 = binom.pmf(3)

# CDF at X=3: P(X <= 3)
p_up_to_3 = binom.cdf(3)

# Interval P(2 <= X <= 5) = CDF(5) - CDF(1)
p_interval = binom.cdf(5) - binom.cdf(1)

print(f"P(X = 3):     {p_exact_3:.4f}")
print(f"P(X <= 3):    {p_up_to_3:.4f}")
print(f"P(2 <= X <= 5): {p_interval:.4f}")`
        }
      }
    ],
    keyTakeaways: [
      'A random variable maps random experimental outcomes into numerical values suitable for mathematical modeling.',
      'Discrete variables use PMFs where individual heights represent probabilities P(X = x).',
      'Continuous variables use PDFs where areas under the density curve represent interval probabilities ∫ f(x) dx.',
      'The CDF F(x) = P(X ≤ x) provides a unified description for computing interval probabilities P(a < X ≤ b) = F(b) - F(a).'
    ],
    practiceQuestions: [
      {
        id: 'u4-p2-q1',
        question: 'Why is P(X = 2.5) exactly equal to 0 for a continuous random variable X ~ Normal(0, 1)?',
        options: [
          'Because 2.5 is outside the support of the distribution',
          'Because the area under the PDF curve above a single infinitely thin point is zero',
          'Because the PDF height at x = 2.5 is negative',
          'Because continuous variables cannot take non-integer values'
        ],
        correctIndex: 1,
        explanation: 'In continuous probability, probability equals the integral (area) under the PDF. The integral over a single single infinitesimal point dx has width 0, hence P(X = c) = ∫_c^c f(x) dx = 0.'
      },
      {
        id: 'u4-p2-q2',
        question: 'If a random variable has CDF F(x), what is the probability P(2 < X ≤ 7)?',
        options: ['F(7) + F(2)', 'F(7) - F(2)', 'F(7) / F(2)', '1 - F(7)'],
        correctIndex: 1,
        explanation: 'By definition of the cumulative distribution function, P(a < X ≤ b) = F(b) - F(a). Thus P(2 < X ≤ 7) = F(7) - F(2).'
      }
    ]
  },
  {
    id: 'u4-l3',
    slug: 'probability-distributions',
    order: 3,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Probability Distributions',
    shortDescription: 'Examine canonical parametric distributions: Bernoulli, Binomial, Uniform, Normal, and Poisson, and their roles in data science.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Characterize discrete Bernoulli, Binomial, and Poisson probability distributions',
      'Master the continuous Normal (Gaussian) distribution PDF and standard Z-score transformation',
      'Calculate theoretical expected values and variances for common parametric distributions',
      'Select appropriate probability distributions to model real-world business and sensor data'
    ],
    mainExplanation: 'Probability distributions serve as idealized parametric models for real-world phenomena. Rather than storing millions of raw observations, data scientists fit parametric distributions defined by a few governing parameters (e.g. mean μ and variance σ²), enabling risk estimation, synthetic data generation, anomaly thresholding, and statistical testing.',
    conceptSections: [
      {
        id: 'sec-discrete-distributions',
        title: 'Core Discrete Parametric Distributions',
        content: [
          'Bernoulli Distribution: Models a single binary trial with success probability p. PMF: P(X=1) = p, P(X=0) = 1-p. Mean = p, Var = p(1-p).',
          'Binomial Distribution: Models the number of successes k in n independent Bernoulli trials. PMF: P(X=k) = C(n, k) p^k (1-p)^{n-k}. Mean = np, Var = np(1-p).',
          'Poisson Distribution: Models the number of independent events occurring in a fixed interval of time or space with constant rate λ. PMF: P(X=k) = (λ^k e^{-λ}) / k!. Mean = λ, Var = λ.'
        ],
        table: {
          caption: 'Discrete Distribution Summary Table',
          headers: ['Distribution', 'Parameters', 'PMF Formula', 'Mean / Variance', 'Typical Application'],
          rows: [
            ['Bernoulli', 'p ∈ [0, 1]', 'p^k (1-p)^{1-k}', 'μ = p, σ² = p(1-p)', 'Click-through conversion, churn'],
            ['Binomial', 'n ∈ ℕ, p ∈ [0, 1]', 'C(n, k) p^k (1-p)^{n-k}', 'μ = np, σ² = np(1-p)', 'Defect counts in batch QA'],
            ['Poisson', 'λ > 0', '(λ^k e^{-λ}) / k!', 'μ = λ, σ² = λ', 'Server requests/sec, call center arrivals']
          ]
        }
      },
      {
        id: 'sec-gaussian-distribution',
        title: 'The Normal (Gaussian) Distribution',
        content: [
          'The Normal distribution X ~ 𝒩(μ, σ²) is the cornerstone of statistical inference. Its bell-shaped PDF is defined as: f(x) = (1 / (σ√(2π))) * exp(-(x - μ)² / (2σ²)).',
          'Standardization converts any normal variable X ~ 𝒩(μ, σ²) into the standard normal distribution Z ~ 𝒩(0, 1) via the Z-score transformation: z = (x - μ) / σ.',
          'By the Empirical Rule (68-95-99.7 rule): ~68.27% of observations fall within μ ± 1σ, ~95.45% within μ ± 2σ, and ~99.73% within μ ± 3σ.'
        ],
        callout: {
          type: 'math',
          title: 'Standard Normal Z-Score Transformation',
          text: 'Subtracting the mean and dividing by the standard deviation transforms any Gaussian variable into standard units: Z = (X - μ) / σ. This allows universal lookup of cumulative probabilities.'
        },
        codeSnippet: {
          language: 'python',
          caption: 'Computing Normal PDF and Z-Score Tail Probabilities',
          code: `import numpy as np
from scipy import stats

# Server response time: mu = 250ms, sigma = 40ms
mu, sigma = 250, 40

# Probability that latency exceeds 330ms (Z > 2.0)
z = (330 - mu) / sigma
p_exceed = 1 - stats.norm.cdf(z)

print(f"Z-Score:                  {z:.2f}")
print(f"P(Latency > 330ms):       {p_exceed:.4f} ({p_exceed * 100:.2f}%)")`
        }
      }
    ],
    keyTakeaways: [
      'Bernoulli models single binary outcomes; Binomial models counts of successes across n trials.',
      'Poisson models counts of rare independent events occurring at a constant rate λ over a fixed duration.',
      'The Normal distribution 𝒩(μ, σ²) is parameterized by its mean μ (center) and standard deviation σ (spread).',
      'The Z-score z = (x - μ) / σ standardizes values, mapping measurements onto standard normal deviations.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p3-q1',
        question: 'A web server receives on average λ = 4 requests per second according to a Poisson process. What is the variance of the request count?',
        options: ['2', '4', '16', '8'],
        correctIndex: 1,
        explanation: 'For a Poisson distribution with parameter λ, both the theoretical mean and variance are equal to λ. Therefore, Var(X) = λ = 4.'
      },
      {
        id: 'u4-p3-q2',
        question: 'Under a normal distribution X ~ 𝒩(100, 15²), approximately what percentage of observations fall between 70 and 130?',
        options: ['68.3%', '95.4%', '99.7%', '50.0%'],
        correctIndex: 1,
        explanation: 'The interval [70, 130] corresponds to μ ± 2σ (100 ± 2 × 15). By the empirical rule, approximately 95.45% of data falls within 2 standard deviations of the mean.'
      }
    ]
  },
  {
    id: 'u4-l4',
    slug: 'conditional-probability',
    order: 4,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Conditional Probability & Independence',
    shortDescription: 'Understand how conditioning on prior knowledge updates likelihoods, and test statistical independence in feature relationships.',
    estimatedDuration: 16,
    contentType: 'concept',
    learningObjectives: [
      'Define conditional probability P(A | B) = P(A ∩ B) / P(B) for P(B) > 0',
      'Apply the general multiplication rule P(A ∩ B) = P(A | B) P(B)',
      'Formalize statistical independence: P(A | B) = P(A) and P(A ∩ B) = P(A)P(B)',
      'Construct joint and marginal contingency tables from observational datasets'
    ],
    mainExplanation: 'Conditional probability quantifies how the probability of an event A changes when we learn that another event B has occurred. In data science and machine learning, predictive modeling is fundamentally an exercise in estimating conditional probabilities P(Y | X)—the probability of a target label Y given observed input features X.',
    conceptSections: [
      {
        id: 'sec-conditional-definition',
        title: 'Definition & The Multiplication Rule',
        content: [
          'The conditional probability of event A given that event B has occurred (with P(B) > 0) is defined as: P(A | B) = P(A ∩ B) / P(B).',
          'Intuitively, conditioning on B restricts our sample space from the universe S to the subset B. We then measure the proportion of B that also lies within A.',
          'Rearranging yields the Multiplication Rule for joint probabilities: P(A ∩ B) = P(A | B) P(B) = P(B | A) P(A).'
        ],
        table: {
          caption: '2x2 Contingency Table for Email Spam Filter Analysis',
          headers: ['Email Type', 'Contains "Free" (B)', 'Does Not Contain "Free" (B^c)', 'Marginal Total'],
          rows: [
            ['Spam (A)', '0.18', '0.02', 'P(A) = 0.20'],
            ['Ham / Legitimate (A^c)', '0.08', '0.72', 'P(A^c) = 0.80'],
            ['Marginal Total', 'P(B) = 0.26', 'P(B^c) = 0.74', 'P(S) = 1.00']
          ]
        },
        callout: {
          type: 'info',
          title: 'Calculating Conditional Likelihood from Contingency Tables',
          text: 'From the table above: P(Spam | Contains "Free") = P(A ∩ B) / P(B) = 0.18 / 0.26 ≈ 0.6923. Observing the keyword increases spam probability from 20% to ~69.2%.'
        }
      },
      {
        id: 'sec-independence-concept',
        title: 'Statistical Independence',
        content: [
          'Two events A and B are statistically independent if the occurrence of B provides zero information about the likelihood of A: P(A | B) = P(A).',
          'Equivalently, independence holds if and only if their joint probability equals the product of their individual marginal probabilities: P(A ∩ B) = P(A) P(B).',
          'If P(A ∩ B) ≠ P(A) P(B), the events are dependent (correlated). In feature engineering, features strongly dependent on the target variable carry high predictive signal.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Testing Empirical Independence in Pandas',
          code: `import pandas as pd

# Contingency table counts
data = pd.DataFrame({'Device_Mobile': [150, 350], 'Device_Desktop': [250, 250]}, 
                    index=['Converted', 'Not_Converted'])

# Compute marginal probabilities
p_converted = data.loc['Converted'].sum() / data.values.sum()
p_mobile = data['Device_Mobile'].sum() / data.values.sum()
p_joint = data.loc['Converted', 'Device_Mobile'] / data.values.sum()

p_product = p_converted * p_mobile

print(f"P(Converted ∩ Mobile): {p_joint:.4f}")
print(f"P(Converted) * P(Mobile): {p_product:.4f}")
print(f"Independent? {abs(p_joint - p_product) < 0.01}")`
        }
      }
    ],
    keyTakeaways: [
      'Conditional probability P(A | B) = P(A ∩ B) / P(B) rescales the sample space to the conditioning event B.',
      'The multiplication rule P(A ∩ B) = P(A | B) P(B) allows factoring joint probabilities into conditional chains.',
      'Two events are independent if and only if P(A ∩ B) = P(A) P(B) (or equivalently P(A | B) = P(A)).',
      'Supervised machine learning algorithms seek to estimate the conditional distribution P(Target | Features).'
    ],
    practiceQuestions: [
      {
        id: 'u4-p4-q1',
        question: 'If P(A) = 0.40 and P(B) = 0.50, and events A and B are known to be independent, what is P(A ∩ B)?',
        options: ['0.90', '0.20', '0.10', '0.00'],
        correctIndex: 1,
        explanation: 'For independent events, P(A ∩ B) = P(A) × P(B) = 0.40 × 0.50 = 0.20.'
      },
      {
        id: 'u4-p4-q2',
        question: 'In a medical clinic, 10% of patients have the flu (P(Flu) = 0.10). 8% have both fever and flu (P(Fever ∩ Flu) = 0.08). What is P(Fever | Flu)?',
        options: ['0.80', '0.08', '0.18', '0.008'],
        correctIndex: 0,
        explanation: 'Using conditional probability: P(Fever | Flu) = P(Fever ∩ Flu) / P(Flu) = 0.08 / 0.10 = 0.80 (80%).'
      }
    ]
  },
  {
    id: 'u4-l5',
    slug: 'bayes-theorem',
    order: 5,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Bayes’ Theorem',
    shortDescription: 'Invert conditional probabilities using Bayes’ Theorem, updating prior beliefs with empirical evidence in Naive Bayes and anomaly detection.',
    estimatedDuration: 22,
    contentType: 'derivation',
    learningObjectives: [
      'State and derive Bayes’ Theorem: P(A | B) = [P(B | A) P(A)] / P(B)',
      'Differentiate Prior, Likelihood, Evidence (Marginal Likelihood), and Posterior probabilities',
      'Explain the Base Rate Fallacy and why rare events yield high false-positive proportions',
      'Apply Bayesian reasoning to spam filtering and diagnostic classifier evaluation'
    ],
    mainExplanation: 'Bayes’ Theorem provides a principled mathematical rule for updating our belief in a hypothesis A after observing new evidence B. It connects the posterior probability P(A | B) to the prior probability P(A) and the likelihood P(B | A). In machine learning, Bayes’ Theorem underpins Bayesian optimization, Naive Bayes classifiers, and Bayesian neural networks.',
    conceptSections: [
      {
        id: 'sec-bayes-anatomy',
        title: 'The Anatomy of Bayes’ Theorem',
        content: [
          'From the multiplication rule, P(A ∩ B) = P(A | B)P(B) = P(B | A)P(A). Dividing by P(B) yields Bayes’ Theorem: P(A | B) = (P(B | A) P(A)) / P(B).',
          'Using the Law of Total Probability, the denominator P(B) can be expanded over hypothesis A and its complement A^c: P(B) = P(B | A)P(A) + P(B | A^c)P(A^c).'
        ],
        table: {
          caption: 'Components of Bayesian Inference',
          headers: ['Term', 'Mathematical Symbol', 'Intuition'],
          rows: [
            ['Prior Probability', 'P(A)', 'Initial belief before observing evidence B'],
            ['Likelihood', 'P(B | A)', 'Probability of observing evidence B if hypothesis A is true (sensitivity)'],
            ['False Positive Rate', 'P(B | A^c)', 'Probability of observing evidence B when hypothesis A is false'],
            ['Marginal Evidence', 'P(B) = Σ P(B|A_i)P(A_i)', 'Total probability of observing evidence B across all states'],
            ['Posterior Probability', 'P(A | B)', 'Updated belief in hypothesis A given observed evidence B']
          ]
        },
        callout: {
          type: 'warning',
          title: 'The Base Rate Fallacy in Medical & Fraud Testing',
          text: 'If a condition is extremely rare (e.g. 0.1% base rate), even a highly accurate test (99% sensitivity, 5% false positive rate) will yield more false positives than true positives. Always consider the prior base rate!'
        }
      },
      {
        id: 'sec-worked-bayes-example',
        title: 'Worked Numerical Example: Rare Fraud Detection',
        content: [
          'Suppose financial fraud occurs in 1% of transactions (Prior P(Fraud) = 0.01, P(Legit) = 0.99).',
          'An ML fraud detector has a 95% true positive rate (Likelihood P(Flag | Fraud) = 0.95) and a 5% false positive rate (P(Flag | Legit) = 0.05).',
          'If an alert is triggered, what is the posterior probability that the transaction is truly fraudulent?',
          'Evidence P(Flag) = (0.95 × 0.01) + (0.05 × 0.99) = 0.0095 + 0.0495 = 0.0590.',
          'Posterior P(Fraud | Flag) = 0.0095 / 0.0590 ≈ 0.1610 (only 16.1% of flagged transactions are actual fraud!).'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Computing Posterior Probabilities with Python',
          code: `def compute_bayes(prior, sensitivity, false_positive_rate):
    """
    Computes posterior probability P(A|B) using Bayes' Theorem.
    """
    prior_not_a = 1.0 - prior
    evidence = (sensitivity * prior) + (false_positive_rate * prior_not_a)
    posterior = (sensitivity * prior) / evidence
    return posterior, evidence

prior_fraud = 0.01
tpr = 0.95
fpr = 0.05

post, ev = compute_bayes(prior_fraud, tpr, fpr)
print(f"Total Evidence P(Flag):       {ev:.4f}")
print(f"Posterior P(Fraud | Flagged): {post:.4f} ({post * 100:.2f}%)")`
        }
      }
    ],
    keyTakeaways: [
      'Bayes’ Theorem transforms a prior probability P(A) into an updated posterior probability P(A | B) upon observing evidence B.',
      'Posterior = (Likelihood × Prior) / Evidence.',
      'The Base Rate Fallacy occurs when neglecting a very low prior, leading to exaggerated confidence in raw likelihood metrics.',
      'In machine learning, Naive Bayes assumes conditional feature independence to scale Bayesian classification to thousands of dimensions.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p5-q1',
        question: 'What is the denominator P(B) in Bayes’ Theorem formally called?',
        options: ['Prior probability', 'Likelihood', 'Marginal evidence / Total probability of evidence', 'Posterior odds'],
        correctIndex: 2,
        explanation: 'The denominator P(B) is the marginal evidence or total probability of the data, normalizing the posterior distribution.'
      },
      {
        id: 'u4-p5-q2',
        question: 'If prior P(A) = 0.20, likelihood P(B|A) = 0.80, and total evidence P(B) = 0.40, what is the posterior P(A|B)?',
        options: ['0.16', '0.40', '0.50', '0.80'],
        correctIndex: 1,
        explanation: 'Using Bayes formula: P(A|B) = [P(B|A) × P(A)] / P(B) = (0.80 × 0.20) / 0.40 = 0.16 / 0.40 = 0.40 (40%).'
      }
    ]
  },
  {
    id: 'u4-l6',
    slug: 'expectation-variance',
    order: 6,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Expectation, Variance & Standard Deviation',
    shortDescription: 'Derive expected value as the long-run theoretical center of mass, and quantify dispersion through variance and standard deviation.',
    estimatedDuration: 18,
    contentType: 'derivation',
    learningObjectives: [
      'Compute expected values E[X] for discrete and continuous distributions',
      'Apply linearity of expectation: E[aX + bY] = aE[X] + bE[Y]',
      'Derive variance Var(X) = E[(X - μ)²] = E[X²] - (E[X])²',
      'Understand standard deviation σ = √Var(X) as an interpretable metric of dispersion'
    ],
    mainExplanation: 'While a probability distribution describes the complete landscape of possible outcomes, summary moments distill this complexity into key numerical descriptors. Expected Value E[X] represents the probability-weighted central tendency (center of mass), while Variance Var(X) measures the expected squared spread around that center.',
    conceptSections: [
      {
        id: 'sec-expected-value',
        title: 'Expected Value E[X] & Linearity',
        content: [
          'For a discrete random variable, the Expected Value (first raw moment) is the probability-weighted sum: E[X] = Σ x p(x).',
          'For a continuous random variable, E[X] = ∫ x f(x) dx.',
          'A fundamental mathematical property is Linearity of Expectation: for any random variables X and Y and constants a, b: E[aX + bY] = aE[X] + bE[Y], which holds regardless of whether X and Y are independent!'
        ],
        callout: {
          type: 'tip',
          title: 'Expectation as the Long-Run Average',
          text: 'By the Law of Large Numbers, the sample average of n independent observations x̄ = (1/n) Σ x_i converges almost surely to the theoretical expectation E[X] as n → ∞.'
        }
      },
      {
        id: 'sec-variance-stddev',
        title: 'Variance & Standard Deviation',
        content: [
          'Variance (second central moment) measures the expected squared deviation from the mean: Var(X) = E[(X - μ)²].',
          'Computational shortcut formula: Var(X) = E[X²] - (E[X])².',
          'Standard deviation is the positive square root of variance: σ = √Var(X), restoring units to the original measurement scale.',
          'Scaling properties: Var(aX + b) = a² Var(X) (additive constants do not affect spread, while multiplicative constants are squared).'
        ],
        table: {
          caption: 'Expectation and Variance Properties',
          headers: ['Property', 'Expectation', 'Variance'],
          rows: [
            ['Constant c', 'E[c] = c', 'Var(c) = 0'],
            ['Scalar Scaling', 'E[aX] = a E[X]', 'Var(aX) = a² Var(X)'],
            ['Shift by Constant', 'E[X + b] = E[X] + b', 'Var(X + b) = Var(X)'],
            ['Sum (Independent)', 'E[X + Y] = E[X] + E[Y]', 'Var(X + Y) = Var(X) + Var(Y)']
          ]
        },
        codeSnippet: {
          language: 'python',
          caption: 'Calculating Expected Value and Variance in NumPy',
          code: `import numpy as np

# Discrete outcomes (x) and probabilities (p) for a lottery
x = np.array([0, 10, 50, 500])
p = np.array([0.80, 0.15, 0.04, 0.01])

# Expected value E[X]
expected_val = np.sum(x * p)

# E[X^2]
expected_x2 = np.sum((x ** 2) * p)

# Variance Var(X) = E[X^2] - (E[X])^2
var_x = expected_x2 - (expected_val ** 2)
std_x = np.sqrt(var_x)

print(f"Expected Value E[X]: {expected_val:.2f}")
print(f"Variance Var(X):     {var_x:.2f}")
print(f"Std Deviation σ:     {std_x:.2f}")`
        }
      }
    ],
    keyTakeaways: [
      'Expected value E[X] = Σ x p(x) is the center of mass of a probability distribution.',
      'Linearity of expectation E[aX + bY] = aE[X] + bE[Y] holds universally without requiring independence.',
      'Variance Var(X) = E[X²] - (E[X])² measures dispersion in squared units; standard deviation σ = √Var(X) restores original units.',
      'Adding a constant shifts the mean but does not change the variance: Var(X + b) = Var(X).'
    ],
    practiceQuestions: [
      {
        id: 'u4-p6-q1',
        question: 'If random variable X has E[X] = 5 and E[X²] = 34, what is the variance Var(X)?',
        options: ['29', '9', '25', '3'],
        correctIndex: 1,
        explanation: 'Using the computational formula: Var(X) = E[X²] - (E[X])² = 34 - (5)² = 34 - 25 = 9.'
      },
      {
        id: 'u4-p6-q2',
        question: 'If Var(X) = 4, what is the variance of the scaled variable Y = 3X + 10?',
        options: ['12', '22', '36', '46'],
        correctIndex: 2,
        explanation: 'By the scaling property: Var(aX + b) = a² Var(X). Thus Var(3X + 10) = 3² × 4 = 9 × 4 = 36.'
      }
    ]
  },
  {
    id: 'u4-l7',
    slug: 'statistical-inference',
    order: 7,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Statistical Inference & Sampling',
    shortDescription: 'Bridge sample statistics to population parameters through random sampling, sampling distributions, and the Central Limit Theorem.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Distinguish population parameters (μ, σ) from sample statistics (x̄, s)',
      'Understand sampling distributions and quantify sampling variability',
      'Formulate Standard Error SE = σ / √n',
      'Explain the Central Limit Theorem (CLT) and its practical sample size implications'
    ],
    mainExplanation: 'In the real world, observing an entire population is rarely feasible. Statistical inference is the discipline of drawing rigorous conclusions about unobserved population parameters (such as true conversion rate μ) using observational sample statistics (such as sample mean x̄). The mathematical engine enabling this is the Central Limit Theorem.',
    conceptSections: [
      {
        id: 'sec-parameters-vs-statistics',
        title: 'Parameters vs Statistics & Sampling Variability',
        content: [
          'A population parameter (e.g. population mean μ, population variance σ²) is a fixed, typically unknown constant describing the entire universe of entities.',
          'A sample statistic (e.g. sample mean x̄ = (1/n) Σ x_i, sample standard deviation s) is a random variable that varies from one random sample to another.',
          'Sampling variability refers to this natural fluctuation. A single sample mean x̄ is an estimate of μ, and the distribution of x̄ across all possible samples is known as the sampling distribution.'
        ],
        table: {
          caption: 'Population Parameters vs Sample Statistics Notation',
          headers: ['Metric', 'Population Parameter (Greek)', 'Sample Statistic (Latin)'],
          rows: [
            ['Size', 'N (finite population)', 'n (sample count)'],
            ['Mean', 'μ (mu)', 'x̄ (x-bar)'],
            ['Variance', 'σ² (sigma squared)', 's² (sample variance)'],
            ['Standard Deviation', 'σ (sigma)', 's (sample standard deviation)'],
            ['Proportion', 'p or π', 'p̂ (p-hat)']
          ]
        }
      },
      {
        id: 'sec-clt-standard-error',
        title: 'The Central Limit Theorem (CLT) & Standard Error',
        content: [
          'Central Limit Theorem (CLT): Let X_1, X_2, ..., X_n be independent and identically distributed (i.i.d.) random variables with finite mean μ and variance σ². As sample size n increases, the sampling distribution of the sample mean x̄ approaches a Normal distribution regardless of the shape of the underlying population distribution: x̄ ~ 𝒩(μ, σ² / n).',
          'Standard Error (SE): The standard deviation of the sample mean is SE = σ / √n. As sample size quadruples (n → 4n), estimation error is cut in half (SE → SE/2).'
        ],
        callout: {
          type: 'tip',
          title: 'Practical Sample Size Guideline',
          text: 'For moderately skewed populations, a sample size of n ≥ 30 is typically sufficient for the sampling distribution of the mean to be approximately normal.'
        },
        codeSnippet: {
          language: 'python',
          caption: 'Demonstrating CLT Convergence with Exponential Samples',
          code: `import numpy as np

# Draw 1,000 repeated samples of size n=50 from a heavily skewed Exponential distribution
n = 50
num_experiments = 1000
population_scale = 10.0 # True mu = 10, true sigma = 10

sample_means = [np.mean(np.random.exponential(scale=population_scale, size=n)) 
                for _ in range(num_experiments)]

emp_mean = np.mean(sample_means)
emp_se = np.std(sample_means)
theoretical_se = population_scale / np.sqrt(n)

print(f"Mean of Sample Means: {emp_mean:.2f} (Target: 10.0)")
print(f"Empirical Std Error:  {emp_se:.2f}")
print(f"Theoretical SE:       {theoretical_se:.2f}")`
        }
      }
    ],
    keyTakeaways: [
      'Sample statistics (x̄, s) are random variables that estimate fixed unknown population parameters (μ, σ).',
      'The sampling distribution describes the distribution of a statistic over repeated random sampling.',
      'The Central Limit Theorem guarantees that the sample mean x̄ becomes normally distributed as n increases, even for non-normal populations.',
      'Standard Error SE = σ / √n decreases with the square root of sample size, quantifying estimation precision.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p7-q1',
        question: 'If a population has standard deviation σ = 20, what happens to the standard error of the mean when sample size increases from n = 25 to n = 100?',
        options: [
          'It is cut in half (from 4 to 2)',
          'It is reduced by a factor of 4',
          'It doubles',
          'It remains unchanged'
        ],
        correctIndex: 0,
        explanation: 'At n = 25, SE = 20 / √25 = 20 / 5 = 4. At n = 100, SE = 20 / √100 = 20 / 10 = 2. Quadrupling n halves the standard error.'
      },
      {
        id: 'u4-p7-q2',
        question: 'Which condition is NOT required for the classical Central Limit Theorem to hold for sample means?',
        options: [
          'The individual observations are independent',
          'The population variance is finite',
          'The underlying population distribution is perfectly bell-shaped and normal',
          'The sample size n is sufficiently large'
        ],
        correctIndex: 2,
        explanation: 'The power of the CLT is precisely that the underlying population does NOT need to be normal; it can be uniform, exponential, or bimodal.'
      }
    ]
  },
  {
    id: 'u4-l8',
    slug: 'confidence-intervals',
    order: 8,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Confidence Intervals',
    shortDescription: 'Construct and interpret interval estimates, quantifying uncertainty in parameter estimation across 90%, 95%, and 99% confidence levels.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Distinguish single-point estimates from interval estimates',
      'Construct two-sided confidence intervals: Point Estimate ± (Critical Value × SE)',
      'Correctly interpret frequentist confidence levels (e.g. 95% long-run coverage)',
      'Analyze the trade-offs between confidence level, margin of error, and required sample size'
    ],
    mainExplanation: 'A point estimate (like sample mean x̄) provides a single best guess for an unknown population parameter, but provides no information about precision. A Confidence Interval (CI) gives a range of plausible values calculated with a specified confidence level (1 - α), explicitly communicating estimation uncertainty.',
    conceptSections: [
      {
        id: 'sec-ci-formula',
        title: 'Constructing Confidence Intervals for the Mean',
        content: [
          'When population standard deviation σ is known (or sample size n is large), the (1 - α) confidence interval for population mean μ is: x̄ ± z_{α/2} * (σ / √n).',
          'The Margin of Error (ME) is defined as ME = z_{α/2} * (σ / √n). The resulting interval is [x̄ - ME, x̄ + ME].'
        ],
        table: {
          caption: 'Standard Two-Sided Normal Critical Values (Z*)',
          headers: ['Confidence Level (1 - α)', 'Significance Level (α)', 'Critical Value (z_{α/2})', 'Interval Width'],
          rows: [
            ['90%', '0.10', '1.645', 'Narrower (lower certainty)'],
            ['95%', '0.05', '1.960', 'Standard benchmark in data science'],
            ['99%', '0.01', '2.576', 'Wider (higher certainty)']
          ]
        },
        callout: {
          type: 'warning',
          title: 'Statistically Correct Frequentist Interpretation',
          text: 'A 95% confidence interval does NOT mean "there is a 95% probability that the fixed parameter μ is in this specific interval." Rather: if we repeated this sampling procedure 100 times, approximately 95 of the computed intervals would contain the true fixed parameter μ.'
        }
      },
      {
        id: 'sec-ci-tradeoffs',
        title: 'Precision vs Confidence Trade-Offs',
        content: [
          'Increasing confidence (e.g. 95% → 99%) requires a larger critical value z*, resulting in a wider interval (less precision).',
          'To narrow an interval without sacrificing confidence, one must increase sample size n. To cut the margin of error in half, sample size must be quadrupled.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Computing 95% Confidence Interval in Python',
          code: `import numpy as np
from scipy import stats

# E-commerce revenue per session sample (n = 100)
revenue_sample = np.random.normal(loc=42.50, scale=8.0, size=100)

mean = np.mean(revenue_sample)
std_err = stats.sem(revenue_sample)

# 95% confidence interval
ci_95 = stats.norm.interval(0.95, loc=mean, scale=std_err)

print(f"Sample Mean: {mean:.2f}")
print(f"95% CI:      [{ci_95[0]:.2f}, {ci_95[1]:.2f}]")
print(f"Margin of Error: ±{(ci_95[1] - mean):.2f}")`
        }
      }
    ],
    keyTakeaways: [
      'A confidence interval is structured as: Point Estimate ± (Critical Value × Standard Error).',
      'The margin of error ME = z* (σ / √n) quantifies the radius of estimation uncertainty.',
      'Frequentist confidence level refers to long-run procedure coverage over infinite hypothetical samples.',
      'Higher confidence levels widen the interval; increasing sample size narrows the interval.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p8-q1',
        question: 'A data scientist calculates a 95% confidence interval for mean latency as [120ms, 140ms]. Which statement is correct?',
        options: [
          'There is a 95% chance that the true mean latency is between 120ms and 140ms',
          '95% of server requests have latency between 120ms and 140ms',
          'Over repeated random sampling, 95% of intervals generated by this procedure will contain the true population mean latency',
          'The sample mean is exactly 120ms'
        ],
        correctIndex: 2,
        explanation: 'In frequentist statistics, the true population parameter is fixed. The 95% refers to the long-run coverage probability of the interval-generating procedure.'
      },
      {
        id: 'u4-p8-q2',
        question: 'To reduce the margin of error of a confidence interval by half at the same confidence level, by what factor must the sample size n be multiplied?',
        options: ['2', '4', '8', '16'],
        correctIndex: 1,
        explanation: 'Since margin of error is proportional to 1 / √n, dividing the margin of error by 2 requires √n to double, which means n must be multiplied by 4.'
      }
    ]
  },
  {
    id: 'u4-l9',
    slug: 'hypothesis-testing',
    order: 9,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Hypothesis Testing',
    shortDescription: 'Master statistical hypothesis testing: formulating null/alternative hypotheses, computing test statistics and p-values, and controlling Type I & II errors.',
    estimatedDuration: 22,
    contentType: 'concept',
    learningObjectives: [
      'Formulate null (H₀) and alternative (H₁) hypotheses for one-sample and two-sample tests',
      'Define p-value and compare against significance threshold α',
      'Distinguish Type I error (false positive, α) from Type II error (false negative, β)',
      'Interpret statistical decision making without incorrectly "proving" the null hypothesis'
    ],
    mainExplanation: 'Hypothesis testing provides a formal statistical framework for evaluating whether empirical evidence supports a specific claim or is merely attributable to random sampling noise. In data science, hypothesis testing governs A/B experimentation, feature importance verification, and model performance benchmarking.',
    conceptSections: [
      {
        id: 'sec-hypothesis-framework',
        title: 'The 6-Step Hypothesis Testing Workflow',
        content: [
          '1. State Hypotheses: Define the Null Hypothesis H₀ (default claim of no effect or no difference) and Alternative Hypothesis H₁ (the research claim).',
          '2. Choose Significance Level α: Typically α = 0.05 or α = 0.01 (the acceptable risk of a Type I error).',
          '3. Select & Compute Test Statistic: e.g. Z = (x̄ - μ₀) / (σ / √n) or t = (x̄ - μ₀) / (s / √n).',
          '4. Calculate p-value: The probability of obtaining a test statistic at least as extreme as the observed value, assuming H₀ is true.',
          '5. Make Decision: If p ≤ α, reject H₀ in favor of H₁. If p > α, fail to reject H₀.',
          '6. Contextual Interpretation: State the conclusion in plain domain terminology.'
        ],
        table: {
          caption: 'Statistical Decision Matrix: Error Types',
          headers: ['Statistical Decision', 'H₀ is Actually True', 'H₀ is Actually False (H₁ True)'],
          rows: [
            ['Reject H₀', 'Type I Error (False Alarm, prob = α)', 'Correct Decision (Power = 1 - β)'],
            ['Fail to Reject H₀', 'Correct Decision (prob = 1 - α)', 'Type II Error (Missed Detection, prob = β)']
          ]
        },
        callout: {
          type: 'warning',
          title: 'Never "Accept" or "Prove" the Null Hypothesis',
          text: 'Failing to reject H₀ does NOT prove that H₀ is true; it merely indicates that we have insufficient statistical evidence to rule out chance variation.'
        }
      },
      {
        id: 'sec-p-value-misconceptions',
        title: 'P-Values & Statistical vs Practical Significance',
        content: [
          'A p-value is NOT the probability that the null hypothesis is true. It is P(Data as extreme as observed | H₀ is true).',
          'Statistical significance does not automatically imply practical significance. With a massive sample size (e.g. n = 1,000,000), a tiny, practically useless difference of 0.001% in click-through rate can yield p < 0.0001.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Two-Sample A/B Test T-Test in SciPy',
          code: `import numpy as np
from scipy import stats

# A/B testing conversion latency data
variant_a = np.random.normal(loc=1.20, scale=0.30, size=250)
variant_b = np.random.normal(loc=1.12, scale=0.30, size=250)

# Two-sample independent t-test (two-sided)
t_stat, p_val = stats.ttest_ind(variant_a, variant_b)

alpha = 0.05
print(f"T-Statistic: {t_stat:.3f}")
print(f"P-Value:     {p_val:.4f}")

if p_val <= alpha:
    print("Decision: Reject H0 — Statistically significant difference detected.")
else:
    print("Decision: Fail to reject H0 — Insufficient evidence of difference.")`
        }
      }
    ],
    keyTakeaways: [
      'Null hypothesis H₀ represents the baseline assumption of no effect; Alternative H₁ represents the detected effect.',
      'A p-value measures the probability of observing data at least as extreme under the assumption that H₀ is true.',
      'If p ≤ α, we reject H₀; if p > α, we fail to reject H₀.',
      'Type I error α is a false positive; Type II error β is a false negative. Statistical power is 1 - β.'
    ],
    practiceQuestions: [
      {
        id: 'u4-p9-q1',
        question: 'In an A/B test evaluated at α = 0.05, the resulting p-value is 0.021. What is the correct statistical decision?',
        options: [
          'Fail to reject H₀ because p > 0.01',
          'Reject H₀ because p ≤ α (0.021 ≤ 0.05)',
          'Accept the null hypothesis as proven',
          'Conclude that the probability H₀ is true is 2.1%'
        ],
        correctIndex: 1,
        explanation: 'Because the p-value (0.021) is less than the chosen significance threshold α (0.05), we reject the null hypothesis in favor of the alternative.'
      },
      {
        id: 'u4-p9-q2',
        question: 'What type of error occurs when a fraud model blocks a completely legitimate transaction as fraudulent?',
        options: ['Type I Error (False Positive)', 'Type II Error (False Negative)', 'Power Error', 'Standard Error'],
        correctIndex: 0,
        explanation: 'Rejecting a true null hypothesis (flagging a benign transaction as fraud) is a Type I error (false alarm / false positive).'
      }
    ]
  },
  {
    id: 'u4-l10',
    slug: 'probability-statistics-data-science',
    order: 10,
    unitId: 'unit-4' as UnitId,
    unitNumber: 4,
    title: 'Probability & Statistics in Data Science',
    shortDescription: 'Synthesize probability and statistical inference across modern data science: A/B testing, maximum likelihood, anomaly detection, and evaluation.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Map probability distributions to feature engineering and generative modeling',
      'Understand Maximum Likelihood Estimation (MLE) as the statistical objective behind machine learning loss functions',
      'Apply hypothesis testing frameworks to product A/B experimentation and causal inference',
      'Evaluate uncertainty in ML model predictions using confidence and prediction intervals'
    ],
    mainExplanation: 'Probability and statistics are not isolated academic topics—they form the core operating system of modern data science. Every loss function (Cross-Entropy, Mean Squared Error) is a log-likelihood minimization; every A/B test is a hypothesis test; and every anomaly detection pipeline is an empirical tail-probability threshold.',
    conceptSections: [
      {
        id: 'sec-mle-foundations',
        title: 'Maximum Likelihood Estimation (MLE)',
        content: [
          'Maximum Likelihood Estimation (MLE) finds the model parameters θ that maximize the probability of observing the collected dataset: L(θ) = ∏ f(x_i | θ).',
          'In practice, taking the logarithm turns products into sums: log L(θ) = Σ log f(x_i | θ). Minimizing Negative Log-Likelihood (NLL) directly yields the standard Cross-Entropy loss in neural networks and Ordinary Least Squares in linear regression under Gaussian noise assumptions.'
        ],
        table: {
          caption: 'Statistical Foundations of Machine Learning Concepts',
          headers: ['Machine Learning Technique', 'Statistical Principle', 'Mathematical Formulation'],
          rows: [
            ['Logistic Regression', 'Bernoulli Log-Likelihood', 'NLL = -Σ [y log(p) + (1-y) log(1-p)]'],
            ['Linear Regression (MSE)', 'Gaussian Maximum Likelihood', 'arg min Σ (y_i - x_i^T w)² assuming ε ~ 𝒩(0, σ²)'],
            ['Anomaly Detection', 'Tail Probability Thresholding', 'Flag if P(X < x) < α or |z| > 3.0'],
            ['A/B Testing', 'Two-Sample T-Test / Z-Test', 'Test difference in conversion proportions p̂_B - p̂_A']
          ]
        }
      },
      {
        id: 'sec-ab-testing-pipelines',
        title: 'Modern Experimentation & Risk Management',
        content: [
          'In production tech companies, statistical inference governs product development via randomized controlled trials (A/B testing).',
          'Statistical power analysis determines the minimum detectable effect (MDE) and required sample size before launching experiments, preventing underpowered tests and costly false negatives.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Statistical Power and Sample Size Sizing with Statsmodels',
          code: `from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize

# Base conversion = 10%, desired MDE = +1% (11% conversion)
p1 = 0.10
p2 = 0.11

effect_size = proportion_effectsize(p1, p2)
power_analysis = NormalIndPower()

# Calculate required sample size per variant for alpha=0.05, power=0.80
required_n = power_analysis.solve_power(effect_size=effect_size, 
                                        alpha=0.05, 
                                        power=0.80, 
                                        ratio=1.0)

print(f"Cohen's h Effect Size:       {effect_size:.4f}")
print(f"Required Sample per Variant: {int(np.ceil(required_n)):,}")`
        }
      }
    ],
    keyTakeaways: [
      'Machine learning loss functions (like binary cross-entropy and MSE) are direct derivations of Maximum Likelihood Estimation.',
      'Hypothesis testing powers randomized A/B experimentation and feature significance audits.',
      'Uncertainty estimation via confidence intervals and Bayesian posteriors enables robust, risk-aware decision making in production.',
      'Probability and statistics form the essential mathematical foundation for Unit 5 (Regression) and Unit 6 (Classification).'
    ],
    practiceQuestions: [
      {
        id: 'u4-p10-q1',
        question: 'Under Gaussian noise assumptions ε ~ 𝒩(0, σ²), maximizing the log-likelihood of a linear model is mathematically equivalent to minimizing which loss function?',
        options: [
          'Mean Absolute Error (L1)',
          'Mean Squared Error (L2 / OLS)',
          'Hinge Loss',
          'Cross-Entropy Loss'
        ],
        correctIndex: 1,
        explanation: 'The log of a Gaussian PDF contains a -(y - ŷ)² term. Maximizing Gaussian log-likelihood is mathematically identical to minimizing the sum of squared residuals (MSE).'
      },
      {
        id: 'u4-p10-q2',
        question: 'Why is pre-experiment statistical power analysis critical in product A/B testing?',
        options: [
          'To ensure the experiment runs on a sample size large enough to detect meaningful effects while controlling Type II error (β)',
          'To guarantee that the null hypothesis will always be rejected',
          'To convert continuous metrics into categorical labels',
          'To eliminate the need for a control group'
        ],
        correctIndex: 0,
        explanation: 'Power analysis calculates the required sample size to have a high probability (typically 80%+) of detecting a true effect of interest without underpowering the test.'
      }
    ]
  }
];
