'use client';

import React, { useState } from 'react';
import {
  Search,
  Sigma,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import katex from 'katex';
import { UNITS_DATA } from '@/lib/constants';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';

interface RevisionTopic {
  id: string;
  unitNumber: number;
  unitName: string;
  title: string;
  summary: string;
  keyFormulas: { title: string; latex: string; explanation: string }[];
  commonMistakes: string[];
  examQuestions: { question: string; answer: string; tip: string }[];
}

const REVISION_DATA: RevisionTopic[] = [
  {
    id: 'u1-rev',
    unitNumber: 1,
    unitName: 'Foundations & Exploratory Data Analysis',
    title: 'Summary Statistics, Tukey Outliers & Distributions',
    summary: 'Core data representations, 5-number summary (Min, Q1, Median, Q3, Max), IQR bounds, Variance & Standard Deviation degrees of freedom.',
    keyFormulas: [
      {
        title: 'Sample Variance & Standard Deviation',
        latex: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}',
        explanation: 'Uses Bessel correction (n-1) in denominator to prevent negative variance bias in sample estimation.',
      },
      {
        title: 'Tukey Fence Outlier Bounds',
        latex: '\\text{Lower} = Q_1 - 1.5 \\cdot \\text{IQR}, \\quad \\text{Upper} = Q_3 + 1.5 \\cdot \\text{IQR}',
        explanation: 'Points falling outside [Lower, Upper] are flagged as potential outliers without assuming normal distribution.',
      },
      {
        title: 'Pearson Correlation Coefficient',
        latex: 'r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}',
        explanation: 'Measures linear association between -1.0 (perfect negative) and +1.0 (perfect positive).',
      },
    ],
    commonMistakes: [
      'Using Mean and Standard Deviation on heavily skewed distributions instead of Median and IQR.',
      'Assuming Pearson r = 0 implies no relationship (it only implies no LINEAR relationship; curvilinear patterns can exist).',
      'Discarding outliers automatically before verifying whether they represent authentic high-magnitude events.',
    ],
    examQuestions: [
      {
        question: 'A dataset has Q1 = 20 and Q3 = 50. Is a data point with value 98 considered an outlier under Tukey fences?',
        answer: 'Yes. IQR = 50 - 20 = 30. Upper Fence = 50 + 1.5(30) = 95. Since 98 > 95, it is an outlier.',
        tip: 'Always compute IQR first, then multiply by 1.5 before adding to Q3.',
      },
      {
        question: 'Why do we divide by (n-1) rather than n when computing sample variance?',
        answer: 'Bessel correction accounts for the loss of 1 degree of freedom from estimating the sample mean, producing an unbiased estimator of population variance.',
        tip: 'Sample variance uses n-1; population variance uses N.',
      },
    ],
  },
  {
    id: 'u2-rev',
    unitNumber: 2,
    unitName: 'Linear Algebra & Vectors',
    title: 'Vector Arithmetic, Dot Products, Projections & Norms',
    summary: 'Geometric and algebraic vector spaces, inner products, cosine similarity, orthogonal projections, and L1/L2/L-infinity norms.',
    keyFormulas: [
      {
        title: 'Dot Product & Cosine Similarity',
        latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)',
        explanation: 'The dot product connects algebraic elementwise multiplication with geometric angular alignment.',
      },
      {
        title: 'Orthogonal Vector Projection',
        latex: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\left(\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}}\\right) \\mathbf{v}',
        explanation: 'Calculates the shadow/component of vector u lying along the directional subspace spanned by v.',
      },
      {
        title: 'Euclidean (L2) vs Manhattan (L1) Norms',
        latex: '\\|\\mathbf{v}\\|_2 = \\sqrt{\\sum v_i^2}, \\quad \\|\\mathbf{v}\\|_1 = \\sum |v_i|',
        explanation: 'L2 measures straight-line distance (rotationally invariant); L1 measures grid distance.',
      },
    ],
    commonMistakes: [
      'Confusing vector dot product (which returns a scalar) with matrix multiplication or elementwise Hadamard product.',
      'Forgetting that two non-zero vectors are orthogonal if and only if their dot product equals exactly 0.',
      'Applying vector projection without normalizing by ||v||^2.',
    ],
    examQuestions: [
      {
        question: 'Given u = [3, 4] and v = [4, -3], calculate u · v and determine if they are orthogonal.',
        answer: 'u · v = (3)(4) + (4)(-3) = 12 - 12 = 0. Since the dot product is 0, they are orthogonal.',
        tip: 'Zero dot product guarantees 90° angle between non-zero vectors.',
      },
      {
        question: 'What is the L1 norm of vector w = [-3, 5, -2]?',
        answer: '||w||_1 = |-3| + |5| + |-2| = 3 + 5 + 2 = 10.',
        tip: 'L1 norm is the sum of absolute values.',
      },
    ],
  },
  {
    id: 'u3-rev',
    unitNumber: 3,
    unitName: 'Matrices & Determinants',
    title: 'Matrix Transformations, Inverses, Determinants & Rank',
    summary: 'Linear transformations, Gauss-Jordan elimination, determinant area scaling, rank-nullity theorem, eigenvalues and eigenvectors.',
    keyFormulas: [
      {
        title: '2x2 Matrix Determinant & Inverse',
        latex: 'A^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}, \\quad \\det(A) = ad - bc',
        explanation: 'A square matrix is invertible if and only if its determinant is non-zero (det(A) ≠ 0).',
      },
      {
        title: 'Eigenvalue Characteristic Equation',
        latex: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\iff \\det(A - \\lambda I) = 0',
        explanation: 'Eigenvectors maintain their directional span under transformation A, scaled purely by scalar factor λ.',
      },
    ],
    commonMistakes: [
      'Assuming matrix multiplication is commutative (in general, AB ≠ BA).',
      'Attempting to invert a singular matrix where det(A) = 0.',
      'Multiplying matrices with incompatible inner dimensions (e.g. attempting (3x2) × (3x2) instead of (3x2) × (2x3)).',
    ],
    examQuestions: [
      {
        question: 'Find the determinant of matrix A = [[2, 5], [1, 3]]. Is A invertible?',
        answer: 'det(A) = (2)(3) - (5)(1) = 6 - 5 = 1. Since det(A) ≠ 0, A is invertible.',
        tip: 'det = ad - bc for 2x2 matrices.',
      },
    ],
  },
  {
    id: 'u4-rev',
    unitNumber: 4,
    unitName: 'Probability & Statistics',
    title: 'Probability Axioms, Bayes Theorem & Hypothesis Testing',
    summary: 'Sample spaces, conditional probability, Bayes rule updates, Gaussian distribution parameters, z-tests, p-values and confidence intervals.',
    keyFormulas: [
      {
        title: 'Bayes Theorem',
        latex: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} = \\frac{P(B|A) \\cdot P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}',
        explanation: 'Updates the prior probability of hypothesis A given observation of evidence B.',
      },
      {
        title: 'Standard Normal Z-Score',
        latex: 'z = \\frac{x - \\mu}{\\sigma}, \\quad z_{\\bar{x}} = \\frac{\\bar{x} - \\mu}{\\sigma / \\sqrt{n}}',
        explanation: 'Transforms any normal variable to standard distribution N(0, 1) with standard error SE = σ / √n.',
      },
    ],
    commonMistakes: [
      'Confusing P(A|B) (probability of A given B) with P(B|A) (probability of B given A) — the base-rate fallacy.',
      'Interpreting p-value as the probability that the null hypothesis is true (p-value is the probability of observing data at least as extreme assuming H0 is true).',
      'Accepting H0 rather than failing to reject H0.',
    ],
    examQuestions: [
      {
        question: 'If a hypothesis test yields p = 0.02 at significance level α = 0.05, what is the statistical conclusion?',
        answer: 'Since p < α (0.02 < 0.05), we reject the null hypothesis H₀ at the 5% significance level.',
        tip: 'When p is low, the null must go.',
      },
    ],
  },
  {
    id: 'u5-rev',
    unitNumber: 5,
    unitName: 'Regression Analysis',
    title: 'OLS Line Fitting, Residuals, Gradient Descent & Regularization',
    summary: 'Closed-form ordinary least squares, slope/intercept formulas, coefficient of determination R², gradient descent optimization, Ridge (L2) and Lasso (L1).',
    keyFormulas: [
      {
        title: 'OLS Slope & Intercept Equations',
        latex: '\\beta_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}, \\quad \\beta_0 = \\bar{y} - \\beta_1 \\bar{x}',
        explanation: 'Minimizes the sum of squared vertical residuals between predicted and observed targets.',
      },
      {
        title: 'Gradient Descent Parameter Update',
        latex: '\\theta_j := \\theta_j - \\alpha \\frac{\\partial J(\\theta)}{\\partial \\theta_j} = \\theta_j - \\alpha \\frac{1}{m} \\sum_{i=1}^m (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}',
        explanation: 'Iteratively shifts weights opposite the loss gradient scaled by learning rate α.',
      },
    ],
    commonMistakes: [
      'Failing to standardize features before applying Ridge or Lasso regularization.',
      'Using an excessively large learning rate α causing gradient descent divergence (loss increasing to infinity).',
      'Assuming R² = 1.0 indicates a great model without checking for extreme polynomial overfitting.',
    ],
    examQuestions: [
      {
        question: 'What is the primary structural difference in feature selection between Lasso (L1) and Ridge (L2) regression?',
        answer: 'Lasso (L1) drives irrelevant feature coefficients exactly to zero, performing sparse feature selection, whereas Ridge (L2) shrinks coefficients asymptotically toward zero without setting them to exact zero.',
        tip: 'L1 = absolute penalty (sparsity); L2 = squared penalty (shrinkage).',
      },
    ],
  },
  {
    id: 'u6-rev',
    unitNumber: 6,
    unitName: 'Classification & Machine Learning',
    title: 'Logistic Sigmoid, Confusion Matrices, KNN & Naive Bayes',
    summary: 'Binary & multiclass decision boundaries, sigmoid probability activation, precision/recall/F1 trade-offs, ROC-AUC, and distance-based classification.',
    keyFormulas: [
      {
        title: 'Sigmoid Logistic Activation Function',
        latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p)}}',
        explanation: 'Maps any real-valued linear score z ∈ (-∞, +∞) into a valid probability output p ∈ (0, 1).',
      },
      {
        title: 'Precision, Recall & F1-Score',
        latex: '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}, \\quad \\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}, \\quad F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
        explanation: 'Precision measures prediction purity; Recall measures sensitivity to actual positive cases.',
      },
    ],
    commonMistakes: [
      'Relying solely on Accuracy for severely imbalanced classification datasets (e.g. 99% negative class).',
      'Failing to scale input features before running distance-based algorithms like K-Nearest Neighbors (KNN).',
      'Assuming Naive Bayes accounts for feature collinearity (it naively assumes all features are conditionally independent).',
    ],
    examQuestions: [
      {
        question: 'In a medical cancer detection model where missing a positive case is catastrophic, should we optimize for Precision or Recall?',
        answer: 'We should optimize for Recall (Sensitivity) to minimize False Negatives (FN), ensuring virtually all cancer patients are flagged.',
        tip: 'High Recall minimizes False Negatives.',
      },
    ],
  },
];

export default function RevisionPage() {
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const renderKatex = (latex: string) => {
    try {
      return { __html: katex.renderToString(latex, { throwOnError: false }) };
    } catch {
      return { __html: latex };
    }
  };

  const copyLatex = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormula(latex);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const filteredTopics = REVISION_DATA.filter((topic) => {
    if (selectedUnit !== 'all' && topic.unitNumber !== selectedUnit) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.summary.toLowerCase().includes(q) ||
      topic.unitName.toLowerCase().includes(q) ||
      topic.keyFormulas.some((f) => f.title.toLowerCase().includes(q) || f.explanation.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-10">
      <PageHeader
        title="Revision Center & Formula Dossier"
        description="Comprehensive summary sheets, high-yield mathematical derivations, common exam pitfalls, and check-point questions across all six units."
        breadcrumbs={[{ label: 'Revision' }]}
        actions={
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />}
          >
            Print Cheat Sheet
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas, keywords..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-xl focus:border-[#91B9E8] focus:outline-none transition-colors"
          />
        </div>

        {/* Unit Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedUnit === 'all'
                ? 'bg-[#172033] dark:bg-[#202D3B] text-white shadow-xs'
                : 'bg-[#F1F5F9] dark:bg-[#1B2735] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
            }`}
          >
            All Units
          </button>
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const u = UNITS_DATA.find((unit) => unit.unitNumber === num);
            const isSelected = selectedUnit === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedUnit(num)}
                style={
                  isSelected && u
                    ? {
                        backgroundColor: u.colorTokens.soft,
                        color: u.colorTokens.text,
                        borderColor: u.colorTokens.border,
                      }
                    : undefined
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'shadow-xs font-bold'
                    : 'border-transparent bg-[#F1F5F9] dark:bg-[#1B2735] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
                }`}
              >
                Unit {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Revision Content Feed */}
      <div className="space-y-8">
        {filteredTopics.map((topic) => {
          const unit = UNITS_DATA.find((u) => u.unitNumber === topic.unitNumber);
          return (
            <div
              key={topic.id}
              className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: unit?.accentColor || '#91B9E8' }}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#B8C4D1]">
                      Unit {topic.unitNumber}: {topic.unitName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#172033] dark:text-[#F1F5F9] mt-1">
                    {topic.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#B8C4D1] mt-1">
                    {topic.summary}
                  </p>
                </div>
              </div>

              {/* Key Formulas Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#B8C4D1] flex items-center gap-1.5">
                  <Sigma className="w-3.5 h-3.5 text-[#416B9E] dark:text-[#91B9E8]" />
                  <span>Essential Formulas & Equations</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {topic.keyFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#172033] dark:text-[#F1F5F9]">
                          {f.title}
                        </span>
                        <button
                          onClick={() => copyLatex(f.latex)}
                          className="flex items-center gap-1 text-[11px] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white cursor-pointer"
                        >
                          {copiedFormula === f.latex ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy LaTeX</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div
                        className="py-2 overflow-x-auto text-sm sm:text-base text-[#172033] dark:text-[#F1F5F9]"
                        dangerouslySetInnerHTML={renderKatex(f.latex)}
                      />

                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] italic">
                        {f.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Pitfalls / Mistakes */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Common Conceptual Pitfalls to Avoid</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#334155] dark:text-[#CBD5E1]">
                  {topic.commonMistakes.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exam Checkpoint Questions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exam-Style Practice Checkpoints</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {topic.examQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2"
                    >
                      <p className="text-xs sm:text-sm font-bold text-[#172033] dark:text-[#F1F5F9]">
                        Q{idx + 1}: {q.question}
                      </p>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        <span className="font-bold">Answer:</span> {q.answer}
                      </p>
                      <p className="text-[11px] text-[#64748B] dark:text-[#B8C4D1] italic">
                        💡 Key Insight: {q.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
