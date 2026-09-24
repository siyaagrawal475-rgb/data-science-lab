import { UnitQuiz } from '@/data/unit1/quizzes';

export const UNIT_6_QUIZ: UnitQuiz = {
  id: 'unit-6-mastery-quiz',
  unitId: 'unit-6',
  unitNumber: 6,
  title: 'Unit 6 Mastery Assessment: Classification & Machine Learning',
  description: 'Evaluate your conceptual, mathematical, and algorithmic mastery across all 10 topics of Classification & Machine Learning.',
  passingScorePercent: 70,
  questions: [
    {
      id: 'u6-q1',
      topic: 'Classification vs. Regression',
      type: 'conceptual',
      question: 'What is the fundamental difference in the target variable Y between a classification task and a regression task?',
      options: [
        'Classification predicts continuous real values Y ∈ ℝ, whereas regression predicts discrete categories',
        'Classification predicts discrete categorical class labels, whereas regression predicts continuous quantitative values',
        'Classification is unsupervised learning, whereas regression is supervised learning',
        'Classification models can only take 1 input feature, while regression models take many'
      ],
      correctIndex: 1,
      explanation: 'Supervised classification predicts discrete category labels (e.g. {0, 1} or {Spam, Ham}), whereas regression predicts continuous numeric responses along a quantitative scale.'
    },
    {
      id: 'u6-q2',
      topic: 'Sigmoid Activation Function',
      type: 'numerical',
      question: 'In logistic regression, if the linear score is z = xᵀβ = 0, what is the output probability P(Y = 1 | x) computed by the sigmoid function σ(z)?',
      options: [
        '0.00',
        '0.50',
        '1.00',
        '-1.00'
      ],
      correctIndex: 1,
      explanation: 'The sigmoid function σ(z) = 1 / (1 + e^-z). When z = 0, e^0 = 1, giving σ(0) = 1 / (1 + 1) = 1/2 = 0.50.'
    },
    {
      id: 'u6-q3',
      topic: 'Binary Cross-Entropy Loss',
      type: 'conceptual',
      question: 'Why is Binary Cross-Entropy (Log Loss) preferred over Mean Squared Error (MSE) when training logistic regression models?',
      options: [
        'Because MSE produces a non-convex optimization surface with sigmoid outputs, while Cross-Entropy produces a smooth convex loss surface with unique global minimum',
        'Because Cross-Entropy requires zero gradient computations',
        'Because MSE cannot be computed when probabilities are decimals',
        'Because Cross-Entropy guarantees 100% training accuracy'
      ],
      correctIndex: 0,
      explanation: 'Combining sigmoid outputs with MSE yields a non-convex loss surface with multiple suboptimal local minima. Binary Cross-Entropy derived from Maximum Likelihood Estimation is strictly convex for linear logistic models.'
    },
    {
      id: 'u6-q4',
      topic: 'Decision Boundaries',
      type: 'conceptual',
      question: 'In 2D feature space (x₁, x₂), what geometric shape represents the decision boundary of a standard binary logistic regression model with threshold 0.5?',
      options: [
        'A circle centered at the origin',
        'A straight line defined by β₀ + β₁x₁ + β₂x₂ = 0',
        'A parabolic curve x₂ = x₁²',
        'A step function with discontinuous jumps'
      ],
      correctIndex: 1,
      explanation: 'At probability threshold 0.5, logit(0.5) = 0, so the boundary condition is β₀ + β₁x₁ + β₂x₂ = 0, which is the equation of a straight line in 2D space.'
    },
    {
      id: 'u6-q5',
      topic: 'k-Nearest Neighbors (KNN)',
      type: 'conceptual',
      question: 'What happens to the bias and variance of a k-Nearest Neighbors classifier as hyperparameter k increases from k = 1 to k = n (where n is the training set size)?',
      options: [
        'Bias decreases and variance increases',
        'Bias increases and variance decreases (model becomes smoother and less flexible)',
        'Both bias and variance increase simultaneously',
        'Neither bias nor variance changes'
      ],
      correctIndex: 1,
      explanation: 'Small k = 1 yields high flexibility, low bias, and high variance (overfitting). Large k averages over more data points, smoothing the boundary and increasing bias while decreasing variance.'
    },
    {
      id: 'u6-q6',
      topic: 'Feature Scaling in KNN',
      type: 'conceptual',
      question: 'Why is feature standardization (Z-score scaling) mandatory before fitting a k-Nearest Neighbors classifier?',
      options: [
        'Because KNN cannot calculate distances if any feature has a mean different from zero',
        'Because features with large numerical magnitudes (e.g. Income: $50,000) will dominate the Euclidean distance calculation over small-scale features (e.g. Age: 30)',
        'Because standardization eliminates all outliers from the dataset',
        'Because KNN requires all features to be strictly positive integers'
      ],
      correctIndex: 1,
      explanation: 'Euclidean distance d = √(Σ (u_j - v_j)²) treats all coordinate differences equally. Features with large scales dominate the sum, rendering smaller-scale features effectively invisible unless standardized.'
    },
    {
      id: 'u6-q7',
      topic: 'Decision Tree Impurity',
      type: 'numerical',
      question: 'A decision tree node contains 8 samples belonging to Class 0 and 2 samples belonging to Class 1. What is the Gini Impurity of this node?',
      options: [
        '0.50',
        '0.32',
        '0.16',
        '0.00'
      ],
      correctIndex: 1,
      explanation: 'p₀ = 8/10 = 0.8, p₁ = 2/10 = 0.2. Gini = 1 - (p₀² + p₁²) = 1 - (0.64 + 0.04) = 1 - 0.68 = 0.32.'
    },
    {
      id: 'u6-q8',
      topic: 'Ensemble Learning: Random Forest',
      type: 'conceptual',
      question: 'What is the primary mechanism by which Random Forests improve upon single decision trees?',
      options: [
        'They convert decision trees into logistic regression formulas',
        'They train multiple deep trees in parallel on bootstrap samples and random feature subsets to de-correlate errors and reduce variance',
        'They eliminate the need for any training data',
        'They guarantee that every individual tree has zero error'
      ],
      correctIndex: 1,
      explanation: 'Random Forests use Bootstrap Aggregation (Bagging) combined with random feature subspace sampling at each split to de-correlate individual trees. Averaging their predictions drastically reduces ensemble variance.'
    },
    {
      id: 'u6-q9',
      topic: 'Confusion Matrix Metrics',
      type: 'numerical',
      question: 'A fraud classifier produces the following test confusion matrix: TP = 80, FP = 20, FN = 20, TN = 880. What is the Precision of the model?',
      options: [
        '80.0%',
        '88.9%',
        '96.0%',
        '80 / (80 + 20) = 80.0%'
      ],
      correctIndex: 3,
      explanation: 'Precision = TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 80.0% (meaning 80% of transactions flagged as fraud were truly fraudulent).'
    },
    {
      id: 'u6-q10',
      topic: 'The Accuracy Paradox',
      type: 'conceptual',
      question: 'In a medical disease screening dataset where only 0.5% of patients have the condition, a naive baseline classifier predicts "Healthy" (negative) for every single patient. What is the fatal flaw of this classifier?',
      options: [
        'It has an accuracy of 0.5%',
        'It achieves 99.5% accuracy but has 0% Recall on the disease class, failing to detect any sick patients',
        'It causes the confusion matrix to have negative values',
        'It causes division by zero in the sigmoid function'
      ],
      correctIndex: 1,
      explanation: 'Under severe class imbalance, accuracy is misleading: a model predicting the majority class achieves 99.5% accuracy despite having a Recall of 0% (missing every single disease case).'
    },
    {
      id: 'u6-q11',
      topic: 'Data Leakage & Cross-Validation',
      type: 'conceptual',
      question: 'Which of the following practices constitutes critical DATA LEAKAGE during cross-validation?',
      options: [
        'Computing feature scaling parameters (mean and standard deviation) on the entire dataset BEFORE splitting into CV folds',
        'Fitting the scaler on the training fold and transforming the validation fold',
        'Stratifying folds by class proportions',
        'Tuning the decision threshold strictly on validation folds'
      ],
      correctIndex: 0,
      explanation: 'Fitting scalers or imputation transformers on the full dataset before splitting leaks distribution parameters from the validation folds into the training process, causing over-optimistic validation scores.'
    },
    {
      id: 'u6-q12',
      topic: 'Threshold Calibration',
      type: 'conceptual',
      question: 'If a bank wants to catch almost every fraudulent transaction even if it causes a few more legitimate transactions to trigger verification alerts, how should the decision threshold τ be adjusted?',
      options: [
        'Lower the threshold (e.g. from 0.50 to 0.20) to increase Recall at the cost of lower Precision',
        'Raise the threshold (e.g. from 0.50 to 0.90) to minimize false positives',
        'Keep the threshold at exactly 0.50 because thresholds cannot be changed in machine learning',
        'Set threshold to 1.0 to classify everything as positive'
      ],
      correctIndex: 0,
      explanation: 'Lowering the decision threshold makes the model more sensitive, capturing more positive cases (higher Recall / fewer False Negatives) while accepting more False Positives (lower Precision).'
    }
  ]
};
