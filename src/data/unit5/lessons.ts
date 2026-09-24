import { UnitId } from '@/types';
import { FullLessonData } from '@/data/unit1/lessons';

export const UNIT_5_LESSONS: FullLessonData[] = [
  {
    id: 'u5-l1',
    slug: 'simple-linear-regression',
    order: 1,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Simple Linear Regression',
    shortDescription: 'Discover the foundations of supervised regression: modeling the relationship between an input feature X and a continuous target Y.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Understand the supervised learning context: predictor feature X and continuous target Y',
      'Formulate the linear regression equation ŷ = β₀ + β₁x with intercept β₀ and slope β₁',
      'Distinguish between observed targets yᵢ and model predictions ŷᵢ',
      'Differentiate correlation, prediction, and causation without confusing statistical association with cause-and-effect'
    ],
    mainExplanation: 'Simple Linear Regression (SLR) is the foundational supervised learning method for modeling the linear relationship between a single independent predictor variable X and a continuous dependent response target Y. By estimating the best-fitting straight line through observed data, regression enables quantitative prediction, rate-of-change estimation, and trend analysis across scientific, financial, and engineering domains.',
    conceptSections: [
      {
        id: 'sec-slr-model',
        title: 'The Linear Model Specification',
        content: [
          'In supervised learning, we are given a training dataset of n pairs (x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ). We hypothesize that the true data-generating process follows a linear relationship corrupted by random additive noise εᵢ: yᵢ = β₀ + β₁xᵢ + εᵢ.',
          'The parameter β₀ represents the intercept (the expected value of Y when X = 0), and β₁ represents the slope (the expected change in Y for a one-unit increase in X). The deterministic model generates predicted values denoted ŷᵢ = β̂₀ + β̂₁xᵢ.'
        ],
        table: {
          caption: 'Components of Simple Linear Regression',
          headers: ['Symbol', 'Name', 'Description & Interpretation'],
          rows: [
            ['X', 'Predictor / Feature', 'Independent input variable (e.g. square footage, study hours)'],
            ['Y', 'Response / Target', 'Observed continuous output variable (e.g. house price, test score)'],
            ['β₀', 'Intercept', 'Value of Y when X = 0 (baseline level)'],
            ['β₁', 'Slope', 'Expected change in Y per unit increase in X (rate of change)'],
            ['ŷ', 'Fitted Value / Prediction', 'Point on the regression line for a given x: ŷ = β₀ + β₁x'],
            ['ε', 'Error / Noise Term', 'Unobserved random disturbance with E[ε] = 0']
          ]
        },
        callout: {
          type: 'warning',
          title: 'Correlation vs. Causation Warning',
          text: 'Regression models statistical association and conditional expectations E[Y|X]. A strong linear fit (high |β₁| and high R²) does NOT prove that X causes changes in Y. Confounding variables, reverse causality, and selection bias can produce strong linear relationships in purely observational data.'
        }
      },
      {
        id: 'sec-slr-worked',
        title: 'Worked Example: Study Hours vs. Exam Score',
        content: [
          'Suppose we observe 5 students whose study hours X and exam scores Y are recorded: (1, 55), (2, 65), (3, 72), (4, 80), (5, 88).',
          'Fitting a linear model yields estimated parameters β̂₁ = 8.1 and β̂₀ = 47.7. The prediction equation is: ŷ = 47.7 + 8.1x. For a student studying 3.5 hours, the predicted score is ŷ = 47.7 + 8.1(3.5) = 76.05 points.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Fitting Simple Linear Regression in Scikit-Learn',
          code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Training data (hours studied vs exam score)
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([55, 65, 72, 80, 88])

# Fit ordinary least squares model
model = LinearRegression()
model.fit(X, y)

print(f"Intercept (beta_0): {model.intercept_:.2f}")  # 47.70
print(f"Slope (beta_1):     {model.coef_[0]:.2f}")     # 8.10

# Predict for x = 3.5 hours
y_pred = model.predict([[3.5]])
print(f"Predicted score for 3.5 hrs: {y_pred[0]:.2f}")  # 76.05`
        }
      }
    ],
    keyTakeaways: [
      'Simple Linear Regression models the conditional mean E[Y|X] as a linear function ŷ = β₀ + β₁x.',
      'The slope β₁ quantifies the marginal rate of change in Y per unit increase in X.',
      'Predictions ŷᵢ represent fitted points on the line, distinct from actual observed values yᵢ.',
      'Linear regression establishes predictive association, never direct causal proof.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l1-q1',
        question: 'If a fitted regression model is ŷ = 25 + 4.5x, what is the predicted target value when x = 6?',
        options: ['48.0', '52.0', '29.5', '56.5'],
        correctIndex: 1,
        explanation: 'Substituting x = 6 into the model: ŷ = 25 + 4.5(6) = 25 + 27 = 52.0.'
      }
    ]
  },
  {
    id: 'u5-l2',
    slug: 'least-squares',
    order: 2,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Least Squares & Parameter Estimation',
    shortDescription: 'Master the Ordinary Least Squares (OLS) objective, derivation of closed-form parameter formulas, and error minimization geometry.',
    estimatedDuration: 18,
    contentType: 'interactive',
    learningObjectives: [
      'Formulate the vertical residual eᵢ = yᵢ - ŷᵢ for each observation',
      'Define the Sum of Squared Errors (SSE) objective function SSE = Σ(yᵢ - ŷᵢ)²',
      'Understand why squared error is minimized rather than absolute or raw errors',
      'Derive and apply the analytical OLS formulas for β̂₁ and β̂₀'
    ],
    mainExplanation: 'Ordinary Least Squares (OLS) is the mathematical criterion used to find the unique optimal straight line through a dataset. Instead of guessing slopes and intercepts, OLS defines a loss function equal to the sum of squared vertical differences between observed targets and the fitted line, then utilizes calculus to find the global minimum.',
    conceptSections: [
      {
        id: 'sec-ols-criterion',
        title: 'The Least-Squares Criterion & Residuals',
        content: [
          'For each data point (xᵢ, yᵢ), the vertical residual is the prediction error: eᵢ = yᵢ - ŷᵢ = yᵢ - (β₀ + β₁xᵢ).',
          'Raw residuals sum to zero (Σ eᵢ = 0) for any line passing through the centroid (x̄, ȳ), making raw error useless as a loss function. Squaring each residual ensures all penalties are strictly positive and penalizes larger errors disproportionately: SSE = Σᵢ₌₁ⁿ eᵢ² = Σᵢ₌₁ⁿ (yᵢ - β₀ - β₁xᵢ)².'
        ],
        callout: {
          type: 'tip',
          title: 'Why Squaring Matters',
          text: 'Squaring yields a smooth, continuous, convex quadratic paraboloid with a unique global minimum that can be solved analytically by setting partial derivatives ∂SSE/∂β₀ = 0 and ∂SSE/∂β₁ = 0.'
        }
      },
      {
        id: 'sec-analytical-formulas',
        title: 'Analytical Closed-Form OLS Estimators',
        content: [
          'Setting partial derivatives to zero yields the normal equations. Solving for the slope β̂₁ and intercept β̂₀ gives the exact closed-form solution:',
          'β̂₁ = Σ(xᵢ - x̄)(yᵢ - ȳ) / Σ(xᵢ - x̄)² = Cov(X, Y) / Var(X)',
          'β̂₀ = ȳ - β̂₁x̄',
          'Notice that the optimal line is guaranteed to pass directly through the sample center of mass (the centroid) (x̄, ȳ).'
        ],
        table: {
          caption: 'Step-by-Step OLS Calculation for Points (1, 2), (2, 3), (3, 5)',
          headers: ['xᵢ', 'yᵢ', 'xᵢ - x̄', 'yᵢ - ȳ', '(xᵢ - x̄)²', '(xᵢ - x̄)(yᵢ - ȳ)'],
          rows: [
            ['1', '2', '-1', '-1.33', '1.0', '+1.33'],
            ['2', '3', '0', '-0.33', '0.0', '0.00'],
            ['3', '5', '+1', '+1.67', '1.0', '+1.67'],
            ['Sum: 6 (x̄=2)', 'Sum: 10 (ȳ=3.33)', 'Sum: 0', 'Sum: 0', 'SS_xx = 2.0', 'SS_xy = 3.0']
          ]
        }
      }
    ],
    keyTakeaways: [
      'The residual eᵢ = yᵢ - ŷᵢ measures the vertical distance between data and model.',
      'OLS minimizes the Sum of Squared Errors: SSE = Σ (yᵢ - ŷᵢ)².',
      'The optimal slope is β̂₁ = Cov(X, Y) / Var(X) and intercept is β̂₀ = ȳ - β̂₁x̄.',
      'The regression line unconditionally passes through the data centroid (x̄, ȳ).'
    ],
    practiceQuestions: [
      {
        id: 'u5-l2-q1',
        question: 'Given x̄ = 10, ȳ = 50, and calculated slope β̂₁ = 3.2, what is the OLS intercept β̂₀?',
        options: ['18.0', '32.0', '50.0', '82.0'],
        correctIndex: 0,
        explanation: 'Using β̂₀ = ȳ - β̂₁x̄: β̂₀ = 50 - (3.2)(10) = 50 - 32 = 18.0.'
      }
    ]
  },
  {
    id: 'u5-l3',
    slug: 'regression-line',
    order: 3,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'The Regression Line',
    shortDescription: 'Interpret slope and intercept parameters, calculate fitted values, and understand the dangers of extrapolation.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Correctly interpret the practical meaning of slope β₁ in domain units',
      'Evaluate whether the intercept β₀ has physical meaning or is merely an anchor',
      'Differentiate between safe interpolation and hazardous extrapolation',
      'Compute fitted values ŷ across continuous feature intervals'
    ],
    mainExplanation: 'The regression line provides a continuous functional relationship summarizing the expected target response across the range of the predictor. Interpreting its parameters with physical domain awareness is essential for translating mathematical fits into actionable insights.',
    conceptSections: [
      {
        id: 'sec-parameter-interpretation',
        title: 'Interpreting Slope and Intercept',
        content: [
          'Slope β̂₁: Represents the expected change in Y per unit increase in X in the target’s units divided by the predictor’s units (e.g. $150/sq ft, 2.5 mpg/100 lbs). If β̂₁ = 0, X provides no linear predictive value for Y.',
          'Intercept β̂₀: The expected value of Y when X = 0. In many real-world applications (e.g. predicting human weight from height), X = 0 lies far outside plausible bounds, making β₀ a mathematical baseline rather than a physically realizable state.'
        ],
        callout: {
          type: 'warning',
          title: 'Interpolation vs. Extrapolation',
          text: 'Interpolation is predicting within the observed domain [x_min, x_max], which is statistically sound. Extrapolation is predicting outside [x_min, x_max], which assumes the linear trend persists indefinitely into unobserved regimes where nonlinearities, saturation, or phase changes may occur.'
        }
      },
      {
        id: 'sec-extrapolation-hazard',
        title: 'The Danger of Extrapolation',
        content: [
          'Consider a linear model relating athlete sprint speeds to age from ages 15 to 25. Extrapolating this model linearly to age 80 would predict speeds faster than Olympic sprinters or negative race times.',
          'Always check the training range [min(X), max(X)] before deploying a linear model to production inputs.'
        ],
        table: {
          caption: 'Interpolation vs Extrapolation Comparison',
          headers: ['Operation', 'Input Range', 'Risk Level', 'Statistical Validity'],
          rows: [
            ['Interpolation', 'Within [x_min, x_max]', 'Low', 'High (supported by local empirical evidence)'],
            ['Near Extrapolation', 'Just beyond bounds (±5%)', 'Moderate', 'Requires domain justification'],
            ['Far Extrapolation', 'Far outside observed support', 'Extreme / Unsafe', 'Invalid (linear relationship rarely holds globally)']
          ]
        }
      }
    ],
    keyTakeaways: [
      'Slope β̂₁ dictates the marginal effect of X on the expected value of Y.',
      'Intercept β̂₀ anchors the model at X = 0, which may or may not possess physical meaning.',
      'Interpolation within [x_min, x_max] is reliable; extrapolation outside this interval is hazardous.',
      'Linearity is a local approximation of reality, not a universal law.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l3-q1',
        question: 'A model trained on house sizes between 1,000 and 4,000 sq ft yields Price = 50,000 + 200(Size). Predicting the price of a 15,000 sq ft mansion is an example of:',
        options: ['Interpolation', 'Extrapolation', 'Homoscedasticity', 'Overfitting'],
        correctIndex: 1,
        explanation: 'Because 15,000 sq ft is far outside the training range [1,000, 4,000], this prediction is extrapolation.'
      }
    ]
  },
  {
    id: 'u5-l4',
    slug: 'residuals',
    order: 4,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Residuals & Prediction Error',
    shortDescription: 'Analyze individual errors eᵢ = yᵢ - ŷᵢ and quantify model accuracy using SSE, MSE, and RMSE metrics.',
    estimatedDuration: 18,
    contentType: 'interactive',
    learningObjectives: [
      'Calculate individual residuals eᵢ = yᵢ - ŷᵢ for positive, negative, and zero error cases',
      'Compute and differentiate aggregate error metrics: SSE, MSE, and RMSE',
      'Interpret RMSE in the natural measurement units of the response target Y',
      'Use residual plots to diagnose curvature, heteroscedasticity, and systematic bias'
    ],
    mainExplanation: 'Residuals are the fundamental diagnostic currency of regression analysis. Every residual eᵢ = yᵢ - ŷᵢ represents the portion of the target that the model failed to explain. By evaluating individual residuals and aggregate metrics like RMSE, data scientists diagnose model accuracy, detect violations of linearity, and identify problematic outliers.',
    conceptSections: [
      {
        id: 'sec-error-metrics',
        title: 'Quantifying Aggregate Error: SSE, MSE, and RMSE',
        content: [
          'Sum of Squared Errors (SSE): Measures total unscaled squared penalty: SSE = Σ eᵢ².',
          'Mean Squared Error (MSE): The average squared prediction error across n observations: MSE = SSE / n.',
          'Root Mean Squared Error (RMSE): The square root of MSE: RMSE = √MSE. Because taking the square root restores the original measurement units of Y, RMSE represents the typical standard deviation of the prediction error.'
        ],
        table: {
          caption: 'Regression Error Metric Hierarchy',
          headers: ['Metric', 'Formula', 'Units', 'Primary Purpose'],
          rows: [
            ['SSE', 'Σ (yᵢ - ŷᵢ)²', 'Units of Y²', 'Optimization objective function in OLS'],
            ['MSE', 'SSE / n', 'Units of Y²', 'Standard loss in ML benchmarking & optimization'],
            ['RMSE', '√(SSE / n)', 'Units of Y', 'Directly interpretable average error magnitude'],
            ['MAE', '(1/n) Σ |yᵢ - ŷᵢ|', 'Units of Y', 'Robust error metric less sensitive to extreme outliers']
          ]
        }
      },
      {
        id: 'sec-residual-plots',
        title: 'Residual Diagnostics & Pattern Recognition',
        content: [
          'A residual plot displays residuals eᵢ on the vertical axis against fitted values ŷᵢ (or predictor xᵢ) on the horizontal axis.',
          'In an ideal model, residuals scatter randomly around zero with no visible pattern (homoscedasticity). Visible patterns immediately reveal structural flaws: a parabolic U-shape indicates omitted nonlinear terms, while a funnel shape (fanning out) indicates non-constant variance (heteroscedasticity).'
        ],
        callout: {
          type: 'warning',
          title: 'Residual Patterns Mean Missing Information',
          text: 'If your residual plot displays a clear curve or trend, the linear model is systematically underpredicting in some regions and overpredicting in others. You need polynomial terms or feature transformations.'
        }
      }
    ],
    keyTakeaways: [
      'The residual eᵢ = yᵢ - ŷᵢ is the vertical distance between the actual target and the model prediction.',
      'SSE sums squared errors; MSE averages them across n observations.',
      'RMSE = √MSE is directly interpretable in the original units of target variable Y.',
      'Residual plots should resemble unstructured white noise; visible curves indicate model inadequacy.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l4-q1',
        question: 'If a regression model evaluated on n = 100 test samples has SSE = 40,000, what is its RMSE?',
        options: ['400', '40', '20', '200'],
        correctIndex: 2,
        explanation: 'MSE = SSE / n = 40,000 / 100 = 400. RMSE = √400 = 20.'
      }
    ]
  },
  {
    id: 'u5-l5',
    slug: 'r-squared-model-fit',
    order: 5,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'R² & Model Fit',
    shortDescription: 'Deconstruct total variance into explained and unexplained components, interpret R², and apply Adjusted R².',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Deconstruct Total Sum of Squares (SST) into Regression Sum of Squares (SSR) and Error Sum of Squares (SSE)',
      'Calculate and interpret the coefficient of determination R² = 1 - SSE/SST',
      'Understand what R² measures and what it DOES NOT imply (accuracy, causality, validity)',
      'Apply Adjusted R² to penalize superfluous predictors in multi-feature models'
    ],
    mainExplanation: 'The Coefficient of Determination, denoted R², quantifies the proportion of total variance in the dependent variable Y that is explained by the independent predictor(s) in the linear model. Understanding how R² is derived from variance decomposition is critical for evaluating goodness of fit without falling prey to common statistical misinterpretations.',
    conceptSections: [
      {
        id: 'sec-variance-decomposition',
        title: 'The Fundamental Sum of Squares Decomposition',
        content: [
          'Total variation in the target Y around its sample mean ȳ is quantified by the Total Sum of Squares: SST = Σ (yᵢ - ȳ)².',
          'In Ordinary Least Squares, SST decomposes exactly into two orthogonal components: SST = SSR + SSE, where SSR = Σ (ŷᵢ - ȳ)² is the variation explained by the regression line, and SSE = Σ (yᵢ - ŷᵢ)² is the unexplained residual variation.',
          'R² is defined as the fraction of variance explained: R² = SSR / SST = 1 - (SSE / SST).'
        ],
        table: {
          caption: 'Sums of Squares Decomposition Breakdown',
          headers: ['Sum of Squares', 'Mathematical Definition', 'Interpretation'],
          rows: [
            ['SST (Total)', 'Σ (yᵢ - ȳ)²', 'Total baseline variability of target around its mean'],
            ['SSR (Regression)', 'Σ (ŷᵢ - ȳ)²', 'Variability captured and explained by the regression model'],
            ['SSE (Error)', 'Σ (yᵢ - ŷᵢ)²', 'Variability left unexplained (residual noise)']
          ]
        }
      },
      {
        id: 'sec-r2-limitations',
        title: 'Limitations of R² & Adjusted R²',
        content: [
          'R² is bounded between 0 and 1 (for linear models with intercepts). An R² of 0.85 means 85% of target variance is explained by X.',
          'R² is NOT accuracy. A high R² can occur in completely misspecified nonlinear models, and a low R² (e.g. 0.20) can still represent a highly statistically significant and valuable effect in noisy domains like genomics or social sciences.',
          'Crucially, standard R² mechanically increases whenever a new feature is added, even if that feature is pure random noise. To prevent overparameterization, Adjusted R² incorporates a penalty for each added predictor p:'
        ],
        callout: {
          type: 'info',
          title: 'Adjusted R² Formula',
          text: 'Adjusted R² = 1 - (1 - R²) * (n - 1) / (n - p - 1), where n is the sample size and p is the number of predictors. It only increases if an added predictor improves model fit more than expected by chance.'
        }
      }
    ],
    keyTakeaways: [
      'Total variance decomposes into explained (SSR) and unexplained (SSE) components: SST = SSR + SSE.',
      'R² = 1 - SSE/SST measures the proportion of variance explained by the model.',
      'R² is not an accuracy percentage and does not validate model correctness or absence of bias.',
      'Adjusted R² penalizes model complexity p and should always be reported in multiple regression.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l5-q1',
        question: 'Given SST = 500 and SSE = 125, what is the value of R²?',
        options: ['0.25', '0.75', '0.80', '0.60'],
        correctIndex: 1,
        explanation: 'R² = 1 - (SSE / SST) = 1 - (125 / 500) = 1 - 0.25 = 0.75.'
      }
    ]
  },
  {
    id: 'u5-l6',
    slug: 'multiple-linear-regression',
    order: 6,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Multiple Linear Regression',
    shortDescription: 'Extend regression to p predictors, formulate the matrix equation y = Xβ + ε, and solve OLS using the normal equations.',
    estimatedDuration: 20,
    contentType: 'interactive',
    learningObjectives: [
      'Formulate multiple linear regression: ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ',
      'Interpret partial regression coefficients as marginal effects holding all other predictors constant (ceteris paribus)',
      'Represent datasets in matrix notation: target vector y, design matrix X, and parameter vector β',
      'Derive and compute the closed-form normal equation estimator β̂ = (XᵀX)⁻¹Xᵀy and identify singularity conditions'
    ],
    mainExplanation: 'Multiple Linear Regression (MLR) models a continuous response target Y as a linear combination of p distinct predictor features x₁, x₂, ..., xₚ. By leveraging matrix algebra from Units 2 and 3, MLR simultaneously estimates the independent partial effect of each feature while controlling for all other variables in the system.',
    conceptSections: [
      {
        id: 'sec-mlr-formulation',
        title: 'Multiple Regression Formulation & Partial Effects',
        content: [
          'The multiple regression model is: ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ.',
          'Each coefficient βⱼ represents the expected change in Y per one-unit increase in predictor xⱼ, holding all other p-1 predictors constant (ceteris paribus). This partial adjustment isolates the unique contribution of each feature and controls for mutual correlations.'
        ],
        callout: {
          type: 'tip',
          title: 'Connection to Unit 3 Matrices',
          text: 'We stack n observations into an n × 1 target vector y, an n × (p + 1) design matrix X (with a leading column of 1s for the intercept), and a (p + 1) × 1 parameter vector β: y = Xβ + ε.'
        }
      },
      {
        id: 'sec-matrix-ols',
        title: 'The Closed-Form Matrix OLS Estimator',
        content: [
          'The Sum of Squared Errors in matrix vector notation is: SSE = (y - Xβ)ᵀ(y - Xβ).',
          'Taking the matrix derivative with respect to β and setting it to the zero vector yields the famous Normal Equations: XᵀXβ = Xᵀy.',
          'If the square (p + 1) × (p + 1) matrix XᵀX is non-singular (invertible), the unique Ordinary Least Squares solution is given by: β̂ = (XᵀX)⁻¹Xᵀy.'
        ],
        table: {
          caption: 'Dimensions in Matrix OLS Regression',
          headers: ['Matrix / Vector', 'Dimensions', 'Contents & Interpretation'],
          rows: [
            ['y', 'n × 1', 'Observed target values for n training instances'],
            ['X', 'n × (p + 1)', 'Design matrix: column of 1s plus p feature columns'],
            ['XᵀX', '(p + 1) × (p + 1)', 'Feature Gram matrix (proportional to covariance matrix)'],
            ['Xᵀy', '(p + 1) × 1', 'Cross-product projection vector between features and target'],
            ['β̂', '(p + 1) × 1', 'Estimated parameter weights: [β̂₀, β̂₁, ..., β̂ₚ]ᵀ']
          ]
        },
        callout: {
          type: 'warning',
          title: 'Singularity & Multicollinearity Conditions',
          text: 'The matrix inverse (XᵀX)⁻¹ exists if and only if X has full column rank (rank = p + 1). If two features are perfectly collinear (e.g. weight in pounds and weight in kilograms), or if the number of features p exceeds sample size n (p > n), XᵀX is singular, and OLS fails to produce a unique solution.'
        }
      }
    ],
    keyTakeaways: [
      'Multiple regression accounts for multiple predictor features simultaneously: ŷ = β₀ + Σ βⱼxⱼ.',
      'Coefficients represent partial derivatives ∂ŷ/∂xⱼ holding other variables constant.',
      'The matrix OLS closed-form solution is β̂ = (XᵀX)⁻¹Xᵀy.',
      'The solution requires XᵀX to be non-singular, which fails under exact multicollinearity or when p > n.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l6-q1',
        question: 'Under what mathematical condition does the OLS closed form β̂ = (XᵀX)⁻¹Xᵀy fail to exist?',
        options: [
          'When the residuals sum to zero',
          'When XᵀX is singular and non-invertible (e.g. perfect multicollinearity)',
          'When R² is less than 0.50',
          'When the sample size n is greater than the number of predictors p'
        ],
        correctIndex: 1,
        explanation: 'If XᵀX is singular (det(XᵀX) = 0), its inverse does not exist, and closed-form OLS cannot compute unique parameter estimates.'
      }
    ]
  },
  {
    id: 'u5-l7',
    slug: 'polynomial-regression',
    order: 7,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Polynomial Regression',
    shortDescription: 'Model nonlinear phenomena by engineering polynomial feature powers while preserving linear parameter estimation.',
    estimatedDuration: 18,
    contentType: 'interactive',
    learningObjectives: [
      'Formulate polynomial regression: ŷ = β₀ + β₁x + β₂x² + ... + βₖxᵏ',
      'Understand why polynomial regression is nonlinear in feature x but still linear in parameters β',
      'Observe how increasing polynomial degree changes model flexibility and capacity',
      'Analyze the tradeoff between underfitting (bias) at low degrees and overfitting (variance) at high degrees'
    ],
    mainExplanation: 'Many real-world phenomena exhibit nonlinear curves, saturation thresholds, and diminishing returns (e.g. dose-response curves, aerodynamic drag, financial compound growth). Polynomial regression captures these curves by transforming a single predictor into power features [x, x², x³, ..., xᵈ] and applying standard linear regression to the transformed feature matrix.',
    conceptSections: [
      {
        id: 'sec-polynomial-design',
        title: 'Linearity in Parameters vs. Nonlinearity in Features',
        content: [
          'A polynomial model of degree d expresses predictions as: ŷ = β₀ + β₁x + β₂x² + ... + β_d x^d.',
          'Crucially, while ŷ is a nonlinear curve with respect to input variable x, it is strictly linear with respect to the unknown coefficients β = [β₀, β₁, ..., β_d]ᵀ. Therefore, we can solve for all β parameters using standard linear OLS on the augmented Vandermonde design matrix X_poly = [1, x, x², ..., x^d].'
        ],
        table: {
          caption: 'Vandermonde Feature Matrix Transformation for x = [2, 3]',
          headers: ['Instance', 'Bias (x⁰)', 'Linear (x¹)', 'Quadratic (x²)', 'Cubic (x³)'],
          rows: [
            ['x₁ = 2', '1', '2', '4', '8'],
            ['x₂ = 3', '1', '3', '9', '27']
          ]
        }
      },
      {
        id: 'sec-bias-variance-poly',
        title: 'Model Complexity & The Overfitting Dilemma',
        content: [
          'Degree 1 (Linear): Models a straight line. If the underlying data is curved, it suffers from high bias / underfitting.',
          'Degree 2-3 (Quadratic / Cubic): Captures smooth parabolic curvature and inflection points with balanced generalization.',
          'Degree 8+: Possesses excessive flexibility. The curve oscillates wildly (Runge’s phenomenon) to pass through every individual training point and noise artifact, causing training error to drop to 0 while test / validation error explodes.'
        ],
        callout: {
          type: 'warning',
          title: 'Training Error vs Validation Error',
          text: 'Never judge a high-degree polynomial model solely on its training R² or training RMSE. As degree d increases, training error monotonically decreases, but out-of-sample generalization error rapidly diverges.'
        }
      }
    ],
    keyTakeaways: [
      'Polynomial regression fits curves by mapping x to powers [x, x², ..., xᵈ].',
      'The model remains linear in parameters β and is solved via standard matrix OLS.',
      'Low degrees risk underfitting (high bias); high degrees risk severe overfitting (high variance).',
      'Model validation on separate holdout/validation data is essential for choosing optimal degree d.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l7-q1',
        question: 'Why is polynomial regression ŷ = β₀ + β₁x + β₂x² classified as a "linear model"?',
        options: [
          'Because the graph of the function is always a straight line',
          'Because the model is linear with respect to its unknown parameters β',
          'Because the inputs x must be positive integers',
          'Because the residuals are always equal to zero'
        ],
        correctIndex: 1,
        explanation: 'In statistics and machine learning, "linear" refers to linearity in the coefficients β, which allows analytical closed-form estimation via OLS.'
      }
    ]
  },
  {
    id: 'u5-l8',
    slug: 'regularization',
    order: 8,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Regularization: Ridge & Lasso',
    shortDescription: 'Tame overfitting and multicollinearity by penalizing model complexity using L2 (Ridge) and L1 (Lasso) shrinkage penalties.',
    estimatedDuration: 22,
    contentType: 'interactive',
    learningObjectives: [
      'Understand why OLS coefficients explode under multicollinearity and overparameterization',
      'Formulate the Ridge (L2) objective: min ||y - Xβ||² + λ Σ βⱼ²',
      'Formulate the Lasso (L1) objective: min ||y - Xβ||² + λ Σ |βⱼ|',
      'Explain why Lasso produces sparse solutions (exact feature selection) while Ridge shrinks smoothly',
      'Understand why feature standardization (scaling) is mandatory before applying regularization'
    ],
    mainExplanation: 'When regression models encounter many correlated predictors (multicollinearity) or high polynomial degrees, Ordinary Least Squares estimates become wildly unstable with massive positive and negative coefficient swings. Regularization adds a mathematical penalty proportional to coefficient magnitude to the loss function, shrinking weights toward zero to drastically improve test generalization.',
    conceptSections: [
      {
        id: 'sec-ridge-lasso-formulation',
        title: 'Ridge (L2) vs. Lasso (L1) Objectives',
        content: [
          'Ridge Regression (L2): Adds a squared Euclidean norm penalty: Loss_Ridge = SSE + λ Σⱼ₌₁ᵖ βⱼ². Ridge shrinks all coefficients toward zero proportionally, stabilizing (XᵀX + λI)⁻¹ so it is always invertible even when XᵀX is singular.',
          'Lasso Regression (L1): Adds an absolute value norm penalty: Loss_Lasso = SSE + λ Σⱼ₌₁ᵖ |βⱼ|. Because the L1 diamond constraint has sharp geometric corners on coordinate axes, Lasso drives non-essential feature coefficients exactly to zero, performing automated feature selection.'
        ],
        table: {
          caption: 'Comprehensive Comparison: OLS vs Ridge vs Lasso',
          headers: ['Property', 'OLS', 'Ridge (L2)', 'Lasso (L1)'],
          rows: [
            ['Penalty Term', 'None', 'λ Σ βⱼ²', 'λ Σ |βⱼ|'],
            ['Closed Form Solution', 'β̂ = (XᵀX)⁻¹Xᵀy', 'β̂ = (XᵀX + λI)⁻¹Xᵀy', 'No closed form (solved via Coordinate Descent)'],
            ['Sparsity (Zero Weights)', 'No', 'No (shrinks asymptotically)', 'Yes (drives weights exactly to 0)'],
            ['Multicollinearity Handling', 'Unstable / Fails', 'Highly effective & stable', 'Selects one feature, zeroes others'],
            ['Feature Selection', 'None', 'None (keeps all features)', 'Built-in automated feature selection']
          ]
        },
        callout: {
          type: 'info',
          title: 'Mandatory Feature Standardization',
          text: 'Regularization penalties treat all coefficient magnitudes identically. If Feature 1 is measured in dollars (0 to 1,000,000) and Feature 2 in age (0 to 100), Feature 1 will have tiny unpenalized weights while Feature 2 will be overly penalized. Features MUST be standardized (z-scored to mean 0, variance 1) before fitting Ridge or Lasso.'
        }
      },
      {
        id: 'sec-tuning-lambda',
        title: 'The Hyperparameter λ (Alpha)',
        content: [
          'The regularization hyperparameter λ ≥ 0 controls penalty strength.',
          'When λ = 0, Ridge and Lasso reduce exactly to unregularized Ordinary Least Squares.',
          'As λ → ∞, all feature weights are forced to zero (β → 0), leaving only the intercept (predicting the target mean ȳ). Optimal λ is tuned via cross-validation.'
        ]
      }
    ],
    keyTakeaways: [
      'Regularization trades a small amount of training bias for a substantial reduction in test variance.',
      'Ridge (L2) shrinks coefficients smoothly and solves collinearity instability.',
      'Lasso (L1) creates sparse models by setting irrelevant feature weights to exactly 0.',
      'Features must be standardized before applying regularization, and intercept β₀ is unpenalized.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l8-q1',
        question: 'Which regularization technique can drive coefficients of irrelevant features exactly to zero?',
        options: ['Ridge Regression (L2)', 'Lasso Regression (L1)', 'Ordinary Least Squares', 'Polynomial Expansion'],
        correctIndex: 1,
        explanation: 'Lasso (L1 regularization) uses the absolute value penalty whose geometry forces non-essential coefficients to exactly 0, performing automated feature selection.'
      }
    ]
  },
  {
    id: 'u5-l9',
    slug: 'regression-diagnostics',
    order: 9,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Regression Assumptions & Diagnostics',
    shortDescription: 'Audit classical regression assumptions: linearity, homoscedasticity, residual normality, and detect influential outliers.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Identify the four classical Gauss-Markov OLS assumptions: Linearity, Independence, Homoscedasticity, Normality (LINE)',
      'Construct and interpret Residual vs Fitted diagnostic plots for variance heteroscedasticity and curvature',
      'Evaluate residual normality using Q-Q plots and histograms',
      'Detect high-leverage points and influential observations using Cook’s distance conceptually'
    ],
    mainExplanation: 'For regression models to produce statistically valid hypothesis tests, unbiased confidence intervals, and reliable predictions, specific mathematical conditions known as the classical Gauss-Markov assumptions must be met. Diagnostic tools allow data scientists to inspect residuals, detect model violations, and determine necessary data transformations.',
    conceptSections: [
      {
        id: 'sec-line-assumptions',
        title: 'The Four Core LINE Assumptions',
        content: [
          '1. Linearity: The relationship between predictors and the conditional mean of the target is linear: E[Y|X] = Xβ.',
          '2. Independence: Residual errors εᵢ are uncorrelated with one another (critical in time-series and spatial data).',
          '3. Normality: Residual errors εᵢ are approximately normally distributed: ε ~ N(0, σ²I) (required for valid p-values and confidence intervals, though central limit theorem relaxes this for large n).',
          '4. Equal Variance (Homoscedasticity): The variance of residual errors Var(εᵢ|X) = σ² is constant across all predicted values.'
        ],
        table: {
          caption: 'Summary of Diagnostic Plots and Remediation Strategies',
          headers: ['Assumption', 'Diagnostic Tool', 'Violation Symptom', 'Remediation Strategy'],
          rows: [
            ['Linearity', 'Residuals vs Fitted plot', 'Parabolic or cubic curve', 'Polynomial features or log/sqrt transforms'],
            ['Homoscedasticity', 'Scale-Location / Residual plot', 'Funnel / megaphone shape', 'Log-transform target Y or Weighted Least Squares (WLS)'],
            ['Normality', 'Normal Q-Q plot / Histogram', 'Heavy tails, S-curve deviating from line', 'Box-Cox power transform or robust regression'],
            ['Independence', 'Autocorrelation plot / Durbin-Watson', 'Systematic wave / lag correlation', 'Time-series ARIMA / autoregressive modeling']
          ]
        }
      },
      {
        id: 'sec-outliers-leverage',
        title: 'Outliers, Leverage, and Influential Observations',
        content: [
          'Outlier: A data point with an unusually large vertical residual |eᵢ| (poorly predicted by the model).',
          'High Leverage Point: An observation with extreme predictor values xᵢ far from the center of mass x̄. High leverage points possess enormous potential to tilt the regression line.',
          'Influential Observation: A point that possesses both high leverage and high residual. Removing an influential point drastically alters parameter estimates β̂₀ and β̂₁ (quantified conceptually by Cook’s Distance).'
        ],
        callout: {
          type: 'warning',
          title: 'Prediction vs. Inference Assumptions',
          text: 'If your sole objective is pure out-of-sample prediction (machine learning), mild normality violations are harmless as long as test RMSE is minimized. However, if your goal is causal econometrics or scientific hypothesis testing (p-values, confidence intervals), assumption violations invalidate statistical conclusions.'
        }
      }
    ],
    keyTakeaways: [
      'The LINE assumptions govern the inferential validity of Ordinary Least Squares regression.',
      'Residuals vs Fitted plots detect curvature (nonlinearity) and funnel shapes (heteroscedasticity).',
      'Normal Q-Q plots evaluate whether residuals follow a theoretical normal Gaussian distribution.',
      'Influential observations combine high leverage with large residuals and disproportionately tilt the model.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l9-q1',
        question: 'What does a funnel/megaphone shape in a Residuals vs Fitted plot indicate?',
        options: [
          'The model is perfectly homoscedastic',
          'Heteroscedasticity (non-constant residual error variance)',
          'Multicollinearity among features',
          'Zero degrees of freedom'
        ],
        correctIndex: 1,
        explanation: 'A funnel shape indicates that the spread/variance of residuals increases or decreases systematically across fitted values, violating homoscedasticity.'
      }
    ]
  },
  {
    id: 'u5-l10',
    slug: 'regression-in-data-science',
    order: 10,
    unitId: 'unit-5' as UnitId,
    unitNumber: 5,
    title: 'Regression in Data Science',
    shortDescription: 'Synthesize regression modeling into an end-to-end data science lifecycle: data preparation, validation splits, and deployment.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Structure an end-to-end regression machine learning workflow from problem framing to deployment',
      'Implement robust train/validation/test data splits to prevent data leakage and benchmark generalization',
      'Apply regression to core commercial use cases: price elasticity, demand forecasting, lifetime value, and risk scoring',
      'Select and communicate appropriate regression models based on interpretability versus complexity tradeoffs'
    ],
    mainExplanation: 'Regression analysis is a core pillar of modern data science. From real-time dynamic pricing algorithms at ride-sharing companies to credit risk scoring at financial institutions, structured regression workflows translate raw business data into predictive, interpretable, and reproducible production systems.',
    conceptSections: [
      {
        id: 'sec-workflow-lifecycle',
        title: 'The 9-Stage End-to-End Regression Workflow',
        content: [
          '1. Target & Objective Definition: Frame the quantitative business problem and define the response variable Y.',
          '2. Data Ingestion & Cleaning: Handle missing values, filter sensor errors, and remove duplicate records.',
          '3. Exploratory Data Analysis (EDA): Inspect distributions, pairwise scatter matrices, and correlation heatmaps.',
          '4. Train/Validation/Test Split: Partition data into 70% Train, 15% Validation (for hyperparameter tuning), and 15% Test (unbiased holdout).',
          '5. Feature Engineering & Scaling: One-hot encode categoricals, generate polynomial terms, and standardize features.',
          '6. Model Training: Fit candidate models: Baseline Mean, OLS, Ridge, Lasso, and Polynomial Regression.',
          '7. Evaluation & Validation: Compute RMSE, MAE, and Adjusted R² on validation data.',
          '8. Diagnostics & Calibration: Inspect residual distributions, leverage points, and prediction error bounds.',
          '9. Deployment & Monitoring: Export model weights, serve inference API, and monitor for data drift in production.'
        ],
        table: {
          caption: 'Major Commercial Applications of Regression',
          headers: ['Domain', 'Target Variable (Y)', 'Typical Predictor Features (X)', 'Key Metric'],
          rows: [
            ['Real Estate / PropTech', 'Property Market Value ($)', 'Square footage, zip code, bedrooms, age, lot size', 'RMSE / MAPE'],
            ['E-Commerce', 'Customer Lifetime Value (LTV)', 'Recency, purchase frequency, average basket size', 'MAE'],
            ['Ride-Sharing / Logistics', 'Estimated Time of Arrival (ETA)', 'Distance, traffic density, weather, historical speed', 'RMSE (minutes)'],
            ['Energy & Utilities', 'Hourly Grid Demand (MWh)', 'Temperature, humidity, day of week, industrial shifts', 'R² / RMSE']
          ]
        }
      },
      {
        id: 'sec-interpretability-tradeoff',
        title: 'The Interpretability vs. Predictive Power Spectrum',
        content: [
          'In regulated industries like healthcare and banking lending, explainability is a legal requirement. Simple and regularized linear regression models provide explicit coefficients β that transparently explain how every single input impacts the final prediction.',
          'When pure predictive accuracy is paramount and millions of complex interactions exist, linear models serve as the essential baseline against which complex ensembles and neural networks are validated.'
        ],
        callout: {
          type: 'tip',
          title: 'Data Science Best Practice: Start Simple',
          text: 'Always build a simple linear regression baseline before training deep neural networks or gradient boosted trees. If an interpretable linear model achieves 95% of the performance of a complex black-box model, the simpler model is almost always preferable in production.'
        }
      }
    ],
    keyTakeaways: [
      'A disciplined regression pipeline requires strict train/validation/test splits to avoid data leakage.',
      'Feature scaling (standardization) is required whenever regularized models (Ridge/Lasso) are trained.',
      'RMSE and MAE quantify real-world performance in physical target units.',
      'Linear models remain the gold standard when explainability and regulatory compliance are required.'
    ],
    practiceQuestions: [
      {
        id: 'u5-l10-q1',
        question: 'Why should hyperparameter tuning (such as selecting λ in Ridge/Lasso) be performed on validation data rather than the final test set?',
        options: [
          'Because the test set does not contain target values',
          'To prevent data leakage and preserve an unbiased estimate of true generalization performance',
          'Because Ridge regression cannot run on test data',
          'Because validation data contains fewer outliers'
        ],
        correctIndex: 1,
        explanation: 'Tuning hyperparameters on the test set leads to optimistic bias and overfitting to the test data. The test set must remain untouched until final evaluation.'
      }
    ]
  }
];
