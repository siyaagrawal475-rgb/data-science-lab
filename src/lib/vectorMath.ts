/**
 * Reusable Vector Mathematics Utilities for Linear Algebra & Data Science
 */

export type Vector2D = [number, number];
export type VectorND = number[];

/** Add two 2D vectors */
export function vectorAdd(u: [number, number], v: [number, number]): [number, number];
/** Add two vectors of identical dimensions */
export function vectorAdd(u: number[], v: number[]): number[];
export function vectorAdd(u: number[], v: number[]): number[] {
  return u.map((val, i) => val + (v[i] ?? 0));
}

/** Subtract vector v from vector u (u - v) */
export function vectorSubtract(u: [number, number], v: [number, number]): [number, number];
export function vectorSubtract(u: number[], v: number[]): number[];
export function vectorSubtract(u: number[], v: number[]): number[] {
  return u.map((val, i) => val - (v[i] ?? 0));
}

/** Multiply vector by a scalar value c */
export function scalarMultiply(v: [number, number], c: number): [number, number];
export function scalarMultiply(v: number[], c: number): number[];
export function scalarMultiply(v: number[], c: number): number[] {
  return v.map((val) => val * c);
}

/** Calculate standard Euclidean Dot Product: u · v = Σ (u_i * v_i) */
export function dotProduct(u: number[], v: number[]): number {
  return u.reduce((acc, val, i) => acc + val * (v[i] ?? 0), 0);
}

/** Compute vector L1 Norm (Manhattan norm): ||v||_1 = Σ |v_i| */
export function vectorNormL1(v: number[]): number {
  return v.reduce((acc, val) => acc + Math.abs(val), 0);
}

/** Compute vector L2 Norm (Euclidean magnitude): ||v||_2 = √(Σ v_i^2) */
export function vectorNormL2(v: number[]): number {
  return Math.sqrt(v.reduce((acc, val) => acc + val * val, 0));
}

/** Compute Euclidean distance between two vectors: d(u, v) = ||u - v||_2 */
export function euclideanDistance(u: number[], v: number[]): number {
  return vectorNormL2(vectorSubtract(u, v));
}

/** Compute Cosine Similarity: cos(θ) = (u · v) / (||u||_2 * ||v||_2) */
export function cosineSimilarity(u: number[], v: number[]): number {
  const normU = vectorNormL2(u);
  const normV = vectorNormL2(v);
  if (normU === 0 || normV === 0) return 0;
  const cos = dotProduct(u, v) / (normU * normV);
  // Clamp to [-1, 1] to guard against floating point inaccuracies
  return Math.max(-1, Math.min(1, cos));
}

/** Compute angle between two vectors in degrees: θ = arccos(cos(θ)) * (180 / π) */
export function angleBetweenDegrees(u: number[], v: number[]): number {
  const cos = cosineSimilarity(u, v);
  const rad = Math.acos(cos);
  return (rad * 180) / Math.PI;
}

/** Calculate vector projection of u onto v: proj_v(u) = ((u · v) / (v · v)) * v */
export function vectorProjection(u: [number, number], v: [number, number]): [number, number];
export function vectorProjection(u: number[], v: number[]): number[];
export function vectorProjection(u: number[], v: number[]): number[] {
  const dotVV = dotProduct(v, v);
  if (dotVV === 0) {
    return v.map(() => 0);
  }
  const dotUV = dotProduct(u, v);
  const factor = dotUV / dotVV;
  return scalarMultiply(v, factor);
}

/** Compute linear combination: c1*v1 + c2*v2 + ... + ck*vk */
export function linearCombination(vectors: [number, number][], coefficients: number[]): [number, number];
export function linearCombination(vectors: number[][], coefficients: number[]): number[];
export function linearCombination(vectors: number[][], coefficients: number[]): number[] {
  if (vectors.length === 0) return [];
  const dim = vectors[0].length;
  const result = new Array(dim).fill(0);

  vectors.forEach((vec, vIdx) => {
    const c = coefficients[vIdx] ?? 1;
    for (let i = 0; i < dim; i++) {
      result[i] += (vec[i] ?? 0) * c;
    }
  });

  return result;
}
