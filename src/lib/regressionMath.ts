/**
 * Reusable Regression Mathematics Utilities for Unit 5: Regression Analysis
 * Data Science Lab
 *
 * Implements strict numerical algorithms for:
 * - Simple Linear Regression (Closed-Form Least Squares)
 * - Error Metrics (SSE, MSE, RMSE, SST, R², Adjusted R²)
 * - Multiple Linear Regression (Matrix OLS with Singularity Detection)
 * - Polynomial Regression (Vandermonde Design Matrix)
 * - Regularization (Ridge Regression & Lasso Coordinate Descent)
 * - Feature Standardization
 */

import {
  Matrix,
  Vector,
  transpose,
  matrixMultiply,
  matrixVectorMultiply,
  identityMatrix,
  matrixAdd,
} from './matrixMath';
import { mean, sampleVariance } from './statisticsMath';

export const EPSILON = 1e-9;

export interface SimpleLinearRegressionResult {
  slope: number;
  intercept: number;
  predictions: number[];
  residuals: number[];
  sse: number;
  mse: number;
  rmse: number;
  sst: number;
  rSquared: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface MultipleRegressionResult {
  coefficients: number[]; // β1, β2, ..., βp (and β0 if included)
  intercept: number;
  predictions: number[];
  residuals: number[];
  sse: number;
  mse: number;
  rmse: number;
  sst: number;
  rSquared: number;
  adjustedRSquared: number;
  isSingular: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface PolynomialRegressionResult {
  degree: number;
  coefficients: number[]; // [β0, β1, β2, ..., βd]
  predictions: number[];
  residuals: number[];
  sse: number;
  mse: number;
  rmse: number;
  rSquared: number;
  isValid: boolean;
  errorMessage?: string;
}

/** Compute covariance between two numeric series */
export function covariance(x: number[], y: number[], isSample: boolean = true): number {
  if (!x || !y || x.length !== y.length || x.length === 0) {
    throw new Error('Arrays must be non-empty and of identical length for covariance');
  }
  if (isSample && x.length < 2) {
    throw new Error('Sample covariance requires at least 2 data points');
  }
  const meanX = mean(x);
  const meanY = mean(y);
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += (x[i] - meanX) * (y[i] - meanY);
  }
  const divisor = isSample ? x.length - 1 : x.length;
  return sum / divisor;
}

/** Compute residuals e_i = y_i - yPred_i */
export function calculateResiduals(y: number[], yPred: number[]): number[] {
  if (y.length !== yPred.length) {
    throw new Error('Observed and predicted vectors must have identical length');
  }
  return y.map((val, i) => val - yPred[i]);
}

/** Sum of Squared Errors: SSE = Σ (y_i - yPred_i)² */
export function sumSquaredErrors(y: number[], yPred: number[]): number {
  if (y.length !== yPred.length || y.length === 0) {
    throw new Error('Vectors must be non-empty and of identical length');
  }
  return y.reduce((sum, val, i) => sum + (val - yPred[i]) ** 2, 0);
}

/** Mean Squared Error: MSE = SSE / n */
export function meanSquaredError(y: number[], yPred: number[]): number {
  if (y.length === 0) throw new Error('Cannot compute MSE on empty vector');
  return sumSquaredErrors(y, yPred) / y.length;
}

/** Root Mean Squared Error: RMSE = √MSE */
export function rootMeanSquaredError(y: number[], yPred: number[]): number {
  return Math.sqrt(Math.max(0, meanSquaredError(y, yPred)));
}

/** Total Sum of Squares: SST = Σ (y_i - ȳ)² */
export function totalSumOfSquares(y: number[]): number {
  if (y.length === 0) throw new Error('Cannot compute SST on empty vector');
  const meanY = mean(y);
  return y.reduce((sum, val) => sum + (val - meanY) ** 2, 0);
}

/** Coefficient of Determination: R² = 1 - (SSE / SST) */
export function rSquared(y: number[], yPred: number[]): number {
  const sst = totalSumOfSquares(y);
  if (sst < EPSILON) {
    // Constant target Y: if model predicts constant mean, R²=0, else if exact, 1
    const sse = sumSquaredErrors(y, yPred);
    return sse < EPSILON ? 1 : 0;
  }
  const sse = sumSquaredErrors(y, yPred);
  return Math.max(0, 1 - sse / sst);
}

/** Adjusted R²: 1 - (1 - R²)(n - 1)/(n - p - 1) */
export function adjustedRSquared(r2Val: number, n: number, p: number): number {
  if (n - p - 1 <= 0) {
    return r2Val; // Undefined / degrees of freedom exhausted
  }
  return 1 - ((1 - r2Val) * (n - 1)) / (n - p - 1);
}

/** Generate predictions for simple linear model ŷ = β0 + β1 * x */
export function predictLinear(x: number[], slope: number, intercept: number): number[] {
  return x.map((xi) => intercept + slope * xi);
}

/**
 * Perform Simple Linear Regression using closed-form Ordinary Least Squares
 * β̂₁ = Σ(x_i - x̄)(y_i - ȳ) / Σ(x_i - x̄)²
 * β̂₀ = ȳ - β̂₁ * x̄
 */
export function linearRegression(x: number[], y: number[]): SimpleLinearRegressionResult {
  if (!x || !y || x.length === 0 || y.length === 0) {
    return {
      slope: 0,
      intercept: 0,
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 0,
      isValid: false,
      errorMessage: 'Dataset is empty',
    };
  }

  if (x.length !== y.length) {
    return {
      slope: 0,
      intercept: 0,
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 0,
      isValid: false,
      errorMessage: 'Feature vector X and target vector Y must have the same length',
    };
  }

  const n = x.length;
  if (n < 2) {
    return {
      slope: 0,
      intercept: y[0] ?? 0,
      predictions: y,
      residuals: [0],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 1,
      isValid: false,
      errorMessage: 'At least 2 points are required to fit a regression line',
    };
  }

  const meanX = mean(x);
  const meanY = mean(y);

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    denominator += dx * dx;
  }

  if (denominator < EPSILON) {
    return {
      slope: 0,
      intercept: meanY,
      predictions: x.map(() => meanY),
      residuals: y.map((yi) => yi - meanY),
      sse: sumSquaredErrors(y, x.map(() => meanY)),
      mse: meanSquaredError(y, x.map(() => meanY)),
      rmse: rootMeanSquaredError(y, x.map(() => meanY)),
      sst: totalSumOfSquares(y),
      rSquared: 0,
      isValid: false,
      errorMessage: 'Zero variance in predictor X (vertical line / constant X)',
    };
  }

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  const predictions = predictLinear(x, slope, intercept);
  const res = calculateResiduals(y, predictions);
  const sse = sumSquaredErrors(y, predictions);
  const mse = sse / n;
  const rmse = Math.sqrt(Math.max(0, mse));
  const sst = totalSumOfSquares(y);
  const r2 = sst < EPSILON ? (sse < EPSILON ? 1 : 0) : Math.max(0, 1 - sse / sst);

  return {
    slope,
    intercept,
    predictions,
    residuals: res,
    sse,
    mse,
    rmse,
    sst,
    rSquared: r2,
    isValid: true,
  };
}

/**
 * Invert an arbitrary n × n matrix using Gauss-Jordan Elimination with partial pivoting.
 * Returns null if the matrix is singular or non-square.
 */
export function invertMatrix(A: Matrix): Matrix | null {
  const n = A.length;
  if (n === 0 || A[0].length !== n) return null;

  // Augment A with identity matrix [A | I]
  const augmented: Matrix = A.map((row, i) => {
    const augRow = [...row, ...new Array(n).fill(0)];
    augRow[n + i] = 1;
    return augRow;
  });

  for (let col = 0; col < n; col++) {
    // Partial pivoting: find max pivot in current column
    let maxRow = col;
    let maxVal = Math.abs(augmented[col][col]);
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(augmented[row][col]) > maxVal) {
        maxVal = Math.abs(augmented[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < EPSILON) {
      return null; // Singular matrix
    }

    // Swap pivot row
    if (maxRow !== col) {
      const temp = augmented[col];
      augmented[col] = augmented[maxRow];
      augmented[maxRow] = temp;
    }

    // Scale pivot row to make diagonal element 1
    const pivot = augmented[col][col];
    for (let j = 0; j < 2 * n; j++) {
      augmented[col][j] /= pivot;
    }

    // Eliminate column elements in all other rows
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = augmented[row][col];
        if (Math.abs(factor) > EPSILON) {
          for (let j = 0; j < 2 * n; j++) {
            augmented[row][j] -= factor * augmented[col][j];
          }
        }
      }
    }
  }

  // Extract right half
  const inverse: Matrix = [];
  for (let i = 0; i < n; i++) {
    inverse.push(augmented[i].slice(n));
  }
  return inverse;
}

/**
 * Standardize feature matrix X column-by-column: z = (x - mean) / std
 */
export function standardizeFeatures(X: Matrix): {
  standardized: Matrix;
  means: number[];
  stds: number[];
} {
  const n = X.length;
  if (n === 0) return { standardized: [], means: [], stds: [] };
  const p = X[0].length;

  const means: number[] = [];
  const stds: number[] = [];

  for (let j = 0; j < p; j++) {
    const col = X.map((row) => row[j]);
    const m = mean(col);
    const s = Math.sqrt(sampleVariance(col));
    means.push(m);
    stds.push(s > EPSILON ? s : 1);
  }

  const standardized: Matrix = X.map((row) =>
    row.map((val, j) => (val - means[j]) / stds[j])
  );

  return { standardized, means, stds };
}

/**
 * Solve Ordinary Least Squares for Multiple Linear Regression
 * X: design matrix (n × p) - without intercept column if fitIntercept=true
 * y: target vector (n × 1)
 */
export function matrixOLS(
  X: Matrix,
  y: Vector,
  fitIntercept: boolean = true
): MultipleRegressionResult {
  const n = X.length;
  if (n === 0 || y.length === 0 || n !== y.length) {
    return {
      coefficients: [],
      intercept: 0,
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 0,
      adjustedRSquared: 0,
      isSingular: false,
      isValid: false,
      errorMessage: 'Invalid dataset dimensions for Multiple Regression',
    };
  }

  const p = X[0].length;

  // Construct design matrix with leading 1s column if fitIntercept is true
  const designMatrix: Matrix = fitIntercept
    ? X.map((row) => [1, ...row])
    : X.map((row) => [...row]);

  const XT = transpose(designMatrix);
  const XTX = matrixMultiply(XT, designMatrix);
  const XTy = matrixVectorMultiply(XT, y);

  const XTX_Inv = invertMatrix(XTX);

  if (!XTX_Inv) {
    return {
      coefficients: new Array(p).fill(0),
      intercept: fitIntercept ? mean(y) : 0,
      predictions: new Array(n).fill(fitIntercept ? mean(y) : 0),
      residuals: y.map((yi) => (fitIntercept ? yi - mean(y) : yi)),
      sse: totalSumOfSquares(y),
      mse: totalSumOfSquares(y) / n,
      rmse: Math.sqrt(totalSumOfSquares(y) / n),
      sst: totalSumOfSquares(y),
      rSquared: 0,
      adjustedRSquared: 0,
      isSingular: true,
      isValid: false,
      errorMessage: 'XᵀX is singular / non-invertible (multicollinearity or insufficient observations)',
    };
  }

  const beta = matrixVectorMultiply(XTX_Inv, XTy);

  const intercept = fitIntercept ? beta[0] : 0;
  const coefficients = fitIntercept ? beta.slice(1) : beta;

  // Compute predictions
  const predictions: number[] = [];
  for (let i = 0; i < n; i++) {
    let pred = intercept;
    for (let j = 0; j < p; j++) {
      pred += coefficients[j] * X[i][j];
    }
    predictions.push(pred);
  }

  const res = calculateResiduals(y, predictions);
  const sse = sumSquaredErrors(y, predictions);
  const mse = sse / n;
  const rmse = Math.sqrt(Math.max(0, mse));
  const sst = totalSumOfSquares(y);
  const r2 = sst < EPSILON ? (sse < EPSILON ? 1 : 0) : Math.max(0, 1 - sse / sst);
  const adjR2 = adjustedRSquared(r2, n, p);

  return {
    coefficients,
    intercept,
    predictions,
    residuals: res,
    sse,
    mse,
    rmse,
    sst,
    rSquared: r2,
    adjustedRSquared: adjR2,
    isSingular: false,
    isValid: true,
  };
}

/**
 * Create polynomial features for a 1D vector x: [x, x², x³, ..., x^degree]
 */
export function polynomialFeatures(x: number[], degree: number): Matrix {
  if (degree < 1) throw new Error('Polynomial degree must be >= 1');
  return x.map((xi) => {
    const row: number[] = [];
    for (let d = 1; d <= degree; d++) {
      row.push(Math.pow(xi, d));
    }
    return row;
  });
}

/**
 * Perform Polynomial Regression for a single predictor x and target y
 */
export function polynomialRegression(
  x: number[],
  y: number[],
  degree: number
): PolynomialRegressionResult {
  if (!x || !y || x.length === 0 || y.length === 0 || x.length !== y.length) {
    return {
      degree,
      coefficients: [],
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      rSquared: 0,
      isValid: false,
      errorMessage: 'Invalid dataset for polynomial regression',
    };
  }

  if (degree < 1) {
    return {
      degree,
      coefficients: [],
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      rSquared: 0,
      isValid: false,
      errorMessage: 'Polynomial degree must be >= 1',
    };
  }

  const X_poly = polynomialFeatures(x, degree);
  const ols = matrixOLS(X_poly, y, true);

  if (!ols.isValid || ols.isSingular) {
    return {
      degree,
      coefficients: [],
      predictions: [],
      residuals: [],
      sse: ols.sse,
      mse: ols.mse,
      rmse: ols.rmse,
      rSquared: 0,
      isValid: false,
      errorMessage: ols.errorMessage ?? 'Singular matrix in polynomial regression',
    };
  }

  const fullCoeffs = [ols.intercept, ...ols.coefficients];

  return {
    degree,
    coefficients: fullCoeffs,
    predictions: ols.predictions,
    residuals: ols.residuals,
    sse: ols.sse,
    mse: ols.mse,
    rmse: ols.rmse,
    rSquared: ols.rSquared,
    isValid: true,
  };
}

/**
 * Predict from polynomial model coefficients [β0, β1, β2, ..., βd]
 */
export function predictPolynomial(x: number[], coefficients: number[]): number[] {
  return x.map((xi) => {
    let yPred = 0;
    for (let d = 0; d < coefficients.length; d++) {
      yPred += coefficients[d] * Math.pow(xi, d);
    }
    return yPred;
  });
}

/**
 * Ridge Regression: (XᵀX + λI)⁻¹ Xᵀy
 * Intercept is unpenalized (λ applied only to feature weights β1..βp)
 */
export function ridgeRegression(
  X: Matrix,
  y: Vector,
  lambda: number,
  fitIntercept: boolean = true
): MultipleRegressionResult {
  const n = X.length;
  if (n === 0 || y.length === 0 || n !== y.length) {
    return {
      coefficients: [],
      intercept: 0,
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 0,
      adjustedRSquared: 0,
      isSingular: false,
      isValid: false,
      errorMessage: 'Invalid dataset for Ridge Regression',
    };
  }

  const p = X[0].length;
  const designMatrix: Matrix = fitIntercept
    ? X.map((row) => [1, ...row])
    : X.map((row) => [...row]);

  const numCols = fitIntercept ? p + 1 : p;
  const XT = transpose(designMatrix);
  const XTX = matrixMultiply(XT, designMatrix);
  const XTy = matrixVectorMultiply(XT, y);

  // Penalty matrix: λ * Identity, with penalty[0][0] = 0 if fitIntercept (no penalty on β0)
  const penalty = identityMatrix(numCols).map((row, i) =>
    row.map((val) => (fitIntercept && i === 0 ? 0 : val * lambda))
  );

  const regularizedXTX = matrixAdd(XTX, penalty);
  const inv = invertMatrix(regularizedXTX);

  if (!inv) {
    return {
      coefficients: new Array(p).fill(0),
      intercept: fitIntercept ? mean(y) : 0,
      predictions: new Array(n).fill(fitIntercept ? mean(y) : 0),
      residuals: y.map((yi) => (fitIntercept ? yi - mean(y) : yi)),
      sse: totalSumOfSquares(y),
      mse: totalSumOfSquares(y) / n,
      rmse: Math.sqrt(totalSumOfSquares(y) / n),
      sst: totalSumOfSquares(y),
      rSquared: 0,
      adjustedRSquared: 0,
      isSingular: true,
      isValid: false,
      errorMessage: 'Matrix inversion failed for Ridge Regression',
    };
  }

  const beta = matrixVectorMultiply(inv, XTy);
  const intercept = fitIntercept ? beta[0] : 0;
  const coefficients = fitIntercept ? beta.slice(1) : beta;

  const predictions: number[] = [];
  for (let i = 0; i < n; i++) {
    let pred = intercept;
    for (let j = 0; j < p; j++) {
      pred += coefficients[j] * X[i][j];
    }
    predictions.push(pred);
  }

  const res = calculateResiduals(y, predictions);
  const sse = sumSquaredErrors(y, predictions);
  const mse = sse / n;
  const rmse = Math.sqrt(Math.max(0, mse));
  const sst = totalSumOfSquares(y);
  const r2 = sst < EPSILON ? (sse < EPSILON ? 1 : 0) : Math.max(0, 1 - sse / sst);
  const adjR2 = adjustedRSquared(r2, n, p);

  return {
    coefficients,
    intercept,
    predictions,
    residuals: res,
    sse,
    mse,
    rmse,
    sst,
    rSquared: r2,
    adjustedRSquared: adjR2,
    isSingular: false,
    isValid: true,
  };
}

/**
 * Soft Thresholding Operator S(z, γ) = sign(z) * max(0, |z| - γ)
 */
export function softThreshold(z: number, gamma: number): number {
  if (z > gamma) return z - gamma;
  if (z < -gamma) return z + gamma;
  return 0;
}

/**
 * Lasso Regression via Cyclic Coordinate Descent
 * Minimizes: (1 / 2n) * ||y - Xβ||² + λ * ||β||₁ (with unpenalized intercept)
 */
export function lassoRegression(
  X: Matrix,
  y: Vector,
  lambda: number,
  maxIter: number = 1000,
  tol: number = 1e-6
): MultipleRegressionResult {
  const n = X.length;
  if (n === 0 || y.length === 0 || n !== y.length) {
    return {
      coefficients: [],
      intercept: 0,
      predictions: [],
      residuals: [],
      sse: 0,
      mse: 0,
      rmse: 0,
      sst: 0,
      rSquared: 0,
      adjustedRSquared: 0,
      isSingular: false,
      isValid: false,
      errorMessage: 'Invalid dataset for Lasso Regression',
    };
  }

  const p = X[0].length;

  // Initialize coefficients
  const beta: number[] = new Array(p).fill(0);
  let intercept = mean(y);

  // Precompute squared column sums: z_j = Σ x_{ij}²
  const colSumSq: number[] = [];
  for (let j = 0; j < p; j++) {
    let sumSq = 0;
    for (let i = 0; i < n; i++) {
      sumSq += X[i][j] * X[i][j];
    }
    colSumSq.push(Math.max(sumSq, EPSILON));
  }

  // Precompute initial partial residuals
  const r: number[] = y.map((yi) => yi - intercept);

  for (let iter = 0; iter < maxIter; iter++) {
    let maxChange = 0;

    // Update intercept
    let sumR = 0;
    for (let i = 0; i < n; i++) {
      sumR += y[i] - beta.reduce((acc, bj, j) => acc + bj * X[i][j], 0);
    }
    const newIntercept = sumR / n;
    const dIntercept = newIntercept - intercept;
    intercept = newIntercept;
    for (let i = 0; i < n; i++) {
      r[i] -= dIntercept;
    }

    // Coordinate descent for each feature j
    for (let j = 0; j < p; j++) {
      // Add current feature effect back to residual: r_i + β_j * x_ij
      const oldBetaJ = beta[j];
      let rhoJ = 0;
      for (let i = 0; i < n; i++) {
        const r_without_j = r[i] + oldBetaJ * X[i][j];
        rhoJ += X[i][j] * r_without_j;
      }

      // Soft thresholding: S(rho_j, n * lambda) / colSumSq_j
      const newBetaJ = softThreshold(rhoJ, n * lambda) / colSumSq[j];
      const dBetaJ = newBetaJ - oldBetaJ;

      beta[j] = newBetaJ;

      // Update residual vector r
      if (Math.abs(dBetaJ) > EPSILON) {
        for (let i = 0; i < n; i++) {
          r[i] -= dBetaJ * X[i][j];
        }
      }

      maxChange = Math.max(maxChange, Math.abs(dBetaJ));
    }

    if (maxChange < tol) {
      break;
    }
  }

  const predictions: number[] = [];
  for (let i = 0; i < n; i++) {
    let pred = intercept;
    for (let j = 0; j < p; j++) {
      pred += beta[j] * X[i][j];
    }
    predictions.push(pred);
  }

  const res = calculateResiduals(y, predictions);
  const sse = sumSquaredErrors(y, predictions);
  const mse = sse / n;
  const rmse = Math.sqrt(Math.max(0, mse));
  const sst = totalSumOfSquares(y);
  const r2 = sst < EPSILON ? (sse < EPSILON ? 1 : 0) : Math.max(0, 1 - sse / sst);
  const adjR2 = adjustedRSquared(r2, n, p);

  return {
    coefficients: beta,
    intercept,
    predictions,
    residuals: res,
    sse,
    mse,
    rmse,
    sst,
    rSquared: r2,
    adjustedRSquared: adjR2,
    isSingular: false,
    isValid: true,
  };
}
