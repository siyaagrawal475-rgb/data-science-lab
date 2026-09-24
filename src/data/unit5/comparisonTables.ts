import { ComparisonTableData } from '@/types/experiences';

export const UNIT_5_COMPARISONS: ComparisonTableData[] = [
  {
    id: 'u5-comp-loss-metrics',
    title: 'Regression Evaluation Metrics Comparison',
    subtitle: 'MAE vs MSE vs RMSE vs R² vs Adjusted R²',
    unitId: 'unit-5',
    unitNumber: 5,
    headers: [
      { key: 'metric', label: 'Metric', primary: true },
      { key: 'formula', label: 'Mathematical Formula' },
      { key: 'units', label: 'Measurement Units' },
      { key: 'outlierImpact', label: 'Outlier Sensitivity' },
      { key: 'bestUse', label: 'Optimal Evaluation Context' },
    ],
    rows: [
      {
        metric: 'Mean Absolute Error (MAE)',
        formula: 'MAE = (1/n) Σ |y_i - ŷ_i|',
        units: 'Same units as target variable y',
        outlierImpact: 'Linear (Resistant to isolated extreme errors)',
        bestUse: 'Business reporting when all prediction errors have constant linear financial cost',
      },
      {
        metric: 'Mean Squared Error (MSE)',
        formula: 'MSE = (1/n) Σ (y_i - ŷ_i)²',
        units: 'Squared units (y²)',
        outlierImpact: 'Quadratic (Penalizes large errors severely)',
        bestUse: 'Loss function for optimization during gradient descent (smooth derivatives)',
      },
      {
        metric: 'Root Mean Squared Error (RMSE)',
        formula: 'RMSE = √(MSE)',
        units: 'Same units as target variable y',
        outlierImpact: 'High (Weighted toward large errors)',
        bestUse: 'Physical engineering, finance risk modeling where large mistakes are catastrophic',
      },
      {
        metric: 'Coefficient of Determination (R²)',
        formula: 'R² = 1 - (SS_res / SS_tot)',
        units: 'Dimensionless ratio ∈ (-∞, 1.0]',
        outlierImpact: 'Dependent on SS_res',
        bestUse: 'Quantifying proportion of target variance explained by model predictors',
      },
      {
        metric: 'Adjusted R²',
        formula: '1 - [(1 - R²)(n - 1) / (n - p - 1)]',
        units: 'Dimensionless ratio',
        outlierImpact: 'Penalizes model complexity p',
        bestUse: 'Multiple regression model selection to prevent overfitting by uninformative features',
      },
    ],
    keyTakeaway: 'Always check Residual Plots alongside R²; a model can have R² = 0.95 while still violating fundamental homoscedasticity or linearity assumptions.',
  },
  {
    id: 'u5-comp-regularization',
    title: 'Regularization Comparison: Ridge (L2) vs Lasso (L1) vs Elastic Net',
    subtitle: 'Shrinkage Penalties, Geometric Contours, Sparsity, and Multicollinearity',
    unitId: 'unit-5',
    unitNumber: 5,
    headers: [
      { key: 'technique', label: 'Technique', primary: true },
      { key: 'penalty', label: 'Penalty Term in Loss' },
      { key: 'sparsity', label: 'Feature Selection / Sparsity' },
      { key: 'multicollinearity', label: 'Handling Correlated Predictors' },
      { key: 'bestUse', label: 'Best Use Case' },
    ],
    rows: [
      {
        technique: 'Ridge Regression (L2)',
        penalty: 'λ Σ β_j²',
        sparsity: 'No (Shrinks coefficients asymptotically toward zero, never exactly 0)',
        multicollinearity: 'Excellent (Distributes weight evenly across collinear features)',
        bestUse: 'Dense datasets with many small-to-moderate contributing features',
      },
      {
        technique: 'Lasso Regression (L1)',
        penalty: 'λ Σ |β_j|',
        sparsity: 'Yes (Sets non-essential coefficients exactly to 0.0)',
        multicollinearity: 'Arbitrary (Selects one correlated feature and drops others)',
        bestUse: 'High-dimensional data (p >> n) where automated feature selection is desired',
      },
      {
        technique: 'Elastic Net (L1 + L2)',
        penalty: 'r λ Σ |β_j| + ½(1-r) λ Σ β_j²',
        sparsity: 'Yes (Controlled by mixing parameter r)',
        multicollinearity: 'Robust (Maintains group selection property of Ridge + sparsity of Lasso)',
        bestUse: 'Genomics, text modeling with thousands of highly correlated predictors',
      },
    ],
    keyTakeaway: 'Use Lasso when you need an interpretable, sparse model; use Ridge when you have severe multicollinearity and wish to preserve all features.',
  },
];
