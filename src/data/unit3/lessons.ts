import { UnitId } from '@/types';
import { FullLessonData } from '@/data/unit1/lessons';

export const UNIT_3_LESSONS: FullLessonData[] = [
  {
    id: 'u3-l1',
    slug: 'matrices',
    order: 1,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Matrices & Data Representation',
    shortDescription: 'Discover how 2D rectangular arrays of numbers organize tabular datasets, feature spaces, and graph structures in machine learning.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Define a matrix using formal row × column (m × n) notation and indexing',
      'Distinguish square, diagonal, identity, symmetric, and rectangular matrices',
      'Map tabular data frames and feature matrices (X ∈ ℝ^{n × d}) into matrix representations',
      'Understand matrix transpositions and their computational role in feature rotations'
    ],
    mainExplanation: 'A matrix is a two-dimensional rectangular array of numbers arranged in horizontal rows and vertical columns. While a vector represents a single point or feature list, a matrix encapsulates an entire dataset or a multi-dimensional linear map. In data science, every tabular dataset with n samples and d features is naturally structured as a design matrix X of shape n × d.',
    conceptSections: [
      {
        id: 'sec-matrix-notation',
        title: 'Matrix Notation & Dimensions',
        content: [
          'A matrix A with m rows and n columns is denoted as A ∈ ℝ^{m × n}. The individual element residing at row i and column j is written as a_{ij} or A[i, j].',
          'Rows correspond to independent observations or sample records, while columns correspond to measured feature variables. Square matrices occur when m = n.'
        ],
        table: {
          caption: 'Special Matrix Architectures in Data Science',
          headers: ['Matrix Type', 'Mathematical Definition', 'Data Science Application'],
          rows: [
            ['Square Matrix', 'm = n (equal rows & columns)', 'Covariance matrices, transition graphs'],
            ['Identity Matrix (I)', 'I_{ii} = 1, I_{ij} = 0 (for i ≠ j)', 'Multiplicative neutral element in linear algebra'],
            ['Diagonal Matrix', 'A_{ij} = 0 for all i ≠ j', 'Feature scaling, singular value matrices (Σ)'],
            ['Symmetric Matrix', 'A = A^T (A_{ij} = A_{ji})', 'Correlation matrices, distance graphs, Hessian matrices']
          ]
        },
        callout: {
          type: 'tip',
          title: 'Row-Major vs Column-Major Representation',
          text: 'In Python (NumPy/Pandas), 2D arrays are stored in row-major order (C-contiguous), meaning rows represent individual data instances and columns represent distinct features.'
        }
      },
      {
        id: 'sec-design-matrix',
        title: 'The Design Matrix in Machine Learning',
        content: [
          'In predictive modeling, feature datasets are packed into a design matrix X ∈ ℝ^{n × d}. If we collect height, weight, and age for 1,000 patients, X has shape 1000 × 3.',
          'Transposing X yields X^T ∈ ℝ^{d × n}, which is the fundamental operation used to compute the scatter/covariance matrix X^T X ∈ ℝ^{d × d}.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'NumPy Matrix Instantiation and Transposition',
          code: `import numpy as np

# Create a 3x2 design matrix (3 samples, 2 features)
X = np.array([
    [1.5, 45.0],
    [2.1, 52.5],
    [1.8, 48.0]
])

print("Shape:", X.shape)         # (3, 2)
print("Transpose shape:", X.T.shape) # (2, 3)
print("Gram Matrix (X.T @ X):\\n", X.T @ X)`
        }
      }
    ],
    keyTakeaways: [
      'A matrix A of dimension m × n organizes m records across n features.',
      'Special structures like diagonal and symmetric matrices enable fast computation of correlations and eigenvalues.',
      'The transpose operation flips rows into columns, transforming an m × n matrix into an n × m matrix.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l1-q1',
        question: 'If a dataset contains 500 patient records with 8 measured biomarker features, what are the dimensions of its design matrix X?',
        options: [
          '8 × 500',
          '500 × 8',
          '500 × 500',
          '8 × 8'
        ],
        correctIndex: 1,
        explanation: 'In standard data science convention, rows represent observations (500 samples) and columns represent features (8 biomarkers), making X ∈ ℝ^{500 × 8}.'
      },
      {
        id: 'u3-l1-q2',
        question: 'What is the transpose of a 4 × 2 matrix?',
        options: [
          'A 4 × 4 matrix',
          'A 2 × 4 matrix',
          'A 2 × 2 matrix',
          'An undefined matrix'
        ],
        correctIndex: 1,
        explanation: 'Transposing swaps the row and column dimensions, converting an m × n matrix into an n × m matrix (here 4 × 2 becomes 2 × 4).'
      }
    ]
  },
  {
    id: 'u3-l2',
    slug: 'matrix-operations',
    order: 2,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Matrix Addition, Subtraction & Scalar Multiplication',
    shortDescription: 'Master elementwise matrix arithmetic, broadcasting, and scalar scaling for data normalization and weight updates.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Perform elementwise addition and subtraction on matrices of identical dimensions',
      'Scale matrices by real numbers and understand geometric scaling of data',
      'Understand algebraic properties: commutativity, associativity, and distributivity',
      'Apply scalar scaling to data matrix normalization and standardization'
    ],
    mainExplanation: 'Matrix addition and scalar multiplication operate element by element. Two matrices can only be added or subtracted if they share identical dimensions. Scalar multiplication scales every entry uniformly by a constant factor, forming the foundation of data normalization, image brightening, and gradient descent parameter updates.',
    conceptSections: [
      {
        id: 'sec-elementwise-ops',
        title: 'Elementwise Addition & Subtraction',
        content: [
          'Given two matrices A, B ∈ ℝ^{m × n}, their sum C = A + B is defined by c_{ij} = a_{ij} + b_{ij}.',
          'If dimensions differ (e.g., adding a 2 × 3 matrix to a 3 × 2 matrix), addition is mathematically undefined.'
        ],
        callout: {
          type: 'math',
          title: 'Formal Addition Rule',
          text: '[[a, b], [c, d]] + [[e, f], [g, h]] = [[a+e, b+f], [c+g, d+h]]. Addition is commutative (A + B = B + A) and associative ((A + B) + C = A + (B + C)).'
        }
      },
      {
        id: 'sec-scalar-scaling',
        title: 'Scalar Multiplication & Feature Normalization',
        content: [
          'Multiplying a matrix A by a scalar c ∈ ℝ multiplies every element: (cA)_{ij} = c · a_{ij}.',
          'In image processing, multiplying a grayscale image matrix by 0.5 halves brightness. In machine learning, scalar multiplication scales the learning rate η in weight updates: W_{new} = W_{old} - η · ∇L.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Elementwise Matrix Arithmetic in Python',
          code: `import numpy as np

A = np.array([[2, 4], [6, 8]])
B = np.array([[1, 3], [5, 7]])

# Matrix Addition
Sum_AB = A + B   # [[3, 7], [11, 15]]

# Scalar Multiplication (e.g., learning rate scaling)
Scaled = 0.5 * A # [[1., 2.], [3., 4.]]`
        }
      }
    ],
    keyTakeaways: [
      'Matrix addition requires identical dimensions and operates element by element.',
      'Scalar multiplication multiplies every entry in the matrix by a constant factor.',
      'Matrix addition is commutative and associative, while scalar multiplication distributes over matrix addition.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l2-q1',
        question: 'Given A = [[1, 3], [5, 7]] and B = [[2, 1], [0, 4]], what is 2A - B?',
        options: [
          '[[0, 5], [10, 10]]',
          '[[0, 5], [5, 10]]',
          '[[1, 2], [5, 3]]',
          '[[4, 6], [10, 14]]'
        ],
        correctIndex: 0,
        explanation: '2A = [[2, 6], [10, 14]]. Subtracting B gives [[2-2, 6-1], [10-0, 14-4]] = [[0, 5], [10, 10]].'
      },
      {
        id: 'u3-l2-q2',
        question: 'Can a 3 × 2 matrix be added to a 2 × 3 matrix in standard linear algebra?',
        options: [
          'Yes, by auto-transposing',
          'No, matrix addition requires strictly identical dimensions',
          'Yes, only if both are symmetric',
          'Yes, resulting in a 3 × 3 matrix'
        ],
        correctIndex: 1,
        explanation: 'Matrix addition is strictly defined only for matrices of identical dimensions (same number of rows and columns).'
      }
    ]
  },
  {
    id: 'u3-l3',
    slug: 'matrix-multiplication',
    order: 3,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Matrix Multiplication',
    shortDescription: 'Understand the row-by-column inner product mechanism, dimensional compatibility rules, and non-commutativity in neural networks.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Evaluate matrix products using the row × column dot product formula (AB)_{ij} = Σ_k a_{ik} b_{kj}',
      'Verify dimension compatibility: (m × k) × (k × n) = (m × n)',
      'Understand why matrix multiplication is associative but strictly non-commutative (AB ≠ BA)',
      'Connect matrix multiplication to neural network dense layer forward passes'
    ],
    mainExplanation: 'Matrix multiplication is not elementwise multiplication. Instead, every entry (AB)_{ij} is the Euclidean dot product between the i-th row of matrix A and the j-th column of matrix B. This operation forms the computational core of deep learning, where input feature batches are multiplied by layer weight matrices.',
    conceptSections: [
      {
        id: 'sec-dimension-compatibility',
        title: 'Dimensional Compatibility Condition',
        content: [
          'To multiply matrix A by matrix B, the number of columns in A must exactly equal the number of rows in B.',
          'If A ∈ ℝ^{m × k} and B ∈ ℝ^{k × n}, then their product C = AB exists and has shape m × n. The shared inner dimension k collapses through summation.'
        ],
        callout: {
          type: 'warning',
          title: 'Non-Commutativity (AB ≠ BA)',
          text: 'Matrix multiplication is generally non-commutative: AB ≠ BA. Even if both AB and BA exist (when both matrices are square n × n), their results are rarely equal.'
        }
      },
      {
        id: 'sec-dot-product-formula',
        title: 'Step-by-Step Numerical Computation',
        content: [
          'Each entry is computed as: c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + ... + a_{ik}b_{kj}.',
          'For 2×2 matrices: [[a, b], [c, d]] × [[e, f], [g, h]] = [[ae + bg, af + bh], [ce + dg, cf + dh]].'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Neural Network Linear Layer as Matrix Multiplication',
          code: `import numpy as np

# Batch of 2 input samples, each with 3 features: (2 x 3)
X = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])

# Weight matrix for layer with 2 output neurons: (3 x 2)
W = np.array([
    [0.1, 0.2],
    [0.3, 0.4],
    [0.5, 0.6]
])

# Forward pass: (2 x 3) @ (3 x 2) -> (2 x 2)
Output = X @ W
print("Layer Output:\\n", Output)`
        }
      }
    ],
    keyTakeaways: [
      'Matrix multiplication (m × k) × (k × n) produces an m × n matrix.',
      'Entry (i, j) is the dot product of row i from the first matrix and column j from the second matrix.',
      'Matrix multiplication is associative (A(BC) = (AB)C) but not commutative (AB ≠ BA).'
    ],
    practiceQuestions: [
      {
        id: 'u3-l3-q1',
        question: 'If matrix A has shape 4 × 3 and matrix B has shape 3 × 5, what is the shape of product AB?',
        options: [
          '3 × 3',
          '4 × 5',
          '5 × 4',
          'Multiplication is undefined'
        ],
        correctIndex: 1,
        explanation: 'The inner dimension 3 matches, and the outer dimensions dictate the result shape: 4 × 5.'
      },
      {
        id: 'u3-l3-q2',
        question: 'Given A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 2]], what is the entry (AB)₁₁ (top-left)?',
        options: [
          '2',
          '4',
          '10',
          '8'
        ],
        correctIndex: 1,
        explanation: '(AB)₁₁ is the dot product of Row 1 of A [1, 2] and Column 1 of B [2, 1]^T: 1×2 + 2×1 = 2 + 2 = 4.'
      }
    ]
  },
  {
    id: 'u3-l4',
    slug: 'linear-transformations',
    order: 4,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Matrices as Linear Transformations',
    shortDescription: 'Visualize matrices as geometric functions that rotate, scale, shear, and project vector spaces while preserving grid lines.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Understand linear transformations as geometric mappings y = Ax preserving lines and the origin',
      'Track how columns of a matrix specify where standard basis vectors î and ĵ land',
      'Analyze canonical transformation matrices: scaling, rotation, reflection, and shear',
      'Connect matrix transformations to feature embedding projections and PCA rotations'
    ],
    mainExplanation: 'A matrix is more than a table of numbers; it is a dynamic geometric function that transforms space. When matrix A acts on vector x via y = Ax, it maps x to a new location. Crucially, linear transformations keep grid lines straight and parallel, and leave the origin (0, 0) fixed in place. The columns of matrix A tell you exactly where the standard basis vectors land.',
    conceptSections: [
      {
        id: 'sec-basis-tracking',
        title: 'The Column Landing Rule',
        content: [
          'In 2D space, the standard basis vectors are î = [1, 0]^T and ĵ = [0, 1]^T.',
          'When multiplied by matrix A = [[a, b], [c, d]]: Aî = [a, c]^T (column 1) and Aĵ = [b, d]^T (column 2).',
          'To understand what any 2×2 matrix does geometrically, simply plot where î and ĵ land!'
        ],
        table: {
          caption: 'Canonical 2D Geometric Transformations',
          headers: ['Transformation', 'Matrix Formula', 'Geometric Effect'],
          rows: [
            ['Uniform Scaling', '[[s, 0], [0, s]]', 'Expands or contracts space by factor s'],
            ['Counter-Clockwise Rotation θ', '[[cos θ, -sin θ], [sin θ, cos θ]]', 'Rotates all vectors around origin by angle θ'],
            ['Horizontal Shear', '[[1, k], [0, 1]]', 'Slants vertical lines horizontally by factor k'],
            ['Reflection across X-axis', '[[1, 0], [0, -1]]', 'Flips the vertical component across the horizontal axis']
          ]
        }
      },
      {
        id: 'sec-composition-transforms',
        title: 'Composition of Transformations',
        content: [
          'Applying transformation A followed by transformation B is achieved by the matrix product BA.',
          'Notice the order: (BA)x = B(Ax). Matrix multiplication represents function composition from right to left.'
        ],
        callout: {
          type: 'info',
          title: 'Computer Vision & Data Augmentation',
          text: 'Image data augmentation in PyTorch/TensorFlow (random rotation, cropping, affine scaling) applies 3×3 homogeneous transformation matrices to pixels.'
        }
      }
    ],
    keyTakeaways: [
      'Linear transformations preserve parallel grid lines and keep the origin fixed.',
      'The columns of matrix A represent the transformed coordinates of the basis vectors î and ĵ.',
      'Matrix multiplication AB corresponds to applying transformation B first, then transformation A.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l4-q1',
        question: 'Where does the standard basis vector î = [1, 0]^T land under the transformation matrix A = [[3, -1], [4, 2]]?',
        options: [
          '[3, -1]^T',
          '[3, 4]^T',
          '[-1, 2]^T',
          '[4, 2]^T'
        ],
        correctIndex: 1,
        explanation: 'Aî equals the first column of matrix A, which is [3, 4]^T.'
      },
      {
        id: 'u3-l4-q2',
        question: 'Which matrix represents a pure 90° counter-clockwise rotation in 2D?',
        options: [
          '[[1, 0], [0, 1]]',
          '[[0, -1], [1, 0]]',
          '[[0, 1], [-1, 0]]',
          '[[-1, 0], [0, -1]]'
        ],
        correctIndex: 1,
        explanation: 'For θ = 90°, cos(90°) = 0 and sin(90°) = 1, giving [[0, -1], [1, 0]]. î lands at [0, 1]^T and ĵ lands at [-1, 0]^T.'
      }
    ]
  },
  {
    id: 'u3-l5',
    slug: 'systems-of-equations',
    order: 5,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Systems of Linear Equations',
    shortDescription: 'Express simultaneous linear equations in compact matrix-vector form Ax = b and explore solvability in data regression.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Translate algebraic systems of equations into matrix-vector form Ax = b',
      'Distinguish unique solutions, infinite solutions, and inconsistent systems',
      'Understand Gaussian elimination and row-echelon reduction conceptually',
      'Connect Ax = b to Ordinary Least Squares (OLS) regression parameter estimation'
    ],
    mainExplanation: 'A system of linear equations consists of multiple equations sharing the same variables. Writing systems in compact matrix form Ax = b unifies solving simultaneous equations with matrix inversion and projection. In data science, multiple regression finds parameter vector w satisfying the normal equation (X^T X)w = X^T y.',
    conceptSections: [
      {
        id: 'sec-matrix-equation-form',
        title: 'Formulating Ax = b',
        content: [
          'Consider the system: 2x₁ + 3x₂ = 8 and 4x₁ - x₂ = 2.',
          'This is written compactly as: [[2, 3], [4, -1]] [x₁, x₂]^T = [8, 2]^T.',
          'Here A is the coefficient matrix, x is the unknown vector, and b is the target outcome vector.'
        ],
        callout: {
          type: 'math',
          title: 'Three Possible Solution Regimes',
          text: '1. Unique Solution: det(A) ≠ 0 (lines intersect at a single point). 2. No Solution: parallel inconsistent lines. 3. Infinite Solutions: collinear redundant equations.'
        }
      },
      {
        id: 'sec-least-squares-system',
        title: 'Overdetermined Systems & OLS Regression',
        content: [
          'In data science, we usually have many more observations than features (e.g. 10,000 samples, 5 features). This yields an overdetermined system Xw ≈ y with no exact solution.',
          'Instead of exact inversion, we find the best approximation by solving the normal equation: (X^T X)w = X^T y, which minimizes the sum of squared prediction errors.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Solving Linear Systems in NumPy',
          code: `import numpy as np

# System: 2x + 3y = 8, 4x - y = 2
A = np.array([[2, 3], [4, -1]])
b = np.array([8, 2])

# Exact solution x = A^{-1} b
solution = np.linalg.solve(A, b)
print("Solution [x, y]:", solution) # [1., 2.]`
        }
      }
    ],
    keyTakeaways: [
      'Any linear system can be expressed as Ax = b where A is the coefficient matrix and b is the target vector.',
      'A system has a unique exact solution if and only if A is square and invertible (det(A) ≠ 0).',
      'Overdetermined systems (n > d) in machine learning are solved via Ordinary Least Squares normal equations.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l5-q1',
        question: 'For the system 3x + y = 9 and 2x + 4y = 16, what is the coefficient matrix A?',
        options: [
          '[[9, 16], [3, 2]]',
          '[[3, 1], [2, 4]]',
          '[[3, 2], [1, 4]]',
          '[[3, 4], [1, 2]]'
        ],
        correctIndex: 1,
        explanation: 'Row 1 corresponds to coefficients [3, 1] and Row 2 corresponds to [2, 4], forming A = [[3, 1], [2, 4]].'
      },
      {
        id: 'u3-l5-q2',
        question: 'When a linear system Ax = b has det(A) = 0, what does this indicate?',
        options: [
          'There is guaranteed to be exactly one unique solution',
          'The system either has no solution or infinitely many solutions',
          'The solution is always x = [0, 0]^T',
          'The matrix A is an identity matrix'
        ],
        correctIndex: 1,
        explanation: 'When det(A) = 0, the matrix is singular (rows/columns are linearly dependent), meaning equations are either parallel (no solution) or redundant (infinite solutions).'
      }
    ]
  },
  {
    id: 'u3-l6',
    slug: 'determinants',
    order: 6,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Determinants & Geometric Meaning',
    shortDescription: 'Explore the determinant as the signed volume scaling factor of linear transformations and understand singularity.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Compute the determinant for 2×2 matrices: det(A) = ad - bc',
      'Interpret det(A) as the area scaling factor of the unit square under transformation A',
      'Understand the sign of the determinant as spatial orientation (positive vs negative flip)',
      'Recognize that det(A) = 0 signifies dimensionality collapse and non-invertibility'
    ],
    mainExplanation: 'The determinant of a square matrix is a single scalar number that measures how much the linear transformation scales areas (in 2D) or volumes (in 3D). If det(A) = 3, any shape transformed by A will have 3 times its original area. If det(A) = 0, the transformation squashes 2D space onto a 1D line or point, causing irreversible loss of information.',
    conceptSections: [
      {
        id: 'sec-det-formula',
        title: '2×2 Determinant Calculation',
        content: [
          'For a 2×2 matrix A = [[a, b], [c, d]], the determinant is: det(A) = |A| = ad - bc.',
          'For example, if A = [[4, 2], [1, 3]], det(A) = (4)(3) - (2)(1) = 12 - 2 = 10.'
        ],
        callout: {
          type: 'math',
          title: 'Geometric Interpretation of Signed Area',
          text: 'det(A) equals the signed area of the parallelogram formed by the transformed basis vectors Aî and Aĵ. A negative determinant indicates that space has been flipped / inverted (reflection).'
        }
      },
      {
        id: 'sec-zero-det',
        title: 'Why det(A) = 0 Means Information Loss',
        content: [
          'When det(A) = 0, the columns of A are collinear (linearly dependent). The transformation collapses the entire 2D plane onto a 1D line.',
          'Because multiple original points are compressed into the same destination point, the transformation cannot be undone — no inverse matrix exists.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Determinant Computation in NumPy',
          code: `import numpy as np

A = np.array([[4, 2], [1, 3]])
det_A = np.linalg.det(A)
print("det(A):", round(det_A, 2)) # 10.0

# Singular matrix (collinear columns)
B = np.array([[2, 4], [1, 2]])
det_B = np.linalg.det(B)
print("det(B):", round(det_B, 2)) # 0.0 (Singular)`
        }
      }
    ],
    keyTakeaways: [
      'The determinant of a 2×2 matrix is det(A) = ad - bc.',
      'Geometric meaning: det(A) is the area scaling factor of the transformation.',
      'If det(A) = 0, space collapses into a lower dimension and the matrix is non-invertible (singular).'
    ],
    practiceQuestions: [
      {
        id: 'u3-l6-q1',
        question: 'What is the determinant of matrix A = [[5, 2], [3, 4]]?',
        options: [
          '14',
          '26',
          '20',
          '6'
        ],
        correctIndex: 0,
        explanation: 'det(A) = ad - bc = (5)(4) - (2)(3) = 20 - 6 = 14.'
      },
      {
        id: 'u3-l6-q2',
        question: 'If det(A) = -2.5, what does the negative sign signify geometrically?',
        options: [
          'The transformed area is negative, which is impossible',
          'The transformation inverts/flips spatial orientation (reflection) while scaling area by 2.5',
          'The matrix has no inverse',
          'The matrix is symmetric'
        ],
        correctIndex: 1,
        explanation: 'A negative determinant indicates that the transformation reverses the orientation of space (like flipping a sheet of paper over).'
      }
    ]
  },
  {
    id: 'u3-l7',
    slug: 'inverse-matrices',
    order: 7,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Inverse Matrices',
    shortDescription: 'Understand how inverse matrices reverse linear transformations, solve systems Ax = b, and why singularity prevents inversion.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Define matrix inversion satisfying AA⁻¹ = A⁻¹A = I',
      'Compute the explicit 2×2 inverse formula: A⁻¹ = (1/det(A)) [[d, -b], [-c, a]]',
      'Identify conditions for invertibility: non-zero determinant (det(A) ≠ 0)',
      'Understand computational pitfalls of explicit matrix inversion versus matrix factorizations in ML'
    ],
    mainExplanation: 'An inverse matrix A⁻¹ acts as the undo operation for a linear transformation. If matrix A transforms vector x to y (y = Ax), then multiplying by A⁻¹ recovers the original vector: x = A⁻¹y. A matrix possesses an inverse if and only if it is square and non-singular (det(A) ≠ 0).',
    conceptSections: [
      {
        id: 'sec-inverse-formula',
        title: 'The 2×2 Inverse Formula',
        content: [
          'For any 2×2 matrix with det(A) = ad - bc ≠ 0, its inverse is:',
          'A⁻¹ = (1 / (ad - bc)) [[d, -b], [-c, a]].',
          'Notice that the main diagonal elements (a and d) swap positions, while off-diagonal elements (b and c) are negated.'
        ],
        callout: {
          type: 'math',
          title: 'Identity Verification',
          text: 'Multiplying A by A⁻¹ always produces the identity matrix: A A⁻¹ = [[1, 0], [0, 1]].'
        }
      },
      {
        id: 'sec-numerical-inversion-practice',
        title: 'Inversion in Practice: Why Direct Inversion is Avoided',
        content: [
          'While algebraically x = A⁻¹b solves linear equations, computing explicit matrix inverses in production machine learning is numerically unstable and computationally expensive (O(n³)).',
          'Modern solvers instead use LU decomposition, QR decomposition, or iterative conjugate gradient methods.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Matrix Inversion in NumPy',
          code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
A_inv = np.linalg.inv(A)

print("A_inv:\\n", A_inv)
print("A @ A_inv (Identity):\\n", np.round(A @ A_inv, 6))`
        }
      }
    ],
    keyTakeaways: [
      'The inverse matrix A⁻¹ reverses the action of A, satisfying AA⁻¹ = I.',
      'A 2×2 inverse is given by A⁻¹ = 1/(ad-bc) [[d, -b], [-c, a]].',
      'A matrix is invertible if and only if its determinant is non-zero (non-singular).'
    ],
    practiceQuestions: [
      {
        id: 'u3-l7-q1',
        question: 'What is the inverse of matrix A = [[4, 7], [2, 6]] given that det(A) = (4)(6) - (7)(2) = 10?',
        options: [
          '[[0.6, -0.7], [-0.2, 0.4]]',
          '[[0.4, 0.7], [0.2, 0.6]]',
          '[[-0.6, 0.7], [0.2, -0.4]]',
          '[[6, -7], [-2, 4]]'
        ],
        correctIndex: 0,
        explanation: 'A⁻¹ = (1/10) [[6, -7], [-2, 4]] = [[0.6, -0.7], [-0.2, 0.4]].'
      },
      {
        id: 'u3-l7-q2',
        question: 'Under what condition does a square matrix A lack an inverse?',
        options: [
          'When all diagonal entries are positive',
          'When its determinant equals zero (det(A) = 0)',
          'When A is symmetric',
          'When A is an identity matrix'
        ],
        correctIndex: 1,
        explanation: 'If det(A) = 0, division by zero occurs in the inverse formula (1/det(A)), meaning the matrix is singular and non-invertible.'
      }
    ]
  },
  {
    id: 'u3-l8',
    slug: 'rank-and-independence',
    order: 8,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Rank & Linear Independence',
    shortDescription: 'Quantify true information content, collinearity, and dimensionality in data matrices using matrix rank.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Define matrix rank as the number of linearly independent row or column vectors',
      'Distinguish full rank vs rank-deficient matrices in data science',
      'Understand multicollinearity in regression when feature columns are linearly dependent',
      'Connect low-rank approximations to matrix compression and Truncated SVD'
    ],
    mainExplanation: 'Matrix rank represents the true dimensionality of the information contained within a matrix. Even if a dataset has 100 feature columns, if 40 of them are exact linear combinations of other columns, the matrix has a rank of only 60. Rank deficiency signals multicollinearity in linear models and enables low-rank data compression.',
    conceptSections: [
      {
        id: 'sec-rank-definition',
        title: 'Row Rank & Column Rank Equality',
        content: [
          'The column rank of matrix A is the maximum number of linearly independent columns. The row rank is the maximum number of linearly independent rows.',
          'A fundamental theorem of linear algebra states that for any matrix A ∈ ℝ^{m × n}, row rank always equals column rank: rank(A) ≤ min(m, n).'
        ],
        table: {
          caption: 'Rank Regimes in Machine Learning',
          headers: ['Rank State', 'Definition', 'Data Science Consequence'],
          rows: [
            ['Full Column Rank', 'rank(X) = d (where n ≥ d)', 'X^T X is invertible; unique regression weights w exist'],
            ['Rank Deficient', 'rank(X) < min(n, d)', 'Multicollinearity exists; (X^T X) is singular and non-invertible'],
            ['Low-Rank Approximation', 'X ≈ U_k Σ_k V_k^T', 'Denoising, collaborative filtering (Netflix Prize), PCA compression']
          ]
        }
      },
      {
        id: 'sec-multicollinearity-ml',
        title: 'Multicollinearity in Feature Matrices',
        content: [
          'If a feature matrix includes height in centimeters and height in inches, one column is an exact scalar multiple of the other. The matrix becomes rank-deficient.',
          'In OLS regression, rank deficiency makes (X^T X) non-invertible, causing regression algorithms to fail or produce wildly unstable weights.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Checking Matrix Rank in NumPy',
          code: `import numpy as np

# Full rank 3x3 matrix (rank = 3)
A = np.array([
    [1, 0, 2],
    [0, 1, 4],
    [2, 1, 0]
])
print("Rank of A:", np.linalg.matrix_rank(A)) # 3

# Rank-deficient matrix (Row 3 = Row 1 + Row 2)
B = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [5, 7, 9]
])
print("Rank of B:", np.linalg.matrix_rank(B)) # 2`
        }
      }
    ],
    keyTakeaways: [
      'Matrix rank equals the number of linearly independent rows (or columns).',
      'A matrix A ∈ ℝ^{m × n} has maximum possible rank equal to min(m, n).',
      'Rank deficiency causes multicollinearity in regression and motivates regularization techniques like Ridge Regression.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l8-q1',
        question: 'What is the rank of a 4 × 4 matrix where all 4 rows are identical to [1, 2, 3, 4]?',
        options: [
          '4',
          '1',
          '0',
          '2'
        ],
        correctIndex: 1,
        explanation: 'Because rows 2, 3, and 4 are exact duplicates of row 1, there is only 1 linearly independent row, so the rank is 1.'
      },
      {
        id: 'u3-l8-q2',
        question: 'What happens to the covariance matrix (X^T X) if feature matrix X is rank-deficient?',
        options: [
          '(X^T X) becomes an identity matrix',
          '(X^T X) has determinant equal to zero and cannot be inverted',
          '(X^T X) has maximum determinant',
          '(X^T X) becomes asymmetric'
        ],
        correctIndex: 1,
        explanation: 'If X is rank-deficient, X^T X is singular (det(X^T X) = 0), preventing direct computation of ordinary least squares parameter weights.'
      }
    ]
  },
  {
    id: 'u3-l9',
    slug: 'eigenvalues-eigenvectors',
    order: 9,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Eigenvalues & Eigenvectors',
    shortDescription: 'Master invariant directional axes Av = λv and their central role in Principal Component Analysis (PCA) and dimensionality reduction.',
    estimatedDuration: 22,
    contentType: 'concept',
    learningObjectives: [
      'Define the eigenvalue-eigenvector equation Av = λv conceptually and algebraically',
      'Solve the characteristic equation det(A - λI) = 0 for 2×2 matrices',
      'Interpret eigenvectors as directions where transformations act purely as scalar scaling',
      'Connect eigenvectors of covariance matrices to principal components in PCA'
    ],
    mainExplanation: 'When a matrix transforms space, most vectors change both their length and their direction. However, certain special vectors maintain their exact directional line, experiencing only stretching or shrinking. These invariant directional vectors are eigenvectors, and their scaling factors are eigenvalues: Av = λv. In data science, the eigenvectors of a covariance matrix point along the axes of maximum variance in the dataset.',
    conceptSections: [
      {
        id: 'sec-eigen-equation',
        title: 'The Characteristic Equation',
        content: [
          'To find eigenvalues λ satisfying Av = λv, we rearrange to: (A - λI)v = 0.',
          'For non-trivial eigenvectors (v ≠ 0) to exist, the matrix (A - λI) must be singular: det(A - λI) = 0.',
          'For a 2×2 matrix, this expands to the characteristic quadratic equation: λ² - trace(A)λ + det(A) = 0.'
        ],
        callout: {
          type: 'math',
          title: '2×2 Eigenvalue Formula',
          text: 'trace(A) = a + d and det(A) = ad - bc. The eigenvalues are roots of λ² - (a+d)λ + (ad-bc) = 0: λ = (trace ± √(trace² - 4·det)) / 2.'
        }
      },
      {
        id: 'sec-pca-connection',
        title: 'Eigenvectors in Principal Component Analysis (PCA)',
        content: [
          'In Principal Component Analysis, we compute the covariance matrix C = (1/n) X^T X.',
          'The eigenvector with the largest eigenvalue points in the direction of maximum data spread (Principal Component 1).',
          'Projecting high-dimensional data onto the top k eigenvectors achieves optimal dimensionality reduction while preserving maximum variance.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Eigendecomposition in NumPy for PCA',
          code: `import numpy as np

# Sample Covariance Matrix (2x2)
Cov = np.array([
    [2.0, 0.8],
    [0.8, 1.5]
])

# Compute Eigenvalues and Eigenvectors
eigenvalues, eigenvectors = np.linalg.eigh(Cov)

print("Eigenvalues (Variance explained):", eigenvalues)
print("Eigenvectors (Principal axes):\\n", eigenvectors)`
        }
      }
    ],
    keyTakeaways: [
      'An eigenvector v maintains its directional axis under transformation A, scaled by eigenvalue λ: Av = λv.',
      'Eigenvalues are found by solving the characteristic equation det(A - λI) = 0.',
      'In PCA, the eigenvectors of the covariance matrix define the principal axes of maximal data variance.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l9-q1',
        question: 'For a diagonal matrix A = [[5, 0], [0, 2]], what are its eigenvalues?',
        options: [
          'λ₁ = 5, λ₂ = 2',
          'λ₁ = 10, λ₂ = 0',
          'λ₁ = 7, λ₂ = 3',
          'λ₁ = 2.5, λ₂ = 1'
        ],
        correctIndex: 0,
        explanation: 'For any diagonal or triangular matrix, the eigenvalues are simply the entries along the main diagonal (5 and 2).'
      },
      {
        id: 'u3-l9-q2',
        question: 'In Principal Component Analysis, what does the eigenvector associated with the largest eigenvalue represent?',
        options: [
          'The mean vector of the dataset',
          'The direction along which the data exhibits the greatest variance',
          'The noise component that should be discarded',
          'The origin of the coordinate space'
        ],
        correctIndex: 1,
        explanation: 'The top eigenvector of a covariance matrix points along the primary axis of variation (Principal Component 1), capturing the most informative feature direction.'
      }
    ]
  },
  {
    id: 'u3-l10',
    slug: 'matrices-in-data-science',
    order: 10,
    unitId: 'unit-3' as UnitId,
    unitNumber: 3,
    title: 'Matrices in Data Science',
    shortDescription: 'Synthesize matrix concepts across modern machine learning: covariance matrices, embeddings, SVD, and deep neural network architectures.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Synthesize design matrices, covariance matrices, and Gram matrices in real workflows',
      'Understand Singular Value Decomposition (SVD): X = U Σ V^T and its role in recommender systems',
      'Explore transformer attention mechanisms as matrix multiplications: Softmax(QK^T / √d_k)V',
      'Connect linear algebra mastery to modern generative AI, embeddings, and latent spaces'
    ],
    mainExplanation: 'Matrices are the computational language of modern machine learning and artificial intelligence. From linear regression normal equations and PCA compression to collaborative filtering recommendation engines and Transformer Multi-Head Self-Attention in LLMs, matrix algebra powers every stage of the data science lifecycle.',
    conceptSections: [
      {
        id: 'sec-svd-recommenders',
        title: 'Singular Value Decomposition (SVD)',
        content: [
          'SVD factorizes any m × n data matrix into three constituent matrices: X = U Σ V^T, where U contains left singular vectors, Σ contains singular values, and V contains right singular vectors.',
          'In recommendation systems (e.g., Netflix), SVD decomposes user-movie rating matrices into latent user preferences and latent movie genres.'
        ],
        table: {
          caption: 'Matrix Applications Across the Machine Learning Landscape',
          headers: ['ML Domain', 'Core Matrix Equation', 'Functional Role'],
          rows: [
            ['Linear Regression', 'w = (X^T X)^{-1} X^T y', 'Analytical Ordinary Least Squares parameter optimization'],
            ['Dimensionality Reduction', 'X_{reduced} = X V_k', 'Projects d features onto k principal component directions'],
            ['Graph Neural Networks', 'A_{adj} H W', 'Propagates node features across adjacency matrices'],
            ['Transformer Attention', 'Attention = softmax(QK^T / √d_k)V', 'Calculates pairwise token similarity weights in Large Language Models']
          ]
        }
      },
      {
        id: 'sec-modern-llm-matrices',
        title: 'Transformer Attention as Matrix Multiplication',
        content: [
          'In modern Large Language Models (LLMs), attention is computed through batched matrix multiplications:',
          'Attention(Q, K, V) = softmax( (Q K^T) / √d_k ) V.',
          'The product Q K^T calculates pairwise query-key alignment scores across all tokens simultaneously, demonstrating the immense computational efficiency of matrix operations.'
        ],
        codeSnippet: {
          language: 'python',
          caption: 'Mini Transformer Scaled Dot-Product Attention in Python',
          code: `import numpy as np

# 3 tokens, embedding dimension 4
Q = np.random.randn(3, 4)
K = np.random.randn(3, 4)
V = np.random.randn(3, 4)

d_k = Q.shape[1]
# Compute raw attention scores via matrix multiplication
scores = (Q @ K.T) / np.sqrt(d_k)

# Softmax row-wise
exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)

# Contextual representation
Context = weights @ V
print("Attention Output Shape:", Context.shape) # (3, 4)`
        }
      }
    ],
    keyTakeaways: [
      'Matrices unify tabular data, covariance structures, linear models, and neural network weights.',
      'Singular Value Decomposition (SVD) decomposes matrices into latent feature spaces for compression and recommendation.',
      'Large Language Models rely on massive parallel matrix multiplications (QK^T and WV) for attention and inference.'
    ],
    practiceQuestions: [
      {
        id: 'u3-l10-q1',
        question: 'In the Transformer attention equation Attention(Q, K, V) = softmax((QK^T)/√d_k) V, what operation computes the pairwise token similarity matrix?',
        options: [
          'Elementwise addition Q + K',
          'Matrix multiplication Q @ K^T',
          'Matrix inversion (Q K)^{-1}',
          'Scalar multiplication √d_k · Q'
        ],
        correctIndex: 1,
        explanation: 'The matrix product Q @ K^T computes dot products between every query token and every key token, yielding the full N × N attention affinity score matrix.'
      },
      {
        id: 'u3-l10-q2',
        question: 'Why is Singular Value Decomposition (SVD) preferred over direct matrix inversion for data compression?',
        options: [
          'SVD only works on square matrices',
          'SVD works on any rectangular matrix and allows truncated low-rank approximations that discard noise',
          'SVD changes the dimensions of the original data',
          'SVD eliminates all zero values'
        ],
        correctIndex: 1,
        explanation: 'SVD applies to any rectangular m × n matrix and naturally orders components by variance (singular values), allowing optimal low-rank rank-k approximations.'
      }
    ]
  }
];
