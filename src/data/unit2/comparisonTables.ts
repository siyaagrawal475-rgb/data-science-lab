import { ComparisonTableData } from '@/types/experiences';

export const UNIT_2_COMPARISONS: ComparisonTableData[] = [
  {
    id: 'u2-comp-norms',
    title: 'Vector Norms Comparison: L1 vs L2 vs L-Infinity',
    subtitle: 'Geometric Interpretations, Distance Metrics, and Machine Learning Penalties',
    unitId: 'unit-2',
    unitNumber: 2,
    headers: [
      { key: 'norm', label: 'Norm Type', primary: true },
      { key: 'formula', label: 'Mathematical Formula' },
      { key: 'geometry', label: 'Unit Ball Geometry' },
      { key: 'mlUse', label: 'Machine Learning Application' },
      { key: 'sensitivity', label: 'Outlier Sensitivity' },
    ],
    rows: [
      {
        norm: 'L1 Norm (Manhattan / Taxicab)',
        formula: '||v||₁ = Σ |v_i|',
        geometry: 'Diamond / Rhombus in 2D (Sharp corners on coordinate axes)',
        mlUse: 'Lasso Regression (Feature selection / Sparsity induction)',
        sensitivity: 'Robust to extreme outliers in single coordinates',
      },
      {
        norm: 'L2 Norm (Euclidean)',
        formula: '||v||₂ = √(Σ v_i²)',
        geometry: 'Smooth Circle in 2D / Sphere in 3D (Rotationally invariant)',
        mlUse: 'Ridge Regression, KNN distance, K-Means clustering',
        sensitivity: 'Sensitive to large single-coordinate deviations due to squaring',
      },
      {
        norm: 'L-Infinity Norm (Chebyshev)',
        formula: '||v||_∞ = max |v_i|',
        geometry: 'Axis-aligned Square / Cube',
        mlUse: 'Adversarial robustness bounds, game theory chessboard movement',
        sensitivity: 'Dominated entirely by the single maximum coordinate',
      },
    ],
    keyTakeaway: 'L1 norm promotes exact parameter zeros (sparsity) because its diamond contours contact objective loss contours at the coordinate vertices.',
  },
  {
    id: 'u2-comp-dot-cosine',
    title: 'Dot Product vs Cosine Similarity vs Euclidean Distance',
    subtitle: 'Directional Projections, Semantic Similarity, and Magnitude Invariance',
    unitId: 'unit-2',
    unitNumber: 2,
    headers: [
      { key: 'metric', label: 'Metric', primary: true },
      { key: 'formula', label: 'Formula' },
      { key: 'range', label: 'Output Range' },
      { key: 'magnitudeAware', label: 'Magnitude Dependency' },
      { key: 'bestUse', label: 'Best Use Case' },
    ],
    rows: [
      {
        metric: 'Dot Product (u · v)',
        formula: 'u · v = Σ u_i v_i = ||u|| ||v|| cos(θ)',
        range: '(-∞, +∞)',
        magnitudeAware: 'High (Scales directly with vector lengths)',
        bestUse: 'Neural network layer activations, energy calculations, work done in physics',
      },
      {
        metric: 'Cosine Similarity',
        formula: 'cos(θ) = (u · v) / (||u|| ||v||)',
        range: '[-1, 1]',
        magnitudeAware: 'Completely Invariant (Measures angle θ purely)',
        bestUse: 'Document embedding similarity, recommendation systems, semantic search',
      },
      {
        metric: 'Euclidean Distance (L2)',
        formula: 'd(u, v) = √(Σ (u_i - v_i)²)',
        range: '[0, +∞)',
        magnitudeAware: 'High (Measures absolute spatial gap)',
        bestUse: 'Geographic coordinate clustering, low-dimensional spatial KNN',
      },
    ],
    keyTakeaway: 'For text and deep embeddings, Cosine Similarity prevents long articles from having artificially high similarity solely due to high word counts.',
  },
];
