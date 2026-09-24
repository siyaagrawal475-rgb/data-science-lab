/**
 * Reusable Matrix Mathematics Utilities for Linear Algebra & Data Science
 * Prioritizes numerical correctness, floating-point tolerance, and strict TypeScript types.
 */

export type Matrix2D = [
  [number, number],
  [number, number]
];

export type Matrix = number[][];
export type Vector = number[];

export const EPSILON = 1e-9;

/** Check if two numbers are approximately equal within numerical tolerance */
export function approxEqual(a: number, b: number, eps = EPSILON): boolean {
  return Math.abs(a - b) <= eps;
}

/** Get matrix dimensions: [rows, columns] */
export function matrixDimensions(A: Matrix): [number, number] {
  if (!A || A.length === 0) return [0, 0];
  return [A.length, A[0].length];
}

/** Check if two matrices have identical dimensions for elementwise addition/subtraction */
export function isSameDimension(A: Matrix, B: Matrix): boolean {
  const [rA, cA] = matrixDimensions(A);
  const [rB, cB] = matrixDimensions(B);
  return rA === rB && cA === cB && rA > 0 && cA > 0;
}

/** Check if matrix A can be multiplied by matrix B (columns of A == rows of B) */
export function isMultiplicationCompatible(A: Matrix, B: Matrix): boolean {
  const [, cA] = matrixDimensions(A);
  const [rB] = matrixDimensions(B);
  return cA === rB && cA > 0;
}

/** Create an n × n identity matrix */
export function identityMatrix(n: number): Matrix {
  if (n <= 0) return [];
  const I: Matrix = [];
  for (let i = 0; i < n; i++) {
    const row = new Array(n).fill(0);
    row[i] = 1;
    I.push(row);
  }
  return I;
}

/** Create an r × c zero matrix */
export function zeroMatrix(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
}

/** Add two matrices elementwise */
export function matrixAdd(A: Matrix, B: Matrix): Matrix {
  if (!isSameDimension(A, B)) {
    throw new Error(`Matrix dimension mismatch for addition: [${matrixDimensions(A)}] vs [${matrixDimensions(B)}]`);
  }
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

/** Subtract matrix B from matrix A elementwise */
export function matrixSubtract(A: Matrix, B: Matrix): Matrix {
  if (!isSameDimension(A, B)) {
    throw new Error(`Matrix dimension mismatch for subtraction: [${matrixDimensions(A)}] vs [${matrixDimensions(B)}]`);
  }
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

/** Multiply a matrix by a scalar factor c */
export function scalarMultiplyMatrix(A: Matrix, c: number): Matrix {
  return A.map((row) => row.map((val) => val * c));
}

/** Matrix multiplication C = A × B */
export function matrixMultiply(A: Matrix, B: Matrix): Matrix {
  if (!isMultiplicationCompatible(A, B)) {
    throw new Error(
      `Incompatible dimensions for matrix multiplication: [${matrixDimensions(A)}] × [${matrixDimensions(B)}]`
    );
  }
  const [rA, cA] = matrixDimensions(A);
  const [, cB] = matrixDimensions(B);

  const C: Matrix = zeroMatrix(rA, cB);
  for (let i = 0; i < rA; i++) {
    for (let j = 0; j < cB; j++) {
      let sum = 0;
      for (let k = 0; k < cA; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}

/** Transpose of a matrix: A^T */
export function transpose(A: Matrix): Matrix {
  if (!A || A.length === 0) return [];
  const [rows, cols] = matrixDimensions(A);
  const AT: Matrix = zeroMatrix(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      AT[j][i] = A[i][j];
    }
  }
  return AT;
}

/** Multiply matrix A (m × n) with vector x (n × 1) => result y (m × 1) */
export function matrixVectorMultiply(A: Matrix, x: Vector): Vector {
  const [rows, cols] = matrixDimensions(A);
  if (cols !== x.length) {
    throw new Error(`Matrix column count (${cols}) does not match vector length (${x.length})`);
  }
  const result: Vector = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    let sum = 0;
    for (let j = 0; j < cols; j++) {
      sum += A[i][j] * x[j];
    }
    result[i] = sum;
  }
  return result;
}

/** Compute determinant of a 2×2 matrix: det([[a, b], [c, d]]) = ad - bc */
export function determinant2x2(A: Matrix | Matrix2D): number {
  if (A.length !== 2 || A[0].length !== 2) {
    throw new Error('determinant2x2 requires a 2x2 matrix');
  }
  const a = A[0][0];
  const b = A[0][1];
  const c = A[1][0];
  const d = A[1][1];
  return a * d - b * c;
}

/** Compute inverse of a 2×2 matrix: A⁻¹ = (1/det) * [[d, -b], [-c, a]] */
export function inverse2x2(A: Matrix | Matrix2D): Matrix2D | null {
  if (A.length !== 2 || A[0].length !== 2) {
    throw new Error('inverse2x2 requires a 2x2 matrix');
  }
  const det = determinant2x2(A);
  if (Math.abs(det) <= EPSILON) {
    return null; // Singular matrix, non-invertible
  }
  const a = A[0][0];
  const b = A[0][1];
  const c = A[1][0];
  const d = A[1][1];

  const invDet = 1 / det;
  return [
    [d * invDet, -b * invDet],
    [-c * invDet, a * invDet],
  ];
}

/** Calculate rank of a 2×2 matrix (0, 1, or 2) */
export function rank2x2(A: Matrix | Matrix2D): number {
  const a = A[0][0];
  const b = A[0][1];
  const c = A[1][0];
  const d = A[1][1];

  const allZero = approxEqual(a, 0) && approxEqual(b, 0) && approxEqual(c, 0) && approxEqual(d, 0);
  if (allZero) return 0;

  const det = determinant2x2(A);
  if (Math.abs(det) > EPSILON) {
    return 2; // Linearly independent rows/cols
  }
  return 1; // Collinear non-zero rows/cols
}

export interface Eigen2x2Result {
  hasRealEigenvalues: boolean;
  eigenvalues: [number, number] | null;
  eigenvectors: [[number, number], [number, number]] | null;
  trace: number;
  determinant: number;
  discriminant: number;
}

/** Compute real eigenvalues and eigenvectors for a 2×2 matrix */
export function eigen2x2(A: Matrix | Matrix2D): Eigen2x2Result {
  const a = A[0][0];
  const b = A[0][1];
  const c = A[1][0];
  const d = A[1][1];

  const trace = a + d;
  const det = a * d - b * c;
  // Characteristic equation: λ² - trace*λ + det = 0
  // Discriminant Δ = trace² - 4*det
  const discriminant = trace * trace - 4 * det;

  if (discriminant < -EPSILON) {
    return {
      hasRealEigenvalues: false,
      eigenvalues: null,
      eigenvectors: null,
      trace,
      determinant: det,
      discriminant,
    };
  }

  const sqrtDisc = Math.sqrt(Math.max(0, discriminant));
  const lambda1 = (trace + sqrtDisc) / 2;
  const lambda2 = (trace - sqrtDisc) / 2;

  // Function to find normalized eigenvector for eigenvalue λ: (A - λI)v = 0
  const findEigenvector = (lambda: number): [number, number] => {
    const row1x = a - lambda;
    const row1y = b;
    const row2x = c;
    const row2y = d - lambda;

    let vx = 0;
    let vy = 0;

    if (Math.abs(row1y) > EPSILON) {
      vx = -row1y;
      vy = row1x;
    } else if (Math.abs(row2x) > EPSILON) {
      vx = -row2y;
      vy = row2x;
    } else if (Math.abs(row1x) > EPSILON) {
      vx = 0;
      vy = 1;
    } else if (Math.abs(row2y) > EPSILON) {
      vx = 1;
      vy = 0;
    } else {
      // Identity-like / scalar matrix case (every vector is an eigenvector)
      vx = 1;
      vy = 0;
    }

    const norm = Math.hypot(vx, vy);
    if (norm > EPSILON) {
      return [vx / norm, vy / norm];
    }
    return [1, 0];
  };

  const v1 = findEigenvector(lambda1);
  const v2 = findEigenvector(lambda2);

  return {
    hasRealEigenvalues: true,
    eigenvalues: [lambda1, lambda2],
    eigenvectors: [v1, v2],
    trace,
    determinant: det,
    discriminant,
  };
}
