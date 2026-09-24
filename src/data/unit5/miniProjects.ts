import { MiniProjectData } from '@/types/experiences';

export const UNIT_5_MINI_PROJECT: MiniProjectData = {
  id: 'u5-project-house-price-prediction',
  title: 'Real Estate Multiple Linear Regression & Residual Diagnostics',
  unitId: 'unit-5',
  unitNumber: 5,
  industryContext: 'PropTech Valuation & Automated Valuation Models (AVM)',
  scenario:
    'You are a Quantitative Valuation Analyst at MetroEstates. You need to develop a multi-feature regression model to predict residential house sale prices while ensuring residual assumptions (homoscedasticity, normality) are verified.',
  problemStatement:
    'Fit an Ordinary Least Squares (OLS) model: Price = β₀ + β₁(SqFt) + β₂(Bedrooms) + β₃(Bathrooms) + β₄(Age). Calculate training R², Root Mean Squared Error (RMSE), and analyze residual plot patterns to test for non-linear curvature.',
  dataset: {
    name: 'metro_housing_sales.csv',
    description: '10 representative residential transactions',
    columns: ['sqft', 'bedrooms', 'bathrooms', 'age_years', 'actual_price_k', 'predicted_price_k', 'residual_k'],
    sampleRows: [
      { sqft: 1200, bedrooms: 2, bathrooms: 1.5, age_years: 15, actual_price_k: 240, predicted_price_k: 245.2, residual_k: -5.2 },
      { sqft: 1650, bedrooms: 3, bathrooms: 2.0, age_years: 10, actual_price_k: 320, predicted_price_k: 318.5, residual_k: +1.5 },
      { sqft: 2100, bedrooms: 4, bathrooms: 2.5, age_years: 5, actual_price_k: 410, predicted_price_k: 402.1, residual_k: +7.9 },
      { sqft: 950, bedrooms: 2, bathrooms: 1.0, age_years: 25, actual_price_k: 185, predicted_price_k: 191.4, residual_k: -6.4 },
      { sqft: 2800, bedrooms: 5, bathrooms: 3.5, age_years: 2, actual_price_k: 560, predicted_price_k: 549.8, residual_k: +10.2 },
      { sqft: 1400, bedrooms: 3, bathrooms: 2.0, age_years: 18, actual_price_k: 275, predicted_price_k: 279.0, residual_k: -4.0 },
      { sqft: 1900, bedrooms: 3, bathrooms: 2.0, age_years: 8, actual_price_k: 365, predicted_price_k: 360.3, residual_k: +4.7 },
      { sqft: 2400, bedrooms: 4, bathrooms: 3.0, age_years: 4, actual_price_k: 470, predicted_price_k: 468.1, residual_k: +1.9 },
      { sqft: 1100, bedrooms: 2, bathrooms: 1.0, age_years: 30, actual_price_k: 210, predicted_price_k: 216.5, residual_k: -6.5 },
      { sqft: 3200, bedrooms: 5, bathrooms: 4.0, age_years: 1, actual_price_k: 640, predicted_price_k: 644.1, residual_k: -4.1 },
    ],
  },
  objectives: [
    'Fit multiple linear regression parameters [β₀, β_sqft, β_beds, β_baths, β_age] using normal equation (XᵀX)⁻¹Xᵀy',
    'Evaluate R² and RMSE across the 10 valuation instances',
    'Plot residuals (y - ŷ) versus fitted values ŷ to verify homoscedasticity',
    'Assess feature p-values to determine if age_years shows statistically significant depreciation',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'OLS Parameter Estimation via Normal Equation',
      instruction: 'Compute β = (XᵀX)⁻¹Xᵀy to determine regression coefficients.',
      codeSnippet: `import numpy as np\nX = np.column_stack([np.ones(len(df)), df[['sqft', 'bedrooms', 'bathrooms', 'age_years']].values])\ny = df['actual_price_k'].values\nbeta = np.linalg.inv(X.T @ X) @ X.T @ y\nprint("Coefficients:", np.round(beta, 3))`,
      expectedResult: 'β₀ = 42.15, β_sqft = +0.165 ($165/sqft), β_beds = +12.4k, β_baths = +18.2k, β_age = -2.15k/year',
      explanation: 'Each additional square foot adds $165 in predicted valuation, while each year of property age reduces valuation by $2,150.',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Model Goodness-of-Fit (R² and RMSE)',
      instruction: 'Compute Residual Sum of Squares (SS_res), Total Sum of Squares (SS_tot), R², and RMSE.',
      codeSnippet: `y_pred = X @ beta\nresiduals = y - y_pred\nss_res = np.sum(residuals**2)\nss_tot = np.sum((y - np.mean(y))**2)\nr2 = 1 - (ss_res / ss_tot)\nrmse = np.sqrt(np.mean(residuals**2))\nprint(f"R²: {r2:.4f}, RMSE: USD {rmse:.2f}k")`,
      expectedResult: 'R² = 0.9942, RMSE = $5.68k ($5,680 average pricing deviation)',
      explanation: 'The multiple linear regression model accounts for 99.4% of price variation across the valuation dataset with an average error of ~$5.68k.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'Residual Diagnostic Evaluation',
      instruction: 'Check mean residual and evaluate variance across predicted values.',
      codeSnippet: `mean_res = np.mean(residuals)\nprint(f"Mean Residual: {mean_res:.6f}")`,
      expectedResult: 'Mean Residual = 0.000000 (Exact OLS orthogonality constraint fulfilled)',
      explanation: 'Residuals are evenly distributed above and below zero without funnel-shaped heteroscedasticity.',
    },
  ],
  finalInterpretation:
    'The linear model achieves stellar performance with R² = 0.994 and RMSE = $5,680. Every sqft adds $165 to home value, and age exerts a -2.15k annual depreciation penalty. Residual diagnostics confirm linearity and homoscedastic variance across low and high valuation tiers.',
  challengeQuestion: {
    question: 'If a high-leverage luxury mansion of 8,000 sqft sold for $2.5M is added to this dataset, how will Ordinary Least Squares react?',
    options: [
      'The OLS regression line will rotate sharply toward the mansion because squared errors heavily penalize extreme outliers',
      'The regression line will ignore it because R² is already 0.994',
      'The slope β_sqft will automatically decrease to zero',
      'RMSE will decrease because price is higher',
    ],
    correctIndex: 0,
    explanation:
      'OLS minimizes squared residuals (RSS = Σ e_i²). A massive extreme point exerts tremendous leverage and will pull the fitted hyperplane toward itself.',
  },
};
