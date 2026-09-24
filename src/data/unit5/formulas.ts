import { UnitId } from '@/types';
import { DetailedFormulaItem } from '@/data/unit1/formulas';

export const UNIT_5_FORMULAS: DetailedFormulaItem[] = [
  {
    id: 'u5-f1',
    unitId: 'unit-5' as UnitId,
    title: 'Simple Linear Regression Model',
    category: 'Linear Regression',
    latex: '\\hat{y}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1 x_i',
    description: 'Models the expected response target ŷ as a linear function of predictor feature x with intercept β₀ and slope β₁.',
    meaning: 'Serves as the foundational supervised baseline for quantifying relationships and generating point predictions.',
    variables: [
      { symbol: '\\hat{y}_i', meaning: 'Predicted target value for observation i' },
      { symbol: '\\hat{\\beta}_0', meaning: 'Estimated intercept (expected target value when x = 0)' },
      { symbol: '\\hat{\\beta}_1', meaning: 'Estimated slope (marginal change in target per unit change in x)' },
      { symbol: 'x_i', meaning: 'Observed predictor feature value for observation i' }
    ],
    workedExample: {
      dataset: 'Fitted model: ŷ = 40 + 5x for x = 6 study hours',
      calculation: 'ŷ = 40 + 5(6) = 40 + 30 = 70',
      result: 'ŷ = 70 points',
      interpretation: 'A student studying 6 hours is predicted to score 70 points on the exam.'
    }
  },
  {
    id: 'u5-f2',
    unitId: 'unit-5' as UnitId,
    title: 'Regression Residual',
    category: 'Linear Regression',
    latex: 'e_i = y_i - \\hat{y}_i',
    description: 'Measures the vertical prediction error between the actual observed target yᵢ and the model prediction ŷᵢ.',
    meaning: 'Positive residuals indicate model under-prediction; negative residuals indicate over-prediction.',
    variables: [
      { symbol: 'e_i', meaning: 'Residual error for observation i' },
      { symbol: 'y_i', meaning: 'Observed ground truth target' },
      { symbol: '\\hat{y}_i', meaning: 'Fitted model prediction' }
    ],
    workedExample: {
      dataset: 'Observed house price y = $320,000; Model prediction ŷ = $305,000',
      calculation: 'e = 320,000 - 305,000 = 15,000',
      result: 'e = +$15,000',
      interpretation: 'The model under-predicted the actual home sale price by $15,000.'
    }
  },
  {
    id: 'u5-f3',
    unitId: 'unit-5' as UnitId,
    title: 'Sum of Squared Errors (SSE)',
    category: 'Linear Regression',
    latex: '\\text{SSE} = \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 = \\sum_{i=1}^n e_i^2',
    description: 'Computes the total aggregate squared residual error across all n training observations.',
    meaning: 'The loss function minimized by the Ordinary Least Squares optimization criterion.',
    variables: [
      { symbol: '\\text{SSE}', meaning: 'Sum of squared errors / residual sum of squares' },
      { symbol: 'n', meaning: 'Number of observations in the dataset' }
    ],
    workedExample: {
      dataset: 'Residuals: e₁ = 2, e₂ = -1, e₃ = 3',
      calculation: 'SSE = (2)² + (-1)² + (3)² = 4 + 1 + 9 = 14',
      result: 'SSE = 14',
      interpretation: 'The total squared residual penalty across the 3 observations is 14.'
    }
  },
  {
    id: 'u5-f4',
    unitId: 'unit-5' as UnitId,
    title: 'Least-Squares Slope Estimator',
    category: 'Linear Regression',
    latex: '\\hat{\\beta}_1 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^n (x_i - \\bar{x})^2} = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)}',
    description: 'Analytically calculates the optimal slope parameter minimizing SSE for simple linear regression.',
    meaning: 'Directly relates bivariate covariance between feature X and target Y to the variance of feature X.',
    variables: [
      { symbol: '\\bar{x}', meaning: 'Sample mean of predictor X' },
      { symbol: '\\bar{y}', meaning: 'Sample mean of target Y' },
      { symbol: '\\text{Cov}(X, Y)', meaning: 'Sample covariance between X and Y' }
    ],
    workedExample: {
      dataset: 'Σ(xᵢ - x̄)(yᵢ - ȳ) = 36, Σ(xᵢ - x̄)² = 12',
      calculation: 'β̂₁ = 36 / 12 = 3.0',
      result: 'β̂₁ = 3.0',
      interpretation: 'For each 1-unit increase in predictor X, target Y is expected to increase by 3.0 units.'
    }
  },
  {
    id: 'u5-f5',
    unitId: 'unit-5' as UnitId,
    title: 'Least-Squares Intercept Estimator',
    category: 'Linear Regression',
    latex: '\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}',
    description: 'Analytically computes the optimal intercept parameter, ensuring the regression line passes through (x̄, ȳ).',
    meaning: 'Guarantees the zero-mean residual property Σ eᵢ = 0 in standard linear regression.',
    variables: [
      { symbol: '\\hat{\\beta}_0', meaning: 'Optimal OLS intercept parameter' },
      { symbol: '\\bar{y}', meaning: 'Sample mean of target Y' },
      { symbol: '\\hat{\\beta}_1', meaning: 'Calculated optimal slope parameter' }
    ],
    workedExample: {
      dataset: 'ȳ = 25.0, β̂₁ = 3.0, x̄ = 4.0',
      calculation: 'β̂₀ = 25.0 - (3.0)(4.0) = 25.0 - 12.0 = 13.0',
      result: 'β̂₀ = 13.0',
      interpretation: 'When predictor x = 0, the baseline expected target value is 13.0.'
    }
  },
  {
    id: 'u5-f6',
    unitId: 'unit-5' as UnitId,
    title: 'Mean Squared Error (MSE)',
    category: 'Model Evaluation',
    latex: '\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 = \\frac{\\text{SSE}}{n}',
    description: 'Calculates the average squared prediction error across all n observations.',
    meaning: 'Standard benchmark loss function in machine learning algorithm optimization.',
    variables: [
      { symbol: '\\text{MSE}', meaning: 'Mean squared error' },
      { symbol: 'n', meaning: 'Sample size' }
    ],
    workedExample: {
      dataset: 'SSE = 320 across n = 80 samples',
      calculation: 'MSE = 320 / 80 = 4.0',
      result: 'MSE = 4.0',
      interpretation: 'The average squared discrepancy between predictions and observations is 4.0 units².'
    }
  },
  {
    id: 'u5-f7',
    unitId: 'unit-5' as UnitId,
    title: 'Root Mean Squared Error (RMSE)',
    category: 'Model Evaluation',
    latex: '\\text{RMSE} = \\sqrt{\\text{MSE}} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}',
    description: 'Computes the standard deviation of prediction errors in the original measurement units of target Y.',
    meaning: 'Provides a directly interpretable metric of typical error magnitude.',
    variables: [
      { symbol: '\\text{RMSE}', meaning: 'Root mean squared error' }
    ],
    workedExample: {
      dataset: 'MSE = 25.0 (in dollars squared)',
      calculation: 'RMSE = √25.0 = 5.0',
      result: 'RMSE = $5.00',
      interpretation: 'On average, model predictions deviate from actual values by approximately $5.00.'
    }
  },
  {
    id: 'u5-f8',
    unitId: 'unit-5' as UnitId,
    title: 'Total Sum of Squares (SST)',
    category: 'Model Evaluation',
    latex: '\\text{SST} = \\sum_{i=1}^n (y_i - \\bar{y})^2',
    description: 'Measures total baseline variance of the target variable around its sample mean.',
    meaning: 'Represents the total error of a trivial naive baseline model that always predicts ȳ.',
    variables: [
      { symbol: '\\text{SST}', meaning: 'Total sum of squares' },
      { symbol: '\\bar{y}', meaning: 'Sample mean of target Y' }
    ],
    workedExample: {
      dataset: 'y = [10, 20, 30], ȳ = 20',
      calculation: 'SST = (10-20)² + (20-20)² + (30-20)² = 100 + 0 + 100 = 200',
      result: 'SST = 200',
      interpretation: 'The baseline total variation in the target is 200.'
    }
  },
  {
    id: 'u5-f9',
    unitId: 'unit-5' as UnitId,
    title: 'Coefficient of Determination (R²)',
    category: 'Model Evaluation',
    latex: 'R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = \\frac{\\text{SSR}}{\\text{SST}}',
    description: 'Quantifies the proportion of total target variance explained by the regression model.',
    meaning: 'Ranges from 0 (explains nothing beyond mean) to 1 (perfect deterministic fit).',
    variables: [
      { symbol: 'R^2', meaning: 'Coefficient of determination' },
      { symbol: '\\text{SSR}', meaning: 'Regression sum of squares (explained variance)' }
    ],
    workedExample: {
      dataset: 'SST = 1000, SSE = 150',
      calculation: 'R² = 1 - (150 / 1000) = 1 - 0.15 = 0.85',
      result: 'R² = 0.85 (85%)',
      interpretation: '85% of the total variance in the target variable is explained by the regression model.'
    }
  },
  {
    id: 'u5-f10',
    unitId: 'unit-5' as UnitId,
    title: 'Adjusted R²',
    category: 'Model Evaluation',
    latex: 'R_{\\text{adj}}^2 = 1 - (1 - R^2)\\frac{n - 1}{n - p - 1}',
    description: 'Modifies R² by penalizing the addition of superfluous predictor features p.',
    meaning: 'Prevents false optimism from model overparameterization in multiple regression.',
    variables: [
      { symbol: 'n', meaning: 'Number of sample observations' },
      { symbol: 'p', meaning: 'Number of predictor features' }
    ],
    workedExample: {
      dataset: 'R² = 0.80, n = 50, p = 4 predictors',
      calculation: 'R²_adj = 1 - (1 - 0.80) * (49 / 45) = 1 - 0.20 * 1.0889 = 1 - 0.2178 = 0.7822',
      result: 'R²_adj = 0.782',
      interpretation: 'Accounting for 4 predictors on 50 samples, the penalised goodness of fit is 78.2%.'
    }
  },
  {
    id: 'u5-f11',
    unitId: 'unit-5' as UnitId,
    title: 'Multiple Linear Regression Matrix Form',
    category: 'Multiple Regression',
    latex: '\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}',
    description: 'Expresses multiple regression compactly as a matrix-vector equation.',
    meaning: 'Connects linear regression directly to linear algebra and multidimensional subspaces.',
    variables: [
      { symbol: '\\mathbf{y}', meaning: 'n × 1 vector of observed responses' },
      { symbol: '\\mathbf{X}', meaning: 'n × (p+1) design matrix including intercept column' },
      { symbol: '\\boldsymbol{\\beta}', meaning: '(p+1) × 1 vector of unknown regression weights' },
      { symbol: '\\boldsymbol{\\varepsilon}', meaning: 'n × 1 vector of random disturbance errors' }
    ],
    workedExample: {
      dataset: 'Two samples with features x₁ = [1, 2], x₂ = [3, 4]',
      calculation: 'X = [[1, 1, 3], [1, 2, 4]], β = [β₀, β₁, β₂]ᵀ',
      result: 'y = Xβ + ε',
      interpretation: 'Expresses simultaneous multi-variable predictions in matrix form.'
    }
  },
  {
    id: 'u5-f12',
    unitId: 'unit-5' as UnitId,
    title: 'OLS Closed-Form Matrix Estimator',
    category: 'Multiple Regression',
    latex: '\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}',
    description: 'Analytically solves the normal equations XᵀXβ = Xᵀy for the global least-squares parameter vector.',
    meaning: 'Requires XᵀX to be non-singular (full column rank with no exact collinearity).',
    variables: [
      { symbol: '\\mathbf{X}^T \\mathbf{X}', meaning: '(p+1) × (p+1) Gram feature matrix' },
      { symbol: '(\\mathbf{X}^T \\mathbf{X})^{-1}', meaning: 'Inverse of Gram feature matrix' }
    ],
    workedExample: {
      dataset: 'Gram inverse (XᵀX)⁻¹ = [[0.5, 0], [0, 0.2]], Xᵀy = [10, 15]ᵀ',
      calculation: 'β̂ = [[0.5(10)], [0.2(15)]] = [5, 3]ᵀ',
      result: 'β̂₀ = 5, β̂₁ = 3',
      interpretation: 'The optimal least-squares parameter vector is β̂ = [5, 3]ᵀ.'
    }
  },
  {
    id: 'u5-f13',
    unitId: 'unit-5' as UnitId,
    title: 'Ridge Regression (L2) Objective & Estimator',
    category: 'Regularization',
    latex: '\\min_{\\boldsymbol{\\beta}} \\left( \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 \\right) \\implies \\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}',
    description: 'Applies an L2 penalty on squared parameter weights to stabilize matrix inversion and shrink coefficients.',
    meaning: 'Guarantees invertibility even when features are collinear or when p > n.',
    variables: [
      { symbol: '\\lambda', meaning: 'Regularization strength hyperparameter (λ ≥ 0)' },
      { symbol: '\\mathbf{I}', meaning: 'Identity matrix (excluding intercept row/col)' }
    ],
    workedExample: {
      dataset: 'Collinear features with λ = 0.5 added to diagonal of XᵀX',
      calculation: 'β̂_Ridge = (XᵀX + 0.5 I)⁻¹ Xᵀy',
      result: 'Regularized coefficients with reduced variance',
      interpretation: 'Ridge prevents parameter explosion by shrinking weights smoothly.'
    }
  },
  {
    id: 'u5-f14',
    unitId: 'unit-5' as UnitId,
    title: 'Lasso Regression (L1) Objective',
    category: 'Regularization',
    latex: '\\min_{\\boldsymbol{\\beta}} \\left( \\frac{1}{2n} \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^2 + \\lambda \\sum_{j=1}^p |\\beta_j| \\right)',
    description: 'Applies an L1 absolute-value penalty to drive uninformative feature coefficients to exactly zero.',
    meaning: 'Performs automated feature selection and produces sparse, interpretable models.',
    variables: [
      { symbol: '|\\beta_j|', meaning: 'Absolute value of feature weight j' },
      { symbol: '\\lambda', meaning: 'L1 penalty tuning hyperparameter' }
    ],
    workedExample: {
      dataset: '10 features with λ = 0.5 applied to standardized design matrix',
      calculation: 'Coordinate descent soft-thresholding sets 6 coefficients to 0.0',
      result: 'Sparse parameter vector β with 4 active features',
      interpretation: 'Lasso automatically eliminated 6 noisy features from the regression model.'
    }
  }
];
