import { UnitId } from '@/types';
import { FullLessonData } from '@/data/unit1/lessons';

export const UNIT_6_LESSONS: FullLessonData[] = [
  {
    id: 'u6-l1',
    slug: 'classification-fundamentals',
    order: 1,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Classification Fundamentals',
    shortDescription: 'Discover the foundations of supervised classification: predicting categorical labels from structured feature matrices.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Understand the supervised classification problem formulation: feature matrix X and discrete target vector y',
      'Distinguish classification (discrete categorical targets) from regression (continuous numerical targets)',
      'Understand binary classification {0, 1} vs. multiclass classification {1, 2, ..., K}',
      'Recognize key challenges including class imbalance, overlapping distributions, and decision thresholds'
    ],
    mainExplanation: 'Classification is the core supervised machine learning paradigm where an algorithm learns a mapping function from input feature vectors X ∈ ℝᵈ to discrete category labels y ∈ {C₁, C₂, ..., Cₖ}. Unlike regression, which predicts quantitative values along a continuum, classification partitions the feature space into distinct decision regions separated by decision boundaries.',
    conceptSections: [
      {
        id: 'sec-clf-formulation',
        title: 'Mathematical Formulation of Classification',
        content: [
          'Given a training dataset D = {(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)}, where each xᵢ is a d-dimensional feature vector and yᵢ is a discrete class label, the classification objective is to estimate a decision function f: ℝᵈ → {0, 1} (in binary classification) or f: ℝᵈ → {1, 2, ..., K} (in multiclass settings).',
          'Most modern probabilistic classifiers first estimate the posterior class probability P(Y = 1 | X = x), and then assign the observation to class 1 if P(Y = 1 | X = x) ≥ τ, where τ is a chosen decision threshold (typically 0.5).'
        ],
        table: {
          caption: 'Classification vs. Regression Comparison',
          headers: ['Dimension', 'Classification', 'Regression'],
          rows: [
            ['Target Space Y', 'Discrete categorical labels (e.g. {Spam, Ham}, {Class A, B, C})', 'Continuous real numbers Y ∈ ℝ (e.g. Price, Temperature)'],
            ['Decision Output', 'Class label ŷ ∈ {0, 1} or posterior probability P(Y=1|X)', 'Numerical quantity ŷ ∈ ℝ'],
            ['Loss Function', 'Cross-Entropy / Log Loss, 0-1 Loss, Hinge Loss', 'Mean Squared Error (MSE), Mean Absolute Error (MAE)'],
            ['Primary Evaluation', 'Accuracy, Precision, Recall, F1-Score, ROC-AUC', 'RMSE, MAE, R², Adjusted R²'],
            ['Geometry', 'Partitions feature space into decision regions via boundaries', 'Fits a continuous hypersurface / trend line through data']
          ]
        },
        callout: {
          type: 'info',
          title: 'Classification is Supervised, Not Clustering',
          text: 'Classification requires ground-truth target labels y during training (supervised learning). In contrast, clustering algorithms (like k-means or DBSCAN) discover latent groupings without any label guidance (unsupervised learning).'
        }
      },
      {
        id: 'sec-clf-worked',
        title: 'Real-World Classification Applications',
        content: [
          'Classification powers critical data science systems across industries: spam detection in email clients, fraud detection in financial transactions, disease diagnosis from medical biomarkers, customer churn prediction in SaaS platforms, and optical character recognition in computer vision.',
          'When evaluating classification systems, domain consequences govern model choice: in medical screening, a False Negative (missing a malignant tumor) is far more dangerous than a False Positive.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Binary Classification Setup in Scikit-Learn',
          code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Generate synthetic binary classification dataset
X, y = make_classification(
    n_samples=1000, 
    n_features=5, 
    n_classes=2, 
    weights=[0.85, 0.15], # 15% positive class imbalance
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Training samples: {X_train.shape[0]}, Imbalance ratio: {np.mean(y_train):.2%}")`
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-decision-func',
        title: 'Thresholded Decision Function',
        formula: '\\hat{y} = \\mathbb{I}\\left( P(Y = 1 \\mid \\mathbf{x}) \\ge \\tau \\right) = \\begin{cases} 1 & \\text{if } P(Y = 1 \\mid \\mathbf{x}) \\ge \\tau \\\\ 0 & \\text{otherwise} \\end{cases}',
        explanation: 'Converts a continuous posterior probability estimate into a discrete class decision based on decision threshold τ (default τ = 0.5).',
        variables: [
          { symbol: 'P(Y=1|\\mathbf{x})', description: 'Posterior probability that instance x belongs to the positive class' },
          { symbol: '\\tau', description: 'Decision threshold governing precision vs. recall sensitivity' },
          { symbol: '\\hat{y}', description: 'Predicted binary class label in {0, 1}' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-clf-1',
        title: 'Classifying Patient Risk from Blood Pressure and Cholesterol',
        description: 'Given two clinical biomarkers x₁ (systolic BP) and x₂ (cholesterol), evaluate whether a patient with P(Y=HighRisk|x) = 0.62 is classified as High Risk under thresholds τ = 0.5 and τ = 0.7.',
        steps: [
          {
            stepNumber: 1,
            description: 'Evaluate under standard default threshold τ = 0.5',
            formula: 'P(Y=1|\\mathbf{x}) = 0.62 \\ge 0.50 \\implies \\hat{y} = 1 \\text{ (High Risk)}'
          },
          {
            stepNumber: 2,
            description: 'Evaluate under conservative high-specificity threshold τ = 0.70',
            formula: 'P(Y=1|\\mathbf{x}) = 0.62 < 0.70 \\implies \\hat{y} = 0 \\text{ (Standard Risk)}'
          },
          {
            stepNumber: 3,
            description: 'Conclusion',
            formula: '\\text{Threshold choice changes operational behavior without altering underlying model probabilities.}'
          }
        ]
      }
    ],
    keyTakeaways: [
      'Classification maps feature vectors to discrete categorical labels.',
      'Binary classification involves two classes y ∈ {0, 1}; multiclass extends to K > 2 categories.',
      'Probabilistic classifiers output continuous probability estimates P(Y=1|X) which are converted to class labels via a threshold τ.',
      'The optimal decision threshold depends on asymmetric misclassification costs in the problem domain.'
    ],
    interactiveSection: {
      componentName: 'ClassificationBoundaryExplorer',
      description: 'Explore how 2D data points from two distinct classes are partitioned by adjustable decision regions and decision boundaries.'
    }
  },
  {
    id: 'u6-l2',
    slug: 'logistic-regression',
    order: 2,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Logistic Regression',
    shortDescription: 'Formulate the sigmoid activation, log-odds, binary cross-entropy loss, and gradient descent optimization for logistic models.',
    estimatedDuration: 20,
    contentType: 'derivation',
    learningObjectives: [
      'Understand why linear regression fails for bounded probability estimation',
      'Derive the sigmoid (logistic) link function σ(z) = 1 / (1 + e⁻ᶻ) and log-odds formulation',
      'Formulate the Binary Cross-Entropy (Log Loss) objective function',
      'Derive the gradient ∇L = (1/n) Xᵀ(p - y) and understand batch gradient descent parameter updates'
    ],
    mainExplanation: 'Logistic Regression is the foundational linear classification model. Instead of directly predicting an unbounded target Y as in linear regression, logistic regression models the log-odds (logit) of the positive class as a linear combination of features, passing the result through the sigmoid function to guarantee outputs strictly within the probability interval (0, 1).',
    conceptSections: [
      {
        id: 'sec-logistic-sigmoid',
        title: 'The Sigmoid Link Function & Log-Odds',
        content: [
          'Linear regression ŷ = β₀ + βᵀx produces values across (-∞, +∞), violating the fundamental probability axiom that probabilities must satisfy 0 ≤ P ≤ 1.',
          'To map any real-valued score z = β₀ + β₁x₁ + ... + βₚxₚ into a valid probability p ∈ (0, 1), we apply the sigmoid function: σ(z) = 1 / (1 + e⁻ᶻ).',
          'Inverting the sigmoid reveals that the log-odds (logit) is strictly linear in the parameters: ln(p / (1 - p)) = β₀ + β₁x₁ + ... + βₚxₚ.'
        ],
        callout: {
          type: 'info',
          title: 'Interpreting Odds Ratios',
          text: 'When feature xⱼ increases by 1 unit (holding all other features constant), the odds p/(1-p) multiply by e^(βⱼ). If βⱼ > 0, increasing xⱼ increases the probability of class 1; if βⱼ < 0, it decreases it.'
        }
      },
      {
        id: 'sec-logistic-loss',
        title: 'Binary Cross-Entropy (Log Loss) & Optimization',
        content: [
          'Using Mean Squared Error (MSE) with a sigmoid output creates a non-convex loss surface riddled with local minima. Instead, Maximum Likelihood Estimation (MLE) yields the convex Binary Cross-Entropy (Log Loss):',
          'L(β) = -1/n * Σ [ yᵢ * ln(pᵢ) + (1 - yᵢ) * ln(1 - pᵢ) ].',
          'When the model predicts pᵢ ≈ 1 for an actual positive yᵢ = 1, the loss contribution -ln(1) = 0. When it confidently and wrongly predicts pᵢ ≈ 0 for yᵢ = 1, the loss -ln(pᵢ) → +∞, severely penalizing high-confidence errors.',
          'Taking the derivative with respect to β yields the elegant gradient: ∇L = (1/n) * Xᵀ(p - y), which enables robust optimization via Batch Gradient Descent: β ← β - α ∇L.'
        ]
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-sigmoid',
        title: 'Sigmoid Probability Function',
        formula: 'P(Y = 1 \\mid \\mathbf{x}) = \\sigma(\\mathbf{x}^T \\boldsymbol{\\beta}) = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p)}}',
        explanation: 'Maps the linear score z = xᵀβ smoothly into the bounded probability range (0, 1).',
        variables: [
          { symbol: '\\sigma(z)', description: 'Sigmoid activation function 1 / (1 + e^-z)' },
          { symbol: '\\boldsymbol{\\beta}', description: 'Parameter weight vector including intercept β₀' },
          { symbol: '\\mathbf{x}', description: 'Input feature vector' }
        ]
      },
      {
        id: 'fb-log-loss',
        title: 'Binary Cross-Entropy Loss',
        formula: 'L(\\boldsymbol{\\beta}) = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]',
        explanation: 'Measures the divergence between true binary labels yᵢ ∈ {0, 1} and predicted probabilities pᵢ ∈ (0, 1).',
        variables: [
          { symbol: 'y_i', description: 'True binary ground-truth label (0 or 1)' },
          { symbol: 'p_i', description: 'Predicted model probability σ(xᵢᵀβ)' },
          { symbol: 'n', description: 'Total number of training observations' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-logistic-1',
        title: 'Calculating Predicted Probability and Loss for a Single Observation',
        description: 'For an observation with x = [2.0], weights β₁ = 0.8, intercept β₀ = -0.6, and true label y = 1, compute z, p, and the log loss contribution.',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute linear logit score z',
            formula: 'z = \\beta_0 + \\beta_1 x = -0.6 + 0.8(2.0) = -0.6 + 1.6 = 1.0'
          },
          {
            stepNumber: 2,
            description: 'Apply sigmoid function to compute probability p',
            formula: 'p = \\sigma(1.0) = \\frac{1}{1 + e^{-1.0}} = \\frac{1}{1 + 0.3679} \\approx 0.7311'
          },
          {
            stepNumber: 3,
            description: 'Compute individual Binary Cross-Entropy loss for y = 1',
            formula: 'L_i = -\\ln(0.7311) = -(-0.3132) \\approx 0.3132'
          }
        ]
      }
    ],
    keyTakeaways: [
      'Logistic regression maps linear combinations of features to valid probabilities via the sigmoid function σ(z).',
      'The logit ln(p/(1-p)) is a linear function of the input features.',
      'Binary Cross-Entropy (Log Loss) provides a convex optimization surface that heavily penalizes confident incorrect predictions.',
      'Model parameters are optimized iteratively via gradient descent using the gradient ∇L = (1/n) Xᵀ(p - y).'
    ],
    interactiveSection: {
      componentName: 'LogisticRegressionExplorer',
      description: 'Interact with the sigmoid curve, adjust the decision threshold, and observe real-time changes to predicted classes and log loss.'
    }
  },
  {
    id: 'u6-l3',
    slug: 'decision-boundaries',
    order: 3,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Decision Boundaries',
    shortDescription: 'Analyze how linear and nonlinear classifiers partition feature space into distinct decision regions.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Define a decision boundary as the geometric locus where posterior class probabilities are equal (e.g. P = 0.5)',
      'Derive the linear decision boundary equation β₀ + β₁x₁ + β₂x₂ = 0 in 2D feature space',
      'Understand how adjusting the decision threshold τ translates the decision boundary',
      'Differentiate linearly separable data from non-linearly separable distributions'
    ],
    mainExplanation: 'A decision boundary is a geometric hypersurface in d-dimensional feature space that separates different class predictions. In binary logistic regression with default threshold τ = 0.5, the decision boundary is the hyperplane defined by the condition z = xᵀβ = 0, where P(Y = 1 | x) = 0.5.',
    conceptSections: [
      {
        id: 'sec-db-geometry',
        title: 'Geometry of Linear Decision Boundaries',
        content: [
          'In a 2D feature space with inputs (x₁, x₂), the logistic regression model predicts class 1 whenever σ(β₀ + β₁x₁ + β₂x₂) ≥ 0.5, which is equivalent to β₀ + β₁x₁ + β₂x₂ ≥ 0.',
          'Setting this expression to zero defines a straight line in the (x₁, x₂) coordinate plane: x₂ = -(β₁/β₂) x₁ - (β₀/β₂).',
          'Observations on one side of this line have P(Y=1|x) > 0.5 (classified as 1), while points on the other side have P(Y=1|x) < 0.5 (classified as 0).'
        ],
        table: {
          caption: 'Effect of Logistic Model Parameters on the 2D Boundary',
          headers: ['Parameter Component', 'Geometric Impact on Decision Line', 'Formula Representation'],
          rows: [
            ['Slope of Line', 'Ratio of feature weights', 'm = -\\beta_1 / \\beta_2'],
            ['Intercept of Line', 'Determined by baseline bias β₀', 'b = -\\beta_0 / \\beta_2'],
            ['Threshold Change (τ ≠ 0.5)', 'Parallel shift of the decision line', '\\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 = \\text{logit}(\\tau)']
          ]
        },
        callout: {
          type: 'tip',
          title: 'Threshold Shift as Boundary Translation',
          text: 'Changing the decision threshold from τ = 0.5 to τ = 0.8 shifts the decision line parallel to itself into the region of class 1, requiring stronger evidence to trigger a positive classification.'
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-db-line',
        title: '2D Linear Decision Boundary Equation',
        formula: 'x_2 = -\\frac{\\beta_1}{\\beta_2} x_1 - \\frac{\\beta_0 - \\text{logit}(\\tau)}{\\beta_2}',
        explanation: 'Explicit slope-intercept equation of the 2D decision boundary line at probability threshold τ.',
        variables: [
          { symbol: 'x_1, x_2', description: 'Feature coordinate axes in 2D space' },
          { symbol: '\\beta_0, \\beta_1, \\beta_2', description: 'Fitted logistic regression coefficients' },
          { symbol: '\\text{logit}(\\tau)', description: 'Log-odds of threshold τ; equals 0 when τ = 0.5' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-db-1',
        title: 'Plotting a 2D Decision Boundary',
        description: 'Given fitted weights β₀ = -4, β₁ = 1.0, β₂ = 0.5, find the boundary equation at threshold τ = 0.5 and determine the classification of query point (3, 4).',
        steps: [
          {
            stepNumber: 1,
            description: 'Set z = 0 for default threshold τ = 0.5',
            formula: '-4 + 1.0 x_1 + 0.5 x_2 = 0 \\implies 0.5 x_2 = 4 - 1.0 x_1 \\implies x_2 = 8 - 2 x_1'
          },
          {
            stepNumber: 2,
            description: 'Evaluate score at point (3, 4)',
            formula: 'z = -4 + 1.0(3) + 0.5(4) = -4 + 3 + 2 = +1.0'
          },
          {
            stepNumber: 3,
            description: 'Compute probability and classification',
            formula: 'P = \\sigma(1.0) \\approx 0.7311 \\ge 0.5 \\implies \\text{Class 1}'
          }
        ]
      }
    ],
    keyTakeaways: [
      'A decision boundary is the surface where competing class probabilities are equal.',
      'Linear classifiers produce linear hyperplanes in feature space.',
      'Changing the decision threshold τ translates the decision boundary parallel to the original plane.',
      'Nonlinear boundaries require feature transformations, kernel methods, or non-parametric algorithms like KNN and decision trees.'
    ],
    interactiveSection: {
      componentName: 'ClassificationBoundaryExplorer',
      description: 'Manipulate model weights and threshold to inspect how the decision boundary moves across 2D class distributions.'
    }
  },
  {
    id: 'u6-l4',
    slug: 'knn',
    order: 4,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'k-Nearest Neighbors',
    shortDescription: 'Master instance-based non-parametric classification using Euclidean distance, voting rules, and feature scaling.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Understand the non-parametric, instance-based nature of k-Nearest Neighbors (KNN)',
      'Calculate Euclidean distance between d-dimensional feature vectors',
      'Analyze the bias-variance tradeoff across small k (low bias, high variance) vs. large k (high bias, low variance)',
      'Explain why feature scaling (standardization) is mandatory for distance-based algorithms'
    ],
    mainExplanation: 'k-Nearest Neighbors (KNN) is an intuitive non-parametric, lazy learning algorithm that classifies new query instances based on the majority vote of their k closest neighbors in Euclidean feature space. KNN makes no prior assumptions about the underlying distribution, allowing it to capture intricate, highly non-linear decision boundaries.',
    conceptSections: [
      {
        id: 'sec-knn-algo',
        title: 'The KNN Classification Algorithm',
        content: [
          'Given training points (x₁, y₁), ..., (xₙ, yₙ) and a new query point x_q:',
          '1. Compute the distance d(xᵢ, x_q) from x_q to every training observation xᵢ using Euclidean distance: d(x, z) = √(Σ (xⱼ - zⱼ)²).',
          '2. Sort the training instances in ascending order of distance and select the top k neighbors.',
          '3. Compute the fraction of neighbors belonging to each class: P(Y = c | x_q) = (1/k) * Σ 𝕀(yᵢ = c).',
          '4. Assign x_q to the class with the highest vote share (breaking exact ties deterministically).'
        ],
        callout: {
          type: 'warning',
          title: 'Sensitivity to Feature Scale',
          text: 'If one feature ranges from 0 to 100,000 (e.g. Income) and another ranges from 0 to 1 (e.g. Debt Ratio), Euclidean distance will be completely dominated by the high-magnitude feature. Features MUST be standardized before running KNN.'
        }
      },
      {
        id: 'sec-knn-k-choice',
        title: 'Selecting the Hyperparameter k',
        content: [
          'When k = 1, the model creates complex, highly flexible decision boundaries that hug individual training points, leading to zero training error but high risk of overfitting (high variance).',
          'As k increases, decision boundaries smooth out. If k = n, every query point is assigned to the global majority class, leading to extreme underfitting (high bias).',
          'In practice, k is tuned using k-fold cross-validation, and odd values of k are commonly chosen in binary classification to reduce voting ties.'
        ]
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-euclidean-dist',
        title: 'Euclidean Distance in d Dimensions',
        formula: 'd(\\mathbf{u}, \\mathbf{v}) = \\sqrt{\\sum_{j=1}^d (u_j - v_j)^2} = \\|\\mathbf{u} - \\mathbf{v}\\|_2',
        explanation: 'Standard L2 distance metric measuring geometric separation between two feature vectors.',
        variables: [
          { symbol: '\\mathbf{u}, \\mathbf{v}', description: 'Feature vectors in d-dimensional space' },
          { symbol: 'd', description: 'Number of feature dimensions' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-knn-1',
        title: 'Classifying a Query Point with 3-NN',
        description: 'Given training points A(1, 2)[Class 0], B(2, 3)[Class 0], C(6, 6)[Class 1], D(7, 8)[Class 1], classify query point Q(2, 2) using k = 3.',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute squared distances to query Q(2, 2)',
            formula: 'd^2(A, Q) = (1-2)^2 + (2-2)^2 = 1 \\implies d = 1.0'
          },
          {
            stepNumber: 2,
            description: 'Compute distances for remaining points',
            formula: 'd(B, Q) = \\sqrt{0^2 + 1^2} = 1.0; \\quad d(C, Q) = \\sqrt{4^2 + 4^2} = \\sqrt{32} \\approx 5.66; \\quad d(D, Q) = \\sqrt{5^2 + 6^2} = \\sqrt{61} \\approx 7.81'
          },
          {
            stepNumber: 3,
            description: 'Select 3 nearest neighbors and tally votes',
            formula: '\\text{Top 3 neighbors: } A (0), B (0), C (1) \\implies \\text{Votes: Class 0: 2/3 (67\\%), Class 1: 1/3 (33\\%)} \\implies \\hat{y} = 0'
          }
        ]
      }
    ],
    keyTakeaways: [
      'KNN is an instance-based lazy learner that stores the training dataset and computes distances on query.',
      'Small k produces flexible decision boundaries with high variance; large k produces smooth boundaries with high bias.',
      'Feature standardization is mandatory to prevent large-magnitude features from dominating distance calculations.',
      'Computational cost scales with dataset size n during inference, motivating index structures like KD-Trees in large-scale applications.'
    ],
    interactiveSection: {
      componentName: 'KNNExplorer',
      description: 'Move query points around the 2D feature plane, adjust k, and visualize nearest neighbors, distance radii, and class votes.'
    }
  },
  {
    id: 'u6-l5',
    slug: 'decision-trees',
    order: 5,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Decision Trees',
    shortDescription: 'Explore recursive binary partitioning, Gini impurity, Shannon entropy, and information gain for tree-based classification.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Understand recursive binary splitting and tree structure: root, internal nodes, branches, and leaf nodes',
      'Calculate Gini Impurity G = 1 - Σ pₖ² and Shannon Entropy H = -Σ pₖ log₂(pₖ)',
      'Compute Information Gain for candidate feature thresholds',
      'Analyze the tradeoff between tree depth, interpretability, and overfitting'
    ],
    mainExplanation: 'Decision Trees perform classification by recursively partitioning the feature space into axis-aligned rectangular regions. At each node, the tree evaluates candidate feature thresholds and executes the split that yields the largest reduction in node impurity (maximum Information Gain), producing a highly interpretable hierarchical decision structure.',
    conceptSections: [
      {
        id: 'sec-tree-impurity',
        title: 'Node Impurity Measures: Gini vs. Entropy',
        content: [
          'A leaf node is "pure" if all samples in it belong to a single class (Impurity = 0). When classes are evenly mixed, impurity reaches its maximum.',
          'Gini Impurity measures the probability that a randomly chosen element is misclassified if labeled randomly according to the class distribution: G = 1 - Σ pₖ².',
          'Shannon Entropy measures the information-theoretic uncertainty in the node: H = -Σ pₖ log₂(pₖ).',
          'Both metrics produce very similar split decisions in practice, with Gini being slightly faster to compute due to avoiding logarithmic operations.'
        ],
        table: {
          caption: 'Impurity Metrics for Binary Node Distributions [p, 1-p]',
          headers: ['Class Distribution (p, 1-p)', 'Gini Impurity (1 - p² - (1-p)²)', 'Entropy (-p log₂ p - (1-p) log₂(1-p))', 'Interpretation'],
          rows: [
            ['(1.0, 0.0)', '0.000', '0.000 bits', 'Completely Pure Node'],
            ['(0.9, 0.1)', '0.180', '0.469 bits', 'High Purity / Low Uncertainty'],
            ['(0.7, 0.3)', '0.420', '0.881 bits', 'Moderate Mixing'],
            ['(0.5, 0.5)', '0.500', '1.000 bits', 'Maximum Impurity / Pure Randomness']
          ]
        }
      },
      {
        id: 'sec-tree-depth',
        title: 'Tree Depth & Overfitting',
        content: [
          'Unconstrained decision trees grow until every leaf is pure or contains fewer samples than a threshold. This achieves 100% training accuracy but memorizes noise, leading to catastrophic overfitting.',
          'Regularization techniques for decision trees include limiting maximum tree depth (max_depth), requiring a minimum number of samples to split (min_samples_split), and post-pruning.'
        ]
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-gini',
        title: 'Gini Impurity',
        formula: 'G = 1 - \\sum_{k=1}^K p_k^2',
        explanation: 'Quantifies node heterogeneity; equals 0 for a pure node and 0.5 for an equal binary mixture.',
        variables: [
          { symbol: 'p_k', description: 'Proportion of samples in the node belonging to class k' },
          { symbol: 'K', description: 'Total number of target classes' }
        ]
      },
      {
        id: 'fb-info-gain',
        title: 'Information Gain',
        formula: 'IG(D, A) = I(D) - \\left( \\frac{|D_L|}{|D|} I(D_L) + \\frac{|D_R|}{|D|} I(D_R) \\right)',
        explanation: 'Reduction in impurity achieved by splitting dataset D into left child D_L and right child D_R on attribute A.',
        variables: [
          { symbol: 'I(D)', description: 'Impurity (Gini or Entropy) of the parent node' },
          { symbol: '|D_L|, |D_R|', description: 'Sample sizes of the resulting child nodes' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-tree-1',
        title: 'Computing Information Gain for a Candidate Split',
        description: 'A parent node has 10 samples (6 Class 0, 4 Class 1). A candidate split produces Left Node (5 Class 0, 0 Class 1) and Right Node (1 Class 0, 4 Class 1). Compute the Gini Information Gain.',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute Parent Gini Impurity',
            formula: 'G(Parent) = 1 - \\left( (6/10)^2 + (4/10)^2 \\right) = 1 - (0.36 + 0.16) = 1 - 0.52 = 0.48'
          },
          {
            stepNumber: 2,
            description: 'Compute Child Impurities',
            formula: 'G(Left) = 1 - (1.0^2 + 0.0^2) = 0.0; \\quad G(Right) = 1 - \\left( (1/5)^2 + (4/5)^2 \\right) = 1 - (0.04 + 0.64) = 0.32'
          },
          {
            stepNumber: 3,
            description: 'Compute Weighted Information Gain',
            formula: 'IG = 0.48 - \\left( \\frac{5}{10}(0.0) + \\frac{5}{10}(0.32) \\right) = 0.48 - 0.16 = 0.32'
          }
        ]
      }
    ],
    keyTakeaways: [
      'Decision trees partition feature space via axis-aligned splits that maximize Information Gain.',
      'Gini Impurity (1 - Σ pₖ²) and Shannon Entropy (-Σ pₖ log₂ pₖ) measure node class homogeneity.',
      'Decision trees are non-parametric and invariant to monotonic feature transformations and scale.',
      'Constraining tree depth and minimum sample sizes is essential to avoid overfitting.'
    ],
    interactiveSection: {
      componentName: 'DecisionTreeExplorer',
      description: 'Interact with an educational decision tree, adjust split thresholds, and inspect real-time Gini impurities and tree node structures.'
    }
  },
  {
    id: 'u6-l6',
    slug: 'ensemble-methods',
    order: 6,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Ensemble Methods',
    shortDescription: 'Understand variance and bias reduction through Bagging, Random Forests, and sequential Boosting algorithms.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Understand the core ensemble principle: combining multiple weak learners into a high-performing strong model',
      'Explain Bagging (Bootstrap Aggregation) and how averaging reduces model variance',
      'Explain Random Forests: bagging combined with random feature subspace sampling',
      'Explain Boosting conceptually: sequential re-weighting of training errors to reduce model bias'
    ],
    mainExplanation: 'Ensemble methods combine predictions from multiple individual base models (weak learners) to produce a unified model with superior predictive accuracy and robustness. The two primary ensemble paradigms are Bagging (which trains models in parallel to reduce variance) and Boosting (which trains models sequentially to reduce bias).',
    conceptSections: [
      {
        id: 'sec-bagging-rf',
        title: 'Bagging & Random Forests',
        content: [
          'Bootstrap Aggregation (Bagging) generates B bootstrap datasets by sampling the training data with replacement. An independent deep decision tree is fitted to each sample, and final predictions are obtained via majority voting.',
          'Random Forests improve upon standard bagging by introducing feature randomization: at each split, only a random subset of m = √p features is considered. This de-correlates the individual trees, drastically reducing the ensemble variance.'
        ],
        table: {
          caption: 'Ensemble Paradigms Comparison',
          headers: ['Feature', 'Random Forest (Bagging)', 'Gradient Boosting (Boosting)'],
          rows: [
            ['Training Mechanism', 'Parallel / Independent trees', 'Sequential / Additive stagewise'],
            ['Primary Objective', 'Variance reduction (stabilizes deep trees)', 'Bias reduction (strengthens shallow trees)'],
            ['Tree Structure', 'Deep, fully-grown, unpruned trees', 'Shallow trees (stumps / depth 3-6)'],
            ['Out-of-the-Box Robustness', 'Extremely robust to hyperparameter tuning', 'Requires careful tuning of learning rate & depth']
          ]
        }
      },
      {
        id: 'sec-boosting-concept',
        title: 'Boosting: Sequential Error Correction',
        content: [
          'Unlike Bagging, Boosting builds trees sequentially. Each new tree focuses specifically on the instances that preceding trees misclassified or predicted with high residual error.',
          'In Gradient Boosting, each successive tree is fitted to the negative gradient (pseudo-residuals) of the loss function, steadily reducing systematic error without requiring deep individual trees.'
        ],
        callout: {
          type: 'tip',
          title: 'The Wisdom of Crowds in Machine Learning',
          text: 'Ensembles succeed when base learners are both accurate (better than random guessing) and diverse (their individual errors are uncorrelated). Averaging uncorrelated errors cancels noise while reinforcing genuine statistical signal.'
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-ensemble-vote',
        title: 'Ensemble Majority Voting Rule',
        formula: '\\hat{y}_{\\text{ensemble}} = \\text{mode}\\left( f_1(\\mathbf{x}), f_2(\\mathbf{x}), \\dots, f_B(\\mathbf{x}) \\right) = \\arg\\max_c \\sum_{b=1}^B \\mathbb{I}(f_b(\\mathbf{x}) = c)',
        explanation: 'Aggregates discrete class predictions across B independent base classifiers.',
        variables: [
          { symbol: 'f_b(\\mathbf{x})', description: 'Prediction of the b-th individual base model' },
          { symbol: 'B', description: 'Total number of trees in the ensemble' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-ens-1',
        title: 'Error Reduction via Independent Classifiers',
        description: 'Suppose 5 independent base classifiers each have an error rate of ε = 0.30. What is the probability that a majority vote (at least 3 wrong) misclassifies the instance?',
        steps: [
          {
            stepNumber: 1,
            description: 'Apply binomial probability for 3, 4, or 5 failures',
            formula: 'P(\\text{fail}) = \\binom{5}{3}(0.3)^3(0.7)^2 + \\binom{5}{4}(0.3)^4(0.7)^1 + \\binom{5}{5}(0.3)^5(0.7)^0'
          },
          {
            stepNumber: 2,
            description: 'Compute individual term probabilities',
            formula: '10(0.027)(0.49) + 5(0.0081)(0.7) + 1(0.00243) = 0.1323 + 0.02835 + 0.00243 = 0.1631'
          },
          {
            stepNumber: 3,
            description: 'Conclusion',
            formula: '\\text{Ensemble error is 16.3\\%, almost half the individual 30\\% error rate.}'
          }
        ]
      }
    ],
    keyTakeaways: [
      'Ensemble methods combine multiple models to achieve superior predictive accuracy and stability.',
      'Bagging (Random Forest) trains diverse models in parallel on bootstrap samples to reduce variance.',
      'Boosting trains shallow models sequentially on residual errors to reduce bias.',
      'De-correlating trees via random feature subsampling is the mathematical key to Random Forest performance.'
    ],
    interactiveSection: {
      componentName: 'ClassificationBoundaryExplorer',
      description: 'Compare linear decision boundaries against complex ensemble partition regions.'
    }
  },
  {
    id: 'u6-l7',
    slug: 'model-evaluation',
    order: 7,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Classification Model Evaluation',
    shortDescription: 'Master the confusion matrix, Accuracy, Precision, Recall, Specificity, F1-Score, and ROC-AUC curves.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Construct and interpret the 2×2 Confusion Matrix (TP, TN, FP, FN)',
      'Calculate Accuracy, Precision, Recall, Specificity, and the harmonic mean F1-Score',
      'Explain the Accuracy Paradox in imbalanced classification datasets',
      'Interpret Receiver Operating Characteristic (ROC) curves and the Area Under the Curve (AUC)'
    ],
    mainExplanation: 'Classification model evaluation requires metric selection tailored to the distribution of class labels and domain misclassification costs. In real-world data science, overall accuracy is frequently misleading due to class imbalance, demanding precise analysis of Precision, Recall, F1-Score, and ROC-AUC curves.',
    conceptSections: [
      {
        id: 'sec-confusion-matrix',
        title: 'The Confusion Matrix & Core Metrics',
        content: [
          'For binary classification, predictions and true labels form four fundamental outcome quadrants: True Positives (TP), True Negatives (TN), False Positives (FP / Type I Error), and False Negatives (FN / Type II Error).',
          'Precision measures the purity of positive alarms: Precision = TP / (TP + FP).',
          'Recall (Sensitivity / True Positive Rate) measures how many actual positive cases were caught: Recall = TP / (TP + FN).',
          'Specificity (True Negative Rate) measures how many actual negative cases were correctly identified: Specificity = TN / (TN + FP).',
          'F1-Score is the harmonic mean of Precision and Recall: F1 = 2 * (Precision * Recall) / (Precision + Recall).'
        ],
        table: {
          caption: 'Binary Classification Evaluation Metrics Summary',
          headers: ['Metric', 'Mathematical Formula', 'Key Data Science Interpretation'],
          rows: [
            ['Accuracy', '(TP + TN) / (TP + TN + FP + FN)', 'Fraction of all predictions that were correct (misleading under imbalance)'],
            ['Precision', 'TP / (TP + FP)', 'When the model predicts Positive, how often is it right?'],
            ['Recall / TPR', 'TP / (TP + FN)', 'Out of all actual Positives, how many did the model catch?'],
            ['Specificity / TNR', 'TN / (TN + FP)', 'Out of all actual Negatives, how many were correctly ruled out?'],
            ['F1-Score', '2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}', 'Harmonic balance between Precision and Recall; robust to imbalance']
          ]
        },
        callout: {
          type: 'warning',
          title: 'The Accuracy Paradox',
          text: 'If 99% of transactions are legitimate and 1% are fraudulent, a naive classifier that predicts "Legitimate" for every transaction achieves 99% accuracy while having a Recall of 0% on fraud. Never evaluate imbalanced models on accuracy alone.'
        }
      },
      {
        id: 'sec-roc-auc',
        title: 'ROC Curves & Area Under the Curve (AUC)',
        content: [
          'The Receiver Operating Characteristic (ROC) curve plots True Positive Rate (Recall) on the y-axis against False Positive Rate (1 - Specificity) on the x-axis across every possible decision threshold τ ∈ [0, 1].',
          'The Area Under the ROC Curve (AUC) measures the probability that the classifier will rank a randomly chosen positive instance higher than a randomly chosen negative instance. AUC = 0.5 represents random guessing, while AUC = 1.0 represents perfect discrimination.'
        ]
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-f1-harmonic',
        title: 'F1-Score (Harmonic Mean)',
        formula: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\cdot \\text{TP}}{2 \\cdot \\text{TP} + \\text{FP} + \\text{FN}}',
        explanation: 'Harmonic mean severely penalizes extreme disparities between Precision and Recall.',
        variables: [
          { symbol: '\\text{TP}', description: 'True Positives' },
          { symbol: '\\text{FP}', description: 'False Positives (Type I Error)' },
          { symbol: '\\text{FN}', description: 'False Negatives (Type II Error)' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-cm-1',
        title: 'Evaluating a Medical Diagnostic Test',
        description: 'A test for a rare disease evaluated on 1000 patients yields: TP = 40, FN = 10, FP = 50, TN = 900. Compute Accuracy, Precision, Recall, and F1-Score.',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute Accuracy',
            formula: '\\text{Accuracy} = \\frac{40 + 900}{1000} = \\frac{940}{1000} = 94.0\\%'
          },
          {
            stepNumber: 2,
            description: 'Compute Precision and Recall',
            formula: '\\text{Precision} = \\frac{40}{40 + 50} = \\frac{40}{90} \\approx 44.4\\%; \\quad \\text{Recall} = \\frac{40}{40 + 10} = \\frac{40}{50} = 80.0\\%'
          },
          {
            stepNumber: 3,
            description: 'Compute F1-Score',
            formula: 'F_1 = 2 \\cdot \\frac{0.4444 \\cdot 0.8000}{0.4444 + 0.8000} = 2 \\cdot \\frac{0.3555}{1.2444} \\approx 57.14\\%'
          }
        ]
      }
    ],
    keyTakeaways: [
      'The Confusion Matrix organizes predictions into TP, TN, FP, and FN.',
      'Precision evaluates positive predictive value; Recall evaluates sensitivity / coverage.',
      'The F1-Score provides a balanced harmonic mean especially critical on imbalanced datasets.',
      'ROC-AUC evaluates threshold-independent ranking ability across all operating points.'
    ],
    interactiveSection: {
      componentName: 'ConfusionMatrixExplorer',
      description: 'Adjust the classification threshold in real time to observe the direct trade-off between Precision, Recall, and Confusion Matrix cell counts.'
    }
  },
  {
    id: 'u6-l8',
    slug: 'cross-validation',
    order: 8,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Cross-Validation & Hyperparameter Tuning',
    shortDescription: 'Implement k-Fold Cross-Validation, train/validation/test splits, and systematic hyperparameter optimization without data leakage.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Differentiate training set, validation set, and holdout test set roles',
      'Understand k-Fold and Stratified k-Fold Cross-Validation workflows',
      'Distinguish learnable model parameters (weights β) from hyperparameters (k in KNN, tree depth, λ)',
      'Prevent subtle data leakage during preprocessing and feature selection'
    ],
    mainExplanation: 'Cross-Validation is the gold-standard resampling procedure for assessing how a machine learning model will generalize to independent unseen datasets. By partitioning data into k rotating folds, cross-validation provides an unbiased estimate of generalization error to guide hyperparameter selection without contaminating the final holdout test set.',
    conceptSections: [
      {
        id: 'sec-kfold-workflow',
        title: 'The k-Fold Cross-Validation Protocol',
        content: [
          'In k-Fold Cross-Validation, the training dataset is partitioned into k equal-sized folds:',
          '1. For fold i = 1 to k, train the model on the union of the remaining k - 1 folds.',
          '2. Evaluate performance metrics (e.g. F1, Accuracy, Log Loss) on the holdout i-th validation fold.',
          '3. Average the validation scores across all k folds to compute the cross-validation score: CV_k = (1/k) * Σ Score_i.',
          'In Stratified k-Fold, each fold contains approximately the same percentage of samples of each target class as the complete dataset.'
        ],
        callout: {
          type: 'warning',
          title: 'Data Leakage Warning',
          text: 'Feature preprocessing (such as computing mean μ and standard deviation σ for standardization, or imputing missing values) must ONLY be computed on the training folds and applied to the validation fold. Fitting scalers on the entire dataset before splitting leaks test distribution information.'
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-cv-score',
        title: 'k-Fold Cross-Validation Aggregate Score',
        formula: '\\text{CV}_k = \\frac{1}{k} \\sum_{i=1}^k \\mathcal{M}\\left( y_{\\text{val}, i}, \\hat{y}_{\\text{val}, i} \\right)',
        explanation: 'Averages validation metric M across k distinct validation folds.',
        variables: [
          { symbol: 'k', description: 'Number of cross-validation folds (typically k = 5 or k = 10)' },
          { symbol: '\\mathcal{M}', description: 'Selected evaluation metric (e.g. F1-Score, ROC-AUC, Accuracy)' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-cv-1',
        title: '5-Fold CV Error Aggregation',
        description: 'A 5-fold cross-validation run on a logistic classifier yields validation accuracy scores: [0.84, 0.88, 0.82, 0.86, 0.85]. Compute the mean CV score and standard error.',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute Mean Cross-Validation Accuracy',
            formula: '\\bar{x} = \\frac{0.84 + 0.88 + 0.82 + 0.86 + 0.85}{5} = \\frac{4.25}{5} = 0.850 \\text{ (85.0\\%)}'
          },
          {
            stepNumber: 2,
            description: 'Compute Sample Standard Deviation',
            formula: 's = \\sqrt{\\frac{(0.84-0.85)^2 + (0.88-0.85)^2 + (0.82-0.85)^2 + (0.86-0.85)^2 + (0.85-0.85)^2}{4}} = \\sqrt{\\frac{0.0020}{4}} \\approx 0.0224'
          },
          {
            stepNumber: 3,
            description: 'Compute Standard Error of the Mean',
            formula: '\\text{SE} = \\frac{s}{\\sqrt{k}} = \\frac{0.0224}{\\sqrt{5}} \\approx 0.010 \\implies \\text{Score: } 0.850 \\pm 0.010'
          }
        ]
      }
    ],
    keyTakeaways: [
      'k-Fold Cross-Validation provides robust out-of-sample performance estimates for hyperparameter tuning.',
      'The holdout test set must remain locked until final model selection is finalized.',
      'Stratified k-Fold maintains class proportions across all validation splits.',
      'Preprocessing and feature scaling must be nested strictly inside each fold to prevent data leakage.'
    ],
    interactiveSection: {
      componentName: 'ConfusionMatrixExplorer',
      description: 'Examine how evaluation metrics respond across different test partitions and thresholds.'
    }
  },
  {
    id: 'u6-l9',
    slug: 'feature-engineering',
    order: 9,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Feature Engineering & Preprocessing',
    shortDescription: 'Master standardization, one-hot encoding, missing value handling, and feature selection for robust ML pipelines.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Apply Z-score standardization z = (x - μ) / σ to numerical features',
      'Understand One-Hot Encoding for nominal categorical features vs. Ordinal Encoding',
      'Handle missing values via median and mode imputation strategies',
      'Prevent information leakage during pipeline construction'
    ],
    mainExplanation: 'Feature Engineering and Preprocessing transform raw, heterogeneous data into structured numerical representations optimized for machine learning algorithms. The performance of algorithms such as Logistic Regression and KNN depends directly on proper scaling, categorical encoding, and leakage-free imputation pipelines.',
    conceptSections: [
      {
        id: 'sec-fe-techniques',
        title: 'Core Preprocessing Transformations',
        content: [
          'Numerical Standardization: Centers features to zero mean and unit variance via z = (x - μ) / σ. Crucial for distance-based methods (KNN) and gradient-based optimizers (Logistic Regression).',
          'Categorical Encoding: Nominal features without intrinsic ordering (e.g. [Red, Green, Blue]) must be transformed into binary indicator columns via One-Hot Encoding.',
          'Missing Value Imputation: Missing values can be imputed using median values for skewed continuous features or mode for categorical features.'
        ],
        table: {
          caption: 'Algorithm Sensitivity to Preprocessing',
          headers: ['Algorithm', 'Feature Scaling Required?', 'Categorical Encoding Required?', 'Handling of Outliers'],
          rows: [
            ['Logistic Regression', 'Recommended (accelerates gradient descent)', 'Required (One-Hot or Ordinal)', 'Sensitive (extreme points shift boundary)'],
            ['k-Nearest Neighbors (KNN)', 'MANDATORY (distances dominated by scale)', 'Required (One-Hot / Distance metric)', 'Extremely Sensitive (distorts neighbor ranking)'],
            ['Decision Trees', 'NOT Required (invariant to monotonic scale)', 'Required (One-Hot or integer)', 'Robust (isolated to individual leaf splits)'],
            ['Random Forest', 'NOT Required', 'Required', 'Robust']
          ]
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-standardization',
        title: 'Z-Score Standardization Formula',
        formula: 'z_{ij} = \\frac{x_{ij} - \\mu_j}{\\sigma_j}',
        explanation: 'Transforms feature column j to have mean μ = 0 and standard deviation σ = 1.',
        variables: [
          { symbol: 'x_{ij}', description: 'Raw value of observation i for feature j' },
          { symbol: '\\mu_j', description: 'Sample mean of feature column j computed on training set' },
          { symbol: '\\sigma_j', description: 'Sample standard deviation of feature column j' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-fe-1',
        title: 'Standardizing an Incoming Test Point',
        description: 'A training feature has mean μ = 50 and standard deviation σ = 10. A new test point arrives with x_test = 65. Standardize this test value.',
        steps: [
          {
            stepNumber: 1,
            description: 'Apply training statistics (do NOT recompute on test point)',
            formula: 'z_{\\text{test}} = \\frac{x_{\\text{test}} - \\mu_{\\text{train}}}{\\sigma_{\\text{train}}} = \\frac{65 - 50}{10} = \\frac{15}{10} = +1.50'
          },
          {
            stepNumber: 2,
            description: 'Interpretation',
            formula: '\\text{The test observation is 1.50 standard deviations above the training baseline mean.}'
          }
        ]
      }
    ],
    keyTakeaways: [
      'Standardization (Z-score) is mandatory for distance-based (KNN) and gradient-based models.',
      'Nominal categorical variables should be one-hot encoded to avoid imposing false ordinal rankings.',
      'Tree-based algorithms are invariant to monotonic feature scaling.',
      'Always fit preprocessing transformers on training data only to guarantee strict leakage prevention.'
    ],
    interactiveSection: {
      componentName: 'KNNExplorer',
      description: 'Observe how distance calculations and nearest neighbors shift when coordinate features are scaled.'
    }
  },
  {
    id: 'u6-l10',
    slug: 'classification-in-data-science',
    order: 10,
    unitId: 'unit-6' as UnitId,
    unitNumber: 6,
    title: 'Classification in Data Science',
    shortDescription: 'Synthesize the end-to-end classification lifecycle: problem framing, baseline models, tuning, threshold selection, and deployment.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Execute the structured 10-step end-to-end classification data science workflow',
      'Select appropriate model architectures based on interpretability vs. flexibility tradeoffs',
      'Diagnose common production failure modes: data drift, class imbalance, and threshold miscalibration',
      'Synthesize learnings across all 6 Units of the Data Science Lab curriculum'
    ],
    mainExplanation: 'Classification in real-world data science bridges rigorous mathematical theory with production systems. A successful data science project requires more than high training accuracy: it demands clear objective framing, leakage-free pipelines, cross-validated model selection, business-aligned threshold calibration, and continuous monitoring against distributional shift.',
    conceptSections: [
      {
        id: 'sec-ds-lifecycle',
        title: 'The End-to-End Classification Lifecycle',
        content: [
          '1. Problem Definition: Frame the business objective as binary or multiclass classification and define the primary optimization metric (e.g. Recall @ 95% Precision).',
          '2. Data Ingestion & EDA: Inspect class balance, missingness, and feature correlations (Unit 1).',
          '3. Mathematical Formulation: Represent features as vectors in ℝᵈ and design feature transformations (Units 2 & 3).',
          '4. Statistical Validation: Establish deterministic train/test splits and check probabilistic assumptions (Unit 4).',
          '5. Baseline Model: Fit a simple, interpretable baseline (e.g. Logistic Regression) (Unit 5 & 6).',
          '6. Advanced Modeling: Train candidate algorithms (KNN, Decision Trees, Ensembles).',
          '7. Hyperparameter Tuning: Execute nested k-Fold Cross-Validation.',
          '8. Decision Threshold Calibration: Tune τ on validation probabilities to match asymmetric operational costs.',
          '9. Holdout Evaluation: Evaluate the final model once on the untouched test set.',
          '10. Deployment & Monitoring: Monitor for feature drift, concept drift, and performance decay.'
        ],
        table: {
          caption: 'Model Architecture Selection Tradeoffs',
          headers: ['Model Family', 'Interpretability', 'Training Speed', 'Inference Latency', 'Handling Non-Linearity'],
          rows: [
            ['Logistic Regression', 'Very High (Odds Ratios)', 'Very Fast', 'Extremely Fast (O(d))', 'Requires explicit feature interaction terms'],
            ['k-Nearest Neighbors (KNN)', 'Moderate (Example-based)', 'Instant (No training)', 'Slow (O(n · d))', 'High (Naturally non-linear)'],
            ['Decision Trees', 'High (Visual tree graph)', 'Fast', 'Fast (O(depth))', 'High (Step-wise partitions)'],
            ['Random Forest', 'Low (Black-box ensemble)', 'Moderate', 'Moderate (O(B · depth))', 'Very High (Smooth boundary approximation)']
          ]
        }
      }
    ],
    formulaBreakdowns: [
      {
        id: 'fb-cost-matrix',
        title: 'Expected Cost Minimization for Threshold Selection',
        formula: '\\tau^* = \\arg\\min_\\tau \\left( C_{\\text{FP}} \\cdot \\text{FP}(\\tau) + C_{\\text{FN}} \\cdot \\text{FN}(\\tau) \\right)',
        explanation: 'Selects the operational probability threshold τ* that minimizes total financial or clinical misclassification cost.',
        variables: [
          { symbol: 'C_{\\text{FP}}', description: 'Financial or operational cost of a False Positive error' },
          { symbol: 'C_{\\text{FN}}', description: 'Critical penalty / cost of a False Negative error' },
          { symbol: '\\tau^*', description: 'Optimal calibrated decision threshold' }
        ]
      }
    ],
    workedExamples: [
      {
        id: 'we-ds-1',
        title: 'Calibrating Thresholds for Fraud Detection',
        description: 'A bank processes 10,000 transactions. A False Negative (missed fraud) costs $500. A False Positive (blocking a legitimate user) costs $10. Compare Threshold A (FP = 200, FN = 5) vs. Threshold B (FP = 50, FN = 20).',
        steps: [
          {
            stepNumber: 1,
            description: 'Compute Cost for Threshold A',
            formula: '\\text{Cost}_A = 200(\\$10) + 5(\\$500) = \\$2,000 + \\$2,500 = \\$4,500'
          },
          {
            stepNumber: 2,
            description: 'Compute Cost for Threshold B',
            formula: '\\text{Cost}_B = 50(\\$10) + 20(\\$500) = \\$500 + \\$10,000 = \\$10,500'
          },
          {
            stepNumber: 3,
            description: 'Conclusion',
            formula: '\\text{Threshold A saves } \\$6,000 \\text{ despite triggering 4× more false positive alerts.}'
          }
        ]
      }
    ],
    keyTakeaways: [
      'A complete classification pipeline spans data collection, EDA, vector representation, model training, tuning, and deployment.',
      'Model selection balances interpretability against predictive flexibility.',
      'Optimal decision thresholds must align with asymmetric real-world business and clinical costs.',
      'Units 1 through 6 establish the unified mathematical and computational foundation of modern Data Science.'
    ],
    interactiveSection: {
      componentName: 'ConfusionMatrixExplorer',
      description: 'Explore the complete classification evaluation dashboard with dynamic threshold calibration.'
    }
  }
];
