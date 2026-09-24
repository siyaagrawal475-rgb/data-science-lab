import { ComparisonTableData } from '@/types/experiences';

export const UNIT_3_COMPARISONS: ComparisonTableData[] = [
  {
    id: 'u3-comp-det-rank',
    title: 'Matrix Determinant vs Matrix Rank vs Invertibility',
    subtitle: 'Geometric Space Distortion, Linear Independence, and System Solvability',
    unitId: 'unit-3',
    unitNumber: 3,
    headers: [
      { key: 'property', label: 'Matrix Property', primary: true },
      { key: 'definition', label: 'Mathematical Definition' },
      { key: 'geometricMeaning', label: 'Geometric Meaning' },
      { key: 'systemSolvability', label: 'Linear System Ax = b Implication' },
    ],
    rows: [
      {
        property: 'Determinant det(A) ≠ 0',
        definition: 'Non-zero scalar scaling factor of n-dimensional volume',
        geometricMeaning: 'Transformation preserves dimensionality; no space collapse',
        systemSolvability: 'Unique solution exists for every vector b (x = A⁻¹b)',
      },
      {
        property: 'Determinant det(A) = 0 (Singular)',
        definition: 'Zero volume scaling factor; columns are linearly dependent',
        geometricMeaning: 'Collapses space onto a lower-dimensional line, plane, or point',
        systemSolvability: 'Either No solution (inconsistent) or Infinitely many solutions',
      },
      {
        property: 'Full Rank (rank(A) = n)',
        definition: 'All n columns/rows are linearly independent basis vectors',
        geometricMeaning: 'Column space spans the entire ambient n-dimensional space ℝⁿ',
        systemSolvability: 'Rank(A) = Rank([A|b]); system is guaranteed uniquely solvable',
      },
      {
        property: 'Rank Deficient (rank(A) < n)',
        definition: 'At least one column is a linear combination of other columns',
        geometricMeaning: 'Output dimension is strictly smaller than input dimension',
        systemSolvability: 'Null space has dimension nullity = n - rank > 0',
      },
    ],
    keyTakeaway: 'For an n×n square matrix, det(A) ≠ 0 ⟺ Full Rank (rank = n) ⟺ Invertible A⁻¹ exists ⟺ Null space is {0}.',
  },
  {
    id: 'u3-comp-solvers',
    title: 'System Solvers: Gaussian Elimination vs Cramer\'s Rule vs Matrix Inversion',
    subtitle: 'Computational Complexity, Numerical Stability, and Implementation Cost',
    unitId: 'unit-3',
    unitNumber: 3,
    headers: [
      { key: 'method', label: 'Algorithm', primary: true },
      { key: 'complexity', label: 'Time Complexity' },
      { key: 'numericalStability', label: 'Numerical Stability' },
      { key: 'bestUse', label: 'Optimal Application' },
    ],
    rows: [
      {
        method: 'Gaussian Elimination (with Partial Pivoting)',
        complexity: 'O(n³) for n variables',
        numericalStability: 'High (Partial pivoting prevents division by near-zero pivots)',
        bestUse: 'Industry standard for general linear systems and large sparse networks',
      },
      {
        method: 'Cramer\'s Rule (Determinant Ratios)',
        complexity: 'O((n+1)!) via Laplace expansion, or O(n⁴) via LU',
        numericalStability: 'Poor for large n; high risk of floating-point overflow',
        bestUse: 'Analytical derivations in symbolic 2×2 or 3×3 physical systems',
      },
      {
        method: 'Explicit Matrix Inversion (x = A⁻¹b)',
        complexity: 'O(n³) to compute A⁻¹ + O(n²) matrix-vector mult',
        numericalStability: 'Less stable than LU decomposition; computationally redundant',
        bestUse: 'When the same matrix A must solve for millions of different vectors b',
      },
    ],
    keyTakeaway: 'Never compute explicit matrix inversion A⁻¹ to solve Ax = b in production code; always use LU decomposition or Gaussian elimination.',
  },
];
