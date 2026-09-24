import { RealLifeExample } from '@/types/experiences';

export const UNIT_3_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u3-ex-pagerank',
    unitId: 'unit-3',
    unitNumber: 3,
    title: 'Google PageRank Algorithm via Dominant Eigenvector',
    industry: 'Web Search & Graph Theory',
    scenario:
      'Search engines rank billions of web pages by modeling internet browsing as a stochastic transition matrix M where M_ij represents the probability of transitioning from page j to page i.',
    dataVariables: 'Adjacency matrix A, Stochastic transition matrix M, Teleportation constant d = 0.85',
    whatWeWantToKnow:
      'How can we find the steady-state importance ranking vector r such that M · r = r?',
    mathematicalMethod:
      'Solve the characteristic eigenvalue problem M · r = 1 · r. The PageRank vector r is the dominant eigenvector associated with eigenvalue λ = 1 (Perron-Frobenius theorem).',
    resultInterpretation:
      'Iterative power iteration M^k · r converges rapidly to the stationary distribution vector. Pages with the largest eigenvector components receive the highest authority rankings in search results.',
    whyItMatters:
      'Matrix eigenvalues and spectral graph theory form the mathematical foundation of modern internet indexing, social network centrality, and recommendation graphs.',
  },
  {
    id: 'u3-ex-pca',
    unitId: 'unit-3',
    unitNumber: 3,
    title: 'Principal Component Analysis (PCA) for High-Dimensional Genomics',
    industry: 'Bioinformatics & Computational Biology',
    scenario:
      'A biomedical research team analyzes gene expression data with 20,000 genes measured across 500 patient tumor samples.',
    dataVariables: 'Data matrix X ∈ ℝ⁵⁰⁰ˣ²⁰⁰⁰⁰, Covariance matrix Σ = (1/n) XᵀX ∈ ℝ²⁰⁰⁰⁰ˣ²⁰⁰⁰⁰',
    whatWeWantToKnow:
      'How can we reduce 20,000 noisy gene dimensions down to 2 principal axes of maximum variance for cancer subtype clustering?',
    mathematicalMethod:
      'Perform eigendecomposition or Singular Value Decomposition (SVD) on the sample covariance matrix Σ: Σ = V Λ Vᵀ. Project patient vectors onto the top 2 eigenvectors (principal components).',
    resultInterpretation:
      'The top 2 eigenvectors capture 68% of the total variance across all 20,000 genes, cleanly separating malignant and benign tumor clusters on a 2D scatter plot.',
    whyItMatters:
      'Linear algebra allows scientists to eliminate the curse of dimensionality and discover biomarker patterns hidden across tens of thousands of simultaneous measurements.',
  },
];
