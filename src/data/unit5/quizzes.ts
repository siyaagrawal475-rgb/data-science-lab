import { UnitQuiz } from '@/data/unit1/quizzes';

export const UNIT_5_QUIZ: UnitQuiz = {
  id: 'unit-5-mastery-quiz',
  unitId: 'unit-5',
  unitNumber: 5,
  title: 'Unit 5 Mastery Assessment: Regression Analysis',
  description: 'Evaluate your conceptual, mathematical, and algorithmic mastery across all 10 topics of Regression Analysis.',
  passingScorePercent: 70,
  questions: [
    {
      id: 'u5-q1',
      topic: 'Simple Linear Regression Model',
      type: 'conceptual',
      question: 'In the simple linear regression model ŷ = β₀ + β₁x, what does the parameter β₁ represent?',
      options: [
        'The baseline value of Y when X equals zero',
        'The expected change in target Y per one-unit increase in predictor X',
        'The correlation coefficient between X and Y',
        'The proportion of variance explained by the model'
      ],
      correctIndex: 1,
      explanation: 'β₁ represents the slope, which measures the rate of change: the expected marginal increase (or decrease) in the continuous target Y when predictor X increases by one unit.'
    },
    {
      id: 'u5-q2',
      topic: 'Least-Squares Objective',
      type: 'conceptual',
      question: 'Why does Ordinary Least Squares (OLS) minimize the sum of SQUARED residuals Σ(yᵢ - ŷᵢ)² rather than raw residuals Σ(yᵢ - ŷᵢ)?',
      options: [
        'Because raw residuals sum to zero for any line passing through the centroid (x̄, ȳ), canceling out errors',
        'Because squaring errors makes the line pass through every point',
        'Because squared errors eliminate all negative numbers from the dataset',
        'Because raw residuals cannot be calculated in Python'
      ],
      correctIndex: 0,
      explanation: 'Raw positive and negative residuals cancel each other out and sum to zero for any line passing through (x̄, ȳ). Squaring ensures all errors contribute positive penalties and creates a smooth convex quadratic loss.'
    },
    {
      id: 'u5-q3',
      topic: 'OLS Parameter Calculation',
      type: 'calculation',
      question: 'Given sample means x̄ = 4.0, ȳ = 20.0, and an estimated slope β̂₁ = 3.5, what is the Ordinary Least Squares intercept β̂₀?',
      options: ['6.0', '14.0', '34.0', '5.7'],
      correctIndex: 0,
      explanation: 'The OLS intercept formula is β̂₀ = ȳ - β̂₁x̄ = 20.0 - (3.5)(4.0) = 20.0 - 14.0 = 6.0.'
    },
    {
      id: 'u5-q4',
      topic: 'RMSE Calculation',
      type: 'calculation',
      question: 'If a linear model evaluated across n = 50 test observations yields a Sum of Squared Errors SSE = 450, what is the Root Mean Squared Error (RMSE)?',
      options: ['9.0', '3.0', '4.5', '15.0'],
      correctIndex: 1,
      explanation: 'MSE = SSE / n = 450 / 50 = 9.0. RMSE = √MSE = √9.0 = 3.0.'
    },
    {
      id: 'u5-q5',
      topic: 'R² Interpretation',
      type: 'conceptual',
      question: 'A regression model yields R² = 0.82. What is the precise statistical interpretation of this metric?',
      options: [
        'The model makes correct predictions on 82% of future unseen test cases',
        '82% of the total variance in the response variable Y is explained by the linear relationship with predictor X',
        'There is an 82% probability that X causes changes in Y',
        'The correlation coefficient between X and Y is exactly 0.82'
      ],
      correctIndex: 1,
      explanation: 'R² = 1 - SSE/SST measures the proportion of total variation in target Y that is accounted for by the fitted regression model. It is not an accuracy percentage or a measure of causality.'
    },
    {
      id: 'u5-q6',
      topic: 'Multiple Regression Partial Coefficients',
      type: 'conceptual',
      question: 'In a multiple regression model ŷ = 10 + 2.5x₁ - 4.0x₂, what does the coefficient 2.5 mean?',
      options: [
        'Y increases by 2.5 when x₁ increases by 1, regardless of how x₂ changes',
        'Y is expected to increase by 2.5 units for each one-unit increase in x₁, holding x₂ constant (ceteris paribus)',
        'x₁ is 2.5 times more important than x₂',
        'The intercept changes by 2.5 units when x₁ = 0'
      ],
      correctIndex: 1,
      explanation: 'In multiple regression, each coefficient measures the partial derivative ∂ŷ/∂xⱼ, which is the expected change in Y per unit increase in that feature while holding all other predictors fixed.'
    },
    {
      id: 'u5-q7',
      topic: 'Matrix OLS & Singularity',
      type: 'conceptual',
      question: 'Under what circumstance will the closed-form matrix OLS estimator β̂ = (XᵀX)⁻¹Xᵀy fail to compute?',
      options: [
        'When the target variable Y contains negative values',
        'When the Gram matrix XᵀX is singular (e.g. due to perfect multicollinearity or p > n)',
        'When the number of observations n exceeds 10,000',
        'When the error term ε has zero mean'
      ],
      correctIndex: 1,
      explanation: 'If feature columns in design matrix X are linearly dependent (perfect multicollinearity) or if the number of features p exceeds sample size n, XᵀX is not full rank and has determinant zero (singular), making the matrix inverse undefined.'
    },
    {
      id: 'u5-q8',
      topic: 'Polynomial Regression Complexity',
      type: 'conceptual',
      question: 'What happens to training error (SSE_train) and validation error (SSE_val) when the polynomial degree d is increased from 1 to 15 on a small noisy dataset?',
      options: [
        'Both training error and validation error decrease monotonically toward zero',
        'Training error increases, while validation error decreases',
        'Training error monotonically decreases toward zero, but validation error increases drastically due to overfitting',
        'Both training and validation error remain completely unchanged'
      ],
      correctIndex: 2,
      explanation: 'As polynomial degree increases, model capacity expands to memorize training noise (training error drops to 0), but the wild oscillations between points cause out-of-sample validation error to explode (overfitting / high variance).'
    },
    {
      id: 'u5-q9',
      topic: 'Ridge vs. Lasso Regularization',
      type: 'conceptual',
      question: 'Which statement correctly contrasts Ridge (L2) and Lasso (L1) regression?',
      options: [
        'Ridge drives coefficients exactly to zero, while Lasso only shrinks them smoothly',
        'Lasso can drive coefficients of uninformative features exactly to zero (sparsity), whereas Ridge shrinks coefficients smoothly toward zero without eliminating them',
        'Ridge does not require feature scaling, but Lasso does',
        'Lasso is only valid for simple linear regression with one predictor'
      ],
      correctIndex: 1,
      explanation: 'Due to the sharp diamond geometry of the L1 penalty norm, Lasso sets non-essential feature weights to exactly 0, performing automatic feature selection, whereas Ridge (L2 circular contour) shrinks weights asymptotically.'
    },
    {
      id: 'u5-q10',
      topic: 'Regularization & Feature Scaling',
      type: 'conceptual',
      question: 'Why is it mandatory to standardize (scale) features before applying Ridge or Lasso regression?',
      options: [
        'Because unscaled features cause computer memory overflow',
        'Because regularization penalties treat all coefficient magnitudes identically, so unscaled features with large units would be unfairly under-penalized or over-penalized',
        'Because OLS cannot compute intercepts on raw features',
        'Because standardizing features guarantees R² = 1.0'
      ],
      correctIndex: 1,
      explanation: 'The penalty term λ Σ βⱼ² or λ Σ |βⱼ| penalizes raw weight values. Without standardization, features on large numeric scales will have small coefficients that escape regularization, while features on small scales will be unfairly penalized.'
    },
    {
      id: 'u5-q11',
      topic: 'Regression Diagnostics: Heteroscedasticity',
      type: 'conceptual',
      question: 'What does a distinct "megaphone" or "funnel" pattern in a Residuals vs. Fitted Values plot indicate?',
      options: [
        'The model satisfies all Gauss-Markov assumptions',
        'Heteroscedasticity: the variance of residual errors is not constant across predicted levels',
        'Exact multicollinearity between features',
        'The polynomial degree is too low'
      ],
      correctIndex: 1,
      explanation: 'A funnel shape indicates non-constant error variance (heteroscedasticity), violating the Gauss-Markov assumption of homoscedasticity (equal variance).'
    },
    {
      id: 'u5-q12',
      topic: 'Data Science Workflow & Splitting',
      type: 'conceptual',
      question: 'In an end-to-end regression machine learning workflow, why must the test set remain untouched during hyperparameter tuning (e.g. tuning λ for Ridge/Lasso)?',
      options: [
        'Because test data cannot be converted into NumPy matrices',
        'To prevent data leakage and ensure the test score provides an unbiased evaluation of true real-world generalization',
        'Because Scikit-Learn only allows fitting on validation sets',
        'Because hyperparameter tuning requires at least 1,000,000 data rows'
      ],
      correctIndex: 1,
      explanation: 'Tuning hyperparameters using the test set leads to optimistic bias and data leakage. Hyperparameters must be selected using training and validation splits (or cross-validation), leaving the test set solely for final performance estimation.'
    }
  ]
};
