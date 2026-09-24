/**
 * Reusable Classification & Machine Learning Mathematics Utilities for Unit 6
 * Data Science Lab
 *
 * Implements strict numerical algorithms for:
 * - Logistic Regression (Sigmoid, Logit, Binary Cross-Entropy, Batch Gradient Descent)
 * - Decision Boundaries & Linear Classifiers
 * - k-Nearest Neighbors (Euclidean distance, neighbor ranking, deterministic voting)
 * - Decision Tree Splitting (Gini Impurity, Entropy, Information Gain, Best Split, Educational Tree Builder)
 * - Confusion Matrix & Classification Metrics (Accuracy, Precision, Recall, Specificity, F1, Balanced Accuracy)
 * - ROC Curve & Area Under the Curve (AUC) Calculation
 * - Feature Preprocessing & Standardization
 * - Deterministic Train/Test & k-Fold Cross-Validation Splitting
 */

import { Matrix } from './matrixMath';

export const EPSILON = 1e-9;

export interface ConfusionMatrixResult {
  tp: number;
  tn: number;
  fp: number;
  fn: number;
  total: number;
  accuracy: number;
  precision: number;
  recall: number;
  specificity: number;
  f1Score: number;
  balancedAccuracy: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface LogisticRegressionResult {
  coefficients: number[];
  intercept: number;
  probabilities: number[];
  predictions: number[];
  loss: number;
  lossHistory: number[];
  iterations: number;
  converged: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface KNNNeighbor {
  index: number;
  point: number[];
  label: number;
  distance: number;
}

export interface KNNResult {
  k: number;
  query: number[];
  neighbors: KNNNeighbor[];
  predictedClass: number;
  votes: Record<number, number>;
  probabilities: Record<number, number>;
  isValid: boolean;
  errorMessage?: string;
}

export interface DecisionTreeNode {
  id: string;
  isLeaf: boolean;
  featureIndex?: number;
  featureName?: string;
  threshold?: number;
  left?: DecisionTreeNode;
  right?: DecisionTreeNode;
  impurity: number;
  samples: number;
  classCounts: Record<number, number>;
  predictedClass: number;
  depth: number;
}

export interface BestSplitResult {
  featureIndex: number;
  threshold: number;
  informationGain: number;
  leftIndices: number[];
  rightIndices: number[];
  impurityLeft: number;
  impurityRight: number;
  isValid: boolean;
}

export interface RocCurveResult {
  thresholds: number[];
  fpr: number[]; // False Positive Rate
  tpr: number[]; // True Positive Rate
  auc: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface KFoldFold {
  trainIndices: number[];
  valIndices: number[];
}

/**
 * Standard Sigmoid activation function: σ(z) = 1 / (1 + e^(-z))
 * Includes numerical clamping to prevent floating-point overflow for large |z|.
 */
export function sigmoid(z: number): number {
  if (z > 35) return 1.0;
  if (z < -35) return 0.0;
  return 1 / (1 + Math.exp(-z));
}

/**
 * Derivative of the sigmoid function: σ'(z) = σ(z) * (1 - σ(z))
 */
export function sigmoidDerivative(z: number): number {
  const s = sigmoid(z);
  return s * (1 - s);
}

/**
 * Logit function (inverse sigmoid / log-odds): ln(p / (1 - p))
 */
export function logit(p: number): number {
  const clampedP = Math.max(EPSILON, Math.min(1 - EPSILON, p));
  return Math.log(clampedP / (1 - clampedP));
}

/**
 * Binary Cross-Entropy / Log Loss:
 * L = -1/n * Σ [y_i * ln(p_i) + (1 - y_i) * ln(1 - p_i)]
 */
export function binaryCrossEntropy(y: number[], probabilities: number[]): number {
  if (!y || !probabilities || y.length !== probabilities.length || y.length === 0) {
    throw new Error('Labels and probabilities must be non-empty arrays of identical length');
  }
  const n = y.length;
  let totalLoss = 0;
  for (let i = 0; i < n; i++) {
    const yi = y[i];
    const pi = Math.max(EPSILON, Math.min(1 - EPSILON, probabilities[i]));
    totalLoss += yi * Math.log(pi) + (1 - yi) * Math.log(1 - pi);
  }
  return -totalLoss / n;
}

/**
 * Alias for binary cross-entropy
 */
export function logisticLoss(y: number[], probabilities: number[]): number {
  return binaryCrossEntropy(y, probabilities);
}

/**
 * Generate logistic probabilities p_i = σ(β₀ + X_i · β)
 */
export function logisticProbabilities(
  X: Matrix,
  coefficients: number[],
  intercept: number = 0
): number[] {
  if (!X || X.length === 0) return [];
  const p = coefficients.length;
  return X.map((row) => {
    let z = intercept;
    for (let j = 0; j < p && j < row.length; j++) {
      z += coefficients[j] * row[j];
    }
    return sigmoid(z);
  });
}

/**
 * Convert predicted probabilities to discrete class labels {0, 1} given threshold
 */
export function classificationThreshold(
  probabilities: number[],
  threshold: number = 0.5
): number[] {
  return probabilities.map((p) => (p >= threshold ? 1 : 0));
}

/**
 * Fit a Binary Logistic Regression model using Batch Gradient Descent.
 * Objective: Minimize Binary Cross Entropy
 * Gradient: ∇L = (1/n) * Xᵀ(p - y)
 */
export function fitLogisticRegression(
  X: Matrix,
  y: number[],
  learningRate: number = 0.1,
  maxEpochs: number = 500,
  tol: number = 1e-6,
  fitIntercept: boolean = true
): LogisticRegressionResult {
  const n = X.length;
  if (!X || !y || n === 0 || y.length === 0 || n !== y.length) {
    return {
      coefficients: [],
      intercept: 0,
      probabilities: [],
      predictions: [],
      loss: 0,
      lossHistory: [],
      iterations: 0,
      converged: false,
      isValid: false,
      errorMessage: 'Invalid or mismatched dataset dimensions for Logistic Regression',
    };
  }

  const p = X[0].length;
  // Initialize parameters to 0 deterministically
  const beta = new Array(p).fill(0);
  let intercept = 0;

  const lossHistory: number[] = [];
  let converged = false;
  let epoch = 0;

  for (epoch = 0; epoch < maxEpochs; epoch++) {
    // Forward pass: compute probabilities
    const probs = logisticProbabilities(X, beta, intercept);
    const loss = binaryCrossEntropy(y, probs);
    lossHistory.push(loss);

    if (epoch > 0 && Math.abs(lossHistory[epoch - 1] - loss) < tol) {
      converged = true;
      break;
    }

    // Compute gradient: grad_j = (1/n) * Σ (p_i - y_i) * x_{ij}
    const gradBeta = new Array(p).fill(0);
    let gradIntercept = 0;

    for (let i = 0; i < n; i++) {
      const error = probs[i] - y[i];
      if (fitIntercept) {
        gradIntercept += error;
      }
      for (let j = 0; j < p; j++) {
        gradBeta[j] += error * X[i][j];
      }
    }

    // Update parameters
    if (fitIntercept) {
      intercept -= (learningRate * gradIntercept) / n;
    }
    for (let j = 0; j < p; j++) {
      beta[j] -= (learningRate * gradBeta[j]) / n;
    }
  }

  const finalProbs = logisticProbabilities(X, beta, intercept);
  const finalLoss = binaryCrossEntropy(y, finalProbs);
  const finalPreds = classificationThreshold(finalProbs, 0.5);

  return {
    coefficients: beta,
    intercept,
    probabilities: finalProbs,
    predictions: finalPreds,
    loss: finalLoss,
    lossHistory,
    iterations: epoch,
    converged,
    isValid: true,
  };
}

/**
 * Euclidean distance between two vectors: d(u, v) = √(Σ (u_i - v_i)²)
 */
export function euclideanDistance(u: number[], v: number[]): number {
  if (!u || !v || u.length !== v.length) {
    throw new Error('Vectors must have identical non-zero dimensions for Euclidean distance');
  }
  let sumSq = 0;
  for (let i = 0; i < u.length; i++) {
    const diff = u[i] - v[i];
    sumSq += diff * diff;
  }
  return Math.sqrt(Math.max(0, sumSq));
}

/**
 * Find the k-nearest neighbors to a query point in training data
 */
export function knnNeighbors(
  trainX: Matrix,
  trainY: number[],
  query: number[],
  k: number
): KNNNeighbor[] {
  const n = trainX.length;
  if (n === 0 || trainY.length !== n) return [];
  const safeK = Math.max(1, Math.min(k, n));

  const distances: KNNNeighbor[] = [];
  for (let i = 0; i < n; i++) {
    const dist = euclideanDistance(trainX[i], query);
    distances.push({
      index: i,
      point: trainX[i],
      label: trainY[i],
      distance: dist,
    });
  }

  // Sort ascending by distance with deterministic tie-breaking on index
  distances.sort((a, b) => {
    const dDiff = a.distance - b.distance;
    if (Math.abs(dDiff) > EPSILON) return dDiff;
    return a.index - b.index;
  });

  return distances.slice(0, safeK);
}

/**
 * Predict class for a query point using k-Nearest Neighbors
 */
export function knnPredict(
  trainX: Matrix,
  trainY: number[],
  query: number[],
  k: number
): KNNResult {
  const n = trainX.length;
  if (n === 0 || trainY.length !== n) {
    return {
      k,
      query,
      neighbors: [],
      predictedClass: 0,
      votes: {},
      probabilities: {},
      isValid: false,
      errorMessage: 'Invalid training data for KNN',
    };
  }

  if (k <= 0) {
    return {
      k,
      query,
      neighbors: [],
      predictedClass: 0,
      votes: {},
      probabilities: {},
      isValid: false,
      errorMessage: 'k must be a positive integer greater than 0',
    };
  }

  const neighbors = knnNeighbors(trainX, trainY, query, k);
  const actualK = neighbors.length;

  const votes: Record<number, number> = {};
  for (const neighbor of neighbors) {
    votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
  }

  const probabilities: Record<number, number> = {};
  for (const label in votes) {
    probabilities[label] = votes[label] / actualK;
  }

  // Determine winning class (deterministic tie-breaking: lower class label wins on exact tie)
  let maxVotes = -1;
  let predictedClass = 0;

  const labels = Object.keys(votes)
    .map(Number)
    .sort((a, b) => a - b);
  for (const label of labels) {
    if (votes[label] > maxVotes) {
      maxVotes = votes[label];
      predictedClass = label;
    }
  }

  return {
    k: actualK,
    query,
    neighbors,
    predictedClass,
    votes,
    probabilities,
    isValid: true,
  };
}

/**
 * Compute Gini Impurity: G = 1 - Σ p_k²
 */
export function giniImpurity(labels: number[]): number {
  const n = labels.length;
  if (n === 0) return 0;
  const counts: Record<number, number> = {};
  for (const lbl of labels) {
    counts[lbl] = (counts[lbl] || 0) + 1;
  }
  let sumSq = 0;
  for (const lbl in counts) {
    const p = counts[lbl] / n;
    sumSq += p * p;
  }
  return Math.max(0, 1 - sumSq);
}

/**
 * Compute Shannon Entropy: H = -Σ p_k * log₂(p_k)
 */
export function entropy(labels: number[]): number {
  const n = labels.length;
  if (n === 0) return 0;
  const counts: Record<number, number> = {};
  for (const lbl of labels) {
    counts[lbl] = (counts[lbl] || 0) + 1;
  }
  let ent = 0;
  for (const lbl in counts) {
    const p = counts[lbl] / n;
    if (p > EPSILON) {
      ent -= p * Math.log2(p);
    }
  }
  return Math.max(0, ent);
}

/**
 * Calculate Information Gain after splitting parent into left and right nodes:
 * IG = Impurity(Parent) - ( |Left|/|Parent| * Impurity(Left) + |Right|/|Parent| * Impurity(Right) )
 */
export function informationGain(
  parentLabels: number[],
  leftLabels: number[],
  rightLabels: number[],
  criterion: 'gini' | 'entropy' = 'gini'
): number {
  const nParent = parentLabels.length;
  if (nParent === 0 || leftLabels.length === 0 || rightLabels.length === 0) {
    return 0;
  }
  const impFn = criterion === 'gini' ? giniImpurity : entropy;
  const parentImp = impFn(parentLabels);
  const leftImp = impFn(leftLabels);
  const rightImp = impFn(rightLabels);

  const weightedImp =
    (leftLabels.length / nParent) * leftImp + (rightLabels.length / nParent) * rightImp;
  return Math.max(0, parentImp - weightedImp);
}

/**
 * Find the best single feature split that maximizes Information Gain
 */
export function findBestSplit(
  X: Matrix,
  y: number[],
  criterion: 'gini' | 'entropy' = 'gini'
): BestSplitResult {
  const n = X.length;
  if (n === 0 || y.length !== n) {
    return {
      featureIndex: -1,
      threshold: 0,
      informationGain: 0,
      leftIndices: [],
      rightIndices: [],
      impurityLeft: 0,
      impurityRight: 0,
      isValid: false,
    };
  }

  const p = X[0].length;
  const impFn = criterion === 'gini' ? giniImpurity : entropy;

  let bestGain = -1;
  let bestFeature = 0;
  let bestThreshold = 0;
  let bestLeftIndices: number[] = [];
  let bestRightIndices: number[] = [];
  let bestImpLeft = 0;
  let bestImpRight = 0;

  for (let j = 0; j < p; j++) {
    // Extract unique sorted feature values
    const uniqueVals = Array.from(new Set(X.map((row) => row[j]))).sort((a, b) => a - b);
    if (uniqueVals.length < 2) continue; // Constant feature cannot split

    for (let t = 0; t < uniqueVals.length - 1; t++) {
      const threshold = (uniqueVals[t] + uniqueVals[t + 1]) / 2;
      const leftIdx: number[] = [];
      const rightIdx: number[] = [];

      for (let i = 0; i < n; i++) {
        if (X[i][j] <= threshold) {
          leftIdx.push(i);
        } else {
          rightIdx.push(i);
        }
      }

      if (leftIdx.length === 0 || rightIdx.length === 0) continue;

      const leftY = leftIdx.map((i) => y[i]);
      const rightY = rightIdx.map((i) => y[i]);
      const gain = informationGain(y, leftY, rightY, criterion);

      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = j;
        bestThreshold = threshold;
        bestLeftIndices = leftIdx;
        bestRightIndices = rightIdx;
        bestImpLeft = impFn(leftY);
        bestImpRight = impFn(rightY);
      }
    }
  }

  if (bestGain <= 0) {
    return {
      featureIndex: 0,
      threshold: 0,
      informationGain: 0,
      leftIndices: [],
      rightIndices: [],
      impurityLeft: 0,
      impurityRight: 0,
      isValid: false,
    };
  }

  return {
    featureIndex: bestFeature,
    threshold: bestThreshold,
    informationGain: bestGain,
    leftIndices: bestLeftIndices,
    rightIndices: bestRightIndices,
    impurityLeft: bestImpLeft,
    impurityRight: bestImpRight,
    isValid: true,
  };
}

/**
 * Build an educational Decision Tree recursively
 */
export function buildDecisionTree(
  X: Matrix,
  y: number[],
  maxDepth: number = 3,
  minSamplesSplit: number = 2,
  criterion: 'gini' | 'entropy' = 'gini',
  currentDepth: number = 0,
  nodeId: string = 'root',
  featureNames?: string[]
): DecisionTreeNode {
  const n = X.length;
  const impFn = criterion === 'gini' ? giniImpurity : entropy;
  const currentImpurity = impFn(y);

  // Compute class counts
  const classCounts: Record<number, number> = {};
  for (const lbl of y) {
    classCounts[lbl] = (classCounts[lbl] || 0) + 1;
  }

  // Determine majority class
  let maxCount = -1;
  let majorityClass = 0;
  for (const lbl in classCounts) {
    if (classCounts[lbl] > maxCount) {
      maxCount = classCounts[lbl];
      majorityClass = Number(lbl);
    }
  }

  // Stopping conditions: pure node, reached max depth, or samples < minSamplesSplit
  if (
    currentImpurity < EPSILON ||
    currentDepth >= maxDepth ||
    n < minSamplesSplit
  ) {
    return {
      id: nodeId,
      isLeaf: true,
      impurity: currentImpurity,
      samples: n,
      classCounts,
      predictedClass: majorityClass,
      depth: currentDepth,
    };
  }

  const bestSplit = findBestSplit(X, y, criterion);
  if (!bestSplit.isValid || bestSplit.informationGain < EPSILON) {
    return {
      id: nodeId,
      isLeaf: true,
      impurity: currentImpurity,
      samples: n,
      classCounts,
      predictedClass: majorityClass,
      depth: currentDepth,
    };
  }

  const leftX = bestSplit.leftIndices.map((i) => X[i]);
  const leftY = bestSplit.leftIndices.map((i) => y[i]);
  const rightX = bestSplit.rightIndices.map((i) => X[i]);
  const rightY = bestSplit.rightIndices.map((i) => y[i]);

  const fName = featureNames && featureNames[bestSplit.featureIndex]
    ? featureNames[bestSplit.featureIndex]
    : `Feature ${bestSplit.featureIndex + 1}`;

  const leftChild = buildDecisionTree(
    leftX,
    leftY,
    maxDepth,
    minSamplesSplit,
    criterion,
    currentDepth + 1,
    `${nodeId}_L`,
    featureNames
  );

  const rightChild = buildDecisionTree(
    rightX,
    rightY,
    maxDepth,
    minSamplesSplit,
    criterion,
    currentDepth + 1,
    `${nodeId}_R`,
    featureNames
  );

  return {
    id: nodeId,
    isLeaf: false,
    featureIndex: bestSplit.featureIndex,
    featureName: fName,
    threshold: bestSplit.threshold,
    left: leftChild,
    right: rightChild,
    impurity: currentImpurity,
    samples: n,
    classCounts,
    predictedClass: majorityClass,
    depth: currentDepth,
  };
}

/**
 * Calculate full Confusion Matrix and Evaluation Metrics:
 * - TP, TN, FP, FN
 * - Accuracy = (TP + TN) / Total
 * - Precision = TP / (TP + FP)
 * - Recall = TP / (TP + FN)
 * - Specificity = TN / (TN + FP)
 * - F1 Score = 2 * Precision * Recall / (Precision + Recall)
 * - Balanced Accuracy = (Recall + Specificity) / 2
 */
export function calculateConfusionMatrix(
  yTrue: number[],
  yPred: number[]
): ConfusionMatrixResult {
  if (!yTrue || !yPred || yTrue.length !== yPred.length || yTrue.length === 0) {
    return {
      tp: 0,
      tn: 0,
      fp: 0,
      fn: 0,
      total: 0,
      accuracy: 0,
      precision: 0,
      recall: 0,
      specificity: 0,
      f1Score: 0,
      balancedAccuracy: 0,
      isValid: false,
      errorMessage: 'Observed and predicted label arrays must be non-empty and of identical length',
    };
  }

  let tp = 0;
  let tn = 0;
  let fp = 0;
  let fn = 0;

  const n = yTrue.length;
  for (let i = 0; i < n; i++) {
    const actual = yTrue[i] === 1 ? 1 : 0;
    const predicted = yPred[i] === 1 ? 1 : 0;

    if (actual === 1 && predicted === 1) tp++;
    else if (actual === 0 && predicted === 0) tn++;
    else if (actual === 0 && predicted === 1) fp++;
    else if (actual === 1 && predicted === 0) fn++;
  }

  const total = tp + tn + fp + fn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
  const f1Score =
    precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  const balancedAccuracy = (recall + specificity) / 2;

  return {
    tp,
    tn,
    fp,
    fn,
    total,
    accuracy,
    precision,
    recall,
    specificity,
    f1Score,
    balancedAccuracy,
    isValid: true,
  };
}

/**
 * Calculate Receiver Operating Characteristic (ROC) curve and Area Under the Curve (AUC)
 */
export function calculateRocCurve(
  yTrue: number[],
  probabilities: number[],
  numThresholds: number = 50
): RocCurveResult {
  if (!yTrue || !probabilities || yTrue.length !== probabilities.length || yTrue.length === 0) {
    return {
      thresholds: [],
      fpr: [],
      tpr: [],
      auc: 0,
      isValid: false,
      errorMessage: 'Invalid dataset for ROC calculation',
    };
  }

  // Generate thresholds from 1.0 down to 0.0
  const thresholds: number[] = [];
  for (let step = 0; step <= numThresholds; step++) {
    thresholds.push(1 - step / numThresholds);
  }

  const tpr: number[] = [];
  const fpr: number[] = [];

  for (const t of thresholds) {
    const preds = classificationThreshold(probabilities, t);
    const cm = calculateConfusionMatrix(yTrue, preds);
    tpr.push(cm.recall); // TPR = Recall = TP / (TP + FN)
    const fpRate = cm.fp + cm.tn > 0 ? cm.fp / (cm.fp + cm.tn) : 0; // FPR = FP / (FP + TN)
    fpr.push(fpRate);
  }

  // Calculate AUC using trapezoidal rule: ∫ TPR d(FPR)
  let auc = 0;
  for (let i = 0; i < fpr.length - 1; i++) {
    const dFpr = fpr[i + 1] - fpr[i];
    const avgTpr = (tpr[i] + tpr[i + 1]) / 2;
    auc += dFpr * avgTpr;
  }
  auc = Math.max(0, Math.min(1, Math.abs(auc)));

  return {
    thresholds,
    fpr,
    tpr,
    auc,
    isValid: true,
  };
}

/**
 * Deterministic Train / Test Split using pseudorandom seeded shuffling
 */
export function trainTestSplit(
  X: Matrix,
  y: number[],
  testSize: number = 0.25,
  seed: number = 42
): {
  trainX: Matrix;
  trainY: number[];
  testX: Matrix;
  testY: number[];
} {
  const n = X.length;
  if (n === 0 || y.length !== n) {
    return { trainX: [], trainY: [], testX: [], testY: [] };
  }

  const indices = Array.from({ length: n }, (_, i) => i);

  // Deterministic Lehmer / LCG shuffle
  let state = seed;
  const nextRandom = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(nextRandom() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const numTest = Math.max(1, Math.min(n - 1, Math.round(n * testSize)));
  const testIndices = indices.slice(0, numTest);
  const trainIndices = indices.slice(numTest);

  return {
    trainX: trainIndices.map((i) => X[i]),
    trainY: trainIndices.map((i) => y[i]),
    testX: testIndices.map((i) => X[i]),
    testY: testIndices.map((i) => y[i]),
  };
}

/**
 * Generate deterministic k-fold cross validation split indices
 */
export function kFoldSplit(n: number, k: number, seed: number = 42): KFoldFold[] {
  if (n < 2 || k < 2 || k > n) {
    throw new Error('Valid k-fold split requires 2 <= k <= n');
  }

  const indices = Array.from({ length: n }, (_, i) => i);
  let state = seed;
  const nextRandom = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(nextRandom() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const folds: KFoldFold[] = [];
  const foldSize = Math.floor(n / k);
  const remainder = n % k;

  let currentStart = 0;
  for (let fold = 0; fold < k; fold++) {
    const currentSize = foldSize + (fold < remainder ? 1 : 0);
    const valIndices = indices.slice(currentStart, currentStart + currentSize);
    const valSet = new Set(valIndices);
    const trainIndices = indices.filter((idx) => !valSet.has(idx));

    folds.push({ trainIndices, valIndices });
    currentStart += currentSize;
  }

  return folds;
}

/**
 * Standardize features (z-score normalization: z = (x - mean) / std)
 * Handles zero standard deviation and constant features safely.
 */
export function standardizeFeatures(X: Matrix): {
  standardized: Matrix;
  means: number[];
  stds: number[];
} {
  if (!X || X.length === 0 || !X[0] || X[0].length === 0) {
    return { standardized: [], means: [], stds: [] };
  }
  const numRows = X.length;
  const numCols = X[0].length;
  const means: number[] = new Array(numCols).fill(0);
  const stds: number[] = new Array(numCols).fill(0);

  // Calculate means
  for (let j = 0; j < numCols; j++) {
    let sum = 0;
    for (let i = 0; i < numRows; i++) {
      sum += X[i][j];
    }
    means[j] = sum / numRows;
  }

  // Calculate standard deviations
  for (let j = 0; j < numCols; j++) {
    let sumSq = 0;
    for (let i = 0; i < numRows; i++) {
      const diff = X[i][j] - means[j];
      sumSq += diff * diff;
    }
    const variance = sumSq / numRows;
    stds[j] = Math.sqrt(variance);
  }

  // Standardize: if std < EPSILON, set to 0 to prevent NaN / div by zero
  const standardized: Matrix = X.map((row) =>
    row.map((val, j) => {
      if (stds[j] < EPSILON) return 0;
      return (val - means[j]) / stds[j];
    })
  );

  return { standardized, means, stds };
}

/**
 * Evaluate model across k folds and return average metric scores
 */
export function crossValidationScore(
  X: Matrix,
  y: number[],
  k: number = 5,
  modelType: 'logistic' | 'knn' = 'logistic',
  knnK: number = 3
): {
  foldScores: number[];
  meanScore: number;
  stdScore: number;
} {
  const folds = kFoldSplit(X.length, k);
  const foldScores: number[] = [];

  for (const fold of folds) {
    const trainX = fold.trainIndices.map((i) => X[i]);
    const trainY = fold.trainIndices.map((i) => y[i]);
    const valX = fold.valIndices.map((i) => X[i]);
    const valY = fold.valIndices.map((i) => y[i]);

    let preds: number[] = [];
    if (modelType === 'logistic') {
      const model = fitLogisticRegression(trainX, trainY);
      const probs = logisticProbabilities(valX, model.coefficients, model.intercept);
      preds = probs.map((p) => (p >= 0.5 ? 1 : 0));
    } else {
      preds = valX.map((pt) => knnPredict(trainX, trainY, pt, knnK).predictedClass);
    }

    const cm = calculateConfusionMatrix(valY, preds);
    foldScores.push(cm.accuracy);
  }

  const meanScore = foldScores.reduce((a, b) => a + b, 0) / foldScores.length;
  const variance = foldScores.reduce((sum, s) => sum + (s - meanScore) ** 2, 0) / foldScores.length;
  const stdScore = Math.sqrt(variance);

  return { foldScores, meanScore, stdScore };
}
