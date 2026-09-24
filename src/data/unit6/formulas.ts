import { UnitId } from '@/types';
import { DetailedFormulaItem } from '@/data/unit1/formulas';

export const UNIT_6_FORMULAS: DetailedFormulaItem[] = [
  {
    id: 'u6-f1',
    unitId: 'unit-6' as UnitId,
    title: 'Sigmoid Activation Function',
    category: 'Logistic Regression',
    latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{e^z}{1 + e^z}',
    description: 'Smoothly maps any unbounded real-valued linear score z ∈ (-∞, +∞) into the bounded probability interval (0, 1).',
    meaning: 'Guarantees that model predictions conform to the Kolmogorov axioms of probability.',
    variables: [
      { symbol: 'z', meaning: 'Linear score xᵀβ + β₀' },
      { symbol: '\\sigma(z)', meaning: 'Posterior probability P(Y = 1 | x)' }
    ],
    workedExample: {
      dataset: 'Linear score z = 1.5',
      calculation: 'σ(1.5) = 1 / (1 + e^-1.5) = 1 / (1 + 0.2231) = 1 / 1.2231 ≈ 0.8176',
      result: 'P(Y=1|x) = 81.76%',
      interpretation: 'The instance has an estimated 81.76% probability of belonging to the positive class.'
    }
  },
  {
    id: 'u6-f2',
    unitId: 'unit-6' as UnitId,
    title: 'Logit (Log-Odds) Formulation',
    category: 'Logistic Regression',
    latex: '\\text{logit}(p) = \\ln\\left( \\frac{p}{1 - p} \\right) = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p',
    description: 'Expresses the natural logarithm of the odds of the positive class as a linear combination of predictors.',
    meaning: 'Shows that logistic regression is a generalized linear model with a logit link function.',
    variables: [
      { symbol: 'p', meaning: 'Posterior probability P(Y = 1 | x)' },
      { symbol: 'p / (1-p)', meaning: 'Odds of the positive event occurring' },
      { symbol: '\\beta_j', meaning: 'Change in log-odds per unit increase in feature xⱼ' }
    ],
    workedExample: {
      dataset: 'Probability p = 0.80',
      calculation: 'Odds = 0.80 / 0.20 = 4.0; logit(0.80) = ln(4.0) ≈ 1.3863',
      result: 'Log-odds = 1.3863',
      interpretation: 'The event is 4 times more likely to occur than not, corresponding to a logit of +1.386.'
    }
  },
  {
    id: 'u6-f3',
    unitId: 'unit-6' as UnitId,
    title: 'Logistic Model Probability',
    category: 'Logistic Regression',
    latex: 'P(Y = 1 \\mid \\mathbf{x}) = \\frac{1}{1 + e^{-(\\beta_0 + \\mathbf{x}^T \\boldsymbol{\\beta})}}',
    description: 'Calculates the parametric probability that feature vector x belongs to positive class 1.',
    meaning: 'Forms the core prediction engine for binary logistic regression.',
    variables: [
      { symbol: '\\mathbf{x}', meaning: 'Feature vector [x₁, x₂, ..., x_p]' },
      { symbol: '\\boldsymbol{\\beta}', meaning: 'Fitted weight coefficients vector' },
      { symbol: '\\beta_0', meaning: 'Model intercept / bias term' }
    ],
    workedExample: {
      dataset: 'x = [2], β₁ = 0.5, β₀ = -0.5',
      calculation: 'z = -0.5 + 0.5(2) = 0.5; P = 1 / (1 + e^-0.5) ≈ 1 / (1 + 0.6065) = 0.6225',
      result: 'P = 0.6225 (62.25%)',
      interpretation: 'Given feature value 2, the observation has a 62.25% chance of being positive.'
    }
  },
  {
    id: 'u6-f4',
    unitId: 'unit-6' as UnitId,
    title: 'Binary Cross-Entropy (Log Loss)',
    category: 'Logistic Regression',
    latex: 'L(\\boldsymbol{\\beta}) = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]',
    description: 'Convex cost function measuring divergence between observed binary labels yᵢ ∈ {0, 1} and predicted probabilities pᵢ ∈ (0, 1).',
    meaning: 'Severely penalizes confident incorrect predictions via logarithmic divergence.',
    variables: [
      { symbol: 'y_i', meaning: 'True binary ground-truth label (0 or 1)' },
      { symbol: 'p_i', meaning: 'Predicted probability σ(xᵢᵀβ)' },
      { symbol: 'n', meaning: 'Number of observations' }
    ],
    workedExample: {
      dataset: 'Actual y = 1, Predicted p = 0.90',
      calculation: 'Loss = -[1 · ln(0.90) + 0 · ln(0.10)] = -(-0.1054) = 0.1054',
      result: 'Loss = 0.1054',
      interpretation: 'Accurate high-confidence prediction results in low cross-entropy penalty.'
    }
  },
  {
    id: 'u6-f5',
    unitId: 'unit-6' as UnitId,
    title: 'Logistic Loss Gradient',
    category: 'Logistic Regression',
    latex: '\\nabla_{\\boldsymbol{\\beta}} L = \\frac{1}{n} \\mathbf{X}^T (\\mathbf{p} - \\mathbf{y})',
    description: 'Vector of partial derivatives of cross-entropy loss with respect to parameter vector β.',
    meaning: 'Drives batch gradient descent parameter updates β ← β - α ∇L.',
    variables: [
      { symbol: '\\mathbf{X}', meaning: 'Design feature matrix of shape n × (p+1)' },
      { symbol: '\\mathbf{p}', meaning: 'Vector of predicted probabilities' },
      { symbol: '\\mathbf{y}', meaning: 'Vector of true binary labels' }
    ],
    workedExample: {
      dataset: 'Single sample x = 2, actual y = 1, predicted p = 0.70',
      calculation: 'Error = p - y = 0.70 - 1.0 = -0.30; Gradient = (-0.30) · 2 = -0.60',
      result: '∇β = -0.60',
      interpretation: 'Negative gradient indicates increasing β will decrease loss.'
    }
  },
  {
    id: 'u6-f6',
    unitId: 'unit-6' as UnitId,
    title: 'Euclidean Distance in ℝᵈ',
    category: 'Distance-Based Classification',
    latex: 'd(\\mathbf{u}, \\mathbf{v}) = \\sqrt{\\sum_{j=1}^d (u_j - v_j)^2} = \\|\\mathbf{u} - \\mathbf{v}\\|_2',
    description: 'Calculates the L2 geometric separation between two d-dimensional feature vectors.',
    meaning: 'Serves as the foundational metric for nearest neighbor discovery in KNN and distance-based clustering.',
    variables: [
      { symbol: '\\mathbf{u}, \\mathbf{v}', meaning: 'Feature coordinates of two observations' },
      { symbol: 'd', meaning: 'Number of feature dimensions' }
    ],
    workedExample: {
      dataset: 'u = [1, 2], v = [4, 6]',
      calculation: 'd = √((1-4)² + (2-6)²) = √(9 + 16) = √25 = 5.0',
      result: 'd = 5.0 units',
      interpretation: 'The geometric distance between points u and v is exactly 5.0.'
    }
  },
  {
    id: 'u6-f7',
    unitId: 'unit-6' as UnitId,
    title: 'KNN Posterior Class Probability',
    category: 'Distance-Based Classification',
    latex: 'P(Y = c \\mid \\mathbf{x}_q) = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k(\\mathbf{x}_q)} \\mathbb{I}(y_i = c)',
    description: 'Computes class probability as the empirical vote proportion among the k nearest neighbors.',
    meaning: 'Transforms local geometric neighbor counts into a non-parametric probability estimate.',
    variables: [
      { symbol: 'k', meaning: 'Number of nearest neighbors considered' },
      { symbol: '\\mathcal{N}_k(\\mathbf{x}_q)', meaning: 'Set of indices of the k closest training points to query x_q' },
      { symbol: '\\mathbb{I}', meaning: 'Indicator function returning 1 if true, 0 if false' }
    ],
    workedExample: {
      dataset: 'k = 5 neighbors with labels [1, 1, 1, 0, 0]',
      calculation: 'P(Y=1|x_q) = (1 + 1 + 1 + 0 + 0) / 5 = 3 / 5 = 0.60',
      result: 'P(Y=1|x_q) = 60.0%',
      interpretation: 'The query point is assigned to Class 1 with 60% confidence.'
    }
  },
  {
    id: 'u6-f8',
    unitId: 'unit-6' as UnitId,
    title: 'Gini Impurity',
    category: 'Decision Trees',
    latex: 'G = 1 - \\sum_{k=1}^K p_k^2',
    description: 'Measures the probability of misclassification when a randomly chosen element from the node is labeled randomly according to the class distribution.',
    meaning: 'Serves as the primary split-quality criterion in CART decision trees.',
    variables: [
      { symbol: 'p_k', meaning: 'Fraction of samples in the node belonging to class k' },
      { symbol: 'K', meaning: 'Total number of classes' }
    ],
    workedExample: {
      dataset: 'Node with 7 Class 0 and 3 Class 1 samples',
      calculation: 'p₀ = 0.7, p₁ = 0.3; G = 1 - (0.7² + 0.3²) = 1 - (0.49 + 0.09) = 1 - 0.58 = 0.42',
      result: 'Gini = 0.420',
      interpretation: 'Node has moderate impurity; a pure node would have Gini = 0.0.'
    }
  },
  {
    id: 'u6-f9',
    unitId: 'unit-6' as UnitId,
    title: 'Shannon Entropy',
    category: 'Decision Trees',
    latex: 'H = -\\sum_{k=1}^K p_k \\log_2(p_k)',
    description: 'Measures the information-theoretic uncertainty in bits contained within a node distribution.',
    meaning: 'Used in ID3 and C4.5 tree algorithms to measure class dispersion.',
    variables: [
      { symbol: 'p_k', meaning: 'Class proportion in the node' },
      { symbol: '\\log_2', meaning: 'Base-2 logarithm representing bits' }
    ],
    workedExample: {
      dataset: '50/50 binary split: p₀ = 0.5, p₁ = 0.5',
      calculation: 'H = -(0.5 · log₂(0.5) + 0.5 · log₂(0.5)) = -(0.5(-1) + 0.5(-1)) = +1.0 bit',
      result: 'Entropy = 1.000 bit',
      interpretation: 'Maximum uncertainty for a two-class distribution.'
    }
  },
  {
    id: 'u6-f10',
    unitId: 'unit-6' as UnitId,
    title: 'Information Gain',
    category: 'Decision Trees',
    latex: '\\text{IG}(D, A) = I(D) - \\left( \\frac{|D_L|}{|D|} I(D_L) + \\frac{|D_R|}{|D|} I(D_R) \\right)',
    description: 'Calculates the reduction in parent node impurity achieved by partitioning dataset D into left child D_L and right child D_R.',
    meaning: 'Decision trees greedily select the feature threshold that maximizes Information Gain.',
    variables: [
      { symbol: 'I(D)', meaning: 'Impurity (Gini or Entropy) of parent node' },
      { symbol: '|D_L|, |D_R|', meaning: 'Number of samples sent to left and right children' }
    ],
    workedExample: {
      dataset: 'Parent Gini = 0.50 (10 pts); Left Gini = 0.0 (5 pts); Right Gini = 0.32 (5 pts)',
      calculation: 'IG = 0.50 - (0.5 · 0.0 + 0.5 · 0.32) = 0.50 - 0.16 = 0.34',
      result: 'Information Gain = 0.340',
      interpretation: 'The proposed split reduces overall node impurity by 0.34.'
    }
  },
  {
    id: 'u6-f11',
    unitId: 'unit-6' as UnitId,
    title: 'Classification Accuracy',
    category: 'Model Evaluation',
    latex: '\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}} = \\frac{\\text{Total Correct}}{\\text{Total Samples}}',
    description: 'Proportion of total observations correctly predicted across all classes.',
    meaning: 'Standard benchmark metric; prone to the Accuracy Paradox under imbalanced class distributions.',
    variables: [
      { symbol: '\\text{TP}, \\text{TN}', meaning: 'True Positives and True Negatives' },
      { symbol: '\\text{FP}, \\text{FN}', meaning: 'False Positives and False Negatives' }
    ],
    workedExample: {
      dataset: 'TP = 85, TN = 850, FP = 40, FN = 25',
      calculation: 'Accuracy = (85 + 850) / 1000 = 935 / 1000 = 93.5%',
      result: 'Accuracy = 93.5%',
      interpretation: '93.5% of all samples were correctly classified.'
    }
  },
  {
    id: 'u6-f12',
    unitId: 'unit-6' as UnitId,
    title: 'Precision (Positive Predictive Value)',
    category: 'Model Evaluation',
    latex: '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}',
    description: 'Proportion of instances predicted as Positive that were truly Positive.',
    meaning: 'High precision minimizes False Positives (crucial in spam filters and fraud alarms).',
    variables: [
      { symbol: '\\text{TP}', meaning: 'True Positives' },
      { symbol: '\\text{FP}', meaning: 'False Positives (Type I Error)' }
    ],
    workedExample: {
      dataset: 'TP = 80, FP = 20',
      calculation: 'Precision = 80 / (80 + 20) = 80 / 100 = 80.0%',
      result: 'Precision = 80.0%',
      interpretation: '8 out of every 10 positive alerts are true positive cases.'
    }
  },
  {
    id: 'u6-f13',
    unitId: 'unit-6' as UnitId,
    title: 'Recall (Sensitivity / True Positive Rate)',
    category: 'Model Evaluation',
    latex: '\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}',
    description: 'Proportion of actual Positive instances successfully identified by the model.',
    meaning: 'High recall minimizes False Negatives (critical in medical diagnostics and safety screening).',
    variables: [
      { symbol: '\\text{TP}', meaning: 'True Positives' },
      { symbol: '\\text{FN}', meaning: 'False Negatives (Type II Error)' }
    ],
    workedExample: {
      dataset: 'TP = 90, FN = 10',
      calculation: 'Recall = 90 / (90 + 10) = 90 / 100 = 90.0%',
      result: 'Recall = 90.0%',
      interpretation: 'The model successfully caught 90% of all positive instances.'
    }
  },
  {
    id: 'u6-f14',
    unitId: 'unit-6' as UnitId,
    title: 'Specificity (True Negative Rate)',
    category: 'Model Evaluation',
    latex: '\\text{Specificity} = \\frac{\\text{TN}}{\\text{TN} + \\text{FP}}',
    description: 'Proportion of actual Negative instances correctly identified by the model.',
    meaning: 'Measures the model ability to avoid false alarms on normal cases.',
    variables: [
      { symbol: '\\text{TN}', meaning: 'True Negatives' },
      { symbol: '\\text{FP}', meaning: 'False Positives' }
    ],
    workedExample: {
      dataset: 'TN = 950, FP = 50',
      calculation: 'Specificity = 950 / (950 + 50) = 950 / 1000 = 95.0%',
      result: 'Specificity = 95.0%',
      interpretation: '95% of normal/negative cases were correctly identified.'
    }
  },
  {
    id: 'u6-f15',
    unitId: 'unit-6' as UnitId,
    title: 'F1-Score (Harmonic Mean)',
    category: 'Model Evaluation',
    latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\cdot \\text{TP}}{2 \\cdot \\text{TP} + \\text{FP} + \\text{FN}}',
    description: 'Harmonic mean of Precision and Recall, balancing positive purity and coverage.',
    meaning: 'Preferred single evaluation metric when evaluating models on imbalanced datasets.',
    variables: [
      { symbol: '\\text{Precision}', meaning: 'TP / (TP + FP)' },
      { symbol: '\\text{Recall}', meaning: 'TP / (TP + FN)' }
    ],
    workedExample: {
      dataset: 'Precision = 0.80, Recall = 0.60',
      calculation: 'F1 = 2 · (0.80 · 0.60) / (0.80 + 0.60) = 2 · 0.48 / 1.40 = 0.96 / 1.40 ≈ 0.6857',
      result: 'F1-Score = 68.57%',
      interpretation: 'Harmonic balance between precision and recall.'
    }
  },
  {
    id: 'u6-f16',
    unitId: 'unit-6' as UnitId,
    title: 'Feature Standardization (Z-Score)',
    category: 'Preprocessing',
    latex: 'z_{ij} = \\frac{x_{ij} - \\mu_j}{\\sigma_j}',
    description: 'Centers feature column j to mean 0 and scales to unit variance 1.',
    meaning: 'Mandatory preprocessing for distance-based models (KNN) and gradient-based optimizers (Logistic Regression).',
    variables: [
      { symbol: 'x_{ij}', meaning: 'Raw value of instance i on feature j' },
      { symbol: '\\mu_j', meaning: 'Sample mean of feature j on training set' },
      { symbol: '\\sigma_j', meaning: 'Sample standard deviation of feature j on training set' }
    ],
    workedExample: {
      dataset: 'Training feature μ = 100, σ = 15; raw observation x = 130',
      calculation: 'z = (130 - 100) / 15 = 30 / 15 = +2.00',
      result: 'z = +2.00',
      interpretation: 'The observation is 2 standard deviations above the training baseline mean.'
    }
  }
];
